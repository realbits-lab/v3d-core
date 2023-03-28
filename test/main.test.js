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
    //*-------------------------------------------------------------
    //* TODO: Patched.
    // public constructor(private nodeMap: TransformNodeMap) {}
    constructor(nodeMap) {
        this.nodeMap = nodeMap;
    }
    //*-------------------------------------------------------------
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
    //* TODO: Patched.
    constructor(ext, getBone, options) {
        this.ext = ext;
        const colliderGroups = this.constructColliderGroups(getBone);
        //* TODO: Patched.
        // this.springs = this.constructSprings(getBone, colliderGroups);
        this.springs = this.constructSprings(getBone, colliderGroups, options);
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
    //* TODO: Patched.
    // public async update(deltaTime: number): Promise<void> {
    async update(deltaTime, boneOptions) {
        // ポーズ後のあらぶり防止のため clamp
        deltaTime = Math.max(0.0, Math.min(16.666, deltaTime)) / 1000;
        const promises = this.springs.map((spring) => {
            //*-----------------------------------------------------------------
            //* TODO: Patched.
            // return spring.update(deltaTime);
            return spring.update(deltaTime, boneOptions);
            //*-----------------------------------------------------------------
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
    constructSprings(getBone, colliderGroups, options) {
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
            springs.push(
            //* TODO: Patched.
            // new VRMSpringBone(
            //     spring.comment,
            //     spring.stiffiness,
            //     spring.gravityPower,
            //     new Vector3(
            //         // VRM 右手系Y_UP, -Z_Front から Babylon.js 左手系Y_UP, +Z_Front にする
            //         -spring.gravityDir.x,
            //         spring.gravityDir.y,
            //         -spring.gravityDir.z
            //     ).normalize(),
            //     spring.dragForce,
            //     getBone(spring.center),
            //     spring.hitRadius,
            //     rootBones,
            //     springColliders
            // )
            new _vrm_spring_bone__WEBPACK_IMPORTED_MODULE_2__.VRMSpringBone(spring.comment, options?.stiffness ? options.stiffness : spring.stiffiness, options?.gravityPower ? options.gravityPower : spring.gravityPower, options?.gravityDir
                ? options.gravityDir
                : new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3(
                // VRM 右手系Y_UP, -Z_Front から Babylon.js 左手系Y_UP, +Z_Front にする
                -spring.gravityDir.x, spring.gravityDir.y, -spring.gravityDir.z).normalize(), options?.dragForce ? options.dragForce : spring.dragForce, getBone(spring.center), options?.hitRadius ? options.hitRadius : spring.hitRadius, rootBones, springColliders));
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




//*-----------------------------------------------------------------------------
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
    constructor(comment, 
    //*---------------------------------------------------------------------
    //* TODO: Patched.
    // public readonly stiffness: number,
    // public readonly gravityPower: number,
    // public readonly gravityDir: Vector3,
    // public readonly dragForce: number,
    stiffness, gravityPower, gravityDir, dragForce, 
    //*---------------------------------------------------------------------
    center, 
    //*---------------------------------------------------------------------
    //* TODO: Patched.
    // public readonly hitRadius: number,
    hitRadius, 
    //*---------------------------------------------------------------------
    bones, colliderGroups) {
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
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        this.gravityDir.normalize();
        //*---------------------------------------------------------------------
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
    //* TODO: Patched.
    // public async update(deltaTime: number): Promise<void> {
    async update(deltaTime, boneOptions) {
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        const oldOptions = this.updateOptions(boneOptions);
        //*---------------------------------------------------------------------
        const stiffness = this.stiffness * deltaTime;
        const external = this.gravityDir.scale(this.gravityPower * deltaTime);
        const promises = this.verlets.map((verlet) => {
            return new Promise((resolve) => {
                verlet.update(stiffness, this.dragForce, external, this.colliderGroups);
                resolve();
            });
        });
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        // Restore options
        this.updateOptions(oldOptions);
        //*---------------------------------------------------------------------
        return Promise.all(promises).then(() => {
            /* Do Nothing */
        });
    }
    //*-------------------------------------------------------------------------
    //* TODO: Patched.
    updateOptions(boneOptions) {
        const backupOptions = {
            stiffness: this.stiffness,
            gravityPower: this.gravityPower,
            gravityDir: this.gravityDir.clone(),
            dragForce: this.dragForce,
            hitRadius: this.hitRadius,
        };
        this.stiffness = boneOptions?.stiffness || this.stiffness;
        this.gravityPower = boneOptions?.gravityPower || this.gravityPower;
        this.gravityDir = boneOptions?.gravityDir || this.gravityDir;
        this.dragForce = boneOptions?.dragForce || this.dragForce;
        this.hitRadius = boneOptions?.hitRadius || this.hitRadius;
        return backupOptions;
    }
}


/***/ }),

/***/ "./src/importer/babylon-vrm-loader/src/vrm-extension.ts":
/*!**************************************************************!*\
  !*** ./src/importer/babylon-vrm-loader/src/vrm-extension.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VRMLoaderExtension": () => (/* binding */ VRMLoaderExtension)
/* harmony export */ });
/* harmony import */ var _vrm_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vrm-manager */ "./src/importer/babylon-vrm-loader/src/vrm-manager.ts");
/* harmony import */ var _vrm_material_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vrm-material-generator */ "./src/importer/babylon-vrm-loader/src/vrm-material-generator.ts");


//*-----------------------------------------------------------------------------
/**
 * `extensions` に入る拡張キー
 */
const NAME = 'VRM';
/**
 * VRM 拡張を処理する
 * [Specification](https://github.com/vrm-c/vrm-specification/tree/master/specification/0.0)
 */
class VRMLoaderExtension {
    //*-------------------------------------------------------------------------
    /**
     * @inheritdoc
     */
    constructor(loader, 
    //* TODO: Patched.
    v3DCore) {
        this.loader = loader;
        this.v3DCore = v3DCore;
        //*-------------------------------------------------------------------------
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
        //*-------------------------------------------------------------------------
        //* TODO: Patched.
        /**
         * Loader observers
         */
        this.loaderObservers = [];
        console.log('call constructor()');
        // GLTFLoader has already added rootMesh as __root__ before load extension
        // @see glTFLoader._loadData
        this.meshesFrom = this.loader.babylonScene.meshes.length - 1;
        this.transformNodesFrom = this.loader.babylonScene.transformNodes.length;
        this.materialsFrom = this.loader.babylonScene.materials.length;
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        this.addLoaderObserver(this.v3DCore);
        this.onLoadedCallBack = () => {
            console.log('call this.onLoadedCallBack()');
            console.log('this.manager: ', this.manager);
            v3DCore.addVRMManager(this.manager);
        };
        v3DCore.addOnLoadCompleteCallbacks(this.onLoadedCallBack);
        //*---------------------------------------------------------------------
    }
    /**
     * @inheritdoc
     */
    dispose() {
        this.loader = null;
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        this.loaderObservers = [];
        this.v3DCore.removeOnLoadCompleteCallback(this.onLoadedCallBack);
        //*---------------------------------------------------------------------
    }
    /**
     * @inheritdoc
     */
    onReady() {
        console.log('call onReady()');
        console.log('this.loader: ', this.loader);
        if (!this.loader.gltf.extensions || !this.loader.gltf.extensions[NAME]) {
            console.log('call return');
            return;
        }
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        // const scene = this.loader.babylonScene;
        // const manager = new VRMManager(
        //     this.loader.gltf.extensions[VRMLoaderExtension.NAME],
        //     this.loader.babylonScene,
        //     this.meshesFrom,
        //     this.transformNodesFrom,
        //     this.materialsFrom,
        // );
        // scene.metadata = scene.metadata || {};
        // scene.metadata.vrmManagers = scene.metadata.vrmManagers || [];
        // scene.metadata.vrmManagers.push(this.manager);
        const uri = this.loader.parent.uri;
        this.manager = new _vrm_manager__WEBPACK_IMPORTED_MODULE_0__.VRMManager(this.loader.gltf.extensions[NAME], this.loader.babylonScene, this.meshesFrom, this.transformNodesFrom, this.materialsFrom, uri);
        //*---------------------------------------------------------------------
        this.loader.babylonScene.onDisposeObservable.add(() => {
            // Scene dispose 時に Manager も破棄する
            //*-----------------------------------------------------------------
            //* TODO: Patched.
            // manager.dispose();
            this.manager.dispose();
            // this.loader.babylonScene.metadata.vrmManagers = [];
            //*-----------------------------------------------------------------
        });
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        console.log('try to call observer.onLoadReady()');
        for (const observer of this.loaderObservers) {
            console.log('observer: ', observer);
            observer.onLoadReady();
        }
        //*---------------------------------------------------------------------
    }
    /**
     * @inheritdoc
     */
    //* TODO: Patched.
    // public _loadVertexDataAsync(context: string, primitive: IMeshPrimitive, babylonMesh: Mesh) {
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
        return new _vrm_material_generator__WEBPACK_IMPORTED_MODULE_1__.VRMMaterialGenerator(this.loader).generate(context, material, mesh, babylonDrawMode, assign);
    }
    //*-------------------------------------------------------------------------
    //* TODO: Patched.
    /**
     * Add observer
     */
    addLoaderObserver(observer) {
        this.loaderObservers.push(observer);
    }
}
//*-------------------------------------------------------------------------
//* TODO: Patched.
VRMLoaderExtension.NAME = 'VRM';
//*-----------------------------------------------------------------------------
//* TODO: Patched.
// ローダーに登録する
// GLTFLoader.RegisterExtension(NAME, (loader) => new VRMLoaderExtension(loader));
//*-----------------------------------------------------------------------------


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
/* harmony import */ var _babylonjs_loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/loaders/glTF/glTFFileLoader */ "./node_modules/@babylonjs/loaders/glTF/glTFFileLoader.js");
//*-----------------------------------------------------------------------------
//* TODO: Patched.
// import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
//*-----------------------------------------------------------------------------

//*-----------------------------------------------------------------------------
/**
 * VRM/VCI ファイルを読み込めるようにする
 * 拡張子を変更しただけ
 */
class VRMFileLoader extends _babylonjs_loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFFileLoader {
    constructor() {
        super(...arguments);
        this.name = 'vrm';
        this.extensions = {
            '.vrm': { isBinary: true },
            '.vci': { isBinary: true },
        };
        this.vrmManager = null;
        //*-------------------------------------------------------------------------
    }
    //*-------------------------------------------------------------------------
    createPlugin() {
        return new VRMFileLoader();
    }
    //*-------------------------------------------------------------------------
    //* TODO: Patched.
    loadAsync(scene, data, rootUrl, onProgress, fileName) {
        this.uri = rootUrl;
        if (fileName)
            this.uri += fileName;
        return super.loadAsync(scene, data, rootUrl, onProgress, fileName);
    }
}
//*-----------------------------------------------------------------------------
//* TODO: Patched.
// if (SceneLoader) {
//     SceneLoader.RegisterPlugin(new VRMFileLoader());
// }
//*-----------------------------------------------------------------------------


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
/* harmony export */   "VRMManager": () => (/* binding */ VRMManager),
/* harmony export */   "morphingTargetProperty": () => (/* binding */ morphingTargetProperty)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/* harmony import */ var _secondary_animation_spring_bone_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./secondary-animation/spring-bone-controller */ "./src/importer/babylon-vrm-loader/src/secondary-animation/spring-bone-controller.ts");
/* harmony import */ var _humanoid_bone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./humanoid-bone */ "./src/importer/babylon-vrm-loader/src/humanoid-bone.ts");
/* harmony import */ var _material_value_binding_merger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./material-value-binding-merger */ "./src/importer/babylon-vrm-loader/src/material-value-binding-merger.ts");




//*-----------------------------------------------------------------------------
//* TODO: Patched.
class morphingTargetProperty {
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = Math.max(0, Math.min(1, value));
        this.manager.morphing(this.label, value);
    }
    constructor(label, value, manager) {
        this.label = label;
        this.manager = manager;
        this._value = value;
    }
}
/**
 * VRM キャラクターを動作させるためのマネージャ
 */
