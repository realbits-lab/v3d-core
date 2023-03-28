(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["v3d-core"] = factory();
	else
		root["v3d-core"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper.ts":
/*!***********************!*\
  !*** ./src/helper.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V3DHelper": () => (/* binding */ V3DHelper)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/** Copyright (c) 2021 The v3d Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class V3DHelper {
    constructor(core) {
        this.core = core;
    }
    /**
     * Make a node cast shadow from a ShadowGenerator
     * @param shadowGenerator
     * @param nodeName
     */
    addNodeToShadowCasterByName(shadowGenerator, nodeName) {
        shadowGenerator?.addShadowCaster(this.core.scene.getNodeByName(nodeName));
    }
    /**
     * Make nodes cast shadow from a ShadowGenerator
     * @param shadowGenerator
     * @param nodeName
     */
    addNodeToShadowCasterContainsName(shadowGenerator, nodeName) {
        if (!shadowGenerator)
            return;
        for (const node of this.core.scene.getNodes()) {
            if (node && node.name.includes(nodeName)) {
                shadowGenerator.addShadowCaster(node);
            }
        }
    }
    /**
     * Make node receive shadow
     * @param nodeName
     */
    makeReceiveShadowByName(nodeName) {
        this.core.scene.getNodeByName(nodeName).receiveShadows = true;
    }
    /**
     * Make nodes receive shadow
     * @param nodeName
     */
    makeReceiveShadowContainsName(nodeName) {
        for (const node of this.core.scene.getNodes()) {
            if (node && node.name.includes(nodeName)) {
                try {
                    node.receiveShadows = true;
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    }
    showSkeletonDebug(skeleton, mesh) {
        const options = {
            pauseAnimations: true,
            returnToRest: false,
            computeBonesUsingShaders: true,
            useAllBones: true,
            displayMode: _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.SkeletonViewer.DISPLAY_LINES, //A value that controls which display mode to use. (SkeletonViewer.DISPLAY_LINES = 0, SkeletonViewer.DISPLAY_SPHERES = 1, SkeletonViewer.DISPLAY_SPHERE_AND_SPURS = 2). Default = 0.
        };
        const skeletonViewer = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.SkeletonViewer(skeleton, //Target Skeleton
        mesh, //That skeletons Attached Mesh or a Node with the same globalMatrix
        this.core.scene, //The Scene scope
        true, //autoUpdateBoneMatrices?
        mesh.renderingGroupId > 0 ? mesh.renderingGroupId + 1 : 1, // renderingGroupId
        options);
        return skeletonViewer;
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/errors.ts":
/*!*******************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/errors.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoneNotFoundError": () => (/* binding */ BoneNotFoundError)
/* harmony export */ });
/**
 * Throws when mandatory bone could not find
 */
class BoneNotFoundError extends Error {
    constructor(boneName) {
        super(`Bone:${boneName} NotFound`);
        this.boneName = boneName;
        this.name = 'BoneNotFoundError';
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/humanoid-bone.ts":
/*!**************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/humanoid-bone.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HumanoidBone": () => (/* binding */ HumanoidBone)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./src/importer/babylon-vrm-loader/src/errors.ts");

/**
 * HumanoidBone を取得するメソッド群
 * @see https://docs.unity3d.com/ja/2018.3/ScriptReference/HumanBodyBones.html
 */
class HumanoidBone {
    constructor(nodeMap) {
        this.nodeMap = nodeMap;
    }
    dispose() {
        this.nodeMap = null;
    }
    /**
     * 尻
     */
    get hips() {
        return this.getMandatoryBone('hips');
    }
    /**
     * 左太もも
     */
    get leftUpperLeg() {
        return this.getMandatoryBone('leftUpperLeg');
    }
    /**
     * 右太もも
     */
    get rightUpperLeg() {
        return this.getMandatoryBone('rightUpperLeg');
    }
    /**
     * 左ひざ
     */
    get leftLowerLeg() {
        return this.getMandatoryBone('leftLowerLeg');
    }
    /**
     * 右ひざ
     */
    get rightLowerLeg() {
        return this.getMandatoryBone('rightLowerLeg');
    }
    /**
     * 左足首
     */
    get leftFoot() {
        return this.getMandatoryBone('leftFoot');
    }
    /**
     * 右足首
     */
    get rightFoot() {
        return this.getMandatoryBone('rightFoot');
    }
    /**
     * 脊椎の第一
     */
    get spine() {
        return this.getMandatoryBone('spine');
    }
    /**
     * 胸
     */
    get chest() {
        return this.getMandatoryBone('chest');
    }
    /**
     * 首
     */
    get neck() {
        return this.getMandatoryBone('neck');
    }
    /**
     * 頭
     */
    get head() {
        return this.getMandatoryBone('head');
    }
    /**
     * 左肩
     */
    get leftShoulder() {
        return this.getMandatoryBone('leftShoulder');
    }
    /**
     * 右肩
     */
    get rightShoulder() {
        return this.getMandatoryBone('rightShoulder');
    }
    /**
     * 左上腕
     */
    get leftUpperArm() {
        return this.getMandatoryBone('leftUpperArm');
    }
    /**
     * 右上腕
     */
    get rightUpperArm() {
        return this.getMandatoryBone('rightUpperArm');
    }
    /**
     * 左ひじ
     */
    get leftLowerArm() {
        return this.getMandatoryBone('leftLowerArm');
    }
    /**
     * 右ひじ
     */
    get rightLowerArm() {
        return this.getMandatoryBone('rightLowerArm');
    }
    /**
     * 左手首
     */
    get leftHand() {
        return this.getMandatoryBone('leftHand');
    }
    /**
     * 右手首
     */
    get rightHand() {
        return this.getMandatoryBone('rightHand');
    }
    /**
     * 左つま先(Optional)
     */
    get leftToes() {
        return this.getOptionalBone('leftToes');
    }
    /**
     * 右つま先(Optional)
     */
    get rightToes() {
        return this.getOptionalBone('rightToes');
    }
    /**
     * 左目(Optional)
     */
    get leftEye() {
        return this.getOptionalBone('leftEye');
    }
    /**
     * 右目(Optional)
     */
    get rightEye() {
        return this.getOptionalBone('rightEye');
    }
    /**
     * 顎(Optional)
     */
    get jaw() {
        return this.getOptionalBone('jaw');
    }
    /**
     * 左親指第一指骨(Optional)
     */
    get leftThumbProximal() {
        return this.getOptionalBone('leftThumbProximal');
    }
    /**
     * 左親指第二指骨(Optional)
     */
    get leftThumbIntermediate() {
        return this.getOptionalBone('leftThumbIntermediate');
    }
    /**
     * 左親指第三指骨(Optional)
     */
    get leftThumbDistal() {
        return this.getOptionalBone('leftThumbDistal');
    }
    /**
     * 左人差し指第一指骨(Optional)
     */
    get leftIndexProximal() {
        return this.getOptionalBone('leftIndexProximal');
    }
    /**
     * 左人差し指第二指骨(Optional)
     */
    get leftIndexIntermediate() {
        return this.getOptionalBone('leftIndexIntermediate');
    }
    /**
     * 左人差し指第三指骨(Optional)
     */
    get leftIndexDistal() {
        return this.getOptionalBone('leftIndexDistal');
    }
    /**
     * 左中指第一指骨(Optional)
     */
    get leftMiddleProximal() {
        return this.getOptionalBone('leftMiddleProximal');
    }
    /**
     * 左中指第二指骨(Optional)
     */
    get leftMiddleIntermediate() {
        return this.getOptionalBone('leftMiddleIntermediate');
    }
    /**
     * 左中指第三指骨(Optional)
     */
    get leftMiddleDistal() {
        return this.getOptionalBone('leftMiddleDistal');
    }
    /**
     * 左薬指第一指骨(Optional)
     */
    get leftRingProximal() {
        return this.getOptionalBone('leftRingProximal');
    }
    /**
     * 左薬指第二指骨(Optional)
     */
    get leftRingIntermediate() {
        return this.getOptionalBone('leftRingIntermediate');
    }
    /**
     * 左薬指第三指骨(Optional)
     */
    get leftRingDistal() {
        return this.getOptionalBone('leftRingDistal');
    }
    /**
     * 左小指第一指骨(Optional)
     */
    get leftLittleProximal() {
        return this.getOptionalBone('leftLittleProximal');
    }
    /**
     * 左小指第二指骨(Optional)
     */
    get leftLittleIntermediate() {
        return this.getOptionalBone('leftLittleIntermediate');
    }
    /**
     * 左小指第三指骨(Optional)
     */
    get leftLittleDistal() {
        return this.getOptionalBone('leftLittleDistal');
    }
    /**
     * 右親指第一指骨(Optional)
     */
    get rightThumbProximal() {
        return this.getOptionalBone('rightThumbProximal');
    }
    /**
     * 右親指第二指骨(Optional)
     */
    get rightThumbIntermediate() {
        return this.getOptionalBone('rightThumbIntermediate');
    }
    /**
     * 右親指第三指骨(Optional)
     */
    get rightThumbDistal() {
        return this.getOptionalBone('rightThumbDistal');
    }
    /**
     * 右人差し指第一指骨(Optional)
     */
    get rightIndexProximal() {
        return this.getOptionalBone('rightIndexProximal');
    }
    /**
     * 右人差し指第二指骨(Optional)
     */
    get rightIndexIntermediate() {
        return this.getOptionalBone('rightIndexIntermediate');
    }
    /**
     * 右人差し指第三指骨(Optional)
     */
    get rightIndexDistal() {
        return this.getOptionalBone('rightIndexDistal');
    }
    /**
     * 右中指第一指骨(Optional)
     */
    get rightMiddleProximal() {
        return this.getOptionalBone('rightMiddleProximal');
    }
    /**
     * 右中指第二指骨(Optional)
     */
    get rightMiddleIntermediate() {
        return this.getOptionalBone('rightMiddleIntermediate');
    }
    /**
     * 右中指第三指骨(Optional)
     */
    get rightMiddleDistal() {
        return this.getOptionalBone('rightMiddleDistal');
    }
    /**
     * 右薬指第一指骨(Optional)
     */
    get rightRingProximal() {
        return this.getOptionalBone('rightRingProximal');
    }
    /**
     * 右薬指第二指骨(Optional)
     */
    get rightRingIntermediate() {
        return this.getOptionalBone('rightRingIntermediate');
    }
    /**
     * 右薬指第三指骨(Optional)
     */
    get rightRingDistal() {
        return this.getOptionalBone('rightRingDistal');
    }
    /**
     * 右小指第一指骨(Optional)
     */
    get rightLittleProximal() {
        return this.getOptionalBone('rightLittleProximal');
    }
    /**
     * 右小指第二指骨(Optional)
     */
    get rightLittleIntermediate() {
        return this.getOptionalBone('rightLittleIntermediate');
    }
    /**
     * 右小指第三指骨(Optional)
     */
    get rightLittleDistal() {
        return this.getOptionalBone('rightLittleDistal');
    }
    /**
     * 上胸(Optional)
     */
    get upperChest() {
        return this.getOptionalBone('upperChest');
    }
    /**
     * 必須ボーンを取得する。取得出来ない場合は例外を発生する
     *
     * @throws BoneNotFoundError
     * @param name HumanoidBoneName
     */
    getMandatoryBone(name) {
        const node = this.nodeMap[name];
        if (!node) {
            throw new _errors__WEBPACK_IMPORTED_MODULE_0__.BoneNotFoundError(name);
        }
        return node;
    }
    /**
     * オプショナルボーンを取得する
     *
     * @param name HumanoidBoneName
     */
    getOptionalBone(name) {
        return (this.nodeMap && this.nodeMap[name]) || null;
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/index.ts":
/*!******************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/index.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoneNotFoundError": () => (/* reexport safe */ _errors__WEBPACK_IMPORTED_MODULE_0__.BoneNotFoundError),
/* harmony export */   "HumanoidBone": () => (/* reexport safe */ _humanoid_bone__WEBPACK_IMPORTED_MODULE_1__.HumanoidBone),
/* harmony export */   "IVRMMaterialPropertyShader": () => (/* reexport safe */ _vrm_interfaces__WEBPACK_IMPORTED_MODULE_6__.IVRMMaterialPropertyShader),
/* harmony export */   "MaterialValueBindingMerger": () => (/* reexport safe */ _material_value_binding_merger__WEBPACK_IMPORTED_MODULE_2__.MaterialValueBindingMerger),
/* harmony export */   "VCAST_vci_material_unity": () => (/* reexport safe */ _vcast_vci_material_unity__WEBPACK_IMPORTED_MODULE_3__.VCAST_vci_material_unity),
/* harmony export */   "VRM": () => (/* reexport safe */ _vrm_extension__WEBPACK_IMPORTED_MODULE_4__.VRM),
/* harmony export */   "VRMFileLoader": () => (/* reexport safe */ _vrm_file_loader__WEBPACK_IMPORTED_MODULE_5__.VRMFileLoader),
/* harmony export */   "VRMManager": () => (/* reexport safe */ _vrm_manager__WEBPACK_IMPORTED_MODULE_7__.VRMManager),
/* harmony export */   "VRMMaterialGenerator": () => (/* reexport safe */ _vrm_material_generator__WEBPACK_IMPORTED_MODULE_8__.VRMMaterialGenerator)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./src/importer/babylon-vrm-loader/src/errors.ts");
/* harmony import */ var _humanoid_bone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./humanoid-bone */ "./src/importer/babylon-vrm-loader/src/humanoid-bone.ts");
/* harmony import */ var _material_value_binding_merger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./material-value-binding-merger */ "./src/importer/babylon-vrm-loader/src/material-value-binding-merger.ts");
/* harmony import */ var _vcast_vci_material_unity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vcast-vci-material-unity */ "./src/importer/babylon-vrm-loader/src/vcast-vci-material-unity.ts");
/* harmony import */ var _vrm_extension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vrm-extension */ "./src/importer/babylon-vrm-loader/src/vrm-extension.ts");
/* harmony import */ var _vrm_file_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./vrm-file-loader */ "./src/importer/babylon-vrm-loader/src/vrm-file-loader.ts");
/* harmony import */ var _vrm_interfaces__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vrm-interfaces */ "./src/importer/babylon-vrm-loader/src/vrm-interfaces.ts");
/* harmony import */ var _vrm_manager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vrm-manager */ "./src/importer/babylon-vrm-loader/src/vrm-manager.ts");
/* harmony import */ var _vrm_material_generator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./vrm-material-generator */ "./src/importer/babylon-vrm-loader/src/vrm-material-generator.ts");












/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/material-value-binding-merger.ts":
/*!******************************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/material-value-binding-merger.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialValueBindingMerger": () => (/* binding */ MaterialValueBindingMerger)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var babylon_mtoon_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babylon-mtoon-material */ "./node_modules/babylon-mtoon-material/dist/index.module.js");
/* harmony import */ var babylon_mtoon_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babylon_mtoon_material__WEBPACK_IMPORTED_MODULE_2__);



const PBRMaterialTextureMap = {
    _MainTex: 'albedoTexture',
};
const PBRMaterialColorMap = {
    _Color: 'albedoColor',
};
const MToonMaterialTextureMap = {
    _MainTex: 'diffuseTexture',
    _EmissionMap: 'emissiveTexture',
    _BumpMap: 'bumpTexture',
    _ShadeTexture: 'shadeTexture',
    _ReceiveShadowTexture: 'receiveShadowTexture',
    _ShadingGradeTexture: 'shadingGradeTexture',
    _RimTexture: 'rimTexture',
    _SphereAdd: 'matCapTexture',
    _OutlineWidthTexture: 'outlineWidthTexture',
    _UvAnimMaskTexture: 'uvAnimationMaskTexture',
};
const MToonMaterialColorMap = {
    _Color: 'diffuseColor',
    _ShadeColor: 'shadeColor',
    _RimColor: 'rimColor',
    _EmissionColor: 'emissiveColor',
    _OutlineColor: 'outlineColor',
};
/**
 * @see https://github.com/vrm-c/UniVRM/blob/4ffd97c2e9339683ce9bf21e73f510bd90c2a5b2/Assets/VRM/Runtime/BlendShape/MaterialValueBindingMerger.cs
 */
class MaterialValueBindingMerger {
    /**
     * @param materials VRMの全 Material
     * @param materialValues
     */
    constructor(materials, materialValues) {
        this.materialValues = materialValues;
        this.m_materialMap = {};
        this.m_materialSetterMap = {};
        this.m_materialValueMap = {};
        this.m_used = {};
        this.baseValueCache = {};
        this.materialValuesToApply = {};
        if (materials.length === 0 || materialValues.length === 0) {
            return;
        }
        // プロパティ名の変換に対応している MToonMaterial と PBRMaterial を保存する
        materials.forEach((material) => {
            if (material instanceof babylon_mtoon_material__WEBPACK_IMPORTED_MODULE_2__.MToonMaterial || material instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
                this.m_materialMap[material.name] = material;
            }
        });
        materialValues.forEach((materialValue) => {
            const bindingKey = this.makeBindingKey(materialValue);
            if (this.m_materialSetterMap[bindingKey]) {
                return;
            }
            const material = this.m_materialMap[materialValue.materialName];
            if (!material) {
                return;
            }
            const baseValue = this.getMaterialProperty(material, materialValue.propertyName);
            if (!baseValue || materialValue.targetValue.length !== 4) {
                return;
            }
            // モーフィング用に baseValue (初期値) と materialValue を保存する
            this.baseValueCache[bindingKey] = baseValue;
            this.materialValuesToApply[bindingKey] = materialValue;
            const targetValue = _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(materialValue.targetValue);
            const valueName = materialValue.propertyName;
            // Unity と座標系が異なるため、テクスチャの vOffset を反転する
            if (material instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
                if (Object.keys(PBRMaterialTextureMap).some((k) => valueName.startsWith(k))) {
                    targetValue.w *= -1;
                }
            }
            else if (Object.keys(MToonMaterialTextureMap).some((k) => valueName.startsWith(k))) {
                targetValue.w *= -1;
            }
            if (valueName.endsWith('_ST_S')) {
                // テクスチャの u方向 のみ更新する
                const setter = (value, firstValue) => {
                    const propValue = firstValue
                        ? baseValue.add(targetValue.subtract(baseValue).scale(value))
                        : this.getMaterialProperty(material, valueName).add(targetValue.subtract(baseValue).scale(value));
                    const src = this.getMaterialProperty(material, valueName);
                    src.x = propValue.x;
                    src.z = propValue.z;
                    this.updateMaterialProperty(material, valueName, src);
                };
                this.m_materialSetterMap[bindingKey] = setter;
            }
            else if (valueName.endsWith('_ST_T')) {
                // テクスチャの v方向 のみ更新する
                const setter = (value, firstValue) => {
                    const propValue = firstValue
                        ? baseValue.add(targetValue.subtract(baseValue).scale(value))
                        : this.getMaterialProperty(material, valueName).add(targetValue.subtract(baseValue).scale(value));
                    const src = this.getMaterialProperty(material, valueName);
                    src.y = propValue.y;
                    src.w = propValue.w;
                    this.updateMaterialProperty(material, valueName, src);
                };
                this.m_materialSetterMap[bindingKey] = setter;
            }
            else {
                const setter = (value, firstValue) => {
                    const propValue = firstValue
                        ? baseValue.add(targetValue.subtract(baseValue).scale(value))
                        : this.getMaterialProperty(material, valueName).add(targetValue.subtract(baseValue).scale(value));
                    this.updateMaterialProperty(material, valueName, propValue);
                };
                this.m_materialSetterMap[bindingKey] = setter;
            }
        });
    }
    /**
     * UniVRM では Dictionary のキー用のクラスを定義しているが、文字列で代用する
     * MaterialValueBinding.BaseValue は対応するプロパティの初期値なので無視できる
     */
    makeBindingKey(materialValue) {
        return `${materialValue.materialName}_${materialValue.propertyName}_${materialValue.targetValue.join('-')}`;
    }
    /**
     * UniVRM では Dictionary のキー用のクラスを定義しているが、文字列で代用する
     */
    makeTargetKey(materialValue) {
        return `${materialValue.materialName}_${materialValue.propertyName}`;
    }
    /**
     * モーフィングを行う
     * @param value 値(0〜1)
     */
    morphing(value) {
        this.accumulateValue(value);
        this.apply();
    }
    /**
     * materialValue ごとに重みを計算する
     */
    accumulateValue(value) {
        this.materialValues.forEach((materialValue) => {
            const bindingKey = this.makeBindingKey(materialValue);
            if (this.m_materialValueMap[bindingKey]) {
                this.m_materialValueMap[bindingKey] += value;
            }
            else {
                this.m_materialValueMap[bindingKey] = value;
            }
        });
    }
    /**
     * Material のプロパティを更新する
     */
    apply() {
        this.m_used = {};
        Object.entries(this.materialValuesToApply).forEach(([bindingKey, materialValue]) => {
            const targetKey = this.makeTargetKey(materialValue);
            if (!(targetKey in this.m_used)) {
                const material = this.m_materialMap[materialValue.materialName];
                const value = this.baseValueCache[bindingKey].clone();
                // 対象のプロパティを初期値に戻す
                const valueName = materialValue.propertyName;
                if (valueName.endsWith('_ST_S')) {
                    const v = this.getMaterialProperty(material, valueName);
                    value.y = v.y;
                    value.w = v.w;
                }
                else if (valueName.endsWith('_ST_T')) {
                    const v = this.getMaterialProperty(material, valueName);
                    value.x = v.x;
                    value.z = v.z;
                }
                this.updateMaterialProperty(material, valueName, value);
                this.m_used[targetKey] = true;
            }
            const setter = this.m_materialSetterMap[bindingKey];
            if (setter) {
                setter(this.m_materialValueMap[bindingKey], false);
            }
        });
        this.m_materialValueMap = {};
    }
    /**
     * マテリアルのテクスチャか色に対応する Vector4 を取得する
     */
    getMaterialProperty(material, propertyName) {
        const match = propertyName.match(/^(_[^_]+)/);
        if (!match || !match[1]) {
            return null;
        }
        const key = match[1];
        if (material instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (PBRMaterialTextureMap[key]) {
                return this.convertTextureIntoVector4WhenNotNull(material[PBRMaterialTextureMap[key]]);
            }
            if (PBRMaterialColorMap[key]) {
                return this.convertColorIntoVector4(material[PBRMaterialColorMap[key]], material.alpha);
            }
            return null;
        }
        // MToonMaterial
        if (MToonMaterialTextureMap[key]) {
            return this.convertTextureIntoVector4WhenNotNull(material[MToonMaterialTextureMap[key]]);
        }
        if (MToonMaterialColorMap[key]) {
            return this.convertColorIntoVector4(material[MToonMaterialColorMap[key]], material.alpha);
        }
        return null;
    }
    /**
     * Texture を Vector4 に変換する
     */
    convertTextureIntoVector4WhenNotNull(texture) {
        if (!texture) {
            return null;
        }
        const t = texture;
        return new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector4(t.uScale, t.vScale, t.uOffset, t.vOffset);
    }
    /**
     * Color3 に alpha を加えて Vector4 に変換する
     */
    convertColorIntoVector4(color, alpha) {
        return new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector4(color.r, color.g, color.b, alpha);
    }
    /**
     * マテリアルのテクスチャか色を更新する
     */
    updateMaterialProperty(material, propertyName, value) {
        const match = propertyName.match(/^(_[^_]+)/);
        if (!match || !match[1]) {
            return;
        }
        const key = match[1];
        if (material instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (PBRMaterialTextureMap[key]) {
                this.updateTextureWhenNotNull(material[PBRMaterialTextureMap[key]], value);
                return;
            }
            if (PBRMaterialColorMap[key]) {
                if (key === '_Color') {
                    material.alpha = value.w;
                }
                this.updateColor(material[PBRMaterialColorMap[key]], value);
            }
            return;
        }
        // MToonMaterial
        if (MToonMaterialTextureMap[key]) {
            this.updateTextureWhenNotNull(material[MToonMaterialTextureMap[key]], value);
            return;
        }
        if (MToonMaterialColorMap[key]) {
            if (key === '_Color') {
                material.alpha = value.w;
            }
            this.updateColor(material[MToonMaterialColorMap[key]], value);
        }
    }
    /**
     * Texture を Vector4 で更新する
     */
    updateTextureWhenNotNull(texture, value) {
        if (texture) {
            const t = texture;
            t.uScale = value.x;
            t.vScale = value.y;
            t.uOffset = value.z;
            t.vOffset = value.w;
        }
    }
    /**
     * Color3 を Vector4 で更新する
     */
    updateColor(color, value) {
        color.r = value.x;
        color.g = value.y;
        color.b = value.z;
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/secondary-animation/collider-group.ts":
/*!***********************************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/secondary-animation/collider-group.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColliderGroup": () => (/* binding */ ColliderGroup)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Meshes_Builders_sphereBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Meshes/Builders/sphereBuilder */ "./node_modules/@babylonjs/core/Meshes/Builders/sphereBuilder.js");
/* harmony import */ var _collider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collider */ "./src/importer/babylon-vrm-loader/src/secondary-animation/collider.ts");


/**
 * VRM SpringBone ColliderGroup
 */
class ColliderGroup {
    /**
     * @param transform The node of the collider group for setting up collision detections.
     */
    constructor(transform) {
        this.transform = transform;
        this.colliders = [];
    }
    /**
     * Add offsetted collider
     *
     * @param offset The local coordinate from the node of the collider group.
     * @param radius The radius of the collider.
     */
    addCollider(offset, radius) {
        const sphere = _babylonjs_core_Meshes_Builders_sphereBuilder__WEBPACK_IMPORTED_MODULE_0__.SphereBuilder.CreateSphere(`${this.transform.name}_ColliderSphere`, {
            segments: 6,
            diameter: radius * 2.0,
            updatable: true,
        }, this.transform.getScene());
        sphere.setParent(this.transform);
        sphere.setPositionWithLocalVector(offset);
        sphere.setEnabled(false);
        this.colliders.push(new _collider__WEBPACK_IMPORTED_MODULE_1__.Collider(offset, radius, sphere));
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/secondary-animation/collider.ts":
/*!*****************************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/secondary-animation/collider.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collider": () => (/* binding */ Collider)
/* harmony export */ });
/**
 * Collider
 */
class Collider {
    /**
     * @param offset The local coordinate from the node of the collider group.
     * @param radius The radius of the collider.
     * @param sphere The spehere mesh for worldMatrix and gizmo.
     */
    constructor(offset, radius, sphere) {
        this.offset = offset;
        this.radius = radius;
        this.sphere = sphere;
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/secondary-animation/spring-bone-controller.ts":
/*!*******************************************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/secondary-animation/spring-bone-controller.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpringBoneController": () => (/* binding */ SpringBoneController)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/* harmony import */ var _collider_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collider-group */ "./src/importer/babylon-vrm-loader/src/secondary-animation/collider-group.ts");
/* harmony import */ var _vrm_spring_bone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vrm-spring-bone */ "./src/importer/babylon-vrm-loader/src/secondary-animation/vrm-spring-bone.ts");



/**
 * VRM SpringBone Controller
 */
class SpringBoneController {
    /**
     * @param ext SecondaryAnimation Object
     * @param getBone
     */
    constructor(ext, getBone) {
        this.ext = ext;
        const colliderGroups = this.constructColliderGroups(getBone);
        this.springs = this.constructSprings(getBone, colliderGroups);
    }
    dispose() {
        this.springs = [];
    }
    /**
     * Update all SpringBones
     *
     * @param deltaTime Elapsed sec from previous frame
     * @see https://docs.unity3d.com/ScriptReference/Time-deltaTime.html
     */
    async update(deltaTime) {
        // ポーズ後のあらぶり防止のため clamp
        deltaTime = Math.max(0.0, Math.min(16.666, deltaTime)) / 1000;
        const promises = this.springs.map((spring) => {
            return spring.update(deltaTime);
        });
        return Promise.all(promises).then(() => {
            /* Do nothing */
        });
    }
    constructColliderGroups(getBone) {
        if (!this.ext.colliderGroups || !this.ext.colliderGroups.length) {
            return [];
        }
        const colliderGroups = [];
        this.ext.colliderGroups.forEach((colliderGroup) => {
            const bone = getBone(colliderGroup.node);
            const g = new _collider_group__WEBPACK_IMPORTED_MODULE_1__.ColliderGroup(bone);
            colliderGroup.colliders.forEach((collider) => {
                g.addCollider(
                // VRM 右手系Y_UP, -Z_Front から Babylon.js 左手系Y_UP, +Z_Front にする
                new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3(-collider.offset.x, collider.offset.y, -collider.offset.z), collider.radius);
            });
            colliderGroups.push(g);
        });
        return colliderGroups;
    }
    constructSprings(getBone, colliderGroups) {
        if (!this.ext.boneGroups || !this.ext.boneGroups.length) {
            return [];
        }
        const springs = [];
        this.ext.boneGroups.forEach((spring) => {
            const rootBones = (spring.bones || []).map((bone) => {
                return getBone(bone);
            });
            const springColliders = (spring.colliderGroups || []).map((g) => {
                return colliderGroups[g];
            });
            springs.push(new _vrm_spring_bone__WEBPACK_IMPORTED_MODULE_2__.VRMSpringBone(spring.comment, spring.stiffiness, spring.gravityPower, new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3(
            // VRM 右手系Y_UP, -Z_Front から Babylon.js 左手系Y_UP, +Z_Front にする
            -spring.gravityDir.x, spring.gravityDir.y, -spring.gravityDir.z).normalize(), spring.dragForce, getBone(spring.center), spring.hitRadius, rootBones, springColliders));
        });
        return springs;
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/secondary-animation/vrm-spring-bone-logic.ts":
/*!******************************************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/secondary-animation/vrm-spring-bone-logic.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VRMSpringBoneLogic": () => (/* binding */ VRMSpringBoneLogic)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");

// based on
// http://rocketjump.skr.jp/unity3d/109/
// https://github.com/dwango/UniVRM/blob/master/Scripts/SpringBone/VRMSpringBone.cs
// https://github.com/pixiv/three-vrm/blob/aad551e041fad553c19d2091e5f5eaff1eb8faa8/packages/three-vrm/src/springbone/VRMSpringBone.ts
const IDENTITY_MATRIX = _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Matrix.Identity();
const _v3A = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3();
const _v3B = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3();
const _v3C = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3();
const _quatA = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Quaternion();
const _matA = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Matrix();
const _matB = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Matrix();
/**
 * Verlet Spring Bone
 */
class VRMSpringBoneLogic {
    /**
     * @param center Center reference of TransformNode
     * @param radius Collision Radius
     * @param transform Base TransformNode
     */
    constructor(center, radius, transform) {
        this.center = center;
        this.radius = radius;
        this.transform = transform;
        this.currentTail = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        this.prevTail = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        this.nextTail = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        // Initialize rotationQuaternion when not initialized
        if (!transform.rotationQuaternion) {
            transform.rotationQuaternion = transform.rotation.toQuaternion();
        }
        const worldMatrix = transform.getWorldMatrix();
        this.centerSpacePosition = worldMatrix.getTranslation();
        this.initialLocalMatrix = transform._localMatrix.clone();
        this.initialLocalRotation = transform.rotationQuaternion.clone();
        const children = transform.getChildTransformNodes(true);
        if (children.length === 0) {
            this.initialLocalChildPosition = transform.position.clone().normalize().scaleInPlace(0.07);
        }
        else {
            this.initialLocalChildPosition = children[0].position.clone();
        }
        _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesToRef(this.initialLocalChildPosition, worldMatrix, this.currentTail);
        this.prevTail.copyFrom(this.currentTail);
        this.nextTail.copyFrom(this.currentTail);
        this.boneAxis = this.initialLocalChildPosition.normalizeToNew();
        _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesToRef(this.initialLocalChildPosition, worldMatrix, _v3A);
        this.centerSpaceBoneLength = _v3A.subtractInPlace(this.centerSpacePosition).length();
        if (center) {
            this.getMatrixWorldToCenter(_matA);
            _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesToRef(this.currentTail, _matA, this.currentTail);
            _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesToRef(this.prevTail, _matA, this.prevTail);
            _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesToRef(this.nextTail, _matA, this.nextTail);
            worldMatrix.multiplyToRef(_matA, _matA);
            _matA.getTranslationToRef(this.centerSpacePosition);
            _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesToRef(this.initialLocalChildPosition, _matA, _v3A);
            this.centerSpaceBoneLength = _v3A.subtractInPlace(this.centerSpacePosition).length();
        }
    }
    /**
     * Update Tail position
     *
     * @param stiffnessForce Current frame stiffness
     * @param dragForce Current frame drag force
     * @param external Current frame external force
     * @param colliderGroups Current frame colliderGroups
     */
    update(stiffnessForce, dragForce, external, colliderGroups) {
        if (Number.isNaN(this.transform.getAbsolutePosition().x)) {
            // Do not update when absolute position is invalid
            return;
        }
        // Get bone position in center space
        this.getMatrixWorldToCenter(_matA);
        this.transform.getWorldMatrix().multiplyToRef(_matA, _matA);
        _matA.getTranslationToRef(this.centerSpacePosition);
        // Get parent position in center space
        this.getMatrixWorldToCenter(_matB);
        this.getParentMatrixWorld().multiplyToRef(_matB, _matB);
        // verlet積分で次の位置を計算
        this.nextTail.copyFrom(this.currentTail);
        {
            // 減衰付きで前のフレームの移動を継続
            _v3A.copyFrom(this.currentTail)
                .subtractInPlace(this.prevTail)
                .scaleInPlace(1.0 - dragForce);
            this.nextTail.addInPlace(_v3A);
        }
        {
            // 親の回転による子ボーンの移動目標
            _v3A.copyFrom(this.boneAxis);
            _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesToRef(_v3A, this.initialLocalMatrix, _v3A);
            _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesToRef(_v3A, _matB, _v3A);
            _v3A.subtractInPlace(this.centerSpacePosition).normalize().scaleInPlace(stiffnessForce);
            this.nextTail.addInPlace(_v3A);
        }
        {
            // 外力による移動量
            this.nextTail.addInPlace(external);
        }
        {
            // 長さを boneLength に強制
            this.nextTail.subtractInPlace(this.centerSpacePosition).normalize().scaleInPlace(this.centerSpaceBoneLength).addInPlace(this.centerSpacePosition);
        }
        {
            // Collision で移動
            this.collide(colliderGroups, this.nextTail);
        }
        this.prevTail.copyFrom(this.currentTail);
        this.currentTail.copyFrom(this.nextTail);
        this.initialLocalMatrix.multiplyToRef(_matB, _matA);
        const initialCenterSpaceMatrixInv = _matA.invert();
        _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesToRef(this.nextTail, initialCenterSpaceMatrixInv, _v3A);
        _v3A.normalizeToRef(_v3B);
        _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromUnitVectorsToRef(this.boneAxis, _v3B, _quatA);
        const applyRotation = _quatA;
        this.initialLocalRotation.multiplyToRef(applyRotation, this.transform.rotationQuaternion);
        // update WorldMatrix
        this.transform.computeWorldMatrix(true);
    }
    /**
     * Create a matrix that converts world space into center space.
     * @param result Target matrix
     */
    getMatrixWorldToCenter(result) {
        if (this.center) {
            this.center.getWorldMatrix().invertToRef(result);
        }
        else {
            result.copyFrom(IDENTITY_MATRIX);
        }
        return result;
    }
    /**
     * Returns the world matrix of its parent object.
     */
    getParentMatrixWorld() {
        return this.transform.parent ? this.transform.parent.getWorldMatrix() : IDENTITY_MATRIX;
    }
    /**
     * 衝突判定を行う
     * @param colliderGroups
     * @param tail
     */
    collide(colliderGroups, tail) {
        colliderGroups.forEach((colliderGroup) => {
            colliderGroup.colliders.forEach((collider) => {
                this.getMatrixWorldToCenter(_matA);
                collider.sphere.computeWorldMatrix().multiplyToRef(_matA, _matA);
                _matA.getTranslationToRef(_v3A);
                const colliderCenterSpacePosition = _v3A;
                let maxAbsScale = 0;
                collider.sphere.absoluteScaling.asArray().forEach((s) => {
                    maxAbsScale = Math.max(maxAbsScale, Math.abs(s));
                });
                const colliderRadius = collider.radius * maxAbsScale;
                const r = this.radius + colliderRadius;
                tail.subtractToRef(colliderCenterSpacePosition, _v3B);
                if (_v3B.lengthSquared() <= r * r) {
                    const normal = _v3B.copyFrom(tail).subtractInPlace(colliderCenterSpacePosition).normalize();
                    const posFromCollider = _v3C.copyFrom(colliderCenterSpacePosition).addInPlace(normal.scaleInPlace(r));
                    tail.copyFrom(posFromCollider.subtractInPlace(this.centerSpacePosition).normalize().scaleInPlace(this.centerSpaceBoneLength).addInPlace(this.centerSpacePosition));
                }
            });
        });
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/secondary-animation/vrm-spring-bone.ts":
/*!************************************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/secondary-animation/vrm-spring-bone.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VRMSpringBone": () => (/* binding */ VRMSpringBone)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Materials_standardMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Materials/standardMaterial */ "./node_modules/@babylonjs/core/Materials/standardMaterial.js");
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/* harmony import */ var _babylonjs_core_Meshes_meshBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core/Meshes/meshBuilder */ "./node_modules/@babylonjs/core/Meshes/meshBuilder.js");
/* harmony import */ var _vrm_spring_bone_logic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vrm-spring-bone-logic */ "./src/importer/babylon-vrm-loader/src/secondary-animation/vrm-spring-bone-logic.ts");




/**
 * @see https://github.com/vrm-c/UniVRM/blob/master/Assets/VRM/UniVRM/Scripts/SpringBone/VRMSpringBone.cs
 */
class VRMSpringBone {
    /**
     * @see https://github.com/vrm-c/vrm-specification/tree/master/specification/0.0
     * @param comment Annotation comment
     * @param stiffness The resilience of the swaying object (the power of returning to the initial pose).
     * @param gravityPower The strength of gravity.
     * @param gravityDir The direction of gravity. Set (0, -1, 0) for simulating the gravity. Set (1, 0, 0) for simulating the wind.
     * @param dragForce The resistance (deceleration) of automatic animation.
     * @param center The reference point of a swaying object can be set at any location except the origin.
     *               When implementing UI moving with warp,
     *               the parent node to move with warp can be specified if you don't want to make the object swaying with warp movement.
     * @param hitRadius The radius of the sphere used for the collision detection with colliders.
     * @param bones Specify the node index of the root bone of the swaying object.
     * @param colliderGroups Specify the index of the collider group for collisions with swaying objects.
     */
    constructor(comment, stiffness, gravityPower, gravityDir, dragForce, center, hitRadius, bones, colliderGroups) {
        this.comment = comment;
        this.stiffness = stiffness;
        this.gravityPower = gravityPower;
        this.gravityDir = gravityDir;
        this.dragForce = dragForce;
        this.center = center;
        this.hitRadius = hitRadius;
        this.bones = bones;
        this.colliderGroups = colliderGroups;
        this.verlets = [];
        this.activeBones = [];
        /** @hidden */
        this.drawGizmo = false;
        this.activeBones = this.bones.filter((bone) => bone !== null);
        this.activeBones.forEach((bone) => {
            [bone].concat(bone.getChildTransformNodes()).forEach((b) => {
                this.verlets.push(new _vrm_spring_bone_logic__WEBPACK_IMPORTED_MODULE_3__.VRMSpringBoneLogic(this.center, this.hitRadius, b));
            });
        });
        if (this.drawGizmo) {
            this.setupGizmo();
        }
    }
    setupGizmo() {
        this.activeBones.forEach((bone) => {
            const scene = bone.getScene();
            [bone].concat(bone.getChildTransformNodes()).forEach((b) => {
                const boneGizmo = _babylonjs_core_Meshes_meshBuilder__WEBPACK_IMPORTED_MODULE_2__.MeshBuilder.CreateSphere(b.name + '_boneGizmo', {
                    segments: 6,
                    diameter: this.hitRadius * 2,
                    updatable: true,
                }, scene);
                const mat = new _babylonjs_core_Materials_standardMaterial__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(b.name + '_boneGizmomat', scene);
                mat.emissiveColor = _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Color3.Red();
                mat.wireframe = true;
                boneGizmo.material = mat;
                boneGizmo.setParent(b);
                boneGizmo.position = _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero();
            });
        });
        this.colliderGroups.forEach((group) => {
            const scene = group.transform.getScene();
            group.colliders.forEach((collider) => {
                const sphere = collider.sphere;
                if (!sphere.isEnabled(false)) {
                    sphere.setEnabled(true);
                    const mat = new _babylonjs_core_Materials_standardMaterial__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(group.transform.name + '_colliderGizmomat', scene);
                    mat.emissiveColor = _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Color3.Yellow();
                    mat.wireframe = true;
                    sphere.material = mat;
                }
            });
        });
    }
    /**
     * Update bones
     *
     * @param deltaTime
     */
    async update(deltaTime) {
        const stiffness = this.stiffness * deltaTime;
        const external = this.gravityDir.scale(this.gravityPower * deltaTime);
        const promises = this.verlets.map((verlet) => {
            return new Promise((resolve) => {
                verlet.update(stiffness, this.dragForce, external, this.colliderGroups);
                resolve();
            });
        });
        return Promise.all(promises).then(() => {
            /* Do Nothing */
        });
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/vcast-vci-material-unity.ts":
/*!*************************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/vcast-vci-material-unity.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VCAST_vci_material_unity": () => (/* binding */ VCAST_vci_material_unity)
/* harmony export */ });
/* harmony import */ var _babylonjs_loaders_glTF_2_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/loaders/glTF/2.0 */ "./node_modules/@babylonjs/loaders/glTF/2.0/index.js");
/* harmony import */ var _vrm_material_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vrm-material-generator */ "./src/importer/babylon-vrm-loader/src/vrm-material-generator.ts");


/**
 * `extensions` に入る拡張キー
 */
const NAME = 'VCAST_vci_material_unity';
/**
 * VCAST_vci_material_unity 拡張を処理する
 */
class VCAST_vci_material_unity {
    /**
     * @inheritdoc
     */
    constructor(loader) {
        this.loader = loader;
        /**
         * @inheritdoc
         */
        this.name = NAME;
        /**
         * @inheritdoc
         */
        this.enabled = true;
    }
    /**
     * @inheritdoc
     */
    dispose() {
        this.loader = null;
    }
    /**
     * @inheritdoc
     */
    _loadMaterialAsync(context, material, mesh, babylonDrawMode, assign) {
        // ジェネレータでマテリアルを生成する
        return new _vrm_material_generator__WEBPACK_IMPORTED_MODULE_1__.VRMMaterialGenerator(this.loader).generate(context, material, mesh, babylonDrawMode, assign);
    }
}
// ローダーに登録する
_babylonjs_loaders_glTF_2_0__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, (loader) => new VCAST_vci_material_unity(loader));


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/vrm-extension.ts":
/*!**************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/vrm-extension.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VRM": () => (/* binding */ VRM)
/* harmony export */ });
/* harmony import */ var _babylonjs_loaders_glTF_2_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/loaders/glTF/2.0 */ "./node_modules/@babylonjs/loaders/glTF/2.0/index.js");
/* harmony import */ var _vrm_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vrm-manager */ "./src/importer/babylon-vrm-loader/src/vrm-manager.ts");
/* harmony import */ var _vrm_material_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vrm-material-generator */ "./src/importer/babylon-vrm-loader/src/vrm-material-generator.ts");



/**
 * `extensions` に入る拡張キー
 */
const NAME = 'VRM';
/**
 * VRM 拡張を処理する
 * [Specification](https://github.com/vrm-c/vrm-specification/tree/master/specification/0.0)
 */
class VRM {
    /**
     * @inheritdoc
     */
    constructor(loader) {
        this.loader = loader;
        /**
         * @inheritdoc
         */
        this.name = NAME;
        /**
         * @inheritdoc
         */
        this.enabled = true;
        /**
         * この Mesh index 以降が読み込み対象
         */
        this.meshesFrom = 0;
        /**
         * この TransformNode index 以降が読み込み対象
         */
        this.transformNodesFrom = 0;
        /**
         * この Material index 以降が読み込み対象
         */
        this.materialsFrom = 0;
        // GLTFLoader has already added rootMesh as __root__ before load extension
        // @see glTFLoader._loadData
        this.meshesFrom = this.loader.babylonScene.meshes.length - 1;
        this.transformNodesFrom = this.loader.babylonScene.transformNodes.length;
        this.materialsFrom = this.loader.babylonScene.materials.length;
    }
    /**
     * @inheritdoc
     */
    dispose() {
        this.loader = null;
    }
    /**
     * @inheritdoc
     */
    onReady() {
        if (!this.loader.gltf.extensions || !this.loader.gltf.extensions[NAME]) {
            return;
        }
        const scene = this.loader.babylonScene;
        const manager = new _vrm_manager__WEBPACK_IMPORTED_MODULE_1__.VRMManager(this.loader.gltf.extensions[NAME], this.loader.babylonScene, this.meshesFrom, this.transformNodesFrom, this.materialsFrom);
        scene.metadata = scene.metadata || {};
        scene.metadata.vrmManagers = scene.metadata.vrmManagers || [];
        scene.metadata.vrmManagers.push(manager);
        this.loader.babylonScene.onDisposeObservable.add(() => {
            // Scene dispose 時に Manager も破棄する
            manager.dispose();
            this.loader.babylonScene.metadata.vrmManagers = [];
        });
    }
    /**
     * @inheritdoc
     */
    _loadVertexDataAsync(context, primitive, babylonMesh) {
        if (!primitive.extras || !primitive.extras.targetNames) {
            return null;
        }
        // まだ MorphTarget が生成されていないので、メタ情報にモーフターゲット情報を入れておく
        babylonMesh.metadata = babylonMesh.metadata || {};
        babylonMesh.metadata.vrmTargetNames = primitive.extras.targetNames;
        return null;
    }
    /**
     * @inheritdoc
     */
    _loadMaterialAsync(context, material, mesh, babylonDrawMode, assign) {
        // ジェネレータでマテリアルを生成する
        return new _vrm_material_generator__WEBPACK_IMPORTED_MODULE_2__.VRMMaterialGenerator(this.loader).generate(context, material, mesh, babylonDrawMode, assign);
    }
}
// ローダーに登録する
_babylonjs_loaders_glTF_2_0__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, (loader) => new VRM(loader));


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/vrm-file-loader.ts":
/*!****************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/vrm-file-loader.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VRMFileLoader": () => (/* binding */ VRMFileLoader)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Loading/sceneLoader */ "./node_modules/@babylonjs/core/Loading/sceneLoader.js");
/* harmony import */ var _babylonjs_loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/loaders/glTF/glTFFileLoader */ "./node_modules/@babylonjs/loaders/glTF/glTFFileLoader.js");


/**
 * VRM/VCI ファイルを読み込めるようにする
 * 拡張子を変更しただけ
 */
class VRMFileLoader extends _babylonjs_loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFFileLoader {
    constructor() {
        super(...arguments);
        this.name = 'vrm';
        this.extensions = {
            '.vrm': { isBinary: true },
            '.vci': { isBinary: true },
        };
    }
    createPlugin() {
        return new VRMFileLoader();
    }
}
if (_babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_0__.SceneLoader) {
    _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.RegisterPlugin(new VRMFileLoader());
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/vrm-interfaces.ts":
/*!***************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/vrm-interfaces.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IVRMMaterialPropertyShader": () => (/* binding */ IVRMMaterialPropertyShader)
/* harmony export */ });
var IVRMMaterialPropertyShader;
(function (IVRMMaterialPropertyShader) {
    IVRMMaterialPropertyShader["VRM_USE_GLTFSHADER"] = "VRM_USE_GLTFSHADER";
    IVRMMaterialPropertyShader["VRMMToon"] = "VRM/MToon";
    IVRMMaterialPropertyShader["VRMUnlitTransparentZWrite"] = "VRM/UnlitTransparentZWrite";
})(IVRMMaterialPropertyShader || (IVRMMaterialPropertyShader = {}));


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/vrm-manager.ts":
/*!************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/vrm-manager.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VRMManager": () => (/* binding */ VRMManager)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/* harmony import */ var _secondary_animation_spring_bone_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./secondary-animation/spring-bone-controller */ "./src/importer/babylon-vrm-loader/src/secondary-animation/spring-bone-controller.ts");
/* harmony import */ var _humanoid_bone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./humanoid-bone */ "./src/importer/babylon-vrm-loader/src/humanoid-bone.ts");
/* harmony import */ var _material_value_binding_merger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./material-value-binding-merger */ "./src/importer/babylon-vrm-loader/src/material-value-binding-merger.ts");




/**
 * VRM キャラクターを動作させるためのマネージャ
 */
class VRMManager {
    /**
     *
     * @param ext glTF.extensions.VRM の中身 json
     * @param scene
     * @param meshesFrom この番号以降のメッシュがこの VRM に該当する
     * @param transformNodesFrom この番号以降の TransformNode がこの VRM に該当する
     * @param materialsNodesFrom この番号以降の Material がこの VRM に該当する
     */
    constructor(ext, scene, meshesFrom, transformNodesFrom, materialsNodesFrom) {
        this.ext = ext;
        this.scene = scene;
        this.meshesFrom = meshesFrom;
        this.transformNodesFrom = transformNodesFrom;
        this.materialsNodesFrom = materialsNodesFrom;
        this.isBinaryMorphMap = {};
        this.morphTargetMap = {};
        this.materialValueBindingMergerMap = {};
        this.presetMorphTargetMap = {};
        this.transformNodeMap = {};
        this.transformNodeCache = {};
        this.meshCache = {};
        this.meshCache = this.constructMeshCache();
        this.transformNodeCache = this.constructTransformNodeCache();
        this.springBoneController = new _secondary_animation_spring_bone_controller__WEBPACK_IMPORTED_MODULE_1__.SpringBoneController(this.ext.secondaryAnimation, this.findTransformNode.bind(this));
        if (this.ext.blendShapeMaster && this.ext.blendShapeMaster.blendShapeGroups) {
            this.constructIsBinaryMap();
            this.constructMorphTargetMap();
            this.constructMaterialValueBindingMergerMap();
        }
        this.constructTransformNodeMap();
        this._humanoidBone = new _humanoid_bone__WEBPACK_IMPORTED_MODULE_2__.HumanoidBone(this.transformNodeMap);
    }
    /**
     * Secondary Animation を更新する
     *
     * @param deltaTime 前フレームからの経過秒数(sec)
     */
    async update(deltaTime) {
        await this.springBoneController.update(deltaTime);
    }
    /**
     * 破棄処理
     */
    dispose() {
        this.springBoneController.dispose();
        this._humanoidBone.dispose();
        this.morphTargetMap = null;
        this.materialValueBindingMergerMap = null;
        this.presetMorphTargetMap = null;
        this.transformNodeMap = null;
        this.transformNodeCache = null;
        this.meshCache = null;
        this._rootMesh = null;
    }
    /**
     * モーフィングを行う
     * @param label モーフ名
     * @param value 値(0〜1)
     */
    morphing(label, value) {
        const v = this.calcMorphValue(label, value);
        if (this.morphTargetMap[label]) {
            this.morphTargetMap[label].forEach((setting) => {
                setting.target.influence = v * (setting.weight / 100);
            });
        }
        if (this.materialValueBindingMergerMap[label]) {
            this.materialValueBindingMergerMap[label].morphing(v);
        }
    }
    /**
     * プリセットモーフのモーフィングを行う
     * @param label モーフ名
     * @param value 値(0〜1)
     */
    morphingPreset(label, value) {
        if (!this.presetMorphTargetMap[label]) {
            return;
        }
        const v = this.calcMorphValue(label, value);
        this.presetMorphTargetMap[label].forEach((setting) => {
            setting.target.influence = v * (setting.weight / 100);
        });
    }
    /**
     * モーフィング用の値を計算する
     * @param label モーフ名
     * @param value 値
     */
    calcMorphValue(label, value) {
        const v = Math.max(0.0, Math.min(1.0, value));
        if (this.isBinaryMorphMap[label]) {
            return v > 0.5 ? 1.0 : 0.0;
        }
        return v;
    }
    /**
     * list morphing name
     */
    getMorphingList() {
        return Object.keys(this.morphTargetMap);
    }
    /**
     * 一人称時のカメラ位置を絶対座標として取得する
     *
     * firstPersonBone が未設定の場合は null を返す
     *
     * @returns 一人称時のカメラの現在における絶対座標
     */
    getFirstPersonCameraPosition() {
        const firstPersonBone = this.getFirstPersonBone();
        if (!firstPersonBone) {
            return null;
        }
        const basePos = firstPersonBone.getAbsolutePosition();
        const offsetPos = this.ext.firstPerson.firstPersonBoneOffset;
        return new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3(basePos.x + offsetPos.x, basePos.y + offsetPos.y, basePos.z + offsetPos.z);
    }
    /**
     * 一人称時に頭とみなす TransformNode を取得する
     */
    getFirstPersonBone() {
        return this.findTransformNode(this.ext.firstPerson.firstPersonBone);
    }
    /**
     * ボーン名からそのボーンに該当する TransformNode を取得する
     *
     * @param name HumanBoneName
     * @deprecated Use humanoidBone getter instead. This method will delete at v2.
     */
    getBone(name) {
        return this.transformNodeMap[name] || null;
    }
    /**
     * Get HumanoidBone Methods
     */
    get humanoidBone() {
        return this._humanoidBone;
    }
    /**
     * VRM Root mesh
     *
     * Useful for Model Transformation
     */
    get rootMesh() {
        return this._rootMesh;
    }
    /**
     * node 番号から該当する TransformNode を探す
     * 数が多くなるのでキャッシュに参照を持つ構造にする
     * gltf の node 番号は `metadata.gltf.pointers` に記録されている
     * @param nodeIndex
     */
    findTransformNode(nodeIndex) {
        return this.transformNodeCache[nodeIndex] || null;
    }
    /**
     * mesh 番号からメッシュを探す
     * gltf の mesh 番号は `metadata.gltf.pointers` に記録されている
     * @deprecated Use findMeshes instead. This method has broken.
     */
    findMesh(meshIndex) {
        return (this.meshCache[meshIndex] && this.meshCache[meshIndex][0]) || null;
    }
    /**
     * mesh 番号からメッシュを探す
     * gltf の mesh 番号は `metadata.gltf.pointers` に記録されている
     */
    findMeshes(meshIndex) {
        return this.meshCache[meshIndex] || null;
    }
    /**
     * 事前に MorphTarget と isBinary を紐付ける
     */
    constructIsBinaryMap() {
        this.ext.blendShapeMaster.blendShapeGroups.forEach((g) => {
            this.isBinaryMorphMap[g.name] = g.isBinary;
        });
    }
    /**
     * 事前に MorphTarget と BlendShape を紐付ける
     */
    constructMorphTargetMap() {
        this.ext.blendShapeMaster.blendShapeGroups.forEach((g) => {
            if (!g.binds) {
                return;
            }
            g.binds.forEach((b) => {
                const meshes = this.findMeshes(b.mesh);
                if (!meshes) {
                    console.log(`Undefined BlendShapeBind Mesh`, b);
                    return;
                }
                meshes.forEach((mesh) => {
                    const morphTargetManager = mesh.morphTargetManager;
                    if (!morphTargetManager) {
                        console.log(`Undefined morphTargetManager`, b);
                        return;
                    }
                    const target = morphTargetManager.getTarget(b.index);
                    this.morphTargetMap[g.name] = this.morphTargetMap[g.name] || [];
                    this.morphTargetMap[g.name].push({
                        target,
                        weight: b.weight,
                    });
                    if (g.presetName) {
                        this.presetMorphTargetMap[g.presetName] = this.presetMorphTargetMap[g.presetName] || [];
                        this.presetMorphTargetMap[g.presetName].push({
                            target,
                            weight: b.weight,
                        });
                    }
                });
            });
        });
    }
    /**
     * 事前に MaterialValueBindingMerger とモーフ名を紐付ける
     */
    constructMaterialValueBindingMergerMap() {
        const materials = this.scene.materials.slice(this.materialsNodesFrom);
        this.ext.blendShapeMaster.blendShapeGroups.forEach((g) => {
            if (!g.materialValues) {
                return;
            }
            this.materialValueBindingMergerMap[g.name] = new _material_value_binding_merger__WEBPACK_IMPORTED_MODULE_3__.MaterialValueBindingMerger(materials, g.materialValues);
        });
    }
    /**
     * 事前に TransformNode と bone 名を紐づける
     */
    constructTransformNodeMap() {
        this.ext.humanoid.humanBones.forEach((b) => {
            const node = this.findTransformNode(b.node);
            if (!node) {
                return;
            }
            this.transformNodeMap[b.bone] = node;
        });
    }
    /**
     * node 番号と TransformNode を紐づける
     */
    constructTransformNodeCache() {
        const cache = {};
        for (let index = this.transformNodesFrom; index < this.scene.transformNodes.length; index++) {
            const node = this.scene.transformNodes[index];
            // ポインタが登録されていないものは省略
            if (!node || !node.metadata || !node.metadata.gltf || !node.metadata.gltf.pointers || node.metadata.gltf.pointers.length === 0) {
                continue;
            }
            for (const pointer of node.metadata.gltf.pointers) {
                if (pointer.startsWith('/nodes/')) {
                    const nodeIndex = parseInt(pointer.substr(7), 10);
                    cache[nodeIndex] = node;
                    break;
                }
            }
        }
        return cache;
    }
    /**
     * mesh 番号と Mesh を紐づける
     */
    constructMeshCache() {
        const cache = {};
        for (let index = this.meshesFrom; index < this.scene.meshes.length; index++) {
            const mesh = this.scene.meshes[index];
            if (mesh.id === '__root__') {
                this._rootMesh = mesh;
                continue;
            }
            // ポインタが登録されていないものは省略
            if (!mesh || !mesh.metadata || !mesh.metadata.gltf || !mesh.metadata.gltf.pointers || mesh.metadata.gltf.pointers.length === 0) {
                continue;
            }
            for (const pointer of mesh.metadata.gltf.pointers) {
                const match = pointer.match(/^\/meshes\/(\d+).+$/);
                if (match) {
                    const nodeIndex = parseInt(match[1], 10);
                    cache[nodeIndex] = cache[nodeIndex] || [];
                    cache[nodeIndex].push(mesh);
                    break;
                }
            }
        }
        return cache;
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/vrm-material-generator.ts":
/*!***********************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/vrm-material-generator.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VRMMaterialGenerator": () => (/* binding */ VRMMaterialGenerator)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/* harmony import */ var babylon_mtoon_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylon-mtoon-material */ "./node_modules/babylon-mtoon-material/dist/index.module.js");
/* harmony import */ var babylon_mtoon_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylon_mtoon_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vrm_interfaces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vrm-interfaces */ "./src/importer/babylon-vrm-loader/src/vrm-interfaces.ts");
/* harmony import */ var _babylonjs_core_Engines_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core/Engines/engine */ "./node_modules/@babylonjs/core/Engines/engine.js");




/**
 * VRM で指定される Material を生成する
 * [VRM が提供するシェーダ](https://vrm.dev/en/univrm/shaders/index.html) を特定し読み込む
 * - UnlitTexture: 不透明, VRM ファイル側で [KHR_materials_unlit](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_unlit) が定義されているため、何もしない
 * - UnlitCutout: 透明度が閾値以下の部分を透明とする, 同上
 * - UnlitTransparent: アルファブレンド。ZWriteしない, 同上
 * - UnlitTransparentZWrite: アルファブレンド。ZWriteする, 同上に加え、プロパティで ZWrite を強制しています
 * - MToon: MToonMaterial を差し替えています。
 */
class VRMMaterialGenerator {
    /**
     * @inheritdoc
     */
    constructor(loader) {
        this.loader = loader;
    }
    /**
     * マテリアルを生成する Promise を返す
     * VRM 対象外の場合は null
     */
    generate(context, material, mesh, babylonDrawMode, assign) {
        const materialProp = this.findMaterialPropertyByName(material.name, this.getMaterialProperties());
        if (!materialProp) {
            return null;
        }
        mesh.alphaIndex = materialProp.renderQueue;
        const newMaterial = this.createMaterialByShader(context, material, babylonDrawMode, materialProp);
        if (!newMaterial) {
            return null;
        }
        assign(newMaterial);
        if (newMaterial instanceof babylon_mtoon_material__WEBPACK_IMPORTED_MODULE_1__.MToonMaterial) {
            return this.loadMToonTexturesAsync(context, newMaterial, materialProp);
        }
        return Promise.resolve(newMaterial);
    }
    /**
     * VRM または VCI からマテリアルプロパティの配列を探す
     */
    getMaterialProperties() {
        if (!this.loader.gltf.extensions) {
            return [];
        }
        if (this.loader.gltf.extensions.VRM && this.loader.gltf.extensions.VRM.materialProperties) {
            return this.loader.gltf.extensions.VRM.materialProperties;
        }
        if (this.loader.gltf.extensions.VCAST_vci_material_unity && this.loader.gltf.extensions.VCAST_vci_material_unity.materials) {
            return this.loader.gltf.extensions.VCAST_vci_material_unity.materials;
        }
        return [];
    }
    /**
     * マテリアル名から MaterialProperty を探す
     * @param materialName マテリアル名
     * @param extension 拡張データ
     */
    findMaterialPropertyByName(materialName, materials) {
        if (!materialName || !materials) {
            return null;
        }
        const mats = materials.filter((v) => v.name === materialName);
        if (mats.length === 0) {
            return null;
        }
        else if (mats.length >= 2) {
            this.loader.log(`Duplicated vrm material name found: ${materialName}`);
        }
        return mats[mats.length - 1];
    }
    /**
     * テクスチャを読み込む
     * @param context 現在のコンテキスト
     * @param material 生成した MToonMaterial
     * @param prop 生成した MToonMaterial のマテリアルプロパティ
     */
    loadMToonTexturesAsync(context, material, prop) {
        const promises = [];
        // 全てのテクスチャの UV Offset & Scale はメインテクスチャのものを流用する
        const uvOffsetScale = prop.vectorProperties._MainTex;
        if (!uvOffsetScale) {
            return Promise.resolve(material);
        }
        const applyTexture = (index, callback) => {
            applyPropertyWhenDefined(index, (value) => {
                promises.push(this.loader.loadTextureInfoAsync(`${context}/textures/${index}`, { index: value }, (babylonTexture) => {
                    // 実際は Texture インスタンスが来るのでキャスト
                    const t = babylonTexture;
                    t.uOffset = uvOffsetScale[0];
                    t.vOffset = uvOffsetScale[1];
                    t.uScale = uvOffsetScale[2];
                    t.vScale = uvOffsetScale[3];
                    callback(babylonTexture);
                }));
            });
        };
        applyTexture(prop.textureProperties._MainTex, (texture) => {
            if (material.alphaBlend || material.alphaTest) {
                texture.hasAlpha = true;
            }
            material.diffuseTexture = texture;
        });
        applyTexture(prop.textureProperties._ShadeTexture, (texture) => (material.shadeTexture = texture));
        applyTexture(prop.textureProperties._BumpMap, (texture) => (material.bumpTexture = texture));
        applyTexture(prop.textureProperties._ReceiveShadowTexture, (texture) => (material.receiveShadowTexture = texture));
        applyTexture(prop.textureProperties._ShadingGradeTexture, (texture) => (material.shadingGradeTexture = texture));
        applyTexture(prop.textureProperties._RimTexture, (texture) => (material.rimTexture = texture));
        applyTexture(prop.textureProperties._SphereAdd, (texture) => (material.matCapTexture = texture));
        applyTexture(prop.textureProperties._EmissionMap, (texture) => (material.emissiveTexture = texture));
        applyTexture(prop.textureProperties._OutlineWidthTexture, (texture) => (material.outlineWidthTexture = texture));
        applyTexture(prop.textureProperties._UvAnimMaskTexture, (texture) => (material.uvAnimationMaskTexture = texture));
        return Promise.all(promises).then(() => material);
    }
    /**
     * シェーダ名からマテリアルを推測して生成する
     * @param context 現在のコンテキスト
     * @param material glTF マテリアル
     * @param babylonDrawMode 描画種類
     * @param prop 生成するマテリアルプロパティ
     */
    createMaterialByShader(context, material, babylonDrawMode, prop) {
        if (prop.shader === _vrm_interfaces__WEBPACK_IMPORTED_MODULE_3__.IVRMMaterialPropertyShader.VRMMToon) {
            const mtoonMaterial = new babylon_mtoon_material__WEBPACK_IMPORTED_MODULE_1__.MToonMaterial(material.name || `MToonMaterial${material.index}`, this.loader.babylonScene);
            this.setMToonMaterialProperties(mtoonMaterial, prop);
            return mtoonMaterial;
        }
        if (prop.shader === _vrm_interfaces__WEBPACK_IMPORTED_MODULE_3__.IVRMMaterialPropertyShader.VRMUnlitTransparentZWrite) {
            const mat = this.loader.createMaterial(context, material, babylonDrawMode);
            // 通常マテリアルに Depth Write を強制
            mat.disableDepthWrite = false;
            mat.forceDepthWrite = true;
            return mat;
        }
        return null;
    }
    /**
     * マテリアルに VRM プロパティを設定
     * VRM プロパティとマテリアルプロパティのマッピングを行っている
     * 初期値はマテリアル実装側に持っているため、値がある場合のみ上書きする
     */
    setMToonMaterialProperties(material, prop) {
        applyPropertyWhenDefined(prop.floatProperties._Cutoff, (value) => (material.alphaCutOff = value));
        applyPropertyWhenDefined(prop.vectorProperties._Color, (value) => {
            material.diffuseColor = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Color3(value[0], value[1], value[2]);
            material.alpha = value[3];
        });
        applyPropertyWhenDefined(prop.vectorProperties._ShadeColor, (value) => {
            material.shadeColor = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Color3(value[0], value[1], value[2]);
        });
        applyPropertyWhenDefined(prop.floatProperties._BumpScale, (value) => (material.bumpScale = value));
        applyPropertyWhenDefined(prop.floatProperties._ReceiveShadowRate, (value) => (material.receiveShadowRate = value));
        applyPropertyWhenDefined(prop.floatProperties._ShadingGradeRate, (value) => (material.shadingGradeRate = value));
        applyPropertyWhenDefined(prop.floatProperties._ShadeShift, (value) => (material.shadeShift = value));
        applyPropertyWhenDefined(prop.floatProperties._ShadeToony, (value) => (material.shadeToony = value));
        applyPropertyWhenDefined(prop.floatProperties._LightColorAttenuation, (value) => (material.lightColorAttenuation = value));
        applyPropertyWhenDefined(prop.floatProperties._IndirectLightIntensity, (value) => (material.indirectLightIntensity = value));
        applyPropertyWhenDefined(prop.vectorProperties._RimColor, (value) => {
            material.rimColor = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Color3(value[0], value[1], value[2]);
        });
        applyPropertyWhenDefined(prop.floatProperties._RimLightingMix, (value) => (material.rimLightingMix = value));
        applyPropertyWhenDefined(prop.floatProperties._RimFresnelPower, (value) => (material.rimFresnelPower = value));
        applyPropertyWhenDefined(prop.floatProperties._RimLift, (value) => (material.rimLift = value));
        applyPropertyWhenDefined(prop.vectorProperties._EmissionColor, (value) => {
            material.emissiveColor = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Color3(value[0], value[1], value[2]);
        });
        applyPropertyWhenDefined(prop.floatProperties._OutlineWidth, (value) => (material.outlineWidth = value));
        applyPropertyWhenDefined(prop.floatProperties._OutlineScaledMaxDistance, (value) => (material.outlineScaledMaxDistance = value));
        applyPropertyWhenDefined(prop.vectorProperties._OutlineColor, (value) => {
            material.outlineColor = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Color3(value[0], value[1], value[2]);
        });
        applyPropertyWhenDefined(prop.floatProperties._OutlineLightingMix, (value) => (material.outlineLightingMix = value));
        applyPropertyWhenDefined(prop.floatProperties._UvAnimScrollX, (value) => (material.uvAnimationScrollX = value));
        applyPropertyWhenDefined(prop.floatProperties._UvAnimScrollY, (value) => (material.uvAnimationScrollY = value));
        applyPropertyWhenDefined(prop.floatProperties._UvAnimRotation, (value) => (material.uvAnimationRotation = value));
        applyPropertyWhenDefined(prop.floatProperties._DebugMode, (value) => (material.debugMode = value));
        applyPropertyWhenDefined(prop.floatProperties._BlendMode, (value) => {
            switch (value) {
                case 0: // Opaque
                    material.alphaBlend = false;
                    material.alphaTest = false;
                    break;
                case 1: // TransparentCutout
                    material.alphaBlend = false;
                    material.alphaTest = true;
                    material.alphaMode = _babylonjs_core_Engines_engine__WEBPACK_IMPORTED_MODULE_2__.Engine.ALPHA_COMBINE;
                    break;
                case 2: // Transparent
                    material.alphaBlend = true;
                    material.alphaTest = false;
                    material.alphaMode = _babylonjs_core_Engines_engine__WEBPACK_IMPORTED_MODULE_2__.Engine.ALPHA_COMBINE;
                    break;
            }
        });
        applyPropertyWhenDefined(prop.floatProperties._OutlineWidthMode, (value) => (material.outlineWidthMode = value));
        applyPropertyWhenDefined(prop.floatProperties._OutlineColorMode, (value) => (material.outlineColorMode = value));
        applyPropertyWhenDefined(prop.floatProperties._CullMode, (value) => (material.cullMode = value));
        applyPropertyWhenDefined(prop.floatProperties._OutlineCullMode, (value) => (material.outlineCullMode = value));
        applyPropertyWhenDefined(prop.keywordMap._ALPHABLEND_ON, (value) => (material.alphaBlend = value));
        applyPropertyWhenDefined(prop.keywordMap._ALPHATEST_ON, (value) => (material.alphaTest = value));
        applyPropertyWhenDefined(prop.floatProperties._ZWrite, (value) => {
            material.forceDepthWrite = Math.round(value) === 1;
            if (material.forceDepthWrite) {
                material.disableDepthWrite = false;
            }
        });
    }
}
/**
 * プロパティが設定されていればコールバックを実行する
 */
function applyPropertyWhenDefined(prop, callback) {
    if (typeof prop === 'undefined') {
        return;
    }
    callback(prop);
}


/***/ }),

/***/ "./src/index-test.ts":
/*!***************************!*\
  !*** ./src/index-test.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babylonjs_core_Cameras_arcRotateCamera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Cameras/arcRotateCamera */ "./node_modules/@babylonjs/core/Cameras/arcRotateCamera.js");
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/* harmony import */ var _babylonjs_core_Engines_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core/Engines/engine */ "./node_modules/@babylonjs/core/Engines/engine.js");
/* harmony import */ var _babylonjs_core_Lights_directionalLight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babylonjs/core/Lights/directionalLight */ "./node_modules/@babylonjs/core/Lights/directionalLight.js");
/* harmony import */ var _babylonjs_core_Lights_hemisphericLight__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babylonjs/core/Lights/hemisphericLight */ "./node_modules/@babylonjs/core/Lights/hemisphericLight.js");
/* harmony import */ var _babylonjs_core_Lights_pointLight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babylonjs/core/Lights/pointLight */ "./node_modules/@babylonjs/core/Lights/pointLight.js");
/* harmony import */ var _babylonjs_core_Lights_Shadows_shadowGenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babylonjs/core/Lights/Shadows/shadowGenerator */ "./node_modules/@babylonjs/core/Lights/Shadows/shadowGenerator.js");
/* harmony import */ var _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babylonjs/core/Loading/sceneLoader */ "./node_modules/@babylonjs/core/Loading/sceneLoader.js");
/* harmony import */ var _babylonjs_core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babylonjs/core/Meshes/mesh */ "./node_modules/@babylonjs/core/Meshes/mesh.js");
/* harmony import */ var _babylonjs_core_scene__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babylonjs/core/scene */ "./node_modules/@babylonjs/core/scene.js");
/* harmony import */ var _babylonjs_core_Helpers_sceneHelpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babylonjs/core/Helpers/sceneHelpers */ "./node_modules/@babylonjs/core/Helpers/sceneHelpers.js");
/* harmony import */ var _babylonjs_core_Meshes_Builders_sphereBuilder__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babylonjs/core/Meshes/Builders/sphereBuilder */ "./node_modules/@babylonjs/core/Meshes/Builders/sphereBuilder.js");
/* harmony import */ var _babylonjs_core_Meshes_Builders_torusKnotBuilder__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babylonjs/core/Meshes/Builders/torusKnotBuilder */ "./node_modules/@babylonjs/core/Meshes/Builders/torusKnotBuilder.js");
/* harmony import */ var _babylonjs_inspector__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babylonjs/inspector */ "./node_modules/@babylonjs/inspector/dist/babylon.inspector.bundle.max.js");
/* harmony import */ var _babylonjs_inspector__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_inspector__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _importer_babylon_vrm_loader_src_index__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./importer/babylon-vrm-loader/src/index */ "./src/importer/babylon-vrm-loader/src/vrm-file-loader.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./index */ "./src/index.ts");














// eslint-disable-next-line import/no-internal-modules


// window.onload = async (e) => {
async function main2() {
    //* Define vrm file path.
    const vrmFile = "./testfiles/default.vrm";
    //* Create an Engine instance.
    const canvas = document.getElementById("main-canvas");
    const debugProperties = getDebugProperties();
    console.log("debugProperties.webgl1: ", debugProperties.webgl1);
    const engine = new _babylonjs_core_Engines_engine__WEBPACK_IMPORTED_MODULE_2__.Engine(canvas, true, {
        alpha: false,
        disableWebGL2Support: debugProperties.webgl1,
    });
    const scene = new _babylonjs_core_scene__WEBPACK_IMPORTED_MODULE_9__.Scene(engine);
    const camera = new _babylonjs_core_Cameras_arcRotateCamera__WEBPACK_IMPORTED_MODULE_0__.ArcRotateCamera("MainCamera1", 0, 0, 3, new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1.2, 0), scene, true);
    camera.lowerRadiusLimit = 0.1;
    camera.upperRadiusLimit = 20;
    camera.wheelDeltaPercentage = 0.01;
    camera.minZ = 0.3;
    camera.position = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1.2, -3);
    camera.attachControl(canvas, true);
    //* Create a V3DCore instance.
    const v3DCore = new _index__WEBPACK_IMPORTED_MODULE_14__.V3DCore(engine, scene, camera);
    v3DCore.transparentBackground();
    await v3DCore.AppendAsync("", vrmFile);
    // Get managers
    // const vrmManager = v3DCore.getVRMManagerByURI(vrmFile);
    // console.log("vrmManager: ", vrmManager);
    // Camera
    // v3DCore.attachCameraTo(vrmManager);
    // Lights
    v3DCore.addAmbientLight(new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Color3(1, 1, 1));
    // Lock camera target
    // v3DCore.scene.onBeforeRenderObservable.add(() => {
    //   vrmManager.cameras[0].setTarget(vrmManager.rootMesh.getAbsolutePosition());
    // });
    engine.runRenderLoop(() => {
        v3DCore.scene.render();
    });
}
async function main1() {
    if (_babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__.SceneLoader) {
        _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__.SceneLoader.RegisterPlugin(new _importer_babylon_vrm_loader_src_index__WEBPACK_IMPORTED_MODULE_15__.VRMFileLoader());
    }
    // GLTFLoader.RegisterExtension("VRM", (loader) => {
    //   console.log("loader: ", loader);
    //   console.log("loader.babylonScene: ", loader.babylonScene);
    //   return new VRM(loader);
    // });
    const debugProperties = getDebugProperties();
    const canvas = document.getElementById("main-canvas");
    const engine = new _babylonjs_core_Engines_engine__WEBPACK_IMPORTED_MODULE_2__.Engine(canvas, true, {
        alpha: false,
        disableWebGL2Support: debugProperties.webgl1,
    });
    const scene = new _babylonjs_core_scene__WEBPACK_IMPORTED_MODULE_9__.Scene(engine);
    const camera = new _babylonjs_core_Cameras_arcRotateCamera__WEBPACK_IMPORTED_MODULE_0__.ArcRotateCamera("MainCamera1", 0, 0, 3, new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1.2, 0), scene, true);
    camera.lowerRadiusLimit = 0.1;
    camera.upperRadiusLimit = 20;
    camera.wheelDeltaPercentage = 0.01;
    camera.minZ = 0.3;
    camera.position = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1.2, -3);
    camera.attachControl(canvas, true);
    console.log("camera: ", camera);
    const directionalLight = new _babylonjs_core_Lights_directionalLight__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight("DirectionalLight1", new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -0.5, 1.0), scene);
    directionalLight.position = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 25, -50);
    directionalLight.setEnabled(true);
    window.currentScene = scene;
    engine.runRenderLoop(() => {
        scene.render();
    });
    const response = await _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__.SceneLoader.AppendAsync("", "./testfiles/default.vrm", scene);
    // const response = await SceneLoader.LoadAsync(
    //   "file:",
    //   "./testfiles/default.vrm",
    //   engine
    // );
    console.log("response: ", response);
    console.log("response.metadata: ", response.metadata);
}
async function main() {
    if (_babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__.SceneLoader) {
        _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__.SceneLoader.RegisterPlugin(new _importer_babylon_vrm_loader_src_index__WEBPACK_IMPORTED_MODULE_15__.VRMFileLoader());
    }
    // GLTFLoader.RegisterExtension("VRM", (loader) => {
    //   console.log("loader: ", loader);
    //   return new BVL.VRMLoaderExtension(loader);
    // });
    const debugProperties = getDebugProperties();
    const canvas = document.getElementById("main-canvas");
    console.log("debugProperties.webgl1: ", debugProperties.webgl1);
    const engine = new _babylonjs_core_Engines_engine__WEBPACK_IMPORTED_MODULE_2__.Engine(canvas, true, {
        alpha: false,
        disableWebGL2Support: debugProperties.webgl1,
    });
    console.log("engine: ", engine);
    const scene = new _babylonjs_core_scene__WEBPACK_IMPORTED_MODULE_9__.Scene(engine);
    console.log("scene: ", scene);
    const camera = new _babylonjs_core_Cameras_arcRotateCamera__WEBPACK_IMPORTED_MODULE_0__.ArcRotateCamera("MainCamera1", 0, 0, 3, new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1.2, 0), scene, true);
    camera.lowerRadiusLimit = 0.1;
    camera.upperRadiusLimit = 20;
    camera.wheelDeltaPercentage = 0.01;
    camera.minZ = 0.3;
    camera.position = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1.2, -3);
    camera.attachControl(canvas, true);
    console.log("camera: ", camera);
    scene.createDefaultEnvironment({
        createGround: true,
        createSkybox: false,
        enableGroundMirror: false,
        enableGroundShadow: false,
    });
    // Lights
    const directionalLight = new _babylonjs_core_Lights_directionalLight__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight("DirectionalLight1", new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -0.5, 1.0), scene);
    directionalLight.position = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 25, -50);
    directionalLight.setEnabled(true);
    const hemisphericLight = new _babylonjs_core_Lights_hemisphericLight__WEBPACK_IMPORTED_MODULE_4__.HemisphericLight("HemisphericLight1", new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(-0.2, -0.8, -1), scene);
    hemisphericLight.setEnabled(false);
    const pointLight = new _babylonjs_core_Lights_pointLight__WEBPACK_IMPORTED_MODULE_5__.PointLight("PointLight1", new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 1), scene);
    pointLight.setEnabled(false);
    // Meshes
    const standardMaterialSphere = _babylonjs_core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_8__.Mesh.CreateSphere("StandardMaterialSphere1", 16, 1, scene);
    standardMaterialSphere.position = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(1.5, 1.2, 0);
    standardMaterialSphere.receiveShadows = true;
    const shadowCaster = _babylonjs_core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_8__.Mesh.CreateTorusKnot("ShadowCaster", 1, 0.2, 32, 32, 2, 3, scene);
    shadowCaster.position = new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3(0.0, 5.0, -10.0);
    shadowCaster.setEnabled(debugProperties.shadow);
    if (debugProperties.shadow) {
        const shadowGenerator = new _babylonjs_core_Lights_Shadows_shadowGenerator__WEBPACK_IMPORTED_MODULE_6__.ShadowGenerator(1024, directionalLight);
        shadowGenerator.addShadowCaster(shadowCaster);
    }
    if (debugProperties.inspector) {
        await scene.debugLayer.show({
            globalRoot: document.getElementById("wrapper"),
        });
    }
    // Expose current scene
    window.currentScene = scene;
    scene.onBeforeRenderObservable.add(() => {
        // SpringBone
        if (!scene.metadata || !scene.metadata.vrmManagers) {
            return;
        }
        const managers = scene.metadata.vrmManagers;
        const deltaTime = scene.getEngine().getDeltaTime();
        managers.forEach((manager) => {
            manager.update(deltaTime);
        });
    });
    engine.runRenderLoop(() => {
        scene.render();
        shadowCaster.rotate(_babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3.Up(), 0.01);
    });
    window.addEventListener("resize", () => {
        engine.resize();
    });
    console.log("try to call SceneLoader.AppendAsync()");
    console.log("SceneLoader: ", _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__.SceneLoader);
    // await SceneLoader.AppendAsync("./", "AliciaSolid.vrm", scene);
    // await SceneLoader.AppendAsync("./", "7822444336497004526.vrm", scene);
    await _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__.SceneLoader.AppendAsync("./", "default.vrm", scene);
    console.log("try to call addEventListener()");
    let fileCount = 1;
    document.getElementById("file-input").addEventListener("change", (evt) => {
        const file = evt.target.files[0];
        console.log(`loads ${file.name} ${file.size} bytes`);
        const currentMeshCount = scene.meshes.length;
        _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__.SceneLoader.Append("file:", file, scene, () => {
            console.log(`loaded ${file.name}`);
            for (let i = currentMeshCount; i < scene.meshes.length; i++) {
                scene.meshes[i].translate(_babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3.Right(), 1.5 * fileCount);
                scene.meshes[i].receiveShadows = true;
            }
            fileCount++;
        });
    });
}
function getDebugProperties() {
    const href = window.location.href;
    return {
        webgl1: href.includes("webgl1"),
        shadow: href.includes("shadow"),
        inspector: href.includes("inspector"),
    };
}
main2().catch((reason) => {
    console.error(reason);
});


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V3DCore": () => (/* reexport safe */ _v3d_core__WEBPACK_IMPORTED_MODULE_0__.V3DCore),
/* harmony export */   "V3DHelper": () => (/* reexport safe */ _helper__WEBPACK_IMPORTED_MODULE_1__.V3DHelper)
/* harmony export */ });
/* harmony import */ var _v3d_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v3d-core */ "./src/v3d-core.ts");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/helper.ts");
/** Copyright (c) 2021 The v3d Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */




/***/ }),

/***/ "./src/scene/optimizer.ts":
/*!********************************!*\
  !*** ./src/scene/optimizer.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V3DSceneOptimizer": () => (/* binding */ V3DSceneOptimizer)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/index.ts");
/** Copyright (c) 2021 The v3d Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */


class V3DSceneOptimizer {
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
    }
    get optimizer() {
        return this._optimizer;
    }
    constructor(scene, options) {
        this.scene = scene;
        this._options = options || V3DSceneOptimizer.CustomOptimizerOptions();
        this._optimizer = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.SceneOptimizer(scene, this._options);
        this._optimizer.targetFrameRate = _index__WEBPACK_IMPORTED_MODULE_1__.V3DCore.FRAMERATE;
        this._optimizer.trackerDuration = 2000;
        this._optimizer.start();
        this.setupFocusEvents(this._optimizer);
    }
    static CustomOptimizerOptions() {
        const options = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.SceneOptimizerOptions();
        options.addOptimization(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.LensFlaresOptimization(0));
        options.addOptimization(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.ParticlesOptimization(1));
        options.addOptimization(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.TextureOptimization(1, 512));
        options.addOptimization(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.RenderTargetsOptimization(2));
        options.addOptimization(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.PostProcessesOptimization(3));
        options.addOptimization(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.HardwareScalingOptimization(4, 2));
        return options;
    }
    setupFocusEvents(optimizer) {
        if (window) {
            console.log("setupFocusEvents");
            window.addEventListener('focusin', function (e) {
                console.log("Optimizer start");
                optimizer.start();
            }, true);
            window.addEventListener('focusout', function (e) {
                console.log("Optimizer stop");
                optimizer.stop();
                optimizer.reset();
            }, true);
        }
    }
}


/***/ }),

/***/ "./src/scene/skybox.ts":
/*!*****************************!*\
  !*** ./src/scene/skybox.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v3DSkyBox": () => (/* binding */ v3DSkyBox)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _babylonjs_materials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/materials */ "./node_modules/@babylonjs/materials/index.js");
/** Copyright (c) 2021 The v3d Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */


class v3DSkyBox {
    get skybox() {
        return this._skybox;
    }
    constructor(scene, textureName, boxSize, envTexture) {
        this.scene = scene;
        this.textureName = textureName;
        this.boxSize = boxSize;
        this.envTexture = envTexture;
        this._skybox = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Mesh.CreateBox("Skybox", boxSize, this.scene, undefined, _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Mesh.BACKSIDE);
        this._skyboxBase = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Mesh.CreateBox("SkyboxBase", boxSize + 1, this.scene, undefined, _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Mesh.BACKSIDE);
        this.createMaterial(textureName);
        this._skybox.material = this.skyboxMaterial;
        this._skyboxBase.material = this.skyboxBaseMaterial;
        this._skybox.renderingGroupId = 0;
        this._skyboxBase.renderingGroupId = 0;
        this._skybox.material.transparencyMode = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Material.MATERIAL_ALPHATESTANDBLEND;
        this._skybox.material.alpha = 0.5;
        this.setupImageProcessing();
    }
    /**
     * Setup the skybox material and the skybox reflection texture
     * @param textureName name (URI) to the texture files
     * @private
     */
    createMaterial(textureName) {
        this.skyboxBaseMaterial = new _babylonjs_materials__WEBPACK_IMPORTED_MODULE_1__.SkyMaterial("SkyboxBaseMaterial", this.scene);
        this.skyboxMaterial = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.BackgroundMaterial("SkyboxMaterial", this.scene);
        this.skyboxMaterial.backFaceCulling = false;
        this.skyboxMaterial.useRGBColor = false;
        this.skyboxMaterial.primaryColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Color3(1, 1, 1);
        this.skyboxMaterial.enableNoise = true;
        this.skyboxReflectionTexture = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.CubeTexture(textureName, this.scene);
        this.skyboxReflectionTexture.coordinatesMode = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Texture.SKYBOX_MODE;
        this.skyboxReflectionTexture.gammaSpace = false;
        this.skyboxMaterial.reflectionTexture = this.skyboxReflectionTexture;
    }
    /**
     * Setup the image processing according to the specified options.
     */
    setupImageProcessing() {
        this.scene.imageProcessingConfiguration.contrast = 1.2;
        this.scene.imageProcessingConfiguration.exposure = 0.8;
        this.scene.imageProcessingConfiguration.toneMappingEnabled = true;
        this.scene.environmentTexture = this.envTexture ? this.envTexture
            : _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.CubeTexture.CreateFromPrefilteredData(v3DSkyBox._environmentTextureCDNUrl, this.scene);
    }
}
v3DSkyBox._environmentTextureCDNUrl = "https://assets.babylonjs.com/environments/environmentSpecular.env";


/***/ }),

/***/ "./src/utilities/types.ts":
/*!********************************!*\
  !*** ./src/utilities/types.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAnimationDataType": () => (/* binding */ getAnimationDataType),
/* harmony export */   "isIShadowLight": () => (/* binding */ isIShadowLight)
/* harmony export */ });
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/** Copyright (c) 2021 The v3d Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */


function isIShadowLight(light) {
    return light.setShadowProjectionMatrix !== undefined;
}
function getAnimationDataType(value) {
    let dataType = undefined;
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        dataType = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT;
    }
    else if (value instanceof _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Quaternion) {
        dataType = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_QUATERNION;
    }
    else if (value instanceof _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector3) {
        dataType = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_VECTOR3;
    }
    else if (value instanceof _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Vector2) {
        dataType = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_VECTOR2;
    }
    else if (value instanceof _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Color3) {
        dataType = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_COLOR3;
    }
    else if (value instanceof _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Color4) {
        dataType = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_COLOR4;
    }
    else if (value instanceof _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_1__.Size) {
        dataType = _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_SIZE;
    }
    if (dataType == undefined) {
        return null;
    }
    else {
        return dataType;
    }
}


/***/ }),

/***/ "./src/v3d-core.ts":
/*!*************************!*\
  !*** ./src/v3d-core.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V3DCore": () => (/* binding */ V3DCore),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Cameras_arcRotateCamera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Cameras/arcRotateCamera */ "./node_modules/@babylonjs/core/Cameras/arcRotateCamera.js");
/* harmony import */ var _babylonjs_core_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/core/scene */ "./node_modules/@babylonjs/core/scene.js");
/* harmony import */ var _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core/Loading/sceneLoader */ "./node_modules/@babylonjs/core/Loading/sceneLoader.js");
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/* harmony import */ var _importer_babylon_vrm_loader_src__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./importer/babylon-vrm-loader/src */ "./src/importer/babylon-vrm-loader/src/vrm-file-loader.ts");
/* harmony import */ var _importer_babylon_vrm_loader_src__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./importer/babylon-vrm-loader/src */ "./src/importer/babylon-vrm-loader/src/index.ts");
/* harmony import */ var _babylonjs_loaders_glTF_2_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babylonjs/loaders/glTF/2.0 */ "./node_modules/@babylonjs/loaders/glTF/2.0/index.js");
/* harmony import */ var _babylonjs_core_Lights_hemisphericLight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babylonjs/core/Lights/hemisphericLight */ "./node_modules/@babylonjs/core/Lights/hemisphericLight.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _utilities_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utilities/types */ "./src/utilities/types.ts");
/* harmony import */ var _scene_optimizer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scene/optimizer */ "./src/scene/optimizer.ts");
/* harmony import */ var _scene_skybox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scene/skybox */ "./src/scene/skybox.ts");
/** Copyright (c) 2021 The v3d Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */











class V3DCore {
    get springBonesAutoUpdate() {
        return this._springBonesAutoUpdate;
    }
    set springBonesAutoUpdate(value) {
        this._springBonesAutoUpdate = value;
    }
    get renderingPipeline() {
        return this._renderingPipeline;
    }
    addOnLoadCompleteCallbacks(callback) {
        this._onLoadCompleteCallbacks.push(callback);
    }
    removeOnLoadCompleteCallback(callback) {
        const idx = this._onLoadCompleteCallbacks.indexOf(callback);
        if (idx !== -1) {
            this._onLoadCompleteCallbacks.splice(idx, 1);
        }
    }
    resetOnLoadCompleteCallbacks() {
        this._onLoadCompleteCallbacks = [];
    }
    updateBeforeRenderFunction(func) {
        this._beforeRenderFunc = func;
    }
    updateAfterRenderFunction(func) {
        this._afterRenderFunc = func;
    }
    get mainCamera() {
        return this._mainCamera;
    }
    set mainCamera(value) {
        this._mainCamera = value;
    }
    addVRMManager(manager) {
        if (manager)
            this.loadedVRMManagers.push(manager);
    }
    /**
     * Get VRM Manager by index
     * @param idx
     */
    getVRMManagerByIndex(idx) {
        return idx >= 0 && idx < this.loadedVRMManagers.length
            ? this.loadedVRMManagers[idx]
            : null;
    }
    /**
     * Get VRM Manager by URI
     * VRM doesn't have any UID in metadata. Title can be unfilled too.
     * Filename is the only reasonable ID.
     * @param uri
     */
    // VRM doesn't have any UID in metadata. Title can be unfilled too.
    // Filename is the only reasonable ID.
    getVRMManagerByURI(uri) {
        console.log("call getVRMManagerByURI()");
        console.log("uri: ", uri);
        console.log("this.loadedVRMManagers: ", this.loadedVRMManagers);
        for (const manager of this.loadedVRMManagers) {
            console.log("manager: ", manager);
            console.log("manager.uri: ", manager.uri);
            if (manager.uri === uri)
                return manager;
        }
        return null;
    }
    constructor(engine, 
    //* TODO: Patched.
    // public scene?: Scene,
    scene, camera) {
        this.engine = engine;
        this.scene = scene;
        /**
         * GLTFFileLoader plugin factory
         * @private
         */
        this._vrmFileLoader = new _importer_babylon_vrm_loader_src__WEBPACK_IMPORTED_MODULE_10__.VRMFileLoader();
        // Whether starts spring bones animation automatically
        this._springBonesAutoUpdate = true;
        /**
         * Shadow generators
         */
        this._shadowGenerators = new Map();
        /**
         * Callbacks when loading is done
         */
        this._onLoadCompleteCallbacks = [];
        this._beforeRenderFunc = () => { };
        this._afterRenderFunc = () => {
            for (const manager of this.loadedVRMManagers) {
                if (this._springBonesAutoUpdate)
                    manager.update(this.engine.getDeltaTime());
            }
        };
        this._cameraOnBeforeRenderFunc = [];
        /**
         * Loaded VRM Managers
         * @private
         */
        this.loadedVRMManagers = [];
        console.log("call constructor()");
        console.log("engine: ", engine);
        console.log("scene: ", scene);
        console.log("camera: ", camera);
        // Register
        this.registerVrmPlugin();
        this.registerVrmExtension();
        if (!this.scene)
            this.scene = new _babylonjs_core_scene__WEBPACK_IMPORTED_MODULE_1__.Scene(this.engine);
        else
            this.engine = this.scene.getEngine();
        this.setupObservable();
        this.enableResize();
        if (camera) {
            console.log("camera: ", camera);
            this._mainCamera = camera;
            this.scene.switchActiveCamera(camera);
        }
        else {
            this.addCamera();
        }
        this._renderingPipeline = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_6__.DefaultRenderingPipeline("defaultPipeline", // The name of the pipeline
        true, // Do you want the pipeline to use HDR texture?
        this.scene, // The scene instance
        [this._mainCamera] // The list of cameras to be attached to
        );
        this.setupRenderingPipeline();
    }
    /**
     * Make background transparent.
     */
    transparentBackground() {
        console.log("call transparentBackground()");
        this.scene.clearColor.a = 0;
    }
    /**
     * Make background solid.
     */
    solidBackground() {
        this.scene.clearColor.a = 1;
    }
    /**
     * Change background color.
     * @param color
     */
    setBackgroundColor(color) {
        this.scene.clearColor = _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_3__.Color4.FromColor3(color, this.scene.clearColor.a).toLinearSpace();
    }
    /**
     * Set background color from hex string.
     * @param hex Hex color string
     */
    setBackgroundColorHex(hex) {
        this.setBackgroundColor(_babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_3__.Color3.FromHexString(hex));
    }
    /**
     * Add an ambient light.
     * @param color color of the light
     */
    addAmbientLight(color) {
        const light = new _babylonjs_core_Lights_hemisphericLight__WEBPACK_IMPORTED_MODULE_5__.HemisphericLight("V3DHemiLight", new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 1, 1), this.scene);
        if (color)
            light.diffuse = color;
        light.setEnabled(true);
    }
    /**
     * Add a basic arc rotate camera to scene.
     * TODO: there seems to be a bug when meshes are near the edge of camera cone
     * Probably has something to do with culling
     * @param radius rotation radius
     */
    addCamera(radius = 3) {
        console.log("call addCamera()");
        console.log("radius: ", radius);
        const camera = new _babylonjs_core_Cameras_arcRotateCamera__WEBPACK_IMPORTED_MODULE_0__.ArcRotateCamera("V3DMainCamera", 0, 0, radius, new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 0), this.scene, true);
        camera.lowerRadiusLimit = 0.1;
        camera.upperRadiusLimit = 20;
        camera.wheelDeltaPercentage = 0.05;
        camera.minZ = 0;
        camera.setPosition(new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 1.5, -5));
        camera.attachControl(this.engine.getRenderingCanvas());
        this._mainCamera = camera;
        this.scene.switchActiveCamera(this._mainCamera, true);
    }
    /**
     * Attach a arc rotate following camera to VRM model.
     * Probably has something to do with culling
     * @param manager VRM Manager to attach the camera to
     * @param radius rotation radius
     */
    attachCameraTo(manager, radius = 3) {
        console.log("call attachCameraTo()");
        console.log("manager: ", manager);
        console.log("radius: ", radius);
        const camera = new _babylonjs_core_Cameras_arcRotateCamera__WEBPACK_IMPORTED_MODULE_0__.ArcRotateCamera("V3DArcCamera" + manager.cameras.length, 0, 0, radius, manager.rootMesh.position, this.scene, true);
        camera.lowerRadiusLimit = 0.1;
        camera.upperRadiusLimit = 20;
        camera.wheelDeltaPercentage = 0.05;
        camera.minZ = 0;
        camera.setPosition(new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 1.5, -5));
        camera.setTarget(manager.rootMesh.getAbsolutePosition());
        camera.attachControl(this.engine.getRenderingCanvas());
        manager.appendCamera(camera);
        this._cameraOnBeforeRenderFunc.push(() => {
            camera.setTarget(manager.rootMesh.getAbsolutePosition());
        });
    }
    /**
     *
     * Create a skybox for the scene.
     * @param size size of the skybox
     * @param textureName path to skybox texture
     */
    createSkyBox(size, textureName) {
        if (!this.skyBox) {
            this.skyBox = new _scene_skybox__WEBPACK_IMPORTED_MODULE_9__.v3DSkyBox(this.scene, textureName ? textureName : "texture/skybox", size);
        }
    }
    /**
     * Enable shadow caster for light.
     * @param light Light to enable shadows.
     */
    enableShabows(light) {
        if (light) {
            if (!this._shadowGenerators.has(light)) {
                const shadowGenerator = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_6__.ShadowGenerator(1024, light);
                this.setupShadowGenerator(shadowGenerator);
                this._shadowGenerators.set(light, shadowGenerator);
            }
            else {
                console.warn("Light " + light.name + " already has a shadow generator!");
            }
        }
        else {
            for (const l of this.scene.lights) {
                if ((0,_utilities_types__WEBPACK_IMPORTED_MODULE_7__.isIShadowLight)(l)) {
                    const shadowGenerator = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_6__.ShadowGenerator(1024, l);
                    this.setupShadowGenerator(shadowGenerator);
                    this._shadowGenerators.set(l, shadowGenerator);
                }
            }
        }
    }
    /**
     * Get corresponding shadow generator for light.
     * @param light Light to get shadow generator
     */
    //* TODO: Patched.
    // public getShadownGenerator(light: IShadowLight): Nullable<ShadowGenerator> {
    getShadownGenerator(light) {
        return this._shadowGenerators.get(light);
    }
    /**
     * Convenience function for starting animation
     * @param target
     * @param name
     * @param property
     * @param duration
     * @param from
     * @param to
     * @param loopMode
     * @param easingFunction
     * @param easingMode
     */
    startQuickAnimation(target, name, property, duration, from, to, loopMode, easingFunction, easingMode) {
        const anim = this.createAnimation(target, name, property, [
            { frame: 0, value: from },
            { frame: duration, value: to },
        ], loopMode, easingFunction, easingMode);
        return this.scene.beginDirectAnimation(anim[0], [anim[1]], 0, duration, false);
    }
    /**
     * Convenience function for creating animation
     * @param target
     * @param name
     * @param property
     * @param keyFrames
     * @param loopMode
     * @param easingFunction
     * @param easingMode
     */
    createAnimation(target, name, property, keyFrames, loopMode, easingFunction, easingMode) {
        // Make sure keyFrames is not empty
        if (keyFrames.length < 1)
            throw Error("Key Frames empty");
        // Get data type
        const dataType = (0,_utilities_types__WEBPACK_IMPORTED_MODULE_7__.getAnimationDataType)(keyFrames[0].value);
        if (dataType === null)
            throw Error("Cannot determine data type from keyframes!");
        const animation = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_6__.Animation(name, property, V3DCore.FRAMERATE, dataType, loopMode);
        animation.setKeys(keyFrames);
        if (easingFunction) {
            if (easingMode)
                easingFunction.setEasingMode(easingMode);
            animation.setEasingFunction(easingFunction);
        }
        return [target, animation];
    }
    enableOptimizer(options) {
        this._sceneOptimizer = new _scene_optimizer__WEBPACK_IMPORTED_MODULE_8__.V3DSceneOptimizer(this.scene, options);
    }
    // Don't make wrappers static, so plugins will always be registered
    /**
     * Wrapper for SceneLoader.AppendAsync.
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     */
    AppendAsync(rootUrl, sceneFilename) {
        console.log("call AppendAsync");
        return _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_2__.SceneLoader.AppendAsync(rootUrl, sceneFilename, this.scene);
    }
    /**
     * Wrapper for SceneLoader.LoadAsync
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     */
    LoadAsync(rootUrl, sceneFilename) {
        return _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_2__.SceneLoader.LoadAsync(rootUrl, sceneFilename, this.engine);
    }
    // GLTFLoaderExtensionObserver
    onLoadReady() {
        console.log("call onLoadReady()");
        console.log("this._onLoadCompleteCallbacks: ", this._onLoadCompleteCallbacks);
        for (const f of this._onLoadCompleteCallbacks) {
            f();
        }
    }
    /**
     * Set up for time update.
     * @private
     */
    setupObservable() {
        this.scene.onBeforeRenderObservable.add((eventData, eventState) => {
            this._beforeRenderFunc(eventData, eventState);
        });
        // Camera
        this.scene.onBeforeRenderObservable.add(() => {
            for (const f of this._cameraOnBeforeRenderFunc)
                f();
        });
        // Update secondary animation
        this.scene.onAfterRenderObservable.add((eventData, eventState) => {
            this._afterRenderFunc(eventData, eventState);
        });
    }
    enableResize() {
        //* TODO: Patched.
        // this.engine.getRenderingCanvas().onresize = () => {
        this.engine.getRenderingCanvas().onresize = () => {
            this.engine.resize();
        };
    }
    setupShadowGenerator(shadowGenerator) {
        shadowGenerator.usePercentageCloserFiltering = true;
        shadowGenerator.filteringQuality = _babylonjs_core__WEBPACK_IMPORTED_MODULE_6__.ShadowGenerator.QUALITY_HIGH;
    }
    // TODO Unregister
    registerVrmExtension() {
        console.log("call registerVrmExtension()");
        console.log("VRMLoaderExtension.NAME: ", _importer_babylon_vrm_loader_src__WEBPACK_IMPORTED_MODULE_11__.VRMLoaderExtension.NAME);
        // ローダーに登録する
        _babylonjs_loaders_glTF_2_0__WEBPACK_IMPORTED_MODULE_4__.GLTFLoader.RegisterExtension(_importer_babylon_vrm_loader_src__WEBPACK_IMPORTED_MODULE_11__.VRMLoaderExtension.NAME, (loader) => {
            console.log("loader: ", loader);
            console.log("this: ", this);
            return new _importer_babylon_vrm_loader_src__WEBPACK_IMPORTED_MODULE_11__.VRMLoaderExtension(loader, this);
        });
    }
    registerVrmPlugin() {
        console.log("call registerVrmPlugin()");
        console.log("SceneLoader: ", _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_2__.SceneLoader);
        console.log("SceneLoader.GetPluginForExtension(.vrm).name: ", _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_2__.SceneLoader.GetPluginForExtension(".vrm").name);
        // if (
        //   SceneLoader &&
        //   SceneLoader.GetPluginForExtension(".vrm").name === "vrm"
        // ) {
        if (_babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_2__.SceneLoader) {
            console.log("try to call SceneLoader.RegisterPlugin()");
            console.log("this._vrmFileLoader: ", this._vrmFileLoader);
            _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_2__.SceneLoader.RegisterPlugin(this._vrmFileLoader);
        }
    }
    setupRenderingPipeline() {
        this._renderingPipeline.samples = 4;
        this._renderingPipeline.depthOfFieldEnabled = true;
        this._renderingPipeline.depthOfFieldBlurLevel =
            _babylonjs_core__WEBPACK_IMPORTED_MODULE_6__.DepthOfFieldEffectBlurLevel.Medium;
        this._renderingPipeline.depthOfField.focusDistance = 2000; // distance of the current focus point from the camera in millimeters considering 1 scene unit is 1 meter
        this._renderingPipeline.depthOfField.focalLength = 10; // focal length of the camera in millimeters
        this._renderingPipeline.depthOfField.fStop = 1.4; // aka F number of the camera defined in stops as it would be on a physical device
    }
}
V3DCore.FRAMERATE = 60;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (V3DCore);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkv3d_core"] = self["webpackChunkv3d_core"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors~main"], () => (__webpack_require__("./src/index-test.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2hlbHBlci50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL2Vycm9ycy50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL2h1bWFub2lkLWJvbmUudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL21hdGVyaWFsLXZhbHVlLWJpbmRpbmctbWVyZ2VyLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvc2Vjb25kYXJ5LWFuaW1hdGlvbi9jb2xsaWRlci1ncm91cC50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3NlY29uZGFyeS1hbmltYXRpb24vY29sbGlkZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9zZWNvbmRhcnktYW5pbWF0aW9uL3NwcmluZy1ib25lLWNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9zZWNvbmRhcnktYW5pbWF0aW9uL3ZybS1zcHJpbmctYm9uZS1sb2dpYy50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3NlY29uZGFyeS1hbmltYXRpb24vdnJtLXNwcmluZy1ib25lLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvdmNhc3QtdmNpLW1hdGVyaWFsLXVuaXR5LnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvdnJtLWV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3ZybS1maWxlLWxvYWRlci50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3ZybS1pbnRlcmZhY2VzLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvdnJtLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy92cm0tbWF0ZXJpYWwtZ2VuZXJhdG9yLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2luZGV4LXRlc3QudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvc2NlbmUvb3B0aW1pemVyLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL3NjZW5lL3NreWJveC50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy91dGlsaXRpZXMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvdjNkLWNvcmUudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3YzZC1jb3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInYzZC1jb3JlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInYzZC1jb3JlXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5pbXBvcnQge0Fic3RyYWN0TWVzaCwgTWVzaCwgTnVsbGFibGUsIFNoYWRvd0dlbmVyYXRvciwgU2tlbGV0b24sIFNrZWxldG9uVmlld2VyLCBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZVwiO1xuaW1wb3J0IFYzRENvcmUgZnJvbSBcIi4vdjNkLWNvcmVcIjtcblxuZXhwb3J0IGNsYXNzIFYzREhlbHBlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjb3JlOiBWM0RDb3JlXG4gICAgKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBhIG5vZGUgY2FzdCBzaGFkb3cgZnJvbSBhIFNoYWRvd0dlbmVyYXRvclxuICAgICAqIEBwYXJhbSBzaGFkb3dHZW5lcmF0b3JcbiAgICAgKiBAcGFyYW0gbm9kZU5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkTm9kZVRvU2hhZG93Q2FzdGVyQnlOYW1lKFxuICAgICAgICBzaGFkb3dHZW5lcmF0b3I6IE51bGxhYmxlPFNoYWRvd0dlbmVyYXRvcj4sXG4gICAgICAgIG5vZGVOYW1lOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgc2hhZG93R2VuZXJhdG9yPy5hZGRTaGFkb3dDYXN0ZXIodGhpcy5jb3JlLnNjZW5lLmdldE5vZGVCeU5hbWUobm9kZU5hbWUpIGFzIE1lc2gpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2Ugbm9kZXMgY2FzdCBzaGFkb3cgZnJvbSBhIFNoYWRvd0dlbmVyYXRvclxuICAgICAqIEBwYXJhbSBzaGFkb3dHZW5lcmF0b3JcbiAgICAgKiBAcGFyYW0gbm9kZU5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkTm9kZVRvU2hhZG93Q2FzdGVyQ29udGFpbnNOYW1lKFxuICAgICAgICBzaGFkb3dHZW5lcmF0b3I6IE51bGxhYmxlPFNoYWRvd0dlbmVyYXRvcj4sXG4gICAgICAgIG5vZGVOYW1lOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgaWYgKCFzaGFkb3dHZW5lcmF0b3IpIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuY29yZS5zY2VuZS5nZXROb2RlcygpKSB7XG4gICAgICAgICAgICBpZiAobm9kZSAmJiBub2RlLm5hbWUuaW5jbHVkZXMobm9kZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgc2hhZG93R2VuZXJhdG9yLmFkZFNoYWRvd0Nhc3Rlcihub2RlIGFzIE1lc2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBub2RlIHJlY2VpdmUgc2hhZG93XG4gICAgICogQHBhcmFtIG5vZGVOYW1lXG4gICAgICovXG4gICAgcHVibGljIG1ha2VSZWNlaXZlU2hhZG93QnlOYW1lKG5vZGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgKHRoaXMuY29yZS5zY2VuZS5nZXROb2RlQnlOYW1lKG5vZGVOYW1lKSBhcyBNZXNoKS5yZWNlaXZlU2hhZG93cyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBub2RlcyByZWNlaXZlIHNoYWRvd1xuICAgICAqIEBwYXJhbSBub2RlTmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBtYWtlUmVjZWl2ZVNoYWRvd0NvbnRhaW5zTmFtZShub2RlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLmNvcmUuc2NlbmUuZ2V0Tm9kZXMoKSkge1xuICAgICAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5uYW1lLmluY2x1ZGVzKG5vZGVOYW1lKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIChub2RlIGFzIE1lc2gpLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93U2tlbGV0b25EZWJ1ZyhcbiAgICAgICAgc2tlbGV0b246IFNrZWxldG9uLFxuICAgICAgICBtZXNoOiBBYnN0cmFjdE1lc2hcbiAgICApIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHBhdXNlQW5pbWF0aW9ucyA6IHRydWUsIC8vVHJ1ZSBvciBGYWxzZSBmbGFnIHRvIHBhdXNlIHRoZSBhbmltYXRpb25zIHdoaWxlIHRyeWluZyB0byBjb25zdHJ1Y3QgdGhlIGRlYnVnTWVzaC4gRGVmYXVsdDogVHJ1ZVxuICAgICAgICAgICAgcmV0dXJuVG9SZXN0IDogZmFsc2UsIC8vRmxhZyB0byBmb3JjZSB0aGUgc2tlbGV0b24gYmFjayBpbnRvIGl0cyByZXN0UG9zZSBiZWZvcmUgY29uc3RydWN0aW5nIHRoZSBkZWJ1Z01lc2guIERlZmF1bHQ6IEZhbHNlXG4gICAgICAgICAgICBjb21wdXRlQm9uZXNVc2luZ1NoYWRlcnMgOiB0cnVlLCAvL1RlbGwgdGhlIGRlYnVnTWVzaCB0byB1c2Ugb3Igbm90IHVzZSB0aGUgR1BVIGZvciBpdHMgY2FsY3VsYXRpb25zLCBpZiB5b3UgZXZlciB3YW50IHRvIGRvIHBpY2tpbmcgb24gdGhlIG1lc2ggdGhpcyB3aWxsIG5lZWQgdG8gYmUgRmFsc2UuIERlZmF1bHQ6IFRydWVcbiAgICAgICAgICAgIHVzZUFsbEJvbmVzIDogdHJ1ZSwgLy9WaXN1YWxpemUgYWxsIGJvbmVzIG9yIHNraXAgdGhlIG9uZXMgd2l0aCBubyBpbmZsdWVuY2UuXG4gICAgICAgICAgICBkaXNwbGF5TW9kZSA6IFNrZWxldG9uVmlld2VyLkRJU1BMQVlfTElORVMsIC8vQSB2YWx1ZSB0aGF0IGNvbnRyb2xzIHdoaWNoIGRpc3BsYXkgbW9kZSB0byB1c2UuIChTa2VsZXRvblZpZXdlci5ESVNQTEFZX0xJTkVTID0gMCwgU2tlbGV0b25WaWV3ZXIuRElTUExBWV9TUEhFUkVTID0gMSwgU2tlbGV0b25WaWV3ZXIuRElTUExBWV9TUEhFUkVfQU5EX1NQVVJTID0gMikuIERlZmF1bHQgPSAwLlxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBza2VsZXRvblZpZXdlciA9IG5ldyBTa2VsZXRvblZpZXdlcihcbiAgICAgICAgICAgIHNrZWxldG9uLCAvL1RhcmdldCBTa2VsZXRvblxuICAgICAgICAgICAgbWVzaCwgLy9UaGF0IHNrZWxldG9ucyBBdHRhY2hlZCBNZXNoIG9yIGEgTm9kZSB3aXRoIHRoZSBzYW1lIGdsb2JhbE1hdHJpeFxuICAgICAgICAgICAgdGhpcy5jb3JlLnNjZW5lLCAvL1RoZSBTY2VuZSBzY29wZVxuICAgICAgICAgICAgdHJ1ZSwgLy9hdXRvVXBkYXRlQm9uZU1hdHJpY2VzP1xuICAgICAgICAgICAgbWVzaC5yZW5kZXJpbmdHcm91cElkID4gMCA/IG1lc2gucmVuZGVyaW5nR3JvdXBJZCArIDEgOiAxLCAvLyByZW5kZXJpbmdHcm91cElkXG4gICAgICAgICAgICBvcHRpb25zLCAvL0NvbmZpZ3VyYXRpb24gT3B0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBza2VsZXRvblZpZXdlcjtcbiAgICB9XG59XG4iLCIvKipcclxuICogVGhyb3dzIHdoZW4gbWFuZGF0b3J5IGJvbmUgY291bGQgbm90IGZpbmRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCb25lTm90Rm91bmRFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gJ0JvbmVOb3RGb3VuZEVycm9yJztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGJvbmVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihgQm9uZToke2JvbmVOYW1lfSBOb3RGb3VuZGApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZSc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBCb25lTm90Rm91bmRFcnJvciB9IGZyb20gJy4vZXJyb3JzJztcclxuXHJcbmludGVyZmFjZSBUcmFuc2Zvcm1Ob2RlTWFwIHtcclxuICAgIFtuYW1lOiBzdHJpbmddOiBUcmFuc2Zvcm1Ob2RlO1xyXG59XHJcblxyXG4vKipcclxuICogSHVtYW5vaWRCb25lIOOCkuWPluW+l+OBmeOCi+ODoeOCveODg+ODiee+pFxyXG4gKiBAc2VlIGh0dHBzOi8vZG9jcy51bml0eTNkLmNvbS9qYS8yMDE4LjMvU2NyaXB0UmVmZXJlbmNlL0h1bWFuQm9keUJvbmVzLmh0bWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBIdW1hbm9pZEJvbmUge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgbm9kZU1hcDogVHJhbnNmb3JtTm9kZU1hcCkge31cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICAodGhpcy5ub2RlTWFwIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bC7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaGlwcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdoaXBzJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puWkquOCguOCglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRVcHBlckxlZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdsZWZ0VXBwZXJMZWcnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5aSq44KC44KCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRVcHBlckxlZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodFVwcGVyTGVnJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puOBsuOBllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRMb3dlckxlZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdsZWZ0TG93ZXJMZWcnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z44Gy44GWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRMb3dlckxlZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodExvd2VyTGVnJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3pui2s+mmllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRGb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2xlZnRGb290Jyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+i2s+mmllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0Rm9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodEZvb3QnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6ISK5qSO44Gu56ys5LiAXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc3BpbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnc3BpbmUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6IO4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY2hlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnY2hlc3QnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6aaWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbmVjaygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCduZWNrJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmgrVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGhlYWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnaGVhZCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bogqlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0U2hvdWxkZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnbGVmdFNob3VsZGVyJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+iCqVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0U2hvdWxkZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgncmlnaHRTaG91bGRlcicpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bkuIrohZVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0VXBwZXJBcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnbGVmdFVwcGVyQXJtJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+S4iuiFlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0VXBwZXJBcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgncmlnaHRVcHBlckFybScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bjgbLjgZhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0TG93ZXJBcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnbGVmdExvd2VyQXJtJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+OBsuOBmFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TG93ZXJBcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgncmlnaHRMb3dlckFybScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bmiYvpppZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0SGFuZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdsZWZ0SGFuZCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PmiYvpppZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodEhhbmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgncmlnaHRIYW5kJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puOBpOOBvuWFiChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0VG9lcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRUb2VzJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+OBpOOBvuWFiChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFRvZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodFRvZXMnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem55uuKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRFeWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0RXllJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+ebrihPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodEV5ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0RXllJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmhjihPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBqYXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdqYXcnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6Kaq5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRUaHVtYlByb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFRodW1iUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6Kaq5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRUaHVtYkludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRUaHVtYkludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bopqrmjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFRodW1iRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFRodW1iRGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puS6uuW3ruOBl+aMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0SW5kZXhQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRJbmRleFByb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puS6uuW3ruOBl+aMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0SW5kZXhJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5Lq65beu44GX5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRJbmRleERpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRJbmRleERpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bkuK3mjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdE1pZGRsZVByb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdE1pZGRsZVByb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puS4reaMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdE1pZGRsZUludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bkuK3mjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdE1pZGRsZURpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRNaWRkbGVEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6Jas5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRSaW5nUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0UmluZ1Byb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puiWrOaMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0UmluZ0ludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRSaW5nSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puiWrOaMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0UmluZ0Rpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRSaW5nRGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puWwj+aMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0TGl0dGxlUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0TGl0dGxlUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5bCP5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRMaXR0bGVJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puWwj+aMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0TGl0dGxlRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdExpdHRsZURpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PopqrmjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRUaHVtYlByb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRUaHVtYlByb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+imquaMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFRodW1iSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRUaHVtYkludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PopqrmjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRUaHVtYkRpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0VGh1bWJEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5Lq65beu44GX5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0SW5kZXhQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0SW5kZXhQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7Pkurrlt67jgZfmjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRJbmRleEludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5Lq65beu44GX5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0SW5kZXhEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodEluZGV4RGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+S4reaMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodE1pZGRsZVByb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRNaWRkbGVQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PkuK3mjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodE1pZGRsZUludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PkuK3mjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRNaWRkbGVEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodE1pZGRsZURpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PolqzmjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRSaW5nUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodFJpbmdQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PolqzmjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRSaW5nSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+iWrOaMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFJpbmdEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodFJpbmdEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5bCP5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TGl0dGxlUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodExpdHRsZVByb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+Wwj+aMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodExpdHRsZUludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+Wwj+aMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodExpdHRsZURpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0TGl0dGxlRGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOS4iuiDuChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB1cHBlckNoZXN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgndXBwZXJDaGVzdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6aCI44Oc44O844Oz44KS5Y+W5b6X44GZ44KL44CC5Y+W5b6X5Ye65p2l44Gq44GE5aC05ZCI44Gv5L6L5aSW44KS55m655Sf44GZ44KLXHJcbiAgICAgKlxyXG4gICAgICogQHRocm93cyBCb25lTm90Rm91bmRFcnJvclxyXG4gICAgICogQHBhcmFtIG5hbWUgSHVtYW5vaWRCb25lTmFtZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1hbmRhdG9yeUJvbmUobmFtZTogc3RyaW5nKTogVHJhbnNmb3JtTm9kZSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZU1hcFtuYW1lXTtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJvbmVOb3RGb3VuZEVycm9yKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOOCquODl+OCt+ODp+ODiuODq+ODnOODvOODs+OCkuWPluW+l+OBmeOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lIEh1bWFub2lkQm9uZU5hbWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRPcHRpb25hbEJvbmUobmFtZTogc3RyaW5nKTogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4ge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5ub2RlTWFwICYmIHRoaXMubm9kZU1hcFtuYW1lXSkgfHwgbnVsbDtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgKiBmcm9tICcuL2Vycm9ycyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaHVtYW5vaWQtYm9uZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbWF0ZXJpYWwtdmFsdWUtYmluZGluZy1tZXJnZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3ZjYXN0LXZjaS1tYXRlcmlhbC11bml0eSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdmNpLWludGVyZmFjZXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3ZybS1leHRlbnNpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL3ZybS1maWxlLWxvYWRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdnJtLWludGVyZmFjZXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3ZybS1tYW5hZ2VyJztcclxuZXhwb3J0ICogZnJvbSAnLi92cm0tbWF0ZXJpYWwtZ2VuZXJhdG9yJztcclxuIiwiaW1wb3J0IHR5cGUgeyBDb2xvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB7IFZlY3RvcjQgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwsIEJhc2VUZXh0dXJlLCBUZXh0dXJlLCBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZSc7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlJztcclxuaW1wb3J0IHR5cGUgeyBJVlJNQmxlbmRTaGFwZU1hdGVyaWFsQmluZCB9IGZyb20gJy4vdnJtLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsIH0gZnJvbSAnYmFieWxvbi1tdG9vbi1tYXRlcmlhbCc7XHJcblxyXG50eXBlIFN1cHBvcnRlZE1hdGVyaWFsID0gTVRvb25NYXRlcmlhbCB8IFBCUk1hdGVyaWFsO1xyXG5cclxuLyoqXHJcbiAqIGZpcnN0VmFsdWUg44GvIGZhbHNlIOWbuuWumuOBoOOBjOOAgSBVbmlWUk0g44Gr5YCj44Gj44Gm5a6a576p44GX44Gm44GE44KLXHJcbiAqL1xyXG50eXBlIFNldHRlciA9ICh2YWx1ZTogbnVtYmVyLCBmaXJzdFZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG5cclxuY29uc3QgUEJSTWF0ZXJpYWxUZXh0dXJlTWFwOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IGtleW9mIFBCUk1hdGVyaWFsIH0gPSB7XHJcbiAgICBfTWFpblRleDogJ2FsYmVkb1RleHR1cmUnLFxyXG59O1xyXG5cclxuY29uc3QgUEJSTWF0ZXJpYWxDb2xvck1hcDogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBrZXlvZiBQQlJNYXRlcmlhbCB9ID0ge1xyXG4gICAgX0NvbG9yOiAnYWxiZWRvQ29sb3InLFxyXG59O1xyXG5cclxuY29uc3QgTVRvb25NYXRlcmlhbFRleHR1cmVNYXA6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXToga2V5b2YgTVRvb25NYXRlcmlhbCB9ID0ge1xyXG4gICAgX01haW5UZXg6ICdkaWZmdXNlVGV4dHVyZScsXHJcbiAgICBfRW1pc3Npb25NYXA6ICdlbWlzc2l2ZVRleHR1cmUnLFxyXG4gICAgX0J1bXBNYXA6ICdidW1wVGV4dHVyZScsXHJcbiAgICBfU2hhZGVUZXh0dXJlOiAnc2hhZGVUZXh0dXJlJyxcclxuICAgIF9SZWNlaXZlU2hhZG93VGV4dHVyZTogJ3JlY2VpdmVTaGFkb3dUZXh0dXJlJyxcclxuICAgIF9TaGFkaW5nR3JhZGVUZXh0dXJlOiAnc2hhZGluZ0dyYWRlVGV4dHVyZScsXHJcbiAgICBfUmltVGV4dHVyZTogJ3JpbVRleHR1cmUnLFxyXG4gICAgX1NwaGVyZUFkZDogJ21hdENhcFRleHR1cmUnLFxyXG4gICAgX091dGxpbmVXaWR0aFRleHR1cmU6ICdvdXRsaW5lV2lkdGhUZXh0dXJlJyxcclxuICAgIF9VdkFuaW1NYXNrVGV4dHVyZTogJ3V2QW5pbWF0aW9uTWFza1RleHR1cmUnLFxyXG59O1xyXG5cclxuY29uc3QgTVRvb25NYXRlcmlhbENvbG9yTWFwOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IGtleW9mIE1Ub29uTWF0ZXJpYWwgfSA9IHtcclxuICAgIF9Db2xvcjogJ2RpZmZ1c2VDb2xvcicsXHJcbiAgICBfU2hhZGVDb2xvcjogJ3NoYWRlQ29sb3InLFxyXG4gICAgX1JpbUNvbG9yOiAncmltQ29sb3InLFxyXG4gICAgX0VtaXNzaW9uQ29sb3I6ICdlbWlzc2l2ZUNvbG9yJyxcclxuICAgIF9PdXRsaW5lQ29sb3I6ICdvdXRsaW5lQ29sb3InLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iLzRmZmQ5N2MyZTkzMzk2ODNjZTliZjIxZTczZjUxMGJkOTBjMmE1YjIvQXNzZXRzL1ZSTS9SdW50aW1lL0JsZW5kU2hhcGUvTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXIuY3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1fbWF0ZXJpYWxNYXA6IHsgW21hdGVyaWFsTmFtZTogc3RyaW5nXTogU3VwcG9ydGVkTWF0ZXJpYWwgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtX21hdGVyaWFsU2V0dGVyTWFwOiB7IFtiaW5kaW5nS2V5OiBzdHJpbmddOiBTZXR0ZXIgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBtX21hdGVyaWFsVmFsdWVNYXA6IHsgW2JpbmRpbmdLZXk6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcbiAgICBwcml2YXRlIG1fdXNlZDogeyBbdGFyZ2V0S2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYmFzZVZhbHVlQ2FjaGU6IHsgW2JpbmRpbmdLZXk6IHN0cmluZ106IFZlY3RvcjQgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBtYXRlcmlhbFZhbHVlc1RvQXBwbHk6IHsgW2JpbmRpbmdLZXk6IHN0cmluZ106IElWUk1CbGVuZFNoYXBlTWF0ZXJpYWxCaW5kIH0gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbHMgVlJN44Gu5YWoIE1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWxWYWx1ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG1hdGVyaWFsczogTWF0ZXJpYWxbXSwgcHJpdmF0ZSByZWFkb25seSBtYXRlcmlhbFZhbHVlczogSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmRbXSkge1xyXG4gICAgICAgIGlmIChtYXRlcmlhbHMubGVuZ3RoID09PSAwIHx8IG1hdGVyaWFsVmFsdWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOODl+ODreODkeODhuOCo+WQjeOBruWkieaPm+OBq+WvvuW/nOOBl+OBpuOBhOOCiyBNVG9vbk1hdGVyaWFsIOOBqCBQQlJNYXRlcmlhbCDjgpLkv53lrZjjgZnjgotcclxuICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFsIGluc3RhbmNlb2YgTVRvb25NYXRlcmlhbCB8fCBtYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWF0ZXJpYWxNYXBbbWF0ZXJpYWwubmFtZV0gPSBtYXRlcmlhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYmluZGluZ0tleSA9IHRoaXMubWFrZUJpbmRpbmdLZXkobWF0ZXJpYWxWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fbWF0ZXJpYWxTZXR0ZXJNYXBbYmluZGluZ0tleV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMubV9tYXRlcmlhbE1hcFttYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZV07XHJcbiAgICAgICAgICAgIGlmICghbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBiYXNlVmFsdWUgPSB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIG1hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lKTtcclxuICAgICAgICAgICAgaWYgKCFiYXNlVmFsdWUgfHwgbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZS5sZW5ndGggIT09IDQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDjg6Ljg7zjg5XjgqPjg7PjgrDnlKjjgasgYmFzZVZhbHVlICjliJ3mnJ/lgKQpIOOBqCBtYXRlcmlhbFZhbHVlIOOCkuS/neWtmOOBmeOCi1xyXG4gICAgICAgICAgICB0aGlzLmJhc2VWYWx1ZUNhY2hlW2JpbmRpbmdLZXldID0gYmFzZVZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsVmFsdWVzVG9BcHBseVtiaW5kaW5nS2V5XSA9IG1hdGVyaWFsVmFsdWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRWYWx1ZSA9IFZlY3RvcjQuRnJvbUFycmF5KG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUpO1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZU5hbWUgPSBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZTtcclxuICAgICAgICAgICAgLy8gVW5pdHkg44Go5bqn5qiZ57O744GM55Ww44Gq44KL44Gf44KB44CB44OG44Kv44K544OB44Oj44GuIHZPZmZzZXQg44KS5Y+N6Lui44GZ44KLXHJcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoUEJSTWF0ZXJpYWxUZXh0dXJlTWFwKS5zb21lKChrKSA9PiB2YWx1ZU5hbWUuc3RhcnRzV2l0aChrKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZS53ICo9IC0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKE1Ub29uTWF0ZXJpYWxUZXh0dXJlTWFwKS5zb21lKChrKSA9PiB2YWx1ZU5hbWUuc3RhcnRzV2l0aChrKSkpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlLncgKj0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbHVlTmFtZS5lbmRzV2l0aCgnX1NUX1MnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8g44OG44Kv44K544OB44Oj44GuIHXmlrnlkJEg44Gu44G/5pu05paw44GZ44KLXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXR0ZXI6IFNldHRlciA9ICh2YWx1ZSwgZmlyc3RWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZSA9IGZpcnN0VmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBiYXNlVmFsdWUuYWRkKHRhcmdldFZhbHVlLnN1YnRyYWN0KGJhc2VWYWx1ZSkuc2NhbGUodmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lKSEuYWRkKHRhcmdldFZhbHVlLnN1YnRyYWN0KGJhc2VWYWx1ZSkuc2NhbGUodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcmMgPSB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSkhO1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYy54ID0gcHJvcFZhbHVlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjLnogPSBwcm9wVmFsdWUuejtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSwgc3JjKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWF0ZXJpYWxTZXR0ZXJNYXBbYmluZGluZ0tleV0gPSBzZXR0ZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lLmVuZHNXaXRoKCdfU1RfVCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDjg4bjgq/jgrnjg4Hjg6Pjga4gduaWueWQkSDjga7jgb/mm7TmlrDjgZnjgotcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldHRlcjogU2V0dGVyID0gKHZhbHVlLCBmaXJzdFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlID0gZmlyc3RWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGJhc2VWYWx1ZS5hZGQodGFyZ2V0VmFsdWUuc3VidHJhY3QoYmFzZVZhbHVlKS5zY2FsZSh2YWx1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5nZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUpIS5hZGQodGFyZ2V0VmFsdWUuc3VidHJhY3QoYmFzZVZhbHVlKS5zY2FsZSh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lKSE7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjLnkgPSBwcm9wVmFsdWUueTtcclxuICAgICAgICAgICAgICAgICAgICBzcmMudyA9IHByb3BWYWx1ZS53O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lLCBzcmMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9tYXRlcmlhbFNldHRlck1hcFtiaW5kaW5nS2V5XSA9IHNldHRlcjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldHRlcjogU2V0dGVyID0gKHZhbHVlLCBmaXJzdFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlID0gZmlyc3RWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGJhc2VWYWx1ZS5hZGQodGFyZ2V0VmFsdWUuc3VidHJhY3QoYmFzZVZhbHVlKS5zY2FsZSh2YWx1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5nZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUpIS5hZGQodGFyZ2V0VmFsdWUuc3VidHJhY3QoYmFzZVZhbHVlKS5zY2FsZSh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lLCBwcm9wVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9tYXRlcmlhbFNldHRlck1hcFtiaW5kaW5nS2V5XSA9IHNldHRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5pVlJNIOOBp+OBryBEaWN0aW9uYXJ5IOOBruOCreODvOeUqOOBruOCr+ODqeOCueOCkuWumue+qeOBl+OBpuOBhOOCi+OBjOOAgeaWh+Wtl+WIl+OBp+S7o+eUqOOBmeOCi1xyXG4gICAgICogTWF0ZXJpYWxWYWx1ZUJpbmRpbmcuQmFzZVZhbHVlIOOBr+WvvuW/nOOBmeOCi+ODl+ODreODkeODhuOCo+OBruWIneacn+WApOOBquOBruOBp+eEoeimluOBp+OBjeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1ha2VCaW5kaW5nS2V5KG1hdGVyaWFsVmFsdWU6IElWUk1CbGVuZFNoYXBlTWF0ZXJpYWxCaW5kKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7bWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWV9XyR7bWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWV9XyR7bWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZS5qb2luKCctJyl9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuaVZSTSDjgafjga8gRGljdGlvbmFyeSDjga7jgq3jg7znlKjjga7jgq/jg6njgrnjgpLlrprnvqnjgZfjgabjgYTjgovjgYzjgIHmloflrZfliJfjgafku6PnlKjjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtYWtlVGFyZ2V0S2V5KG1hdGVyaWFsVmFsdWU6IElWUk1CbGVuZFNoYXBlTWF0ZXJpYWxCaW5kKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7bWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWV9XyR7bWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWV9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODouODvOODleOCo+ODs+OCsOOCkuihjOOBhlxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWApCgw44CcMSlcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vcnBoaW5nKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5hcHBseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWF0ZXJpYWxWYWx1ZSDjgZTjgajjgavph43jgb/jgpLoqIjnrpfjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhY2N1bXVsYXRlVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxWYWx1ZXMuZm9yRWFjaCgobWF0ZXJpYWxWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBiaW5kaW5nS2V5ID0gdGhpcy5tYWtlQmluZGluZ0tleShtYXRlcmlhbFZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9tYXRlcmlhbFZhbHVlTWFwW2JpbmRpbmdLZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWF0ZXJpYWxWYWx1ZU1hcFtiaW5kaW5nS2V5XSArPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9tYXRlcmlhbFZhbHVlTWFwW2JpbmRpbmdLZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hdGVyaWFsIOOBruODl+ODreODkeODhuOCo+OCkuabtOaWsOOBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFwcGx5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV91c2VkID0ge307XHJcblxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMubWF0ZXJpYWxWYWx1ZXNUb0FwcGx5KS5mb3JFYWNoKChbYmluZGluZ0tleSwgbWF0ZXJpYWxWYWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0S2V5ID0gdGhpcy5tYWtlVGFyZ2V0S2V5KG1hdGVyaWFsVmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoISh0YXJnZXRLZXkgaW4gdGhpcy5tX3VzZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMubV9tYXRlcmlhbE1hcFttYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuYmFzZVZhbHVlQ2FjaGVbYmluZGluZ0tleV0uY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDlr77osaHjga7jg5fjg63jg5Hjg4bjgqPjgpLliJ3mnJ/lgKTjgavmiLvjgZlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlTmFtZSA9IG1hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlTmFtZS5lbmRzV2l0aCgnX1NUX1MnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSkhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnkgPSB2Lnk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUudyA9IHYudztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lLmVuZHNXaXRoKCdfU1RfVCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lKSE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUueCA9IHYueDtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS56ID0gdi56O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fdXNlZFt0YXJnZXRLZXldID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2V0dGVyID0gdGhpcy5tX21hdGVyaWFsU2V0dGVyTWFwW2JpbmRpbmdLZXldO1xyXG4gICAgICAgICAgICBpZiAoc2V0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICBzZXR0ZXIodGhpcy5tX21hdGVyaWFsVmFsdWVNYXBbYmluZGluZ0tleV0sIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm1fbWF0ZXJpYWxWYWx1ZU1hcCA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Oe44OG44Oq44Ki44Or44Gu44OG44Kv44K544OB44Oj44GL6Imy44Gr5a++5b+c44GZ44KLIFZlY3RvcjQg44KS5Y+W5b6X44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbDogU3VwcG9ydGVkTWF0ZXJpYWwsIHByb3BlcnR5TmFtZTogc3RyaW5nKTogTnVsbGFibGU8VmVjdG9yND4ge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gcHJvcGVydHlOYW1lLm1hdGNoKC9eKF9bXl9dKykvKTtcclxuICAgICAgICBpZiAoIW1hdGNoIHx8ICFtYXRjaFsxXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qga2V5ID0gbWF0Y2hbMV07XHJcbiAgICAgICAgaWYgKG1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgaWYgKFBCUk1hdGVyaWFsVGV4dHVyZU1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0VGV4dHVyZUludG9WZWN0b3I0V2hlbk5vdE51bGwobWF0ZXJpYWxbUEJSTWF0ZXJpYWxUZXh0dXJlTWFwW2tleV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoUEJSTWF0ZXJpYWxDb2xvck1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0Q29sb3JJbnRvVmVjdG9yNChtYXRlcmlhbFtQQlJNYXRlcmlhbENvbG9yTWFwW2tleV1dLCBtYXRlcmlhbC5hbHBoYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1Ub29uTWF0ZXJpYWxcclxuICAgICAgICBpZiAoTVRvb25NYXRlcmlhbFRleHR1cmVNYXBba2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0VGV4dHVyZUludG9WZWN0b3I0V2hlbk5vdE51bGwobWF0ZXJpYWxbTVRvb25NYXRlcmlhbFRleHR1cmVNYXBba2V5XV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTVRvb25NYXRlcmlhbENvbG9yTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydENvbG9ySW50b1ZlY3RvcjQobWF0ZXJpYWxbTVRvb25NYXRlcmlhbENvbG9yTWFwW2tleV1dLCBtYXRlcmlhbC5hbHBoYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGV4dHVyZSDjgpIgVmVjdG9yNCDjgavlpInmj5vjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb252ZXJ0VGV4dHVyZUludG9WZWN0b3I0V2hlbk5vdE51bGwodGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+KTogTnVsbGFibGU8VmVjdG9yND4ge1xyXG4gICAgICAgIGlmICghdGV4dHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdCA9IHRleHR1cmUgYXMgVGV4dHVyZTtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjQodC51U2NhbGUsIHQudlNjYWxlLCB0LnVPZmZzZXQsIHQudk9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xvcjMg44GrIGFscGhhIOOCkuWKoOOBiOOBpiBWZWN0b3I0IOOBq+WkieaPm+OBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnZlcnRDb2xvckludG9WZWN0b3I0KGNvbG9yOiBDb2xvcjMsIGFscGhhOiBudW1iZXIpOiBWZWN0b3I0IHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjQoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgYWxwaGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Oe44OG44Oq44Ki44Or44Gu44OG44Kv44K544OB44Oj44GL6Imy44KS5pu05paw44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbDogU3VwcG9ydGVkTWF0ZXJpYWwsIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogVmVjdG9yNCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gcHJvcGVydHlOYW1lLm1hdGNoKC9eKF9bXl9dKykvKTtcclxuICAgICAgICBpZiAoIW1hdGNoIHx8ICFtYXRjaFsxXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGtleSA9IG1hdGNoWzFdO1xyXG4gICAgICAgIGlmIChtYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIGlmIChQQlJNYXRlcmlhbFRleHR1cmVNYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0dXJlV2hlbk5vdE51bGwobWF0ZXJpYWxbUEJSTWF0ZXJpYWxUZXh0dXJlTWFwW2tleV1dLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFBCUk1hdGVyaWFsQ29sb3JNYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ19Db2xvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYSA9IHZhbHVlLnc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbG9yKG1hdGVyaWFsW1BCUk1hdGVyaWFsQ29sb3JNYXBba2V5XV0sIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1Ub29uTWF0ZXJpYWxcclxuICAgICAgICBpZiAoTVRvb25NYXRlcmlhbFRleHR1cmVNYXBba2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHR1cmVXaGVuTm90TnVsbChtYXRlcmlhbFtNVG9vbk1hdGVyaWFsVGV4dHVyZU1hcFtrZXldXSwgdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNVG9vbk1hdGVyaWFsQ29sb3JNYXBba2V5XSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnX0NvbG9yJykge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGEgPSB2YWx1ZS53O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29sb3IobWF0ZXJpYWxbTVRvb25NYXRlcmlhbENvbG9yTWFwW2tleV1dLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGV4dHVyZSDjgpIgVmVjdG9yNCDjgafmm7TmlrDjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUZXh0dXJlV2hlbk5vdE51bGwodGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+LCB2YWx1ZTogVmVjdG9yNCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHQgPSB0ZXh0dXJlIGFzIFRleHR1cmU7XHJcbiAgICAgICAgICAgIHQudVNjYWxlID0gdmFsdWUueDtcclxuICAgICAgICAgICAgdC52U2NhbGUgPSB2YWx1ZS55O1xyXG4gICAgICAgICAgICB0LnVPZmZzZXQgPSB2YWx1ZS56O1xyXG4gICAgICAgICAgICB0LnZPZmZzZXQgPSB2YWx1ZS53O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbG9yMyDjgpIgVmVjdG9yNCDjgafmm7TmlrDjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVDb2xvcihjb2xvcjogQ29sb3IzLCB2YWx1ZTogVmVjdG9yNCk6IHZvaWQge1xyXG4gICAgICAgIGNvbG9yLnIgPSB2YWx1ZS54O1xyXG4gICAgICAgIGNvbG9yLmcgPSB2YWx1ZS55O1xyXG4gICAgICAgIGNvbG9yLmIgPSB2YWx1ZS56O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgVmVjdG9yMyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoJztcclxuaW1wb3J0IHR5cGUgeyBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlJztcclxuaW1wb3J0IHsgU3BoZXJlQnVpbGRlciB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvQnVpbGRlcnMvc3BoZXJlQnVpbGRlcic7XHJcbmltcG9ydCB7IENvbGxpZGVyIH0gZnJvbSAnLi9jb2xsaWRlcic7XHJcblxyXG4vKipcclxuICogVlJNIFNwcmluZ0JvbmUgQ29sbGlkZXJHcm91cFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbGxpZGVyR3JvdXAge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyczogQ29sbGlkZXJbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHRyYW5zZm9ybSBUaGUgbm9kZSBvZiB0aGUgY29sbGlkZXIgZ3JvdXAgZm9yIHNldHRpbmcgdXAgY29sbGlzaW9uIGRldGVjdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdHJhbnNmb3JtOiBUcmFuc2Zvcm1Ob2RlKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIG9mZnNldHRlZCBjb2xsaWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvZmZzZXQgVGhlIGxvY2FsIGNvb3JkaW5hdGUgZnJvbSB0aGUgbm9kZSBvZiB0aGUgY29sbGlkZXIgZ3JvdXAuXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIGNvbGxpZGVyLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkQ29sbGlkZXIob2Zmc2V0OiBWZWN0b3IzLCByYWRpdXM6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHNwaGVyZSA9IFNwaGVyZUJ1aWxkZXIuQ3JlYXRlU3BoZXJlKFxyXG4gICAgICAgICAgICBgJHt0aGlzLnRyYW5zZm9ybS5uYW1lfV9Db2xsaWRlclNwaGVyZWAsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnRzOiA2LFxyXG4gICAgICAgICAgICAgICAgZGlhbWV0ZXI6IHJhZGl1cyAqIDIuMCxcclxuICAgICAgICAgICAgICAgIHVwZGF0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0uZ2V0U2NlbmUoKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc3BoZXJlLnNldFBhcmVudCh0aGlzLnRyYW5zZm9ybSk7XHJcbiAgICAgICAgc3BoZXJlLnNldFBvc2l0aW9uV2l0aExvY2FsVmVjdG9yKG9mZnNldCk7XHJcbiAgICAgICAgc3BoZXJlLnNldEVuYWJsZWQoZmFsc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbGxpZGVycy5wdXNoKG5ldyBDb2xsaWRlcihvZmZzZXQsIHJhZGl1cywgc3BoZXJlKSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBNZXNoIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlJztcclxuaW1wb3J0IHR5cGUgeyBWZWN0b3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5cclxuLyoqXHJcbiAqIENvbGxpZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29sbGlkZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IFRoZSBsb2NhbCBjb29yZGluYXRlIGZyb20gdGhlIG5vZGUgb2YgdGhlIGNvbGxpZGVyIGdyb3VwLlxyXG4gICAgICogQHBhcmFtIHJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBjb2xsaWRlci5cclxuICAgICAqIEBwYXJhbSBzcGhlcmUgVGhlIHNwZWhlcmUgbWVzaCBmb3Igd29ybGRNYXRyaXggYW5kIGdpem1vLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9mZnNldDogVmVjdG9yMywgcHVibGljIHJlYWRvbmx5IHJhZGl1czogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgc3BoZXJlOiBNZXNoKSB7fVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZSc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IElWUk1TZWNvbmRhcnlBbmltYXRpb24gfSBmcm9tICcuLi92cm0taW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IENvbGxpZGVyR3JvdXAgfSBmcm9tICcuL2NvbGxpZGVyLWdyb3VwJztcclxuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZSB9IGZyb20gJy4vdnJtLXNwcmluZy1ib25lJztcclxuXHJcbi8qKlxyXG4gKiBmdW5jdGlvbiB0byBnZXQgYm9uZSBmcm9tIG5vZGVJbmRleFxyXG4gKi9cclxudHlwZSBnZXRCb25lID0gKG5vZGVJbmRleDogbnVtYmVyKSA9PiBOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPjtcclxuXHJcbi8qKlxyXG4gKiBWUk0gU3ByaW5nQm9uZSBDb250cm9sbGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3ByaW5nQm9uZUNvbnRyb2xsZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTcHJpbmcgQm9uZSBMaXN0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3ByaW5nczogVlJNU3ByaW5nQm9uZVtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGV4dCBTZWNvbmRhcnlBbmltYXRpb24gT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gZ2V0Qm9uZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGV4dDogSVZSTVNlY29uZGFyeUFuaW1hdGlvbiwgZ2V0Qm9uZTogZ2V0Qm9uZSkge1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzID0gdGhpcy5jb25zdHJ1Y3RDb2xsaWRlckdyb3VwcyhnZXRCb25lKTtcclxuICAgICAgICB0aGlzLnNwcmluZ3MgPSB0aGlzLmNvbnN0cnVjdFNwcmluZ3MoZ2V0Qm9uZSwgY29sbGlkZXJHcm91cHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuc3ByaW5ncyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGFsbCBTcHJpbmdCb25lc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkZWx0YVRpbWUgRWxhcHNlZCBzZWMgZnJvbSBwcmV2aW91cyBmcmFtZVxyXG4gICAgICogQHNlZSBodHRwczovL2RvY3MudW5pdHkzZC5jb20vU2NyaXB0UmVmZXJlbmNlL1RpbWUtZGVsdGFUaW1lLmh0bWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIOODneODvOOCuuW+jOOBruOBguOCieOBtuOCiumYsuatouOBruOBn+OCgSBjbGFtcFxyXG4gICAgICAgIGRlbHRhVGltZSA9IE1hdGgubWF4KDAuMCwgTWF0aC5taW4oMTYuNjY2LCBkZWx0YVRpbWUpKSAvIDEwMDA7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSB0aGlzLnNwcmluZ3MubWFwPFByb21pc2U8dm9pZD4+KChzcHJpbmcpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNwcmluZy51cGRhdGUoZGVsdGFUaW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvKiBEbyBub3RoaW5nICovXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RDb2xsaWRlckdyb3VwcyhnZXRCb25lOiBnZXRCb25lKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmV4dC5jb2xsaWRlckdyb3VwcyB8fCAhdGhpcy5leHQuY29sbGlkZXJHcm91cHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXJHcm91cHM6IENvbGxpZGVyR3JvdXBbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZXh0LmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYm9uZSA9IGdldEJvbmUoY29sbGlkZXJHcm91cC5ub2RlKSBhcyBUcmFuc2Zvcm1Ob2RlO1xyXG4gICAgICAgICAgICBjb25zdCBnID0gbmV3IENvbGxpZGVyR3JvdXAoYm9uZSk7XHJcbiAgICAgICAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnLmFkZENvbGxpZGVyKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZSTSDlj7PmiYvns7tZX1VQLCAtWl9Gcm9udCDjgYvjgokgQmFieWxvbi5qcyDlt6bmiYvns7tZX1VQLCArWl9Gcm9udCDjgavjgZnjgotcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMygtY29sbGlkZXIub2Zmc2V0LngsIGNvbGxpZGVyLm9mZnNldC55LCAtY29sbGlkZXIub2Zmc2V0LnopLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVyLnJhZGl1c1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbGxpZGVyR3JvdXBzLnB1c2goZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVyR3JvdXBzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0U3ByaW5ncyhnZXRCb25lOiBnZXRCb25lLCBjb2xsaWRlckdyb3VwczogQ29sbGlkZXJHcm91cFtdKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmV4dC5ib25lR3JvdXBzIHx8ICF0aGlzLmV4dC5ib25lR3JvdXBzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNwcmluZ3M6IFZSTVNwcmluZ0JvbmVbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZXh0LmJvbmVHcm91cHMuZm9yRWFjaCgoc3ByaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvb3RCb25lcyA9IChzcHJpbmcuYm9uZXMgfHwgW10pLm1hcCgoYm9uZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEJvbmUoYm9uZSkgYXMgVHJhbnNmb3JtTm9kZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcmluZ0NvbGxpZGVycyA9IChzcHJpbmcuY29sbGlkZXJHcm91cHMgfHwgW10pLm1hcDxDb2xsaWRlckdyb3VwPigoZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxpZGVyR3JvdXBzW2ddO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3ByaW5ncy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgbmV3IFZSTVNwcmluZ0JvbmUoXHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaW5nLmNvbW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaW5nLnN0aWZmaW5lc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaW5nLmdyYXZpdHlQb3dlcixcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVlJNIOWPs+aJi+ezu1lfVVAsIC1aX0Zyb250IOOBi+OCiSBCYWJ5bG9uLmpzIOW3puaJi+ezu1lfVVAsICtaX0Zyb250IOOBq+OBmeOCi1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAtc3ByaW5nLmdyYXZpdHlEaXIueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaW5nLmdyYXZpdHlEaXIueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLXNwcmluZy5ncmF2aXR5RGlyLnpcclxuICAgICAgICAgICAgICAgICAgICApLm5vcm1hbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwcmluZy5kcmFnRm9yY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0Qm9uZShzcHJpbmcuY2VudGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBzcHJpbmcuaGl0UmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvb3RCb25lcyxcclxuICAgICAgICAgICAgICAgICAgICBzcHJpbmdDb2xsaWRlcnNcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3ByaW5ncztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNYXRyaXgsIFF1YXRlcm5pb24sIFZlY3RvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZSc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IENvbGxpZGVyR3JvdXAgfSBmcm9tICcuL2NvbGxpZGVyLWdyb3VwJztcclxuLy8gYmFzZWQgb25cclxuLy8gaHR0cDovL3JvY2tldGp1bXAuc2tyLmpwL3VuaXR5M2QvMTA5L1xyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9ibG9iL21hc3Rlci9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jc1xyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL2Jsb2IvYWFkNTUxZTA0MWZhZDU1M2MxOWQyMDkxZTVmNWVhZmYxZWI4ZmFhOC9wYWNrYWdlcy90aHJlZS12cm0vc3JjL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZS50c1xyXG5cclxuY29uc3QgSURFTlRJVFlfTUFUUklYID0gTWF0cml4LklkZW50aXR5KCk7XHJcblxyXG5jb25zdCBfdjNBID0gbmV3IFZlY3RvcjMoKTtcclxuY29uc3QgX3YzQiA9IG5ldyBWZWN0b3IzKCk7XHJcbmNvbnN0IF92M0MgPSBuZXcgVmVjdG9yMygpO1xyXG5jb25zdCBfcXVhdEEgPSBuZXcgUXVhdGVybmlvbigpO1xyXG5jb25zdCBfbWF0QSA9IG5ldyBNYXRyaXgoKTtcclxuY29uc3QgX21hdEIgPSBuZXcgTWF0cml4KCk7XHJcblxyXG4vKipcclxuICogVmVybGV0IFNwcmluZyBCb25lXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUxvZ2ljIHtcclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbCBsb2NhbCB0cmFuc2Zvcm0gTWFyaXhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbml0aWFsTG9jYWxNYXRyaXg6IE1hdHJpeDtcclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVkIGluaXRpYWwgbG9jYWwgcm90YXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbml0aWFsTG9jYWxSb3RhdGlvbjogUXVhdGVybmlvbjtcclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVkIGluaXRpYWwgbG9jYWwgY2hpbGQgcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uOiBWZWN0b3IzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGVuZ3RoIG9mIHRoZSBib25lIGluIHJlbGF0aXZlIHNwYWNlIHVuaXQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2VudGVyU3BhY2VCb25lTGVuZ3RoOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSBib25lIGluIHJlbGF0aXZlIHNwYWNlIHVuaXQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2VudGVyU3BhY2VQb3NpdGlvbjogVmVjdG9yMztcclxuICAgIC8qKlxyXG4gICAgICogUmVmZXJlbmNlIG9mIHBhcmVudCByb3RhdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJvbmVBeGlzOiBWZWN0b3IzO1xyXG5cclxuICAgIHByaXZhdGUgY3VycmVudFRhaWw6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygpO1xyXG4gICAgcHJpdmF0ZSBwcmV2VGFpbDogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKCk7XHJcbiAgICBwcml2YXRlIG5leHRUYWlsOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBjZW50ZXIgQ2VudGVyIHJlZmVyZW5jZSBvZiBUcmFuc2Zvcm1Ob2RlXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIENvbGxpc2lvbiBSYWRpdXNcclxuICAgICAqIEBwYXJhbSB0cmFuc2Zvcm0gQmFzZSBUcmFuc2Zvcm1Ob2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY2VudGVyOiBOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPiwgcHVibGljIHJlYWRvbmx5IHJhZGl1czogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgdHJhbnNmb3JtOiBUcmFuc2Zvcm1Ob2RlKSB7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSByb3RhdGlvblF1YXRlcm5pb24gd2hlbiBub3QgaW5pdGlhbGl6ZWRcclxuICAgICAgICBpZiAoIXRyYW5zZm9ybS5yb3RhdGlvblF1YXRlcm5pb24pIHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtLnJvdGF0aW9uUXVhdGVybmlvbiA9IHRyYW5zZm9ybS5yb3RhdGlvbi50b1F1YXRlcm5pb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdvcmxkTWF0cml4ID0gdHJhbnNmb3JtLmdldFdvcmxkTWF0cml4KCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uID0gd29ybGRNYXRyaXguZ2V0VHJhbnNsYXRpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0aWFsTG9jYWxNYXRyaXggPSB0cmFuc2Zvcm0uX2xvY2FsTWF0cml4LmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsTG9jYWxSb3RhdGlvbiA9IHRyYW5zZm9ybS5yb3RhdGlvblF1YXRlcm5pb24uY2xvbmUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0cmFuc2Zvcm0uZ2V0Q2hpbGRUcmFuc2Zvcm1Ob2Rlcyh0cnVlKTtcclxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbiA9IHRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpLm5vcm1hbGl6ZSgpLnNjYWxlSW5QbGFjZSgwLjA3KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24gPSBjaGlsZHJlblswXS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKHRoaXMuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbiwgd29ybGRNYXRyaXgsIHRoaXMuY3VycmVudFRhaWwpO1xyXG4gICAgICAgIHRoaXMucHJldlRhaWwuY29weUZyb20odGhpcy5jdXJyZW50VGFpbCk7XHJcbiAgICAgICAgdGhpcy5uZXh0VGFpbC5jb3B5RnJvbSh0aGlzLmN1cnJlbnRUYWlsKTtcclxuXHJcbiAgICAgICAgdGhpcy5ib25lQXhpcyA9IHRoaXMuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbi5ub3JtYWxpemVUb05ldygpO1xyXG4gICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24sIHdvcmxkTWF0cml4LCBfdjNBKTtcclxuICAgICAgICB0aGlzLmNlbnRlclNwYWNlQm9uZUxlbmd0aCA9IF92M0Euc3VidHJhY3RJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbikubGVuZ3RoKCk7XHJcblxyXG4gICAgICAgIGlmIChjZW50ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLmN1cnJlbnRUYWlsLCBfbWF0QSwgdGhpcy5jdXJyZW50VGFpbCk7XHJcbiAgICAgICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLnByZXZUYWlsLCBfbWF0QSwgdGhpcy5wcmV2VGFpbCk7XHJcbiAgICAgICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLm5leHRUYWlsLCBfbWF0QSwgdGhpcy5uZXh0VGFpbCk7XHJcblxyXG4gICAgICAgICAgICB3b3JsZE1hdHJpeC5tdWx0aXBseVRvUmVmKF9tYXRBLCBfbWF0QSk7XHJcblxyXG4gICAgICAgICAgICBfbWF0QS5nZXRUcmFuc2xhdGlvblRvUmVmKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzVG9SZWYodGhpcy5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLCBfbWF0QSwgX3YzQSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyU3BhY2VCb25lTGVuZ3RoID0gX3YzQS5zdWJ0cmFjdEluUGxhY2UodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKS5sZW5ndGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgVGFpbCBwb3NpdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzdGlmZm5lc3NGb3JjZSBDdXJyZW50IGZyYW1lIHN0aWZmbmVzc1xyXG4gICAgICogQHBhcmFtIGRyYWdGb3JjZSBDdXJyZW50IGZyYW1lIGRyYWcgZm9yY2VcclxuICAgICAqIEBwYXJhbSBleHRlcm5hbCBDdXJyZW50IGZyYW1lIGV4dGVybmFsIGZvcmNlXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkZXJHcm91cHMgQ3VycmVudCBmcmFtZSBjb2xsaWRlckdyb3Vwc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKHN0aWZmbmVzc0ZvcmNlOiBudW1iZXIsIGRyYWdGb3JjZTogbnVtYmVyLCBleHRlcm5hbDogVmVjdG9yMywgY29sbGlkZXJHcm91cHM6IENvbGxpZGVyR3JvdXBbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy50cmFuc2Zvcm0uZ2V0QWJzb2x1dGVQb3NpdGlvbigpLngpKSB7XHJcbiAgICAgICAgICAgIC8vIERvIG5vdCB1cGRhdGUgd2hlbiBhYnNvbHV0ZSBwb3NpdGlvbiBpcyBpbnZhbGlkXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldCBib25lIHBvc2l0aW9uIGluIGNlbnRlciBzcGFjZVxyXG4gICAgICAgIHRoaXMuZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0uZ2V0V29ybGRNYXRyaXgoKS5tdWx0aXBseVRvUmVmKF9tYXRBLCBfbWF0QSk7XHJcbiAgICAgICAgX21hdEEuZ2V0VHJhbnNsYXRpb25Ub1JlZih0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24pO1xyXG5cclxuICAgICAgICAvLyBHZXQgcGFyZW50IHBvc2l0aW9uIGluIGNlbnRlciBzcGFjZVxyXG4gICAgICAgIHRoaXMuZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0Qik7XHJcbiAgICAgICAgdGhpcy5nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLm11bHRpcGx5VG9SZWYoX21hdEIsIF9tYXRCKTtcclxuXHJcbiAgICAgICAgLy8gdmVybGV056mN5YiG44Gn5qyh44Gu5L2N572u44KS6KiI566XXHJcbiAgICAgICAgdGhpcy5uZXh0VGFpbC5jb3B5RnJvbSh0aGlzLmN1cnJlbnRUYWlsKTtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIOa4m+ihsOS7mOOBjeOBp+WJjeOBruODleODrOODvOODoOOBruenu+WLleOCkue2mee2mlxyXG4gICAgICAgICAgICBfdjNBLmNvcHlGcm9tKHRoaXMuY3VycmVudFRhaWwpXHJcbiAgICAgICAgICAgICAgICAuc3VidHJhY3RJblBsYWNlKHRoaXMucHJldlRhaWwpXHJcbiAgICAgICAgICAgICAgICAuc2NhbGVJblBsYWNlKDEuMCAtIGRyYWdGb3JjZSk7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dFRhaWwuYWRkSW5QbGFjZShfdjNBKTtcclxuICAgICAgICB9XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyDopqrjga7lm57ou6LjgavjgojjgovlrZDjg5zjg7zjg7Pjga7np7vli5Xnm67mqJlcclxuICAgICAgICAgICAgX3YzQS5jb3B5RnJvbSh0aGlzLmJvbmVBeGlzKTtcclxuICAgICAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKF92M0EsIHRoaXMuaW5pdGlhbExvY2FsTWF0cml4LCBfdjNBKTtcclxuICAgICAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKF92M0EsIF9tYXRCLCBfdjNBKTtcclxuICAgICAgICAgICAgX3YzQS5zdWJ0cmFjdEluUGxhY2UodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKS5zY2FsZUluUGxhY2Uoc3RpZmZuZXNzRm9yY2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRUYWlsLmFkZEluUGxhY2UoX3YzQSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8g5aSW5Yqb44Gr44KI44KL56e75YuV6YePXHJcbiAgICAgICAgICAgIHRoaXMubmV4dFRhaWwuYWRkSW5QbGFjZShleHRlcm5hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8g6ZW344GV44KSIGJvbmVMZW5ndGgg44Gr5by35Yi2XHJcbiAgICAgICAgICAgIHRoaXMubmV4dFRhaWwuc3VidHJhY3RJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCkuc2NhbGVJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VCb25lTGVuZ3RoKS5hZGRJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ29sbGlzaW9uIOOBp+enu+WLlVxyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGUoY29sbGlkZXJHcm91cHMsIHRoaXMubmV4dFRhaWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2VGFpbC5jb3B5RnJvbSh0aGlzLmN1cnJlbnRUYWlsKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUYWlsLmNvcHlGcm9tKHRoaXMubmV4dFRhaWwpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxMb2NhbE1hdHJpeC5tdWx0aXBseVRvUmVmKF9tYXRCLCBfbWF0QSk7XHJcbiAgICAgICAgY29uc3QgaW5pdGlhbENlbnRlclNwYWNlTWF0cml4SW52ID0gX21hdEEuaW52ZXJ0KCk7XHJcbiAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKHRoaXMubmV4dFRhaWwsIGluaXRpYWxDZW50ZXJTcGFjZU1hdHJpeEludiwgX3YzQSk7XHJcbiAgICAgICAgX3YzQS5ub3JtYWxpemVUb1JlZihfdjNCKTtcclxuICAgICAgICBRdWF0ZXJuaW9uLkZyb21Vbml0VmVjdG9yc1RvUmVmKHRoaXMuYm9uZUF4aXMsIF92M0IsIF9xdWF0QSk7XHJcbiAgICAgICAgY29uc3QgYXBwbHlSb3RhdGlvbiA9IF9xdWF0QTtcclxuICAgICAgICB0aGlzLmluaXRpYWxMb2NhbFJvdGF0aW9uLm11bHRpcGx5VG9SZWYoYXBwbHlSb3RhdGlvbiwgdGhpcy50cmFuc2Zvcm0ucm90YXRpb25RdWF0ZXJuaW9uISk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBXb3JsZE1hdHJpeFxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLmNvbXB1dGVXb3JsZE1hdHJpeCh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG1hdHJpeCB0aGF0IGNvbnZlcnRzIHdvcmxkIHNwYWNlIGludG8gY2VudGVyIHNwYWNlLlxyXG4gICAgICogQHBhcmFtIHJlc3VsdCBUYXJnZXQgbWF0cml4XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWF0cml4V29ybGRUb0NlbnRlcihyZXN1bHQ6IE1hdHJpeCk6IE1hdHJpeCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyLmdldFdvcmxkTWF0cml4KCkuaW52ZXJ0VG9SZWYocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQuY29weUZyb20oSURFTlRJVFlfTUFUUklYKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHdvcmxkIG1hdHJpeCBvZiBpdHMgcGFyZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQYXJlbnRNYXRyaXhXb3JsZCgpOiBNYXRyaXgge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wYXJlbnQgPyAodGhpcy50cmFuc2Zvcm0ucGFyZW50IGFzIFRyYW5zZm9ybU5vZGUpLmdldFdvcmxkTWF0cml4KCkgOiBJREVOVElUWV9NQVRSSVg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDooZ3nqoHliKTlrprjgpLooYzjgYZcclxuICAgICAqIEBwYXJhbSBjb2xsaWRlckdyb3Vwc1xyXG4gICAgICogQHBhcmFtIHRhaWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb2xsaWRlKGNvbGxpZGVyR3JvdXBzOiBDb2xsaWRlckdyb3VwW10sIHRhaWw6IFZlY3RvcjMpIHtcclxuICAgICAgICBjb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIuc3BoZXJlLmNvbXB1dGVXb3JsZE1hdHJpeCgpLm11bHRpcGx5VG9SZWYoX21hdEEsIF9tYXRBKTtcclxuICAgICAgICAgICAgICAgIF9tYXRBLmdldFRyYW5zbGF0aW9uVG9SZWYoX3YzQSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24gPSBfdjNBO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtYXhBYnNTY2FsZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5zcGhlcmUuYWJzb2x1dGVTY2FsaW5nLmFzQXJyYXkoKS5mb3JFYWNoKChzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4QWJzU2NhbGUgPSBNYXRoLm1heChtYXhBYnNTY2FsZSwgTWF0aC5hYnMocykpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xsaWRlclJhZGl1cyA9IGNvbGxpZGVyLnJhZGl1cyAqIG1heEFic1NjYWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgciA9IHRoaXMucmFkaXVzICsgY29sbGlkZXJSYWRpdXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFpbC5zdWJ0cmFjdFRvUmVmKGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbiwgX3YzQik7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3YzQi5sZW5ndGhTcXVhcmVkKCkgPD0gciAqIHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3JtYWwgPSBfdjNCLmNvcHlGcm9tKHRhaWwpLnN1YnRyYWN0SW5QbGFjZShjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc0Zyb21Db2xsaWRlciA9IF92M0MuY29weUZyb20oY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uKS5hZGRJblBsYWNlKG5vcm1hbC5zY2FsZUluUGxhY2UocikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0YWlsLmNvcHlGcm9tKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NGcm9tQ29sbGlkZXIuc3VidHJhY3RJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCkuc2NhbGVJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VCb25lTGVuZ3RoKS5hZGRJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsJztcclxuaW1wb3J0IHsgQ29sb3IzLCBWZWN0b3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgeyBNZXNoQnVpbGRlciB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvbWVzaEJ1aWxkZXInO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL3RyYW5zZm9ybU5vZGUnO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgeyBDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9jb2xsaWRlci1ncm91cCc7XHJcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMb2dpYyB9IGZyb20gJy4vdnJtLXNwcmluZy1ib25lLWxvZ2ljJztcclxuXHJcbi8qKlxyXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi9tYXN0ZXIvQXNzZXRzL1ZSTS9VbmlWUk0vU2NyaXB0cy9TcHJpbmdCb25lL1ZSTVNwcmluZ0JvbmUuY3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lIHtcclxuICAgIHB1YmxpYyB2ZXJsZXRzOiBWUk1TcHJpbmdCb25lTG9naWNbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBhY3RpdmVCb25lczogVHJhbnNmb3JtTm9kZVtdID0gW107XHJcblxyXG4gICAgLyoqIEBoaWRkZW4gKi9cclxuICAgIHByaXZhdGUgZHJhd0dpem1vID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uLzAuMFxyXG4gICAgICogQHBhcmFtIGNvbW1lbnQgQW5ub3RhdGlvbiBjb21tZW50XHJcbiAgICAgKiBAcGFyYW0gc3RpZmZuZXNzIFRoZSByZXNpbGllbmNlIG9mIHRoZSBzd2F5aW5nIG9iamVjdCAodGhlIHBvd2VyIG9mIHJldHVybmluZyB0byB0aGUgaW5pdGlhbCBwb3NlKS5cclxuICAgICAqIEBwYXJhbSBncmF2aXR5UG93ZXIgVGhlIHN0cmVuZ3RoIG9mIGdyYXZpdHkuXHJcbiAgICAgKiBAcGFyYW0gZ3Jhdml0eURpciBUaGUgZGlyZWN0aW9uIG9mIGdyYXZpdHkuIFNldCAoMCwgLTEsIDApIGZvciBzaW11bGF0aW5nIHRoZSBncmF2aXR5LiBTZXQgKDEsIDAsIDApIGZvciBzaW11bGF0aW5nIHRoZSB3aW5kLlxyXG4gICAgICogQHBhcmFtIGRyYWdGb3JjZSBUaGUgcmVzaXN0YW5jZSAoZGVjZWxlcmF0aW9uKSBvZiBhdXRvbWF0aWMgYW5pbWF0aW9uLlxyXG4gICAgICogQHBhcmFtIGNlbnRlciBUaGUgcmVmZXJlbmNlIHBvaW50IG9mIGEgc3dheWluZyBvYmplY3QgY2FuIGJlIHNldCBhdCBhbnkgbG9jYXRpb24gZXhjZXB0IHRoZSBvcmlnaW4uXHJcbiAgICAgKiAgICAgICAgICAgICAgIFdoZW4gaW1wbGVtZW50aW5nIFVJIG1vdmluZyB3aXRoIHdhcnAsXHJcbiAgICAgKiAgICAgICAgICAgICAgIHRoZSBwYXJlbnQgbm9kZSB0byBtb3ZlIHdpdGggd2FycCBjYW4gYmUgc3BlY2lmaWVkIGlmIHlvdSBkb24ndCB3YW50IHRvIG1ha2UgdGhlIG9iamVjdCBzd2F5aW5nIHdpdGggd2FycCBtb3ZlbWVudC5cclxuICAgICAqIEBwYXJhbSBoaXRSYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgc3BoZXJlIHVzZWQgZm9yIHRoZSBjb2xsaXNpb24gZGV0ZWN0aW9uIHdpdGggY29sbGlkZXJzLlxyXG4gICAgICogQHBhcmFtIGJvbmVzIFNwZWNpZnkgdGhlIG5vZGUgaW5kZXggb2YgdGhlIHJvb3QgYm9uZSBvZiB0aGUgc3dheWluZyBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkZXJHcm91cHMgU3BlY2lmeSB0aGUgaW5kZXggb2YgdGhlIGNvbGxpZGVyIGdyb3VwIGZvciBjb2xsaXNpb25zIHdpdGggc3dheWluZyBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc3RpZmZuZXNzOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGdyYXZpdHlQb3dlcjogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBncmF2aXR5RGlyOiBWZWN0b3IzLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBkcmFnRm9yY2U6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2VudGVyOiBOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPixcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGl0UmFkaXVzOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvbmVzOiBBcnJheTxOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPj4sXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyR3JvdXBzOiBDb2xsaWRlckdyb3VwW11cclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQm9uZXMgPSB0aGlzLmJvbmVzLmZpbHRlcigoYm9uZSkgPT4gYm9uZSAhPT0gbnVsbCkgYXMgVHJhbnNmb3JtTm9kZVtdO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQm9uZXMuZm9yRWFjaCgoYm9uZSkgPT4ge1xyXG4gICAgICAgICAgICBbYm9uZV0uY29uY2F0KGJvbmUuZ2V0Q2hpbGRUcmFuc2Zvcm1Ob2RlcygpKS5mb3JFYWNoKChiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcmxldHMucHVzaChuZXcgVlJNU3ByaW5nQm9uZUxvZ2ljKHRoaXMuY2VudGVyLCB0aGlzLmhpdFJhZGl1cywgYikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHJhd0dpem1vKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBHaXptbygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwR2l6bW8oKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVCb25lcy5mb3JFYWNoKChib25lKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjZW5lID0gYm9uZS5nZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICBbYm9uZV0uY29uY2F0KGJvbmUuZ2V0Q2hpbGRUcmFuc2Zvcm1Ob2RlcygpKS5mb3JFYWNoKChiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBib25lR2l6bW8gPSBNZXNoQnVpbGRlci5DcmVhdGVTcGhlcmUoXHJcbiAgICAgICAgICAgICAgICAgICAgYi5uYW1lICsgJ19ib25lR2l6bW8nLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudHM6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYW1ldGVyOiB0aGlzLmhpdFJhZGl1cyAqIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ID0gbmV3IFN0YW5kYXJkTWF0ZXJpYWwoYi5uYW1lICsgJ19ib25lR2l6bW9tYXQnLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICBtYXQuZW1pc3NpdmVDb2xvciA9IENvbG9yMy5SZWQoKTtcclxuICAgICAgICAgICAgICAgIG1hdC53aXJlZnJhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYm9uZUdpem1vLm1hdGVyaWFsID0gbWF0O1xyXG4gICAgICAgICAgICAgICAgYm9uZUdpem1vLnNldFBhcmVudChiKTtcclxuICAgICAgICAgICAgICAgIGJvbmVHaXptby5wb3NpdGlvbiA9IFZlY3RvcjMuWmVybygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzY2VuZSA9IGdyb3VwLnRyYW5zZm9ybS5nZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICBncm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaGVyZSA9IGNvbGxpZGVyLnNwaGVyZTtcclxuICAgICAgICAgICAgICAgIGlmICghc3BoZXJlLmlzRW5hYmxlZChmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGhlcmUuc2V0RW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXQgPSBuZXcgU3RhbmRhcmRNYXRlcmlhbChncm91cC50cmFuc2Zvcm0ubmFtZSArICdfY29sbGlkZXJHaXptb21hdCcsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXQuZW1pc3NpdmVDb2xvciA9IENvbG9yMy5ZZWxsb3coKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXQud2lyZWZyYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzcGhlcmUubWF0ZXJpYWwgPSBtYXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGJvbmVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRlbHRhVGltZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3Qgc3RpZmZuZXNzID0gdGhpcy5zdGlmZm5lc3MgKiBkZWx0YVRpbWU7XHJcbiAgICAgICAgY29uc3QgZXh0ZXJuYWwgPSB0aGlzLmdyYXZpdHlEaXIuc2NhbGUodGhpcy5ncmF2aXR5UG93ZXIgKiBkZWx0YVRpbWUpO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IHRoaXMudmVybGV0cy5tYXA8UHJvbWlzZTx2b2lkPj4oKHZlcmxldCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZlcmxldC51cGRhdGUoc3RpZmZuZXNzLCB0aGlzLmRyYWdGb3JjZSwgZXh0ZXJuYWwsIHRoaXMuY29sbGlkZXJHcm91cHMpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLyogRG8gTm90aGluZyAqL1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL21hdGVyaWFsJztcclxuaW1wb3J0IHR5cGUgeyBNZXNoIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy9tZXNoJztcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZMb2FkZXJFeHRlbnNpb24sIElNYXRlcmlhbCB9IGZyb20gJ0BiYWJ5bG9uanMvbG9hZGVycy9nbFRGLzIuMCc7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICdAYmFieWxvbmpzL2xvYWRlcnMvZ2xURi8yLjAnO1xyXG5pbXBvcnQgeyBWUk1NYXRlcmlhbEdlbmVyYXRvciB9IGZyb20gJy4vdnJtLW1hdGVyaWFsLWdlbmVyYXRvcic7XHJcblxyXG4vKipcclxuICogYGV4dGVuc2lvbnNgIOOBq+WFpeOCi+aLoeW8teOCreODvFxyXG4gKi9cclxuY29uc3QgTkFNRSA9ICdWQ0FTVF92Y2lfbWF0ZXJpYWxfdW5pdHknO1xyXG5cclxuLyoqXHJcbiAqIFZDQVNUX3ZjaV9tYXRlcmlhbF91bml0eSDmi6HlvLXjgpLlh6bnkIbjgZnjgotcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWQ0FTVF92Y2lfbWF0ZXJpYWxfdW5pdHkgaW1wbGVtZW50cyBJR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9hZGVyOiBHTFRGTG9hZGVyKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgKHRoaXMubG9hZGVyIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9sb2FkTWF0ZXJpYWxBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIG1lc2g6IE1lc2gsIGJhYnlsb25EcmF3TW9kZTogbnVtYmVyLCBhc3NpZ246IChiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKSA9PiB2b2lkKTogTnVsbGFibGU8UHJvbWlzZTxNYXRlcmlhbD4+IHtcclxuICAgICAgICAvLyDjgrjjgqfjg43jg6zjg7zjgr/jgafjg57jg4bjg6rjgqLjg6vjgpLnlJ/miJDjgZnjgotcclxuICAgICAgICByZXR1cm4gbmV3IFZSTU1hdGVyaWFsR2VuZXJhdG9yKHRoaXMubG9hZGVyKS5nZW5lcmF0ZShjb250ZXh0LCBtYXRlcmlhbCwgbWVzaCwgYmFieWxvbkRyYXdNb2RlLCBhc3NpZ24pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDjg63jg7zjg4Djg7zjgavnmbvpjLLjgZnjgotcclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgVkNBU1RfdmNpX21hdGVyaWFsX3VuaXR5KGxvYWRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9tYXRlcmlhbCc7XHJcbmltcG9ydCB0eXBlIHsgTWVzaCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvbWVzaCc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uLCBJTWF0ZXJpYWwsIElNZXNoUHJpbWl0aXZlIH0gZnJvbSAnQGJhYnlsb25qcy9sb2FkZXJzL2dsVEYvMi4wJztcclxuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gJ0BiYWJ5bG9uanMvbG9hZGVycy9nbFRGLzIuMCc7XHJcbmltcG9ydCB7IFZSTU1hbmFnZXIgfSBmcm9tICcuL3ZybS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgVlJNTWF0ZXJpYWxHZW5lcmF0b3IgfSBmcm9tICcuL3ZybS1tYXRlcmlhbC1nZW5lcmF0b3InO1xyXG5cclxuLyoqXHJcbiAqIGBleHRlbnNpb25zYCDjgavlhaXjgovmi6HlvLXjgq3jg7xcclxuICovXHJcbmNvbnN0IE5BTUUgPSAnVlJNJztcclxuXHJcbi8qKlxyXG4gKiBWUk0g5ouh5by144KS5Yem55CG44GZ44KLXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi8wLjApXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVlJNIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICog44GT44GuIE1lc2ggaW5kZXgg5Lul6ZmN44GM6Kqt44G/6L6844G/5a++6LGhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWVzaGVzRnJvbSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOOBk+OBriBUcmFuc2Zvcm1Ob2RlIGluZGV4IOS7pemZjeOBjOiqreOBv+i+vOOBv+WvvuixoVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyYW5zZm9ybU5vZGVzRnJvbSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOOBk+OBriBNYXRlcmlhbCBpbmRleCDku6XpmY3jgYzoqq3jgb/ovrzjgb/lr77osaFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtYXRlcmlhbHNGcm9tID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIC8vIEdMVEZMb2FkZXIgaGFzIGFscmVhZHkgYWRkZWQgcm9vdE1lc2ggYXMgX19yb290X18gYmVmb3JlIGxvYWQgZXh0ZW5zaW9uXHJcbiAgICAgICAgLy8gQHNlZSBnbFRGTG9hZGVyLl9sb2FkRGF0YVxyXG4gICAgICAgIHRoaXMubWVzaGVzRnJvbSA9IHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZS5tZXNoZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybU5vZGVzRnJvbSA9IHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZS50cmFuc2Zvcm1Ob2Rlcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNGcm9tID0gdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lLm1hdGVyaWFscy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICAodGhpcy5sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25SZWFkeSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucyB8fCAhdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zW05BTUVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2NlbmUgPSB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmU7XHJcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1NYW5hZ2VyKHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9uc1tOQU1FXSwgdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lLCB0aGlzLm1lc2hlc0Zyb20sIHRoaXMudHJhbnNmb3JtTm9kZXNGcm9tLCB0aGlzLm1hdGVyaWFsc0Zyb20pO1xyXG4gICAgICAgIHNjZW5lLm1ldGFkYXRhID0gc2NlbmUubWV0YWRhdGEgfHwge307XHJcbiAgICAgICAgc2NlbmUubWV0YWRhdGEudnJtTWFuYWdlcnMgPSBzY2VuZS5tZXRhZGF0YS52cm1NYW5hZ2VycyB8fCBbXTtcclxuICAgICAgICBzY2VuZS5tZXRhZGF0YS52cm1NYW5hZ2Vycy5wdXNoKG1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZS5vbkRpc3Bvc2VPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFNjZW5lIGRpc3Bvc2Ug5pmC44GrIE1hbmFnZXIg44KC56C05qOE44GZ44KLXHJcbiAgICAgICAgICAgIG1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmUubWV0YWRhdGEudnJtTWFuYWdlcnMgPSBbXTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfbG9hZFZlcnRleERhdGFBc3luYyhjb250ZXh0OiBzdHJpbmcsIHByaW1pdGl2ZTogSU1lc2hQcmltaXRpdmUsIGJhYnlsb25NZXNoOiBNZXNoKSB7XHJcbiAgICAgICAgaWYgKCFwcmltaXRpdmUuZXh0cmFzIHx8ICFwcmltaXRpdmUuZXh0cmFzLnRhcmdldE5hbWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDjgb7jgaAgTW9ycGhUYXJnZXQg44GM55Sf5oiQ44GV44KM44Gm44GE44Gq44GE44Gu44Gn44CB44Oh44K/5oOF5aCx44Gr44Oi44O844OV44K/44O844Ky44OD44OI5oOF5aCx44KS5YWl44KM44Gm44GK44GPXHJcbiAgICAgICAgYmFieWxvbk1lc2gubWV0YWRhdGEgPSBiYWJ5bG9uTWVzaC5tZXRhZGF0YSB8fCB7fTtcclxuICAgICAgICBiYWJ5bG9uTWVzaC5tZXRhZGF0YS52cm1UYXJnZXROYW1lcyA9IHByaW1pdGl2ZS5leHRyYXMudGFyZ2V0TmFtZXM7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRNYXRlcmlhbEFzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgbWVzaDogTWVzaCwgYmFieWxvbkRyYXdNb2RlOiBudW1iZXIsIGFzc2lnbjogKGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpID0+IHZvaWQpOiBOdWxsYWJsZTxQcm9taXNlPE1hdGVyaWFsPj4ge1xyXG4gICAgICAgIC8vIOOCuOOCp+ODjeODrOODvOOCv+OBp+ODnuODhuODquOCouODq+OCkueUn+aIkOOBmeOCi1xyXG4gICAgICAgIHJldHVybiBuZXcgVlJNTWF0ZXJpYWxHZW5lcmF0b3IodGhpcy5sb2FkZXIpLmdlbmVyYXRlKGNvbnRleHQsIG1hdGVyaWFsLCBtZXNoLCBiYWJ5bG9uRHJhd01vZGUsIGFzc2lnbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIOODreODvOODgOODvOOBq+eZu+mMsuOBmeOCi1xyXG5HTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChsb2FkZXIpID0+IG5ldyBWUk0obG9hZGVyKSk7XHJcbiIsImltcG9ydCB7IFNjZW5lTG9hZGVyIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXInO1xyXG5pbXBvcnQgeyBHTFRGRmlsZUxvYWRlciB9IGZyb20gJ0BiYWJ5bG9uanMvbG9hZGVycy9nbFRGL2dsVEZGaWxlTG9hZGVyJztcclxuXHJcbi8qKlxyXG4gKiBWUk0vVkNJIOODleOCoeOCpOODq+OCkuiqreOBv+i+vOOCgeOCi+OCiOOBhuOBq+OBmeOCi1xyXG4gKiDmi6HlvLXlrZDjgpLlpInmm7TjgZfjgZ/jgaDjgZFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWUk1GaWxlTG9hZGVyIGV4dGVuZHMgR0xURkZpbGVMb2FkZXIge1xyXG4gICAgcHVibGljIG5hbWUgPSAndnJtJztcclxuICAgIHB1YmxpYyBleHRlbnNpb25zID0ge1xyXG4gICAgICAgICcudnJtJzogeyBpc0JpbmFyeTogdHJ1ZSB9LFxyXG4gICAgICAgICcudmNpJzogeyBpc0JpbmFyeTogdHJ1ZSB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlUGx1Z2luKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVlJNRmlsZUxvYWRlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5pZiAoU2NlbmVMb2FkZXIpIHtcclxuICAgIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKG5ldyBWUk1GaWxlTG9hZGVyKCkpO1xyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgSVZSTVZlY3RvcjMge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgejogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0ZW5zaW9ucy5WUk1cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTSB7XHJcbiAgICBleHBvcnRlclZlcnNpb246IHN0cmluZztcclxuICAgIHNwZWNWZXJzaW9uOiBzdHJpbmc7XHJcbiAgICBtZXRhOiBJVlJNTWV0YTtcclxuICAgIGh1bWFub2lkOiBJVlJNSHVtYW5vaWQ7XHJcbiAgICBmaXJzdFBlcnNvbjogSVZSTUZpcnN0UGVyc29uO1xyXG4gICAgYmxlbmRTaGFwZU1hc3RlcjogSVZSTUJsZW5kU2hhcGVNYXN0ZXI7XHJcbiAgICBzZWNvbmRhcnlBbmltYXRpb246IElWUk1TZWNvbmRhcnlBbmltYXRpb247XHJcbiAgICBtYXRlcmlhbFByb3BlcnRpZXM6IElWUk1NYXRlcmlhbFByb3BlcnR5W107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRlbnNpb25zLlZSTS5tZXRhXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1NZXRhIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XHJcbiAgICBhdXRob3I6IHN0cmluZztcclxuICAgIGNvbnRhY3RJbmZvcm1hdGlvbj86IHN0cmluZztcclxuICAgIHJlZmVyZW5jZT86IHN0cmluZztcclxuICAgIHRleHR1cmU/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRlbnNpb25zLlZSTS5odW1hbm9pZFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNSHVtYW5vaWQge1xyXG4gICAgaHVtYW5Cb25lczogSVZSTUh1bWFub2lkQm9uZVtdO1xyXG4gICAgYXJtU3RyZXRjaD86IG51bWJlcjtcclxuICAgIGxlZ1N0cmV0Y2g/OiBudW1iZXI7XHJcbiAgICB1cHBlckFybVR3aXN0PzogbnVtYmVyO1xyXG4gICAgbG93ZXJBcm1Ud2lzdD86IG51bWJlcjtcclxuICAgIHVwcGVyTGVnVHdpc3Q/OiBudW1iZXI7XHJcbiAgICBsb3dlckxlZ1R3aXN0PzogbnVtYmVyO1xyXG4gICAgZmVldFNwYWNpbmc/OiBudW1iZXI7XHJcbiAgICBoYXNUcmFuc2xhdGlvbkRvRj86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUh1bWFub2lkQm9uZSB7XHJcbiAgICBib25lOiBzdHJpbmc7XHJcbiAgICBub2RlOiBudW1iZXI7XHJcbiAgICB1c2VEZWZhdWx0VmFsdWVzOiBib29sZWFuO1xyXG4gICAgbWluPzogSVZSTVZlY3RvcjM7XHJcbiAgICBtYXg/OiBJVlJNVmVjdG9yMztcclxuICAgIGNlbnRlcj86IElWUk1WZWN0b3IzO1xyXG4gICAgYXhpc0xlbmd0aD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB7XHJcbiAgICBtZXNoOiBudW1iZXI7XHJcbiAgICBmaXJzdFBlcnNvbkZsYWc6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNRmlyc3RQZXJzb25EZWdyZWVNYXAge1xyXG4gICAgY3VydmU6IG51bWJlcltdO1xyXG4gICAgeFJhbmdlOiBudW1iZXI7XHJcbiAgICB5UmFuZ2U6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dGVuc2lvbnMuVlJNLmZpcnN0UGVyc29uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1GaXJzdFBlcnNvbiB7XHJcbiAgICBmaXJzdFBlcnNvbkJvbmU6IG51bWJlcjtcclxuICAgIGZpcnN0UGVyc29uQm9uZU9mZnNldDogSVZSTVZlY3RvcjM7XHJcbiAgICBtZXNoQW5ub3RhdGlvbnM6IElWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW107XHJcbiAgICBsb29rQXRUeXBlTmFtZTogJ0JvbmUnIHwgJ0JsZW5kU2hhcGUnO1xyXG4gICAgbG9va0F0SG9yaXpvbnRhbElubmVyOiBJVlJNRmlyc3RQZXJzb25EZWdyZWVNYXA7XHJcbiAgICBsb29rQXRIb3Jpem9udGFsT3V0ZXI6IElWUk1GaXJzdFBlcnNvbkRlZ3JlZU1hcDtcclxuICAgIGxvb2tBdFZlcnRpY2FsRG93bjogSVZSTUZpcnN0UGVyc29uRGVncmVlTWFwO1xyXG4gICAgbG9va0F0VmVydGljYWxVcDogSVZSTUZpcnN0UGVyc29uRGVncmVlTWFwO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0ZW5zaW9ucy5WUk0uYmxlbmRTaGFwZU1hc3RlclxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNQmxlbmRTaGFwZU1hc3RlciB7XHJcbiAgICBibGVuZFNoYXBlR3JvdXBzOiBJVlJNQmxlbmRTaGFwZUdyb3VwW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUJsZW5kU2hhcGVHcm91cCB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBwcmVzZXROYW1lOiBzdHJpbmc7XHJcbiAgICBiaW5kczogSVZSTUJsZW5kU2hhcGVCaW5kW107XHJcbiAgICBtYXRlcmlhbFZhbHVlczogSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmRbXTtcclxuICAgIGlzQmluYXJ5OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1CbGVuZFNoYXBlQmluZCB7XHJcbiAgICBtZXNoOiBudW1iZXI7XHJcbiAgICBpbmRleDogbnVtYmVyO1xyXG4gICAgd2VpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmQge1xyXG4gICAgbWF0ZXJpYWxOYW1lOiBzdHJpbmc7XHJcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcclxuICAgIHRhcmdldFZhbHVlOiBudW1iZXJbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uU3ByaW5nIHtcclxuICAgIGNvbW1lbnQ6IHN0cmluZztcclxuICAgIHN0aWZmaW5lc3M6IG51bWJlcjtcclxuICAgIGdyYXZpdHlQb3dlcjogbnVtYmVyO1xyXG4gICAgZ3Jhdml0eURpcjogSVZSTVZlY3RvcjM7XHJcbiAgICBkcmFnRm9yY2U6IG51bWJlcjtcclxuICAgIGNlbnRlcjogbnVtYmVyO1xyXG4gICAgaGl0UmFkaXVzOiBudW1iZXI7XHJcbiAgICBib25lczogbnVtYmVyW107XHJcbiAgICBjb2xsaWRlckdyb3VwczogbnVtYmVyW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTVNlY29uZGFyeUFuaW1hdGlvbkNvbGxpZGVyIHtcclxuICAgIG9mZnNldDogSVZSTVZlY3RvcjM7XHJcbiAgICByYWRpdXM6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXJHcm91cCB7XHJcbiAgICBub2RlOiBudW1iZXI7XHJcbiAgICBjb2xsaWRlcnM6IElWUk1TZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlcltdO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0ZW5zaW9ucy5WUk0uc2Vjb25kYXJ5QW5pbWF0aW9uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1TZWNvbmRhcnlBbmltYXRpb24ge1xyXG4gICAgYm9uZUdyb3VwczogSVZSTVNlY29uZGFyeUFuaW1hdGlvblNwcmluZ1tdO1xyXG4gICAgY29sbGlkZXJHcm91cHM6IElWUk1TZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlckdyb3VwW107XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIElWUk1NYXRlcmlhbFByb3BlcnR5U2hhZGVyIHtcclxuICAgIFZSTV9VU0VfR0xURlNIQURFUiA9ICdWUk1fVVNFX0dMVEZTSEFERVInLFxyXG4gICAgVlJNTVRvb24gPSAnVlJNL01Ub29uJyxcclxuICAgIFZSTVVubGl0VHJhbnNwYXJlbnRaV3JpdGUgPSAnVlJNL1VubGl0VHJhbnNwYXJlbnRaV3JpdGUnLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1NYXRlcmlhbFByb3BlcnR5RmxvYXRQcm9wZXJ0aWVzIHtcclxuICAgIF9DdXRvZmY/OiBudW1iZXI7XHJcbiAgICBfQnVtcFNjYWxlPzogbnVtYmVyO1xyXG4gICAgX1JlY2VpdmVTaGFkb3dSYXRlPzogbnVtYmVyO1xyXG4gICAgX1NoYWRpbmdHcmFkZVJhdGU/OiBudW1iZXI7XHJcbiAgICBfU2hhZGVTaGlmdD86IG51bWJlcjtcclxuICAgIF9TaGFkZVRvb255PzogbnVtYmVyO1xyXG4gICAgX0xpZ2h0Q29sb3JBdHRlbnVhdGlvbj86IG51bWJlcjtcclxuICAgIF9JbmRpcmVjdExpZ2h0SW50ZW5zaXR5PzogbnVtYmVyO1xyXG4gICAgX1JpbUxpZ2h0aW5nTWl4PzogbnVtYmVyO1xyXG4gICAgX1JpbUZyZXNuZWxQb3dlcj86IG51bWJlcjtcclxuICAgIF9SaW1MaWZ0PzogbnVtYmVyO1xyXG4gICAgX091dGxpbmVXaWR0aD86IG51bWJlcjtcclxuICAgIF9PdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U/OiBudW1iZXI7XHJcbiAgICBfT3V0bGluZUxpZ2h0aW5nTWl4PzogbnVtYmVyO1xyXG4gICAgX1V2QW5pbVNjcm9sbFg/OiBudW1iZXI7XHJcbiAgICBfVXZBbmltU2Nyb2xsWT86IG51bWJlcjtcclxuICAgIF9VdkFuaW1Sb3RhdGlvbj86IG51bWJlcjtcclxuICAgIF9EZWJ1Z01vZGU/OiBudW1iZXI7XHJcbiAgICBfQmxlbmRNb2RlPzogbnVtYmVyO1xyXG4gICAgX091dGxpbmVXaWR0aE1vZGU/OiBudW1iZXI7XHJcbiAgICBfT3V0bGluZUNvbG9yTW9kZT86IG51bWJlcjtcclxuICAgIF9DdWxsTW9kZT86IG51bWJlcjtcclxuICAgIF9PdXRsaW5lQ3VsbE1vZGU/OiBudW1iZXI7XHJcbiAgICBfU3JjQmxlbmQ/OiBudW1iZXI7XHJcbiAgICBfRHN0QmxlbmQ/OiBudW1iZXI7XHJcbiAgICBfWldyaXRlPzogbnVtYmVyO1xyXG4gICAgW3Byb3A6IHN0cmluZ106IG51bWJlciB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHkgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTU1hdGVyaWFsUHJvcGVydHlWZWN0b3JQcm9wZXJ0aWVzIHtcclxuICAgIF9Db2xvcj86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1NoYWRlQ29sb3I/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9NYWluVGV4PzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfU2hhZGVUZXh0dXJlPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfQnVtcE1hcD86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1JlY2VpdmVTaGFkb3dUZXh0dXJlPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfU2hhZGluZ0dyYWRlVGV4dHVyZT86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1JpbUNvbG9yPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfUmltVGV4dHVyZT86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1NwaGVyZUFkZD86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX0VtaXNzaW9uQ29sb3I/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9FbWlzc2lvbk1hcD86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX091dGxpbmVXaWR0aFRleHR1cmU/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9PdXRsaW5lQ29sb3I/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9VdkFuaW1NYXNrVGV4dHVyZT86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgW3Byb3A6IHN0cmluZ106IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5IHwgdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1NYXRlcmlhbFByb3BlcnR5VGV4dHVyZVByb3BlcnRpZXMge1xyXG4gICAgX01haW5UZXg/OiBudW1iZXI7XHJcbiAgICBfU2hhZGVUZXh0dXJlPzogbnVtYmVyO1xyXG4gICAgX0J1bXBNYXA/OiBudW1iZXI7XHJcbiAgICBfUmVjZWl2ZVNoYWRvd1RleHR1cmU/OiBudW1iZXI7XHJcbiAgICBfU2hhZGluZ0dyYWRlVGV4dHVyZT86IG51bWJlcjtcclxuICAgIF9SaW1UZXh0dXJlPzogbnVtYmVyO1xyXG4gICAgX1NwaGVyZUFkZD86IG51bWJlcjtcclxuICAgIF9FbWlzc2lvbk1hcD86IG51bWJlcjtcclxuICAgIF9PdXRsaW5lV2lkdGhUZXh0dXJlPzogbnVtYmVyO1xyXG4gICAgX1V2QW5pbU1hc2tUZXh0dXJlPzogbnVtYmVyO1xyXG4gICAgW3Byb3A6IHN0cmluZ106IG51bWJlciB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eUtleXdvcmRNYXAge1xyXG4gICAgX05PUk1BTE1BUD86IGJvb2xlYW47XHJcbiAgICBfQUxQSEFURVNUX09OPzogYm9vbGVhbjtcclxuICAgIF9BTFBIQUJMRU5EX09OPzogYm9vbGVhbjtcclxuICAgIF9BTFBIQVBSRU1VTFRJUExZX09OPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVRhZ01hcCB7XHJcbiAgICBSZW5kZXJUeXBlPzogJ09wYXF1ZScgfCAnVHJhbnNwYXJlbnRDdXRvdXQnIHwgJ1RyYW5zcGFyZW50JztcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dGVuc2lvbnMuVlJNLm1hdGVyaWFsUHJvcGVydGllc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBzaGFkZXI6IElWUk1NYXRlcmlhbFByb3BlcnR5U2hhZGVyO1xyXG4gICAgcmVuZGVyUXVldWU6IG51bWJlcjtcclxuICAgIGZsb2F0UHJvcGVydGllczogSVZSTU1hdGVyaWFsUHJvcGVydHlGbG9hdFByb3BlcnRpZXM7XHJcbiAgICB2ZWN0b3JQcm9wZXJ0aWVzOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVZlY3RvclByb3BlcnRpZXM7XHJcbiAgICB0ZXh0dXJlUHJvcGVydGllczogSVZSTU1hdGVyaWFsUHJvcGVydHlUZXh0dXJlUHJvcGVydGllcztcclxuICAgIGtleXdvcmRNYXA6IElWUk1NYXRlcmlhbFByb3BlcnR5S2V5d29yZE1hcDtcclxuICAgIHRhZ01hcDogSVZSTU1hdGVyaWFsUHJvcGVydHlUYWdNYXA7XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoJztcclxuaW1wb3J0IHR5cGUgeyBNZXNoIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy9tZXNoJztcclxuaW1wb3J0IHR5cGUgeyBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlJztcclxuaW1wb3J0IHR5cGUgeyBNb3JwaFRhcmdldCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9Nb3JwaC9tb3JwaFRhcmdldCc7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvc2NlbmUnO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgU3ByaW5nQm9uZUNvbnRyb2xsZXIgfSBmcm9tICcuL3NlY29uZGFyeS1hbmltYXRpb24vc3ByaW5nLWJvbmUtY29udHJvbGxlcic7XHJcbmltcG9ydCB7IEh1bWFub2lkQm9uZSB9IGZyb20gJy4vaHVtYW5vaWQtYm9uZSc7XHJcbmltcG9ydCB0eXBlIHsgSVZSTSB9IGZyb20gJy4vdnJtLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlciB9IGZyb20gJy4vbWF0ZXJpYWwtdmFsdWUtYmluZGluZy1tZXJnZXInO1xyXG5cclxuaW50ZXJmYWNlIElzQmluYXJ5TWFwIHtcclxuICAgIFttb3JwaE5hbWU6IHN0cmluZ106IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBNb3JwaFRhcmdldFNldHRpbmcge1xyXG4gICAgdGFyZ2V0OiBNb3JwaFRhcmdldDtcclxuICAgIHdlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTW9ycGhUYXJnZXRNYXAge1xyXG4gICAgW21vcnBoTmFtZTogc3RyaW5nXTogTW9ycGhUYXJnZXRTZXR0aW5nW107XHJcbn1cclxuXHJcbmludGVyZmFjZSBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlck1hcCB7XHJcbiAgICBbbW9ycGhOYW1lOiBzdHJpbmddOiBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFRyYW5zZm9ybU5vZGVNYXAge1xyXG4gICAgW2h1bWFuQm9uZU5hbWU6IHN0cmluZ106IFRyYW5zZm9ybU5vZGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBUcmFuc2Zvcm1Ob2RlQ2FjaGUge1xyXG4gICAgW25vZGVJbmRleDogbnVtYmVyXTogVHJhbnNmb3JtTm9kZTtcclxufVxyXG5cclxuaW50ZXJmYWNlIE1lc2hDYWNoZSB7XHJcbiAgICBbbWVzaEluZGV4OiBudW1iZXJdOiBNZXNoW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVbml0eSBIdW1hbm9pZCBCb25lIOWQjVxyXG4gKi9cclxuZXhwb3J0IHR5cGUgSHVtYW5Cb25lTmFtZSA9XHJcbiAgICB8ICdoaXBzJ1xyXG4gICAgfCAnbGVmdFVwcGVyTGVnJ1xyXG4gICAgfCAncmlnaHRVcHBlckxlZydcclxuICAgIHwgJ2xlZnRMb3dlckxlZydcclxuICAgIHwgJ3JpZ2h0TG93ZXJMZWcnXHJcbiAgICB8ICdsZWZ0Rm9vdCdcclxuICAgIHwgJ3JpZ2h0Rm9vdCdcclxuICAgIHwgJ3NwaW5lJ1xyXG4gICAgfCAnY2hlc3QnXHJcbiAgICB8ICduZWNrJ1xyXG4gICAgfCAnaGVhZCdcclxuICAgIHwgJ2xlZnRTaG91bGRlcidcclxuICAgIHwgJ3JpZ2h0U2hvdWxkZXInXHJcbiAgICB8ICdsZWZ0VXBwZXJBcm0nXHJcbiAgICB8ICdyaWdodFVwcGVyQXJtJ1xyXG4gICAgfCAnbGVmdExvd2VyQXJtJ1xyXG4gICAgfCAncmlnaHRMb3dlckFybSdcclxuICAgIHwgJ2xlZnRIYW5kJ1xyXG4gICAgfCAncmlnaHRIYW5kJ1xyXG4gICAgfCAnbGVmdFRvZXMnXHJcbiAgICB8ICdyaWdodFRvZXMnXHJcbiAgICB8ICdsZWZ0RXllJ1xyXG4gICAgfCAncmlnaHRFeWUnXHJcbiAgICB8ICdqYXcnXHJcbiAgICB8ICdsZWZ0VGh1bWJQcm94aW1hbCdcclxuICAgIHwgJ2xlZnRUaHVtYkludGVybWVkaWF0ZSdcclxuICAgIHwgJ2xlZnRUaHVtYkRpc3RhbCdcclxuICAgIHwgJ2xlZnRJbmRleFByb3hpbWFsJ1xyXG4gICAgfCAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAnbGVmdEluZGV4RGlzdGFsJ1xyXG4gICAgfCAnbGVmdE1pZGRsZVByb3hpbWFsJ1xyXG4gICAgfCAnbGVmdE1pZGRsZUludGVybWVkaWF0ZSdcclxuICAgIHwgJ2xlZnRNaWRkbGVEaXN0YWwnXHJcbiAgICB8ICdsZWZ0UmluZ1Byb3hpbWFsJ1xyXG4gICAgfCAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdsZWZ0UmluZ0Rpc3RhbCdcclxuICAgIHwgJ2xlZnRMaXR0bGVQcm94aW1hbCdcclxuICAgIHwgJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdsZWZ0TGl0dGxlRGlzdGFsJ1xyXG4gICAgfCAncmlnaHRUaHVtYlByb3hpbWFsJ1xyXG4gICAgfCAncmlnaHRUaHVtYkludGVybWVkaWF0ZSdcclxuICAgIHwgJ3JpZ2h0VGh1bWJEaXN0YWwnXHJcbiAgICB8ICdyaWdodEluZGV4UHJveGltYWwnXHJcbiAgICB8ICdyaWdodEluZGV4SW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAncmlnaHRJbmRleERpc3RhbCdcclxuICAgIHwgJ3JpZ2h0TWlkZGxlUHJveGltYWwnXHJcbiAgICB8ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZSdcclxuICAgIHwgJ3JpZ2h0TWlkZGxlRGlzdGFsJ1xyXG4gICAgfCAncmlnaHRSaW5nUHJveGltYWwnXHJcbiAgICB8ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdyaWdodFJpbmdEaXN0YWwnXHJcbiAgICB8ICdyaWdodExpdHRsZVByb3hpbWFsJ1xyXG4gICAgfCAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdyaWdodExpdHRsZURpc3RhbCdcclxuICAgIHwgJ3VwcGVyQ2hlc3QnXHJcbiAgICB8IHN0cmluZztcclxuXHJcbi8qKlxyXG4gKiBWUk0g44Kt44Oj44Op44Kv44K/44O844KS5YuV5L2c44GV44Gb44KL44Gf44KB44Gu44Oe44ON44O844K444OjXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVlJNTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGlzQmluYXJ5TW9ycGhNYXA6IElzQmluYXJ5TWFwID0ge307XHJcbiAgICBwcml2YXRlIG1vcnBoVGFyZ2V0TWFwOiBNb3JwaFRhcmdldE1hcCA9IHt9O1xyXG4gICAgcHJpdmF0ZSBtYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlck1hcDogTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXAgPSB7fTtcclxuICAgIHByaXZhdGUgcHJlc2V0TW9ycGhUYXJnZXRNYXA6IE1vcnBoVGFyZ2V0TWFwID0ge307XHJcbiAgICBwcml2YXRlIHRyYW5zZm9ybU5vZGVNYXA6IFRyYW5zZm9ybU5vZGVNYXAgPSB7fTtcclxuICAgIHByaXZhdGUgdHJhbnNmb3JtTm9kZUNhY2hlOiBUcmFuc2Zvcm1Ob2RlQ2FjaGUgPSB7fTtcclxuICAgIHByaXZhdGUgbWVzaENhY2hlOiBNZXNoQ2FjaGUgPSB7fTtcclxuICAgIHByaXZhdGUgX2h1bWFub2lkQm9uZTogSHVtYW5vaWRCb25lO1xyXG4gICAgcHJpdmF0ZSBfcm9vdE1lc2g6IE1lc2g7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWNvbmRhcnkgQW5pbWF0aW9uIOOBqOOBl+OBpuWumue+qeOBleOCjOOBpuOBhOOCiyBWUk0gU3ByaW5nIEJvbmUg44Gu44Kz44Oz44OI44Ot44O844OpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lQ29udHJvbGxlcjogU3ByaW5nQm9uZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV4dCBnbFRGLmV4dGVuc2lvbnMuVlJNIOOBruS4rei6qyBqc29uXHJcbiAgICAgKiBAcGFyYW0gc2NlbmVcclxuICAgICAqIEBwYXJhbSBtZXNoZXNGcm9tIOOBk+OBrueVquWPt+S7pemZjeOBruODoeODg+OCt+ODpeOBjOOBk+OBriBWUk0g44Gr6Kmy5b2T44GZ44KLXHJcbiAgICAgKiBAcGFyYW0gdHJhbnNmb3JtTm9kZXNGcm9tIOOBk+OBrueVquWPt+S7pemZjeOBriBUcmFuc2Zvcm1Ob2RlIOOBjOOBk+OBriBWUk0g44Gr6Kmy5b2T44GZ44KLXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWxzTm9kZXNGcm9tIOOBk+OBrueVquWPt+S7pemZjeOBriBNYXRlcmlhbCDjgYzjgZPjga4gVlJNIOOBq+ipsuW9k+OBmeOCi1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGV4dDogSVZSTSxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzaGVzRnJvbTogbnVtYmVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdHJhbnNmb3JtTm9kZXNGcm9tOiBudW1iZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBtYXRlcmlhbHNOb2Rlc0Zyb206IG51bWJlclxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5tZXNoQ2FjaGUgPSB0aGlzLmNvbnN0cnVjdE1lc2hDYWNoZSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtTm9kZUNhY2hlID0gdGhpcy5jb25zdHJ1Y3RUcmFuc2Zvcm1Ob2RlQ2FjaGUoKTtcclxuICAgICAgICB0aGlzLnNwcmluZ0JvbmVDb250cm9sbGVyID0gbmV3IFNwcmluZ0JvbmVDb250cm9sbGVyKHRoaXMuZXh0LnNlY29uZGFyeUFuaW1hdGlvbiwgdGhpcy5maW5kVHJhbnNmb3JtTm9kZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZXh0LmJsZW5kU2hhcGVNYXN0ZXIgJiYgdGhpcy5leHQuYmxlbmRTaGFwZU1hc3Rlci5ibGVuZFNoYXBlR3JvdXBzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0SXNCaW5hcnlNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RNb3JwaFRhcmdldE1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdE1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uc3RydWN0VHJhbnNmb3JtTm9kZU1hcCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9odW1hbm9pZEJvbmUgPSBuZXcgSHVtYW5vaWRCb25lKHRoaXMudHJhbnNmb3JtTm9kZU1hcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWNvbmRhcnkgQW5pbWF0aW9uIOOCkuabtOaWsOOBmeOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkZWx0YVRpbWUg5YmN44OV44Os44O844Og44GL44KJ44Gu57WM6YGO56eS5pWwKHNlYylcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc3ByaW5nQm9uZUNvbnRyb2xsZXIudXBkYXRlKGRlbHRhVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnoLTmo4Tlh6bnkIZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zcHJpbmdCb25lQ29udHJvbGxlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5faHVtYW5vaWRCb25lLmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgKHRoaXMubW9ycGhUYXJnZXRNYXAgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMubWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXAgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMucHJlc2V0TW9ycGhUYXJnZXRNYXAgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMudHJhbnNmb3JtTm9kZU1hcCBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy50cmFuc2Zvcm1Ob2RlQ2FjaGUgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMubWVzaENhY2hlIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLl9yb290TWVzaCBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODouODvOODleOCo+ODs+OCsOOCkuihjOOBhlxyXG4gICAgICogQHBhcmFtIGxhYmVsIOODouODvOODleWQjVxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWApCgw44CcMSlcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vcnBoaW5nKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB2ID0gdGhpcy5jYWxjTW9ycGhWYWx1ZShsYWJlbCwgdmFsdWUpO1xyXG4gICAgICAgIGlmICh0aGlzLm1vcnBoVGFyZ2V0TWFwW2xhYmVsXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vcnBoVGFyZ2V0TWFwW2xhYmVsXS5mb3JFYWNoKChzZXR0aW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nLnRhcmdldC5pbmZsdWVuY2UgPSB2ICogKHNldHRpbmcud2VpZ2h0IC8gMTAwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwW2xhYmVsXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwW2xhYmVsXS5tb3JwaGluZyh2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg5fjg6rjgrvjg4Pjg4jjg6Ljg7zjg5Xjga7jg6Ljg7zjg5XjgqPjg7PjgrDjgpLooYzjgYZcclxuICAgICAqIEBwYXJhbSBsYWJlbCDjg6Ljg7zjg5XlkI1cclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlgKQoMOOAnDEpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3JwaGluZ1ByZXNldChsYWJlbDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByZXNldE1vcnBoVGFyZ2V0TWFwW2xhYmVsXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLmNhbGNNb3JwaFZhbHVlKGxhYmVsLCB2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcFtsYWJlbF0uZm9yRWFjaCgoc2V0dGluZykgPT4ge1xyXG4gICAgICAgICAgICBzZXR0aW5nLnRhcmdldC5pbmZsdWVuY2UgPSB2ICogKHNldHRpbmcud2VpZ2h0IC8gMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODouODvOODleOCo+ODs+OCsOeUqOOBruWApOOCkuioiOeul+OBmeOCi1xyXG4gICAgICogQHBhcmFtIGxhYmVsIOODouODvOODleWQjVxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWApFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGNNb3JwaFZhbHVlKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHYgPSBNYXRoLm1heCgwLjAsIE1hdGgubWluKDEuMCwgdmFsdWUpKTtcclxuICAgICAgICBpZiAodGhpcy5pc0JpbmFyeU1vcnBoTWFwW2xhYmVsXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdiA+IDAuNSA/IDEuMCA6IDAuMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBsaXN0IG1vcnBoaW5nIG5hbWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE1vcnBoaW5nTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMubW9ycGhUYXJnZXRNYXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiA5Lq656ew5pmC44Gu44Kr44Oh44Op5L2N572u44KS57W25a++5bqn5qiZ44Go44GX44Gm5Y+W5b6X44GZ44KLXHJcbiAgICAgKlxyXG4gICAgICogZmlyc3RQZXJzb25Cb25lIOOBjOacquioreWumuOBruWgtOWQiOOBryBudWxsIOOCkui/lOOBmVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIOS4gOS6uuensOaZguOBruOCq+ODoeODqeOBruePvuWcqOOBq+OBiuOBkeOCi+e1tuWvvuW6p+aomVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Rmlyc3RQZXJzb25DYW1lcmFQb3NpdGlvbigpOiBOdWxsYWJsZTxWZWN0b3IzPiB7XHJcbiAgICAgICAgY29uc3QgZmlyc3RQZXJzb25Cb25lID0gdGhpcy5nZXRGaXJzdFBlcnNvbkJvbmUoKTtcclxuICAgICAgICBpZiAoIWZpcnN0UGVyc29uQm9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2VQb3MgPSBmaXJzdFBlcnNvbkJvbmUuZ2V0QWJzb2x1dGVQb3NpdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IG9mZnNldFBvcyA9IHRoaXMuZXh0LmZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldDtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoYmFzZVBvcy54ICsgb2Zmc2V0UG9zLngsIGJhc2VQb3MueSArIG9mZnNldFBvcy55LCBiYXNlUG9zLnogKyBvZmZzZXRQb3Mueik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIDkurrnp7DmmYLjgavpoK3jgajjgb/jgarjgZkgVHJhbnNmb3JtTm9kZSDjgpLlj5blvpfjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEZpcnN0UGVyc29uQm9uZSgpOiBOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZFRyYW5zZm9ybU5vZGUodGhpcy5leHQuZmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODnOODvOODs+WQjeOBi+OCieOBneOBruODnOODvOODs+OBq+ipsuW9k+OBmeOCiyBUcmFuc2Zvcm1Ob2RlIOOCkuWPluW+l+OBmeOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lIEh1bWFuQm9uZU5hbWVcclxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBodW1hbm9pZEJvbmUgZ2V0dGVyIGluc3RlYWQuIFRoaXMgbWV0aG9kIHdpbGwgZGVsZXRlIGF0IHYyLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBIdW1hbkJvbmVOYW1lKTogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybU5vZGVNYXBbbmFtZV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBIdW1hbm9pZEJvbmUgTWV0aG9kc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGh1bWFub2lkQm9uZSgpOiBIdW1hbm9pZEJvbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odW1hbm9pZEJvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWUk0gUm9vdCBtZXNoXHJcbiAgICAgKlxyXG4gICAgICogVXNlZnVsIGZvciBNb2RlbCBUcmFuc2Zvcm1hdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJvb3RNZXNoKCk6IE1lc2gge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb290TWVzaDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vZGUg55Wq5Y+344GL44KJ6Kmy5b2T44GZ44KLIFRyYW5zZm9ybU5vZGUg44KS5o6i44GZXHJcbiAgICAgKiDmlbDjgYzlpJrjgY/jgarjgovjga7jgafjgq3jg6Pjg4Pjgrfjg6Xjgavlj4LnhafjgpLmjIHjgaTmp4vpgKDjgavjgZnjgotcclxuICAgICAqIGdsdGYg44GuIG5vZGUg55Wq5Y+344GvIGBtZXRhZGF0YS5nbHRmLnBvaW50ZXJzYCDjgavoqJjpjLLjgZXjgozjgabjgYTjgotcclxuICAgICAqIEBwYXJhbSBub2RlSW5kZXhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRUcmFuc2Zvcm1Ob2RlKG5vZGVJbmRleDogbnVtYmVyKTogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybU5vZGVDYWNoZVtub2RlSW5kZXhdIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXNoIOeVquWPt+OBi+OCieODoeODg+OCt+ODpeOCkuaOouOBmVxyXG4gICAgICogZ2x0ZiDjga4gbWVzaCDnlarlj7fjga8gYG1ldGFkYXRhLmdsdGYucG9pbnRlcnNgIOOBq+iomOmMsuOBleOCjOOBpuOBhOOCi1xyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGZpbmRNZXNoZXMgaW5zdGVhZC4gVGhpcyBtZXRob2QgaGFzIGJyb2tlbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRNZXNoKG1lc2hJbmRleDogbnVtYmVyKTogTnVsbGFibGU8TWVzaD4ge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5tZXNoQ2FjaGVbbWVzaEluZGV4XSAmJiB0aGlzLm1lc2hDYWNoZVttZXNoSW5kZXhdWzBdKSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWVzaCDnlarlj7fjgYvjgonjg6Hjg4Pjgrfjg6XjgpLmjqLjgZlcclxuICAgICAqIGdsdGYg44GuIG1lc2gg55Wq5Y+344GvIGBtZXRhZGF0YS5nbHRmLnBvaW50ZXJzYCDjgavoqJjpjLLjgZXjgozjgabjgYTjgotcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRNZXNoZXMobWVzaEluZGV4OiBudW1iZXIpOiBOdWxsYWJsZTxNZXNoW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZXNoQ2FjaGVbbWVzaEluZGV4XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LqL5YmN44GrIE1vcnBoVGFyZ2V0IOOBqCBpc0JpbmFyeSDjgpLntJDku5jjgZHjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RJc0JpbmFyeU1hcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmV4dC5ibGVuZFNoYXBlTWFzdGVyLmJsZW5kU2hhcGVHcm91cHMuZm9yRWFjaCgoZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzQmluYXJ5TW9ycGhNYXBbZy5uYW1lXSA9IGcuaXNCaW5hcnk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuovliY3jgasgTW9ycGhUYXJnZXQg44GoIEJsZW5kU2hhcGUg44KS57SQ5LuY44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0TW9ycGhUYXJnZXRNYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5leHQuYmxlbmRTaGFwZU1hc3Rlci5ibGVuZFNoYXBlR3JvdXBzLmZvckVhY2goKGcpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFnLmJpbmRzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZy5iaW5kcy5mb3JFYWNoKChiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNoZXMgPSB0aGlzLmZpbmRNZXNoZXMoYi5tZXNoKTtcclxuICAgICAgICAgICAgICAgIGlmICghbWVzaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVuZGVmaW5lZCBCbGVuZFNoYXBlQmluZCBNZXNoYCwgYik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWVzaGVzLmZvckVhY2goKG1lc2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldE1hbmFnZXIgPSBtZXNoLm1vcnBoVGFyZ2V0TWFuYWdlcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1vcnBoVGFyZ2V0TWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVW5kZWZpbmVkIG1vcnBoVGFyZ2V0TWFuYWdlcmAsIGIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IG1vcnBoVGFyZ2V0TWFuYWdlci5nZXRUYXJnZXQoYi5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3JwaFRhcmdldE1hcFtnLm5hbWVdID0gdGhpcy5tb3JwaFRhcmdldE1hcFtnLm5hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9ycGhUYXJnZXRNYXBbZy5uYW1lXS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IGIud2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnLnByZXNldE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcFtnLnByZXNldE5hbWVdID0gdGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcFtnLnByZXNldE5hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXNldE1vcnBoVGFyZ2V0TWFwW2cucHJlc2V0TmFtZV0ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IGIud2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuovliY3jgasgTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXIg44Go44Oi44O844OV5ZCN44KS57SQ5LuY44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0TWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXAoKSB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gdGhpcy5zY2VuZS5tYXRlcmlhbHMuc2xpY2UodGhpcy5tYXRlcmlhbHNOb2Rlc0Zyb20pO1xyXG4gICAgICAgIHRoaXMuZXh0LmJsZW5kU2hhcGVNYXN0ZXIuYmxlbmRTaGFwZUdyb3Vwcy5mb3JFYWNoKChnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZy5tYXRlcmlhbFZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXBbZy5uYW1lXSA9IG5ldyBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlcihtYXRlcmlhbHMsIGcubWF0ZXJpYWxWYWx1ZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LqL5YmN44GrIFRyYW5zZm9ybU5vZGUg44GoIGJvbmUg5ZCN44KS57SQ44Gl44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0VHJhbnNmb3JtTm9kZU1hcCgpIHtcclxuICAgICAgICB0aGlzLmV4dC5odW1hbm9pZC5odW1hbkJvbmVzLmZvckVhY2goKGIpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZmluZFRyYW5zZm9ybU5vZGUoYi5ub2RlKTtcclxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1Ob2RlTWFwW2IuYm9uZV0gPSBub2RlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbm9kZSDnlarlj7fjgaggVHJhbnNmb3JtTm9kZSDjgpLntJDjgaXjgZHjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RUcmFuc2Zvcm1Ob2RlQ2FjaGUoKSB7XHJcbiAgICAgICAgY29uc3QgY2FjaGU6IFRyYW5zZm9ybU5vZGVDYWNoZSA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy50cmFuc2Zvcm1Ob2Rlc0Zyb207IGluZGV4IDwgdGhpcy5zY2VuZS50cmFuc2Zvcm1Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuc2NlbmUudHJhbnNmb3JtTm9kZXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAvLyDjg53jgqTjg7Pjgr/jgYznmbvpjLLjgZXjgozjgabjgYTjgarjgYTjgoLjga7jga/nnIHnlaVcclxuICAgICAgICAgICAgaWYgKCFub2RlIHx8ICFub2RlLm1ldGFkYXRhIHx8ICFub2RlLm1ldGFkYXRhLmdsdGYgfHwgIW5vZGUubWV0YWRhdGEuZ2x0Zi5wb2ludGVycyB8fCBub2RlLm1ldGFkYXRhLmdsdGYucG9pbnRlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBvaW50ZXIgb2Ygbm9kZS5tZXRhZGF0YS5nbHRmLnBvaW50ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9pbnRlci5zdGFydHNXaXRoKCcvbm9kZXMvJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlSW5kZXggPSBwYXJzZUludCgocG9pbnRlciBhcyBzdHJpbmcpLnN1YnN0cig3KSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW25vZGVJbmRleF0gPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYWNoZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1lc2gg55Wq5Y+344GoIE1lc2gg44KS57SQ44Gl44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0TWVzaENhY2hlKCkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlOiBNZXNoQ2FjaGUgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMubWVzaGVzRnJvbTsgaW5kZXggPCB0aGlzLnNjZW5lLm1lc2hlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgbWVzaCA9IHRoaXMuc2NlbmUubWVzaGVzW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKG1lc2guaWQgPT09ICdfX3Jvb3RfXycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RNZXNoID0gbWVzaCBhcyBNZXNoO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g44Od44Kk44Oz44K/44GM55m76Yyy44GV44KM44Gm44GE44Gq44GE44KC44Gu44Gv55yB55WlXHJcbiAgICAgICAgICAgIGlmICghbWVzaCB8fCAhbWVzaC5tZXRhZGF0YSB8fCAhbWVzaC5tZXRhZGF0YS5nbHRmIHx8ICFtZXNoLm1ldGFkYXRhLmdsdGYucG9pbnRlcnMgfHwgbWVzaC5tZXRhZGF0YS5nbHRmLnBvaW50ZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBwb2ludGVyIG9mIG1lc2gubWV0YWRhdGEuZ2x0Zi5wb2ludGVycykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSAocG9pbnRlciBhcyBzdHJpbmcpLm1hdGNoKC9eXFwvbWVzaGVzXFwvKFxcZCspLiskLyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlSW5kZXggPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW25vZGVJbmRleF0gPSBjYWNoZVtub2RlSW5kZXhdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW25vZGVJbmRleF0ucHVzaChtZXNoIGFzIE1lc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYWNoZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9tYXRlcmlhbCc7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlJztcclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlJztcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL21lc2gnO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgeyBHTFRGTG9hZGVyLCBJTWF0ZXJpYWwgfSBmcm9tICdAYmFieWxvbmpzL2xvYWRlcnMvZ2xURi8yLjAnO1xyXG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsIH0gZnJvbSAnYmFieWxvbi1tdG9vbi1tYXRlcmlhbCc7XHJcbmltcG9ydCB0eXBlIHsgSVZSTU1hdGVyaWFsUHJvcGVydHksIElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5IH0gZnJvbSAnLi92cm0taW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElWUk1NYXRlcmlhbFByb3BlcnR5U2hhZGVyIH0gZnJvbSAnLi92cm0taW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9FbmdpbmVzL2VuZ2luZSc7XHJcblxyXG4vKipcclxuICogVlJNIOOBp+aMh+WumuOBleOCjOOCiyBNYXRlcmlhbCDjgpLnlJ/miJDjgZnjgotcclxuICogW1ZSTSDjgYzmj5DkvpvjgZnjgovjgrfjgqfjg7zjg4BdKGh0dHBzOi8vdnJtLmRldi9lbi91bml2cm0vc2hhZGVycy9pbmRleC5odG1sKSDjgpLnibnlrprjgZfoqq3jgb/ovrzjgoBcclxuICogLSBVbmxpdFRleHR1cmU6IOS4jemAj+aYjiwgVlJNIOODleOCoeOCpOODq+WBtOOBpyBbS0hSX21hdGVyaWFsc191bmxpdF0oaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL3RyZWUvbWFpbi9leHRlbnNpb25zLzIuMC9LaHJvbm9zL0tIUl9tYXRlcmlhbHNfdW5saXQpIOOBjOWumue+qeOBleOCjOOBpuOBhOOCi+OBn+OCgeOAgeS9leOCguOBl+OBquOBhFxyXG4gKiAtIFVubGl0Q3V0b3V0OiDpgI/mmI7luqbjgYzplr7lgKTku6XkuIvjga7pg6jliIbjgpLpgI/mmI7jgajjgZnjgossIOWQjOS4ilxyXG4gKiAtIFVubGl0VHJhbnNwYXJlbnQ6IOOCouODq+ODleOCoeODluODrOODs+ODieOAglpXcml0ZeOBl+OBquOBhCwg5ZCM5LiKXHJcbiAqIC0gVW5saXRUcmFuc3BhcmVudFpXcml0ZTog44Ki44Or44OV44Kh44OW44Os44Oz44OJ44CCWldyaXRl44GZ44KLLCDlkIzkuIrjgavliqDjgYjjgIHjg5fjg63jg5Hjg4bjgqPjgacgWldyaXRlIOOCkuW8t+WItuOBl+OBpuOBhOOBvuOBmVxyXG4gKiAtIE1Ub29uOiBNVG9vbk1hdGVyaWFsIOOCkuW3ruOBl+abv+OBiOOBpuOBhOOBvuOBmeOAglxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZSTU1hdGVyaWFsR2VuZXJhdG9yIHtcclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbG9hZGVyOiBHTFRGTG9hZGVyKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Oe44OG44Oq44Ki44Or44KS55Sf5oiQ44GZ44KLIFByb21pc2Ug44KS6L+U44GZXHJcbiAgICAgKiBWUk0g5a++6LGh5aSW44Gu5aC05ZCI44GvIG51bGxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdlbmVyYXRlKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgbWVzaDogTWVzaCwgYmFieWxvbkRyYXdNb2RlOiBudW1iZXIsIGFzc2lnbjogKGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpID0+IHZvaWQpOiBOdWxsYWJsZTxQcm9taXNlPE1hdGVyaWFsPj4ge1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsUHJvcCA9IHRoaXMuZmluZE1hdGVyaWFsUHJvcGVydHlCeU5hbWUobWF0ZXJpYWwubmFtZSwgdGhpcy5nZXRNYXRlcmlhbFByb3BlcnRpZXMoKSk7XHJcbiAgICAgICAgaWYgKCFtYXRlcmlhbFByb3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc2guYWxwaGFJbmRleCA9IG1hdGVyaWFsUHJvcC5yZW5kZXJRdWV1ZTtcclxuICAgICAgICBjb25zdCBuZXdNYXRlcmlhbCA9IHRoaXMuY3JlYXRlTWF0ZXJpYWxCeVNoYWRlcihjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbkRyYXdNb2RlLCBtYXRlcmlhbFByb3ApO1xyXG4gICAgICAgIGlmICghbmV3TWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFzc2lnbihuZXdNYXRlcmlhbCk7XHJcbiAgICAgICAgaWYgKG5ld01hdGVyaWFsIGluc3RhbmNlb2YgTVRvb25NYXRlcmlhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkTVRvb25UZXh0dXJlc0FzeW5jKGNvbnRleHQsIG5ld01hdGVyaWFsLCBtYXRlcmlhbFByb3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ld01hdGVyaWFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZSTSDjgb7jgZ/jga8gVkNJIOOBi+OCieODnuODhuODquOCouODq+ODl+ODreODkeODhuOCo+OBrumFjeWIl+OCkuaOouOBmVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1hdGVyaWFsUHJvcGVydGllcygpOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVtdIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnMuVlJNICYmIHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucy5WUk0ubWF0ZXJpYWxQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnMuVlJNLm1hdGVyaWFsUHJvcGVydGllcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucy5WQ0FTVF92Y2lfbWF0ZXJpYWxfdW5pdHkgJiYgdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zLlZDQVNUX3ZjaV9tYXRlcmlhbF91bml0eS5tYXRlcmlhbHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucy5WQ0FTVF92Y2lfbWF0ZXJpYWxfdW5pdHkubWF0ZXJpYWxzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg57jg4bjg6rjgqLjg6vlkI3jgYvjgokgTWF0ZXJpYWxQcm9wZXJ0eSDjgpLmjqLjgZlcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbE5hbWUg44Oe44OG44Oq44Ki44Or5ZCNXHJcbiAgICAgKiBAcGFyYW0gZXh0ZW5zaW9uIOaLoeW8teODh+ODvOOCv1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmRNYXRlcmlhbFByb3BlcnR5QnlOYW1lKG1hdGVyaWFsTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkLCBtYXRlcmlhbHM6IElWUk1NYXRlcmlhbFByb3BlcnR5W10pOiBOdWxsYWJsZTxJVlJNTWF0ZXJpYWxQcm9wZXJ0eT4ge1xyXG4gICAgICAgIGlmICghbWF0ZXJpYWxOYW1lIHx8ICFtYXRlcmlhbHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1hdHMgPSBtYXRlcmlhbHMuZmlsdGVyKCh2KSA9PiB2Lm5hbWUgPT09IG1hdGVyaWFsTmFtZSk7XHJcbiAgICAgICAgaWYgKG1hdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWF0cy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlci5sb2coYER1cGxpY2F0ZWQgdnJtIG1hdGVyaWFsIG5hbWUgZm91bmQ6ICR7bWF0ZXJpYWxOYW1lfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF0c1ttYXRzLmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OG44Kv44K544OB44Oj44KS6Kqt44G/6L6844KAXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCDnj77lnKjjga7jgrPjg7Pjg4bjgq3jgrnjg4hcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbCDnlJ/miJDjgZfjgZ8gTVRvb25NYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIHByb3Ag55Sf5oiQ44GX44GfIE1Ub29uTWF0ZXJpYWwg44Gu44Oe44OG44Oq44Ki44Or44OX44Ot44OR44OG44KjXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9hZE1Ub29uVGV4dHVyZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBNVG9vbk1hdGVyaWFsLCBwcm9wOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eSk6IFByb21pc2U8TWF0ZXJpYWw+IHtcclxuICAgICAgICBjb25zdCBwcm9taXNlczogQXJyYXk8UHJvbWlzZTxCYXNlVGV4dHVyZT4+ID0gW107XHJcbiAgICAgICAgLy8g5YWo44Gm44Gu44OG44Kv44K544OB44Oj44GuIFVWIE9mZnNldCAmIFNjYWxlIOOBr+ODoeOCpOODs+ODhuOCr+OCueODgeODo+OBruOCguOBruOCkua1geeUqOOBmeOCi1xyXG4gICAgICAgIGNvbnN0IHV2T2Zmc2V0U2NhbGUgPSBwcm9wLnZlY3RvclByb3BlcnRpZXMuX01haW5UZXg7XHJcbiAgICAgICAgaWYgKCF1dk9mZnNldFNjYWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobWF0ZXJpYWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhcHBseVRleHR1cmUgPSAoaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCwgY2FsbGJhY2s6ICh0ZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4gdm9pZCkgPT4ge1xyXG4gICAgICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihpbmRleCwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L3RleHR1cmVzLyR7aW5kZXh9YCwgeyBpbmRleDogdmFsdWUgfSwgKGJhYnlsb25UZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlrp/pmpvjga8gVGV4dHVyZSDjgqTjg7Pjgrnjgr/jg7PjgrnjgYzmnaXjgovjga7jgafjgq3jg6Pjgrnjg4hcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGJhYnlsb25UZXh0dXJlIGFzIFRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQudU9mZnNldCA9IHV2T2Zmc2V0U2NhbGVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQudk9mZnNldCA9IHV2T2Zmc2V0U2NhbGVbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQudVNjYWxlID0gdXZPZmZzZXRTY2FsZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC52U2NhbGUgPSB1dk9mZnNldFNjYWxlWzNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhiYWJ5bG9uVGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9NYWluVGV4LCAodGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwuYWxwaGFCbGVuZCB8fCBtYXRlcmlhbC5hbHBoYVRlc3QpIHtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUuaGFzQWxwaGEgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fU2hhZGVUZXh0dXJlLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLnNoYWRlVGV4dHVyZSA9IHRleHR1cmUpKTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fQnVtcE1hcCwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5idW1wVGV4dHVyZSA9IHRleHR1cmUpKTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fUmVjZWl2ZVNoYWRvd1RleHR1cmUsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwucmVjZWl2ZVNoYWRvd1RleHR1cmUgPSB0ZXh0dXJlKSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX1NoYWRpbmdHcmFkZVRleHR1cmUsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwuc2hhZGluZ0dyYWRlVGV4dHVyZSA9IHRleHR1cmUpKTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fUmltVGV4dHVyZSwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5yaW1UZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9TcGhlcmVBZGQsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwubWF0Q2FwVGV4dHVyZSA9IHRleHR1cmUpKTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fRW1pc3Npb25NYXAsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwuZW1pc3NpdmVUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9PdXRsaW5lV2lkdGhUZXh0dXJlLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLm91dGxpbmVXaWR0aFRleHR1cmUgPSB0ZXh0dXJlKSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX1V2QW5pbU1hc2tUZXh0dXJlLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLnV2QW5pbWF0aW9uTWFza1RleHR1cmUgPSB0ZXh0dXJlKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiBtYXRlcmlhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjgrfjgqfjg7zjg4DlkI3jgYvjgonjg57jg4bjg6rjgqLjg6vjgpLmjqjmuKzjgZfjgabnlJ/miJDjgZnjgotcclxuICAgICAqIEBwYXJhbSBjb250ZXh0IOePvuWcqOOBruOCs+ODs+ODhuOCreOCueODiFxyXG4gICAgICogQHBhcmFtIG1hdGVyaWFsIGdsVEYg44Oe44OG44Oq44Ki44OrXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbkRyYXdNb2RlIOaPj+eUu+eorumhnlxyXG4gICAgICogQHBhcmFtIHByb3Ag55Sf5oiQ44GZ44KL44Oe44OG44Oq44Ki44Or44OX44Ot44OR44OG44KjXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlTWF0ZXJpYWxCeVNoYWRlcihjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25EcmF3TW9kZTogbnVtYmVyLCBwcm9wOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eSk6IE51bGxhYmxlPE1hdGVyaWFsPiB7XHJcbiAgICAgICAgaWYgKHByb3Auc2hhZGVyID09PSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVNoYWRlci5WUk1NVG9vbikge1xyXG4gICAgICAgICAgICBjb25zdCBtdG9vbk1hdGVyaWFsID0gbmV3IE1Ub29uTWF0ZXJpYWwobWF0ZXJpYWwubmFtZSB8fCBgTVRvb25NYXRlcmlhbCR7bWF0ZXJpYWwuaW5kZXh9YCwgdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNVG9vbk1hdGVyaWFsUHJvcGVydGllcyhtdG9vbk1hdGVyaWFsLCBwcm9wKTtcclxuICAgICAgICAgICAgcmV0dXJuIG10b29uTWF0ZXJpYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcm9wLnNoYWRlciA9PT0gSVZSTU1hdGVyaWFsUHJvcGVydHlTaGFkZXIuVlJNVW5saXRUcmFuc3BhcmVudFpXcml0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBtYXQgPSB0aGlzLmxvYWRlci5jcmVhdGVNYXRlcmlhbChjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbkRyYXdNb2RlKTtcclxuICAgICAgICAgICAgLy8g6YCa5bi444Oe44OG44Oq44Ki44Or44GrIERlcHRoIFdyaXRlIOOCkuW8t+WItlxyXG4gICAgICAgICAgICBtYXQuZGlzYWJsZURlcHRoV3JpdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbWF0LmZvcmNlRGVwdGhXcml0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Oe44OG44Oq44Ki44Or44GrIFZSTSDjg5fjg63jg5Hjg4bjgqPjgpLoqK3lrppcclxuICAgICAqIFZSTSDjg5fjg63jg5Hjg4bjgqPjgajjg57jg4bjg6rjgqLjg6vjg5fjg63jg5Hjg4bjgqPjga7jg57jg4Pjg5Tjg7PjgrDjgpLooYzjgaPjgabjgYTjgotcclxuICAgICAqIOWIneacn+WApOOBr+ODnuODhuODquOCouODq+Wun+ijheWBtOOBq+aMgeOBo+OBpuOBhOOCi+OBn+OCgeOAgeWApOOBjOOBguOCi+WgtOWQiOOBruOBv+S4iuabuOOBjeOBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE1Ub29uTWF0ZXJpYWxQcm9wZXJ0aWVzKG1hdGVyaWFsOiBNVG9vbk1hdGVyaWFsLCBwcm9wOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eSkge1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9DdXRvZmYsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmFscGhhQ3V0T2ZmID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8SVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk+KHByb3AudmVjdG9yUHJvcGVydGllcy5fQ29sb3IsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgQ29sb3IzKHZhbHVlWzBdLCB2YWx1ZVsxXSwgdmFsdWVbMl0pO1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5hbHBoYSA9IHZhbHVlWzNdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eT4ocHJvcC52ZWN0b3JQcm9wZXJ0aWVzLl9TaGFkZUNvbG9yLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuc2hhZGVDb2xvciA9IG5ldyBDb2xvcjModmFsdWVbMF0sIHZhbHVlWzFdLCB2YWx1ZVsyXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX0J1bXBTY2FsZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuYnVtcFNjYWxlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fUmVjZWl2ZVNoYWRvd1JhdGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnJlY2VpdmVTaGFkb3dSYXRlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fU2hhZGluZ0dyYWRlUmF0ZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuc2hhZGluZ0dyYWRlUmF0ZSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1NoYWRlU2hpZnQsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnNoYWRlU2hpZnQgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9TaGFkZVRvb255LCAodmFsdWUpID0+IChtYXRlcmlhbC5zaGFkZVRvb255ID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fTGlnaHRDb2xvckF0dGVudWF0aW9uLCAodmFsdWUpID0+IChtYXRlcmlhbC5saWdodENvbG9yQXR0ZW51YXRpb24gPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9JbmRpcmVjdExpZ2h0SW50ZW5zaXR5LCAodmFsdWUpID0+IChtYXRlcmlhbC5pbmRpcmVjdExpZ2h0SW50ZW5zaXR5ID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8SVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk+KHByb3AudmVjdG9yUHJvcGVydGllcy5fUmltQ29sb3IsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5yaW1Db2xvciA9IG5ldyBDb2xvcjModmFsdWVbMF0sIHZhbHVlWzFdLCB2YWx1ZVsyXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1JpbUxpZ2h0aW5nTWl4LCAodmFsdWUpID0+IChtYXRlcmlhbC5yaW1MaWdodGluZ01peCA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1JpbUZyZXNuZWxQb3dlciwgKHZhbHVlKSA9PiAobWF0ZXJpYWwucmltRnJlc25lbFBvd2VyID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fUmltTGlmdCwgKHZhbHVlKSA9PiAobWF0ZXJpYWwucmltTGlmdCA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5Pihwcm9wLnZlY3RvclByb3BlcnRpZXMuX0VtaXNzaW9uQ29sb3IsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5lbWlzc2l2ZUNvbG9yID0gbmV3IENvbG9yMyh2YWx1ZVswXSwgdmFsdWVbMV0sIHZhbHVlWzJdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fT3V0bGluZVdpZHRoLCAodmFsdWUpID0+IChtYXRlcmlhbC5vdXRsaW5lV2lkdGggPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9PdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLm91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5Pihwcm9wLnZlY3RvclByb3BlcnRpZXMuX091dGxpbmVDb2xvciwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLm91dGxpbmVDb2xvciA9IG5ldyBDb2xvcjModmFsdWVbMF0sIHZhbHVlWzFdLCB2YWx1ZVsyXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX091dGxpbmVMaWdodGluZ01peCwgKHZhbHVlKSA9PiAobWF0ZXJpYWwub3V0bGluZUxpZ2h0aW5nTWl4ID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fVXZBbmltU2Nyb2xsWCwgKHZhbHVlKSA9PiAobWF0ZXJpYWwudXZBbmltYXRpb25TY3JvbGxYID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fVXZBbmltU2Nyb2xsWSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwudXZBbmltYXRpb25TY3JvbGxZID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fVXZBbmltUm90YXRpb24sICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnV2QW5pbWF0aW9uUm90YXRpb24gPSB2YWx1ZSkpO1xyXG5cclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fRGVidWdNb2RlLCAodmFsdWUpID0+IChtYXRlcmlhbC5kZWJ1Z01vZGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9CbGVuZE1vZGUsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IC8vIE9wYXF1ZVxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhQmxlbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYVRlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTogLy8gVHJhbnNwYXJlbnRDdXRvdXRcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYUJsZW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGFUZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYU1vZGUgPSBFbmdpbmUuQUxQSEFfQ09NQklORTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjogLy8gVHJhbnNwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYUJsZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYVRlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYU1vZGUgPSBFbmdpbmUuQUxQSEFfQ09NQklORTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9PdXRsaW5lV2lkdGhNb2RlLCAodmFsdWUpID0+IChtYXRlcmlhbC5vdXRsaW5lV2lkdGhNb2RlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fT3V0bGluZUNvbG9yTW9kZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwub3V0bGluZUNvbG9yTW9kZSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX0N1bGxNb2RlLCAodmFsdWUpID0+IChtYXRlcmlhbC5jdWxsTW9kZSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX091dGxpbmVDdWxsTW9kZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwub3V0bGluZUN1bGxNb2RlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8Ym9vbGVhbj4ocHJvcC5rZXl3b3JkTWFwLl9BTFBIQUJMRU5EX09OLCAodmFsdWUpID0+IChtYXRlcmlhbC5hbHBoYUJsZW5kID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8Ym9vbGVhbj4ocHJvcC5rZXl3b3JkTWFwLl9BTFBIQVRFU1RfT04sICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmFscGhhVGVzdCA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1pXcml0ZSwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmZvcmNlRGVwdGhXcml0ZSA9IE1hdGgucm91bmQodmFsdWUpID09PSAxO1xyXG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwuZm9yY2VEZXB0aFdyaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5kaXNhYmxlRGVwdGhXcml0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDjg5fjg63jg5Hjg4bjgqPjgYzoqK3lrprjgZXjgozjgabjgYTjgozjgbDjgrPjg7zjg6vjg5Djg4Pjgq/jgpLlrp/ooYzjgZnjgotcclxuICovXHJcbmZ1bmN0aW9uIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxUPihwcm9wOiBUIHwgdW5kZWZpbmVkLCBjYWxsYmFjazogKHZhbHVlOiBUKSA9PiB2b2lkKSB7XHJcbiAgICBpZiAodHlwZW9mIHByb3AgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY2FsbGJhY2socHJvcCk7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXJjUm90YXRlQ2FtZXJhIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9DYW1lcmFzL2FyY1JvdGF0ZUNhbWVyYVwiO1xuaW1wb3J0IHsgQ29sb3IzLCBWZWN0b3IzIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0VuZ2luZXMvZW5naW5lXCI7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbExpZ2h0IH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9MaWdodHMvZGlyZWN0aW9uYWxMaWdodFwiO1xuaW1wb3J0IHsgSGVtaXNwaGVyaWNMaWdodCB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTGlnaHRzL2hlbWlzcGhlcmljTGlnaHRcIjtcbmltcG9ydCB7IFBvaW50TGlnaHQgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xpZ2h0cy9wb2ludExpZ2h0XCI7XG5pbXBvcnQgeyBTaGFkb3dHZW5lcmF0b3IgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xpZ2h0cy9TaGFkb3dzL3NoYWRvd0dlbmVyYXRvclwiO1xuaW1wb3J0IHsgU2NlbmVMb2FkZXIgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXJcIjtcbmltcG9ydCB7IE1lc2ggfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL01lc2hlcy9tZXNoXCI7XG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvc2NlbmVcIjtcbmltcG9ydCB0eXBlIHsgVlJNTWFuYWdlciB9IGZyb20gXCIuLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy92cm0tbWFuYWdlclwiO1xuXG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSBcIkBiYWJ5bG9uanMvbG9hZGVycy9nbFRGLzIuMFwiO1xuXG5pbXBvcnQgXCJAYmFieWxvbmpzL2NvcmUvSGVscGVycy9zY2VuZUhlbHBlcnNcIjtcbmltcG9ydCBcIkBiYWJ5bG9uanMvY29yZS9NZXNoZXMvQnVpbGRlcnMvc3BoZXJlQnVpbGRlclwiO1xuaW1wb3J0IFwiQGJhYnlsb25qcy9jb3JlL01lc2hlcy9CdWlsZGVycy90b3J1c0tub3RCdWlsZGVyXCI7XG5pbXBvcnQgXCJAYmFieWxvbmpzL2luc3BlY3RvclwiO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzXG5pbXBvcnQgKiBhcyBCVkwgZnJvbSBcIi4vaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9pbmRleFwiO1xuXG5pbXBvcnQgeyBWM0RDb3JlIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7XG4gIFZSTUZpbGVMb2FkZXIsXG4gIFZSTUxvYWRlckV4dGVuc2lvbixcbn0gZnJvbSBcIi4vaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyY1wiO1xuXG4vLyB3aW5kb3cub25sb2FkID0gYXN5bmMgKGUpID0+IHtcbmFzeW5jIGZ1bmN0aW9uIG1haW4yKCkge1xuICAvLyogRGVmaW5lIHZybSBmaWxlIHBhdGguXG4gIGNvbnN0IHZybUZpbGUgPSBcIi4vdGVzdGZpbGVzL2RlZmF1bHQudnJtXCI7XG5cbiAgLy8qIENyZWF0ZSBhbiBFbmdpbmUgaW5zdGFuY2UuXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGNvbnN0IGRlYnVnUHJvcGVydGllcyA9IGdldERlYnVnUHJvcGVydGllcygpO1xuICBjb25zb2xlLmxvZyhcImRlYnVnUHJvcGVydGllcy53ZWJnbDE6IFwiLCBkZWJ1Z1Byb3BlcnRpZXMud2ViZ2wxKTtcbiAgY29uc3QgZW5naW5lID0gbmV3IEVuZ2luZShjYW52YXMsIHRydWUsIHtcbiAgICBhbHBoYTogZmFsc2UsXG4gICAgZGlzYWJsZVdlYkdMMlN1cHBvcnQ6IGRlYnVnUHJvcGVydGllcy53ZWJnbDEsXG4gIH0pO1xuICBjb25zdCBzY2VuZSA9IG5ldyBTY2VuZShlbmdpbmUpO1xuICBjb25zdCBjYW1lcmEgPSBuZXcgQXJjUm90YXRlQ2FtZXJhKFxuICAgIFwiTWFpbkNhbWVyYTFcIixcbiAgICAwLFxuICAgIDAsXG4gICAgMyxcbiAgICBuZXcgVmVjdG9yMygwLCAxLjIsIDApLFxuICAgIHNjZW5lLFxuICAgIHRydWVcbiAgKTtcbiAgY2FtZXJhLmxvd2VyUmFkaXVzTGltaXQgPSAwLjE7XG4gIGNhbWVyYS51cHBlclJhZGl1c0xpbWl0ID0gMjA7XG4gIGNhbWVyYS53aGVlbERlbHRhUGVyY2VudGFnZSA9IDAuMDE7XG4gIGNhbWVyYS5taW5aID0gMC4zO1xuICBjYW1lcmEucG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLCAxLjIsIC0zKTtcbiAgY2FtZXJhLmF0dGFjaENvbnRyb2woY2FudmFzLCB0cnVlKTtcblxuICAvLyogQ3JlYXRlIGEgVjNEQ29yZSBpbnN0YW5jZS5cbiAgY29uc3QgdjNEQ29yZSA9IG5ldyBWM0RDb3JlKGVuZ2luZSwgc2NlbmUsIGNhbWVyYSk7XG4gIHYzRENvcmUudHJhbnNwYXJlbnRCYWNrZ3JvdW5kKCk7XG4gIGF3YWl0IHYzRENvcmUuQXBwZW5kQXN5bmMoXCJcIiwgdnJtRmlsZSk7XG5cbiAgLy8gR2V0IG1hbmFnZXJzXG4gIC8vIGNvbnN0IHZybU1hbmFnZXIgPSB2M0RDb3JlLmdldFZSTU1hbmFnZXJCeVVSSSh2cm1GaWxlKTtcbiAgLy8gY29uc29sZS5sb2coXCJ2cm1NYW5hZ2VyOiBcIiwgdnJtTWFuYWdlcik7XG5cbiAgLy8gQ2FtZXJhXG4gIC8vIHYzRENvcmUuYXR0YWNoQ2FtZXJhVG8odnJtTWFuYWdlcik7XG5cbiAgLy8gTGlnaHRzXG4gIHYzRENvcmUuYWRkQW1iaWVudExpZ2h0KG5ldyBDb2xvcjMoMSwgMSwgMSkpO1xuXG4gIC8vIExvY2sgY2FtZXJhIHRhcmdldFxuICAvLyB2M0RDb3JlLnNjZW5lLm9uQmVmb3JlUmVuZGVyT2JzZXJ2YWJsZS5hZGQoKCkgPT4ge1xuICAvLyAgIHZybU1hbmFnZXIuY2FtZXJhc1swXS5zZXRUYXJnZXQodnJtTWFuYWdlci5yb290TWVzaC5nZXRBYnNvbHV0ZVBvc2l0aW9uKCkpO1xuICAvLyB9KTtcblxuICBlbmdpbmUucnVuUmVuZGVyTG9vcCgoKSA9PiB7XG4gICAgdjNEQ29yZS5zY2VuZS5yZW5kZXIoKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4xKCkge1xuICBpZiAoU2NlbmVMb2FkZXIpIHtcbiAgICBTY2VuZUxvYWRlci5SZWdpc3RlclBsdWdpbihuZXcgQlZMLlZSTUZpbGVMb2FkZXIoKSk7XG4gIH1cbiAgLy8gR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihcIlZSTVwiLCAobG9hZGVyKSA9PiB7XG4gIC8vICAgY29uc29sZS5sb2coXCJsb2FkZXI6IFwiLCBsb2FkZXIpO1xuICAvLyAgIGNvbnNvbGUubG9nKFwibG9hZGVyLmJhYnlsb25TY2VuZTogXCIsIGxvYWRlci5iYWJ5bG9uU2NlbmUpO1xuICAvLyAgIHJldHVybiBuZXcgVlJNKGxvYWRlcik7XG4gIC8vIH0pO1xuXG4gIGNvbnN0IGRlYnVnUHJvcGVydGllcyA9IGdldERlYnVnUHJvcGVydGllcygpO1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBjb25zdCBlbmdpbmUgPSBuZXcgRW5naW5lKGNhbnZhcywgdHJ1ZSwge1xuICAgIGFscGhhOiBmYWxzZSxcbiAgICBkaXNhYmxlV2ViR0wyU3VwcG9ydDogZGVidWdQcm9wZXJ0aWVzLndlYmdsMSxcbiAgfSk7XG4gIGNvbnN0IHNjZW5lID0gbmV3IFNjZW5lKGVuZ2luZSk7XG4gIGNvbnN0IGNhbWVyYSA9IG5ldyBBcmNSb3RhdGVDYW1lcmEoXG4gICAgXCJNYWluQ2FtZXJhMVwiLFxuICAgIDAsXG4gICAgMCxcbiAgICAzLFxuICAgIG5ldyBWZWN0b3IzKDAsIDEuMiwgMCksXG4gICAgc2NlbmUsXG4gICAgdHJ1ZVxuICApO1xuICBjYW1lcmEubG93ZXJSYWRpdXNMaW1pdCA9IDAuMTtcbiAgY2FtZXJhLnVwcGVyUmFkaXVzTGltaXQgPSAyMDtcbiAgY2FtZXJhLndoZWVsRGVsdGFQZXJjZW50YWdlID0gMC4wMTtcbiAgY2FtZXJhLm1pblogPSAwLjM7XG4gIGNhbWVyYS5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDEuMiwgLTMpO1xuICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xuICBjb25zb2xlLmxvZyhcImNhbWVyYTogXCIsIGNhbWVyYSk7XG5cbiAgY29uc3QgZGlyZWN0aW9uYWxMaWdodCA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0KFxuICAgIFwiRGlyZWN0aW9uYWxMaWdodDFcIixcbiAgICBuZXcgVmVjdG9yMygwLCAtMC41LCAxLjApLFxuICAgIHNjZW5lXG4gICk7XG4gIGRpcmVjdGlvbmFsTGlnaHQucG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLCAyNSwgLTUwKTtcbiAgZGlyZWN0aW9uYWxMaWdodC5zZXRFbmFibGVkKHRydWUpO1xuXG4gICh3aW5kb3cgYXMgYW55KS5jdXJyZW50U2NlbmUgPSBzY2VuZTtcbiAgZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4ge1xuICAgIHNjZW5lLnJlbmRlcigpO1xuICB9KTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBTY2VuZUxvYWRlci5BcHBlbmRBc3luYyhcbiAgICBcIlwiLFxuICAgIFwiLi90ZXN0ZmlsZXMvZGVmYXVsdC52cm1cIixcbiAgICBzY2VuZVxuICApO1xuICAvLyBjb25zdCByZXNwb25zZSA9IGF3YWl0IFNjZW5lTG9hZGVyLkxvYWRBc3luYyhcbiAgLy8gICBcImZpbGU6XCIsXG4gIC8vICAgXCIuL3Rlc3RmaWxlcy9kZWZhdWx0LnZybVwiLFxuICAvLyAgIGVuZ2luZVxuICAvLyApO1xuICBjb25zb2xlLmxvZyhcInJlc3BvbnNlOiBcIiwgcmVzcG9uc2UpO1xuICBjb25zb2xlLmxvZyhcInJlc3BvbnNlLm1ldGFkYXRhOiBcIiwgcmVzcG9uc2UubWV0YWRhdGEpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICBpZiAoU2NlbmVMb2FkZXIpIHtcbiAgICBTY2VuZUxvYWRlci5SZWdpc3RlclBsdWdpbihuZXcgQlZMLlZSTUZpbGVMb2FkZXIoKSk7XG4gIH1cbiAgLy8gR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihcIlZSTVwiLCAobG9hZGVyKSA9PiB7XG4gIC8vICAgY29uc29sZS5sb2coXCJsb2FkZXI6IFwiLCBsb2FkZXIpO1xuICAvLyAgIHJldHVybiBuZXcgQlZMLlZSTUxvYWRlckV4dGVuc2lvbihsb2FkZXIpO1xuICAvLyB9KTtcblxuICBjb25zdCBkZWJ1Z1Byb3BlcnRpZXMgPSBnZXREZWJ1Z1Byb3BlcnRpZXMoKTtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgY29uc29sZS5sb2coXCJkZWJ1Z1Byb3BlcnRpZXMud2ViZ2wxOiBcIiwgZGVidWdQcm9wZXJ0aWVzLndlYmdsMSk7XG4gIGNvbnN0IGVuZ2luZSA9IG5ldyBFbmdpbmUoY2FudmFzLCB0cnVlLCB7XG4gICAgYWxwaGE6IGZhbHNlLFxuICAgIGRpc2FibGVXZWJHTDJTdXBwb3J0OiBkZWJ1Z1Byb3BlcnRpZXMud2ViZ2wxLFxuICB9KTtcbiAgY29uc29sZS5sb2coXCJlbmdpbmU6IFwiLCBlbmdpbmUpO1xuICBjb25zdCBzY2VuZSA9IG5ldyBTY2VuZShlbmdpbmUpO1xuICBjb25zb2xlLmxvZyhcInNjZW5lOiBcIiwgc2NlbmUpO1xuICBjb25zdCBjYW1lcmEgPSBuZXcgQXJjUm90YXRlQ2FtZXJhKFxuICAgIFwiTWFpbkNhbWVyYTFcIixcbiAgICAwLFxuICAgIDAsXG4gICAgMyxcbiAgICBuZXcgVmVjdG9yMygwLCAxLjIsIDApLFxuICAgIHNjZW5lLFxuICAgIHRydWVcbiAgKTtcbiAgY2FtZXJhLmxvd2VyUmFkaXVzTGltaXQgPSAwLjE7XG4gIGNhbWVyYS51cHBlclJhZGl1c0xpbWl0ID0gMjA7XG4gIGNhbWVyYS53aGVlbERlbHRhUGVyY2VudGFnZSA9IDAuMDE7XG4gIGNhbWVyYS5taW5aID0gMC4zO1xuICBjYW1lcmEucG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLCAxLjIsIC0zKTtcbiAgY2FtZXJhLmF0dGFjaENvbnRyb2woY2FudmFzLCB0cnVlKTtcbiAgY29uc29sZS5sb2coXCJjYW1lcmE6IFwiLCBjYW1lcmEpO1xuXG4gIHNjZW5lLmNyZWF0ZURlZmF1bHRFbnZpcm9ubWVudCh7XG4gICAgY3JlYXRlR3JvdW5kOiB0cnVlLFxuICAgIGNyZWF0ZVNreWJveDogZmFsc2UsXG4gICAgZW5hYmxlR3JvdW5kTWlycm9yOiBmYWxzZSxcbiAgICBlbmFibGVHcm91bmRTaGFkb3c6IGZhbHNlLFxuICB9KTtcblxuICAvLyBMaWdodHNcbiAgY29uc3QgZGlyZWN0aW9uYWxMaWdodCA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0KFxuICAgIFwiRGlyZWN0aW9uYWxMaWdodDFcIixcbiAgICBuZXcgVmVjdG9yMygwLCAtMC41LCAxLjApLFxuICAgIHNjZW5lXG4gICk7XG4gIGRpcmVjdGlvbmFsTGlnaHQucG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLCAyNSwgLTUwKTtcbiAgZGlyZWN0aW9uYWxMaWdodC5zZXRFbmFibGVkKHRydWUpO1xuICBjb25zdCBoZW1pc3BoZXJpY0xpZ2h0ID0gbmV3IEhlbWlzcGhlcmljTGlnaHQoXG4gICAgXCJIZW1pc3BoZXJpY0xpZ2h0MVwiLFxuICAgIG5ldyBWZWN0b3IzKC0wLjIsIC0wLjgsIC0xKSxcbiAgICBzY2VuZVxuICApO1xuICBoZW1pc3BoZXJpY0xpZ2h0LnNldEVuYWJsZWQoZmFsc2UpO1xuICBjb25zdCBwb2ludExpZ2h0ID0gbmV3IFBvaW50TGlnaHQoXCJQb2ludExpZ2h0MVwiLCBuZXcgVmVjdG9yMygwLCAwLCAxKSwgc2NlbmUpO1xuICBwb2ludExpZ2h0LnNldEVuYWJsZWQoZmFsc2UpO1xuXG4gIC8vIE1lc2hlc1xuICBjb25zdCBzdGFuZGFyZE1hdGVyaWFsU3BoZXJlID0gTWVzaC5DcmVhdGVTcGhlcmUoXG4gICAgXCJTdGFuZGFyZE1hdGVyaWFsU3BoZXJlMVwiLFxuICAgIDE2LFxuICAgIDEsXG4gICAgc2NlbmVcbiAgKTtcbiAgc3RhbmRhcmRNYXRlcmlhbFNwaGVyZS5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDEuNSwgMS4yLCAwKTtcbiAgc3RhbmRhcmRNYXRlcmlhbFNwaGVyZS5yZWNlaXZlU2hhZG93cyA9IHRydWU7XG5cbiAgY29uc3Qgc2hhZG93Q2FzdGVyID0gTWVzaC5DcmVhdGVUb3J1c0tub3QoXG4gICAgXCJTaGFkb3dDYXN0ZXJcIixcbiAgICAxLFxuICAgIDAuMixcbiAgICAzMixcbiAgICAzMixcbiAgICAyLFxuICAgIDMsXG4gICAgc2NlbmVcbiAgKTtcbiAgc2hhZG93Q2FzdGVyLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMC4wLCA1LjAsIC0xMC4wKTtcbiAgc2hhZG93Q2FzdGVyLnNldEVuYWJsZWQoZGVidWdQcm9wZXJ0aWVzLnNoYWRvdyk7XG4gIGlmIChkZWJ1Z1Byb3BlcnRpZXMuc2hhZG93KSB7XG4gICAgY29uc3Qgc2hhZG93R2VuZXJhdG9yID0gbmV3IFNoYWRvd0dlbmVyYXRvcigxMDI0LCBkaXJlY3Rpb25hbExpZ2h0KTtcbiAgICBzaGFkb3dHZW5lcmF0b3IuYWRkU2hhZG93Q2FzdGVyKHNoYWRvd0Nhc3Rlcik7XG4gIH1cblxuICBpZiAoZGVidWdQcm9wZXJ0aWVzLmluc3BlY3Rvcikge1xuICAgIGF3YWl0IHNjZW5lLmRlYnVnTGF5ZXIuc2hvdyh7XG4gICAgICBnbG9iYWxSb290OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndyYXBwZXJcIikgYXMgSFRNTEVsZW1lbnQsXG4gICAgfSk7XG4gIH1cblxuICAvLyBFeHBvc2UgY3VycmVudCBzY2VuZVxuICAod2luZG93IGFzIGFueSkuY3VycmVudFNjZW5lID0gc2NlbmU7XG5cbiAgc2NlbmUub25CZWZvcmVSZW5kZXJPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XG4gICAgLy8gU3ByaW5nQm9uZVxuICAgIGlmICghc2NlbmUubWV0YWRhdGEgfHwgIXNjZW5lLm1ldGFkYXRhLnZybU1hbmFnZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1hbmFnZXJzID0gc2NlbmUubWV0YWRhdGEudnJtTWFuYWdlcnMgYXMgVlJNTWFuYWdlcltdO1xuICAgIGNvbnN0IGRlbHRhVGltZSA9IHNjZW5lLmdldEVuZ2luZSgpLmdldERlbHRhVGltZSgpO1xuICAgIG1hbmFnZXJzLmZvckVhY2goKG1hbmFnZXIpID0+IHtcbiAgICAgIG1hbmFnZXIudXBkYXRlKGRlbHRhVGltZSk7XG4gICAgfSk7XG4gIH0pO1xuICBlbmdpbmUucnVuUmVuZGVyTG9vcCgoKSA9PiB7XG4gICAgc2NlbmUucmVuZGVyKCk7XG4gICAgc2hhZG93Q2FzdGVyLnJvdGF0ZShWZWN0b3IzLlVwKCksIDAuMDEpO1xuICB9KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgIGVuZ2luZS5yZXNpemUoKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKFwidHJ5IHRvIGNhbGwgU2NlbmVMb2FkZXIuQXBwZW5kQXN5bmMoKVwiKTtcbiAgY29uc29sZS5sb2coXCJTY2VuZUxvYWRlcjogXCIsIFNjZW5lTG9hZGVyKTtcbiAgLy8gYXdhaXQgU2NlbmVMb2FkZXIuQXBwZW5kQXN5bmMoXCIuL1wiLCBcIkFsaWNpYVNvbGlkLnZybVwiLCBzY2VuZSk7XG4gIC8vIGF3YWl0IFNjZW5lTG9hZGVyLkFwcGVuZEFzeW5jKFwiLi9cIiwgXCI3ODIyNDQ0MzM2NDk3MDA0NTI2LnZybVwiLCBzY2VuZSk7XG4gIGF3YWl0IFNjZW5lTG9hZGVyLkFwcGVuZEFzeW5jKFwiLi9cIiwgXCJkZWZhdWx0LnZybVwiLCBzY2VuZSk7XG5cbiAgY29uc29sZS5sb2coXCJ0cnkgdG8gY2FsbCBhZGRFdmVudExpc3RlbmVyKClcIik7XG4gIGxldCBmaWxlQ291bnQgPSAxO1xuICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlLWlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjaGFuZ2VcIixcbiAgICAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBmaWxlID0gKGV2dCBhcyBhbnkpLnRhcmdldC5maWxlc1swXTtcbiAgICAgIGNvbnNvbGUubG9nKGBsb2FkcyAke2ZpbGUubmFtZX0gJHtmaWxlLnNpemV9IGJ5dGVzYCk7XG4gICAgICBjb25zdCBjdXJyZW50TWVzaENvdW50ID0gc2NlbmUubWVzaGVzLmxlbmd0aDtcbiAgICAgIFNjZW5lTG9hZGVyLkFwcGVuZChcImZpbGU6XCIsIGZpbGUsIHNjZW5lLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBsb2FkZWQgJHtmaWxlLm5hbWV9YCk7XG4gICAgICAgIGZvciAobGV0IGkgPSBjdXJyZW50TWVzaENvdW50OyBpIDwgc2NlbmUubWVzaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgc2NlbmUubWVzaGVzW2ldLnRyYW5zbGF0ZShWZWN0b3IzLlJpZ2h0KCksIDEuNSAqIGZpbGVDb3VudCk7XG4gICAgICAgICAgc2NlbmUubWVzaGVzW2ldLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBmaWxlQ291bnQrKztcbiAgICAgIH0pO1xuICAgIH1cbiAgKTtcbn1cblxuaW50ZXJmYWNlIERlYnVnUHJvcGVydGllcyB7XG4gIHdlYmdsMTogYm9vbGVhbjtcbiAgc2hhZG93OiBib29sZWFuO1xuICBpbnNwZWN0b3I6IGJvb2xlYW47XG59XG5cbmZ1bmN0aW9uIGdldERlYnVnUHJvcGVydGllcygpOiBEZWJ1Z1Byb3BlcnRpZXMge1xuICBjb25zdCBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgcmV0dXJuIHtcbiAgICB3ZWJnbDE6IGhyZWYuaW5jbHVkZXMoXCJ3ZWJnbDFcIiksXG4gICAgc2hhZG93OiBocmVmLmluY2x1ZGVzKFwic2hhZG93XCIpLFxuICAgIGluc3BlY3RvcjogaHJlZi5pbmNsdWRlcyhcImluc3BlY3RvclwiKSxcbiAgfTtcbn1cblxubWFpbjIoKS5jYXRjaCgocmVhc29uKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IocmVhc29uKTtcbn0pO1xuIiwiLyoqIENvcHlyaWdodCAoYykgMjAyMSBUaGUgdjNkIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIGZpbGUsXG4gKiBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICovXG5cbmV4cG9ydCAqIGZyb20gXCIuL3YzZC1jb3JlXCJcbmV4cG9ydCAqIGZyb20gXCIuL2hlbHBlclwiXG4iLCIvKiogQ29weXJpZ2h0IChjKSAyMDIxIFRoZSB2M2QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMgZmlsZSxcbiAqIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKi9cblxuaW1wb3J0IHtIYXJkd2FyZVNjYWxpbmdPcHRpbWl6YXRpb24sXG4gICAgTGVuc0ZsYXJlc09wdGltaXphdGlvbixcbiAgICBOdWxsYWJsZSxcbiAgICBQYXJ0aWNsZXNPcHRpbWl6YXRpb24sXG4gICAgUG9zdFByb2Nlc3Nlc09wdGltaXphdGlvbixcbiAgICBSZW5kZXJUYXJnZXRzT3B0aW1pemF0aW9uLCBTY2VuZSwgU2NlbmVPcHRpbWl6ZXIsIFNjZW5lT3B0aW1pemVyT3B0aW9ucywgVGV4dHVyZU9wdGltaXphdGlvbiB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmVcIjtcbmltcG9ydCB7VjNEQ29yZX0gZnJvbSBcIi4uL2luZGV4XCI7XG5cbmV4cG9ydCBjbGFzcyBWM0RTY2VuZU9wdGltaXplciB7XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b21pemVkIHNjZW5lIG9wdGltaXplciBvcHRpb25zLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogU2NlbmVPcHRpbWl6ZXJPcHRpb25zO1xuICAgIGdldCBvcHRpb25zKCk6IFNjZW5lT3B0aW1pemVyT3B0aW9uc3tcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfVxuICAgIHNldCBvcHRpb25zKHZhbHVlOiBTY2VuZU9wdGltaXplck9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNjZW5lT3B0aW1pemVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IF9vcHRpbWl6ZXI6IFNjZW5lT3B0aW1pemVyO1xuICAgIGdldCBvcHRpbWl6ZXIoKTogU2NlbmVPcHRpbWl6ZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW1pemVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBzY2VuZTogU2NlbmUsXG4gICAgICAgIG9wdGlvbnM/OiBOdWxsYWJsZTxTY2VuZU9wdGltaXplck9wdGlvbnM+LFxuICAgICkge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucyB8fCBWM0RTY2VuZU9wdGltaXplci5DdXN0b21PcHRpbWl6ZXJPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuX29wdGltaXplciA9IG5ldyBTY2VuZU9wdGltaXplcihzY2VuZSwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX29wdGltaXplci50YXJnZXRGcmFtZVJhdGUgPSBWM0RDb3JlLkZSQU1FUkFURTtcbiAgICAgICAgdGhpcy5fb3B0aW1pemVyLnRyYWNrZXJEdXJhdGlvbiA9IDIwMDA7XG5cbiAgICAgICAgdGhpcy5fb3B0aW1pemVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMuc2V0dXBGb2N1c0V2ZW50cyh0aGlzLl9vcHRpbWl6ZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIEN1c3RvbU9wdGltaXplck9wdGlvbnMoKTogU2NlbmVPcHRpbWl6ZXJPcHRpb25zIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBTY2VuZU9wdGltaXplck9wdGlvbnMoKTtcbiAgICAgICAgb3B0aW9ucy5hZGRPcHRpbWl6YXRpb24obmV3IExlbnNGbGFyZXNPcHRpbWl6YXRpb24oMCkpO1xuICAgICAgICBvcHRpb25zLmFkZE9wdGltaXphdGlvbihuZXcgUGFydGljbGVzT3B0aW1pemF0aW9uKDEpKTtcbiAgICAgICAgb3B0aW9ucy5hZGRPcHRpbWl6YXRpb24obmV3IFRleHR1cmVPcHRpbWl6YXRpb24oMSwgNTEyKSk7XG4gICAgICAgIG9wdGlvbnMuYWRkT3B0aW1pemF0aW9uKG5ldyBSZW5kZXJUYXJnZXRzT3B0aW1pemF0aW9uKDIpKTtcbiAgICAgICAgb3B0aW9ucy5hZGRPcHRpbWl6YXRpb24obmV3IFBvc3RQcm9jZXNzZXNPcHRpbWl6YXRpb24oMykpO1xuICAgICAgICBvcHRpb25zLmFkZE9wdGltaXphdGlvbihuZXcgSGFyZHdhcmVTY2FsaW5nT3B0aW1pemF0aW9uKDQsIDIpKTtcblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwRm9jdXNFdmVudHMob3B0aW1pemVyOiBTY2VuZU9wdGltaXplcikge1xuICAgICAgICBpZiAod2luZG93KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldHVwRm9jdXNFdmVudHNcIik7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcHRpbWl6ZXIgc3RhcnRcIik7XG4gICAgICAgICAgICAgICAgb3B0aW1pemVyLnN0YXJ0KCk7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcHRpbWl6ZXIgc3RvcFwiKTtcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZXIuc3RvcCgpO1xuICAgICAgICAgICAgICAgIG9wdGltaXplci5yZXNldCgpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKiogQ29weXJpZ2h0IChjKSAyMDIxIFRoZSB2M2QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMgZmlsZSxcbiAqIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKi9cblxuaW1wb3J0IHtNYXRlcmlhbCwgQmFja2dyb3VuZE1hdGVyaWFsLCBCYXNlVGV4dHVyZSwgQ29sb3IzLCBDdWJlVGV4dHVyZSwgTWVzaCwgU2NlbmUsIFRleHR1cmV9IGZyb20gXCJAYmFieWxvbmpzL2NvcmVcIjtcbmltcG9ydCB7U2t5TWF0ZXJpYWx9IGZyb20gXCJAYmFieWxvbmpzL21hdGVyaWFsc1wiO1xuXG5cbmV4cG9ydCBjbGFzcyB2M0RTa3lCb3gge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2Vudmlyb25tZW50VGV4dHVyZUNETlVybCA9IFwiaHR0cHM6Ly9hc3NldHMuYmFieWxvbmpzLmNvbS9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRTcGVjdWxhci5lbnZcIjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NreWJveDogTWVzaDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9za3lib3hCYXNlOiBNZXNoO1xuICAgIGdldCBza3lib3goKTogTWVzaCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9za3lib3g7XG4gICAgfVxuXG4gICAgcHVibGljIHNreWJveE1hdGVyaWFsOiBCYWNrZ3JvdW5kTWF0ZXJpYWw7XG4gICAgcHVibGljIHNreWJveEJhc2VNYXRlcmlhbDogU2t5TWF0ZXJpYWw7XG4gICAgcHVibGljIHNreWJveFJlZmxlY3Rpb25UZXh0dXJlOiBDdWJlVGV4dHVyZTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBzY2VuZTogU2NlbmUsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdGV4dHVyZU5hbWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJveFNpemU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGVudlRleHR1cmU/OiBCYXNlVGV4dHVyZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5fc2t5Ym94ID0gTWVzaC5DcmVhdGVCb3goXCJTa3lib3hcIiwgYm94U2l6ZSwgdGhpcy5zY2VuZSwgdW5kZWZpbmVkLCBNZXNoLkJBQ0tTSURFKTtcbiAgICAgICAgdGhpcy5fc2t5Ym94QmFzZSA9IE1lc2guQ3JlYXRlQm94KFwiU2t5Ym94QmFzZVwiLCBib3hTaXplKzEsIHRoaXMuc2NlbmUsIHVuZGVmaW5lZCwgTWVzaC5CQUNLU0lERSk7XG4gICAgICAgIHRoaXMuY3JlYXRlTWF0ZXJpYWwodGV4dHVyZU5hbWUpO1xuICAgICAgICB0aGlzLl9za3lib3gubWF0ZXJpYWwgPSB0aGlzLnNreWJveE1hdGVyaWFsO1xuICAgICAgICB0aGlzLl9za3lib3hCYXNlLm1hdGVyaWFsID0gdGhpcy5za3lib3hCYXNlTWF0ZXJpYWw7XG4gICAgICAgIHRoaXMuX3NreWJveC5yZW5kZXJpbmdHcm91cElkID0gMDtcbiAgICAgICAgdGhpcy5fc2t5Ym94QmFzZS5yZW5kZXJpbmdHcm91cElkID0gMDtcbiAgICAgICAgdGhpcy5fc2t5Ym94Lm1hdGVyaWFsLnRyYW5zcGFyZW5jeU1vZGUgPSBNYXRlcmlhbC5NQVRFUklBTF9BTFBIQVRFU1RBTkRCTEVORDtcbiAgICAgICAgdGhpcy5fc2t5Ym94Lm1hdGVyaWFsLmFscGhhID0gMC41O1xuICAgICAgICB0aGlzLnNldHVwSW1hZ2VQcm9jZXNzaW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIHNreWJveCBtYXRlcmlhbCBhbmQgdGhlIHNreWJveCByZWZsZWN0aW9uIHRleHR1cmVcbiAgICAgKiBAcGFyYW0gdGV4dHVyZU5hbWUgbmFtZSAoVVJJKSB0byB0aGUgdGV4dHVyZSBmaWxlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVNYXRlcmlhbCh0ZXh0dXJlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2t5Ym94QmFzZU1hdGVyaWFsID0gbmV3IFNreU1hdGVyaWFsKFwiU2t5Ym94QmFzZU1hdGVyaWFsXCIsIHRoaXMuc2NlbmUpO1xuICAgICAgICB0aGlzLnNreWJveE1hdGVyaWFsID0gbmV3IEJhY2tncm91bmRNYXRlcmlhbChcIlNreWJveE1hdGVyaWFsXCIsIHRoaXMuc2NlbmUpO1xuICAgICAgICB0aGlzLnNreWJveE1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNreWJveE1hdGVyaWFsLnVzZVJHQkNvbG9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2t5Ym94TWF0ZXJpYWwucHJpbWFyeUNvbG9yID0gbmV3IENvbG9yMygxLCAxLCAxKTtcbiAgICAgICAgdGhpcy5za3lib3hNYXRlcmlhbC5lbmFibGVOb2lzZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2t5Ym94UmVmbGVjdGlvblRleHR1cmUgPSBuZXcgQ3ViZVRleHR1cmUodGV4dHVyZU5hbWUsIHRoaXMuc2NlbmUpO1xuICAgICAgICB0aGlzLnNreWJveFJlZmxlY3Rpb25UZXh0dXJlLmNvb3JkaW5hdGVzTW9kZSA9IFRleHR1cmUuU0tZQk9YX01PREU7XG4gICAgICAgIHRoaXMuc2t5Ym94UmVmbGVjdGlvblRleHR1cmUuZ2FtbWFTcGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNreWJveE1hdGVyaWFsLnJlZmxlY3Rpb25UZXh0dXJlID0gdGhpcy5za3lib3hSZWZsZWN0aW9uVGV4dHVyZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgaW1hZ2UgcHJvY2Vzc2luZyBhY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmllZCBvcHRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0dXBJbWFnZVByb2Nlc3NpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmUuaW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5jb250cmFzdCA9IDEuMjtcbiAgICAgICAgdGhpcy5zY2VuZS5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmV4cG9zdXJlID0gMC44O1xuICAgICAgICB0aGlzLnNjZW5lLmltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24udG9uZU1hcHBpbmdFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2VuZS5lbnZpcm9ubWVudFRleHR1cmUgPSB0aGlzLmVudlRleHR1cmUgPyB0aGlzLmVudlRleHR1cmVcbiAgICAgICAgICAgIDogQ3ViZVRleHR1cmUuQ3JlYXRlRnJvbVByZWZpbHRlcmVkRGF0YSh2M0RTa3lCb3guX2Vudmlyb25tZW50VGV4dHVyZUNETlVybCwgdGhpcy5zY2VuZSk7XG4gICAgfVxufVxuIiwiLyoqIENvcHlyaWdodCAoYykgMjAyMSBUaGUgdjNkIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIGZpbGUsXG4gKiBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICovXG5cbmltcG9ydCB7SVNoYWRvd0xpZ2h0LCBMaWdodCxcbiAgICBBbmltYXRpb259IGZyb20gXCJAYmFieWxvbmpzL2NvcmVcIjtcbmltcG9ydCB7Q29sb3IzLCBDb2xvcjQsIFF1YXRlcm5pb24sIFNpemUsIFZlY3RvcjIsIFZlY3RvcjMgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzSVNoYWRvd0xpZ2h0KGxpZ2h0OiBMaWdodCkgOiBsaWdodCBpcyBJU2hhZG93TGlnaHQge1xuICAgIHJldHVybiAobGlnaHQgYXMgSVNoYWRvd0xpZ2h0KS5zZXRTaGFkb3dQcm9qZWN0aW9uTWF0cml4ICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmltYXRpb25EYXRhVHlwZSh2YWx1ZTogYW55KSB7XG4gICAgbGV0IGRhdGFUeXBlID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKCFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgICAgIGRhdGFUeXBlID0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQ7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFF1YXRlcm5pb24pIHtcbiAgICAgICAgZGF0YVR5cGUgPSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9RVUFURVJOSU9OO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBWZWN0b3IzKSB7XG4gICAgICAgIGRhdGFUeXBlID0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfVkVDVE9SMztcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgVmVjdG9yMikge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1ZFQ1RPUjI7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIENvbG9yMykge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0NPTE9SMztcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQ29sb3I0KSB7XG4gICAgICAgIGRhdGFUeXBlID0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfQ09MT1I0O1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBTaXplKSB7XG4gICAgICAgIGRhdGFUeXBlID0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfU0laRTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YVR5cGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkYXRhVHlwZTtcbiAgICB9XG59XG4iLCIvKiogQ29weXJpZ2h0IChjKSAyMDIxIFRoZSB2M2QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMgZmlsZSxcbiAqIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKi9cblxuaW1wb3J0IHsgQXJjUm90YXRlQ2FtZXJhIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9DYW1lcmFzL2FyY1JvdGF0ZUNhbWVyYVwiO1xuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL3NjZW5lXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0VuZ2luZXMvZW5naW5lXCI7XG5pbXBvcnQgeyBTY2VuZUxvYWRlciB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xuaW1wb3J0IHsgQ29sb3IzLCBDb2xvcjQsIFZlY3RvcjMgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGhcIjtcblxuaW1wb3J0IHsgR0xURkxvYWRlckV4dGVuc2lvbk9ic2VydmVyIH0gZnJvbSBcIi4vaW1wb3J0ZXIvbG9hZGVyLW9ic2VydmVyXCI7XG5pbXBvcnQge1xuICBWUk1GaWxlTG9hZGVyLFxuICBWUk1Mb2FkZXJFeHRlbnNpb24sXG4gIFZSTU1hbmFnZXIsXG59IGZyb20gXCIuL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmNcIjtcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiQGJhYnlsb25qcy9sb2FkZXJzL2dsVEYvMi4wXCI7XG5pbXBvcnQgeyBIZW1pc3BoZXJpY0xpZ2h0IH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9MaWdodHMvaGVtaXNwaGVyaWNMaWdodFwiO1xuaW1wb3J0IHtcbiAgQW5pbWF0aW9uLFxuICBBbmltYXRhYmxlLFxuICBDYW1lcmEsXG4gIERlZmF1bHRSZW5kZXJpbmdQaXBlbGluZSxcbiAgRXZlbnRTdGF0ZSxcbiAgSVNoYWRvd0xpZ2h0LFxuICBTaGFkb3dHZW5lcmF0b3IsXG4gIERlcHRoT2ZGaWVsZEVmZmVjdEJsdXJMZXZlbCxcbiAgSUFuaW1hdGlvbktleSxcbiAgRWFzaW5nRnVuY3Rpb24sXG4gIE51bGxhYmxlLFxuICBTY2VuZU9wdGltaXplck9wdGlvbnMsXG59IGZyb20gXCJAYmFieWxvbmpzL2NvcmVcIjtcbmltcG9ydCB7IGdldEFuaW1hdGlvbkRhdGFUeXBlLCBpc0lTaGFkb3dMaWdodCB9IGZyb20gXCIuL3V0aWxpdGllcy90eXBlc1wiO1xuaW1wb3J0IHsgVjNEU2NlbmVPcHRpbWl6ZXIgfSBmcm9tIFwiLi9zY2VuZS9vcHRpbWl6ZXJcIjtcbmltcG9ydCB7IHYzRFNreUJveCB9IGZyb20gXCIuL3NjZW5lL3NreWJveFwiO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxMaWdodCB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTGlnaHRzL2RpcmVjdGlvbmFsTGlnaHRcIjtcblxuZXhwb3J0IGNsYXNzIFYzRENvcmUgaW1wbGVtZW50cyBHTFRGTG9hZGVyRXh0ZW5zaW9uT2JzZXJ2ZXIge1xuICBwdWJsaWMgc3RhdGljIEZSQU1FUkFURSA9IDYwO1xuXG4gIC8qKlxuICAgKiBHTFRGRmlsZUxvYWRlciBwbHVnaW4gZmFjdG9yeVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfdnJtRmlsZUxvYWRlciA9IG5ldyBWUk1GaWxlTG9hZGVyKCk7XG5cbiAgLy8gV2hldGhlciBzdGFydHMgc3ByaW5nIGJvbmVzIGFuaW1hdGlvbiBhdXRvbWF0aWNhbGx5XG4gIHByaXZhdGUgX3NwcmluZ0JvbmVzQXV0b1VwZGF0ZSA9IHRydWU7XG4gIGdldCBzcHJpbmdCb25lc0F1dG9VcGRhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NwcmluZ0JvbmVzQXV0b1VwZGF0ZTtcbiAgfVxuICBzZXQgc3ByaW5nQm9uZXNBdXRvVXBkYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3ByaW5nQm9uZXNBdXRvVXBkYXRlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2hhZG93IGdlbmVyYXRvcnNcbiAgICovXG4gIHByaXZhdGUgX3NoYWRvd0dlbmVyYXRvcnM6IE1hcDxJU2hhZG93TGlnaHQsIFNoYWRvd0dlbmVyYXRvcj4gPSBuZXcgTWFwPFxuICAgIElTaGFkb3dMaWdodCxcbiAgICBTaGFkb3dHZW5lcmF0b3JcbiAgPigpO1xuXG4gIC8qKlxuICAgKiBTY2VuZSBvcHRpbWl6ZXJcbiAgICovXG4gIHByaXZhdGUgX3NjZW5lT3B0aW1pemVyOiBWM0RTY2VuZU9wdGltaXplcjtcblxuICAvKipcbiAgICogUmVuZGVyaW5nIHBpcGVsaW5lXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9yZW5kZXJpbmdQaXBlbGluZTogRGVmYXVsdFJlbmRlcmluZ1BpcGVsaW5lO1xuICBnZXQgcmVuZGVyaW5nUGlwZWxpbmUoKTogRGVmYXVsdFJlbmRlcmluZ1BpcGVsaW5lIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyaW5nUGlwZWxpbmU7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2tzIHdoZW4gbG9hZGluZyBpcyBkb25lXG4gICAqL1xuICBwcml2YXRlIF9vbkxvYWRDb21wbGV0ZUNhbGxiYWNrczogRnVuY3Rpb25bXSA9IFtdO1xuICBwdWJsaWMgYWRkT25Mb2FkQ29tcGxldGVDYWxsYmFja3MoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25Mb2FkQ29tcGxldGVDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlT25Mb2FkQ29tcGxldGVDYWxsYmFjayhjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBjb25zdCBpZHggPSB0aGlzLl9vbkxvYWRDb21wbGV0ZUNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fb25Mb2FkQ29tcGxldGVDYWxsYmFja3Muc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlc2V0T25Mb2FkQ29tcGxldGVDYWxsYmFja3MoKSB7XG4gICAgdGhpcy5fb25Mb2FkQ29tcGxldGVDYWxsYmFja3MgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX2JlZm9yZVJlbmRlckZ1bmM6IChcbiAgICBldmVudERhdGE6IFNjZW5lLFxuICAgIGV2ZW50U3RhdGU6IEV2ZW50U3RhdGVcbiAgKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIHByaXZhdGUgX2FmdGVyUmVuZGVyRnVuYzogKGV2ZW50RGF0YTogU2NlbmUsIGV2ZW50U3RhdGU6IEV2ZW50U3RhdGUpID0+IHZvaWQgPVxuICAgICgpID0+IHtcbiAgICAgIGZvciAoY29uc3QgbWFuYWdlciBvZiB0aGlzLmxvYWRlZFZSTU1hbmFnZXJzKSB7XG4gICAgICAgIGlmICh0aGlzLl9zcHJpbmdCb25lc0F1dG9VcGRhdGUpXG4gICAgICAgICAgbWFuYWdlci51cGRhdGUodGhpcy5lbmdpbmUuZ2V0RGVsdGFUaW1lKCkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgcHVibGljIHVwZGF0ZUJlZm9yZVJlbmRlckZ1bmN0aW9uKFxuICAgIGZ1bmM6IChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB2b2lkXG4gICkge1xuICAgIHRoaXMuX2JlZm9yZVJlbmRlckZ1bmMgPSBmdW5jO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUFmdGVyUmVuZGVyRnVuY3Rpb24oXG4gICAgZnVuYzogKGV2ZW50RGF0YTogU2NlbmUsIGV2ZW50U3RhdGU6IEV2ZW50U3RhdGUpID0+IHZvaWRcbiAgKSB7XG4gICAgdGhpcy5fYWZ0ZXJSZW5kZXJGdW5jID0gZnVuYztcbiAgfVxuXG4gIHByaXZhdGUgX2NhbWVyYU9uQmVmb3JlUmVuZGVyRnVuYzogRnVuY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIF9tYWluQ2FtZXJhOiBDYW1lcmE7XG4gIGdldCBtYWluQ2FtZXJhKCk6IENhbWVyYSB7XG4gICAgcmV0dXJuIHRoaXMuX21haW5DYW1lcmE7XG4gIH1cbiAgc2V0IG1haW5DYW1lcmEodmFsdWU6IENhbWVyYSkge1xuICAgIHRoaXMuX21haW5DYW1lcmEgPSB2YWx1ZTtcbiAgfVxuXG4gIC8vKiBUT0RPOiBQYXRjaGVkLlxuICAvLyBwdWJsaWMgc2t5Qm94OiB2M0RTa3lCb3ggPSBudWxsO1xuICBwdWJsaWMgc2t5Qm94OiB2M0RTa3lCb3g7XG5cbiAgLyoqXG4gICAqIExvYWRlZCBWUk0gTWFuYWdlcnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHB1YmxpYyBsb2FkZWRWUk1NYW5hZ2VyczogVlJNTWFuYWdlcltdID0gW107XG4gIHB1YmxpYyBhZGRWUk1NYW5hZ2VyKG1hbmFnZXI6IFZSTU1hbmFnZXIpIHtcbiAgICBpZiAobWFuYWdlcikgdGhpcy5sb2FkZWRWUk1NYW5hZ2Vycy5wdXNoKG1hbmFnZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBWUk0gTWFuYWdlciBieSBpbmRleFxuICAgKiBAcGFyYW0gaWR4XG4gICAqL1xuICBwdWJsaWMgZ2V0VlJNTWFuYWdlckJ5SW5kZXgoaWR4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gaWR4ID49IDAgJiYgaWR4IDwgdGhpcy5sb2FkZWRWUk1NYW5hZ2Vycy5sZW5ndGhcbiAgICAgID8gdGhpcy5sb2FkZWRWUk1NYW5hZ2Vyc1tpZHhdXG4gICAgICA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFZSTSBNYW5hZ2VyIGJ5IFVSSVxuICAgKiBWUk0gZG9lc24ndCBoYXZlIGFueSBVSUQgaW4gbWV0YWRhdGEuIFRpdGxlIGNhbiBiZSB1bmZpbGxlZCB0b28uXG4gICAqIEZpbGVuYW1lIGlzIHRoZSBvbmx5IHJlYXNvbmFibGUgSUQuXG4gICAqIEBwYXJhbSB1cmlcbiAgICovXG4gIC8vIFZSTSBkb2Vzbid0IGhhdmUgYW55IFVJRCBpbiBtZXRhZGF0YS4gVGl0bGUgY2FuIGJlIHVuZmlsbGVkIHRvby5cbiAgLy8gRmlsZW5hbWUgaXMgdGhlIG9ubHkgcmVhc29uYWJsZSBJRC5cbiAgcHVibGljIGdldFZSTU1hbmFnZXJCeVVSSSh1cmk6IFN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCBnZXRWUk1NYW5hZ2VyQnlVUkkoKVwiKTtcbiAgICBjb25zb2xlLmxvZyhcInVyaTogXCIsIHVyaSk7XG4gICAgY29uc29sZS5sb2coXCJ0aGlzLmxvYWRlZFZSTU1hbmFnZXJzOiBcIiwgdGhpcy5sb2FkZWRWUk1NYW5hZ2Vycyk7XG5cbiAgICBmb3IgKGNvbnN0IG1hbmFnZXIgb2YgdGhpcy5sb2FkZWRWUk1NYW5hZ2Vycykge1xuICAgICAgY29uc29sZS5sb2coXCJtYW5hZ2VyOiBcIiwgbWFuYWdlcik7XG4gICAgICBjb25zb2xlLmxvZyhcIm1hbmFnZXIudXJpOiBcIiwgbWFuYWdlci51cmkpO1xuXG4gICAgICBpZiAobWFuYWdlci51cmkgPT09IHVyaSkgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IGVuZ2luZTogRW5naW5lLFxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxuICAgIC8vIHB1YmxpYyBzY2VuZT86IFNjZW5lLFxuICAgIHB1YmxpYyBzY2VuZTogU2NlbmUsXG4gICAgY2FtZXJhPzogQ2FtZXJhXG4gICkge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCBjb25zdHJ1Y3RvcigpXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiZW5naW5lOiBcIiwgZW5naW5lKTtcbiAgICBjb25zb2xlLmxvZyhcInNjZW5lOiBcIiwgc2NlbmUpO1xuICAgIGNvbnNvbGUubG9nKFwiY2FtZXJhOiBcIiwgY2FtZXJhKTtcblxuICAgIC8vIFJlZ2lzdGVyXG4gICAgdGhpcy5yZWdpc3RlclZybVBsdWdpbigpO1xuICAgIHRoaXMucmVnaXN0ZXJWcm1FeHRlbnNpb24oKTtcblxuICAgIGlmICghdGhpcy5zY2VuZSkgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSh0aGlzLmVuZ2luZSk7XG4gICAgZWxzZSB0aGlzLmVuZ2luZSA9IHRoaXMuc2NlbmUuZ2V0RW5naW5lKCk7XG5cbiAgICB0aGlzLnNldHVwT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZW5hYmxlUmVzaXplKCk7XG5cbiAgICBpZiAoY2FtZXJhKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNhbWVyYTogXCIsIGNhbWVyYSk7XG4gICAgICB0aGlzLl9tYWluQ2FtZXJhID0gY2FtZXJhO1xuICAgICAgdGhpcy5zY2VuZS5zd2l0Y2hBY3RpdmVDYW1lcmEoY2FtZXJhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDYW1lcmEoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZSA9IG5ldyBEZWZhdWx0UmVuZGVyaW5nUGlwZWxpbmUoXG4gICAgICBcImRlZmF1bHRQaXBlbGluZVwiLCAvLyBUaGUgbmFtZSBvZiB0aGUgcGlwZWxpbmVcbiAgICAgIHRydWUsIC8vIERvIHlvdSB3YW50IHRoZSBwaXBlbGluZSB0byB1c2UgSERSIHRleHR1cmU/XG4gICAgICB0aGlzLnNjZW5lLCAvLyBUaGUgc2NlbmUgaW5zdGFuY2VcbiAgICAgIFt0aGlzLl9tYWluQ2FtZXJhXSAvLyBUaGUgbGlzdCBvZiBjYW1lcmFzIHRvIGJlIGF0dGFjaGVkIHRvXG4gICAgKTtcbiAgICB0aGlzLnNldHVwUmVuZGVyaW5nUGlwZWxpbmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGJhY2tncm91bmQgdHJhbnNwYXJlbnQuXG4gICAqL1xuICBwdWJsaWMgdHJhbnNwYXJlbnRCYWNrZ3JvdW5kKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCB0cmFuc3BhcmVudEJhY2tncm91bmQoKVwiKTtcblxuICAgIHRoaXMuc2NlbmUuY2xlYXJDb2xvci5hID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGJhY2tncm91bmQgc29saWQuXG4gICAqL1xuICBwdWJsaWMgc29saWRCYWNrZ3JvdW5kKCkge1xuICAgIHRoaXMuc2NlbmUuY2xlYXJDb2xvci5hID0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgYmFja2dyb3VuZCBjb2xvci5cbiAgICogQHBhcmFtIGNvbG9yXG4gICAqL1xuICBwdWJsaWMgc2V0QmFja2dyb3VuZENvbG9yKGNvbG9yOiBDb2xvcjMpIHtcbiAgICB0aGlzLnNjZW5lLmNsZWFyQ29sb3IgPSBDb2xvcjQuRnJvbUNvbG9yMyhcbiAgICAgIGNvbG9yLFxuICAgICAgdGhpcy5zY2VuZS5jbGVhckNvbG9yLmFcbiAgICApLnRvTGluZWFyU3BhY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYmFja2dyb3VuZCBjb2xvciBmcm9tIGhleCBzdHJpbmcuXG4gICAqIEBwYXJhbSBoZXggSGV4IGNvbG9yIHN0cmluZ1xuICAgKi9cbiAgcHVibGljIHNldEJhY2tncm91bmRDb2xvckhleChoZXg6IHN0cmluZykge1xuICAgIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKENvbG9yMy5Gcm9tSGV4U3RyaW5nKGhleCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBhbWJpZW50IGxpZ2h0LlxuICAgKiBAcGFyYW0gY29sb3IgY29sb3Igb2YgdGhlIGxpZ2h0XG4gICAqL1xuICBwdWJsaWMgYWRkQW1iaWVudExpZ2h0KGNvbG9yPzogQ29sb3IzKSB7XG4gICAgY29uc3QgbGlnaHQgPSBuZXcgSGVtaXNwaGVyaWNMaWdodChcbiAgICAgIFwiVjNESGVtaUxpZ2h0XCIsXG4gICAgICBuZXcgVmVjdG9yMygwLCAxLCAxKSxcbiAgICAgIHRoaXMuc2NlbmVcbiAgICApO1xuICAgIGlmIChjb2xvcikgbGlnaHQuZGlmZnVzZSA9IGNvbG9yO1xuICAgIGxpZ2h0LnNldEVuYWJsZWQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgYmFzaWMgYXJjIHJvdGF0ZSBjYW1lcmEgdG8gc2NlbmUuXG4gICAqIFRPRE86IHRoZXJlIHNlZW1zIHRvIGJlIGEgYnVnIHdoZW4gbWVzaGVzIGFyZSBuZWFyIHRoZSBlZGdlIG9mIGNhbWVyYSBjb25lXG4gICAqIFByb2JhYmx5IGhhcyBzb21ldGhpbmcgdG8gZG8gd2l0aCBjdWxsaW5nXG4gICAqIEBwYXJhbSByYWRpdXMgcm90YXRpb24gcmFkaXVzXG4gICAqL1xuICBwcml2YXRlIGFkZENhbWVyYShyYWRpdXM6IG51bWJlciA9IDMpIHtcbiAgICBjb25zb2xlLmxvZyhcImNhbGwgYWRkQ2FtZXJhKClcIik7XG4gICAgY29uc29sZS5sb2coXCJyYWRpdXM6IFwiLCByYWRpdXMpO1xuXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IEFyY1JvdGF0ZUNhbWVyYShcbiAgICAgIFwiVjNETWFpbkNhbWVyYVwiLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICByYWRpdXMsXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcbiAgICAgIHRoaXMuc2NlbmUsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICBjYW1lcmEubG93ZXJSYWRpdXNMaW1pdCA9IDAuMTtcbiAgICBjYW1lcmEudXBwZXJSYWRpdXNMaW1pdCA9IDIwO1xuICAgIGNhbWVyYS53aGVlbERlbHRhUGVyY2VudGFnZSA9IDAuMDU7XG4gICAgY2FtZXJhLm1pblogPSAwO1xuICAgIGNhbWVyYS5zZXRQb3NpdGlvbihuZXcgVmVjdG9yMygwLCAxLjUsIC01KSk7XG4gICAgY2FtZXJhLmF0dGFjaENvbnRyb2wodGhpcy5lbmdpbmUuZ2V0UmVuZGVyaW5nQ2FudmFzKCkpO1xuXG4gICAgdGhpcy5fbWFpbkNhbWVyYSA9IGNhbWVyYTtcbiAgICB0aGlzLnNjZW5lLnN3aXRjaEFjdGl2ZUNhbWVyYSh0aGlzLl9tYWluQ2FtZXJhLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBhcmMgcm90YXRlIGZvbGxvd2luZyBjYW1lcmEgdG8gVlJNIG1vZGVsLlxuICAgKiBQcm9iYWJseSBoYXMgc29tZXRoaW5nIHRvIGRvIHdpdGggY3VsbGluZ1xuICAgKiBAcGFyYW0gbWFuYWdlciBWUk0gTWFuYWdlciB0byBhdHRhY2ggdGhlIGNhbWVyYSB0b1xuICAgKiBAcGFyYW0gcmFkaXVzIHJvdGF0aW9uIHJhZGl1c1xuICAgKi9cbiAgcHVibGljIGF0dGFjaENhbWVyYVRvKG1hbmFnZXI6IFZSTU1hbmFnZXIsIHJhZGl1czogbnVtYmVyID0gMykge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCBhdHRhY2hDYW1lcmFUbygpXCIpO1xuICAgIGNvbnNvbGUubG9nKFwibWFuYWdlcjogXCIsIG1hbmFnZXIpO1xuICAgIGNvbnNvbGUubG9nKFwicmFkaXVzOiBcIiwgcmFkaXVzKTtcblxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBBcmNSb3RhdGVDYW1lcmEoXG4gICAgICBcIlYzREFyY0NhbWVyYVwiICsgbWFuYWdlci5jYW1lcmFzLmxlbmd0aCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgcmFkaXVzLFxuICAgICAgbWFuYWdlci5yb290TWVzaC5wb3NpdGlvbixcbiAgICAgIHRoaXMuc2NlbmUsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNhbWVyYS5sb3dlclJhZGl1c0xpbWl0ID0gMC4xO1xuICAgIGNhbWVyYS51cHBlclJhZGl1c0xpbWl0ID0gMjA7XG4gICAgY2FtZXJhLndoZWVsRGVsdGFQZXJjZW50YWdlID0gMC4wNTtcbiAgICBjYW1lcmEubWluWiA9IDA7XG4gICAgY2FtZXJhLnNldFBvc2l0aW9uKG5ldyBWZWN0b3IzKDAsIDEuNSwgLTUpKTtcbiAgICBjYW1lcmEuc2V0VGFyZ2V0KG1hbmFnZXIucm9vdE1lc2guZ2V0QWJzb2x1dGVQb3NpdGlvbigpKTtcbiAgICBjYW1lcmEuYXR0YWNoQ29udHJvbCh0aGlzLmVuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXMoKSk7XG5cbiAgICBtYW5hZ2VyLmFwcGVuZENhbWVyYShjYW1lcmEpO1xuXG4gICAgdGhpcy5fY2FtZXJhT25CZWZvcmVSZW5kZXJGdW5jLnB1c2goKCkgPT4ge1xuICAgICAgY2FtZXJhLnNldFRhcmdldChtYW5hZ2VyLnJvb3RNZXNoLmdldEFic29sdXRlUG9zaXRpb24oKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQ3JlYXRlIGEgc2t5Ym94IGZvciB0aGUgc2NlbmUuXG4gICAqIEBwYXJhbSBzaXplIHNpemUgb2YgdGhlIHNreWJveFxuICAgKiBAcGFyYW0gdGV4dHVyZU5hbWUgcGF0aCB0byBza3lib3ggdGV4dHVyZVxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVNreUJveChzaXplOiBudW1iZXIsIHRleHR1cmVOYW1lPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnNreUJveCkge1xuICAgICAgdGhpcy5za3lCb3ggPSBuZXcgdjNEU2t5Qm94KFxuICAgICAgICB0aGlzLnNjZW5lLFxuICAgICAgICB0ZXh0dXJlTmFtZSA/IHRleHR1cmVOYW1lIDogXCJ0ZXh0dXJlL3NreWJveFwiLFxuICAgICAgICBzaXplXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGUgc2hhZG93IGNhc3RlciBmb3IgbGlnaHQuXG4gICAqIEBwYXJhbSBsaWdodCBMaWdodCB0byBlbmFibGUgc2hhZG93cy5cbiAgICovXG4gIHB1YmxpYyBlbmFibGVTaGFib3dzKGxpZ2h0PzogSVNoYWRvd0xpZ2h0KSB7XG4gICAgaWYgKGxpZ2h0KSB7XG4gICAgICBpZiAoIXRoaXMuX3NoYWRvd0dlbmVyYXRvcnMuaGFzKGxpZ2h0KSkge1xuICAgICAgICBjb25zdCBzaGFkb3dHZW5lcmF0b3IgPSBuZXcgU2hhZG93R2VuZXJhdG9yKDEwMjQsIGxpZ2h0KTtcbiAgICAgICAgdGhpcy5zZXR1cFNoYWRvd0dlbmVyYXRvcihzaGFkb3dHZW5lcmF0b3IpO1xuICAgICAgICB0aGlzLl9zaGFkb3dHZW5lcmF0b3JzLnNldChsaWdodCwgc2hhZG93R2VuZXJhdG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBcIkxpZ2h0IFwiICsgbGlnaHQubmFtZSArIFwiIGFscmVhZHkgaGFzIGEgc2hhZG93IGdlbmVyYXRvciFcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGwgb2YgdGhpcy5zY2VuZS5saWdodHMpIHtcbiAgICAgICAgaWYgKGlzSVNoYWRvd0xpZ2h0KGwpKSB7XG4gICAgICAgICAgY29uc3Qgc2hhZG93R2VuZXJhdG9yID0gbmV3IFNoYWRvd0dlbmVyYXRvcigxMDI0LCBsKTtcbiAgICAgICAgICB0aGlzLnNldHVwU2hhZG93R2VuZXJhdG9yKHNoYWRvd0dlbmVyYXRvcik7XG4gICAgICAgICAgdGhpcy5fc2hhZG93R2VuZXJhdG9ycy5zZXQobCwgc2hhZG93R2VuZXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29ycmVzcG9uZGluZyBzaGFkb3cgZ2VuZXJhdG9yIGZvciBsaWdodC5cbiAgICogQHBhcmFtIGxpZ2h0IExpZ2h0IHRvIGdldCBzaGFkb3cgZ2VuZXJhdG9yXG4gICAqL1xuICAvLyogVE9ETzogUGF0Y2hlZC5cbiAgLy8gcHVibGljIGdldFNoYWRvd25HZW5lcmF0b3IobGlnaHQ6IElTaGFkb3dMaWdodCk6IE51bGxhYmxlPFNoYWRvd0dlbmVyYXRvcj4ge1xuICBwdWJsaWMgZ2V0U2hhZG93bkdlbmVyYXRvcihsaWdodDogSVNoYWRvd0xpZ2h0KTogU2hhZG93R2VuZXJhdG9yIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fc2hhZG93R2VuZXJhdG9ycy5nZXQobGlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBzdGFydGluZyBhbmltYXRpb25cbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICogQHBhcmFtIGR1cmF0aW9uXG4gICAqIEBwYXJhbSBmcm9tXG4gICAqIEBwYXJhbSB0b1xuICAgKiBAcGFyYW0gbG9vcE1vZGVcbiAgICogQHBhcmFtIGVhc2luZ0Z1bmN0aW9uXG4gICAqIEBwYXJhbSBlYXNpbmdNb2RlXG4gICAqL1xuICBwdWJsaWMgc3RhcnRRdWlja0FuaW1hdGlvbihcbiAgICB0YXJnZXQ6IGFueSxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcHJvcGVydHk6IHN0cmluZyxcbiAgICBkdXJhdGlvbjogbnVtYmVyLFxuICAgIGZyb206IGFueSxcbiAgICB0bzogYW55LFxuICAgIGxvb3BNb2RlPzogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGVhc2luZ0Z1bmN0aW9uPzogRWFzaW5nRnVuY3Rpb24sXG4gICAgZWFzaW5nTW9kZT86IG51bWJlclxuICApOiBBbmltYXRhYmxlIHtcbiAgICBjb25zdCBhbmltID0gdGhpcy5jcmVhdGVBbmltYXRpb24oXG4gICAgICB0YXJnZXQsXG4gICAgICBuYW1lLFxuICAgICAgcHJvcGVydHksXG4gICAgICBbXG4gICAgICAgIHsgZnJhbWU6IDAsIHZhbHVlOiBmcm9tIH0sXG4gICAgICAgIHsgZnJhbWU6IGR1cmF0aW9uLCB2YWx1ZTogdG8gfSxcbiAgICAgIF0sXG4gICAgICBsb29wTW9kZSxcbiAgICAgIGVhc2luZ0Z1bmN0aW9uLFxuICAgICAgZWFzaW5nTW9kZVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2NlbmUuYmVnaW5EaXJlY3RBbmltYXRpb24oXG4gICAgICBhbmltWzBdLFxuICAgICAgW2FuaW1bMV1dLFxuICAgICAgMCxcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhbmltYXRpb25cbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICogQHBhcmFtIGtleUZyYW1lc1xuICAgKiBAcGFyYW0gbG9vcE1vZGVcbiAgICogQHBhcmFtIGVhc2luZ0Z1bmN0aW9uXG4gICAqIEBwYXJhbSBlYXNpbmdNb2RlXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQW5pbWF0aW9uKFxuICAgIHRhcmdldDogYW55LFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBwcm9wZXJ0eTogc3RyaW5nLFxuICAgIGtleUZyYW1lczogQXJyYXk8SUFuaW1hdGlvbktleT4sXG4gICAgbG9vcE1vZGU/OiBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZWFzaW5nRnVuY3Rpb24/OiBFYXNpbmdGdW5jdGlvbixcbiAgICBlYXNpbmdNb2RlPzogbnVtYmVyXG4gICk6IFthbnksIEFuaW1hdGlvbl0ge1xuICAgIC8vIE1ha2Ugc3VyZSBrZXlGcmFtZXMgaXMgbm90IGVtcHR5XG4gICAgaWYgKGtleUZyYW1lcy5sZW5ndGggPCAxKSB0aHJvdyBFcnJvcihcIktleSBGcmFtZXMgZW1wdHlcIik7XG5cbiAgICAvLyBHZXQgZGF0YSB0eXBlXG4gICAgY29uc3QgZGF0YVR5cGUgPSBnZXRBbmltYXRpb25EYXRhVHlwZShrZXlGcmFtZXNbMF0udmFsdWUpO1xuICAgIGlmIChkYXRhVHlwZSA9PT0gbnVsbClcbiAgICAgIHRocm93IEVycm9yKFwiQ2Fubm90IGRldGVybWluZSBkYXRhIHR5cGUgZnJvbSBrZXlmcmFtZXMhXCIpO1xuXG4gICAgY29uc3QgYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbihcbiAgICAgIG5hbWUsXG4gICAgICBwcm9wZXJ0eSxcbiAgICAgIFYzRENvcmUuRlJBTUVSQVRFLFxuICAgICAgZGF0YVR5cGUsXG4gICAgICBsb29wTW9kZVxuICAgICk7XG4gICAgYW5pbWF0aW9uLnNldEtleXMoa2V5RnJhbWVzKTtcblxuICAgIGlmIChlYXNpbmdGdW5jdGlvbikge1xuICAgICAgaWYgKGVhc2luZ01vZGUpIGVhc2luZ0Z1bmN0aW9uLnNldEVhc2luZ01vZGUoZWFzaW5nTW9kZSk7XG4gICAgICBhbmltYXRpb24uc2V0RWFzaW5nRnVuY3Rpb24oZWFzaW5nRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBbdGFyZ2V0LCBhbmltYXRpb25dO1xuICB9XG5cbiAgcHVibGljIGVuYWJsZU9wdGltaXplcihvcHRpb25zPzogU2NlbmVPcHRpbWl6ZXJPcHRpb25zKSB7XG4gICAgdGhpcy5fc2NlbmVPcHRpbWl6ZXIgPSBuZXcgVjNEU2NlbmVPcHRpbWl6ZXIodGhpcy5zY2VuZSwgb3B0aW9ucyk7XG4gIH1cblxuICAvLyBEb24ndCBtYWtlIHdyYXBwZXJzIHN0YXRpYywgc28gcGx1Z2lucyB3aWxsIGFsd2F5cyBiZSByZWdpc3RlcmVkXG4gIC8qKlxuICAgKiBXcmFwcGVyIGZvciBTY2VuZUxvYWRlci5BcHBlbmRBc3luYy5cbiAgICogQHBhcmFtIHJvb3RVcmwgYSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSByb290IHVybCBmb3IgdGhlIHNjZW5lIGFuZCByZXNvdXJjZXMgb3IgdGhlIGNvbmNhdGVuYXRpb24gb2Ygcm9vdFVSTCBhbmQgZmlsZW5hbWVcbiAgICogQHBhcmFtIHNjZW5lRmlsZW5hbWUgYSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBzY2VuZSBmaWxlIG9yIHN0YXJ0cyB3aXRoIFwiZGF0YTpcIiBmb2xsb3dpbmcgYnkgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhlIHNjZW5lIG9yIGEgRmlsZSBvYmplY3QgKGRlZmF1bHQ6IGVtcHR5IHN0cmluZylcbiAgICovXG4gIHB1YmxpYyBBcHBlbmRBc3luYyhcbiAgICByb290VXJsOiBzdHJpbmcsXG4gICAgc2NlbmVGaWxlbmFtZT86IHN0cmluZyB8IEZpbGVcbiAgKTogUHJvbWlzZTxTY2VuZT4ge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCBBcHBlbmRBc3luY1wiKTtcblxuICAgIHJldHVybiBTY2VuZUxvYWRlci5BcHBlbmRBc3luYyhyb290VXJsLCBzY2VuZUZpbGVuYW1lLCB0aGlzLnNjZW5lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIGZvciBTY2VuZUxvYWRlci5Mb2FkQXN5bmNcbiAgICogQHBhcmFtIHJvb3RVcmwgYSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSByb290IHVybCBmb3IgdGhlIHNjZW5lIGFuZCByZXNvdXJjZXMgb3IgdGhlIGNvbmNhdGVuYXRpb24gb2Ygcm9vdFVSTCBhbmQgZmlsZW5hbWVcbiAgICogQHBhcmFtIHNjZW5lRmlsZW5hbWUgYSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBzY2VuZSBmaWxlIG9yIHN0YXJ0cyB3aXRoIFwiZGF0YTpcIiBmb2xsb3dpbmcgYnkgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhlIHNjZW5lIG9yIGEgRmlsZSBvYmplY3QgKGRlZmF1bHQ6IGVtcHR5IHN0cmluZylcbiAgICovXG4gIHB1YmxpYyBMb2FkQXN5bmMoXG4gICAgcm9vdFVybDogc3RyaW5nLFxuICAgIHNjZW5lRmlsZW5hbWU/OiBzdHJpbmcgfCBGaWxlXG4gICk6IFByb21pc2U8U2NlbmU+IHtcbiAgICByZXR1cm4gU2NlbmVMb2FkZXIuTG9hZEFzeW5jKHJvb3RVcmwsIHNjZW5lRmlsZW5hbWUsIHRoaXMuZW5naW5lKTtcbiAgfVxuXG4gIC8vIEdMVEZMb2FkZXJFeHRlbnNpb25PYnNlcnZlclxuICBwdWJsaWMgb25Mb2FkUmVhZHkoKSB7XG4gICAgY29uc29sZS5sb2coXCJjYWxsIG9uTG9hZFJlYWR5KClcIik7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBcInRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzOiBcIixcbiAgICAgIHRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzXG4gICAgKTtcbiAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5fb25Mb2FkQ29tcGxldGVDYWxsYmFja3MpIHtcbiAgICAgIGYoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVwIGZvciB0aW1lIHVwZGF0ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgc2V0dXBPYnNlcnZhYmxlKCkge1xuICAgIHRoaXMuc2NlbmUub25CZWZvcmVSZW5kZXJPYnNlcnZhYmxlLmFkZChcbiAgICAgIChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB7XG4gICAgICAgIHRoaXMuX2JlZm9yZVJlbmRlckZ1bmMoZXZlbnREYXRhLCBldmVudFN0YXRlKTtcbiAgICAgIH1cbiAgICApO1xuICAgIC8vIENhbWVyYVxuICAgIHRoaXMuc2NlbmUub25CZWZvcmVSZW5kZXJPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5fY2FtZXJhT25CZWZvcmVSZW5kZXJGdW5jKSBmKCk7XG4gICAgfSk7XG4gICAgLy8gVXBkYXRlIHNlY29uZGFyeSBhbmltYXRpb25cbiAgICB0aGlzLnNjZW5lLm9uQWZ0ZXJSZW5kZXJPYnNlcnZhYmxlLmFkZChcbiAgICAgIChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB7XG4gICAgICAgIHRoaXMuX2FmdGVyUmVuZGVyRnVuYyhldmVudERhdGEsIGV2ZW50U3RhdGUpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZVJlc2l6ZSgpIHtcbiAgXHQvLyogVE9ETzogUGF0Y2hlZC5cbiAgICAvLyB0aGlzLmVuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXMoKS5vbnJlc2l6ZSA9ICgpID0+IHtcbiAgICB0aGlzLmVuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXMoKSEub25yZXNpemUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmVuZ2luZS5yZXNpemUoKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFNoYWRvd0dlbmVyYXRvcihzaGFkb3dHZW5lcmF0b3I6IGFueSkge1xuICAgIHNoYWRvd0dlbmVyYXRvci51c2VQZXJjZW50YWdlQ2xvc2VyRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICBzaGFkb3dHZW5lcmF0b3IuZmlsdGVyaW5nUXVhbGl0eSA9IFNoYWRvd0dlbmVyYXRvci5RVUFMSVRZX0hJR0g7XG4gIH1cblxuICAvLyBUT0RPIFVucmVnaXN0ZXJcbiAgcHJpdmF0ZSByZWdpc3RlclZybUV4dGVuc2lvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcImNhbGwgcmVnaXN0ZXJWcm1FeHRlbnNpb24oKVwiKTtcbiAgICBjb25zb2xlLmxvZyhcIlZSTUxvYWRlckV4dGVuc2lvbi5OQU1FOiBcIiwgVlJNTG9hZGVyRXh0ZW5zaW9uLk5BTUUpO1xuXG4gICAgLy8g44Ot44O844OA44O844Gr55m76Yyy44GZ44KLXG4gICAgR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihWUk1Mb2FkZXJFeHRlbnNpb24uTkFNRSwgKGxvYWRlcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJsb2FkZXI6IFwiLCBsb2FkZXIpO1xuICAgICAgY29uc29sZS5sb2coXCJ0aGlzOiBcIiwgdGhpcyk7XG4gICAgICByZXR1cm4gbmV3IFZSTUxvYWRlckV4dGVuc2lvbihsb2FkZXIsIHRoaXMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlclZybVBsdWdpbigpIHtcbiAgICBjb25zb2xlLmxvZyhcImNhbGwgcmVnaXN0ZXJWcm1QbHVnaW4oKVwiKTtcbiAgICBjb25zb2xlLmxvZyhcIlNjZW5lTG9hZGVyOiBcIiwgU2NlbmVMb2FkZXIpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJTY2VuZUxvYWRlci5HZXRQbHVnaW5Gb3JFeHRlbnNpb24oLnZybSkubmFtZTogXCIsXG4gICAgICBTY2VuZUxvYWRlci5HZXRQbHVnaW5Gb3JFeHRlbnNpb24oXCIudnJtXCIpLm5hbWVcbiAgICApO1xuXG4gICAgLy8gaWYgKFxuICAgIC8vICAgU2NlbmVMb2FkZXIgJiZcbiAgICAvLyAgIFNjZW5lTG9hZGVyLkdldFBsdWdpbkZvckV4dGVuc2lvbihcIi52cm1cIikubmFtZSA9PT0gXCJ2cm1cIlxuICAgIC8vICkge1xuICAgIGlmIChTY2VuZUxvYWRlcikge1xuICAgICAgY29uc29sZS5sb2coXCJ0cnkgdG8gY2FsbCBTY2VuZUxvYWRlci5SZWdpc3RlclBsdWdpbigpXCIpO1xuICAgICAgY29uc29sZS5sb2coXCJ0aGlzLl92cm1GaWxlTG9hZGVyOiBcIiwgdGhpcy5fdnJtRmlsZUxvYWRlcik7XG4gICAgICBTY2VuZUxvYWRlci5SZWdpc3RlclBsdWdpbih0aGlzLl92cm1GaWxlTG9hZGVyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwUmVuZGVyaW5nUGlwZWxpbmUoKSB7XG4gICAgdGhpcy5fcmVuZGVyaW5nUGlwZWxpbmUuc2FtcGxlcyA9IDQ7XG4gICAgdGhpcy5fcmVuZGVyaW5nUGlwZWxpbmUuZGVwdGhPZkZpZWxkRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5fcmVuZGVyaW5nUGlwZWxpbmUuZGVwdGhPZkZpZWxkQmx1ckxldmVsID1cbiAgICAgIERlcHRoT2ZGaWVsZEVmZmVjdEJsdXJMZXZlbC5NZWRpdW07XG4gICAgdGhpcy5fcmVuZGVyaW5nUGlwZWxpbmUuZGVwdGhPZkZpZWxkLmZvY3VzRGlzdGFuY2UgPSAyMDAwOyAvLyBkaXN0YW5jZSBvZiB0aGUgY3VycmVudCBmb2N1cyBwb2ludCBmcm9tIHRoZSBjYW1lcmEgaW4gbWlsbGltZXRlcnMgY29uc2lkZXJpbmcgMSBzY2VuZSB1bml0IGlzIDEgbWV0ZXJcbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZS5kZXB0aE9mRmllbGQuZm9jYWxMZW5ndGggPSAxMDsgLy8gZm9jYWwgbGVuZ3RoIG9mIHRoZSBjYW1lcmEgaW4gbWlsbGltZXRlcnNcbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZS5kZXB0aE9mRmllbGQuZlN0b3AgPSAxLjQ7IC8vIGFrYSBGIG51bWJlciBvZiB0aGUgY2FtZXJhIGRlZmluZWQgaW4gc3RvcHMgYXMgaXQgd291bGQgYmUgb24gYSBwaHlzaWNhbCBkZXZpY2VcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWM0RDb3JlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rdjNkX2NvcmVcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdjNkX2NvcmVcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnN+bWFpblwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC10ZXN0LnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=