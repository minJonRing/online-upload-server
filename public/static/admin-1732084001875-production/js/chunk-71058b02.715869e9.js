(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71058b02"],{"02b8":function(t,e,i){"use strict";i("acff")},"5e37":function(t,e,i){},"990e":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"company"},[i("el-button",{attrs:{type:"primary",icon:"el-icon-circle-plus-outline"},on:{click:t.handleAddCompany}},[t._v("新增企业")]),i("div",{staticClass:"list scroll"},[i("el-row",{staticClass:"w100",attrs:{gutter:20}},t._l(t.list,(function(e,a){return i("el-col",{key:a,attrs:{xs:12,sm:8,lg:6}},[i("div",{staticClass:"item",style:{"--back":"url("+e.background+")"}},[i("div",{staticClass:"word"},[i("div",{staticClass:"icon"},[i("img",{attrs:{src:e.icon,alt:""}})]),i("div",{staticClass:"name"},[t._v(t._s(e.company))]),i("div",{staticClass:"edit"},[i("el-button",{attrs:{type:"text",icon:"el-icon-document"}}),i("el-button",{staticStyle:{color:"#67c23a"},attrs:{type:"text",icon:"el-icon-edit-outline"},on:{click:function(i){return t.handleEdit(e)}}}),i("el-popconfirm",{staticClass:"ml10",attrs:{title:"确定删除？",placement:"top"},on:{confirm:function(i){return t.handleDelete(e)}}},[i("el-button",{staticStyle:{color:"#f56c6c"},attrs:{slot:"reference",type:"text",icon:"el-icon-delete"},slot:"reference"})],1)],1)])])])})),1)],1),i("el-dialog",{attrs:{title:"新增/编辑",visible:t.isShow,width:"600px"},on:{"update:visible":function(e){t.isShow=e}}},[i("div",{staticStyle:{"padding-top":"18px"}},[i("el-form",{ref:"form",attrs:{model:t.editForm,rules:t.editRules}},[i("el-form-item",{attrs:{label:"名称",prop:"company"}},[i("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.editForm.company,callback:function(e){t.$set(t.editForm,"company",e)},expression:"editForm.company"}})],1),i("el-form-item",{attrs:{label:"logo",prop:"icon"}},[i("div",{staticStyle:{display:"inline-block",width:"100%"}},[i("Upload",{attrs:{url:"/upload/image",width:"60px",height:"60px"},model:{value:t.editForm.icon,callback:function(e){t.$set(t.editForm,"icon",e)},expression:"editForm.icon"}})],1)]),i("el-form-item",{attrs:{label:"主题背景",prop:"background"}},[i("div",{staticStyle:{display:"inline-block",width:"100%"}},[i("Upload",{attrs:{url:"/upload/image",width:"160px",height:"100px"},model:{value:t.editForm.background,callback:function(e){t.$set(t.editForm,"background",e)},expression:"editForm.background"}})],1)]),i("el-form-item",{attrs:{label:"简介",prop:"describe"}},[i("el-input",{attrs:{type:"textarea",rows:"2",placeholder:"请输入",clearable:""},model:{value:t.editForm.describe,callback:function(e){t.$set(t.editForm,"describe",e)},expression:"editForm.describe"}})],1)],1)],1),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.isShow=!1}}},[t._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.handleComfirn}},[t._v("确认")])],1)])],1)},o=[],n=(i("4ec9"),i("b64b"),i("d3b7"),i("6062"),i("0eb6"),i("b7ef"),i("8bd4"),i("ad1f"),i("0238")),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"e-upload"},[i("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"e-avatar-uploader",style:{width:t.cwidth,height:t.height},attrs:{"show-file-list":!1,"element-loading-text":t.progress+"%",action:"#","before-upload":t.beforeAvatarUpload,"http-request":t.handleUploadLearnSignVoucherFileChange,"attr-icon":"注:只能上传"+t.type.join()}},[t.image?i("img",{ref:"img",staticClass:"image",attrs:{src:t.image}}):i("i",{staticClass:"el-icon el-icon-upload2"})])],1)},r=[],c=i("5530"),s=(i("a9e3"),i("4de4"),i("ac1f"),i("00b4"),i("4d63"),i("c607"),i("2c3e"),i("25f0"),i("5319"),i("b0c0"),i("a15b"),i("d81d"),i("2f62")),d={name:"UploadProT",props:{model:n["rulesT"].Any,read:n["rulesT"].Boolean,url:n["rulesT"].String,deleteUrl:n["rulesT"].String,type:{type:Array,default:function(){return["image"]}},size:{type:Number,default:80},param:n["rulesT"].Object,filterData:{type:Function},width:{type:String,default:"100px"},height:{type:String,default:"100px"},auto:{type:Boolean,default:!1}},model:{prop:"model",event:"change"},data:function(){return{loading:!1,progress:0,cwidth:this.width}},computed:Object(c["a"])({image:{get:function(){return this.model},set:function(t){this.$emit("change",t)}}},Object(s["b"])(["local"])),created:function(){},methods:{beforeAvatarUpload:function(t){var e=this.type.filter((function(e){return new RegExp(e).test(t.type)||e===t.name.replace(/.+(?=\.)|\./g,"")})).length>0,i=t.size/1024/1024<this.size;return e||this.$message.error("请上传格式正确的文件 [ ".concat(this.type.join(",")," ] ")),i||this.$message.error("上传文件大小不能超过".concat(this.size,"MB!")),e&&i},handleUploadLearnSignVoucherFileChange:function(t){var e=this;this.$global.loading=!0;var i=t.file,a=new FormData;a.append("file",i);var o=Object.keys(this.param);o.length&&o.map((function(t){a.append(t,e.param[t])})),this.$AJAX({url:this.url,method:"post",data:a,onUploadProgress:function(t){var i=t.loaded,a=t.total;e.progress=Math.ceil(i/a*100)}}).then((function(t){var i=t.data,a=i[0].filePath;e.image=a})).finally((function(){e.$global.loading=!1}))},handleDelete:function(t,e){this.image=""}}},u=d,p=(i("d1b2"),i("2877")),m=Object(p["a"])(u,l,r,!1,null,"38bc8108",null),f=m.exports,h=i("4279"),g={name:"CompanyIndex",components:{Upload:f},data:function(){return{list:[],isShow:!1,editForm:{icon:"",background:"",company:"",describe:""},editRules:{company:n["blur"]},editFormInit:{}}},computed:{},watch:{},created:function(){this.editFormInit=structuredClone(this.editForm),this.getData()},methods:{getData:function(){var t=this;this.isShow=!1,this.$global.loading=!0,Object(h["a"])({url:"/company"}).then((function(e){var i=e.data;t.list=i})).finally((function(){t.$global.loading=!1}))},handleAddCompany:function(){this.editForm=structuredClone(this.editFormInit),this.isShow=!0},handleEdit:function(t){console.log(t),this.editForm=structuredClone(t),this.isShow=!0},handleDelete:function(t){var e=this,i=t._id;this.$global.loading=!0,Object(h["a"])({url:"/company/".concat(i),method:"delete"}).then((function(t){e.getData()})).finally((function(){e.$global.loading=!1}))},handleComfirn:function(){var t=this;this.$refs.form.validate((function(e){if(!e)return t.$notify.warning("必填项未填写完整，请检查！"),!1;t.$global.loading=!0;var i=t.editForm._id;if(i){var a=t.editForm,o=a.icon,n=a.background,l=a.company,r=a.describe,c={icon:o,background:n,company:l,describe:r};Object(h["a"])({url:"/company/".concat(i),method:"put",data:c}).then((function(){t.getData()})).finally((function(){t.$global.loading=!1}))}else Object(h["a"])({url:"/company",method:"post",data:t.editForm}).then((function(){t.getData()})).finally((function(){t.$global.loading=!1}))}))}}},b=g,y=(i("02b8"),Object(p["a"])(b,a,o,!1,null,"e3f856ae",null));e["default"]=y.exports},acff:function(t,e,i){},d1b2:function(t,e,i){"use strict";i("5e37")}}]);