class VRMManager {
    get transformNodeTree() {
        return this._transformNodeTree;
    }
    get cameras() {
        return this._cameras;
    }
    appendCamera(camera) {
        this._cameras.push(camera);
    }
    resetCameras() {
        this._cameras = [];
    }
    /**
     *
     * @param ext glTF.extensions.VRM の中身 json
     * @param scene
     * @param meshesFrom この番号以降のメッシュがこの VRM に該当する
     * @param transformNodesFrom この番号以降の TransformNode がこの VRM に該当する
     * @param materialsNodesFrom この番号以降の Material がこの VRM に該当する
     //* TODO: Patched.
     * @param uri URI this manager belongs to
     */
    constructor(ext, scene, meshesFrom, transformNodesFrom, materialsNodesFrom, 
    //* TODO: Patched.
    uri) {
        this.ext = ext;
        this.scene = scene;
        this.meshesFrom = meshesFrom;
        this.transformNodesFrom = transformNodesFrom;
        this.materialsNodesFrom = materialsNodesFrom;
        this.uri = uri;
        this.isBinaryMorphMap = {};
        this.morphTargetMap = {};
        this.materialValueBindingMergerMap = {};
        this.presetMorphTargetMap = {};
        this.transformNodeMap = {};
        this.transformNodeCache = {};
        this.meshCache = {};
        /**
         * This is necessary because of the way BabylonJS animation works
         */
        this.MorphTargetPropertyMap = {};
        this._cameras = [];
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
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        //* TODO: Handle later.
        // this.removeDuplicateSkeletons();
        this._rootSkeleton = this.getRootSkeletonNode();
        // Rename __root__ node
        this.rootMesh.name = VRMManager.ROOT_MESH_PREFIX + this.scene.getNodes().filter((e) => e.name.includes(VRMManager.ROOT_MESH_PREFIX)).length;
        //*---------------------------------------------------------------------
    }
    //*-------------------------------------------------------------------------
    //* TODO: Patched.
    /**
     * Remove duplicate skeletons when importing VRM.
     * Only tested on VRoidStudio output files.
     * @private
     */
    removeDuplicateSkeletons() {
        let skeleton = null;
        for (const nodeIndex of Object.keys(this.meshCache).map(Number)) {
            const meshes = this.meshCache[nodeIndex];
            if (meshes.length && meshes[0].skeleton) {
                if (!skeleton) {
                    skeleton = meshes[0].skeleton;
                    if (this._rootMesh) {
                        const rootBone = skeleton.bones[0];
                        // Usually it is called "Root", but there are exceptions
                        if (rootBone.name !== 'Root')
                            console.warn('The first bone has a different name than "Root"');
                    }
                }
                else {
                    // weak sanity check
                    if (skeleton.bones.length != meshes[0].skeleton.bones.length)
                        console.warn('Skeletons have different numbers of bones!');
                    meshes[0].skeleton.dispose();
                    for (const mesh of meshes) {
                        mesh.skeleton = skeleton;
                    }
                }
            }
        }
    }
    /**
     * Find the root node of skeleton.
     * @private
     */
    getRootSkeletonNode() {
        const rootMeshChildren = this._rootMesh.getChildren((node) => {
            return node.name === 'Root' || node.name === 'Armature';
        });
        if (rootMeshChildren.length > 0)
            return rootMeshChildren[0];
        else {
            // Try to find in scene directly
            const rootMeshChild = this.scene.getNodeByName('Root') ? this.scene.getNodeByName('Root') : this.scene.getNodeByName('Armature');
            if (rootMeshChild && !rootMeshChild.parent)
                return rootMeshChild;
            else
                throw Error('Cannot find root skeleton node!');
        }
    }
    //*-------------------------------------------------------------------------
    //*-------------------------------------------------------------------------
    //* TODO: Patched.
    /**
     * Secondary Animation を更新する
     *
     * @param deltaTime 前フレームからの経過秒数(sec)
     //* TODO: Patched.
     * @param boneOptions
     */
    // public async update(deltaTime: number): Promise<void> {
    //     await this.springBoneController.update(deltaTime);
    // }
    async update(deltaTime, boneOptions) {
        await this.springBoneController.update(deltaTime, boneOptions);
    }
    //*-------------------------------------------------------------------------
    /**
     * 破棄処理
     */
    dispose() {
        this.springBoneController.dispose();
        this._humanoidBone.dispose();
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        this._rootSkeleton.dispose();
        if (this._rootMesh)
            this._rootMesh.dispose();
        //*---------------------------------------------------------------------
        this.morphTargetMap = null;
        this.materialValueBindingMergerMap = null;
        this.presetMorphTargetMap = null;
        this.transformNodeMap = null;
        this.transformNodeCache = null;
        this.meshCache = null;
        this._rootMesh = null;
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        this.MorphTargetPropertyMap = null;
        this._cameras = null;
        this._transformNodeTree = null;
        //*---------------------------------------------------------------------
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
    //*-------------------------------------------------------------------------
    //* TODO: Patched.
    /**
     * ボーン名からそのボーンに該当する TransformNode を取得する
     *
     * @param name HumanBoneName
     * @deprecated Use humanoidBone getter instead. This method will delete at v2.
     */
    // public getBone(name: HumanBoneName): Nullable<TransformNode> {
    //     return this.transformNodeMap[name] || null;
    // }
    get rootSkeletonNode() {
        return this._rootSkeleton;
    }
    //*-------------------------------------------------------------------------
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
    //*-------------------------------------------------------------------------
    //* TODO: Patched.
    /**
     * mesh 番号からメッシュを探す
     * gltf の mesh 番号は `metadata.gltf.pointers` に記録されている
     * @deprecated Use findMeshes instead. This method has broken.
     */
    // public findMesh(meshIndex: number): Nullable<Mesh> {
    //     return (this.meshCache[meshIndex] && this.meshCache[meshIndex][0]) || null;
    // }
    /**
     * Find index of s specific TransformNode from cache
     * @param node
     */
    indexOfTransformNode(node) {
        for (const [k, v] of Object.entries(this.transformNodeCache)) {
            if (node == v)
                return parseInt(k, 10);
        }
        return -1;
    }
    //*-------------------------------------------------------------------------
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
                    //*---------------------------------------------------------
                    //* TODO: Patched.
                    this.MorphTargetPropertyMap[g.name] = new morphingTargetProperty(g.name, 0, this);
                    //*---------------------------------------------------------
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
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        const treePreArr = [];
        //*---------------------------------------------------------------------
        this.ext.humanoid.humanBones.forEach((b) => {
            const node = this.findTransformNode(b.node);
            if (!node) {
                return;
            }
            this.transformNodeMap[b.bone] = node;
            //*-----------------------------------------------------------------
            //* TODO: Patched.
            treePreArr.push({ id: b.node, name: b.bone, parent: this.indexOfTransformNode(node.parent) });
            //*-----------------------------------------------------------------
        });
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        const tree = this.hierarchy(treePreArr);
        if (tree.length === 0)
            throw Error('Failed to construct bone hierarchy tree!');
        this._transformNodeTree = tree[0];
        //*---------------------------------------------------------------------
    }
    //*-------------------------------------------------------------------------
    //* TODO: Patched.
    hierarchy(data) {
        const tree = [];
        const childOf = {};
        data.forEach((item) => {
            const id = item.id;
            const parent = item.parent;
            childOf[id] = childOf[id] || [];
            item.children = childOf[id];
            // Assume Hips is root
            if (parent != null && this.transformNodeCache[parent].parent != this._rootMesh && item.name.toLowerCase() !== 'hips') {
                (childOf[parent] = childOf[parent] || []).push(item);
            }
            else {
                tree.push(item);
            }
        });
        return tree;
    }
    //*-------------------------------------------------------------------------
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
                    //*---------------------------------------------------------
                    //* TODO: Patched.
                    // const nodeIndex = parseInt((pointer as string).substr(7), 10);
                    const nodeIndex = parseInt(pointer.substring(7), 10);
                    //*---------------------------------------------------------
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
    //*-------------------------------------------------------------------------
    //* TODO: Patched.
    /**
     * Set whether shadow are received.
     * @param enabled
     */
    setShadowEnabled(enabled) {
        for (const nodeIndex of Object.keys(this.meshCache).map(Number)) {
            const meshes = this.meshCache[nodeIndex];
            for (const mesh of meshes) {
                mesh.receiveShadows = enabled;
            }
        }
    }
}
//*-------------------------------------------------------------------------
//* TODO: Patched.
VRMManager.ROOT_MESH_PREFIX = 'vrm_root_';


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
/* harmony import */ var _importer_babylon_vrm_loader_src__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./importer/babylon-vrm-loader/src */ "./src/importer/babylon-vrm-loader/src/vrm-extension.ts");
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
    constructor(engine, scene, camera) {
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
        this.skyBox = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3YzZC1jb3JlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9lcnJvcnMudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9odW1hbm9pZC1ib25lLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvbWF0ZXJpYWwtdmFsdWUtYmluZGluZy1tZXJnZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9zZWNvbmRhcnktYW5pbWF0aW9uL2NvbGxpZGVyLWdyb3VwLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvc2Vjb25kYXJ5LWFuaW1hdGlvbi9jb2xsaWRlci50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3NlY29uZGFyeS1hbmltYXRpb24vc3ByaW5nLWJvbmUtY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3NlY29uZGFyeS1hbmltYXRpb24vdnJtLXNwcmluZy1ib25lLWxvZ2ljLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvc2Vjb25kYXJ5LWFuaW1hdGlvbi92cm0tc3ByaW5nLWJvbmUudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy92cm0tZXh0ZW5zaW9uLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvdnJtLWZpbGUtbG9hZGVyLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvdnJtLWludGVyZmFjZXMudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy92cm0tbWFuYWdlci50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3ZybS1tYXRlcmlhbC1nZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW5kZXgtdGVzdC50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9zY2VuZS9vcHRpbWl6ZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvc2NlbmUvc2t5Ym94LnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL3V0aWxpdGllcy90eXBlcy50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy92M2QtY29yZS50cyIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3YzZC1jb3JlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3YzZC1jb3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3YzZC1jb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3YzZC1jb3JlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widjNkLWNvcmVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widjNkLWNvcmVcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyoqIENvcHlyaWdodCAoYykgMjAyMSBUaGUgdjNkIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIGZpbGUsXG4gKiBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICovXG5cbmltcG9ydCB7QWJzdHJhY3RNZXNoLCBNZXNoLCBOdWxsYWJsZSwgU2hhZG93R2VuZXJhdG9yLCBTa2VsZXRvbiwgU2tlbGV0b25WaWV3ZXIsIFRyYW5zZm9ybU5vZGUgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlXCI7XG5pbXBvcnQgVjNEQ29yZSBmcm9tIFwiLi92M2QtY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgVjNESGVscGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNvcmU6IFYzRENvcmVcbiAgICApIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIGEgbm9kZSBjYXN0IHNoYWRvdyBmcm9tIGEgU2hhZG93R2VuZXJhdG9yXG4gICAgICogQHBhcmFtIHNoYWRvd0dlbmVyYXRvclxuICAgICAqIEBwYXJhbSBub2RlTmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBhZGROb2RlVG9TaGFkb3dDYXN0ZXJCeU5hbWUoXG4gICAgICAgIHNoYWRvd0dlbmVyYXRvcjogTnVsbGFibGU8U2hhZG93R2VuZXJhdG9yPixcbiAgICAgICAgbm9kZU5hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICBzaGFkb3dHZW5lcmF0b3I/LmFkZFNoYWRvd0Nhc3Rlcih0aGlzLmNvcmUuc2NlbmUuZ2V0Tm9kZUJ5TmFtZShub2RlTmFtZSkgYXMgTWVzaCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBub2RlcyBjYXN0IHNoYWRvdyBmcm9tIGEgU2hhZG93R2VuZXJhdG9yXG4gICAgICogQHBhcmFtIHNoYWRvd0dlbmVyYXRvclxuICAgICAqIEBwYXJhbSBub2RlTmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBhZGROb2RlVG9TaGFkb3dDYXN0ZXJDb250YWluc05hbWUoXG4gICAgICAgIHNoYWRvd0dlbmVyYXRvcjogTnVsbGFibGU8U2hhZG93R2VuZXJhdG9yPixcbiAgICAgICAgbm9kZU5hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICBpZiAoIXNoYWRvd0dlbmVyYXRvcikgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5jb3JlLnNjZW5lLmdldE5vZGVzKCkpIHtcbiAgICAgICAgICAgIGlmIChub2RlICYmIG5vZGUubmFtZS5pbmNsdWRlcyhub2RlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBzaGFkb3dHZW5lcmF0b3IuYWRkU2hhZG93Q2FzdGVyKG5vZGUgYXMgTWVzaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIG5vZGUgcmVjZWl2ZSBzaGFkb3dcbiAgICAgKiBAcGFyYW0gbm9kZU5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgbWFrZVJlY2VpdmVTaGFkb3dCeU5hbWUobm9kZU5hbWU6IHN0cmluZykge1xuICAgICAgICAodGhpcy5jb3JlLnNjZW5lLmdldE5vZGVCeU5hbWUobm9kZU5hbWUpIGFzIE1lc2gpLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIG5vZGVzIHJlY2VpdmUgc2hhZG93XG4gICAgICogQHBhcmFtIG5vZGVOYW1lXG4gICAgICovXG4gICAgcHVibGljIG1ha2VSZWNlaXZlU2hhZG93Q29udGFpbnNOYW1lKG5vZGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuY29yZS5zY2VuZS5nZXROb2RlcygpKSB7XG4gICAgICAgICAgICBpZiAobm9kZSAmJiBub2RlLm5hbWUuaW5jbHVkZXMobm9kZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgKG5vZGUgYXMgTWVzaCkucmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dTa2VsZXRvbkRlYnVnKFxuICAgICAgICBza2VsZXRvbjogU2tlbGV0b24sXG4gICAgICAgIG1lc2g6IEFic3RyYWN0TWVzaFxuICAgICkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgcGF1c2VBbmltYXRpb25zIDogdHJ1ZSwgLy9UcnVlIG9yIEZhbHNlIGZsYWcgdG8gcGF1c2UgdGhlIGFuaW1hdGlvbnMgd2hpbGUgdHJ5aW5nIHRvIGNvbnN0cnVjdCB0aGUgZGVidWdNZXNoLiBEZWZhdWx0OiBUcnVlXG4gICAgICAgICAgICByZXR1cm5Ub1Jlc3QgOiBmYWxzZSwgLy9GbGFnIHRvIGZvcmNlIHRoZSBza2VsZXRvbiBiYWNrIGludG8gaXRzIHJlc3RQb3NlIGJlZm9yZSBjb25zdHJ1Y3RpbmcgdGhlIGRlYnVnTWVzaC4gRGVmYXVsdDogRmFsc2VcbiAgICAgICAgICAgIGNvbXB1dGVCb25lc1VzaW5nU2hhZGVycyA6IHRydWUsIC8vVGVsbCB0aGUgZGVidWdNZXNoIHRvIHVzZSBvciBub3QgdXNlIHRoZSBHUFUgZm9yIGl0cyBjYWxjdWxhdGlvbnMsIGlmIHlvdSBldmVyIHdhbnQgdG8gZG8gcGlja2luZyBvbiB0aGUgbWVzaCB0aGlzIHdpbGwgbmVlZCB0byBiZSBGYWxzZS4gRGVmYXVsdDogVHJ1ZVxuICAgICAgICAgICAgdXNlQWxsQm9uZXMgOiB0cnVlLCAvL1Zpc3VhbGl6ZSBhbGwgYm9uZXMgb3Igc2tpcCB0aGUgb25lcyB3aXRoIG5vIGluZmx1ZW5jZS5cbiAgICAgICAgICAgIGRpc3BsYXlNb2RlIDogU2tlbGV0b25WaWV3ZXIuRElTUExBWV9MSU5FUywgLy9BIHZhbHVlIHRoYXQgY29udHJvbHMgd2hpY2ggZGlzcGxheSBtb2RlIHRvIHVzZS4gKFNrZWxldG9uVmlld2VyLkRJU1BMQVlfTElORVMgPSAwLCBTa2VsZXRvblZpZXdlci5ESVNQTEFZX1NQSEVSRVMgPSAxLCBTa2VsZXRvblZpZXdlci5ESVNQTEFZX1NQSEVSRV9BTkRfU1BVUlMgPSAyKS4gRGVmYXVsdCA9IDAuXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNrZWxldG9uVmlld2VyID0gbmV3IFNrZWxldG9uVmlld2VyKFxuICAgICAgICAgICAgc2tlbGV0b24sIC8vVGFyZ2V0IFNrZWxldG9uXG4gICAgICAgICAgICBtZXNoLCAvL1RoYXQgc2tlbGV0b25zIEF0dGFjaGVkIE1lc2ggb3IgYSBOb2RlIHdpdGggdGhlIHNhbWUgZ2xvYmFsTWF0cml4XG4gICAgICAgICAgICB0aGlzLmNvcmUuc2NlbmUsIC8vVGhlIFNjZW5lIHNjb3BlXG4gICAgICAgICAgICB0cnVlLCAvL2F1dG9VcGRhdGVCb25lTWF0cmljZXM/XG4gICAgICAgICAgICBtZXNoLnJlbmRlcmluZ0dyb3VwSWQgPiAwID8gbWVzaC5yZW5kZXJpbmdHcm91cElkICsgMSA6IDEsIC8vIHJlbmRlcmluZ0dyb3VwSWRcbiAgICAgICAgICAgIG9wdGlvbnMsIC8vQ29uZmlndXJhdGlvbiBPcHRpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHNrZWxldG9uVmlld2VyO1xuICAgIH1cbn1cbiIsIi8qKlxyXG4gKiBUaHJvd3Mgd2hlbiBtYW5kYXRvcnkgYm9uZSBjb3VsZCBub3QgZmluZFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJvbmVOb3RGb3VuZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSAnQm9uZU5vdEZvdW5kRXJyb3InO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYm9uZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGBCb25lOiR7Ym9uZU5hbWV9IE5vdEZvdW5kYCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlJztcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IEJvbmVOb3RGb3VuZEVycm9yIH0gZnJvbSAnLi9lcnJvcnMnO1xyXG5cclxuaW50ZXJmYWNlIFRyYW5zZm9ybU5vZGVNYXAge1xyXG4gICAgW25hbWU6IHN0cmluZ106IFRyYW5zZm9ybU5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIdW1hbm9pZEJvbmUg44KS5Y+W5b6X44GZ44KL44Oh44K944OD44OJ576kXHJcbiAqIEBzZWUgaHR0cHM6Ly9kb2NzLnVuaXR5M2QuY29tL2phLzIwMTguMy9TY3JpcHRSZWZlcmVuY2UvSHVtYW5Cb2R5Qm9uZXMuaHRtbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEh1bWFub2lkQm9uZSB7XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIC8vIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vZGVNYXA6IFRyYW5zZm9ybU5vZGVNYXApIHt9XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIG5vZGVNYXA6IFRyYW5zZm9ybU5vZGVNYXApIHt9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMubm9kZU1hcCBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwu1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGhpcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnaGlwcycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6blpKrjgoLjgoJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0VXBwZXJMZWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnbGVmdFVwcGVyTGVnJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+WkquOCguOCglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0VXBwZXJMZWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgncmlnaHRVcHBlckxlZycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bjgbLjgZZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0TG93ZXJMZWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnbGVmdExvd2VyTGVnJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+OBsuOBllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TG93ZXJMZWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgncmlnaHRMb3dlckxlZycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6botrPpppZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0Rm9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdsZWZ0Rm9vdCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PotrPpppZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodEZvb3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgncmlnaHRGb290Jyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiEiuakjuOBruesrOS4gFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNwaW5lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3NwaW5lJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiDuFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNoZXN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2NoZXN0Jyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmmllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5lY2soKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnbmVjaycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpoK1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBoZWFkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2hlYWQnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6IKpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFNob3VsZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2xlZnRTaG91bGRlcicpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PogqlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFNob3VsZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3JpZ2h0U2hvdWxkZXInKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5LiK6IWVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFVwcGVyQXJtKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2xlZnRVcHBlckFybScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PkuIrohZVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFVwcGVyQXJtKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3JpZ2h0VXBwZXJBcm0nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem44Gy44GYXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdExvd2VyQXJtKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2xlZnRMb3dlckFybScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PjgbLjgZhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodExvd2VyQXJtKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3JpZ2h0TG93ZXJBcm0nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5omL6aaWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdEhhbmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnbGVmdEhhbmQnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5omL6aaWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRIYW5kKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3JpZ2h0SGFuZCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bjgaTjgb7lhYgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFRvZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0VG9lcycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PjgaTjgb7lhYgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRUb2VzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRUb2VzJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puebrihPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0RXllKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdEV5ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7Pnm64oT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRFeWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodEV5ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpoY4oT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgamF3KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnamF3Jyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puimquaMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0VGh1bWJQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRUaHVtYlByb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puimquaMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0VGh1bWJJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0VGh1bWJJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6Kaq5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRUaHVtYkRpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRUaHVtYkRpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bkurrlt67jgZfmjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdEluZGV4UHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0SW5kZXhQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bkurrlt67jgZfmjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdEluZGV4SW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puS6uuW3ruOBl+aMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0SW5kZXhEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0SW5kZXhEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5Lit5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRNaWRkbGVQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRNaWRkbGVQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bkuK3mjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdE1pZGRsZUludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5Lit5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRNaWRkbGVEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0TWlkZGxlRGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puiWrOaMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0UmluZ1Byb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFJpbmdQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bolqzmjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFJpbmdJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0UmluZ0ludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bolqzmjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFJpbmdEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0UmluZ0Rpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6blsI/mjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdExpdHRsZVByb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdExpdHRsZVByb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puWwj+aMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdExpdHRsZUludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6blsI/mjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdExpdHRsZURpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRMaXR0bGVEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6Kaq5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0VGh1bWJQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0VGh1bWJQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PopqrmjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRUaHVtYkludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0VGh1bWJJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6Kaq5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0VGh1bWJEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodFRodW1iRGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+S6uuW3ruOBl+aMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodEluZGV4UHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodEluZGV4UHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5Lq65beu44GX5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0SW5kZXhJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodEluZGV4SW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+S6uuW3ruOBl+aMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodEluZGV4RGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRJbmRleERpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PkuK3mjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRNaWRkbGVQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0TWlkZGxlUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5Lit5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5Lit5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TWlkZGxlRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRNaWRkbGVEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6Jas5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0UmluZ1Byb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRSaW5nUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6Jas5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0UmluZ0ludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0UmluZ0ludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PolqzmjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRSaW5nRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRSaW5nRGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+Wwj+aMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodExpdHRsZVByb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRMaXR0bGVQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PlsI/mjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodExpdHRsZUludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PlsI/mjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRMaXR0bGVEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodExpdHRsZURpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrog7goT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdXBwZXJDaGVzdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3VwcGVyQ2hlc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/hemgiOODnOODvOODs+OCkuWPluW+l+OBmeOCi+OAguWPluW+l+WHuuadpeOBquOBhOWgtOWQiOOBr+S+i+WkluOCkueZuueUn+OBmeOCi1xyXG4gICAgICpcclxuICAgICAqIEB0aHJvd3MgQm9uZU5vdEZvdW5kRXJyb3JcclxuICAgICAqIEBwYXJhbSBuYW1lIEh1bWFub2lkQm9uZU5hbWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNYW5kYXRvcnlCb25lKG5hbWU6IHN0cmluZyk6IFRyYW5zZm9ybU5vZGUge1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGVNYXBbbmFtZV07XHJcbiAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCb25lTm90Rm91bmRFcnJvcihuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjgqrjg5fjgrfjg6fjg4rjg6vjg5zjg7zjg7PjgpLlj5blvpfjgZnjgotcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBIdW1hbm9pZEJvbmVOYW1lXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0T3B0aW9uYWxCb25lKG5hbWU6IHN0cmluZyk6IE51bGxhYmxlPFRyYW5zZm9ybU5vZGU+IHtcclxuICAgICAgICByZXR1cm4gKHRoaXMubm9kZU1hcCAmJiB0aGlzLm5vZGVNYXBbbmFtZV0pIHx8IG51bGw7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBDb2xvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB7IFZlY3RvcjQgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwsIEJhc2VUZXh0dXJlLCBUZXh0dXJlLCBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZSc7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlJztcclxuaW1wb3J0IHR5cGUgeyBJVlJNQmxlbmRTaGFwZU1hdGVyaWFsQmluZCB9IGZyb20gJy4vdnJtLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsIH0gZnJvbSAnYmFieWxvbi1tdG9vbi1tYXRlcmlhbCc7XHJcblxyXG50eXBlIFN1cHBvcnRlZE1hdGVyaWFsID0gTVRvb25NYXRlcmlhbCB8IFBCUk1hdGVyaWFsO1xyXG5cclxuLyoqXHJcbiAqIGZpcnN0VmFsdWUg44GvIGZhbHNlIOWbuuWumuOBoOOBjOOAgSBVbmlWUk0g44Gr5YCj44Gj44Gm5a6a576p44GX44Gm44GE44KLXHJcbiAqL1xyXG50eXBlIFNldHRlciA9ICh2YWx1ZTogbnVtYmVyLCBmaXJzdFZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG5cclxuY29uc3QgUEJSTWF0ZXJpYWxUZXh0dXJlTWFwOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IGtleW9mIFBCUk1hdGVyaWFsIH0gPSB7XHJcbiAgICBfTWFpblRleDogJ2FsYmVkb1RleHR1cmUnLFxyXG59O1xyXG5cclxuY29uc3QgUEJSTWF0ZXJpYWxDb2xvck1hcDogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBrZXlvZiBQQlJNYXRlcmlhbCB9ID0ge1xyXG4gICAgX0NvbG9yOiAnYWxiZWRvQ29sb3InLFxyXG59O1xyXG5cclxuY29uc3QgTVRvb25NYXRlcmlhbFRleHR1cmVNYXA6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXToga2V5b2YgTVRvb25NYXRlcmlhbCB9ID0ge1xyXG4gICAgX01haW5UZXg6ICdkaWZmdXNlVGV4dHVyZScsXHJcbiAgICBfRW1pc3Npb25NYXA6ICdlbWlzc2l2ZVRleHR1cmUnLFxyXG4gICAgX0J1bXBNYXA6ICdidW1wVGV4dHVyZScsXHJcbiAgICBfU2hhZGVUZXh0dXJlOiAnc2hhZGVUZXh0dXJlJyxcclxuICAgIF9SZWNlaXZlU2hhZG93VGV4dHVyZTogJ3JlY2VpdmVTaGFkb3dUZXh0dXJlJyxcclxuICAgIF9TaGFkaW5nR3JhZGVUZXh0dXJlOiAnc2hhZGluZ0dyYWRlVGV4dHVyZScsXHJcbiAgICBfUmltVGV4dHVyZTogJ3JpbVRleHR1cmUnLFxyXG4gICAgX1NwaGVyZUFkZDogJ21hdENhcFRleHR1cmUnLFxyXG4gICAgX091dGxpbmVXaWR0aFRleHR1cmU6ICdvdXRsaW5lV2lkdGhUZXh0dXJlJyxcclxuICAgIF9VdkFuaW1NYXNrVGV4dHVyZTogJ3V2QW5pbWF0aW9uTWFza1RleHR1cmUnLFxyXG59O1xyXG5cclxuY29uc3QgTVRvb25NYXRlcmlhbENvbG9yTWFwOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IGtleW9mIE1Ub29uTWF0ZXJpYWwgfSA9IHtcclxuICAgIF9Db2xvcjogJ2RpZmZ1c2VDb2xvcicsXHJcbiAgICBfU2hhZGVDb2xvcjogJ3NoYWRlQ29sb3InLFxyXG4gICAgX1JpbUNvbG9yOiAncmltQ29sb3InLFxyXG4gICAgX0VtaXNzaW9uQ29sb3I6ICdlbWlzc2l2ZUNvbG9yJyxcclxuICAgIF9PdXRsaW5lQ29sb3I6ICdvdXRsaW5lQ29sb3InLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iLzRmZmQ5N2MyZTkzMzk2ODNjZTliZjIxZTczZjUxMGJkOTBjMmE1YjIvQXNzZXRzL1ZSTS9SdW50aW1lL0JsZW5kU2hhcGUvTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXIuY3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1fbWF0ZXJpYWxNYXA6IHsgW21hdGVyaWFsTmFtZTogc3RyaW5nXTogU3VwcG9ydGVkTWF0ZXJpYWwgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtX21hdGVyaWFsU2V0dGVyTWFwOiB7IFtiaW5kaW5nS2V5OiBzdHJpbmddOiBTZXR0ZXIgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBtX21hdGVyaWFsVmFsdWVNYXA6IHsgW2JpbmRpbmdLZXk6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcbiAgICBwcml2YXRlIG1fdXNlZDogeyBbdGFyZ2V0S2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYmFzZVZhbHVlQ2FjaGU6IHsgW2JpbmRpbmdLZXk6IHN0cmluZ106IFZlY3RvcjQgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBtYXRlcmlhbFZhbHVlc1RvQXBwbHk6IHsgW2JpbmRpbmdLZXk6IHN0cmluZ106IElWUk1CbGVuZFNoYXBlTWF0ZXJpYWxCaW5kIH0gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbHMgVlJN44Gu5YWoIE1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWxWYWx1ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG1hdGVyaWFsczogTWF0ZXJpYWxbXSwgcHJpdmF0ZSByZWFkb25seSBtYXRlcmlhbFZhbHVlczogSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmRbXSkge1xyXG4gICAgICAgIGlmIChtYXRlcmlhbHMubGVuZ3RoID09PSAwIHx8IG1hdGVyaWFsVmFsdWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOODl+ODreODkeODhuOCo+WQjeOBruWkieaPm+OBq+WvvuW/nOOBl+OBpuOBhOOCiyBNVG9vbk1hdGVyaWFsIOOBqCBQQlJNYXRlcmlhbCDjgpLkv53lrZjjgZnjgotcclxuICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFsIGluc3RhbmNlb2YgTVRvb25NYXRlcmlhbCB8fCBtYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWF0ZXJpYWxNYXBbbWF0ZXJpYWwubmFtZV0gPSBtYXRlcmlhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYmluZGluZ0tleSA9IHRoaXMubWFrZUJpbmRpbmdLZXkobWF0ZXJpYWxWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fbWF0ZXJpYWxTZXR0ZXJNYXBbYmluZGluZ0tleV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMubV9tYXRlcmlhbE1hcFttYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZV07XHJcbiAgICAgICAgICAgIGlmICghbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBiYXNlVmFsdWUgPSB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIG1hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lKTtcclxuICAgICAgICAgICAgaWYgKCFiYXNlVmFsdWUgfHwgbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZS5sZW5ndGggIT09IDQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDjg6Ljg7zjg5XjgqPjg7PjgrDnlKjjgasgYmFzZVZhbHVlICjliJ3mnJ/lgKQpIOOBqCBtYXRlcmlhbFZhbHVlIOOCkuS/neWtmOOBmeOCi1xyXG4gICAgICAgICAgICB0aGlzLmJhc2VWYWx1ZUNhY2hlW2JpbmRpbmdLZXldID0gYmFzZVZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsVmFsdWVzVG9BcHBseVtiaW5kaW5nS2V5XSA9IG1hdGVyaWFsVmFsdWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRWYWx1ZSA9IFZlY3RvcjQuRnJvbUFycmF5KG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUpO1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZU5hbWUgPSBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZTtcclxuICAgICAgICAgICAgLy8gVW5pdHkg44Go5bqn5qiZ57O744GM55Ww44Gq44KL44Gf44KB44CB44OG44Kv44K544OB44Oj44GuIHZPZmZzZXQg44KS5Y+N6Lui44GZ44KLXHJcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoUEJSTWF0ZXJpYWxUZXh0dXJlTWFwKS5zb21lKChrKSA9PiB2YWx1ZU5hbWUuc3RhcnRzV2l0aChrKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZS53ICo9IC0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKE1Ub29uTWF0ZXJpYWxUZXh0dXJlTWFwKS5zb21lKChrKSA9PiB2YWx1ZU5hbWUuc3RhcnRzV2l0aChrKSkpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlLncgKj0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbHVlTmFtZS5lbmRzV2l0aCgnX1NUX1MnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8g44OG44Kv44K544OB44Oj44GuIHXmlrnlkJEg44Gu44G/5pu05paw44GZ44KLXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXR0ZXI6IFNldHRlciA9ICh2YWx1ZSwgZmlyc3RWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZSA9IGZpcnN0VmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBiYXNlVmFsdWUuYWRkKHRhcmdldFZhbHVlLnN1YnRyYWN0KGJhc2VWYWx1ZSkuc2NhbGUodmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lKSEuYWRkKHRhcmdldFZhbHVlLnN1YnRyYWN0KGJhc2VWYWx1ZSkuc2NhbGUodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcmMgPSB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSkhO1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYy54ID0gcHJvcFZhbHVlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjLnogPSBwcm9wVmFsdWUuejtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSwgc3JjKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWF0ZXJpYWxTZXR0ZXJNYXBbYmluZGluZ0tleV0gPSBzZXR0ZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lLmVuZHNXaXRoKCdfU1RfVCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDjg4bjgq/jgrnjg4Hjg6Pjga4gduaWueWQkSDjga7jgb/mm7TmlrDjgZnjgotcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldHRlcjogU2V0dGVyID0gKHZhbHVlLCBmaXJzdFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlID0gZmlyc3RWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGJhc2VWYWx1ZS5hZGQodGFyZ2V0VmFsdWUuc3VidHJhY3QoYmFzZVZhbHVlKS5zY2FsZSh2YWx1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5nZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUpIS5hZGQodGFyZ2V0VmFsdWUuc3VidHJhY3QoYmFzZVZhbHVlKS5zY2FsZSh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lKSE7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjLnkgPSBwcm9wVmFsdWUueTtcclxuICAgICAgICAgICAgICAgICAgICBzcmMudyA9IHByb3BWYWx1ZS53O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lLCBzcmMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9tYXRlcmlhbFNldHRlck1hcFtiaW5kaW5nS2V5XSA9IHNldHRlcjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldHRlcjogU2V0dGVyID0gKHZhbHVlLCBmaXJzdFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlID0gZmlyc3RWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGJhc2VWYWx1ZS5hZGQodGFyZ2V0VmFsdWUuc3VidHJhY3QoYmFzZVZhbHVlKS5zY2FsZSh2YWx1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5nZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUpIS5hZGQodGFyZ2V0VmFsdWUuc3VidHJhY3QoYmFzZVZhbHVlKS5zY2FsZSh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lLCBwcm9wVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9tYXRlcmlhbFNldHRlck1hcFtiaW5kaW5nS2V5XSA9IHNldHRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5pVlJNIOOBp+OBryBEaWN0aW9uYXJ5IOOBruOCreODvOeUqOOBruOCr+ODqeOCueOCkuWumue+qeOBl+OBpuOBhOOCi+OBjOOAgeaWh+Wtl+WIl+OBp+S7o+eUqOOBmeOCi1xyXG4gICAgICogTWF0ZXJpYWxWYWx1ZUJpbmRpbmcuQmFzZVZhbHVlIOOBr+WvvuW/nOOBmeOCi+ODl+ODreODkeODhuOCo+OBruWIneacn+WApOOBquOBruOBp+eEoeimluOBp+OBjeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1ha2VCaW5kaW5nS2V5KG1hdGVyaWFsVmFsdWU6IElWUk1CbGVuZFNoYXBlTWF0ZXJpYWxCaW5kKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7bWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWV9XyR7bWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWV9XyR7bWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZS5qb2luKCctJyl9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuaVZSTSDjgafjga8gRGljdGlvbmFyeSDjga7jgq3jg7znlKjjga7jgq/jg6njgrnjgpLlrprnvqnjgZfjgabjgYTjgovjgYzjgIHmloflrZfliJfjgafku6PnlKjjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtYWtlVGFyZ2V0S2V5KG1hdGVyaWFsVmFsdWU6IElWUk1CbGVuZFNoYXBlTWF0ZXJpYWxCaW5kKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7bWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWV9XyR7bWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWV9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODouODvOODleOCo+ODs+OCsOOCkuihjOOBhlxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWApCgw44CcMSlcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vcnBoaW5nKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5hcHBseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWF0ZXJpYWxWYWx1ZSDjgZTjgajjgavph43jgb/jgpLoqIjnrpfjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhY2N1bXVsYXRlVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxWYWx1ZXMuZm9yRWFjaCgobWF0ZXJpYWxWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBiaW5kaW5nS2V5ID0gdGhpcy5tYWtlQmluZGluZ0tleShtYXRlcmlhbFZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9tYXRlcmlhbFZhbHVlTWFwW2JpbmRpbmdLZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWF0ZXJpYWxWYWx1ZU1hcFtiaW5kaW5nS2V5XSArPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9tYXRlcmlhbFZhbHVlTWFwW2JpbmRpbmdLZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hdGVyaWFsIOOBruODl+ODreODkeODhuOCo+OCkuabtOaWsOOBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFwcGx5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV91c2VkID0ge307XHJcblxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMubWF0ZXJpYWxWYWx1ZXNUb0FwcGx5KS5mb3JFYWNoKChbYmluZGluZ0tleSwgbWF0ZXJpYWxWYWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0S2V5ID0gdGhpcy5tYWtlVGFyZ2V0S2V5KG1hdGVyaWFsVmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoISh0YXJnZXRLZXkgaW4gdGhpcy5tX3VzZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMubV9tYXRlcmlhbE1hcFttYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuYmFzZVZhbHVlQ2FjaGVbYmluZGluZ0tleV0uY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDlr77osaHjga7jg5fjg63jg5Hjg4bjgqPjgpLliJ3mnJ/lgKTjgavmiLvjgZlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlTmFtZSA9IG1hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlTmFtZS5lbmRzV2l0aCgnX1NUX1MnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSkhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnkgPSB2Lnk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUudyA9IHYudztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lLmVuZHNXaXRoKCdfU1RfVCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lKSE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUueCA9IHYueDtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS56ID0gdi56O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fdXNlZFt0YXJnZXRLZXldID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2V0dGVyID0gdGhpcy5tX21hdGVyaWFsU2V0dGVyTWFwW2JpbmRpbmdLZXldO1xyXG4gICAgICAgICAgICBpZiAoc2V0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICBzZXR0ZXIodGhpcy5tX21hdGVyaWFsVmFsdWVNYXBbYmluZGluZ0tleV0sIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm1fbWF0ZXJpYWxWYWx1ZU1hcCA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Oe44OG44Oq44Ki44Or44Gu44OG44Kv44K544OB44Oj44GL6Imy44Gr5a++5b+c44GZ44KLIFZlY3RvcjQg44KS5Y+W5b6X44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbDogU3VwcG9ydGVkTWF0ZXJpYWwsIHByb3BlcnR5TmFtZTogc3RyaW5nKTogTnVsbGFibGU8VmVjdG9yND4ge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gcHJvcGVydHlOYW1lLm1hdGNoKC9eKF9bXl9dKykvKTtcclxuICAgICAgICBpZiAoIW1hdGNoIHx8ICFtYXRjaFsxXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qga2V5ID0gbWF0Y2hbMV07XHJcbiAgICAgICAgaWYgKG1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgaWYgKFBCUk1hdGVyaWFsVGV4dHVyZU1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0VGV4dHVyZUludG9WZWN0b3I0V2hlbk5vdE51bGwobWF0ZXJpYWxbUEJSTWF0ZXJpYWxUZXh0dXJlTWFwW2tleV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoUEJSTWF0ZXJpYWxDb2xvck1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0Q29sb3JJbnRvVmVjdG9yNChtYXRlcmlhbFtQQlJNYXRlcmlhbENvbG9yTWFwW2tleV1dLCBtYXRlcmlhbC5hbHBoYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1Ub29uTWF0ZXJpYWxcclxuICAgICAgICBpZiAoTVRvb25NYXRlcmlhbFRleHR1cmVNYXBba2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0VGV4dHVyZUludG9WZWN0b3I0V2hlbk5vdE51bGwobWF0ZXJpYWxbTVRvb25NYXRlcmlhbFRleHR1cmVNYXBba2V5XV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTVRvb25NYXRlcmlhbENvbG9yTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydENvbG9ySW50b1ZlY3RvcjQobWF0ZXJpYWxbTVRvb25NYXRlcmlhbENvbG9yTWFwW2tleV1dLCBtYXRlcmlhbC5hbHBoYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGV4dHVyZSDjgpIgVmVjdG9yNCDjgavlpInmj5vjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb252ZXJ0VGV4dHVyZUludG9WZWN0b3I0V2hlbk5vdE51bGwodGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+KTogTnVsbGFibGU8VmVjdG9yND4ge1xyXG4gICAgICAgIGlmICghdGV4dHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdCA9IHRleHR1cmUgYXMgVGV4dHVyZTtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjQodC51U2NhbGUsIHQudlNjYWxlLCB0LnVPZmZzZXQsIHQudk9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xvcjMg44GrIGFscGhhIOOCkuWKoOOBiOOBpiBWZWN0b3I0IOOBq+WkieaPm+OBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnZlcnRDb2xvckludG9WZWN0b3I0KGNvbG9yOiBDb2xvcjMsIGFscGhhOiBudW1iZXIpOiBWZWN0b3I0IHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjQoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgYWxwaGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Oe44OG44Oq44Ki44Or44Gu44OG44Kv44K544OB44Oj44GL6Imy44KS5pu05paw44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbDogU3VwcG9ydGVkTWF0ZXJpYWwsIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogVmVjdG9yNCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gcHJvcGVydHlOYW1lLm1hdGNoKC9eKF9bXl9dKykvKTtcclxuICAgICAgICBpZiAoIW1hdGNoIHx8ICFtYXRjaFsxXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGtleSA9IG1hdGNoWzFdO1xyXG4gICAgICAgIGlmIChtYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIGlmIChQQlJNYXRlcmlhbFRleHR1cmVNYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0dXJlV2hlbk5vdE51bGwobWF0ZXJpYWxbUEJSTWF0ZXJpYWxUZXh0dXJlTWFwW2tleV1dLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFBCUk1hdGVyaWFsQ29sb3JNYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ19Db2xvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYSA9IHZhbHVlLnc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbG9yKG1hdGVyaWFsW1BCUk1hdGVyaWFsQ29sb3JNYXBba2V5XV0sIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1Ub29uTWF0ZXJpYWxcclxuICAgICAgICBpZiAoTVRvb25NYXRlcmlhbFRleHR1cmVNYXBba2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHR1cmVXaGVuTm90TnVsbChtYXRlcmlhbFtNVG9vbk1hdGVyaWFsVGV4dHVyZU1hcFtrZXldXSwgdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNVG9vbk1hdGVyaWFsQ29sb3JNYXBba2V5XSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnX0NvbG9yJykge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGEgPSB2YWx1ZS53O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29sb3IobWF0ZXJpYWxbTVRvb25NYXRlcmlhbENvbG9yTWFwW2tleV1dLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGV4dHVyZSDjgpIgVmVjdG9yNCDjgafmm7TmlrDjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUZXh0dXJlV2hlbk5vdE51bGwodGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+LCB2YWx1ZTogVmVjdG9yNCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHQgPSB0ZXh0dXJlIGFzIFRleHR1cmU7XHJcbiAgICAgICAgICAgIHQudVNjYWxlID0gdmFsdWUueDtcclxuICAgICAgICAgICAgdC52U2NhbGUgPSB2YWx1ZS55O1xyXG4gICAgICAgICAgICB0LnVPZmZzZXQgPSB2YWx1ZS56O1xyXG4gICAgICAgICAgICB0LnZPZmZzZXQgPSB2YWx1ZS53O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbG9yMyDjgpIgVmVjdG9yNCDjgafmm7TmlrDjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVDb2xvcihjb2xvcjogQ29sb3IzLCB2YWx1ZTogVmVjdG9yNCk6IHZvaWQge1xyXG4gICAgICAgIGNvbG9yLnIgPSB2YWx1ZS54O1xyXG4gICAgICAgIGNvbG9yLmcgPSB2YWx1ZS55O1xyXG4gICAgICAgIGNvbG9yLmIgPSB2YWx1ZS56O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgVmVjdG9yMyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoJztcclxuaW1wb3J0IHR5cGUgeyBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlJztcclxuaW1wb3J0IHsgU3BoZXJlQnVpbGRlciB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvQnVpbGRlcnMvc3BoZXJlQnVpbGRlcic7XHJcbmltcG9ydCB7IENvbGxpZGVyIH0gZnJvbSAnLi9jb2xsaWRlcic7XHJcblxyXG4vKipcclxuICogVlJNIFNwcmluZ0JvbmUgQ29sbGlkZXJHcm91cFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbGxpZGVyR3JvdXAge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyczogQ29sbGlkZXJbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHRyYW5zZm9ybSBUaGUgbm9kZSBvZiB0aGUgY29sbGlkZXIgZ3JvdXAgZm9yIHNldHRpbmcgdXAgY29sbGlzaW9uIGRldGVjdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdHJhbnNmb3JtOiBUcmFuc2Zvcm1Ob2RlKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIG9mZnNldHRlZCBjb2xsaWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvZmZzZXQgVGhlIGxvY2FsIGNvb3JkaW5hdGUgZnJvbSB0aGUgbm9kZSBvZiB0aGUgY29sbGlkZXIgZ3JvdXAuXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIGNvbGxpZGVyLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkQ29sbGlkZXIob2Zmc2V0OiBWZWN0b3IzLCByYWRpdXM6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHNwaGVyZSA9IFNwaGVyZUJ1aWxkZXIuQ3JlYXRlU3BoZXJlKFxyXG4gICAgICAgICAgICBgJHt0aGlzLnRyYW5zZm9ybS5uYW1lfV9Db2xsaWRlclNwaGVyZWAsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnRzOiA2LFxyXG4gICAgICAgICAgICAgICAgZGlhbWV0ZXI6IHJhZGl1cyAqIDIuMCxcclxuICAgICAgICAgICAgICAgIHVwZGF0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0uZ2V0U2NlbmUoKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc3BoZXJlLnNldFBhcmVudCh0aGlzLnRyYW5zZm9ybSk7XHJcbiAgICAgICAgc3BoZXJlLnNldFBvc2l0aW9uV2l0aExvY2FsVmVjdG9yKG9mZnNldCk7XHJcbiAgICAgICAgc3BoZXJlLnNldEVuYWJsZWQoZmFsc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbGxpZGVycy5wdXNoKG5ldyBDb2xsaWRlcihvZmZzZXQsIHJhZGl1cywgc3BoZXJlKSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBNZXNoIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlJztcclxuaW1wb3J0IHR5cGUgeyBWZWN0b3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5cclxuLyoqXHJcbiAqIENvbGxpZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29sbGlkZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IFRoZSBsb2NhbCBjb29yZGluYXRlIGZyb20gdGhlIG5vZGUgb2YgdGhlIGNvbGxpZGVyIGdyb3VwLlxyXG4gICAgICogQHBhcmFtIHJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBjb2xsaWRlci5cclxuICAgICAqIEBwYXJhbSBzcGhlcmUgVGhlIHNwZWhlcmUgbWVzaCBmb3Igd29ybGRNYXRyaXggYW5kIGdpem1vLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9mZnNldDogVmVjdG9yMywgcHVibGljIHJlYWRvbmx5IHJhZGl1czogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgc3BoZXJlOiBNZXNoKSB7fVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZSc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IElWUk1TZWNvbmRhcnlBbmltYXRpb24gfSBmcm9tICcuLi92cm0taW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IENvbGxpZGVyR3JvdXAgfSBmcm9tICcuL2NvbGxpZGVyLWdyb3VwJztcclxuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZSB9IGZyb20gJy4vdnJtLXNwcmluZy1ib25lJztcclxuXHJcbi8qKlxyXG4gKiBmdW5jdGlvbiB0byBnZXQgYm9uZSBmcm9tIG5vZGVJbmRleFxyXG4gKi9cclxudHlwZSBnZXRCb25lID0gKG5vZGVJbmRleDogbnVtYmVyKSA9PiBOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPjtcclxuXHJcbi8vKiBUT0RPOiBQYXRjaGVkLlxyXG4vKipcclxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgc3ByaW5nc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDb25zdHJ1Y3RTcHJpbmdzT3B0aW9ucyB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSByZXNpbGllbmNlIG9mIHRoZSBzd2F5aW5nIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBzdGlmZm5lc3M/OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzdHJlbmd0aCBvZiBncmF2aXR5XHJcbiAgICAgKi9cclxuICAgIGdyYXZpdHlQb3dlcj86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRpcmVjdGlvbiBvZiBncmF2aXR5LiBTZXQgKDAsIC0xLCAwKSBmb3Igc2ltdWxhdGluZyB0aGUgZ3Jhdml0eS4gU2V0ICgxLCAwLCAwKSBmb3Igc2ltdWxhdGluZyB0aGUgd2luZC5cclxuICAgICAqL1xyXG4gICAgZ3Jhdml0eURpcj86IFZlY3RvcjM7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSByZXNpc3RhbmNlIChkZWNlbGVyYXRpb24pIG9mIGF1dG9tYXRpYyBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgZHJhZ0ZvcmNlPzogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBzcGhlcmUgdXNlZCBmb3IgdGhlIGNvbGxpc2lvbiBkZXRlY3Rpb24gd2l0aCBjb2xsaWRlcnNcclxuICAgICAqL1xyXG4gICAgaGl0UmFkaXVzPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogVlJNIFNwcmluZ0JvbmUgQ29udHJvbGxlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNwcmluZ0JvbmVDb250cm9sbGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogU3ByaW5nIEJvbmUgTGlzdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNwcmluZ3M6IFZSTVNwcmluZ0JvbmVbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBleHQgU2Vjb25kYXJ5QW5pbWF0aW9uIE9iamVjdFxyXG4gICAgICogQHBhcmFtIGdldEJvbmVcclxuICAgICAqL1xyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGV4dDogSVZSTVNlY29uZGFyeUFuaW1hdGlvbiwgZ2V0Qm9uZTogZ2V0Qm9uZSwgb3B0aW9ucz86IENvbnN0cnVjdFNwcmluZ3NPcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXJHcm91cHMgPSB0aGlzLmNvbnN0cnVjdENvbGxpZGVyR3JvdXBzKGdldEJvbmUpO1xyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIC8vIHRoaXMuc3ByaW5ncyA9IHRoaXMuY29uc3RydWN0U3ByaW5ncyhnZXRCb25lLCBjb2xsaWRlckdyb3Vwcyk7XHJcbiAgICAgICAgdGhpcy5zcHJpbmdzID0gdGhpcy5jb25zdHJ1Y3RTcHJpbmdzKGdldEJvbmUsIGNvbGxpZGVyR3JvdXBzLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLnNwcmluZ3MgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBhbGwgU3ByaW5nQm9uZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGVsdGFUaW1lIEVsYXBzZWQgc2VjIGZyb20gcHJldmlvdXMgZnJhbWVcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9kb2NzLnVuaXR5M2QuY29tL1NjcmlwdFJlZmVyZW5jZS9UaW1lLWRlbHRhVGltZS5odG1sXHJcbiAgICAgKi9cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgLy8gcHVibGljIGFzeW5jIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlciwgYm9uZU9wdGlvbnM/OiBDb25zdHJ1Y3RTcHJpbmdzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIOODneODvOOCuuW+jOOBruOBguOCieOBtuOCiumYsuatouOBruOBn+OCgSBjbGFtcFxyXG4gICAgICAgIGRlbHRhVGltZSA9IE1hdGgubWF4KDAuMCwgTWF0aC5taW4oMTYuNjY2LCBkZWx0YVRpbWUpKSAvIDEwMDA7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSB0aGlzLnNwcmluZ3MubWFwPFByb21pc2U8dm9pZD4+KChzcHJpbmcpID0+IHtcclxuICAgICAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgICAgIC8vIHJldHVybiBzcHJpbmcudXBkYXRlKGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzcHJpbmcudXBkYXRlKGRlbHRhVGltZSwgYm9uZU9wdGlvbnMpO1xyXG4gICAgICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8qIERvIG5vdGhpbmcgKi9cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdENvbGxpZGVyR3JvdXBzKGdldEJvbmU6IGdldEJvbmUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZXh0LmNvbGxpZGVyR3JvdXBzIHx8ICF0aGlzLmV4dC5jb2xsaWRlckdyb3Vwcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjb2xsaWRlckdyb3VwczogQ29sbGlkZXJHcm91cFtdID0gW107XHJcbiAgICAgICAgdGhpcy5leHQuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJHcm91cCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBib25lID0gZ2V0Qm9uZShjb2xsaWRlckdyb3VwLm5vZGUpIGFzIFRyYW5zZm9ybU5vZGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGcgPSBuZXcgQ29sbGlkZXJHcm91cChib25lKTtcclxuICAgICAgICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGcuYWRkQ29sbGlkZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVlJNIOWPs+aJi+ezu1lfVVAsIC1aX0Zyb250IOOBi+OCiSBCYWJ5bG9uLmpzIOW3puaJi+ezu1lfVVAsICtaX0Zyb250IOOBq+OBmeOCi1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IzKC1jb2xsaWRlci5vZmZzZXQueCwgY29sbGlkZXIub2Zmc2V0LnksIC1jb2xsaWRlci5vZmZzZXQueiksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZXIucmFkaXVzXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29sbGlkZXJHcm91cHMucHVzaChnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY29sbGlkZXJHcm91cHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RTcHJpbmdzKGdldEJvbmU6IGdldEJvbmUsIGNvbGxpZGVyR3JvdXBzOiBDb2xsaWRlckdyb3VwW10sIG9wdGlvbnM/OiBDb25zdHJ1Y3RTcHJpbmdzT3B0aW9ucykge1xyXG4gICAgICAgIGlmICghdGhpcy5leHQuYm9uZUdyb3VwcyB8fCAhdGhpcy5leHQuYm9uZUdyb3Vwcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzcHJpbmdzOiBWUk1TcHJpbmdCb25lW10gPSBbXTtcclxuICAgICAgICB0aGlzLmV4dC5ib25lR3JvdXBzLmZvckVhY2goKHNwcmluZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByb290Qm9uZXMgPSAoc3ByaW5nLmJvbmVzIHx8IFtdKS5tYXAoKGJvbmUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRCb25lKGJvbmUpIGFzIFRyYW5zZm9ybU5vZGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpbmdDb2xsaWRlcnMgPSAoc3ByaW5nLmNvbGxpZGVyR3JvdXBzIHx8IFtdKS5tYXA8Q29sbGlkZXJHcm91cD4oKGcpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsaWRlckdyb3Vwc1tnXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNwcmluZ3MucHVzaChcclxuICAgICAgICAgICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgICAgICAgICAgLy8gbmV3IFZSTVNwcmluZ0JvbmUoXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc3ByaW5nLmNvbW1lbnQsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc3ByaW5nLnN0aWZmaW5lc3MsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc3ByaW5nLmdyYXZpdHlQb3dlcixcclxuICAgICAgICAgICAgICAgIC8vICAgICBuZXcgVmVjdG9yMyhcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy8gVlJNIOWPs+aJi+ezu1lfVVAsIC1aX0Zyb250IOOBi+OCiSBCYWJ5bG9uLmpzIOW3puaJi+ezu1lfVVAsICtaX0Zyb250IOOBq+OBmeOCi1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAtc3ByaW5nLmdyYXZpdHlEaXIueCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3ByaW5nLmdyYXZpdHlEaXIueSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLXNwcmluZy5ncmF2aXR5RGlyLnpcclxuICAgICAgICAgICAgICAgIC8vICAgICApLm5vcm1hbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNwcmluZy5kcmFnRm9yY2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZ2V0Qm9uZShzcHJpbmcuY2VudGVyKSxcclxuICAgICAgICAgICAgICAgIC8vICAgICBzcHJpbmcuaGl0UmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJvb3RCb25lcyxcclxuICAgICAgICAgICAgICAgIC8vICAgICBzcHJpbmdDb2xsaWRlcnNcclxuICAgICAgICAgICAgICAgIC8vIClcclxuICAgICAgICAgICAgICAgIG5ldyBWUk1TcHJpbmdCb25lKFxyXG4gICAgICAgICAgICAgICAgICAgIHNwcmluZy5jb21tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM/LnN0aWZmbmVzcyA/IG9wdGlvbnMuc3RpZmZuZXNzIDogc3ByaW5nLnN0aWZmaW5lc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz8uZ3Jhdml0eVBvd2VyID8gb3B0aW9ucy5ncmF2aXR5UG93ZXIgOiBzcHJpbmcuZ3Jhdml0eVBvd2VyLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM/LmdyYXZpdHlEaXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBvcHRpb25zLmdyYXZpdHlEaXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBuZXcgVmVjdG9yMyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVlJNIOWPs+aJi+ezu1lfVVAsIC1aX0Zyb250IOOBi+OCiSBCYWJ5bG9uLmpzIOW3puaJi+ezu1lfVVAsICtaX0Zyb250IOOBq+OBmeOCi1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtc3ByaW5nLmdyYXZpdHlEaXIueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaW5nLmdyYXZpdHlEaXIueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLXNwcmluZy5ncmF2aXR5RGlyLnpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICApLm5vcm1hbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM/LmRyYWdGb3JjZSA/IG9wdGlvbnMuZHJhZ0ZvcmNlIDogc3ByaW5nLmRyYWdGb3JjZSxcclxuICAgICAgICAgICAgICAgICAgICBnZXRCb25lKHNwcmluZy5jZW50ZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM/LmhpdFJhZGl1cyA/IG9wdGlvbnMuaGl0UmFkaXVzIDogc3ByaW5nLmhpdFJhZGl1cyxcclxuICAgICAgICAgICAgICAgICAgICByb290Qm9uZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaW5nQ29sbGlkZXJzXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNwcmluZ3M7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTWF0cml4LCBRdWF0ZXJuaW9uLCBWZWN0b3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL3RyYW5zZm9ybU5vZGUnO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgeyBDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9jb2xsaWRlci1ncm91cCc7XHJcbi8vIGJhc2VkIG9uXHJcbi8vIGh0dHA6Ly9yb2NrZXRqdW1wLnNrci5qcC91bml0eTNkLzEwOS9cclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2R3YW5nby9VbmlWUk0vYmxvYi9tYXN0ZXIvU2NyaXB0cy9TcHJpbmdCb25lL1ZSTVNwcmluZ0JvbmUuY3NcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3BpeGl2L3RocmVlLXZybS9ibG9iL2FhZDU1MWUwNDFmYWQ1NTNjMTlkMjA5MWU1ZjVlYWZmMWViOGZhYTgvcGFja2FnZXMvdGhyZWUtdnJtL3NyYy9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmUudHNcclxuXHJcbmNvbnN0IElERU5USVRZX01BVFJJWCA9IE1hdHJpeC5JZGVudGl0eSgpO1xyXG5cclxuY29uc3QgX3YzQSA9IG5ldyBWZWN0b3IzKCk7XHJcbmNvbnN0IF92M0IgPSBuZXcgVmVjdG9yMygpO1xyXG5jb25zdCBfdjNDID0gbmV3IFZlY3RvcjMoKTtcclxuY29uc3QgX3F1YXRBID0gbmV3IFF1YXRlcm5pb24oKTtcclxuY29uc3QgX21hdEEgPSBuZXcgTWF0cml4KCk7XHJcbmNvbnN0IF9tYXRCID0gbmV3IE1hdHJpeCgpO1xyXG5cclxuLyoqXHJcbiAqIFZlcmxldCBTcHJpbmcgQm9uZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVMb2dpYyB7XHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWwgbG9jYWwgdHJhbnNmb3JtIE1hcml4XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW5pdGlhbExvY2FsTWF0cml4OiBNYXRyaXg7XHJcbiAgICAvKipcclxuICAgICAqIENsb25lZCBpbml0aWFsIGxvY2FsIHJvdGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW5pdGlhbExvY2FsUm90YXRpb246IFF1YXRlcm5pb247XHJcbiAgICAvKipcclxuICAgICAqIENsb25lZCBpbml0aWFsIGxvY2FsIGNoaWxkIHBvc2l0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbjogVmVjdG9yMztcclxuXHJcbiAgICAvKipcclxuICAgICAqIExlbmd0aCBvZiB0aGUgYm9uZSBpbiByZWxhdGl2ZSBzcGFjZSB1bml0LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNlbnRlclNwYWNlQm9uZUxlbmd0aDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBQb3NpdGlvbiBvZiB0aGUgYm9uZSBpbiByZWxhdGl2ZSBzcGFjZSB1bml0LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNlbnRlclNwYWNlUG9zaXRpb246IFZlY3RvcjM7XHJcbiAgICAvKipcclxuICAgICAqIFJlZmVyZW5jZSBvZiBwYXJlbnQgcm90YXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBib25lQXhpczogVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIGN1cnJlbnRUYWlsOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoKTtcclxuICAgIHByaXZhdGUgcHJldlRhaWw6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygpO1xyXG4gICAgcHJpdmF0ZSBuZXh0VGFpbDogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY2VudGVyIENlbnRlciByZWZlcmVuY2Ugb2YgVHJhbnNmb3JtTm9kZVxyXG4gICAgICogQHBhcmFtIHJhZGl1cyBDb2xsaXNpb24gUmFkaXVzXHJcbiAgICAgKiBAcGFyYW0gdHJhbnNmb3JtIEJhc2UgVHJhbnNmb3JtTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNlbnRlcjogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4sIHB1YmxpYyByZWFkb25seSByYWRpdXM6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IHRyYW5zZm9ybTogVHJhbnNmb3JtTm9kZSkge1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgcm90YXRpb25RdWF0ZXJuaW9uIHdoZW4gbm90IGluaXRpYWxpemVkXHJcbiAgICAgICAgaWYgKCF0cmFuc2Zvcm0ucm90YXRpb25RdWF0ZXJuaW9uKSB7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS5yb3RhdGlvblF1YXRlcm5pb24gPSB0cmFuc2Zvcm0ucm90YXRpb24udG9RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3b3JsZE1hdHJpeCA9IHRyYW5zZm9ybS5nZXRXb3JsZE1hdHJpeCgpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbiA9IHdvcmxkTWF0cml4LmdldFRyYW5zbGF0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdGlhbExvY2FsTWF0cml4ID0gdHJhbnNmb3JtLl9sb2NhbE1hdHJpeC5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbExvY2FsUm90YXRpb24gPSB0cmFuc2Zvcm0ucm90YXRpb25RdWF0ZXJuaW9uLmNsb25lKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdHJhbnNmb3JtLmdldENoaWxkVHJhbnNmb3JtTm9kZXModHJ1ZSk7XHJcbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24gPSB0cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKS5ub3JtYWxpemUoKS5zY2FsZUluUGxhY2UoMC4wNyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uID0gY2hpbGRyZW5bMF0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24sIHdvcmxkTWF0cml4LCB0aGlzLmN1cnJlbnRUYWlsKTtcclxuICAgICAgICB0aGlzLnByZXZUYWlsLmNvcHlGcm9tKHRoaXMuY3VycmVudFRhaWwpO1xyXG4gICAgICAgIHRoaXMubmV4dFRhaWwuY29weUZyb20odGhpcy5jdXJyZW50VGFpbCk7XHJcblxyXG4gICAgICAgIHRoaXMuYm9uZUF4aXMgPSB0aGlzLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24ubm9ybWFsaXplVG9OZXcoKTtcclxuICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzVG9SZWYodGhpcy5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLCB3b3JsZE1hdHJpeCwgX3YzQSk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJTcGFjZUJvbmVMZW5ndGggPSBfdjNBLnN1YnRyYWN0SW5QbGFjZSh0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24pLmxlbmd0aCgpO1xyXG5cclxuICAgICAgICBpZiAoY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzVG9SZWYodGhpcy5jdXJyZW50VGFpbCwgX21hdEEsIHRoaXMuY3VycmVudFRhaWwpO1xyXG4gICAgICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzVG9SZWYodGhpcy5wcmV2VGFpbCwgX21hdEEsIHRoaXMucHJldlRhaWwpO1xyXG4gICAgICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzVG9SZWYodGhpcy5uZXh0VGFpbCwgX21hdEEsIHRoaXMubmV4dFRhaWwpO1xyXG5cclxuICAgICAgICAgICAgd29ybGRNYXRyaXgubXVsdGlwbHlUb1JlZihfbWF0QSwgX21hdEEpO1xyXG5cclxuICAgICAgICAgICAgX21hdEEuZ2V0VHJhbnNsYXRpb25Ub1JlZih0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKHRoaXMuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbiwgX21hdEEsIF92M0EpO1xyXG4gICAgICAgICAgICB0aGlzLmNlbnRlclNwYWNlQm9uZUxlbmd0aCA9IF92M0Euc3VidHJhY3RJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbikubGVuZ3RoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIFRhaWwgcG9zaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc3RpZmZuZXNzRm9yY2UgQ3VycmVudCBmcmFtZSBzdGlmZm5lc3NcclxuICAgICAqIEBwYXJhbSBkcmFnRm9yY2UgQ3VycmVudCBmcmFtZSBkcmFnIGZvcmNlXHJcbiAgICAgKiBAcGFyYW0gZXh0ZXJuYWwgQ3VycmVudCBmcmFtZSBleHRlcm5hbCBmb3JjZVxyXG4gICAgICogQHBhcmFtIGNvbGxpZGVyR3JvdXBzIEN1cnJlbnQgZnJhbWUgY29sbGlkZXJHcm91cHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZShzdGlmZm5lc3NGb3JjZTogbnVtYmVyLCBkcmFnRm9yY2U6IG51bWJlciwgZXh0ZXJuYWw6IFZlY3RvcjMsIGNvbGxpZGVyR3JvdXBzOiBDb2xsaWRlckdyb3VwW10pOiB2b2lkIHtcclxuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMudHJhbnNmb3JtLmdldEFic29sdXRlUG9zaXRpb24oKS54KSkge1xyXG4gICAgICAgICAgICAvLyBEbyBub3QgdXBkYXRlIHdoZW4gYWJzb2x1dGUgcG9zaXRpb24gaXMgaW52YWxpZFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBHZXQgYm9uZSBwb3NpdGlvbiBpbiBjZW50ZXIgc3BhY2VcclxuICAgICAgICB0aGlzLmdldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLmdldFdvcmxkTWF0cml4KCkubXVsdGlwbHlUb1JlZihfbWF0QSwgX21hdEEpO1xyXG4gICAgICAgIF9tYXRBLmdldFRyYW5zbGF0aW9uVG9SZWYodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHBhcmVudCBwb3NpdGlvbiBpbiBjZW50ZXIgc3BhY2VcclxuICAgICAgICB0aGlzLmdldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEIpO1xyXG4gICAgICAgIHRoaXMuZ2V0UGFyZW50TWF0cml4V29ybGQoKS5tdWx0aXBseVRvUmVmKF9tYXRCLCBfbWF0Qik7XHJcblxyXG4gICAgICAgIC8vIHZlcmxldOepjeWIhuOBp+asoeOBruS9jee9ruOCkuioiOeul1xyXG4gICAgICAgIHRoaXMubmV4dFRhaWwuY29weUZyb20odGhpcy5jdXJyZW50VGFpbCk7XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyDmuJvoobDku5jjgY3jgafliY3jga7jg5Xjg6zjg7zjg6Djga7np7vli5XjgpLntpnntppcclxuICAgICAgICAgICAgX3YzQS5jb3B5RnJvbSh0aGlzLmN1cnJlbnRUYWlsKVxyXG4gICAgICAgICAgICAgICAgLnN1YnRyYWN0SW5QbGFjZSh0aGlzLnByZXZUYWlsKVxyXG4gICAgICAgICAgICAgICAgLnNjYWxlSW5QbGFjZSgxLjAgLSBkcmFnRm9yY2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRUYWlsLmFkZEluUGxhY2UoX3YzQSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8g6Kaq44Gu5Zue6Lui44Gr44KI44KL5a2Q44Oc44O844Oz44Gu56e75YuV55uu5qiZXHJcbiAgICAgICAgICAgIF92M0EuY29weUZyb20odGhpcy5ib25lQXhpcyk7XHJcbiAgICAgICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZihfdjNBLCB0aGlzLmluaXRpYWxMb2NhbE1hdHJpeCwgX3YzQSk7XHJcbiAgICAgICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZihfdjNBLCBfbWF0QiwgX3YzQSk7XHJcbiAgICAgICAgICAgIF92M0Euc3VidHJhY3RJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCkuc2NhbGVJblBsYWNlKHN0aWZmbmVzc0ZvcmNlKTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0VGFpbC5hZGRJblBsYWNlKF92M0EpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIOWkluWKm+OBq+OCiOOCi+enu+WLlemHj1xyXG4gICAgICAgICAgICB0aGlzLm5leHRUYWlsLmFkZEluUGxhY2UoZXh0ZXJuYWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIOmVt+OBleOCkiBib25lTGVuZ3RoIOOBq+W8t+WItlxyXG4gICAgICAgICAgICB0aGlzLm5leHRUYWlsLnN1YnRyYWN0SW5QbGFjZSh0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24pLm5vcm1hbGl6ZSgpLnNjYWxlSW5QbGFjZSh0aGlzLmNlbnRlclNwYWNlQm9uZUxlbmd0aCkuYWRkSW5QbGFjZSh0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIENvbGxpc2lvbiDjgafnp7vli5VcclxuICAgICAgICAgICAgdGhpcy5jb2xsaWRlKGNvbGxpZGVyR3JvdXBzLCB0aGlzLm5leHRUYWlsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJldlRhaWwuY29weUZyb20odGhpcy5jdXJyZW50VGFpbCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGFpbC5jb3B5RnJvbSh0aGlzLm5leHRUYWlsKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0aWFsTG9jYWxNYXRyaXgubXVsdGlwbHlUb1JlZihfbWF0QiwgX21hdEEpO1xyXG4gICAgICAgIGNvbnN0IGluaXRpYWxDZW50ZXJTcGFjZU1hdHJpeEludiA9IF9tYXRBLmludmVydCgpO1xyXG4gICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLm5leHRUYWlsLCBpbml0aWFsQ2VudGVyU3BhY2VNYXRyaXhJbnYsIF92M0EpO1xyXG4gICAgICAgIF92M0Eubm9ybWFsaXplVG9SZWYoX3YzQik7XHJcbiAgICAgICAgUXVhdGVybmlvbi5Gcm9tVW5pdFZlY3RvcnNUb1JlZih0aGlzLmJvbmVBeGlzLCBfdjNCLCBfcXVhdEEpO1xyXG4gICAgICAgIGNvbnN0IGFwcGx5Um90YXRpb24gPSBfcXVhdEE7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsTG9jYWxSb3RhdGlvbi5tdWx0aXBseVRvUmVmKGFwcGx5Um90YXRpb24sIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uUXVhdGVybmlvbiEpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgV29ybGRNYXRyaXhcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5jb21wdXRlV29ybGRNYXRyaXgodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyB3b3JsZCBzcGFjZSBpbnRvIGNlbnRlciBzcGFjZS5cclxuICAgICAqIEBwYXJhbSByZXN1bHQgVGFyZ2V0IG1hdHJpeFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1hdHJpeFdvcmxkVG9DZW50ZXIocmVzdWx0OiBNYXRyaXgpOiBNYXRyaXgge1xyXG4gICAgICAgIGlmICh0aGlzLmNlbnRlcikge1xyXG4gICAgICAgICAgICB0aGlzLmNlbnRlci5nZXRXb3JsZE1hdHJpeCgpLmludmVydFRvUmVmKHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LmNvcHlGcm9tKElERU5USVRZX01BVFJJWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB3b3JsZCBtYXRyaXggb2YgaXRzIHBhcmVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UGFyZW50TWF0cml4V29ybGQoKTogTWF0cml4IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucGFyZW50ID8gKHRoaXMudHJhbnNmb3JtLnBhcmVudCBhcyBUcmFuc2Zvcm1Ob2RlKS5nZXRXb3JsZE1hdHJpeCgpIDogSURFTlRJVFlfTUFUUklYO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6KGd56qB5Yik5a6a44KS6KGM44GGXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkZXJHcm91cHNcclxuICAgICAqIEBwYXJhbSB0YWlsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29sbGlkZShjb2xsaWRlckdyb3VwczogQ29sbGlkZXJHcm91cFtdLCB0YWlsOiBWZWN0b3IzKSB7XHJcbiAgICAgICAgY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJHcm91cCkgPT4ge1xyXG4gICAgICAgICAgICBjb2xsaWRlckdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcclxuICAgICAgICAgICAgICAgIGNvbGxpZGVyLnNwaGVyZS5jb21wdXRlV29ybGRNYXRyaXgoKS5tdWx0aXBseVRvUmVmKF9tYXRBLCBfbWF0QSk7XHJcbiAgICAgICAgICAgICAgICBfbWF0QS5nZXRUcmFuc2xhdGlvblRvUmVmKF92M0EpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uID0gX3YzQTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4QWJzU2NhbGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIuc3BoZXJlLmFic29sdXRlU2NhbGluZy5hc0FycmF5KCkuZm9yRWFjaCgocykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heEFic1NjYWxlID0gTWF0aC5tYXgobWF4QWJzU2NhbGUsIE1hdGguYWJzKHMpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGlkZXJSYWRpdXMgPSBjb2xsaWRlci5yYWRpdXMgKiBtYXhBYnNTY2FsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHIgPSB0aGlzLnJhZGl1cyArIGNvbGxpZGVyUmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRhaWwuc3VidHJhY3RUb1JlZihjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24sIF92M0IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF92M0IubGVuZ3RoU3F1YXJlZCgpIDw9IHIgKiByKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsID0gX3YzQi5jb3B5RnJvbSh0YWlsKS5zdWJ0cmFjdEluUGxhY2UoY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NGcm9tQ29sbGlkZXIgPSBfdjNDLmNvcHlGcm9tKGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbikuYWRkSW5QbGFjZShub3JtYWwuc2NhbGVJblBsYWNlKHIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGFpbC5jb3B5RnJvbShcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zRnJvbUNvbGxpZGVyLnN1YnRyYWN0SW5QbGFjZSh0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24pLm5vcm1hbGl6ZSgpLnNjYWxlSW5QbGFjZSh0aGlzLmNlbnRlclNwYWNlQm9uZUxlbmd0aCkuYWRkSW5QbGFjZSh0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvc3RhbmRhcmRNYXRlcmlhbCc7XHJcbmltcG9ydCB7IENvbG9yMywgVmVjdG9yMyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoJztcclxuaW1wb3J0IHsgTWVzaEJ1aWxkZXIgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL21lc2hCdWlsZGVyJztcclxuaW1wb3J0IHR5cGUgeyBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlJztcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB0eXBlIHsgQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vY29sbGlkZXItZ3JvdXAnO1xyXG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTG9naWMgfSBmcm9tICcuL3ZybS1zcHJpbmctYm9uZS1sb2dpYyc7XHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vKiBUT0RPOiBQYXRjaGVkLlxyXG5pbXBvcnQgdHlwZSB7IENvbnN0cnVjdFNwcmluZ3NPcHRpb25zIH0gZnJvbSAnLi9zcHJpbmctYm9uZS1jb250cm9sbGVyJztcclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8qKlxyXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi9tYXN0ZXIvQXNzZXRzL1ZSTS9VbmlWUk0vU2NyaXB0cy9TcHJpbmdCb25lL1ZSTVNwcmluZ0JvbmUuY3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lIHtcclxuICAgIHB1YmxpYyB2ZXJsZXRzOiBWUk1TcHJpbmdCb25lTG9naWNbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBhY3RpdmVCb25lczogVHJhbnNmb3JtTm9kZVtdID0gW107XHJcblxyXG4gICAgLyoqIEBoaWRkZW4gKi9cclxuICAgIHByaXZhdGUgZHJhd0dpem1vID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uLzAuMFxyXG4gICAgICogQHBhcmFtIGNvbW1lbnQgQW5ub3RhdGlvbiBjb21tZW50XHJcbiAgICAgKiBAcGFyYW0gc3RpZmZuZXNzIFRoZSByZXNpbGllbmNlIG9mIHRoZSBzd2F5aW5nIG9iamVjdCAodGhlIHBvd2VyIG9mIHJldHVybmluZyB0byB0aGUgaW5pdGlhbCBwb3NlKS5cclxuICAgICAqIEBwYXJhbSBncmF2aXR5UG93ZXIgVGhlIHN0cmVuZ3RoIG9mIGdyYXZpdHkuXHJcbiAgICAgKiBAcGFyYW0gZ3Jhdml0eURpciBUaGUgZGlyZWN0aW9uIG9mIGdyYXZpdHkuIFNldCAoMCwgLTEsIDApIGZvciBzaW11bGF0aW5nIHRoZSBncmF2aXR5LiBTZXQgKDEsIDAsIDApIGZvciBzaW11bGF0aW5nIHRoZSB3aW5kLlxyXG4gICAgICogQHBhcmFtIGRyYWdGb3JjZSBUaGUgcmVzaXN0YW5jZSAoZGVjZWxlcmF0aW9uKSBvZiBhdXRvbWF0aWMgYW5pbWF0aW9uLlxyXG4gICAgICogQHBhcmFtIGNlbnRlciBUaGUgcmVmZXJlbmNlIHBvaW50IG9mIGEgc3dheWluZyBvYmplY3QgY2FuIGJlIHNldCBhdCBhbnkgbG9jYXRpb24gZXhjZXB0IHRoZSBvcmlnaW4uXHJcbiAgICAgKiAgICAgICAgICAgICAgIFdoZW4gaW1wbGVtZW50aW5nIFVJIG1vdmluZyB3aXRoIHdhcnAsXHJcbiAgICAgKiAgICAgICAgICAgICAgIHRoZSBwYXJlbnQgbm9kZSB0byBtb3ZlIHdpdGggd2FycCBjYW4gYmUgc3BlY2lmaWVkIGlmIHlvdSBkb24ndCB3YW50IHRvIG1ha2UgdGhlIG9iamVjdCBzd2F5aW5nIHdpdGggd2FycCBtb3ZlbWVudC5cclxuICAgICAqIEBwYXJhbSBoaXRSYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgc3BoZXJlIHVzZWQgZm9yIHRoZSBjb2xsaXNpb24gZGV0ZWN0aW9uIHdpdGggY29sbGlkZXJzLlxyXG4gICAgICogQHBhcmFtIGJvbmVzIFNwZWNpZnkgdGhlIG5vZGUgaW5kZXggb2YgdGhlIHJvb3QgYm9uZSBvZiB0aGUgc3dheWluZyBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkZXJHcm91cHMgU3BlY2lmeSB0aGUgaW5kZXggb2YgdGhlIGNvbGxpZGVyIGdyb3VwIGZvciBjb2xsaXNpb25zIHdpdGggc3dheWluZyBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgLy8gcHVibGljIHJlYWRvbmx5IHN0aWZmbmVzczogbnVtYmVyLFxyXG4gICAgICAgIC8vIHB1YmxpYyByZWFkb25seSBncmF2aXR5UG93ZXI6IG51bWJlcixcclxuICAgICAgICAvLyBwdWJsaWMgcmVhZG9ubHkgZ3Jhdml0eURpcjogVmVjdG9yMyxcclxuICAgICAgICAvLyBwdWJsaWMgcmVhZG9ubHkgZHJhZ0ZvcmNlOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIHN0aWZmbmVzczogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyBncmF2aXR5UG93ZXI6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgZ3Jhdml0eURpcjogVmVjdG9yMyxcclxuICAgICAgICBwdWJsaWMgZHJhZ0ZvcmNlOiBudW1iZXIsXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjZW50ZXI6IE51bGxhYmxlPFRyYW5zZm9ybU5vZGU+LFxyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAvLyBwdWJsaWMgcmVhZG9ubHkgaGl0UmFkaXVzOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIGhpdFJhZGl1czogbnVtYmVyLFxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9uZXM6IEFycmF5PE51bGxhYmxlPFRyYW5zZm9ybU5vZGU+PixcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29sbGlkZXJHcm91cHM6IENvbGxpZGVyR3JvdXBbXVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVCb25lcyA9IHRoaXMuYm9uZXMuZmlsdGVyKChib25lKSA9PiBib25lICE9PSBudWxsKSBhcyBUcmFuc2Zvcm1Ob2RlW107XHJcbiAgICAgICAgdGhpcy5hY3RpdmVCb25lcy5mb3JFYWNoKChib25lKSA9PiB7XHJcbiAgICAgICAgICAgIFtib25lXS5jb25jYXQoYm9uZS5nZXRDaGlsZFRyYW5zZm9ybU5vZGVzKCkpLmZvckVhY2goKGIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVybGV0cy5wdXNoKG5ldyBWUk1TcHJpbmdCb25lTG9naWModGhpcy5jZW50ZXIsIHRoaXMuaGl0UmFkaXVzLCBiKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICB0aGlzLmdyYXZpdHlEaXIubm9ybWFsaXplKCk7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRyYXdHaXptbykge1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwR2l6bW8oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cEdpem1vKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQm9uZXMuZm9yRWFjaCgoYm9uZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzY2VuZSA9IGJvbmUuZ2V0U2NlbmUoKTtcclxuICAgICAgICAgICAgW2JvbmVdLmNvbmNhdChib25lLmdldENoaWxkVHJhbnNmb3JtTm9kZXMoKSkuZm9yRWFjaCgoYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYm9uZUdpem1vID0gTWVzaEJ1aWxkZXIuQ3JlYXRlU3BoZXJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGIubmFtZSArICdfYm9uZUdpem1vJyxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFtZXRlcjogdGhpcy5oaXRSYWRpdXMgKiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdCA9IG5ldyBTdGFuZGFyZE1hdGVyaWFsKGIubmFtZSArICdfYm9uZUdpem1vbWF0Jywgc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgbWF0LmVtaXNzaXZlQ29sb3IgPSBDb2xvcjMuUmVkKCk7XHJcbiAgICAgICAgICAgICAgICBtYXQud2lyZWZyYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJvbmVHaXptby5tYXRlcmlhbCA9IG1hdDtcclxuICAgICAgICAgICAgICAgIGJvbmVHaXptby5zZXRQYXJlbnQoYik7XHJcbiAgICAgICAgICAgICAgICBib25lR2l6bW8ucG9zaXRpb24gPSBWZWN0b3IzLlplcm8oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2NlbmUgPSBncm91cC50cmFuc2Zvcm0uZ2V0U2NlbmUoKTtcclxuICAgICAgICAgICAgZ3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGhlcmUgPSBjb2xsaWRlci5zcGhlcmU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNwaGVyZS5pc0VuYWJsZWQoZmFsc2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BoZXJlLnNldEVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0ID0gbmV3IFN0YW5kYXJkTWF0ZXJpYWwoZ3JvdXAudHJhbnNmb3JtLm5hbWUgKyAnX2NvbGxpZGVyR2l6bW9tYXQnLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0LmVtaXNzaXZlQ29sb3IgPSBDb2xvcjMuWWVsbG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0LndpcmVmcmFtZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BoZXJlLm1hdGVyaWFsID0gbWF0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBib25lc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkZWx0YVRpbWVcclxuICAgICAqL1xyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvLyBwdWJsaWMgYXN5bmMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyLCBib25lT3B0aW9ucz86IENvbnN0cnVjdFNwcmluZ3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgY29uc3Qgb2xkT3B0aW9ucyA9IHRoaXMudXBkYXRlT3B0aW9ucyhib25lT3B0aW9ucyk7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgIGNvbnN0IHN0aWZmbmVzcyA9IHRoaXMuc3RpZmZuZXNzICogZGVsdGFUaW1lO1xyXG4gICAgICAgIGNvbnN0IGV4dGVybmFsID0gdGhpcy5ncmF2aXR5RGlyLnNjYWxlKHRoaXMuZ3Jhdml0eVBvd2VyICogZGVsdGFUaW1lKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSB0aGlzLnZlcmxldHMubWFwPFByb21pc2U8dm9pZD4+KCh2ZXJsZXQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2ZXJsZXQudXBkYXRlKHN0aWZmbmVzcywgdGhpcy5kcmFnRm9yY2UsIGV4dGVybmFsLCB0aGlzLmNvbGxpZGVyR3JvdXBzKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIC8vIFJlc3RvcmUgb3B0aW9uc1xyXG4gICAgICAgIHRoaXMudXBkYXRlT3B0aW9ucyhvbGRPcHRpb25zKTtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLyogRG8gTm90aGluZyAqL1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgcHJpdmF0ZSB1cGRhdGVPcHRpb25zKGJvbmVPcHRpb25zPzogQ29uc3RydWN0U3ByaW5nc09wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCBiYWNrdXBPcHRpb25zOiBDb25zdHJ1Y3RTcHJpbmdzT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgc3RpZmZuZXNzOiB0aGlzLnN0aWZmbmVzcyxcclxuICAgICAgICAgICAgZ3Jhdml0eVBvd2VyOiB0aGlzLmdyYXZpdHlQb3dlcixcclxuICAgICAgICAgICAgZ3Jhdml0eURpcjogdGhpcy5ncmF2aXR5RGlyLmNsb25lKCksXHJcbiAgICAgICAgICAgIGRyYWdGb3JjZTogdGhpcy5kcmFnRm9yY2UsXHJcbiAgICAgICAgICAgIGhpdFJhZGl1czogdGhpcy5oaXRSYWRpdXMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnN0aWZmbmVzcyA9IGJvbmVPcHRpb25zPy5zdGlmZm5lc3MgfHwgdGhpcy5zdGlmZm5lc3M7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5UG93ZXIgPSBib25lT3B0aW9ucz8uZ3Jhdml0eVBvd2VyIHx8IHRoaXMuZ3Jhdml0eVBvd2VyO1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eURpciA9IGJvbmVPcHRpb25zPy5ncmF2aXR5RGlyIHx8IHRoaXMuZ3Jhdml0eURpcjtcclxuICAgICAgICB0aGlzLmRyYWdGb3JjZSA9IGJvbmVPcHRpb25zPy5kcmFnRm9yY2UgfHwgdGhpcy5kcmFnRm9yY2U7XHJcbiAgICAgICAgdGhpcy5oaXRSYWRpdXMgPSBib25lT3B0aW9ucz8uaGl0UmFkaXVzIHx8IHRoaXMuaGl0UmFkaXVzO1xyXG5cclxuICAgICAgICByZXR1cm4gYmFja3VwT3B0aW9ucztcclxuICAgIH1cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9tYXRlcmlhbCc7XHJcbmltcG9ydCB0eXBlIHsgTWVzaCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvbWVzaCc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uLCBJTWF0ZXJpYWwsIElNZXNoUHJpbWl0aXZlIH0gZnJvbSAnQGJhYnlsb25qcy9sb2FkZXJzL2dsVEYvMi4wJztcclxuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gJ0BiYWJ5bG9uanMvbG9hZGVycy9nbFRGLzIuMCc7XHJcbmltcG9ydCB7IFZSTU1hbmFnZXIgfSBmcm9tICcuL3ZybS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgVlJNTWF0ZXJpYWxHZW5lcmF0b3IgfSBmcm9tICcuL3ZybS1tYXRlcmlhbC1nZW5lcmF0b3InO1xyXG5cclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8qIFRPRE86IFBhdGNoZWQuXHJcbmltcG9ydCB0eXBlIHsgVlJNRmlsZUxvYWRlciB9IGZyb20gJy4vdnJtLWZpbGUtbG9hZGVyJztcclxuaW1wb3J0IHR5cGUgeyBHTFRGTG9hZGVyRXh0ZW5zaW9uT2JzZXJ2ZXIgfSBmcm9tICcuLi8uLi9sb2FkZXItb2JzZXJ2ZXInO1xyXG5pbXBvcnQgdHlwZSB7IFYzRENvcmUgfSBmcm9tICcuLi8uLi8uLi9pbmRleCc7XHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vKipcclxuICogYGV4dGVuc2lvbnNgIOOBq+WFpeOCi+aLoeW8teOCreODvFxyXG4gKi9cclxuY29uc3QgTkFNRSA9ICdWUk0nO1xyXG5cclxuLyoqXHJcbiAqIFZSTSDmi6HlvLXjgpLlh6bnkIbjgZnjgotcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy92cm0tc3BlY2lmaWNhdGlvbi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uLzAuMClcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWUk1Mb2FkZXJFeHRlbnNpb24gaW1wbGVtZW50cyBJR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTkFNRSA9ICdWUk0nO1xyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZCA9IHRydWU7XHJcbiAgICAvKipcclxuICAgICAqIOOBk+OBriBNZXNoIGluZGV4IOS7pemZjeOBjOiqreOBv+i+vOOBv+WvvuixoVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1lc2hlc0Zyb20gPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiDjgZPjga4gVHJhbnNmb3JtTm9kZSBpbmRleCDku6XpmY3jgYzoqq3jgb/ovrzjgb/lr77osaFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1Ob2Rlc0Zyb20gPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiDjgZPjga4gTWF0ZXJpYWwgaW5kZXgg5Lul6ZmN44GM6Kqt44G/6L6844G/5a++6LGhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWF0ZXJpYWxzRnJvbSA9IDA7XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRlciBvYnNlcnZlcnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkZXJPYnNlcnZlcnM6IEdMVEZMb2FkZXJFeHRlbnNpb25PYnNlcnZlcltdID0gW107XHJcbiAgICBwcml2YXRlIG9uTG9hZGVkQ2FsbEJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgLyoqXHJcbiAgICAgKiBWUk0gTWFuYWdlciBmcm9tIHRoaXMgbG9hZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtYW5hZ2VyOiBWUk1NYW5hZ2VyO1xyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgbG9hZGVyOiBHTFRGTG9hZGVyLFxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIHByaXZhdGUgdjNEQ29yZTogVjNEQ29yZVxyXG4gICAgKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgY29uc3RydWN0b3IoKScpO1xyXG5cclxuICAgICAgICAvLyBHTFRGTG9hZGVyIGhhcyBhbHJlYWR5IGFkZGVkIHJvb3RNZXNoIGFzIF9fcm9vdF9fIGJlZm9yZSBsb2FkIGV4dGVuc2lvblxyXG4gICAgICAgIC8vIEBzZWUgZ2xURkxvYWRlci5fbG9hZERhdGFcclxuICAgICAgICB0aGlzLm1lc2hlc0Zyb20gPSB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmUubWVzaGVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1Ob2Rlc0Zyb20gPSB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmUudHJhbnNmb3JtTm9kZXMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxzRnJvbSA9IHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZS5tYXRlcmlhbHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICB0aGlzLmFkZExvYWRlck9ic2VydmVyKHRoaXMudjNEQ29yZSk7XHJcbiAgICAgICAgdGhpcy5vbkxvYWRlZENhbGxCYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCB0aGlzLm9uTG9hZGVkQ2FsbEJhY2soKScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5tYW5hZ2VyOiAnLCB0aGlzLm1hbmFnZXIpO1xyXG5cclxuICAgICAgICAgICAgdjNEQ29yZS5hZGRWUk1NYW5hZ2VyKHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2M0RDb3JlLmFkZE9uTG9hZENvbXBsZXRlQ2FsbGJhY2tzKHRoaXMub25Mb2FkZWRDYWxsQmFjayk7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICAodGhpcy5sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIHRoaXMubG9hZGVyT2JzZXJ2ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy52M0RDb3JlLnJlbW92ZU9uTG9hZENvbXBsZXRlQ2FsbGJhY2sodGhpcy5vbkxvYWRlZENhbGxCYWNrKTtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblJlYWR5KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIG9uUmVhZHkoKScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmxvYWRlcjogJywgdGhpcy5sb2FkZXIpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucyB8fCAhdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zW05BTUVdKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIHJldHVybicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAvLyBjb25zdCBzY2VuZSA9IHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZTtcclxuICAgICAgICAvLyBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTU1hbmFnZXIoXHJcbiAgICAgICAgLy8gICAgIHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9uc1tWUk1Mb2FkZXJFeHRlbnNpb24uTkFNRV0sXHJcbiAgICAgICAgLy8gICAgIHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZSxcclxuICAgICAgICAvLyAgICAgdGhpcy5tZXNoZXNGcm9tLFxyXG4gICAgICAgIC8vICAgICB0aGlzLnRyYW5zZm9ybU5vZGVzRnJvbSxcclxuICAgICAgICAvLyAgICAgdGhpcy5tYXRlcmlhbHNGcm9tLFxyXG4gICAgICAgIC8vICk7XHJcbiAgICAgICAgLy8gc2NlbmUubWV0YWRhdGEgPSBzY2VuZS5tZXRhZGF0YSB8fCB7fTtcclxuICAgICAgICAvLyBzY2VuZS5tZXRhZGF0YS52cm1NYW5hZ2VycyA9IHNjZW5lLm1ldGFkYXRhLnZybU1hbmFnZXJzIHx8IFtdO1xyXG4gICAgICAgIC8vIHNjZW5lLm1ldGFkYXRhLnZybU1hbmFnZXJzLnB1c2godGhpcy5tYW5hZ2VyKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJpID0gKHRoaXMubG9hZGVyLnBhcmVudCBhcyB1bmtub3duIGFzIFZSTUZpbGVMb2FkZXIpLnVyaTtcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBuZXcgVlJNTWFuYWdlcih0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnNbTkFNRV0sIHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZSwgdGhpcy5tZXNoZXNGcm9tLCB0aGlzLnRyYW5zZm9ybU5vZGVzRnJvbSwgdGhpcy5tYXRlcmlhbHNGcm9tLCB1cmkpO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmUub25EaXNwb3NlT2JzZXJ2YWJsZS5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBTY2VuZSBkaXNwb3NlIOaZguOBqyBNYW5hZ2VyIOOCguegtOajhOOBmeOCi1xyXG4gICAgICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAgICAgLy8gbWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZS5tZXRhZGF0YS52cm1NYW5hZ2VycyA9IFtdO1xyXG4gICAgICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICBjb25zb2xlLmxvZygndHJ5IHRvIGNhbGwgb2JzZXJ2ZXIub25Mb2FkUmVhZHkoKScpO1xyXG4gICAgICAgIGZvciAoY29uc3Qgb2JzZXJ2ZXIgb2YgdGhpcy5sb2FkZXJPYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ29ic2VydmVyOiAnLCBvYnNlcnZlcik7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLm9uTG9hZFJlYWR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvLyBwdWJsaWMgX2xvYWRWZXJ0ZXhEYXRhQXN5bmMoY29udGV4dDogc3RyaW5nLCBwcmltaXRpdmU6IElNZXNoUHJpbWl0aXZlLCBiYWJ5bG9uTWVzaDogTWVzaCkge1xyXG4gICAgcHVibGljIF9sb2FkVmVydGV4RGF0YUFzeW5jKGNvbnRleHQ6IHN0cmluZywgcHJpbWl0aXZlOiBJTWVzaFByaW1pdGl2ZSwgYmFieWxvbk1lc2g6IE1lc2gpOiBhbnkge1xyXG4gICAgICAgIGlmICghcHJpbWl0aXZlLmV4dHJhcyB8fCAhcHJpbWl0aXZlLmV4dHJhcy50YXJnZXROYW1lcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g44G+44GgIE1vcnBoVGFyZ2V0IOOBjOeUn+aIkOOBleOCjOOBpuOBhOOBquOBhOOBruOBp+OAgeODoeOCv+aDheWgseOBq+ODouODvOODleOCv+ODvOOCsuODg+ODiOaDheWgseOCkuWFpeOCjOOBpuOBiuOBj1xyXG4gICAgICAgIGJhYnlsb25NZXNoLm1ldGFkYXRhID0gYmFieWxvbk1lc2gubWV0YWRhdGEgfHwge307XHJcbiAgICAgICAgYmFieWxvbk1lc2gubWV0YWRhdGEudnJtVGFyZ2V0TmFtZXMgPSBwcmltaXRpdmUuZXh0cmFzLnRhcmdldE5hbWVzO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9sb2FkTWF0ZXJpYWxBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIG1lc2g6IE1lc2gsIGJhYnlsb25EcmF3TW9kZTogbnVtYmVyLCBhc3NpZ246IChiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKSA9PiB2b2lkKTogTnVsbGFibGU8UHJvbWlzZTxNYXRlcmlhbD4+IHtcclxuICAgICAgICAvLyDjgrjjgqfjg43jg6zjg7zjgr/jgafjg57jg4bjg6rjgqLjg6vjgpLnlJ/miJDjgZnjgotcclxuICAgICAgICByZXR1cm4gbmV3IFZSTU1hdGVyaWFsR2VuZXJhdG9yKHRoaXMubG9hZGVyKS5nZW5lcmF0ZShjb250ZXh0LCBtYXRlcmlhbCwgbWVzaCwgYmFieWxvbkRyYXdNb2RlLCBhc3NpZ24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgb2JzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZExvYWRlck9ic2VydmVyKG9ic2VydmVyOiBHTFRGTG9hZGVyRXh0ZW5zaW9uT2JzZXJ2ZXIpIHtcclxuICAgICAgICB0aGlzLmxvYWRlck9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufVxyXG5cclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8qIFRPRE86IFBhdGNoZWQuXHJcbi8vIOODreODvOODgOODvOOBq+eZu+mMsuOBmeOCi1xyXG4vLyBHTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChsb2FkZXIpID0+IG5ldyBWUk1Mb2FkZXJFeHRlbnNpb24obG9hZGVyKSk7XHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiIsIi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vKiBUT0RPOiBQYXRjaGVkLlxyXG4vLyBpbXBvcnQgeyBTY2VuZUxvYWRlciB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyJztcclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmltcG9ydCB7IEdMVEZGaWxlTG9hZGVyIH0gZnJvbSAnQGJhYnlsb25qcy9sb2FkZXJzL2dsVEYvZ2xURkZpbGVMb2FkZXInO1xyXG5cclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8qIFRPRE86IFBhdGNoZWQuXHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IFZSTU1hbmFnZXIgfSBmcm9tICcuL3ZybS1tYW5hZ2VyJztcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9zY2VuZSc7XHJcbmltcG9ydCB0eXBlIHsgSVNjZW5lTG9hZGVyUHJvZ3Jlc3NFdmVudCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyJztcclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8qKlxyXG4gKiBWUk0vVkNJIOODleOCoeOCpOODq+OCkuiqreOBv+i+vOOCgeOCi+OCiOOBhuOBq+OBmeOCi1xyXG4gKiDmi6HlvLXlrZDjgpLlpInmm7TjgZfjgZ/jgaDjgZFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWUk1GaWxlTG9hZGVyIGV4dGVuZHMgR0xURkZpbGVMb2FkZXIge1xyXG4gICAgcHVibGljIG5hbWUgPSAndnJtJztcclxuICAgIHB1YmxpYyBleHRlbnNpb25zID0ge1xyXG4gICAgICAgICcudnJtJzogeyBpc0JpbmFyeTogdHJ1ZSB9LFxyXG4gICAgICAgICcudmNpJzogeyBpc0JpbmFyeTogdHJ1ZSB9LFxyXG4gICAgfTtcclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgcHVibGljIHVyaTogc3RyaW5nO1xyXG4gICAgcHVibGljIHZybU1hbmFnZXI6IE51bGxhYmxlPFZSTU1hbmFnZXI+ID0gbnVsbDtcclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlUGx1Z2luKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVlJNRmlsZUxvYWRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgcHVibGljIGxvYWRBc3luYyhzY2VuZTogU2NlbmUsIGRhdGE6IGFueSwgcm9vdFVybDogc3RyaW5nLCBvblByb2dyZXNzPzogKGV2ZW50OiBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50KSA9PiB2b2lkLCBmaWxlTmFtZT86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMudXJpID0gcm9vdFVybDtcclxuICAgICAgICBpZiAoZmlsZU5hbWUpIHRoaXMudXJpICs9IGZpbGVOYW1lO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5sb2FkQXN5bmMoc2NlbmUsIGRhdGEsIHJvb3RVcmwsIG9uUHJvZ3Jlc3MsIGZpbGVOYW1lKTtcclxuICAgIH1cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufVxyXG5cclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8qIFRPRE86IFBhdGNoZWQuXHJcbi8vIGlmIChTY2VuZUxvYWRlcikge1xyXG4vLyAgICAgU2NlbmVMb2FkZXIuUmVnaXN0ZXJQbHVnaW4obmV3IFZSTUZpbGVMb2FkZXIoKSk7XHJcbi8vIH1cclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBJVlJNVmVjdG9yMyB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB6OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRlbnNpb25zLlZSTVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNIHtcclxuICAgIGV4cG9ydGVyVmVyc2lvbjogc3RyaW5nO1xyXG4gICAgc3BlY1ZlcnNpb246IHN0cmluZztcclxuICAgIG1ldGE6IElWUk1NZXRhO1xyXG4gICAgaHVtYW5vaWQ6IElWUk1IdW1hbm9pZDtcclxuICAgIGZpcnN0UGVyc29uOiBJVlJNRmlyc3RQZXJzb247XHJcbiAgICBibGVuZFNoYXBlTWFzdGVyOiBJVlJNQmxlbmRTaGFwZU1hc3RlcjtcclxuICAgIHNlY29uZGFyeUFuaW1hdGlvbjogSVZSTVNlY29uZGFyeUFuaW1hdGlvbjtcclxuICAgIG1hdGVyaWFsUHJvcGVydGllczogSVZSTU1hdGVyaWFsUHJvcGVydHlbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dGVuc2lvbnMuVlJNLm1ldGFcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTU1ldGEge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIHZlcnNpb246IHN0cmluZztcclxuICAgIGF1dGhvcjogc3RyaW5nO1xyXG4gICAgY29udGFjdEluZm9ybWF0aW9uPzogc3RyaW5nO1xyXG4gICAgcmVmZXJlbmNlPzogc3RyaW5nO1xyXG4gICAgdGV4dHVyZT86IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dGVuc2lvbnMuVlJNLmh1bWFub2lkXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1IdW1hbm9pZCB7XHJcbiAgICBodW1hbkJvbmVzOiBJVlJNSHVtYW5vaWRCb25lW107XHJcbiAgICBhcm1TdHJldGNoPzogbnVtYmVyO1xyXG4gICAgbGVnU3RyZXRjaD86IG51bWJlcjtcclxuICAgIHVwcGVyQXJtVHdpc3Q/OiBudW1iZXI7XHJcbiAgICBsb3dlckFybVR3aXN0PzogbnVtYmVyO1xyXG4gICAgdXBwZXJMZWdUd2lzdD86IG51bWJlcjtcclxuICAgIGxvd2VyTGVnVHdpc3Q/OiBudW1iZXI7XHJcbiAgICBmZWV0U3BhY2luZz86IG51bWJlcjtcclxuICAgIGhhc1RyYW5zbGF0aW9uRG9GPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNSHVtYW5vaWRCb25lIHtcclxuICAgIGJvbmU6IHN0cmluZztcclxuICAgIG5vZGU6IG51bWJlcjtcclxuICAgIHVzZURlZmF1bHRWYWx1ZXM6IGJvb2xlYW47XHJcbiAgICBtaW4/OiBJVlJNVmVjdG9yMztcclxuICAgIG1heD86IElWUk1WZWN0b3IzO1xyXG4gICAgY2VudGVyPzogSVZSTVZlY3RvcjM7XHJcbiAgICBheGlzTGVuZ3RoPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uIHtcclxuICAgIG1lc2g6IG51bWJlcjtcclxuICAgIGZpcnN0UGVyc29uRmxhZzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1GaXJzdFBlcnNvbkRlZ3JlZU1hcCB7XHJcbiAgICBjdXJ2ZTogbnVtYmVyW107XHJcbiAgICB4UmFuZ2U6IG51bWJlcjtcclxuICAgIHlSYW5nZTogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0ZW5zaW9ucy5WUk0uZmlyc3RQZXJzb25cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUZpcnN0UGVyc29uIHtcclxuICAgIGZpcnN0UGVyc29uQm9uZTogbnVtYmVyO1xyXG4gICAgZmlyc3RQZXJzb25Cb25lT2Zmc2V0OiBJVlJNVmVjdG9yMztcclxuICAgIG1lc2hBbm5vdGF0aW9uczogSVZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXTtcclxuICAgIGxvb2tBdFR5cGVOYW1lOiAnQm9uZScgfCAnQmxlbmRTaGFwZSc7XHJcbiAgICBsb29rQXRIb3Jpem9udGFsSW5uZXI6IElWUk1GaXJzdFBlcnNvbkRlZ3JlZU1hcDtcclxuICAgIGxvb2tBdEhvcml6b250YWxPdXRlcjogSVZSTUZpcnN0UGVyc29uRGVncmVlTWFwO1xyXG4gICAgbG9va0F0VmVydGljYWxEb3duOiBJVlJNRmlyc3RQZXJzb25EZWdyZWVNYXA7XHJcbiAgICBsb29rQXRWZXJ0aWNhbFVwOiBJVlJNRmlyc3RQZXJzb25EZWdyZWVNYXA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRlbnNpb25zLlZSTS5ibGVuZFNoYXBlTWFzdGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1CbGVuZFNoYXBlTWFzdGVyIHtcclxuICAgIGJsZW5kU2hhcGVHcm91cHM6IElWUk1CbGVuZFNoYXBlR3JvdXBbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNQmxlbmRTaGFwZUdyb3VwIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHByZXNldE5hbWU6IHN0cmluZztcclxuICAgIGJpbmRzOiBJVlJNQmxlbmRTaGFwZUJpbmRbXTtcclxuICAgIG1hdGVyaWFsVmFsdWVzOiBJVlJNQmxlbmRTaGFwZU1hdGVyaWFsQmluZFtdO1xyXG4gICAgaXNCaW5hcnk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUJsZW5kU2hhcGVCaW5kIHtcclxuICAgIG1lc2g6IG51bWJlcjtcclxuICAgIGluZGV4OiBudW1iZXI7XHJcbiAgICB3ZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNQmxlbmRTaGFwZU1hdGVyaWFsQmluZCB7XHJcbiAgICBtYXRlcmlhbE5hbWU6IHN0cmluZztcclxuICAgIHByb3BlcnR5TmFtZTogc3RyaW5nO1xyXG4gICAgdGFyZ2V0VmFsdWU6IG51bWJlcltdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1TZWNvbmRhcnlBbmltYXRpb25TcHJpbmcge1xyXG4gICAgY29tbWVudDogc3RyaW5nO1xyXG4gICAgc3RpZmZpbmVzczogbnVtYmVyO1xyXG4gICAgZ3Jhdml0eVBvd2VyOiBudW1iZXI7XHJcbiAgICBncmF2aXR5RGlyOiBJVlJNVmVjdG9yMztcclxuICAgIGRyYWdGb3JjZTogbnVtYmVyO1xyXG4gICAgY2VudGVyOiBudW1iZXI7XHJcbiAgICBoaXRSYWRpdXM6IG51bWJlcjtcclxuICAgIGJvbmVzOiBudW1iZXJbXTtcclxuICAgIGNvbGxpZGVyR3JvdXBzOiBudW1iZXJbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXIge1xyXG4gICAgb2Zmc2V0OiBJVlJNVmVjdG9yMztcclxuICAgIHJhZGl1czogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1TZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlckdyb3VwIHtcclxuICAgIG5vZGU6IG51bWJlcjtcclxuICAgIGNvbGxpZGVyczogSVZSTVNlY29uZGFyeUFuaW1hdGlvbkNvbGxpZGVyW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRlbnNpb25zLlZSTS5zZWNvbmRhcnlBbmltYXRpb25cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTVNlY29uZGFyeUFuaW1hdGlvbiB7XHJcbiAgICBib25lR3JvdXBzOiBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uU3ByaW5nW107XHJcbiAgICBjb2xsaWRlckdyb3VwczogSVZSTVNlY29uZGFyeUFuaW1hdGlvbkNvbGxpZGVyR3JvdXBbXTtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gSVZSTU1hdGVyaWFsUHJvcGVydHlTaGFkZXIge1xyXG4gICAgVlJNX1VTRV9HTFRGU0hBREVSID0gJ1ZSTV9VU0VfR0xURlNIQURFUicsXHJcbiAgICBWUk1NVG9vbiA9ICdWUk0vTVRvb24nLFxyXG4gICAgVlJNVW5saXRUcmFuc3BhcmVudFpXcml0ZSA9ICdWUk0vVW5saXRUcmFuc3BhcmVudFpXcml0ZScsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTU1hdGVyaWFsUHJvcGVydHlGbG9hdFByb3BlcnRpZXMge1xyXG4gICAgX0N1dG9mZj86IG51bWJlcjtcclxuICAgIF9CdW1wU2NhbGU/OiBudW1iZXI7XHJcbiAgICBfUmVjZWl2ZVNoYWRvd1JhdGU/OiBudW1iZXI7XHJcbiAgICBfU2hhZGluZ0dyYWRlUmF0ZT86IG51bWJlcjtcclxuICAgIF9TaGFkZVNoaWZ0PzogbnVtYmVyO1xyXG4gICAgX1NoYWRlVG9vbnk/OiBudW1iZXI7XHJcbiAgICBfTGlnaHRDb2xvckF0dGVudWF0aW9uPzogbnVtYmVyO1xyXG4gICAgX0luZGlyZWN0TGlnaHRJbnRlbnNpdHk/OiBudW1iZXI7XHJcbiAgICBfUmltTGlnaHRpbmdNaXg/OiBudW1iZXI7XHJcbiAgICBfUmltRnJlc25lbFBvd2VyPzogbnVtYmVyO1xyXG4gICAgX1JpbUxpZnQ/OiBudW1iZXI7XHJcbiAgICBfT3V0bGluZVdpZHRoPzogbnVtYmVyO1xyXG4gICAgX091dGxpbmVTY2FsZWRNYXhEaXN0YW5jZT86IG51bWJlcjtcclxuICAgIF9PdXRsaW5lTGlnaHRpbmdNaXg/OiBudW1iZXI7XHJcbiAgICBfVXZBbmltU2Nyb2xsWD86IG51bWJlcjtcclxuICAgIF9VdkFuaW1TY3JvbGxZPzogbnVtYmVyO1xyXG4gICAgX1V2QW5pbVJvdGF0aW9uPzogbnVtYmVyO1xyXG4gICAgX0RlYnVnTW9kZT86IG51bWJlcjtcclxuICAgIF9CbGVuZE1vZGU/OiBudW1iZXI7XHJcbiAgICBfT3V0bGluZVdpZHRoTW9kZT86IG51bWJlcjtcclxuICAgIF9PdXRsaW5lQ29sb3JNb2RlPzogbnVtYmVyO1xyXG4gICAgX0N1bGxNb2RlPzogbnVtYmVyO1xyXG4gICAgX091dGxpbmVDdWxsTW9kZT86IG51bWJlcjtcclxuICAgIF9TcmNCbGVuZD86IG51bWJlcjtcclxuICAgIF9Ec3RCbGVuZD86IG51bWJlcjtcclxuICAgIF9aV3JpdGU/OiBudW1iZXI7XHJcbiAgICBbcHJvcDogc3RyaW5nXTogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eSA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVZlY3RvclByb3BlcnRpZXMge1xyXG4gICAgX0NvbG9yPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfU2hhZGVDb2xvcj86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX01haW5UZXg/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9TaGFkZVRleHR1cmU/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9CdW1wTWFwPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfUmVjZWl2ZVNoYWRvd1RleHR1cmU/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9TaGFkaW5nR3JhZGVUZXh0dXJlPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfUmltQ29sb3I/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9SaW1UZXh0dXJlPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfU3BoZXJlQWRkPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfRW1pc3Npb25Db2xvcj86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX0VtaXNzaW9uTWFwPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfT3V0bGluZVdpZHRoVGV4dHVyZT86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX091dGxpbmVDb2xvcj86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1V2QW5pbU1hc2tUZXh0dXJlPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBbcHJvcDogc3RyaW5nXTogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHkgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTU1hdGVyaWFsUHJvcGVydHlUZXh0dXJlUHJvcGVydGllcyB7XHJcbiAgICBfTWFpblRleD86IG51bWJlcjtcclxuICAgIF9TaGFkZVRleHR1cmU/OiBudW1iZXI7XHJcbiAgICBfQnVtcE1hcD86IG51bWJlcjtcclxuICAgIF9SZWNlaXZlU2hhZG93VGV4dHVyZT86IG51bWJlcjtcclxuICAgIF9TaGFkaW5nR3JhZGVUZXh0dXJlPzogbnVtYmVyO1xyXG4gICAgX1JpbVRleHR1cmU/OiBudW1iZXI7XHJcbiAgICBfU3BoZXJlQWRkPzogbnVtYmVyO1xyXG4gICAgX0VtaXNzaW9uTWFwPzogbnVtYmVyO1xyXG4gICAgX091dGxpbmVXaWR0aFRleHR1cmU/OiBudW1iZXI7XHJcbiAgICBfVXZBbmltTWFza1RleHR1cmU/OiBudW1iZXI7XHJcbiAgICBbcHJvcDogc3RyaW5nXTogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1NYXRlcmlhbFByb3BlcnR5S2V5d29yZE1hcCB7XHJcbiAgICBfTk9STUFMTUFQPzogYm9vbGVhbjtcclxuICAgIF9BTFBIQVRFU1RfT04/OiBib29sZWFuO1xyXG4gICAgX0FMUEhBQkxFTkRfT04/OiBib29sZWFuO1xyXG4gICAgX0FMUEhBUFJFTVVMVElQTFlfT04/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1NYXRlcmlhbFByb3BlcnR5VGFnTWFwIHtcclxuICAgIFJlbmRlclR5cGU/OiAnT3BhcXVlJyB8ICdUcmFuc3BhcmVudEN1dG91dCcgfCAnVHJhbnNwYXJlbnQnO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0ZW5zaW9ucy5WUk0ubWF0ZXJpYWxQcm9wZXJ0aWVzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1NYXRlcmlhbFByb3BlcnR5IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHNoYWRlcjogSVZSTU1hdGVyaWFsUHJvcGVydHlTaGFkZXI7XHJcbiAgICByZW5kZXJRdWV1ZTogbnVtYmVyO1xyXG4gICAgZmxvYXRQcm9wZXJ0aWVzOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eUZsb2F0UHJvcGVydGllcztcclxuICAgIHZlY3RvclByb3BlcnRpZXM6IElWUk1NYXRlcmlhbFByb3BlcnR5VmVjdG9yUHJvcGVydGllcztcclxuICAgIHRleHR1cmVQcm9wZXJ0aWVzOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVRleHR1cmVQcm9wZXJ0aWVzO1xyXG4gICAga2V5d29yZE1hcDogSVZSTU1hdGVyaWFsUHJvcGVydHlLZXl3b3JkTWFwO1xyXG4gICAgdGFnTWFwOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVRhZ01hcDtcclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL21lc2gnO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL3RyYW5zZm9ybU5vZGUnO1xyXG5pbXBvcnQgdHlwZSB7IE1vcnBoVGFyZ2V0IH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01vcnBoL21vcnBoVGFyZ2V0JztcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9zY2VuZSc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBTcHJpbmdCb25lQ29udHJvbGxlciB9IGZyb20gJy4vc2Vjb25kYXJ5LWFuaW1hdGlvbi9zcHJpbmctYm9uZS1jb250cm9sbGVyJztcclxuaW1wb3J0IHsgSHVtYW5vaWRCb25lIH0gZnJvbSAnLi9odW1hbm9pZC1ib25lJztcclxuaW1wb3J0IHR5cGUgeyBJVlJNIH0gZnJvbSAnLi92cm0taW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IE1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyIH0gZnJvbSAnLi9tYXRlcmlhbC12YWx1ZS1iaW5kaW5nLW1lcmdlcic7XHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vKiBUT0RPOiBQYXRjaGVkLlxyXG5pbXBvcnQgeyBDb25zdHJ1Y3RTcHJpbmdzT3B0aW9ucyB9IGZyb20gJy4vc2Vjb25kYXJ5LWFuaW1hdGlvbi9zcHJpbmctYm9uZS1jb250cm9sbGVyJztcclxuaW1wb3J0IHR5cGUgeyBOb2RlLCBUYXJnZXRDYW1lcmEgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUnO1xyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuaW50ZXJmYWNlIElzQmluYXJ5TWFwIHtcclxuICAgIFttb3JwaE5hbWU6IHN0cmluZ106IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBNb3JwaFRhcmdldFNldHRpbmcge1xyXG4gICAgdGFyZ2V0OiBNb3JwaFRhcmdldDtcclxuICAgIHdlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTW9ycGhUYXJnZXRNYXAge1xyXG4gICAgW21vcnBoTmFtZTogc3RyaW5nXTogTW9ycGhUYXJnZXRTZXR0aW5nW107XHJcbn1cclxuXHJcbmludGVyZmFjZSBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlck1hcCB7XHJcbiAgICBbbW9ycGhOYW1lOiBzdHJpbmddOiBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFRyYW5zZm9ybU5vZGVNYXAge1xyXG4gICAgW2h1bWFuQm9uZU5hbWU6IHN0cmluZ106IFRyYW5zZm9ybU5vZGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBUcmFuc2Zvcm1Ob2RlQ2FjaGUge1xyXG4gICAgW25vZGVJbmRleDogbnVtYmVyXTogVHJhbnNmb3JtTm9kZTtcclxufVxyXG5cclxuaW50ZXJmYWNlIE1lc2hDYWNoZSB7XHJcbiAgICBbbWVzaEluZGV4OiBudW1iZXJdOiBNZXNoW107XHJcbn1cclxuXHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vKiBUT0RPOiBQYXRjaGVkLlxyXG5leHBvcnQgY2xhc3MgbW9ycGhpbmdUYXJnZXRQcm9wZXJ0eSB7XHJcbiAgICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xyXG4gICAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMubWFuYWdlci5tb3JwaGluZyh0aGlzLmxhYmVsLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIHByaXZhdGUgbWFuYWdlcjogVlJNTWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBNb3JwaFRhcmdldFByb3BlcnR5TWFwIHtcclxuICAgIFttb3JwaE5hbWU6IHN0cmluZ106IG1vcnBoaW5nVGFyZ2V0UHJvcGVydHk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNmb3JtTm9kZVRyZWVOb2RlIHtcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBwYXJlbnQ6IG51bWJlcjtcclxuICAgIGNoaWxkcmVuPzogVHJhbnNmb3JtTm9kZVRyZWVOb2RlW107XHJcbn1cclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8qKlxyXG4gKiBVbml0eSBIdW1hbm9pZCBCb25lIOWQjVxyXG4gKi9cclxuZXhwb3J0IHR5cGUgSHVtYW5Cb25lTmFtZSA9XHJcbiAgICB8ICdoaXBzJ1xyXG4gICAgfCAnbGVmdFVwcGVyTGVnJ1xyXG4gICAgfCAncmlnaHRVcHBlckxlZydcclxuICAgIHwgJ2xlZnRMb3dlckxlZydcclxuICAgIHwgJ3JpZ2h0TG93ZXJMZWcnXHJcbiAgICB8ICdsZWZ0Rm9vdCdcclxuICAgIHwgJ3JpZ2h0Rm9vdCdcclxuICAgIHwgJ3NwaW5lJ1xyXG4gICAgfCAnY2hlc3QnXHJcbiAgICB8ICduZWNrJ1xyXG4gICAgfCAnaGVhZCdcclxuICAgIHwgJ2xlZnRTaG91bGRlcidcclxuICAgIHwgJ3JpZ2h0U2hvdWxkZXInXHJcbiAgICB8ICdsZWZ0VXBwZXJBcm0nXHJcbiAgICB8ICdyaWdodFVwcGVyQXJtJ1xyXG4gICAgfCAnbGVmdExvd2VyQXJtJ1xyXG4gICAgfCAncmlnaHRMb3dlckFybSdcclxuICAgIHwgJ2xlZnRIYW5kJ1xyXG4gICAgfCAncmlnaHRIYW5kJ1xyXG4gICAgfCAnbGVmdFRvZXMnXHJcbiAgICB8ICdyaWdodFRvZXMnXHJcbiAgICB8ICdsZWZ0RXllJ1xyXG4gICAgfCAncmlnaHRFeWUnXHJcbiAgICB8ICdqYXcnXHJcbiAgICB8ICdsZWZ0VGh1bWJQcm94aW1hbCdcclxuICAgIHwgJ2xlZnRUaHVtYkludGVybWVkaWF0ZSdcclxuICAgIHwgJ2xlZnRUaHVtYkRpc3RhbCdcclxuICAgIHwgJ2xlZnRJbmRleFByb3hpbWFsJ1xyXG4gICAgfCAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAnbGVmdEluZGV4RGlzdGFsJ1xyXG4gICAgfCAnbGVmdE1pZGRsZVByb3hpbWFsJ1xyXG4gICAgfCAnbGVmdE1pZGRsZUludGVybWVkaWF0ZSdcclxuICAgIHwgJ2xlZnRNaWRkbGVEaXN0YWwnXHJcbiAgICB8ICdsZWZ0UmluZ1Byb3hpbWFsJ1xyXG4gICAgfCAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdsZWZ0UmluZ0Rpc3RhbCdcclxuICAgIHwgJ2xlZnRMaXR0bGVQcm94aW1hbCdcclxuICAgIHwgJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdsZWZ0TGl0dGxlRGlzdGFsJ1xyXG4gICAgfCAncmlnaHRUaHVtYlByb3hpbWFsJ1xyXG4gICAgfCAncmlnaHRUaHVtYkludGVybWVkaWF0ZSdcclxuICAgIHwgJ3JpZ2h0VGh1bWJEaXN0YWwnXHJcbiAgICB8ICdyaWdodEluZGV4UHJveGltYWwnXHJcbiAgICB8ICdyaWdodEluZGV4SW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAncmlnaHRJbmRleERpc3RhbCdcclxuICAgIHwgJ3JpZ2h0TWlkZGxlUHJveGltYWwnXHJcbiAgICB8ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZSdcclxuICAgIHwgJ3JpZ2h0TWlkZGxlRGlzdGFsJ1xyXG4gICAgfCAncmlnaHRSaW5nUHJveGltYWwnXHJcbiAgICB8ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdyaWdodFJpbmdEaXN0YWwnXHJcbiAgICB8ICdyaWdodExpdHRsZVByb3hpbWFsJ1xyXG4gICAgfCAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdyaWdodExpdHRsZURpc3RhbCdcclxuICAgIHwgJ3VwcGVyQ2hlc3QnXHJcbiAgICB8IHN0cmluZztcclxuXHJcbi8qKlxyXG4gKiBWUk0g44Kt44Oj44Op44Kv44K/44O844KS5YuV5L2c44GV44Gb44KL44Gf44KB44Gu44Oe44ON44O844K444OjXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVlJNTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGlzQmluYXJ5TW9ycGhNYXA6IElzQmluYXJ5TWFwID0ge307XHJcbiAgICBwcml2YXRlIG1vcnBoVGFyZ2V0TWFwOiBNb3JwaFRhcmdldE1hcCA9IHt9O1xyXG4gICAgcHJpdmF0ZSBtYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlck1hcDogTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXAgPSB7fTtcclxuICAgIHByaXZhdGUgcHJlc2V0TW9ycGhUYXJnZXRNYXA6IE1vcnBoVGFyZ2V0TWFwID0ge307XHJcbiAgICBwcml2YXRlIHRyYW5zZm9ybU5vZGVNYXA6IFRyYW5zZm9ybU5vZGVNYXAgPSB7fTtcclxuICAgIHByaXZhdGUgdHJhbnNmb3JtTm9kZUNhY2hlOiBUcmFuc2Zvcm1Ob2RlQ2FjaGUgPSB7fTtcclxuICAgIHByaXZhdGUgbWVzaENhY2hlOiBNZXNoQ2FjaGUgPSB7fTtcclxuICAgIHByaXZhdGUgX2h1bWFub2lkQm9uZTogSHVtYW5vaWRCb25lO1xyXG4gICAgcHJpdmF0ZSBfcm9vdE1lc2g6IE1lc2g7XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICBwdWJsaWMgc3RhdGljIFJPT1RfTUVTSF9QUkVGSVggPSAndnJtX3Jvb3RfJztcclxuXHJcbiAgICBwcml2YXRlIF90cmFuc2Zvcm1Ob2RlVHJlZTogVHJhbnNmb3JtTm9kZVRyZWVOb2RlO1xyXG4gICAgZ2V0IHRyYW5zZm9ybU5vZGVUcmVlKCk6IFRyYW5zZm9ybU5vZGVUcmVlTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybU5vZGVUcmVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiB0aGUgd2F5IEJhYnlsb25KUyBhbmltYXRpb24gd29ya3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIE1vcnBoVGFyZ2V0UHJvcGVydHlNYXA6IE1vcnBoVGFyZ2V0UHJvcGVydHlNYXAgPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIF9yb290U2tlbGV0b246IE5vZGU7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FtZXJhczogVGFyZ2V0Q2FtZXJhW10gPSBbXTtcclxuXHJcbiAgICBnZXQgY2FtZXJhcygpOiBUYXJnZXRDYW1lcmFbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbWVyYXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFwcGVuZENhbWVyYShjYW1lcmE6IFRhcmdldENhbWVyYSkge1xyXG4gICAgICAgIHRoaXMuX2NhbWVyYXMucHVzaChjYW1lcmEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldENhbWVyYXMoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FtZXJhcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2Vjb25kYXJ5IEFuaW1hdGlvbiDjgajjgZfjgablrprnvqnjgZXjgozjgabjgYTjgosgVlJNIFNwcmluZyBCb25lIOOBruOCs+ODs+ODiOODreODvOODqVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3ByaW5nQm9uZUNvbnRyb2xsZXI6IFNwcmluZ0JvbmVDb250cm9sbGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBleHQgZ2xURi5leHRlbnNpb25zLlZSTSDjga7kuK3ouqsganNvblxyXG4gICAgICogQHBhcmFtIHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gbWVzaGVzRnJvbSDjgZPjga7nlarlj7fku6XpmY3jga7jg6Hjg4Pjgrfjg6XjgYzjgZPjga4gVlJNIOOBq+ipsuW9k+OBmeOCi1xyXG4gICAgICogQHBhcmFtIHRyYW5zZm9ybU5vZGVzRnJvbSDjgZPjga7nlarlj7fku6XpmY3jga4gVHJhbnNmb3JtTm9kZSDjgYzjgZPjga4gVlJNIOOBq+ipsuW9k+OBmeOCi1xyXG4gICAgICogQHBhcmFtIG1hdGVyaWFsc05vZGVzRnJvbSDjgZPjga7nlarlj7fku6XpmY3jga4gTWF0ZXJpYWwg44GM44GT44GuIFZSTSDjgavoqbLlvZPjgZnjgotcclxuICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAqIEBwYXJhbSB1cmkgVVJJIHRoaXMgbWFuYWdlciBiZWxvbmdzIHRvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZXh0OiBJVlJNLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBzY2VuZTogU2NlbmUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBtZXNoZXNGcm9tOiBudW1iZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB0cmFuc2Zvcm1Ob2Rlc0Zyb206IG51bWJlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG1hdGVyaWFsc05vZGVzRnJvbTogbnVtYmVyLFxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB1cmk6IHN0cmluZ1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5tZXNoQ2FjaGUgPSB0aGlzLmNvbnN0cnVjdE1lc2hDYWNoZSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtTm9kZUNhY2hlID0gdGhpcy5jb25zdHJ1Y3RUcmFuc2Zvcm1Ob2RlQ2FjaGUoKTtcclxuICAgICAgICB0aGlzLnNwcmluZ0JvbmVDb250cm9sbGVyID0gbmV3IFNwcmluZ0JvbmVDb250cm9sbGVyKHRoaXMuZXh0LnNlY29uZGFyeUFuaW1hdGlvbiwgdGhpcy5maW5kVHJhbnNmb3JtTm9kZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZXh0LmJsZW5kU2hhcGVNYXN0ZXIgJiYgdGhpcy5leHQuYmxlbmRTaGFwZU1hc3Rlci5ibGVuZFNoYXBlR3JvdXBzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0SXNCaW5hcnlNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RNb3JwaFRhcmdldE1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdE1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uc3RydWN0VHJhbnNmb3JtTm9kZU1hcCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9odW1hbm9pZEJvbmUgPSBuZXcgSHVtYW5vaWRCb25lKHRoaXMudHJhbnNmb3JtTm9kZU1hcCk7XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIC8vKiBUT0RPOiBIYW5kbGUgbGF0ZXIuXHJcbiAgICAgICAgLy8gdGhpcy5yZW1vdmVEdXBsaWNhdGVTa2VsZXRvbnMoKTtcclxuICAgICAgICB0aGlzLl9yb290U2tlbGV0b24gPSB0aGlzLmdldFJvb3RTa2VsZXRvbk5vZGUoKTtcclxuICAgICAgICAvLyBSZW5hbWUgX19yb290X18gbm9kZVxyXG4gICAgICAgIHRoaXMucm9vdE1lc2gubmFtZSA9IFZSTU1hbmFnZXIuUk9PVF9NRVNIX1BSRUZJWCArIHRoaXMuc2NlbmUuZ2V0Tm9kZXMoKS5maWx0ZXIoKGUpID0+IGUubmFtZS5pbmNsdWRlcyhWUk1NYW5hZ2VyLlJPT1RfTUVTSF9QUkVGSVgpKS5sZW5ndGg7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB9XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBkdXBsaWNhdGUgc2tlbGV0b25zIHdoZW4gaW1wb3J0aW5nIFZSTS5cclxuICAgICAqIE9ubHkgdGVzdGVkIG9uIFZSb2lkU3R1ZGlvIG91dHB1dCBmaWxlcy5cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlRHVwbGljYXRlU2tlbGV0b25zKCkge1xyXG4gICAgICAgIGxldCBza2VsZXRvbiA9IG51bGw7XHJcbiAgICAgICAgZm9yIChjb25zdCBub2RlSW5kZXggb2YgT2JqZWN0LmtleXModGhpcy5tZXNoQ2FjaGUpLm1hcChOdW1iZXIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc2hlcyA9IHRoaXMubWVzaENhY2hlW25vZGVJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChtZXNoZXMubGVuZ3RoICYmIG1lc2hlc1swXS5za2VsZXRvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFza2VsZXRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNrZWxldG9uID0gbWVzaGVzWzBdLnNrZWxldG9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yb290TWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb290Qm9uZSA9IHNrZWxldG9uLmJvbmVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc3VhbGx5IGl0IGlzIGNhbGxlZCBcIlJvb3RcIiwgYnV0IHRoZXJlIGFyZSBleGNlcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb290Qm9uZS5uYW1lICE9PSAnUm9vdCcpIGNvbnNvbGUud2FybignVGhlIGZpcnN0IGJvbmUgaGFzIGEgZGlmZmVyZW50IG5hbWUgdGhhbiBcIlJvb3RcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2VhayBzYW5pdHkgY2hlY2tcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tlbGV0b24uYm9uZXMubGVuZ3RoICE9IG1lc2hlc1swXS5za2VsZXRvbi5ib25lcy5sZW5ndGgpIGNvbnNvbGUud2FybignU2tlbGV0b25zIGhhdmUgZGlmZmVyZW50IG51bWJlcnMgb2YgYm9uZXMhJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1lc2hlc1swXS5za2VsZXRvbi5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtZXNoIG9mIG1lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNoLnNrZWxldG9uID0gc2tlbGV0b247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCB0aGUgcm9vdCBub2RlIG9mIHNrZWxldG9uLlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRSb290U2tlbGV0b25Ob2RlKCk6IE5vZGUge1xyXG4gICAgICAgIGNvbnN0IHJvb3RNZXNoQ2hpbGRyZW4gPSB0aGlzLl9yb290TWVzaC5nZXRDaGlsZHJlbigobm9kZTogTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZS5uYW1lID09PSAnUm9vdCcgfHwgbm9kZS5uYW1lID09PSAnQXJtYXR1cmUnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChyb290TWVzaENoaWxkcmVuLmxlbmd0aCA+IDApIHJldHVybiByb290TWVzaENoaWxkcmVuWzBdO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUcnkgdG8gZmluZCBpbiBzY2VuZSBkaXJlY3RseVxyXG4gICAgICAgICAgICBjb25zdCByb290TWVzaENoaWxkID0gdGhpcy5zY2VuZS5nZXROb2RlQnlOYW1lKCdSb290JykgPyB0aGlzLnNjZW5lLmdldE5vZGVCeU5hbWUoJ1Jvb3QnKSA6IHRoaXMuc2NlbmUuZ2V0Tm9kZUJ5TmFtZSgnQXJtYXR1cmUnKTtcclxuICAgICAgICAgICAgaWYgKHJvb3RNZXNoQ2hpbGQgJiYgIXJvb3RNZXNoQ2hpbGQucGFyZW50KSByZXR1cm4gcm9vdE1lc2hDaGlsZDtcclxuICAgICAgICAgICAgZWxzZSB0aHJvdyBFcnJvcignQ2Fubm90IGZpbmQgcm9vdCBza2VsZXRvbiBub2RlIScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIC8qKlxyXG4gICAgICogU2Vjb25kYXJ5IEFuaW1hdGlvbiDjgpLmm7TmlrDjgZnjgotcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGVsdGFUaW1lIOWJjeODleODrOODvOODoOOBi+OCieOBrue1jOmBjuenkuaVsChzZWMpXHJcbiAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgKiBAcGFyYW0gYm9uZU9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgLy8gcHVibGljIGFzeW5jIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgLy8gICAgIGF3YWl0IHRoaXMuc3ByaW5nQm9uZUNvbnRyb2xsZXIudXBkYXRlKGRlbHRhVGltZSk7XHJcbiAgICAvLyB9XHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyLCBib25lT3B0aW9ucz86IENvbnN0cnVjdFNwcmluZ3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zcHJpbmdCb25lQ29udHJvbGxlci51cGRhdGUoZGVsdGFUaW1lLCBib25lT3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnoLTmo4Tlh6bnkIZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zcHJpbmdCb25lQ29udHJvbGxlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5faHVtYW5vaWRCb25lLmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgdGhpcy5fcm9vdFNrZWxldG9uLmRpc3Bvc2UoKTtcclxuICAgICAgICBpZiAodGhpcy5fcm9vdE1lc2gpIHRoaXMuX3Jvb3RNZXNoLmRpc3Bvc2UoKTtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgKHRoaXMubW9ycGhUYXJnZXRNYXAgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMubWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXAgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMucHJlc2V0TW9ycGhUYXJnZXRNYXAgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMudHJhbnNmb3JtTm9kZU1hcCBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy50cmFuc2Zvcm1Ob2RlQ2FjaGUgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMubWVzaENhY2hlIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLl9yb290TWVzaCBhcyBhbnkpID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgKHRoaXMuTW9ycGhUYXJnZXRQcm9wZXJ0eU1hcCBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5fY2FtZXJhcyBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5fdHJhbnNmb3JtTm9kZVRyZWUgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg6Ljg7zjg5XjgqPjg7PjgrDjgpLooYzjgYZcclxuICAgICAqIEBwYXJhbSBsYWJlbCDjg6Ljg7zjg5XlkI1cclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlgKQoMOOAnDEpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3JwaGluZyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuY2FsY01vcnBoVmFsdWUobGFiZWwsIHZhbHVlKTtcclxuICAgICAgICBpZiAodGhpcy5tb3JwaFRhcmdldE1hcFtsYWJlbF0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb3JwaFRhcmdldE1hcFtsYWJlbF0uZm9yRWFjaCgoc2V0dGluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZy50YXJnZXQuaW5mbHVlbmNlID0gdiAqIChzZXR0aW5nLndlaWdodCAvIDEwMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlck1hcFtsYWJlbF0pIHtcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlck1hcFtsYWJlbF0ubW9ycGhpbmcodik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OX44Oq44K744OD44OI44Oi44O844OV44Gu44Oi44O844OV44Kj44Oz44Kw44KS6KGM44GGXHJcbiAgICAgKiBAcGFyYW0gbGFiZWwg44Oi44O844OV5ZCNXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YCkKDDjgJwxKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW9ycGhpbmdQcmVzZXQobGFiZWw6IHN0cmluZywgdmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcFtsYWJlbF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2ID0gdGhpcy5jYWxjTW9ycGhWYWx1ZShsYWJlbCwgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMucHJlc2V0TW9ycGhUYXJnZXRNYXBbbGFiZWxdLmZvckVhY2goKHNldHRpbmcpID0+IHtcclxuICAgICAgICAgICAgc2V0dGluZy50YXJnZXQuaW5mbHVlbmNlID0gdiAqIChzZXR0aW5nLndlaWdodCAvIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg6Ljg7zjg5XjgqPjg7PjgrDnlKjjga7lgKTjgpLoqIjnrpfjgZnjgotcclxuICAgICAqIEBwYXJhbSBsYWJlbCDjg6Ljg7zjg5XlkI1cclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlgKRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjTW9ycGhWYWx1ZShsYWJlbDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCB2ID0gTWF0aC5tYXgoMC4wLCBNYXRoLm1pbigxLjAsIHZhbHVlKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNCaW5hcnlNb3JwaE1hcFtsYWJlbF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHYgPiAwLjUgPyAxLjAgOiAwLjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbGlzdCBtb3JwaGluZyBuYW1lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRNb3JwaGluZ0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm1vcnBoVGFyZ2V0TWFwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4gOS6uuensOaZguOBruOCq+ODoeODqeS9jee9ruOCkue1tuWvvuW6p+aomeOBqOOBl+OBpuWPluW+l+OBmeOCi1xyXG4gICAgICpcclxuICAgICAqIGZpcnN0UGVyc29uQm9uZSDjgYzmnKroqK3lrprjga7loLTlkIjjga8gbnVsbCDjgpLov5TjgZlcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyDkuIDkurrnp7DmmYLjga7jgqvjg6Hjg6njga7nj77lnKjjgavjgYrjgZHjgovntbblr77luqfmqJlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEZpcnN0UGVyc29uQ2FtZXJhUG9zaXRpb24oKTogTnVsbGFibGU8VmVjdG9yMz4ge1xyXG4gICAgICAgIGNvbnN0IGZpcnN0UGVyc29uQm9uZSA9IHRoaXMuZ2V0Rmlyc3RQZXJzb25Cb25lKCk7XHJcbiAgICAgICAgaWYgKCFmaXJzdFBlcnNvbkJvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBiYXNlUG9zID0gZmlyc3RQZXJzb25Cb25lLmdldEFic29sdXRlUG9zaXRpb24oKTtcclxuICAgICAgICBjb25zdCBvZmZzZXRQb3MgPSB0aGlzLmV4dC5maXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKGJhc2VQb3MueCArIG9mZnNldFBvcy54LCBiYXNlUG9zLnkgKyBvZmZzZXRQb3MueSwgYmFzZVBvcy56ICsgb2Zmc2V0UG9zLnopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiA5Lq656ew5pmC44Gr6aCt44Go44G/44Gq44GZIFRyYW5zZm9ybU5vZGUg44KS5Y+W5b6X44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRGaXJzdFBlcnNvbkJvbmUoKTogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRUcmFuc2Zvcm1Ob2RlKHRoaXMuZXh0LmZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvKipcclxuICAgICAqIOODnOODvOODs+WQjeOBi+OCieOBneOBruODnOODvOODs+OBq+ipsuW9k+OBmeOCiyBUcmFuc2Zvcm1Ob2RlIOOCkuWPluW+l+OBmeOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lIEh1bWFuQm9uZU5hbWVcclxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBodW1hbm9pZEJvbmUgZ2V0dGVyIGluc3RlYWQuIFRoaXMgbWV0aG9kIHdpbGwgZGVsZXRlIGF0IHYyLlxyXG4gICAgICovXHJcbiAgICAvLyBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBIdW1hbkJvbmVOYW1lKTogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4ge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybU5vZGVNYXBbbmFtZV0gfHwgbnVsbDtcclxuICAgIC8vIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJvb3RTa2VsZXRvbk5vZGUoKTogTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RTa2VsZXRvbjtcclxuICAgIH1cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBIdW1hbm9pZEJvbmUgTWV0aG9kc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGh1bWFub2lkQm9uZSgpOiBIdW1hbm9pZEJvbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odW1hbm9pZEJvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWUk0gUm9vdCBtZXNoXHJcbiAgICAgKlxyXG4gICAgICogVXNlZnVsIGZvciBNb2RlbCBUcmFuc2Zvcm1hdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJvb3RNZXNoKCk6IE1lc2gge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb290TWVzaDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vZGUg55Wq5Y+344GL44KJ6Kmy5b2T44GZ44KLIFRyYW5zZm9ybU5vZGUg44KS5o6i44GZXHJcbiAgICAgKiDmlbDjgYzlpJrjgY/jgarjgovjga7jgafjgq3jg6Pjg4Pjgrfjg6Xjgavlj4LnhafjgpLmjIHjgaTmp4vpgKDjgavjgZnjgotcclxuICAgICAqIGdsdGYg44GuIG5vZGUg55Wq5Y+344GvIGBtZXRhZGF0YS5nbHRmLnBvaW50ZXJzYCDjgavoqJjpjLLjgZXjgozjgabjgYTjgotcclxuICAgICAqIEBwYXJhbSBub2RlSW5kZXhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRUcmFuc2Zvcm1Ob2RlKG5vZGVJbmRleDogbnVtYmVyKTogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybU5vZGVDYWNoZVtub2RlSW5kZXhdIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvKipcclxuICAgICAqIG1lc2gg55Wq5Y+344GL44KJ44Oh44OD44K344Ol44KS5o6i44GZXHJcbiAgICAgKiBnbHRmIOOBriBtZXNoIOeVquWPt+OBryBgbWV0YWRhdGEuZ2x0Zi5wb2ludGVyc2Ag44Gr6KiY6Yyy44GV44KM44Gm44GE44KLXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgZmluZE1lc2hlcyBpbnN0ZWFkLiBUaGlzIG1ldGhvZCBoYXMgYnJva2VuLlxyXG4gICAgICovXHJcbiAgICAvLyBwdWJsaWMgZmluZE1lc2gobWVzaEluZGV4OiBudW1iZXIpOiBOdWxsYWJsZTxNZXNoPiB7XHJcbiAgICAvLyAgICAgcmV0dXJuICh0aGlzLm1lc2hDYWNoZVttZXNoSW5kZXhdICYmIHRoaXMubWVzaENhY2hlW21lc2hJbmRleF1bMF0pIHx8IG51bGw7XHJcbiAgICAvLyB9XHJcbiAgICAvKipcclxuICAgICAqIEZpbmQgaW5kZXggb2YgcyBzcGVjaWZpYyBUcmFuc2Zvcm1Ob2RlIGZyb20gY2FjaGVcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgaW5kZXhPZlRyYW5zZm9ybU5vZGUobm9kZTogTnVsbGFibGU8Tm9kZT4pOiBudW1iZXIge1xyXG4gICAgICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMudHJhbnNmb3JtTm9kZUNhY2hlKSkge1xyXG4gICAgICAgICAgICBpZiAobm9kZSA9PSB2KSByZXR1cm4gcGFyc2VJbnQoaywgMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXNoIOeVquWPt+OBi+OCieODoeODg+OCt+ODpeOCkuaOouOBmVxyXG4gICAgICogZ2x0ZiDjga4gbWVzaCDnlarlj7fjga8gYG1ldGFkYXRhLmdsdGYucG9pbnRlcnNgIOOBq+iomOmMsuOBleOCjOOBpuOBhOOCi1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE1lc2hlcyhtZXNoSW5kZXg6IG51bWJlcik6IE51bGxhYmxlPE1lc2hbXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc2hDYWNoZVttZXNoSW5kZXhdIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuovliY3jgasgTW9ycGhUYXJnZXQg44GoIGlzQmluYXJ5IOOCkue0kOS7mOOBkeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdElzQmluYXJ5TWFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZXh0LmJsZW5kU2hhcGVNYXN0ZXIuYmxlbmRTaGFwZUdyb3Vwcy5mb3JFYWNoKChnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCaW5hcnlNb3JwaE1hcFtnLm5hbWVdID0gZy5pc0JpbmFyeTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS6i+WJjeOBqyBNb3JwaFRhcmdldCDjgaggQmxlbmRTaGFwZSDjgpLntJDku5jjgZHjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RNb3JwaFRhcmdldE1hcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmV4dC5ibGVuZFNoYXBlTWFzdGVyLmJsZW5kU2hhcGVHcm91cHMuZm9yRWFjaCgoZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWcuYmluZHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnLmJpbmRzLmZvckVhY2goKGIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc2hlcyA9IHRoaXMuZmluZE1lc2hlcyhiLm1lc2gpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVW5kZWZpbmVkIEJsZW5kU2hhcGVCaW5kIE1lc2hgLCBiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0TWFuYWdlciA9IG1lc2gubW9ycGhUYXJnZXRNYW5hZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbW9ycGhUYXJnZXRNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmRlZmluZWQgbW9ycGhUYXJnZXRNYW5hZ2VyYCwgYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbW9ycGhUYXJnZXRNYW5hZ2VyLmdldFRhcmdldChiLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vcnBoVGFyZ2V0TWFwW2cubmFtZV0gPSB0aGlzLm1vcnBoVGFyZ2V0TWFwW2cubmFtZV0gfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3JwaFRhcmdldE1hcFtnLm5hbWVdLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlaWdodDogYi53ZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Nb3JwaFRhcmdldFByb3BlcnR5TWFwW2cubmFtZV0gPSBuZXcgbW9ycGhpbmdUYXJnZXRQcm9wZXJ0eShnLm5hbWUsIDAsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnLnByZXNldE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcFtnLnByZXNldE5hbWVdID0gdGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcFtnLnByZXNldE5hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXNldE1vcnBoVGFyZ2V0TWFwW2cucHJlc2V0TmFtZV0ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IGIud2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuovliY3jgasgTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXIg44Go44Oi44O844OV5ZCN44KS57SQ5LuY44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0TWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXAoKSB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gdGhpcy5zY2VuZS5tYXRlcmlhbHMuc2xpY2UodGhpcy5tYXRlcmlhbHNOb2Rlc0Zyb20pO1xyXG4gICAgICAgIHRoaXMuZXh0LmJsZW5kU2hhcGVNYXN0ZXIuYmxlbmRTaGFwZUdyb3Vwcy5mb3JFYWNoKChnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZy5tYXRlcmlhbFZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXBbZy5uYW1lXSA9IG5ldyBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlcihtYXRlcmlhbHMsIGcubWF0ZXJpYWxWYWx1ZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LqL5YmN44GrIFRyYW5zZm9ybU5vZGUg44GoIGJvbmUg5ZCN44KS57SQ44Gl44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0VHJhbnNmb3JtTm9kZU1hcCgpIHtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICBjb25zdCB0cmVlUHJlQXJyOiBUcmFuc2Zvcm1Ob2RlVHJlZU5vZGVbXSA9IFtdO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHRoaXMuZXh0Lmh1bWFub2lkLmh1bWFuQm9uZXMuZm9yRWFjaCgoYikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5maW5kVHJhbnNmb3JtTm9kZShiLm5vZGUpO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU5vZGVNYXBbYi5ib25lXSA9IG5vZGU7XHJcbiAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgICAgICB0cmVlUHJlQXJyLnB1c2goeyBpZDogYi5ub2RlLCBuYW1lOiBiLmJvbmUsIHBhcmVudDogdGhpcy5pbmRleE9mVHJhbnNmb3JtTm9kZShub2RlLnBhcmVudCkgfSk7XHJcbiAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIGNvbnN0IHRyZWUgPSB0aGlzLmhpZXJhcmNoeSh0cmVlUHJlQXJyKTtcclxuICAgICAgICBpZiAodHJlZS5sZW5ndGggPT09IDApIHRocm93IEVycm9yKCdGYWlsZWQgdG8gY29uc3RydWN0IGJvbmUgaGllcmFyY2h5IHRyZWUhJyk7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtTm9kZVRyZWUgPSB0cmVlWzBdO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfVxyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgcHJpdmF0ZSBoaWVyYXJjaHkoZGF0YTogVHJhbnNmb3JtTm9kZVRyZWVOb2RlW10pIHtcclxuICAgICAgICBjb25zdCB0cmVlOiBUcmFuc2Zvcm1Ob2RlVHJlZU5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkT2Y6IGFueSA9IHt9O1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGl0ZW0uaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGl0ZW0ucGFyZW50O1xyXG4gICAgICAgICAgICBjaGlsZE9mW2lkXSA9IGNoaWxkT2ZbaWRdIHx8IFtdO1xyXG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuID0gY2hpbGRPZltpZF07XHJcbiAgICAgICAgICAgIC8vIEFzc3VtZSBIaXBzIGlzIHJvb3RcclxuICAgICAgICAgICAgaWYgKHBhcmVudCAhPSBudWxsICYmIHRoaXMudHJhbnNmb3JtTm9kZUNhY2hlW3BhcmVudF0ucGFyZW50ICE9IHRoaXMuX3Jvb3RNZXNoICYmIGl0ZW0ubmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaGlwcycpIHtcclxuICAgICAgICAgICAgICAgIChjaGlsZE9mW3BhcmVudF0gPSBjaGlsZE9mW3BhcmVudF0gfHwgW10pLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmVlLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJlZTtcclxuICAgIH1cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vZGUg55Wq5Y+344GoIFRyYW5zZm9ybU5vZGUg44KS57SQ44Gl44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0VHJhbnNmb3JtTm9kZUNhY2hlKCkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlOiBUcmFuc2Zvcm1Ob2RlQ2FjaGUgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMudHJhbnNmb3JtTm9kZXNGcm9tOyBpbmRleCA8IHRoaXMuc2NlbmUudHJhbnNmb3JtTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnNjZW5lLnRyYW5zZm9ybU5vZGVzW2luZGV4XTtcclxuICAgICAgICAgICAgLy8g44Od44Kk44Oz44K/44GM55m76Yyy44GV44KM44Gm44GE44Gq44GE44KC44Gu44Gv55yB55WlXHJcbiAgICAgICAgICAgIGlmICghbm9kZSB8fCAhbm9kZS5tZXRhZGF0YSB8fCAhbm9kZS5tZXRhZGF0YS5nbHRmIHx8ICFub2RlLm1ldGFkYXRhLmdsdGYucG9pbnRlcnMgfHwgbm9kZS5tZXRhZGF0YS5nbHRmLnBvaW50ZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBwb2ludGVyIG9mIG5vZGUubWV0YWRhdGEuZ2x0Zi5wb2ludGVycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50ZXIuc3RhcnRzV2l0aCgnL25vZGVzLycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgbm9kZUluZGV4ID0gcGFyc2VJbnQoKHBvaW50ZXIgYXMgc3RyaW5nKS5zdWJzdHIoNyksIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlSW5kZXggPSBwYXJzZUludCgocG9pbnRlciBhcyBzdHJpbmcpLnN1YnN0cmluZyg3KSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW25vZGVJbmRleF0gPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYWNoZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1lc2gg55Wq5Y+344GoIE1lc2gg44KS57SQ44Gl44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0TWVzaENhY2hlKCkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlOiBNZXNoQ2FjaGUgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMubWVzaGVzRnJvbTsgaW5kZXggPCB0aGlzLnNjZW5lLm1lc2hlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgbWVzaCA9IHRoaXMuc2NlbmUubWVzaGVzW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKG1lc2guaWQgPT09ICdfX3Jvb3RfXycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RNZXNoID0gbWVzaCBhcyBNZXNoO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g44Od44Kk44Oz44K/44GM55m76Yyy44GV44KM44Gm44GE44Gq44GE44KC44Gu44Gv55yB55WlXHJcbiAgICAgICAgICAgIGlmICghbWVzaCB8fCAhbWVzaC5tZXRhZGF0YSB8fCAhbWVzaC5tZXRhZGF0YS5nbHRmIHx8ICFtZXNoLm1ldGFkYXRhLmdsdGYucG9pbnRlcnMgfHwgbWVzaC5tZXRhZGF0YS5nbHRmLnBvaW50ZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBwb2ludGVyIG9mIG1lc2gubWV0YWRhdGEuZ2x0Zi5wb2ludGVycykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSAocG9pbnRlciBhcyBzdHJpbmcpLm1hdGNoKC9eXFwvbWVzaGVzXFwvKFxcZCspLiskLyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlSW5kZXggPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW25vZGVJbmRleF0gPSBjYWNoZVtub2RlSW5kZXhdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW25vZGVJbmRleF0ucHVzaChtZXNoIGFzIE1lc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYWNoZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHdoZXRoZXIgc2hhZG93IGFyZSByZWNlaXZlZC5cclxuICAgICAqIEBwYXJhbSBlbmFibGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTaGFkb3dFbmFibGVkKGVuYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5vZGVJbmRleCBvZiBPYmplY3Qua2V5cyh0aGlzLm1lc2hDYWNoZSkubWFwKE51bWJlcikpIHtcclxuICAgICAgICAgICAgY29uc3QgbWVzaGVzID0gdGhpcy5tZXNoQ2FjaGVbbm9kZUluZGV4XTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBtZXNoIG9mIG1lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgbWVzaC5yZWNlaXZlU2hhZG93cyA9IGVuYWJsZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZSc7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZSc7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoJztcclxuaW1wb3J0IHR5cGUgeyBNZXNoIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy9tZXNoJztcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB0eXBlIHsgR0xURkxvYWRlciwgSU1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9sb2FkZXJzL2dsVEYvMi4wJztcclxuaW1wb3J0IHsgTVRvb25NYXRlcmlhbCB9IGZyb20gJ2JhYnlsb24tbXRvb24tbWF0ZXJpYWwnO1xyXG5pbXBvcnQgdHlwZSB7IElWUk1NYXRlcmlhbFByb3BlcnR5LCBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eSB9IGZyb20gJy4vdnJtLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVNoYWRlciB9IGZyb20gJy4vdnJtLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvRW5naW5lcy9lbmdpbmUnO1xyXG5cclxuLyoqXHJcbiAqIFZSTSDjgafmjIflrprjgZXjgozjgosgTWF0ZXJpYWwg44KS55Sf5oiQ44GZ44KLXHJcbiAqIFtWUk0g44GM5o+Q5L6b44GZ44KL44K344Kn44O844OAXShodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL3NoYWRlcnMvaW5kZXguaHRtbCkg44KS54m55a6a44GX6Kqt44G/6L6844KAXHJcbiAqIC0gVW5saXRUZXh0dXJlOiDkuI3pgI/mmI4sIFZSTSDjg5XjgqHjgqTjg6vlgbTjgacgW0tIUl9tYXRlcmlhbHNfdW5saXRdKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi90cmVlL21haW4vZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfbWF0ZXJpYWxzX3VubGl0KSDjgYzlrprnvqnjgZXjgozjgabjgYTjgovjgZ/jgoHjgIHkvZXjgoLjgZfjgarjgYRcclxuICogLSBVbmxpdEN1dG91dDog6YCP5piO5bqm44GM6Za+5YCk5Lul5LiL44Gu6YOo5YiG44KS6YCP5piO44Go44GZ44KLLCDlkIzkuIpcclxuICogLSBVbmxpdFRyYW5zcGFyZW50OiDjgqLjg6vjg5XjgqHjg5bjg6zjg7Pjg4njgIJaV3JpdGXjgZfjgarjgYQsIOWQjOS4ilxyXG4gKiAtIFVubGl0VHJhbnNwYXJlbnRaV3JpdGU6IOOCouODq+ODleOCoeODluODrOODs+ODieOAglpXcml0ZeOBmeOCiywg5ZCM5LiK44Gr5Yqg44GI44CB44OX44Ot44OR44OG44Kj44GnIFpXcml0ZSDjgpLlvLfliLbjgZfjgabjgYTjgb7jgZlcclxuICogLSBNVG9vbjogTVRvb25NYXRlcmlhbCDjgpLlt67jgZfmm7/jgYjjgabjgYTjgb7jgZnjgIJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWUk1NYXRlcmlhbEdlbmVyYXRvciB7XHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxvYWRlcjogR0xURkxvYWRlcikge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODnuODhuODquOCouODq+OCkueUn+aIkOOBmeOCiyBQcm9taXNlIOOCkui/lOOBmVxyXG4gICAgICogVlJNIOWvvuixoeWkluOBruWgtOWQiOOBryBudWxsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZW5lcmF0ZShjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIG1lc2g6IE1lc2gsIGJhYnlsb25EcmF3TW9kZTogbnVtYmVyLCBhc3NpZ246IChiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKSA9PiB2b2lkKTogTnVsbGFibGU8UHJvbWlzZTxNYXRlcmlhbD4+IHtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbFByb3AgPSB0aGlzLmZpbmRNYXRlcmlhbFByb3BlcnR5QnlOYW1lKG1hdGVyaWFsLm5hbWUsIHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0aWVzKCkpO1xyXG4gICAgICAgIGlmICghbWF0ZXJpYWxQcm9wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNoLmFscGhhSW5kZXggPSBtYXRlcmlhbFByb3AucmVuZGVyUXVldWU7XHJcbiAgICAgICAgY29uc3QgbmV3TWF0ZXJpYWwgPSB0aGlzLmNyZWF0ZU1hdGVyaWFsQnlTaGFkZXIoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25EcmF3TW9kZSwgbWF0ZXJpYWxQcm9wKTtcclxuICAgICAgICBpZiAoIW5ld01hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhc3NpZ24obmV3TWF0ZXJpYWwpO1xyXG4gICAgICAgIGlmIChuZXdNYXRlcmlhbCBpbnN0YW5jZW9mIE1Ub29uTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZE1Ub29uVGV4dHVyZXNBc3luYyhjb250ZXh0LCBuZXdNYXRlcmlhbCwgbWF0ZXJpYWxQcm9wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXdNYXRlcmlhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWUk0g44G+44Gf44GvIFZDSSDjgYvjgonjg57jg4bjg6rjgqLjg6vjg5fjg63jg5Hjg4bjgqPjga7phY3liJfjgpLmjqLjgZlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNYXRlcmlhbFByb3BlcnRpZXMoKTogSVZSTU1hdGVyaWFsUHJvcGVydHlbXSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zLlZSTSAmJiB0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnMuVlJNLm1hdGVyaWFsUHJvcGVydGllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zLlZSTS5tYXRlcmlhbFByb3BlcnRpZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnMuVkNBU1RfdmNpX21hdGVyaWFsX3VuaXR5ICYmIHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucy5WQ0FTVF92Y2lfbWF0ZXJpYWxfdW5pdHkubWF0ZXJpYWxzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnMuVkNBU1RfdmNpX21hdGVyaWFsX3VuaXR5Lm1hdGVyaWFscztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Oe44OG44Oq44Ki44Or5ZCN44GL44KJIE1hdGVyaWFsUHJvcGVydHkg44KS5o6i44GZXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWxOYW1lIOODnuODhuODquOCouODq+WQjVxyXG4gICAgICogQHBhcmFtIGV4dGVuc2lvbiDmi6HlvLXjg4fjg7zjgr9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTWF0ZXJpYWxQcm9wZXJ0eUJ5TmFtZShtYXRlcmlhbE5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCwgbWF0ZXJpYWxzOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVtdKTogTnVsbGFibGU8SVZSTU1hdGVyaWFsUHJvcGVydHk+IHtcclxuICAgICAgICBpZiAoIW1hdGVyaWFsTmFtZSB8fCAhbWF0ZXJpYWxzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtYXRzID0gbWF0ZXJpYWxzLmZpbHRlcigodikgPT4gdi5uYW1lID09PSBtYXRlcmlhbE5hbWUpO1xyXG4gICAgICAgIGlmIChtYXRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKG1hdHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIubG9nKGBEdXBsaWNhdGVkIHZybSBtYXRlcmlhbCBuYW1lIGZvdW5kOiAke21hdGVyaWFsTmFtZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hdHNbbWF0cy5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODhuOCr+OCueODgeODo+OCkuiqreOBv+i+vOOCgFxyXG4gICAgICogQHBhcmFtIGNvbnRleHQg54++5Zyo44Gu44Kz44Oz44OG44Kt44K544OIXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWwg55Sf5oiQ44GX44GfIE1Ub29uTWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBwcm9wIOeUn+aIkOOBl+OBnyBNVG9vbk1hdGVyaWFsIOOBruODnuODhuODquOCouODq+ODl+ODreODkeODhuOCo1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvYWRNVG9vblRleHR1cmVzQXN5bmMoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogTVRvb25NYXRlcmlhbCwgcHJvcDogSVZSTU1hdGVyaWFsUHJvcGVydHkpOiBQcm9taXNlPE1hdGVyaWFsPiB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXM6IEFycmF5PFByb21pc2U8QmFzZVRleHR1cmU+PiA9IFtdO1xyXG4gICAgICAgIC8vIOWFqOOBpuOBruODhuOCr+OCueODgeODo+OBriBVViBPZmZzZXQgJiBTY2FsZSDjga/jg6HjgqTjg7Pjg4bjgq/jgrnjg4Hjg6Pjga7jgoLjga7jgpLmtYHnlKjjgZnjgotcclxuICAgICAgICBjb25zdCB1dk9mZnNldFNjYWxlID0gcHJvcC52ZWN0b3JQcm9wZXJ0aWVzLl9NYWluVGV4O1xyXG4gICAgICAgIGlmICghdXZPZmZzZXRTY2FsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1hdGVyaWFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYXBwbHlUZXh0dXJlID0gKGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQsIGNhbGxiYWNrOiAodGV4dHVyZTogQmFzZVRleHR1cmUpID0+IHZvaWQpID0+IHtcclxuICAgICAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4oaW5kZXgsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkVGV4dHVyZUluZm9Bc3luYyhgJHtjb250ZXh0fS90ZXh0dXJlcy8ke2luZGV4fWAsIHsgaW5kZXg6IHZhbHVlIH0sIChiYWJ5bG9uVGV4dHVyZTogQmFzZVRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5a6f6Zqb44GvIFRleHR1cmUg44Kk44Oz44K544K/44Oz44K544GM5p2l44KL44Gu44Gn44Kt44Oj44K544OIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBiYWJ5bG9uVGV4dHVyZSBhcyBUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LnVPZmZzZXQgPSB1dk9mZnNldFNjYWxlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LnZPZmZzZXQgPSB1dk9mZnNldFNjYWxlWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LnVTY2FsZSA9IHV2T2Zmc2V0U2NhbGVbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQudlNjYWxlID0gdXZPZmZzZXRTY2FsZVszXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soYmFieWxvblRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fTWFpblRleCwgKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFsLmFscGhhQmxlbmQgfHwgbWF0ZXJpYWwuYWxwaGFUZXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLmhhc0FscGhhID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX1NoYWRlVGV4dHVyZSwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5zaGFkZVRleHR1cmUgPSB0ZXh0dXJlKSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX0J1bXBNYXAsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwuYnVtcFRleHR1cmUgPSB0ZXh0dXJlKSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX1JlY2VpdmVTaGFkb3dUZXh0dXJlLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLnJlY2VpdmVTaGFkb3dUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9TaGFkaW5nR3JhZGVUZXh0dXJlLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLnNoYWRpbmdHcmFkZVRleHR1cmUgPSB0ZXh0dXJlKSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX1JpbVRleHR1cmUsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwucmltVGV4dHVyZSA9IHRleHR1cmUpKTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fU3BoZXJlQWRkLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLm1hdENhcFRleHR1cmUgPSB0ZXh0dXJlKSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX0VtaXNzaW9uTWFwLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLmVtaXNzaXZlVGV4dHVyZSA9IHRleHR1cmUpKTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fT3V0bGluZVdpZHRoVGV4dHVyZSwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5vdXRsaW5lV2lkdGhUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9VdkFuaW1NYXNrVGV4dHVyZSwgKHRleHR1cmUpID0+IChtYXRlcmlhbC51dkFuaW1hdGlvbk1hc2tUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4gbWF0ZXJpYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44K344Kn44O844OA5ZCN44GL44KJ44Oe44OG44Oq44Ki44Or44KS5o6o5ris44GX44Gm55Sf5oiQ44GZ44KLXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCDnj77lnKjjga7jgrPjg7Pjg4bjgq3jgrnjg4hcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbCBnbFRGIOODnuODhuODquOCouODq1xyXG4gICAgICogQHBhcmFtIGJhYnlsb25EcmF3TW9kZSDmj4/nlLvnqK7poZ5cclxuICAgICAqIEBwYXJhbSBwcm9wIOeUn+aIkOOBmeOCi+ODnuODhuODquOCouODq+ODl+ODreODkeODhuOCo1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZU1hdGVyaWFsQnlTaGFkZXIoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uRHJhd01vZGU6IG51bWJlciwgcHJvcDogSVZSTU1hdGVyaWFsUHJvcGVydHkpOiBOdWxsYWJsZTxNYXRlcmlhbD4ge1xyXG4gICAgICAgIGlmIChwcm9wLnNoYWRlciA9PT0gSVZSTU1hdGVyaWFsUHJvcGVydHlTaGFkZXIuVlJNTVRvb24pIHtcclxuICAgICAgICAgICAgY29uc3QgbXRvb25NYXRlcmlhbCA9IG5ldyBNVG9vbk1hdGVyaWFsKG1hdGVyaWFsLm5hbWUgfHwgYE1Ub29uTWF0ZXJpYWwke21hdGVyaWFsLmluZGV4fWAsIHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TVRvb25NYXRlcmlhbFByb3BlcnRpZXMobXRvb25NYXRlcmlhbCwgcHJvcCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtdG9vbk1hdGVyaWFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJvcC5zaGFkZXIgPT09IElWUk1NYXRlcmlhbFByb3BlcnR5U2hhZGVyLlZSTVVubGl0VHJhbnNwYXJlbnRaV3JpdGUpIHtcclxuICAgICAgICAgICAgY29uc3QgbWF0ID0gdGhpcy5sb2FkZXIuY3JlYXRlTWF0ZXJpYWwoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25EcmF3TW9kZSk7XHJcbiAgICAgICAgICAgIC8vIOmAmuW4uOODnuODhuODquOCouODq+OBqyBEZXB0aCBXcml0ZSDjgpLlvLfliLZcclxuICAgICAgICAgICAgbWF0LmRpc2FibGVEZXB0aFdyaXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG1hdC5mb3JjZURlcHRoV3JpdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODnuODhuODquOCouODq+OBqyBWUk0g44OX44Ot44OR44OG44Kj44KS6Kit5a6aXHJcbiAgICAgKiBWUk0g44OX44Ot44OR44OG44Kj44Go44Oe44OG44Oq44Ki44Or44OX44Ot44OR44OG44Kj44Gu44Oe44OD44OU44Oz44Kw44KS6KGM44Gj44Gm44GE44KLXHJcbiAgICAgKiDliJ3mnJ/lgKTjga/jg57jg4bjg6rjgqLjg6vlrp/oo4XlgbTjgavmjIHjgaPjgabjgYTjgovjgZ/jgoHjgIHlgKTjgYzjgYLjgovloLTlkIjjga7jgb/kuIrmm7jjgY3jgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRNVG9vbk1hdGVyaWFsUHJvcGVydGllcyhtYXRlcmlhbDogTVRvb25NYXRlcmlhbCwgcHJvcDogSVZSTU1hdGVyaWFsUHJvcGVydHkpIHtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fQ3V0b2ZmLCAodmFsdWUpID0+IChtYXRlcmlhbC5hbHBoYUN1dE9mZiA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5Pihwcm9wLnZlY3RvclByb3BlcnRpZXMuX0NvbG9yLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3IENvbG9yMyh2YWx1ZVswXSwgdmFsdWVbMV0sIHZhbHVlWzJdKTtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGEgPSB2YWx1ZVszXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8SVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk+KHByb3AudmVjdG9yUHJvcGVydGllcy5fU2hhZGVDb2xvciwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLnNoYWRlQ29sb3IgPSBuZXcgQ29sb3IzKHZhbHVlWzBdLCB2YWx1ZVsxXSwgdmFsdWVbMl0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9CdW1wU2NhbGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmJ1bXBTY2FsZSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1JlY2VpdmVTaGFkb3dSYXRlLCAodmFsdWUpID0+IChtYXRlcmlhbC5yZWNlaXZlU2hhZG93UmF0ZSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1NoYWRpbmdHcmFkZVJhdGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnNoYWRpbmdHcmFkZVJhdGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9TaGFkZVNoaWZ0LCAodmFsdWUpID0+IChtYXRlcmlhbC5zaGFkZVNoaWZ0ID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fU2hhZGVUb29ueSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuc2hhZGVUb29ueSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX0xpZ2h0Q29sb3JBdHRlbnVhdGlvbiwgKHZhbHVlKSA9PiAobWF0ZXJpYWwubGlnaHRDb2xvckF0dGVudWF0aW9uID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fSW5kaXJlY3RMaWdodEludGVuc2l0eSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuaW5kaXJlY3RMaWdodEludGVuc2l0eSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5Pihwcm9wLnZlY3RvclByb3BlcnRpZXMuX1JpbUNvbG9yLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwucmltQ29sb3IgPSBuZXcgQ29sb3IzKHZhbHVlWzBdLCB2YWx1ZVsxXSwgdmFsdWVbMl0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9SaW1MaWdodGluZ01peCwgKHZhbHVlKSA9PiAobWF0ZXJpYWwucmltTGlnaHRpbmdNaXggPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9SaW1GcmVzbmVsUG93ZXIsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnJpbUZyZXNuZWxQb3dlciA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1JpbUxpZnQsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnJpbUxpZnQgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eT4ocHJvcC52ZWN0b3JQcm9wZXJ0aWVzLl9FbWlzc2lvbkNvbG9yLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZW1pc3NpdmVDb2xvciA9IG5ldyBDb2xvcjModmFsdWVbMF0sIHZhbHVlWzFdLCB2YWx1ZVsyXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX091dGxpbmVXaWR0aCwgKHZhbHVlKSA9PiAobWF0ZXJpYWwub3V0bGluZVdpZHRoID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fT3V0bGluZVNjYWxlZE1heERpc3RhbmNlLCAodmFsdWUpID0+IChtYXRlcmlhbC5vdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eT4ocHJvcC52ZWN0b3JQcm9wZXJ0aWVzLl9PdXRsaW5lQ29sb3IsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5vdXRsaW5lQ29sb3IgPSBuZXcgQ29sb3IzKHZhbHVlWzBdLCB2YWx1ZVsxXSwgdmFsdWVbMl0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9PdXRsaW5lTGlnaHRpbmdNaXgsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLm91dGxpbmVMaWdodGluZ01peCA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1V2QW5pbVNjcm9sbFgsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnV2QW5pbWF0aW9uU2Nyb2xsWCA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1V2QW5pbVNjcm9sbFksICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnV2QW5pbWF0aW9uU2Nyb2xsWSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1V2QW5pbVJvdGF0aW9uLCAodmFsdWUpID0+IChtYXRlcmlhbC51dkFuaW1hdGlvblJvdGF0aW9uID0gdmFsdWUpKTtcclxuXHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX0RlYnVnTW9kZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuZGVidWdNb2RlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fQmxlbmRNb2RlLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiAvLyBPcGFxdWVcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYUJsZW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGFUZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6IC8vIFRyYW5zcGFyZW50Q3V0b3V0XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGFCbGVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhVGVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGFNb2RlID0gRW5naW5lLkFMUEhBX0NPTUJJTkU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6IC8vIFRyYW5zcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGFCbGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGFUZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGFNb2RlID0gRW5naW5lLkFMUEhBX0NPTUJJTkU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fT3V0bGluZVdpZHRoTW9kZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwub3V0bGluZVdpZHRoTW9kZSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX091dGxpbmVDb2xvck1vZGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLm91dGxpbmVDb2xvck1vZGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9DdWxsTW9kZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuY3VsbE1vZGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9PdXRsaW5lQ3VsbE1vZGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLm91dGxpbmVDdWxsTW9kZSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPGJvb2xlYW4+KHByb3Aua2V5d29yZE1hcC5fQUxQSEFCTEVORF9PTiwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuYWxwaGFCbGVuZCA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPGJvb2xlYW4+KHByb3Aua2V5d29yZE1hcC5fQUxQSEFURVNUX09OLCAodmFsdWUpID0+IChtYXRlcmlhbC5hbHBoYVRlc3QgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9aV3JpdGUsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5mb3JjZURlcHRoV3JpdGUgPSBNYXRoLnJvdW5kKHZhbHVlKSA9PT0gMTtcclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFsLmZvcmNlRGVwdGhXcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuZGlzYWJsZURlcHRoV3JpdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog44OX44Ot44OR44OG44Kj44GM6Kit5a6a44GV44KM44Gm44GE44KM44Gw44Kz44O844Or44OQ44OD44Kv44KS5a6f6KGM44GZ44KLXHJcbiAqL1xyXG5mdW5jdGlvbiBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8VD4ocHJvcDogVCB8IHVuZGVmaW5lZCwgY2FsbGJhY2s6ICh2YWx1ZTogVCkgPT4gdm9pZCkge1xyXG4gICAgaWYgKHR5cGVvZiBwcm9wID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNhbGxiYWNrKHByb3ApO1xyXG59XHJcbiIsImltcG9ydCB7IEFyY1JvdGF0ZUNhbWVyYSB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvQ2FtZXJhcy9hcmNSb3RhdGVDYW1lcmFcIjtcbmltcG9ydCB7IENvbG9yMywgVmVjdG9yMyB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aFwiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9FbmdpbmVzL2VuZ2luZVwiO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxMaWdodCB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTGlnaHRzL2RpcmVjdGlvbmFsTGlnaHRcIjtcbmltcG9ydCB7IEhlbWlzcGhlcmljTGlnaHQgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xpZ2h0cy9oZW1pc3BoZXJpY0xpZ2h0XCI7XG5pbXBvcnQgeyBQb2ludExpZ2h0IH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9MaWdodHMvcG9pbnRMaWdodFwiO1xuaW1wb3J0IHsgU2hhZG93R2VuZXJhdG9yIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9MaWdodHMvU2hhZG93cy9zaGFkb3dHZW5lcmF0b3JcIjtcbmltcG9ydCB7IFNjZW5lTG9hZGVyIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCI7XG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9NZXNoZXMvbWVzaFwiO1xuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL3NjZW5lXCI7XG5pbXBvcnQgdHlwZSB7IFZSTU1hbmFnZXIgfSBmcm9tIFwiLi4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvdnJtLW1hbmFnZXJcIjtcblxuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gXCJAYmFieWxvbmpzL2xvYWRlcnMvZ2xURi8yLjBcIjtcblxuaW1wb3J0IFwiQGJhYnlsb25qcy9jb3JlL0hlbHBlcnMvc2NlbmVIZWxwZXJzXCI7XG5pbXBvcnQgXCJAYmFieWxvbmpzL2NvcmUvTWVzaGVzL0J1aWxkZXJzL3NwaGVyZUJ1aWxkZXJcIjtcbmltcG9ydCBcIkBiYWJ5bG9uanMvY29yZS9NZXNoZXMvQnVpbGRlcnMvdG9ydXNLbm90QnVpbGRlclwiO1xuaW1wb3J0IFwiQGJhYnlsb25qcy9pbnNwZWN0b3JcIjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlc1xuaW1wb3J0ICogYXMgQlZMIGZyb20gXCIuL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvaW5kZXhcIjtcblxuaW1wb3J0IHsgVjNEQ29yZSB9IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQge1xuICBWUk1GaWxlTG9hZGVyLFxuICBWUk1Mb2FkZXJFeHRlbnNpb24sXG59IGZyb20gXCIuL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmNcIjtcblxuLy8gd2luZG93Lm9ubG9hZCA9IGFzeW5jIChlKSA9PiB7XG5hc3luYyBmdW5jdGlvbiBtYWluMigpIHtcbiAgLy8qIERlZmluZSB2cm0gZmlsZSBwYXRoLlxuICBjb25zdCB2cm1GaWxlID0gXCIuL3Rlc3RmaWxlcy9kZWZhdWx0LnZybVwiO1xuXG4gIC8vKiBDcmVhdGUgYW4gRW5naW5lIGluc3RhbmNlLlxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBjb25zdCBkZWJ1Z1Byb3BlcnRpZXMgPSBnZXREZWJ1Z1Byb3BlcnRpZXMoKTtcbiAgY29uc29sZS5sb2coXCJkZWJ1Z1Byb3BlcnRpZXMud2ViZ2wxOiBcIiwgZGVidWdQcm9wZXJ0aWVzLndlYmdsMSk7XG4gIGNvbnN0IGVuZ2luZSA9IG5ldyBFbmdpbmUoY2FudmFzLCB0cnVlLCB7XG4gICAgYWxwaGE6IGZhbHNlLFxuICAgIGRpc2FibGVXZWJHTDJTdXBwb3J0OiBkZWJ1Z1Byb3BlcnRpZXMud2ViZ2wxLFxuICB9KTtcbiAgY29uc3Qgc2NlbmUgPSBuZXcgU2NlbmUoZW5naW5lKTtcbiAgY29uc3QgY2FtZXJhID0gbmV3IEFyY1JvdGF0ZUNhbWVyYShcbiAgICBcIk1haW5DYW1lcmExXCIsXG4gICAgMCxcbiAgICAwLFxuICAgIDMsXG4gICAgbmV3IFZlY3RvcjMoMCwgMS4yLCAwKSxcbiAgICBzY2VuZSxcbiAgICB0cnVlXG4gICk7XG4gIGNhbWVyYS5sb3dlclJhZGl1c0xpbWl0ID0gMC4xO1xuICBjYW1lcmEudXBwZXJSYWRpdXNMaW1pdCA9IDIwO1xuICBjYW1lcmEud2hlZWxEZWx0YVBlcmNlbnRhZ2UgPSAwLjAxO1xuICBjYW1lcmEubWluWiA9IDAuMztcbiAgY2FtZXJhLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMS4yLCAtMyk7XG4gIGNhbWVyYS5hdHRhY2hDb250cm9sKGNhbnZhcywgdHJ1ZSk7XG5cbiAgLy8qIENyZWF0ZSBhIFYzRENvcmUgaW5zdGFuY2UuXG4gIGNvbnN0IHYzRENvcmUgPSBuZXcgVjNEQ29yZShlbmdpbmUsIHNjZW5lLCBjYW1lcmEpO1xuICB2M0RDb3JlLnRyYW5zcGFyZW50QmFja2dyb3VuZCgpO1xuICBhd2FpdCB2M0RDb3JlLkFwcGVuZEFzeW5jKFwiXCIsIHZybUZpbGUpO1xuXG4gIC8vIEdldCBtYW5hZ2Vyc1xuICAvLyBjb25zdCB2cm1NYW5hZ2VyID0gdjNEQ29yZS5nZXRWUk1NYW5hZ2VyQnlVUkkodnJtRmlsZSk7XG4gIC8vIGNvbnNvbGUubG9nKFwidnJtTWFuYWdlcjogXCIsIHZybU1hbmFnZXIpO1xuXG4gIC8vIENhbWVyYVxuICAvLyB2M0RDb3JlLmF0dGFjaENhbWVyYVRvKHZybU1hbmFnZXIpO1xuXG4gIC8vIExpZ2h0c1xuICB2M0RDb3JlLmFkZEFtYmllbnRMaWdodChuZXcgQ29sb3IzKDEsIDEsIDEpKTtcblxuICAvLyBMb2NrIGNhbWVyYSB0YXJnZXRcbiAgLy8gdjNEQ29yZS5zY2VuZS5vbkJlZm9yZVJlbmRlck9ic2VydmFibGUuYWRkKCgpID0+IHtcbiAgLy8gICB2cm1NYW5hZ2VyLmNhbWVyYXNbMF0uc2V0VGFyZ2V0KHZybU1hbmFnZXIucm9vdE1lc2guZ2V0QWJzb2x1dGVQb3NpdGlvbigpKTtcbiAgLy8gfSk7XG5cbiAgZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4ge1xuICAgIHYzRENvcmUuc2NlbmUucmVuZGVyKCk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluMSgpIHtcbiAgaWYgKFNjZW5lTG9hZGVyKSB7XG4gICAgU2NlbmVMb2FkZXIuUmVnaXN0ZXJQbHVnaW4obmV3IEJWTC5WUk1GaWxlTG9hZGVyKCkpO1xuICB9XG4gIC8vIEdMVEZMb2FkZXIuUmVnaXN0ZXJFeHRlbnNpb24oXCJWUk1cIiwgKGxvYWRlcikgPT4ge1xuICAvLyAgIGNvbnNvbGUubG9nKFwibG9hZGVyOiBcIiwgbG9hZGVyKTtcbiAgLy8gICBjb25zb2xlLmxvZyhcImxvYWRlci5iYWJ5bG9uU2NlbmU6IFwiLCBsb2FkZXIuYmFieWxvblNjZW5lKTtcbiAgLy8gICByZXR1cm4gbmV3IFZSTShsb2FkZXIpO1xuICAvLyB9KTtcblxuICBjb25zdCBkZWJ1Z1Byb3BlcnRpZXMgPSBnZXREZWJ1Z1Byb3BlcnRpZXMoKTtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgY29uc3QgZW5naW5lID0gbmV3IEVuZ2luZShjYW52YXMsIHRydWUsIHtcbiAgICBhbHBoYTogZmFsc2UsXG4gICAgZGlzYWJsZVdlYkdMMlN1cHBvcnQ6IGRlYnVnUHJvcGVydGllcy53ZWJnbDEsXG4gIH0pO1xuICBjb25zdCBzY2VuZSA9IG5ldyBTY2VuZShlbmdpbmUpO1xuICBjb25zdCBjYW1lcmEgPSBuZXcgQXJjUm90YXRlQ2FtZXJhKFxuICAgIFwiTWFpbkNhbWVyYTFcIixcbiAgICAwLFxuICAgIDAsXG4gICAgMyxcbiAgICBuZXcgVmVjdG9yMygwLCAxLjIsIDApLFxuICAgIHNjZW5lLFxuICAgIHRydWVcbiAgKTtcbiAgY2FtZXJhLmxvd2VyUmFkaXVzTGltaXQgPSAwLjE7XG4gIGNhbWVyYS51cHBlclJhZGl1c0xpbWl0ID0gMjA7XG4gIGNhbWVyYS53aGVlbERlbHRhUGVyY2VudGFnZSA9IDAuMDE7XG4gIGNhbWVyYS5taW5aID0gMC4zO1xuICBjYW1lcmEucG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLCAxLjIsIC0zKTtcbiAgY2FtZXJhLmF0dGFjaENvbnRyb2woY2FudmFzLCB0cnVlKTtcbiAgY29uc29sZS5sb2coXCJjYW1lcmE6IFwiLCBjYW1lcmEpO1xuXG4gIGNvbnN0IGRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodChcbiAgICBcIkRpcmVjdGlvbmFsTGlnaHQxXCIsXG4gICAgbmV3IFZlY3RvcjMoMCwgLTAuNSwgMS4wKSxcbiAgICBzY2VuZVxuICApO1xuICBkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMjUsIC01MCk7XG4gIGRpcmVjdGlvbmFsTGlnaHQuc2V0RW5hYmxlZCh0cnVlKTtcblxuICAod2luZG93IGFzIGFueSkuY3VycmVudFNjZW5lID0gc2NlbmU7XG4gIGVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHtcbiAgICBzY2VuZS5yZW5kZXIoKTtcbiAgfSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgU2NlbmVMb2FkZXIuQXBwZW5kQXN5bmMoXG4gICAgXCJcIixcbiAgICBcIi4vdGVzdGZpbGVzL2RlZmF1bHQudnJtXCIsXG4gICAgc2NlbmVcbiAgKTtcbiAgLy8gY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBTY2VuZUxvYWRlci5Mb2FkQXN5bmMoXG4gIC8vICAgXCJmaWxlOlwiLFxuICAvLyAgIFwiLi90ZXN0ZmlsZXMvZGVmYXVsdC52cm1cIixcbiAgLy8gICBlbmdpbmVcbiAgLy8gKTtcbiAgY29uc29sZS5sb2coXCJyZXNwb25zZTogXCIsIHJlc3BvbnNlKTtcbiAgY29uc29sZS5sb2coXCJyZXNwb25zZS5tZXRhZGF0YTogXCIsIHJlc3BvbnNlLm1ldGFkYXRhKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgaWYgKFNjZW5lTG9hZGVyKSB7XG4gICAgU2NlbmVMb2FkZXIuUmVnaXN0ZXJQbHVnaW4obmV3IEJWTC5WUk1GaWxlTG9hZGVyKCkpO1xuICB9XG4gIC8vIEdMVEZMb2FkZXIuUmVnaXN0ZXJFeHRlbnNpb24oXCJWUk1cIiwgKGxvYWRlcikgPT4ge1xuICAvLyAgIGNvbnNvbGUubG9nKFwibG9hZGVyOiBcIiwgbG9hZGVyKTtcbiAgLy8gICByZXR1cm4gbmV3IEJWTC5WUk1Mb2FkZXJFeHRlbnNpb24obG9hZGVyKTtcbiAgLy8gfSk7XG5cbiAgY29uc3QgZGVidWdQcm9wZXJ0aWVzID0gZ2V0RGVidWdQcm9wZXJ0aWVzKCk7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGNvbnNvbGUubG9nKFwiZGVidWdQcm9wZXJ0aWVzLndlYmdsMTogXCIsIGRlYnVnUHJvcGVydGllcy53ZWJnbDEpO1xuICBjb25zdCBlbmdpbmUgPSBuZXcgRW5naW5lKGNhbnZhcywgdHJ1ZSwge1xuICAgIGFscGhhOiBmYWxzZSxcbiAgICBkaXNhYmxlV2ViR0wyU3VwcG9ydDogZGVidWdQcm9wZXJ0aWVzLndlYmdsMSxcbiAgfSk7XG4gIGNvbnNvbGUubG9nKFwiZW5naW5lOiBcIiwgZW5naW5lKTtcbiAgY29uc3Qgc2NlbmUgPSBuZXcgU2NlbmUoZW5naW5lKTtcbiAgY29uc29sZS5sb2coXCJzY2VuZTogXCIsIHNjZW5lKTtcbiAgY29uc3QgY2FtZXJhID0gbmV3IEFyY1JvdGF0ZUNhbWVyYShcbiAgICBcIk1haW5DYW1lcmExXCIsXG4gICAgMCxcbiAgICAwLFxuICAgIDMsXG4gICAgbmV3IFZlY3RvcjMoMCwgMS4yLCAwKSxcbiAgICBzY2VuZSxcbiAgICB0cnVlXG4gICk7XG4gIGNhbWVyYS5sb3dlclJhZGl1c0xpbWl0ID0gMC4xO1xuICBjYW1lcmEudXBwZXJSYWRpdXNMaW1pdCA9IDIwO1xuICBjYW1lcmEud2hlZWxEZWx0YVBlcmNlbnRhZ2UgPSAwLjAxO1xuICBjYW1lcmEubWluWiA9IDAuMztcbiAgY2FtZXJhLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMS4yLCAtMyk7XG4gIGNhbWVyYS5hdHRhY2hDb250cm9sKGNhbnZhcywgdHJ1ZSk7XG4gIGNvbnNvbGUubG9nKFwiY2FtZXJhOiBcIiwgY2FtZXJhKTtcblxuICBzY2VuZS5jcmVhdGVEZWZhdWx0RW52aXJvbm1lbnQoe1xuICAgIGNyZWF0ZUdyb3VuZDogdHJ1ZSxcbiAgICBjcmVhdGVTa3lib3g6IGZhbHNlLFxuICAgIGVuYWJsZUdyb3VuZE1pcnJvcjogZmFsc2UsXG4gICAgZW5hYmxlR3JvdW5kU2hhZG93OiBmYWxzZSxcbiAgfSk7XG5cbiAgLy8gTGlnaHRzXG4gIGNvbnN0IGRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodChcbiAgICBcIkRpcmVjdGlvbmFsTGlnaHQxXCIsXG4gICAgbmV3IFZlY3RvcjMoMCwgLTAuNSwgMS4wKSxcbiAgICBzY2VuZVxuICApO1xuICBkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMjUsIC01MCk7XG4gIGRpcmVjdGlvbmFsTGlnaHQuc2V0RW5hYmxlZCh0cnVlKTtcbiAgY29uc3QgaGVtaXNwaGVyaWNMaWdodCA9IG5ldyBIZW1pc3BoZXJpY0xpZ2h0KFxuICAgIFwiSGVtaXNwaGVyaWNMaWdodDFcIixcbiAgICBuZXcgVmVjdG9yMygtMC4yLCAtMC44LCAtMSksXG4gICAgc2NlbmVcbiAgKTtcbiAgaGVtaXNwaGVyaWNMaWdodC5zZXRFbmFibGVkKGZhbHNlKTtcbiAgY29uc3QgcG9pbnRMaWdodCA9IG5ldyBQb2ludExpZ2h0KFwiUG9pbnRMaWdodDFcIiwgbmV3IFZlY3RvcjMoMCwgMCwgMSksIHNjZW5lKTtcbiAgcG9pbnRMaWdodC5zZXRFbmFibGVkKGZhbHNlKTtcblxuICAvLyBNZXNoZXNcbiAgY29uc3Qgc3RhbmRhcmRNYXRlcmlhbFNwaGVyZSA9IE1lc2guQ3JlYXRlU3BoZXJlKFxuICAgIFwiU3RhbmRhcmRNYXRlcmlhbFNwaGVyZTFcIixcbiAgICAxNixcbiAgICAxLFxuICAgIHNjZW5lXG4gICk7XG4gIHN0YW5kYXJkTWF0ZXJpYWxTcGhlcmUucG9zaXRpb24gPSBuZXcgVmVjdG9yMygxLjUsIDEuMiwgMCk7XG4gIHN0YW5kYXJkTWF0ZXJpYWxTcGhlcmUucmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xuXG4gIGNvbnN0IHNoYWRvd0Nhc3RlciA9IE1lc2guQ3JlYXRlVG9ydXNLbm90KFxuICAgIFwiU2hhZG93Q2FzdGVyXCIsXG4gICAgMSxcbiAgICAwLjIsXG4gICAgMzIsXG4gICAgMzIsXG4gICAgMixcbiAgICAzLFxuICAgIHNjZW5lXG4gICk7XG4gIHNoYWRvd0Nhc3Rlci5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAuMCwgNS4wLCAtMTAuMCk7XG4gIHNoYWRvd0Nhc3Rlci5zZXRFbmFibGVkKGRlYnVnUHJvcGVydGllcy5zaGFkb3cpO1xuICBpZiAoZGVidWdQcm9wZXJ0aWVzLnNoYWRvdykge1xuICAgIGNvbnN0IHNoYWRvd0dlbmVyYXRvciA9IG5ldyBTaGFkb3dHZW5lcmF0b3IoMTAyNCwgZGlyZWN0aW9uYWxMaWdodCk7XG4gICAgc2hhZG93R2VuZXJhdG9yLmFkZFNoYWRvd0Nhc3RlcihzaGFkb3dDYXN0ZXIpO1xuICB9XG5cbiAgaWYgKGRlYnVnUHJvcGVydGllcy5pbnNwZWN0b3IpIHtcbiAgICBhd2FpdCBzY2VuZS5kZWJ1Z0xheWVyLnNob3coe1xuICAgICAgZ2xvYmFsUm9vdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3cmFwcGVyXCIpIGFzIEhUTUxFbGVtZW50LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gRXhwb3NlIGN1cnJlbnQgc2NlbmVcbiAgKHdpbmRvdyBhcyBhbnkpLmN1cnJlbnRTY2VuZSA9IHNjZW5lO1xuXG4gIHNjZW5lLm9uQmVmb3JlUmVuZGVyT2JzZXJ2YWJsZS5hZGQoKCkgPT4ge1xuICAgIC8vIFNwcmluZ0JvbmVcbiAgICBpZiAoIXNjZW5lLm1ldGFkYXRhIHx8ICFzY2VuZS5tZXRhZGF0YS52cm1NYW5hZ2Vycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBtYW5hZ2VycyA9IHNjZW5lLm1ldGFkYXRhLnZybU1hbmFnZXJzIGFzIFZSTU1hbmFnZXJbXTtcbiAgICBjb25zdCBkZWx0YVRpbWUgPSBzY2VuZS5nZXRFbmdpbmUoKS5nZXREZWx0YVRpbWUoKTtcbiAgICBtYW5hZ2Vycy5mb3JFYWNoKChtYW5hZ2VyKSA9PiB7XG4gICAgICBtYW5hZ2VyLnVwZGF0ZShkZWx0YVRpbWUpO1xuICAgIH0pO1xuICB9KTtcbiAgZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4ge1xuICAgIHNjZW5lLnJlbmRlcigpO1xuICAgIHNoYWRvd0Nhc3Rlci5yb3RhdGUoVmVjdG9yMy5VcCgpLCAwLjAxKTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICBlbmdpbmUucmVzaXplKCk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhcInRyeSB0byBjYWxsIFNjZW5lTG9hZGVyLkFwcGVuZEFzeW5jKClcIik7XG4gIGNvbnNvbGUubG9nKFwiU2NlbmVMb2FkZXI6IFwiLCBTY2VuZUxvYWRlcik7XG4gIC8vIGF3YWl0IFNjZW5lTG9hZGVyLkFwcGVuZEFzeW5jKFwiLi9cIiwgXCJBbGljaWFTb2xpZC52cm1cIiwgc2NlbmUpO1xuICAvLyBhd2FpdCBTY2VuZUxvYWRlci5BcHBlbmRBc3luYyhcIi4vXCIsIFwiNzgyMjQ0NDMzNjQ5NzAwNDUyNi52cm1cIiwgc2NlbmUpO1xuICBhd2FpdCBTY2VuZUxvYWRlci5BcHBlbmRBc3luYyhcIi4vXCIsIFwiZGVmYXVsdC52cm1cIiwgc2NlbmUpO1xuXG4gIGNvbnNvbGUubG9nKFwidHJ5IHRvIGNhbGwgYWRkRXZlbnRMaXN0ZW5lcigpXCIpO1xuICBsZXQgZmlsZUNvdW50ID0gMTtcbiAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsZS1pbnB1dFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2hhbmdlXCIsXG4gICAgKGV2dCkgPT4ge1xuICAgICAgY29uc3QgZmlsZSA9IChldnQgYXMgYW55KS50YXJnZXQuZmlsZXNbMF07XG4gICAgICBjb25zb2xlLmxvZyhgbG9hZHMgJHtmaWxlLm5hbWV9ICR7ZmlsZS5zaXplfSBieXRlc2ApO1xuICAgICAgY29uc3QgY3VycmVudE1lc2hDb3VudCA9IHNjZW5lLm1lc2hlcy5sZW5ndGg7XG4gICAgICBTY2VuZUxvYWRlci5BcHBlbmQoXCJmaWxlOlwiLCBmaWxlLCBzY2VuZSwgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgbG9hZGVkICR7ZmlsZS5uYW1lfWApO1xuICAgICAgICBmb3IgKGxldCBpID0gY3VycmVudE1lc2hDb3VudDsgaSA8IHNjZW5lLm1lc2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHNjZW5lLm1lc2hlc1tpXS50cmFuc2xhdGUoVmVjdG9yMy5SaWdodCgpLCAxLjUgKiBmaWxlQ291bnQpO1xuICAgICAgICAgIHNjZW5lLm1lc2hlc1tpXS5yZWNlaXZlU2hhZG93cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZmlsZUNvdW50Kys7XG4gICAgICB9KTtcbiAgICB9XG4gICk7XG59XG5cbmludGVyZmFjZSBEZWJ1Z1Byb3BlcnRpZXMge1xuICB3ZWJnbDE6IGJvb2xlYW47XG4gIHNoYWRvdzogYm9vbGVhbjtcbiAgaW5zcGVjdG9yOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBnZXREZWJ1Z1Byb3BlcnRpZXMoKTogRGVidWdQcm9wZXJ0aWVzIHtcbiAgY29uc3QgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gIHJldHVybiB7XG4gICAgd2ViZ2wxOiBocmVmLmluY2x1ZGVzKFwid2ViZ2wxXCIpLFxuICAgIHNoYWRvdzogaHJlZi5pbmNsdWRlcyhcInNoYWRvd1wiKSxcbiAgICBpbnNwZWN0b3I6IGhyZWYuaW5jbHVkZXMoXCJpbnNwZWN0b3JcIiksXG4gIH07XG59XG5cbm1haW4yKCkuY2F0Y2goKHJlYXNvbikgPT4ge1xuICBjb25zb2xlLmVycm9yKHJlYXNvbik7XG59KTtcbiIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5leHBvcnQgKiBmcm9tIFwiLi92M2QtY29yZVwiXG5leHBvcnQgKiBmcm9tIFwiLi9oZWxwZXJcIlxuIiwiLyoqIENvcHlyaWdodCAoYykgMjAyMSBUaGUgdjNkIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIGZpbGUsXG4gKiBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICovXG5cbmltcG9ydCB7SGFyZHdhcmVTY2FsaW5nT3B0aW1pemF0aW9uLFxuICAgIExlbnNGbGFyZXNPcHRpbWl6YXRpb24sXG4gICAgTnVsbGFibGUsXG4gICAgUGFydGljbGVzT3B0aW1pemF0aW9uLFxuICAgIFBvc3RQcm9jZXNzZXNPcHRpbWl6YXRpb24sXG4gICAgUmVuZGVyVGFyZ2V0c09wdGltaXphdGlvbiwgU2NlbmUsIFNjZW5lT3B0aW1pemVyLCBTY2VuZU9wdGltaXplck9wdGlvbnMsIFRleHR1cmVPcHRpbWl6YXRpb24gfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlXCI7XG5pbXBvcnQge1YzRENvcmV9IGZyb20gXCIuLi9pbmRleFwiO1xuXG5leHBvcnQgY2xhc3MgVjNEU2NlbmVPcHRpbWl6ZXIge1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9taXplZCBzY2VuZSBvcHRpbWl6ZXIgb3B0aW9ucy5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX29wdGlvbnM6IFNjZW5lT3B0aW1pemVyT3B0aW9ucztcbiAgICBnZXQgb3B0aW9ucygpOiBTY2VuZU9wdGltaXplck9wdGlvbnN7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cbiAgICBzZXQgb3B0aW9ucyh2YWx1ZTogU2NlbmVPcHRpbWl6ZXJPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTY2VuZU9wdGltaXplclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBfb3B0aW1pemVyOiBTY2VuZU9wdGltaXplcjtcbiAgICBnZXQgb3B0aW1pemVyKCk6IFNjZW5lT3B0aW1pemVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGltaXplcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgc2NlbmU6IFNjZW5lLFxuICAgICAgICBvcHRpb25zPzogTnVsbGFibGU8U2NlbmVPcHRpbWl6ZXJPcHRpb25zPixcbiAgICApIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnMgfHwgVjNEU2NlbmVPcHRpbWl6ZXIuQ3VzdG9tT3B0aW1pemVyT3B0aW9ucygpO1xuICAgICAgICB0aGlzLl9vcHRpbWl6ZXIgPSBuZXcgU2NlbmVPcHRpbWl6ZXIoc2NlbmUsIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICB0aGlzLl9vcHRpbWl6ZXIudGFyZ2V0RnJhbWVSYXRlID0gVjNEQ29yZS5GUkFNRVJBVEU7XG4gICAgICAgIHRoaXMuX29wdGltaXplci50cmFja2VyRHVyYXRpb24gPSAyMDAwO1xuXG4gICAgICAgIHRoaXMuX29wdGltaXplci5zdGFydCgpO1xuICAgICAgICB0aGlzLnNldHVwRm9jdXNFdmVudHModGhpcy5fb3B0aW1pemVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBDdXN0b21PcHRpbWl6ZXJPcHRpb25zKCk6IFNjZW5lT3B0aW1pemVyT3B0aW9ucyB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgU2NlbmVPcHRpbWl6ZXJPcHRpb25zKCk7XG4gICAgICAgIG9wdGlvbnMuYWRkT3B0aW1pemF0aW9uKG5ldyBMZW5zRmxhcmVzT3B0aW1pemF0aW9uKDApKTtcbiAgICAgICAgb3B0aW9ucy5hZGRPcHRpbWl6YXRpb24obmV3IFBhcnRpY2xlc09wdGltaXphdGlvbigxKSk7XG4gICAgICAgIG9wdGlvbnMuYWRkT3B0aW1pemF0aW9uKG5ldyBUZXh0dXJlT3B0aW1pemF0aW9uKDEsIDUxMikpO1xuICAgICAgICBvcHRpb25zLmFkZE9wdGltaXphdGlvbihuZXcgUmVuZGVyVGFyZ2V0c09wdGltaXphdGlvbigyKSk7XG4gICAgICAgIG9wdGlvbnMuYWRkT3B0aW1pemF0aW9uKG5ldyBQb3N0UHJvY2Vzc2VzT3B0aW1pemF0aW9uKDMpKTtcbiAgICAgICAgb3B0aW9ucy5hZGRPcHRpbWl6YXRpb24obmV3IEhhcmR3YXJlU2NhbGluZ09wdGltaXphdGlvbig0LCAyKSk7XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cEZvY3VzRXZlbnRzKG9wdGltaXplcjogU2NlbmVPcHRpbWl6ZXIpIHtcbiAgICAgICAgaWYgKHdpbmRvdykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXR1cEZvY3VzRXZlbnRzXCIpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3B0aW1pemVyIHN0YXJ0XCIpO1xuICAgICAgICAgICAgICAgIG9wdGltaXplci5zdGFydCgpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3B0aW1pemVyIHN0b3BcIik7XG4gICAgICAgICAgICAgICAgb3B0aW1pemVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZXIucmVzZXQoKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqIENvcHlyaWdodCAoYykgMjAyMSBUaGUgdjNkIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIGZpbGUsXG4gKiBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICovXG5cbmltcG9ydCB7TWF0ZXJpYWwsIEJhY2tncm91bmRNYXRlcmlhbCwgQmFzZVRleHR1cmUsIENvbG9yMywgQ3ViZVRleHR1cmUsIE1lc2gsIFNjZW5lLCBUZXh0dXJlfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlXCI7XG5pbXBvcnQge1NreU1hdGVyaWFsfSBmcm9tIFwiQGJhYnlsb25qcy9tYXRlcmlhbHNcIjtcblxuXG5leHBvcnQgY2xhc3MgdjNEU2t5Qm94IHtcblxuICAgIHByaXZhdGUgc3RhdGljIF9lbnZpcm9ubWVudFRleHR1cmVDRE5VcmwgPSBcImh0dHBzOi8vYXNzZXRzLmJhYnlsb25qcy5jb20vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50U3BlY3VsYXIuZW52XCI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IF9za3lib3g6IE1lc2g7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2t5Ym94QmFzZTogTWVzaDtcbiAgICBnZXQgc2t5Ym94KCk6IE1lc2gge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2t5Ym94O1xuICAgIH1cblxuICAgIHB1YmxpYyBza3lib3hNYXRlcmlhbDogQmFja2dyb3VuZE1hdGVyaWFsO1xuICAgIHB1YmxpYyBza3lib3hCYXNlTWF0ZXJpYWw6IFNreU1hdGVyaWFsO1xuICAgIHB1YmxpYyBza3lib3hSZWZsZWN0aW9uVGV4dHVyZTogQ3ViZVRleHR1cmU7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgc2NlbmU6IFNjZW5lLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHRleHR1cmVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib3hTaXplOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBlbnZUZXh0dXJlPzogQmFzZVRleHR1cmUsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX3NreWJveCA9IE1lc2guQ3JlYXRlQm94KFwiU2t5Ym94XCIsIGJveFNpemUsIHRoaXMuc2NlbmUsIHVuZGVmaW5lZCwgTWVzaC5CQUNLU0lERSk7XG4gICAgICAgIHRoaXMuX3NreWJveEJhc2UgPSBNZXNoLkNyZWF0ZUJveChcIlNreWJveEJhc2VcIiwgYm94U2l6ZSsxLCB0aGlzLnNjZW5lLCB1bmRlZmluZWQsIE1lc2guQkFDS1NJREUpO1xuICAgICAgICB0aGlzLmNyZWF0ZU1hdGVyaWFsKHRleHR1cmVOYW1lKTtcbiAgICAgICAgdGhpcy5fc2t5Ym94Lm1hdGVyaWFsID0gdGhpcy5za3lib3hNYXRlcmlhbDtcbiAgICAgICAgdGhpcy5fc2t5Ym94QmFzZS5tYXRlcmlhbCA9IHRoaXMuc2t5Ym94QmFzZU1hdGVyaWFsO1xuICAgICAgICB0aGlzLl9za3lib3gucmVuZGVyaW5nR3JvdXBJZCA9IDA7XG4gICAgICAgIHRoaXMuX3NreWJveEJhc2UucmVuZGVyaW5nR3JvdXBJZCA9IDA7XG4gICAgICAgIHRoaXMuX3NreWJveC5tYXRlcmlhbC50cmFuc3BhcmVuY3lNb2RlID0gTWF0ZXJpYWwuTUFURVJJQUxfQUxQSEFURVNUQU5EQkxFTkQ7XG4gICAgICAgIHRoaXMuX3NreWJveC5tYXRlcmlhbC5hbHBoYSA9IDAuNTtcbiAgICAgICAgdGhpcy5zZXR1cEltYWdlUHJvY2Vzc2luZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBza3lib3ggbWF0ZXJpYWwgYW5kIHRoZSBza3lib3ggcmVmbGVjdGlvbiB0ZXh0dXJlXG4gICAgICogQHBhcmFtIHRleHR1cmVOYW1lIG5hbWUgKFVSSSkgdG8gdGhlIHRleHR1cmUgZmlsZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlTWF0ZXJpYWwodGV4dHVyZU5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNreWJveEJhc2VNYXRlcmlhbCA9IG5ldyBTa3lNYXRlcmlhbChcIlNreWJveEJhc2VNYXRlcmlhbFwiLCB0aGlzLnNjZW5lKTtcbiAgICAgICAgdGhpcy5za3lib3hNYXRlcmlhbCA9IG5ldyBCYWNrZ3JvdW5kTWF0ZXJpYWwoXCJTa3lib3hNYXRlcmlhbFwiLCB0aGlzLnNjZW5lKTtcbiAgICAgICAgdGhpcy5za3lib3hNYXRlcmlhbC5iYWNrRmFjZUN1bGxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5za3lib3hNYXRlcmlhbC51c2VSR0JDb2xvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNreWJveE1hdGVyaWFsLnByaW1hcnlDb2xvciA9IG5ldyBDb2xvcjMoMSwgMSwgMSk7XG4gICAgICAgIHRoaXMuc2t5Ym94TWF0ZXJpYWwuZW5hYmxlTm9pc2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNreWJveFJlZmxlY3Rpb25UZXh0dXJlID0gbmV3IEN1YmVUZXh0dXJlKHRleHR1cmVOYW1lLCB0aGlzLnNjZW5lKTtcbiAgICAgICAgdGhpcy5za3lib3hSZWZsZWN0aW9uVGV4dHVyZS5jb29yZGluYXRlc01vZGUgPSBUZXh0dXJlLlNLWUJPWF9NT0RFO1xuICAgICAgICB0aGlzLnNreWJveFJlZmxlY3Rpb25UZXh0dXJlLmdhbW1hU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5za3lib3hNYXRlcmlhbC5yZWZsZWN0aW9uVGV4dHVyZSA9IHRoaXMuc2t5Ym94UmVmbGVjdGlvblRleHR1cmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIGltYWdlIHByb2Nlc3NpbmcgYWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpZWQgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldHVwSW1hZ2VQcm9jZXNzaW5nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjZW5lLmltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24uY29udHJhc3QgPSAxLjI7XG4gICAgICAgIHRoaXMuc2NlbmUuaW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5leHBvc3VyZSA9IDAuODtcbiAgICAgICAgdGhpcy5zY2VuZS5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLnRvbmVNYXBwaW5nRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NlbmUuZW52aXJvbm1lbnRUZXh0dXJlID0gdGhpcy5lbnZUZXh0dXJlID8gdGhpcy5lbnZUZXh0dXJlXG4gICAgICAgICAgICA6IEN1YmVUZXh0dXJlLkNyZWF0ZUZyb21QcmVmaWx0ZXJlZERhdGEodjNEU2t5Qm94Ll9lbnZpcm9ubWVudFRleHR1cmVDRE5VcmwsIHRoaXMuc2NlbmUpO1xuICAgIH1cbn1cbiIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5pbXBvcnQge0lTaGFkb3dMaWdodCwgTGlnaHQsXG4gICAgQW5pbWF0aW9ufSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlXCI7XG5pbXBvcnQge0NvbG9yMywgQ29sb3I0LCBRdWF0ZXJuaW9uLCBTaXplLCBWZWN0b3IyLCBWZWN0b3IzIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0lTaGFkb3dMaWdodChsaWdodDogTGlnaHQpIDogbGlnaHQgaXMgSVNoYWRvd0xpZ2h0IHtcbiAgICByZXR1cm4gKGxpZ2h0IGFzIElTaGFkb3dMaWdodCkuc2V0U2hhZG93UHJvamVjdGlvbk1hdHJpeCAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5pbWF0aW9uRGF0YVR5cGUodmFsdWU6IGFueSkge1xuICAgIGxldCBkYXRhVHlwZSA9IHVuZGVmaW5lZDtcblxuICAgIGlmICghaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICYmIGlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FUO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBRdWF0ZXJuaW9uKSB7XG4gICAgICAgIGRhdGFUeXBlID0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfUVVBVEVSTklPTjtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgVmVjdG9yMykge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1ZFQ1RPUjM7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFZlY3RvcjIpIHtcbiAgICAgICAgZGF0YVR5cGUgPSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9WRUNUT1IyO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBDb2xvcjMpIHtcbiAgICAgICAgZGF0YVR5cGUgPSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9DT0xPUjM7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIENvbG9yNCkge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0NPTE9SNDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2l6ZSkge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1NJWkU7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFUeXBlID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGF0YVR5cGU7XG4gICAgfVxufVxuIiwiLyoqIENvcHlyaWdodCAoYykgMjAyMSBUaGUgdjNkIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIGZpbGUsXG4gKiBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICovXG5cbmltcG9ydCB7IEFyY1JvdGF0ZUNhbWVyYSB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvQ2FtZXJhcy9hcmNSb3RhdGVDYW1lcmFcIjtcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9zY2VuZVwiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9FbmdpbmVzL2VuZ2luZVwiO1xuaW1wb3J0IHsgU2NlbmVMb2FkZXIgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXJcIjtcbmltcG9ydCB7IENvbG9yMywgQ29sb3I0LCBWZWN0b3IzIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoXCI7XG5cbmltcG9ydCB7IEdMVEZMb2FkZXJFeHRlbnNpb25PYnNlcnZlciB9IGZyb20gXCIuL2ltcG9ydGVyL2xvYWRlci1vYnNlcnZlclwiO1xuaW1wb3J0IHtcbiAgVlJNRmlsZUxvYWRlcixcbiAgVlJNTG9hZGVyRXh0ZW5zaW9uLFxuICBWUk1NYW5hZ2VyLFxufSBmcm9tIFwiLi9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjXCI7XG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSBcIkBiYWJ5bG9uanMvbG9hZGVycy9nbFRGLzIuMFwiO1xuaW1wb3J0IHsgSGVtaXNwaGVyaWNMaWdodCB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTGlnaHRzL2hlbWlzcGhlcmljTGlnaHRcIjtcbmltcG9ydCB7XG4gIEFuaW1hdGlvbixcbiAgQW5pbWF0YWJsZSxcbiAgQ2FtZXJhLFxuICBEZWZhdWx0UmVuZGVyaW5nUGlwZWxpbmUsXG4gIEV2ZW50U3RhdGUsXG4gIElTaGFkb3dMaWdodCxcbiAgU2hhZG93R2VuZXJhdG9yLFxuICBEZXB0aE9mRmllbGRFZmZlY3RCbHVyTGV2ZWwsXG4gIElBbmltYXRpb25LZXksXG4gIEVhc2luZ0Z1bmN0aW9uLFxuICBOdWxsYWJsZSxcbiAgU2NlbmVPcHRpbWl6ZXJPcHRpb25zLFxufSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlXCI7XG5pbXBvcnQgeyBnZXRBbmltYXRpb25EYXRhVHlwZSwgaXNJU2hhZG93TGlnaHQgfSBmcm9tIFwiLi91dGlsaXRpZXMvdHlwZXNcIjtcbmltcG9ydCB7IFYzRFNjZW5lT3B0aW1pemVyIH0gZnJvbSBcIi4vc2NlbmUvb3B0aW1pemVyXCI7XG5pbXBvcnQgeyB2M0RTa3lCb3ggfSBmcm9tIFwiLi9zY2VuZS9za3lib3hcIjtcbmltcG9ydCB7IERpcmVjdGlvbmFsTGlnaHQgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xpZ2h0cy9kaXJlY3Rpb25hbExpZ2h0XCI7XG5cbmV4cG9ydCBjbGFzcyBWM0RDb3JlIGltcGxlbWVudHMgR0xURkxvYWRlckV4dGVuc2lvbk9ic2VydmVyIHtcbiAgcHVibGljIHN0YXRpYyBGUkFNRVJBVEUgPSA2MDtcblxuICAvKipcbiAgICogR0xURkZpbGVMb2FkZXIgcGx1Z2luIGZhY3RvcnlcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3ZybUZpbGVMb2FkZXIgPSBuZXcgVlJNRmlsZUxvYWRlcigpO1xuXG4gIC8vIFdoZXRoZXIgc3RhcnRzIHNwcmluZyBib25lcyBhbmltYXRpb24gYXV0b21hdGljYWxseVxuICBwcml2YXRlIF9zcHJpbmdCb25lc0F1dG9VcGRhdGUgPSB0cnVlO1xuICBnZXQgc3ByaW5nQm9uZXNBdXRvVXBkYXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zcHJpbmdCb25lc0F1dG9VcGRhdGU7XG4gIH1cbiAgc2V0IHNwcmluZ0JvbmVzQXV0b1VwZGF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3NwcmluZ0JvbmVzQXV0b1VwZGF0ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoYWRvdyBnZW5lcmF0b3JzXG4gICAqL1xuICBwcml2YXRlIF9zaGFkb3dHZW5lcmF0b3JzOiBNYXA8SVNoYWRvd0xpZ2h0LCBTaGFkb3dHZW5lcmF0b3I+ID0gbmV3IE1hcDxcbiAgICBJU2hhZG93TGlnaHQsXG4gICAgU2hhZG93R2VuZXJhdG9yXG4gID4oKTtcblxuICAvKipcbiAgICogU2NlbmUgb3B0aW1pemVyXG4gICAqL1xuICBwcml2YXRlIF9zY2VuZU9wdGltaXplcjogVjNEU2NlbmVPcHRpbWl6ZXI7XG5cbiAgLyoqXG4gICAqIFJlbmRlcmluZyBwaXBlbGluZVxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfcmVuZGVyaW5nUGlwZWxpbmU6IERlZmF1bHRSZW5kZXJpbmdQaXBlbGluZTtcbiAgZ2V0IHJlbmRlcmluZ1BpcGVsaW5lKCk6IERlZmF1bHRSZW5kZXJpbmdQaXBlbGluZSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrcyB3aGVuIGxvYWRpbmcgaXMgZG9uZVxuICAgKi9cbiAgcHJpdmF0ZSBfb25Mb2FkQ29tcGxldGVDYWxsYmFja3M6IEZ1bmN0aW9uW10gPSBbXTtcbiAgcHVibGljIGFkZE9uTG9hZENvbXBsZXRlQ2FsbGJhY2tzKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZU9uTG9hZENvbXBsZXRlQ2FsbGJhY2soY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5fb25Mb2FkQ29tcGxldGVDYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZXNldE9uTG9hZENvbXBsZXRlQ2FsbGJhY2tzKCkge1xuICAgIHRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzID0gW107XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVSZW5kZXJGdW5jOiAoXG4gICAgZXZlbnREYXRhOiBTY2VuZSxcbiAgICBldmVudFN0YXRlOiBFdmVudFN0YXRlXG4gICkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBwcml2YXRlIF9hZnRlclJlbmRlckZ1bmM6IChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB2b2lkID1cbiAgICAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IG1hbmFnZXIgb2YgdGhpcy5sb2FkZWRWUk1NYW5hZ2Vycykge1xuICAgICAgICBpZiAodGhpcy5fc3ByaW5nQm9uZXNBdXRvVXBkYXRlKVxuICAgICAgICAgIG1hbmFnZXIudXBkYXRlKHRoaXMuZW5naW5lLmdldERlbHRhVGltZSgpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIHB1YmxpYyB1cGRhdGVCZWZvcmVSZW5kZXJGdW5jdGlvbihcbiAgICBmdW5jOiAoZXZlbnREYXRhOiBTY2VuZSwgZXZlbnRTdGF0ZTogRXZlbnRTdGF0ZSkgPT4gdm9pZFxuICApIHtcbiAgICB0aGlzLl9iZWZvcmVSZW5kZXJGdW5jID0gZnVuYztcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVBZnRlclJlbmRlckZ1bmN0aW9uKFxuICAgIGZ1bmM6IChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB2b2lkXG4gICkge1xuICAgIHRoaXMuX2FmdGVyUmVuZGVyRnVuYyA9IGZ1bmM7XG4gIH1cblxuICBwcml2YXRlIF9jYW1lcmFPbkJlZm9yZVJlbmRlckZ1bmM6IEZ1bmN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfbWFpbkNhbWVyYTogQ2FtZXJhO1xuICBnZXQgbWFpbkNhbWVyYSgpOiBDYW1lcmEge1xuICAgIHJldHVybiB0aGlzLl9tYWluQ2FtZXJhO1xuICB9XG4gIHNldCBtYWluQ2FtZXJhKHZhbHVlOiBDYW1lcmEpIHtcbiAgICB0aGlzLl9tYWluQ2FtZXJhID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2t5Qm94OiB2M0RTa3lCb3ggPSBudWxsO1xuXG4gIC8qKlxuICAgKiBMb2FkZWQgVlJNIE1hbmFnZXJzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwdWJsaWMgbG9hZGVkVlJNTWFuYWdlcnM6IFZSTU1hbmFnZXJbXSA9IFtdO1xuICBwdWJsaWMgYWRkVlJNTWFuYWdlcihtYW5hZ2VyOiBWUk1NYW5hZ2VyKSB7XG4gICAgaWYgKG1hbmFnZXIpIHRoaXMubG9hZGVkVlJNTWFuYWdlcnMucHVzaChtYW5hZ2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgVlJNIE1hbmFnZXIgYnkgaW5kZXhcbiAgICogQHBhcmFtIGlkeFxuICAgKi9cbiAgcHVibGljIGdldFZSTU1hbmFnZXJCeUluZGV4KGlkeDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGlkeCA+PSAwICYmIGlkeCA8IHRoaXMubG9hZGVkVlJNTWFuYWdlcnMubGVuZ3RoXG4gICAgICA/IHRoaXMubG9hZGVkVlJNTWFuYWdlcnNbaWR4XVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBWUk0gTWFuYWdlciBieSBVUklcbiAgICogVlJNIGRvZXNuJ3QgaGF2ZSBhbnkgVUlEIGluIG1ldGFkYXRhLiBUaXRsZSBjYW4gYmUgdW5maWxsZWQgdG9vLlxuICAgKiBGaWxlbmFtZSBpcyB0aGUgb25seSByZWFzb25hYmxlIElELlxuICAgKiBAcGFyYW0gdXJpXG4gICAqL1xuICAvLyBWUk0gZG9lc24ndCBoYXZlIGFueSBVSUQgaW4gbWV0YWRhdGEuIFRpdGxlIGNhbiBiZSB1bmZpbGxlZCB0b28uXG4gIC8vIEZpbGVuYW1lIGlzIHRoZSBvbmx5IHJlYXNvbmFibGUgSUQuXG4gIHB1YmxpYyBnZXRWUk1NYW5hZ2VyQnlVUkkodXJpOiBTdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhcImNhbGwgZ2V0VlJNTWFuYWdlckJ5VVJJKClcIik7XG4gICAgY29uc29sZS5sb2coXCJ1cmk6IFwiLCB1cmkpO1xuICAgIGNvbnNvbGUubG9nKFwidGhpcy5sb2FkZWRWUk1NYW5hZ2VyczogXCIsIHRoaXMubG9hZGVkVlJNTWFuYWdlcnMpO1xuXG4gICAgZm9yIChjb25zdCBtYW5hZ2VyIG9mIHRoaXMubG9hZGVkVlJNTWFuYWdlcnMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwibWFuYWdlcjogXCIsIG1hbmFnZXIpO1xuICAgICAgY29uc29sZS5sb2coXCJtYW5hZ2VyLnVyaTogXCIsIG1hbmFnZXIudXJpKTtcblxuICAgICAgaWYgKG1hbmFnZXIudXJpID09PSB1cmkpIHJldHVybiBtYW5hZ2VyO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICByZWFkb25seSBlbmdpbmU6IEVuZ2luZSxcbiAgICBwdWJsaWMgc2NlbmU/OiBTY2VuZSxcbiAgICBjYW1lcmE/OiBDYW1lcmFcbiAgKSB7XG4gICAgY29uc29sZS5sb2coXCJjYWxsIGNvbnN0cnVjdG9yKClcIik7XG4gICAgY29uc29sZS5sb2coXCJlbmdpbmU6IFwiLCBlbmdpbmUpO1xuICAgIGNvbnNvbGUubG9nKFwic2NlbmU6IFwiLCBzY2VuZSk7XG4gICAgY29uc29sZS5sb2coXCJjYW1lcmE6IFwiLCBjYW1lcmEpO1xuXG4gICAgLy8gUmVnaXN0ZXJcbiAgICB0aGlzLnJlZ2lzdGVyVnJtUGx1Z2luKCk7XG4gICAgdGhpcy5yZWdpc3RlclZybUV4dGVuc2lvbigpO1xuXG4gICAgaWYgKCF0aGlzLnNjZW5lKSB0aGlzLnNjZW5lID0gbmV3IFNjZW5lKHRoaXMuZW5naW5lKTtcbiAgICBlbHNlIHRoaXMuZW5naW5lID0gdGhpcy5zY2VuZS5nZXRFbmdpbmUoKTtcblxuICAgIHRoaXMuc2V0dXBPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5lbmFibGVSZXNpemUoKTtcblxuICAgIGlmIChjYW1lcmEpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FtZXJhOiBcIiwgY2FtZXJhKTtcbiAgICAgIHRoaXMuX21haW5DYW1lcmEgPSBjYW1lcmE7XG4gICAgICB0aGlzLnNjZW5lLnN3aXRjaEFjdGl2ZUNhbWVyYShjYW1lcmEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENhbWVyYSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lID0gbmV3IERlZmF1bHRSZW5kZXJpbmdQaXBlbGluZShcbiAgICAgIFwiZGVmYXVsdFBpcGVsaW5lXCIsIC8vIFRoZSBuYW1lIG9mIHRoZSBwaXBlbGluZVxuICAgICAgdHJ1ZSwgLy8gRG8geW91IHdhbnQgdGhlIHBpcGVsaW5lIHRvIHVzZSBIRFIgdGV4dHVyZT9cbiAgICAgIHRoaXMuc2NlbmUsIC8vIFRoZSBzY2VuZSBpbnN0YW5jZVxuICAgICAgW3RoaXMuX21haW5DYW1lcmFdIC8vIFRoZSBsaXN0IG9mIGNhbWVyYXMgdG8gYmUgYXR0YWNoZWQgdG9cbiAgICApO1xuICAgIHRoaXMuc2V0dXBSZW5kZXJpbmdQaXBlbGluZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgYmFja2dyb3VuZCB0cmFuc3BhcmVudC5cbiAgICovXG4gIHB1YmxpYyB0cmFuc3BhcmVudEJhY2tncm91bmQoKSB7XG4gICAgY29uc29sZS5sb2coXCJjYWxsIHRyYW5zcGFyZW50QmFja2dyb3VuZCgpXCIpO1xuXG4gICAgdGhpcy5zY2VuZS5jbGVhckNvbG9yLmEgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgYmFja2dyb3VuZCBzb2xpZC5cbiAgICovXG4gIHB1YmxpYyBzb2xpZEJhY2tncm91bmQoKSB7XG4gICAgdGhpcy5zY2VuZS5jbGVhckNvbG9yLmEgPSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBiYWNrZ3JvdW5kIGNvbG9yLlxuICAgKiBAcGFyYW0gY29sb3JcbiAgICovXG4gIHB1YmxpYyBzZXRCYWNrZ3JvdW5kQ29sb3IoY29sb3I6IENvbG9yMykge1xuICAgIHRoaXMuc2NlbmUuY2xlYXJDb2xvciA9IENvbG9yNC5Gcm9tQ29sb3IzKFxuICAgICAgY29sb3IsXG4gICAgICB0aGlzLnNjZW5lLmNsZWFyQ29sb3IuYVxuICAgICkudG9MaW5lYXJTcGFjZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBiYWNrZ3JvdW5kIGNvbG9yIGZyb20gaGV4IHN0cmluZy5cbiAgICogQHBhcmFtIGhleCBIZXggY29sb3Igc3RyaW5nXG4gICAqL1xuICBwdWJsaWMgc2V0QmFja2dyb3VuZENvbG9ySGV4KGhleDogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IoQ29sb3IzLkZyb21IZXhTdHJpbmcoaGV4KSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIGFtYmllbnQgbGlnaHQuXG4gICAqIEBwYXJhbSBjb2xvciBjb2xvciBvZiB0aGUgbGlnaHRcbiAgICovXG4gIHB1YmxpYyBhZGRBbWJpZW50TGlnaHQoY29sb3I/OiBDb2xvcjMpIHtcbiAgICBjb25zdCBsaWdodCA9IG5ldyBIZW1pc3BoZXJpY0xpZ2h0KFxuICAgICAgXCJWM0RIZW1pTGlnaHRcIixcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDEsIDEpLFxuICAgICAgdGhpcy5zY2VuZVxuICAgICk7XG4gICAgaWYgKGNvbG9yKSBsaWdodC5kaWZmdXNlID0gY29sb3I7XG4gICAgbGlnaHQuc2V0RW5hYmxlZCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBiYXNpYyBhcmMgcm90YXRlIGNhbWVyYSB0byBzY2VuZS5cbiAgICogVE9ETzogdGhlcmUgc2VlbXMgdG8gYmUgYSBidWcgd2hlbiBtZXNoZXMgYXJlIG5lYXIgdGhlIGVkZ2Ugb2YgY2FtZXJhIGNvbmVcbiAgICogUHJvYmFibHkgaGFzIHNvbWV0aGluZyB0byBkbyB3aXRoIGN1bGxpbmdcbiAgICogQHBhcmFtIHJhZGl1cyByb3RhdGlvbiByYWRpdXNcbiAgICovXG4gIHByaXZhdGUgYWRkQ2FtZXJhKHJhZGl1czogbnVtYmVyID0gMykge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCBhZGRDYW1lcmEoKVwiKTtcbiAgICBjb25zb2xlLmxvZyhcInJhZGl1czogXCIsIHJhZGl1cyk7XG5cbiAgICBjb25zdCBjYW1lcmEgPSBuZXcgQXJjUm90YXRlQ2FtZXJhKFxuICAgICAgXCJWM0RNYWluQ2FtZXJhXCIsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHJhZGl1cyxcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxuICAgICAgdGhpcy5zY2VuZSxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIGNhbWVyYS5sb3dlclJhZGl1c0xpbWl0ID0gMC4xO1xuICAgIGNhbWVyYS51cHBlclJhZGl1c0xpbWl0ID0gMjA7XG4gICAgY2FtZXJhLndoZWVsRGVsdGFQZXJjZW50YWdlID0gMC4wNTtcbiAgICBjYW1lcmEubWluWiA9IDA7XG4gICAgY2FtZXJhLnNldFBvc2l0aW9uKG5ldyBWZWN0b3IzKDAsIDEuNSwgLTUpKTtcbiAgICBjYW1lcmEuYXR0YWNoQ29udHJvbCh0aGlzLmVuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXMoKSk7XG5cbiAgICB0aGlzLl9tYWluQ2FtZXJhID0gY2FtZXJhO1xuICAgIHRoaXMuc2NlbmUuc3dpdGNoQWN0aXZlQ2FtZXJhKHRoaXMuX21haW5DYW1lcmEsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGFyYyByb3RhdGUgZm9sbG93aW5nIGNhbWVyYSB0byBWUk0gbW9kZWwuXG4gICAqIFByb2JhYmx5IGhhcyBzb21ldGhpbmcgdG8gZG8gd2l0aCBjdWxsaW5nXG4gICAqIEBwYXJhbSBtYW5hZ2VyIFZSTSBNYW5hZ2VyIHRvIGF0dGFjaCB0aGUgY2FtZXJhIHRvXG4gICAqIEBwYXJhbSByYWRpdXMgcm90YXRpb24gcmFkaXVzXG4gICAqL1xuICBwdWJsaWMgYXR0YWNoQ2FtZXJhVG8obWFuYWdlcjogVlJNTWFuYWdlciwgcmFkaXVzOiBudW1iZXIgPSAzKSB7XG4gICAgY29uc29sZS5sb2coXCJjYWxsIGF0dGFjaENhbWVyYVRvKClcIik7XG4gICAgY29uc29sZS5sb2coXCJtYW5hZ2VyOiBcIiwgbWFuYWdlcik7XG4gICAgY29uc29sZS5sb2coXCJyYWRpdXM6IFwiLCByYWRpdXMpO1xuXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IEFyY1JvdGF0ZUNhbWVyYShcbiAgICAgIFwiVjNEQXJjQ2FtZXJhXCIgKyBtYW5hZ2VyLmNhbWVyYXMubGVuZ3RoLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICByYWRpdXMsXG4gICAgICBtYW5hZ2VyLnJvb3RNZXNoLnBvc2l0aW9uLFxuICAgICAgdGhpcy5zY2VuZSxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY2FtZXJhLmxvd2VyUmFkaXVzTGltaXQgPSAwLjE7XG4gICAgY2FtZXJhLnVwcGVyUmFkaXVzTGltaXQgPSAyMDtcbiAgICBjYW1lcmEud2hlZWxEZWx0YVBlcmNlbnRhZ2UgPSAwLjA1O1xuICAgIGNhbWVyYS5taW5aID0gMDtcbiAgICBjYW1lcmEuc2V0UG9zaXRpb24obmV3IFZlY3RvcjMoMCwgMS41LCAtNSkpO1xuICAgIGNhbWVyYS5zZXRUYXJnZXQobWFuYWdlci5yb290TWVzaC5nZXRBYnNvbHV0ZVBvc2l0aW9uKCkpO1xuICAgIGNhbWVyYS5hdHRhY2hDb250cm9sKHRoaXMuZW5naW5lLmdldFJlbmRlcmluZ0NhbnZhcygpKTtcblxuICAgIG1hbmFnZXIuYXBwZW5kQ2FtZXJhKGNhbWVyYSk7XG5cbiAgICB0aGlzLl9jYW1lcmFPbkJlZm9yZVJlbmRlckZ1bmMucHVzaCgoKSA9PiB7XG4gICAgICBjYW1lcmEuc2V0VGFyZ2V0KG1hbmFnZXIucm9vdE1lc2guZ2V0QWJzb2x1dGVQb3NpdGlvbigpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBDcmVhdGUgYSBza3lib3ggZm9yIHRoZSBzY2VuZS5cbiAgICogQHBhcmFtIHNpemUgc2l6ZSBvZiB0aGUgc2t5Ym94XG4gICAqIEBwYXJhbSB0ZXh0dXJlTmFtZSBwYXRoIHRvIHNreWJveCB0ZXh0dXJlXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlU2t5Qm94KHNpemU6IG51bWJlciwgdGV4dHVyZU5hbWU/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuc2t5Qm94KSB7XG4gICAgICB0aGlzLnNreUJveCA9IG5ldyB2M0RTa3lCb3goXG4gICAgICAgIHRoaXMuc2NlbmUsXG4gICAgICAgIHRleHR1cmVOYW1lID8gdGV4dHVyZU5hbWUgOiBcInRleHR1cmUvc2t5Ym94XCIsXG4gICAgICAgIHNpemVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZSBzaGFkb3cgY2FzdGVyIGZvciBsaWdodC5cbiAgICogQHBhcmFtIGxpZ2h0IExpZ2h0IHRvIGVuYWJsZSBzaGFkb3dzLlxuICAgKi9cbiAgcHVibGljIGVuYWJsZVNoYWJvd3MobGlnaHQ/OiBJU2hhZG93TGlnaHQpIHtcbiAgICBpZiAobGlnaHQpIHtcbiAgICAgIGlmICghdGhpcy5fc2hhZG93R2VuZXJhdG9ycy5oYXMobGlnaHQpKSB7XG4gICAgICAgIGNvbnN0IHNoYWRvd0dlbmVyYXRvciA9IG5ldyBTaGFkb3dHZW5lcmF0b3IoMTAyNCwgbGlnaHQpO1xuICAgICAgICB0aGlzLnNldHVwU2hhZG93R2VuZXJhdG9yKHNoYWRvd0dlbmVyYXRvcik7XG4gICAgICAgIHRoaXMuX3NoYWRvd0dlbmVyYXRvcnMuc2V0KGxpZ2h0LCBzaGFkb3dHZW5lcmF0b3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiTGlnaHQgXCIgKyBsaWdodC5uYW1lICsgXCIgYWxyZWFkeSBoYXMgYSBzaGFkb3cgZ2VuZXJhdG9yIVwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoY29uc3QgbCBvZiB0aGlzLnNjZW5lLmxpZ2h0cykge1xuICAgICAgICBpZiAoaXNJU2hhZG93TGlnaHQobCkpIHtcbiAgICAgICAgICBjb25zdCBzaGFkb3dHZW5lcmF0b3IgPSBuZXcgU2hhZG93R2VuZXJhdG9yKDEwMjQsIGwpO1xuICAgICAgICAgIHRoaXMuc2V0dXBTaGFkb3dHZW5lcmF0b3Ioc2hhZG93R2VuZXJhdG9yKTtcbiAgICAgICAgICB0aGlzLl9zaGFkb3dHZW5lcmF0b3JzLnNldChsLCBzaGFkb3dHZW5lcmF0b3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb3JyZXNwb25kaW5nIHNoYWRvdyBnZW5lcmF0b3IgZm9yIGxpZ2h0LlxuICAgKiBAcGFyYW0gbGlnaHQgTGlnaHQgdG8gZ2V0IHNoYWRvdyBnZW5lcmF0b3JcbiAgICovXG4gIHB1YmxpYyBnZXRTaGFkb3duR2VuZXJhdG9yKGxpZ2h0OiBJU2hhZG93TGlnaHQpOiBOdWxsYWJsZTxTaGFkb3dHZW5lcmF0b3I+IHtcbiAgICByZXR1cm4gdGhpcy5fc2hhZG93R2VuZXJhdG9ycy5nZXQobGlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBzdGFydGluZyBhbmltYXRpb25cbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICogQHBhcmFtIGR1cmF0aW9uXG4gICAqIEBwYXJhbSBmcm9tXG4gICAqIEBwYXJhbSB0b1xuICAgKiBAcGFyYW0gbG9vcE1vZGVcbiAgICogQHBhcmFtIGVhc2luZ0Z1bmN0aW9uXG4gICAqIEBwYXJhbSBlYXNpbmdNb2RlXG4gICAqL1xuICBwdWJsaWMgc3RhcnRRdWlja0FuaW1hdGlvbihcbiAgICB0YXJnZXQ6IGFueSxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcHJvcGVydHk6IHN0cmluZyxcbiAgICBkdXJhdGlvbjogbnVtYmVyLFxuICAgIGZyb206IGFueSxcbiAgICB0bzogYW55LFxuICAgIGxvb3BNb2RlPzogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGVhc2luZ0Z1bmN0aW9uPzogRWFzaW5nRnVuY3Rpb24sXG4gICAgZWFzaW5nTW9kZT86IG51bWJlclxuICApOiBBbmltYXRhYmxlIHtcbiAgICBjb25zdCBhbmltID0gdGhpcy5jcmVhdGVBbmltYXRpb24oXG4gICAgICB0YXJnZXQsXG4gICAgICBuYW1lLFxuICAgICAgcHJvcGVydHksXG4gICAgICBbXG4gICAgICAgIHsgZnJhbWU6IDAsIHZhbHVlOiBmcm9tIH0sXG4gICAgICAgIHsgZnJhbWU6IGR1cmF0aW9uLCB2YWx1ZTogdG8gfSxcbiAgICAgIF0sXG4gICAgICBsb29wTW9kZSxcbiAgICAgIGVhc2luZ0Z1bmN0aW9uLFxuICAgICAgZWFzaW5nTW9kZVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2NlbmUuYmVnaW5EaXJlY3RBbmltYXRpb24oXG4gICAgICBhbmltWzBdLFxuICAgICAgW2FuaW1bMV1dLFxuICAgICAgMCxcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhbmltYXRpb25cbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICogQHBhcmFtIGtleUZyYW1lc1xuICAgKiBAcGFyYW0gbG9vcE1vZGVcbiAgICogQHBhcmFtIGVhc2luZ0Z1bmN0aW9uXG4gICAqIEBwYXJhbSBlYXNpbmdNb2RlXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQW5pbWF0aW9uKFxuICAgIHRhcmdldDogYW55LFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBwcm9wZXJ0eTogc3RyaW5nLFxuICAgIGtleUZyYW1lczogQXJyYXk8SUFuaW1hdGlvbktleT4sXG4gICAgbG9vcE1vZGU/OiBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZWFzaW5nRnVuY3Rpb24/OiBFYXNpbmdGdW5jdGlvbixcbiAgICBlYXNpbmdNb2RlPzogbnVtYmVyXG4gICk6IFthbnksIEFuaW1hdGlvbl0ge1xuICAgIC8vIE1ha2Ugc3VyZSBrZXlGcmFtZXMgaXMgbm90IGVtcHR5XG4gICAgaWYgKGtleUZyYW1lcy5sZW5ndGggPCAxKSB0aHJvdyBFcnJvcihcIktleSBGcmFtZXMgZW1wdHlcIik7XG5cbiAgICAvLyBHZXQgZGF0YSB0eXBlXG4gICAgY29uc3QgZGF0YVR5cGUgPSBnZXRBbmltYXRpb25EYXRhVHlwZShrZXlGcmFtZXNbMF0udmFsdWUpO1xuICAgIGlmIChkYXRhVHlwZSA9PT0gbnVsbClcbiAgICAgIHRocm93IEVycm9yKFwiQ2Fubm90IGRldGVybWluZSBkYXRhIHR5cGUgZnJvbSBrZXlmcmFtZXMhXCIpO1xuXG4gICAgY29uc3QgYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbihcbiAgICAgIG5hbWUsXG4gICAgICBwcm9wZXJ0eSxcbiAgICAgIFYzRENvcmUuRlJBTUVSQVRFLFxuICAgICAgZGF0YVR5cGUsXG4gICAgICBsb29wTW9kZVxuICAgICk7XG4gICAgYW5pbWF0aW9uLnNldEtleXMoa2V5RnJhbWVzKTtcblxuICAgIGlmIChlYXNpbmdGdW5jdGlvbikge1xuICAgICAgaWYgKGVhc2luZ01vZGUpIGVhc2luZ0Z1bmN0aW9uLnNldEVhc2luZ01vZGUoZWFzaW5nTW9kZSk7XG4gICAgICBhbmltYXRpb24uc2V0RWFzaW5nRnVuY3Rpb24oZWFzaW5nRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBbdGFyZ2V0LCBhbmltYXRpb25dO1xuICB9XG5cbiAgcHVibGljIGVuYWJsZU9wdGltaXplcihvcHRpb25zPzogU2NlbmVPcHRpbWl6ZXJPcHRpb25zKSB7XG4gICAgdGhpcy5fc2NlbmVPcHRpbWl6ZXIgPSBuZXcgVjNEU2NlbmVPcHRpbWl6ZXIodGhpcy5zY2VuZSwgb3B0aW9ucyk7XG4gIH1cblxuICAvLyBEb24ndCBtYWtlIHdyYXBwZXJzIHN0YXRpYywgc28gcGx1Z2lucyB3aWxsIGFsd2F5cyBiZSByZWdpc3RlcmVkXG4gIC8qKlxuICAgKiBXcmFwcGVyIGZvciBTY2VuZUxvYWRlci5BcHBlbmRBc3luYy5cbiAgICogQHBhcmFtIHJvb3RVcmwgYSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSByb290IHVybCBmb3IgdGhlIHNjZW5lIGFuZCByZXNvdXJjZXMgb3IgdGhlIGNvbmNhdGVuYXRpb24gb2Ygcm9vdFVSTCBhbmQgZmlsZW5hbWVcbiAgICogQHBhcmFtIHNjZW5lRmlsZW5hbWUgYSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBzY2VuZSBmaWxlIG9yIHN0YXJ0cyB3aXRoIFwiZGF0YTpcIiBmb2xsb3dpbmcgYnkgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhlIHNjZW5lIG9yIGEgRmlsZSBvYmplY3QgKGRlZmF1bHQ6IGVtcHR5IHN0cmluZylcbiAgICovXG4gIHB1YmxpYyBBcHBlbmRBc3luYyhcbiAgICByb290VXJsOiBzdHJpbmcsXG4gICAgc2NlbmVGaWxlbmFtZT86IHN0cmluZyB8IEZpbGVcbiAgKTogUHJvbWlzZTxTY2VuZT4ge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCBBcHBlbmRBc3luY1wiKTtcblxuICAgIHJldHVybiBTY2VuZUxvYWRlci5BcHBlbmRBc3luYyhyb290VXJsLCBzY2VuZUZpbGVuYW1lLCB0aGlzLnNjZW5lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIGZvciBTY2VuZUxvYWRlci5Mb2FkQXN5bmNcbiAgICogQHBhcmFtIHJvb3RVcmwgYSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSByb290IHVybCBmb3IgdGhlIHNjZW5lIGFuZCByZXNvdXJjZXMgb3IgdGhlIGNvbmNhdGVuYXRpb24gb2Ygcm9vdFVSTCBhbmQgZmlsZW5hbWVcbiAgICogQHBhcmFtIHNjZW5lRmlsZW5hbWUgYSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBzY2VuZSBmaWxlIG9yIHN0YXJ0cyB3aXRoIFwiZGF0YTpcIiBmb2xsb3dpbmcgYnkgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhlIHNjZW5lIG9yIGEgRmlsZSBvYmplY3QgKGRlZmF1bHQ6IGVtcHR5IHN0cmluZylcbiAgICovXG4gIHB1YmxpYyBMb2FkQXN5bmMoXG4gICAgcm9vdFVybDogc3RyaW5nLFxuICAgIHNjZW5lRmlsZW5hbWU/OiBzdHJpbmcgfCBGaWxlXG4gICk6IFByb21pc2U8U2NlbmU+IHtcbiAgICByZXR1cm4gU2NlbmVMb2FkZXIuTG9hZEFzeW5jKHJvb3RVcmwsIHNjZW5lRmlsZW5hbWUsIHRoaXMuZW5naW5lKTtcbiAgfVxuXG4gIC8vIEdMVEZMb2FkZXJFeHRlbnNpb25PYnNlcnZlclxuICBwdWJsaWMgb25Mb2FkUmVhZHkoKSB7XG4gICAgY29uc29sZS5sb2coXCJjYWxsIG9uTG9hZFJlYWR5KClcIik7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBcInRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzOiBcIixcbiAgICAgIHRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzXG4gICAgKTtcbiAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5fb25Mb2FkQ29tcGxldGVDYWxsYmFja3MpIHtcbiAgICAgIGYoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVwIGZvciB0aW1lIHVwZGF0ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgc2V0dXBPYnNlcnZhYmxlKCkge1xuICAgIHRoaXMuc2NlbmUub25CZWZvcmVSZW5kZXJPYnNlcnZhYmxlLmFkZChcbiAgICAgIChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB7XG4gICAgICAgIHRoaXMuX2JlZm9yZVJlbmRlckZ1bmMoZXZlbnREYXRhLCBldmVudFN0YXRlKTtcbiAgICAgIH1cbiAgICApO1xuICAgIC8vIENhbWVyYVxuICAgIHRoaXMuc2NlbmUub25CZWZvcmVSZW5kZXJPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5fY2FtZXJhT25CZWZvcmVSZW5kZXJGdW5jKSBmKCk7XG4gICAgfSk7XG4gICAgLy8gVXBkYXRlIHNlY29uZGFyeSBhbmltYXRpb25cbiAgICB0aGlzLnNjZW5lLm9uQWZ0ZXJSZW5kZXJPYnNlcnZhYmxlLmFkZChcbiAgICAgIChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB7XG4gICAgICAgIHRoaXMuX2FmdGVyUmVuZGVyRnVuYyhldmVudERhdGEsIGV2ZW50U3RhdGUpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZVJlc2l6ZSgpIHtcbiAgICB0aGlzLmVuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXMoKS5vbnJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuZW5naW5lLnJlc2l6ZSgpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHNldHVwU2hhZG93R2VuZXJhdG9yKHNoYWRvd0dlbmVyYXRvcjogYW55KSB7XG4gICAgc2hhZG93R2VuZXJhdG9yLnVzZVBlcmNlbnRhZ2VDbG9zZXJGaWx0ZXJpbmcgPSB0cnVlO1xuICAgIHNoYWRvd0dlbmVyYXRvci5maWx0ZXJpbmdRdWFsaXR5ID0gU2hhZG93R2VuZXJhdG9yLlFVQUxJVFlfSElHSDtcbiAgfVxuXG4gIC8vIFRPRE8gVW5yZWdpc3RlclxuICBwcml2YXRlIHJlZ2lzdGVyVnJtRXh0ZW5zaW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCByZWdpc3RlclZybUV4dGVuc2lvbigpXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiVlJNTG9hZGVyRXh0ZW5zaW9uLk5BTUU6IFwiLCBWUk1Mb2FkZXJFeHRlbnNpb24uTkFNRSk7XG5cbiAgICAvLyDjg63jg7zjg4Djg7zjgavnmbvpjLLjgZnjgotcbiAgICBHTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKFZSTUxvYWRlckV4dGVuc2lvbi5OQU1FLCAobG9hZGVyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImxvYWRlcjogXCIsIGxvYWRlcik7XG4gICAgICBjb25zb2xlLmxvZyhcInRoaXM6IFwiLCB0aGlzKTtcbiAgICAgIHJldHVybiBuZXcgVlJNTG9hZGVyRXh0ZW5zaW9uKGxvYWRlciwgdGhpcyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyVnJtUGx1Z2luKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCByZWdpc3RlclZybVBsdWdpbigpXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiU2NlbmVMb2FkZXI6IFwiLCBTY2VuZUxvYWRlcik7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBcIlNjZW5lTG9hZGVyLkdldFBsdWdpbkZvckV4dGVuc2lvbigudnJtKS5uYW1lOiBcIixcbiAgICAgIFNjZW5lTG9hZGVyLkdldFBsdWdpbkZvckV4dGVuc2lvbihcIi52cm1cIikubmFtZVxuICAgICk7XG5cbiAgICAvLyBpZiAoXG4gICAgLy8gICBTY2VuZUxvYWRlciAmJlxuICAgIC8vICAgU2NlbmVMb2FkZXIuR2V0UGx1Z2luRm9yRXh0ZW5zaW9uKFwiLnZybVwiKS5uYW1lID09PSBcInZybVwiXG4gICAgLy8gKSB7XG4gICAgaWYgKFNjZW5lTG9hZGVyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInRyeSB0byBjYWxsIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKClcIik7XG4gICAgICBjb25zb2xlLmxvZyhcInRoaXMuX3ZybUZpbGVMb2FkZXI6IFwiLCB0aGlzLl92cm1GaWxlTG9hZGVyKTtcbiAgICAgIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKHRoaXMuX3ZybUZpbGVMb2FkZXIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBSZW5kZXJpbmdQaXBlbGluZSgpIHtcbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZS5zYW1wbGVzID0gNDtcbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZS5kZXB0aE9mRmllbGRFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZS5kZXB0aE9mRmllbGRCbHVyTGV2ZWwgPVxuICAgICAgRGVwdGhPZkZpZWxkRWZmZWN0Qmx1ckxldmVsLk1lZGl1bTtcbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZS5kZXB0aE9mRmllbGQuZm9jdXNEaXN0YW5jZSA9IDIwMDA7IC8vIGRpc3RhbmNlIG9mIHRoZSBjdXJyZW50IGZvY3VzIHBvaW50IGZyb20gdGhlIGNhbWVyYSBpbiBtaWxsaW1ldGVycyBjb25zaWRlcmluZyAxIHNjZW5lIHVuaXQgaXMgMSBtZXRlclxuICAgIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lLmRlcHRoT2ZGaWVsZC5mb2NhbExlbmd0aCA9IDEwOyAvLyBmb2NhbCBsZW5ndGggb2YgdGhlIGNhbWVyYSBpbiBtaWxsaW1ldGVyc1xuICAgIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lLmRlcHRoT2ZGaWVsZC5mU3RvcCA9IDEuNDsgLy8gYWthIEYgbnVtYmVyIG9mIHRoZSBjYW1lcmEgZGVmaW5lZCBpbiBzdG9wcyBhcyBpdCB3b3VsZCBiZSBvbiBhIHBoeXNpY2FsIGRldmljZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFYzRENvcmU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt2M2RfY29yZVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt2M2RfY29yZVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc35tYWluXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LXRlc3QudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==