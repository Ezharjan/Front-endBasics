<!-----素材上传组件-------->
<template>
    <b-modal id="modal-upload" title="Upload" centered @ok="upload">
        <div id="element-upload">
            <b-list-group flush>
                <b-list-group-item>
                    <p class="xr-d-block">
                        <b>Type</b>
                    </p>
                    <div class="xr-container">
                        <div class="xr-d-flex-v xr-align-center type">
                            <b-img
                                class="xr-d-block"
                                src="../../assets/upload_type_model_active.png"
                                v-if="isModelSelected==true"
                            ></b-img>

                            <b-img
                                class="xr-d-block"
                                src="../../assets/upload_type_model.png"
                                v-else-if="isModelSelected==false"
                                @click="selected"
                            ></b-img>

                            <p class="xr-d-block xr-f-small">3D Object</p>
                        </div>

                        <div class="xr-d-flex-v xr-align-center type">
                            <b-img
                                class="xr-d-block"
                                src="../../assets/upload_type_texture_active.png"
                                v-if="isTextureSelected==true"
                            ></b-img>
                            <b-img
                                class="xr-d-block"
                                src="../../assets/upload_type_texture.png"
                                v-if="isTextureSelected==false"
                                @click="selected"
                            ></b-img>
                            <p class="xr-d-block xr-f-small">Texture</p>
                        </div>
                    </div>
                </b-list-group-item>
                <b-list-group-item
                    class="xr-d-flex-v xr-justify-space-bwteen"
                    v-if="isModelSelected==true"
                >
                    <b-input-group required="true" prepend="File">
                        <b-form-file
                            v-model="xrMaterialObject.objFile"
                            :state="Boolean(xrMaterialObject.objFile)"
                            placeholder="Upload file"
                            accept=".obj, .fbx, .zip"
                            drop-placeholder="Drop file here..."
                        ></b-form-file>
                    </b-input-group>
                    <!-- <b-input-group required="true" prepend="Screenshot" style="margin-top:10px">
                        <b-form-file
                            v-model="xrMaterialObject.textureFile"
                            :state="Boolean(xrMaterialObject.textureFile)"
                            placeholder="Upload screenshot"
                            accept=".jpg, .png, .gif"
                            drop-placeholder="Drop screenshot here... (<7KB)"
                        ></b-form-file>
                    </b-input-group>-->
                </b-list-group-item>
                <b-list-group-item v-if="isModelSelected==true">
                    <b-input-group prepend="Name">
                        <b-form-input v-model="xrMaterialObject.name" placeholder="Enter file name"></b-form-input>
                    </b-input-group>
                </b-list-group-item>
                <b-list-group-item v-if="isModelSelected==true">
                    <!-- <b-form-checkbox v-model="isPreview" switch>Preview</b-form-checkbox> -->
                    <div id="previewer-container">
                        <!-- <ModelPreviewer  :fixed="true" :display-obj="disObject" :height="236.25" :width="420" /> -->
                        <ViewPort
                            :open-buffer="true"
                            :editor="editor"
                            :render-width="420"
                            :render-height="236.25"
                        />
                    </div>
                </b-list-group-item>

                <b-list-group-item
                    class="xr-d-flex-v xr-justify-space-bwteen"
                    v-if="isTextureSelected==true"
                >
                    <b-input-group required="true" prepend="File">
                        <b-form-file
                            v-model="xrMaterialObject.textureFile"
                            :state="Boolean(xrMaterialObject.textureFile)"
                            placeholder="Upload file"
                            accept=".png, .jpg, .tif, .bmp, .tga"
                            drop-placeholder="Drop file here..."
                        ></b-form-file>
                    </b-input-group>
                </b-list-group-item>
                <b-list-group-item v-if="isTextureSelected==true">
                    <b-input-group prepend="Name">
                        <b-form-input v-model="xrMaterialObject.name" placeholder="Enter file name"></b-form-input>
                    </b-input-group>
                </b-list-group-item>
                <b-list-group-item v-if="isTextureSelected==true">
                    <!-- <b-form-checkbox v-model="isPreview" switch>Preview</b-form-checkbox> -->
                    <div id="previewer-container">
                        <b-img width="420px" height="236.25px" :src="imgData"></b-img>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </div>
    </b-modal>
