/** @namespace x3dom.nodeTypes */
/*
 * X3DOM JavaScript Library
 * http://www.x3dom.org
 *
 * (C)2009 Fraunhofer IGD, Darmstadt, Germany
 * Dual licensed under the MIT and GPL
 */

/* ### BinaryGeometry ### */
x3dom.registerNodeType(
    "BinaryGeometry",
    "Geometry3D",
    defineClass(x3dom.nodeTypes.X3DBinaryContainerGeometryNode,
        
        /**
         * Constructor for BinaryGeometry
         * @constructs x3dom.nodeTypes.BinaryGeometry
         * @x3d x.x
         * @component Geometry3D
         * @status experimental
         * @extends x3dom.nodeTypes.X3DBinaryContainerGeometryNode
         * @param {Object} [ctx=null] - context object, containing initial settings like namespace
         */
        function (ctx) {
            x3dom.nodeTypes.BinaryGeometry.superClass.call(this, ctx);


            /**
             *
             * @var {SFString} index
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue ""
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'index', "");   // Uint16

            /**
             *
             * @var {SFString} coord
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue ""
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'coord', "");   // Float32

            /**
             *
             * @var {SFString} normal
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue ""
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'normal', "");

            /**
             *
             * @var {SFString} texCoord
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue ""
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'texCoord', "");    // THINKABOUTME: add texCoord1, texCoord2, ...?

            /**
             *
             * @var {SFString} color
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue ""
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'color', "");

            /**
             *
             * @var {SFString} tangent
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue ""
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'tangent', "");     // TODO

            /**
             *
             * @var {SFString} binormal
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue ""
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'binormal', "");    // TODO

            // Typed Array View Types
            // Int8, Uint8, Int16, Uint16, Int32, Uint32, Float32, Float64

            /**
             *
             * @var {SFString} indexType
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue "Uint16"
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'indexType', "Uint16");

            /**
             *
             * @var {SFString} coordType
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue "Float32"
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'coordType', "Float32");

            /**
             *
             * @var {SFString} normalType
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue "Float32"
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'normalType', "Float32");

            /**
             *
             * @var {SFString} texCoordType
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue "Float32"
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'texCoordType', "Float32");

            /**
             *
             * @var {SFString} colorType
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue "Float32"
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'colorType', "Float32");

            /**
             *
             * @var {SFString} tangentType
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue "Float32"
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'tangentType', "Float32");

            /**
             *
             * @var {SFString} binormalType
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue "Float32"
             * @field x3dom
             * @instance
             */
            this.addField_SFString(ctx, 'binormalType', "Float32");


            /**
             *
             * @var {SFBool} normalAsSphericalCoordinates
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue false
             * @field x3dom
             * @instance
             */
            this.addField_SFBool(ctx, 'normalAsSphericalCoordinates', false);

            /**
             *
             * @var {SFBool} rgbaColors
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue false
             * @field x3dom
             * @instance
             */
            this.addField_SFBool(ctx, 'rgbaColors', false);

            /**
             *
             * @var {SFInt32} numTexCoordComponents
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue 2
             * @field x3dom
             * @instance
             */
            this.addField_SFInt32(ctx, 'numTexCoordComponents', 2);

            /**
             *
             * @var {SFBool} normalPerVertex
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue true
             * @field x3dom
             * @instance
             */
            this.addField_SFBool(ctx, 'normalPerVertex', true);

            /**
             *
             * @var {SFBool} idsPerVertex
             * @memberof x3dom.nodeTypes.BinaryGeometry
             * @initvalue false
             * @field x3dom
             * @instance
             */
            this.addField_SFBool(ctx, 'idsPerVertex', false);    /// Experimental flag to decide if IDs are in texCoords

            // workaround
            this._hasStrideOffset = false;
            this._mesh._numPosComponents = this._vf.normalAsSphericalCoordinates ? 4 : 3;
            this._mesh._numTexComponents = this._vf.numTexCoordComponents;
            this._mesh._numColComponents = this._vf.rgbaColors ? 4 : 3;
            this._mesh._numNormComponents = this._vf.normalAsSphericalCoordinates ? 2 : 3;

            // info helper members
            this._vertexCountSum = 0;
            for (var i=0; i<this._vf.vertexCount.length; ++i) {
                this._vertexCountSum += this._vf.vertexCount[i];
            }
        
        },
        {
            parentAdded: function(parent)
            {
                // TODO; also handle multiple shape parents!
                var offsetInd, strideInd, offset, stride;

                offsetInd = this._vf.coord.lastIndexOf('#');
                strideInd = this._vf.coord.lastIndexOf('+');
                if (offsetInd >= 0 && strideInd >= 0) {
                    offset = +this._vf.coord.substring(++offsetInd, strideInd);
                    stride = +this._vf.coord.substring(strideInd);
                    parent._coordStrideOffset = [stride, offset];
                    this._hasStrideOffset = true;
                    if ((offset / 8) - Math.floor(offset / 8) == 0) {
                        this._mesh._numPosComponents = 4;
                    }
                    //x3dom.debug.logInfo("coord stride/offset: " + stride + ", " + offset);
                }
                else if (strideInd >= 0) {
                    stride = +this._vf.coord.substring(strideInd);
                    parent._coordStrideOffset = [stride, 0];
                    if ((stride / 8) - Math.floor(stride / 8) == 0) {
                        this._mesh._numPosComponents = 4;   // ???
                    }
                    //x3dom.debug.logInfo("coord stride: " + stride);
                }

                offsetInd = this._vf.normal.lastIndexOf('#');
                strideInd = this._vf.normal.lastIndexOf('+');
                if (offsetInd >= 0 && strideInd >= 0) {
                    offset = +this._vf.normal.substring(++offsetInd, strideInd);
                    stride = +this._vf.normal.substring(strideInd);
                    parent._normalStrideOffset = [stride, offset];
                    //x3dom.debug.logInfo("normal stride/offset: " + stride + ", " + offset);
                }
                else if (strideInd >= 0) {
                    stride = +this._vf.normal.substring(strideInd);
                    parent._normalStrideOffset = [stride, 0];
                    //x3dom.debug.logInfo("normal stride: " + stride);
                }

                offsetInd = this._vf.texCoord.lastIndexOf('#');
                strideInd = this._vf.texCoord.lastIndexOf('+');
                if (offsetInd >= 0 && strideInd >= 0) {
                    offset = +this._vf.texCoord.substring(++offsetInd, strideInd);
                    stride = +this._vf.texCoord.substring(strideInd);
                    parent._texCoordStrideOffset = [stride, offset];
                    //x3dom.debug.logInfo("texCoord stride/offset: " + stride + ", " + offset);
                }
                else if (strideInd >= 0) {
                    stride = +this._vf.texCoord.substring(strideInd);
                    parent._texCoordStrideOffset = [stride, 0];
                    //x3dom.debug.logInfo("texCoord stride: " + stride);
                }

                offsetInd = this._vf.color.lastIndexOf('#');
                strideInd = this._vf.color.lastIndexOf('+');
                if (offsetInd >= 0 && strideInd >= 0) {
                    offset = +this._vf.color.substring(++offsetInd, strideInd);
                    stride = +this._vf.color.substring(strideInd);
                    parent._colorStrideOffset = [stride, offset];
                    //x3dom.debug.logInfo("color stride/offset: " + stride + ", " + offset);
                }
                else if (strideInd >= 0) {
                    stride = +this._vf.color.substring(strideInd);
                    parent._colorStrideOffset = [stride, 0];
                    //x3dom.debug.logInfo("color stride: " + stride);
                }

                if (this._vf.indexType != "Uint16" && !x3dom.caps.INDEX_UINT)
                    x3dom.debug.logWarning("Index type " + this._vf.indexType + " problematic");
            },

            doIntersect: function(line)
            {
                var min = this.getMin();
                var max = this.getMax();
                var isect = line.intersect(min, max);

                if (isect && line.enter < line.dist) {
                    line.dist = line.enter;
                    line.hitObject = this;
                    line.hitPoint = line.pos.add(line.dir.multiply(line.enter));
                    return true;
                }
                else {
                    return false;
                }
            },

            getPrecisionMax: function(type)
            {
                switch(this._vf[type])
                {
                    case "Int8":
                        return 127.0;
                    case "Uint8":
                        return 255.0;
                    case "Int16":
                        return 32767.0;
                    case "Uint16":
                        return 65535.0;
                    case "Int32":
                        return 2147483647.0;
                    case "Uint32":
                        return 4294967295.0;
                    case "Float32":
                    case "Float64":
                    default:
                        return 1.0;
                }
            }
        }
    )
);