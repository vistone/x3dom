/** @namespace x3dom.nodeTypes */
/*
 * X3DOM JavaScript Library
 * http://www.x3dom.org
 *
 * (C)2018 A. Plesch, Waltham, MA USA
 * Dual licensed under the MIT and GPL
 */
 /*
 * Ayam, a free 3D modeler for the RenderMan interface.
 *
 * Ayam is copyrighted 1998-2016 by Randolf Schultz
 * (randolf.schultz@gmail.com) and others.
 *
 * All rights reserved.
 *
 * See the file License for details.
 *
 */

/* ### NurbsSurfaceInterpolator ### */
x3dom.registerNodeType(
    "NurbsSurfaceInterpolator",
    "NURBS",
    defineClass(x3dom.nodeTypes.X3DChildNode, 
    
        /**
         * Constructor for NurbsSurfaceInterpolator
         * @constructs x3dom.nodeTypes.NurbsSurfaceInterpolator
         * @x3d 3.3
         * @component NURBS
         * @status experimental
         * @extends x3dom.nodeTypes.X3DChildNode
         * @param {Object} [ctx=null] - context object, containing initial settings like namespace
         * @classdesc NurbsPositionInterpolator describes a 3D NURBS curve.
         */
         
        function (ctx) {
            x3dom.nodeTypes.NurbsSurfaceInterpolator.superClass.call(this, ctx);
            
            /**
             * uDimension and vDimension define the number of control points in the u and v dimensions.
             * @var {x3dom.fields.SFInt32} uDimension
             * @memberof x3dom.nodeTypes.X3DParametricGeometryNode
             * @initvalue 0
             * @range [0, inf]
             * @field x3d
             * @instance
             */
            this.addField_SFInt32(ctx, 'uDimension', 0);
            
            /**
             * uDimension and vDimension define the number of control points in the u and v dimensions.
             * @var {x3dom.fields.SFInt32} vDimension
             * @memberof x3dom.nodeTypes.X3DParametricGeometryNode
             * @initvalue 0
             * @range [0, inf]
             * @field x3d
             * @instance
             */
            this.addField_SFInt32(ctx, 'vDimension', 0);
           
            /**
             * uKnot and vKnot define the knot values of the surface in the u and v dimensions.
             * @var {x3dom.fields.MFDouble} uKnot
             * @memberof x3dom.nodeTypes.X3DParametricGeometryNode
             * @initvalue []
             * @range [-inf, inf]
             * @field x3d
             * @instance
             */
            this.addField_MFDouble(ctx, 'uKnot', []);
            
            /**
             * uKnot and vKnot define the knot values of the surface in the u and v dimensions.
             * @var {x3dom.fields.MFDouble} vKnot
             * @memberof x3dom.nodeTypes.X3DParametricGeometryNode
             * @initvalue []
             * @range [-inf, inf]
             * @field x3d
             * @instance
             */
            this.addField_MFDouble(ctx, 'vKnot', []);
            
            /**
             * uOrder and vOrder define the order of the surface in the u and v dimensions.
             * @var {x3dom.fields.SFInt32} uOrder
             * @memberof x3dom.nodeTypes.X3DParametricGeometryNode
             * @initvalue 3
             * @range [2, inf]
             * @field x3d
             * @instance
             */
            this.addField_SFInt32(ctx, 'uOrder', 3);
            
            /**
             * uOrder and vOrder define the order of the surface in the u and v dimensions.
             * @var {x3dom.fields.SFInt32} vOrder
             * @memberof x3dom.nodeTypes.X3DParametricGeometryNode
             * @initvalue 3
             * @range [2, inf]
             * @field x3d
             * @instance
             */
            this.addField_SFInt32(ctx, 'vOrder', 3);
            
            /**
             * controlPoint defines the X3DCoordinateNode instance that provides the source of coordinates used to control
             * the curve or surface. Depending on the weight value and the order, this piecewise linear curve is approximated
             * by the resulting parametric curve. The number of control points shall be equal to or greater than the order.
             * @var {x3dom.fields.MFVec2d} controlPoint
             * @memberof x3dom.nodeTypes.NurbsSurfaceInterpolator
             * @initvalue null
             * @field x3d
             * @instance
             */
            this.addField_SFNode('controlPoint', x3dom.nodeTypes.X3DCoordinateNode);
            
            /**
             * control point weights: P[i].w = weight[ i ]
             * @var {x3dom.fields.MFDouble} weight
             * @memberof x3dom.nodeTypes.NurbsSurfaceInterpolator
             * @initvalue []
             * @range [0, inf]
             * @field x3d
             * @instance
             */
            this.addField_MFDouble(ctx, 'weight', []);
        
            /**
             * The set_fraction inputOnly field receives an SFFloat event and causes the interpolator node function
	           * to evaluate, resulting in a value_changed output event of the specified type with the same timestamp as the set_fraction event.
             * @var {x3dom.fields.SFFloat} set_fraction
             * @memberof x3dom.nodeTypes.NurbsSurfaceInterpolator
             * @initvalue 0,0
             * @field x3d
             * @instance
             */
            this.addField_SFVec2f(ctx, 'set_fraction', 0, 0);
            
            this.points = []; //MFVec3f controlPoints
            //this.basisFunsCache = {}; //N[u]
            //this evaluates the curve at set_fraction
            //alternatively, tessellate at some degree dependant resolution and turn into linear positioninterpolator
        },
        {
            fieldChanged: function(fieldName) {
//                 switch (fieldName) {
//                     case 'knot':
//                     case 'order': this.basisFunsCache = {};
//                 }
                if(fieldName === "set_fraction")
                {
                    var value = this.getValue(this._vf.set_fraction);
                    this.postMessage('value_changed', value);
                }
            },
            getValue: function (uv) {
                this.points = this._cf.controlPoint.node._vf.point; 
                var points = this.points.length;
                if (this._vf.uKnot.length !== this._vf.uDimension + this._vf.uOrder) 
					this._vf.uKnot = this.createDefaultKnots(this._vf.uDimension, this._vf.uOrder);
                if (this._vf.vKnot.length !== this._vf.vDimension + this._vf.vOrder) 
					this._vf.vKnot = this.createDefaultKnots(this._vf.vDimension, this._vf.vOrder);
                if (this._vf.weight.length != points) this._vf.weight = Array(points).fill(1.0);
                return this.surfacePoint(uv);
            },
            createDefaultKnots: function (n, o) {
                var knots = Array(n + o).fill(0);
                for (var k = o;
                    k < n; k++)
                    knots[k] = (k-1) / (n-1);
                for (var k = knots.length - o;
                    k < knots.length; k++)
                    knots[k] = 1; //points-1;
                return knots;
            },
            curvePoint: function (u) {
                var nurb = {
                    dimension: this.points.length-1,
                    degree: this._vf.order-1,
                    knots: this._vf.knot,
                    points: this.points,
                    weights: this._vf.weight
                };
                return x3dom.nodeTypes.NurbsCurve.prototype.curvePoint3DH.call(
                    this, nurb.dimension, nurb.degree, nurb.knots, nurb.points, nurb.weights, u);    
            },
            findSpan: function (n, p, u, U) {
                return x3dom.nodeTypes.NurbsCurve.prototype.findSpan(n, p, u, U);
            }, /* findSpan */
            basisFuns: function (i, u, p, U) { // modified to disable cache
                //var uKey = Math.floor(u*10e10);
                //if (this.basisFunsCache[uKey]) return this.basisFunsCache[uKey];
                var N = [], left = [], right = [], saved, temp;
                var j, r;

                N[0] = 1.0;
                for(j = 0; j <= p; j++) {
                    left[j] = 0;
                    right[j] = 0;
                }
                
                for(j = 1; j <= p; j++)	{
                    left[j] = u - U[i+1-j];
                    right[j] = U[i+j] - u;
                    saved = 0.0;

                    for(r = 0; r < j; r++) {
                        temp = N[r] / (right[r+1] + left[j-r]);
                        N[r] = saved + right[r+1] * temp;
                        saved = left[j-r] * temp;
                    }

                    N[j] = saved;
                }
                //this.basisFunsCache[uKey] = N;
                return N;
            } /* basisFuns */
        }
    )
);