</template>

<script>
import Loader from '../../scripts/Loader';
//import * as tmpServer from "../../scripts/api/tmpDB";
import * as MaterialService from '../../scripts/api/MaterialService'
import * as THREE from 'three';
import ViewPort from '../ViewPort';
import Editor from '../../scripts/Editor';

//var objID = 0;
export default {
    name: 'XRMaterialUploader',
    components: {
        ViewPort
    },
    data: function () {
        return {
            isModelSelected: true,
            isTextureSelected: false,

            xrMaterialObject: {
                type: 'model',
                objFile: null,
                textureFile: null,
                screenshot: null,
                name: null,
                data: null
            },

            imgData: null,

            loader: new Loader(),
            // isPreview: false,
            uploadObj: null,
            editor: new Editor(),
            token: ''
        };
    },
    computed: {
        disObject() {
            return this.uploadObj;
        }
    },
    watch: {
        'xrMaterialObject.objFile': function () {
            this.loader.loadFile(this.xrMaterialObject.objFile, obj => {
                console.log('obj Animations here: ', obj.animations);
                if (this.xrMaterialObject.data && this.xrMaterialObject.type == 'model') {
                    this.editor.removeObject(this.xrMaterialObject.data);
                }
                this.xrMaterialObject.data = obj;
                this.editor.addObject(this.xrMaterialObject.data);
                this.editor.select(this.xrMaterialObject.data);
                this.editor.focus(this.xrMaterialObject.data);
                this.xrMaterialObject.type = 'model';
                this.uploadObj = this.xrMaterialObject;

            });
        },
        'xrMaterialObject.textureFile': function () {
            this.loader.loadFile(this.xrMaterialObject.textureFile, texture => {

                this.xrMaterialObject.screenshot = texture;

                if (this.isTextureSelected) {
                    this.imgData = texture.image.src;
                    this.xrMaterialObject.data = texture.image.src;
                    this.xrMaterialObject.type = 'texture';
                    this.uploadObj = this.xrMaterialObject;
                }
            });
        },
        'xrMaterialObject.name': function () {
            if (this.xrMaterialObject.data && this.isModelSelected)
                this.xrMaterialObject.data.name = this.xrMaterialObject.name;
        }
    },

    methods: {
        getImgShot() {
            let container = document.getElementById('previewer-container');
            let dataURL = '';
            let setWidth = 100;//压缩宽度尽量统一
            // let compressQuality = 0.5;//压缩质量依用户所选素材而定
            if (this.isModelSelected) {
                //为何截图是全黑？
                //原因：1.缓冲区未保存； 2.压缩算法不适用，应在图片创建初始阶段就载入
                let viewerCanvas = container.getElementsByTagName('canvas')[0];
                let img = new Image();
                img.src = viewerCanvas.toDataURL() //将渲染载体canvas转化为base64
                dataURL = img.src;
                // console.log('Original data here : ', dataURL);
            } else {
                let imgEl = container.getElementsByTagName('img')[0];
                dataURL = imgEl.src;
                // let compressURL = this.convertImgToBase64Sync(dataURL);
                // console.log('After compression here: ', compressURL);
                // return compressURL;

            }
            console.log('Original data size : ', getImgByteSize(dataURL));
            this.compression(dataURL, setWidth, 1, function (dataURL) {
                let fruit = dataURL;
                console.log('after compression: ', fruit);


                console.log('Compressed size : ', getImgByteSize(fruit));



                //TODO:UPLOADsERVICE




            });
        },

        compression(base64, widthSet, quality, callback) {
            var newImage = new Image();
            newImage.src = base64;
            newImage.setAttribute("crossOrigin", 'Anonymous');//url为外域时需要
            var imgWidth, imgHeight;
            newImage.onload = function () {
                imgWidth = this.width;
                imgHeight = this.height;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                // if (Math.max(imgWidth, imgHeight) > widthSet) {
                //     if (imgWidth > imgHeight) {
                //         canvas.width = widthSet;
                //         canvas.height = widthSet * imgHeight / imgWidth;
                //     } else {
                //         canvas.height = widthSet;
                //         canvas.width = widthSet * imgWidth / imgHeight;
                //     }
                // } else {
                //     canvas.width = imgWidth;
                //     canvas.height = imgHeight;
                // }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(this, 0, 0, imgWidth, imgHeight, 0, 0, 80, 80);
                // ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                var base64 = canvas.toDataURL("image/jpeg", quality);//压缩语句,压缩系数0-1之间
                callback(base64);//必须通过回调函数返回，否则无法及时拿到该值
                // console.log('fruit:', base64);
                // return base642;
            }
        },



        getImgByteSize(base64Data) {
            if (base64Data) { //获取base64图片byte大小
                const equalIndex = base64Data.indexOf('='); //获取=号下标
                if (equalIndex > 0) {
                    const str = base64Data.substring(0, equalIndex); //去除=号
                    const strLength = str.length;
                    const fileLength = strLength - (strLength / 8) * 2; //真实的图片byte大小
                    size = Math.floor(fileLength); //向下取整
                } else {
                    const strLength = base64Data.length;
                    const fileLength = strLength - (strLength / 8) * 2;
                    size = Math.floor(fileLength); //向下取整
                }
            } else {
                base64Data.size = null;
            }
            return size;
        },


        convertImgToBase64Sync(url) {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let img = new Image;
            img.src = url;
            let width = img.width;
            let height = img.height;
            ctx.drawImage(img, 0, 0, width, height, 0, 0, 50, 50);
            // 按比例压缩
            // ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
            let dataURL = canvas.toDataURL("image/jpeg");
            canvas = null;
            return dataURL;
        },

        selected() {
            (!this.isModelSelected) && ([this.isModelSelected, this.isTextureSelected] = [this.isTextureSelected, this.isModelSelected])
                || (!this.isTextureSelected) && ([this.isModelSelected, this.isTextureSelected] = [this.isTextureSelected, this.isModelSelected]);
        },

        upload(event) {
            if (this.xrMaterialObject.data == null) {
                if (this.isModelSelected && this.xrMaterialObject.objFile == null) {
                    event.preventDefault();
                }
                event.preventDefault();
            }
            else {
                //this.uploadService(); 
                this.getImgShot();

            }
        },

        uploadService: async function () {
            /* let uploadJSON = {};
            uploadJSON.id = objID++;
            uploadJSON.type = this.uploadObj.type;
            uploadJSON.name = this.uploadObj.name;

            this.isModelSelected && (uploadJSON.data = this.xrMaterialObject.objFile);
            this.isTextureSelected && (uploadJSON.data = this.xrMaterialObject.textureFile);

            uploadJSON.screenshot = this.uploadObj.screenshot.image.src;
            tmpServer.postXRMaterial(uploadJSON); */
            let formData = new FormData();
            if (this.isModelSelected)
                formData.append('fileName', this.xrMaterialObject.objFile);
            else
                formData.append('fileName', this.xrMaterialObject.textureFile);

            let uploadFileRep = await MaterialService.uploadFile(formData, this.token);

            let param = {
                fileUrl: uploadFileRep.data['data'],
                // screenShot: this.uploadObj.screenshot.image.src,
                screenShot: this.getImgShot(),
                desc: '',
                name: this.uploadObj.name,
                type: this.uploadObj.type
            }

            let addMaterialRep = await MaterialService.addMaterial(param, this.token);

            if (addMaterialRep.data['success']) {
                this.$RM.signals.refreshMaterialList.dispatch();
            }

            this.reset();
        },

        reset() {
            this.xrMaterialObject.screenshot = null;
        }
    },


    created() {
        let light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(1, 1, 1);
        light.lookAt(0, 0, 0);
        this.editor.addObject(light);
        this.token = this.$RM.getUserCode();
    }
};
</script>

<style scoped>
.type {
    margin: 10px;
    width: 120px;
    height: 90px;
}
</style>