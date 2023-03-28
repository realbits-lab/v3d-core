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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaGVscGVyLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvZXJyb3JzLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvaHVtYW5vaWQtYm9uZS50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL21hdGVyaWFsLXZhbHVlLWJpbmRpbmctbWVyZ2VyLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvc2Vjb25kYXJ5LWFuaW1hdGlvbi9jb2xsaWRlci1ncm91cC50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3NlY29uZGFyeS1hbmltYXRpb24vY29sbGlkZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9zZWNvbmRhcnktYW5pbWF0aW9uL3NwcmluZy1ib25lLWNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9zZWNvbmRhcnktYW5pbWF0aW9uL3ZybS1zcHJpbmctYm9uZS1sb2dpYy50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3NlY29uZGFyeS1hbmltYXRpb24vdnJtLXNwcmluZy1ib25lLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvdnJtLWV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3ZybS1maWxlLWxvYWRlci50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3ZybS1pbnRlcmZhY2VzLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvdnJtLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy92cm0tbWF0ZXJpYWwtZ2VuZXJhdG9yLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2luZGV4LXRlc3QudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvc2NlbmUvb3B0aW1pemVyLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL3NjZW5lL3NreWJveC50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy91dGlsaXRpZXMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvdjNkLWNvcmUudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3YzZC1jb3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInYzZC1jb3JlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInYzZC1jb3JlXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5pbXBvcnQge0Fic3RyYWN0TWVzaCwgTWVzaCwgTnVsbGFibGUsIFNoYWRvd0dlbmVyYXRvciwgU2tlbGV0b24sIFNrZWxldG9uVmlld2VyLCBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZVwiO1xuaW1wb3J0IFYzRENvcmUgZnJvbSBcIi4vdjNkLWNvcmVcIjtcblxuZXhwb3J0IGNsYXNzIFYzREhlbHBlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjb3JlOiBWM0RDb3JlXG4gICAgKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBhIG5vZGUgY2FzdCBzaGFkb3cgZnJvbSBhIFNoYWRvd0dlbmVyYXRvclxuICAgICAqIEBwYXJhbSBzaGFkb3dHZW5lcmF0b3JcbiAgICAgKiBAcGFyYW0gbm9kZU5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkTm9kZVRvU2hhZG93Q2FzdGVyQnlOYW1lKFxuICAgICAgICBzaGFkb3dHZW5lcmF0b3I6IE51bGxhYmxlPFNoYWRvd0dlbmVyYXRvcj4sXG4gICAgICAgIG5vZGVOYW1lOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgc2hhZG93R2VuZXJhdG9yPy5hZGRTaGFkb3dDYXN0ZXIodGhpcy5jb3JlLnNjZW5lLmdldE5vZGVCeU5hbWUobm9kZU5hbWUpIGFzIE1lc2gpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2Ugbm9kZXMgY2FzdCBzaGFkb3cgZnJvbSBhIFNoYWRvd0dlbmVyYXRvclxuICAgICAqIEBwYXJhbSBzaGFkb3dHZW5lcmF0b3JcbiAgICAgKiBAcGFyYW0gbm9kZU5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkTm9kZVRvU2hhZG93Q2FzdGVyQ29udGFpbnNOYW1lKFxuICAgICAgICBzaGFkb3dHZW5lcmF0b3I6IE51bGxhYmxlPFNoYWRvd0dlbmVyYXRvcj4sXG4gICAgICAgIG5vZGVOYW1lOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgaWYgKCFzaGFkb3dHZW5lcmF0b3IpIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuY29yZS5zY2VuZS5nZXROb2RlcygpKSB7XG4gICAgICAgICAgICBpZiAobm9kZSAmJiBub2RlLm5hbWUuaW5jbHVkZXMobm9kZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgc2hhZG93R2VuZXJhdG9yLmFkZFNoYWRvd0Nhc3Rlcihub2RlIGFzIE1lc2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBub2RlIHJlY2VpdmUgc2hhZG93XG4gICAgICogQHBhcmFtIG5vZGVOYW1lXG4gICAgICovXG4gICAgcHVibGljIG1ha2VSZWNlaXZlU2hhZG93QnlOYW1lKG5vZGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgKHRoaXMuY29yZS5zY2VuZS5nZXROb2RlQnlOYW1lKG5vZGVOYW1lKSBhcyBNZXNoKS5yZWNlaXZlU2hhZG93cyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBub2RlcyByZWNlaXZlIHNoYWRvd1xuICAgICAqIEBwYXJhbSBub2RlTmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBtYWtlUmVjZWl2ZVNoYWRvd0NvbnRhaW5zTmFtZShub2RlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLmNvcmUuc2NlbmUuZ2V0Tm9kZXMoKSkge1xuICAgICAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5uYW1lLmluY2x1ZGVzKG5vZGVOYW1lKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIChub2RlIGFzIE1lc2gpLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93U2tlbGV0b25EZWJ1ZyhcbiAgICAgICAgc2tlbGV0b246IFNrZWxldG9uLFxuICAgICAgICBtZXNoOiBBYnN0cmFjdE1lc2hcbiAgICApIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHBhdXNlQW5pbWF0aW9ucyA6IHRydWUsIC8vVHJ1ZSBvciBGYWxzZSBmbGFnIHRvIHBhdXNlIHRoZSBhbmltYXRpb25zIHdoaWxlIHRyeWluZyB0byBjb25zdHJ1Y3QgdGhlIGRlYnVnTWVzaC4gRGVmYXVsdDogVHJ1ZVxuICAgICAgICAgICAgcmV0dXJuVG9SZXN0IDogZmFsc2UsIC8vRmxhZyB0byBmb3JjZSB0aGUgc2tlbGV0b24gYmFjayBpbnRvIGl0cyByZXN0UG9zZSBiZWZvcmUgY29uc3RydWN0aW5nIHRoZSBkZWJ1Z01lc2guIERlZmF1bHQ6IEZhbHNlXG4gICAgICAgICAgICBjb21wdXRlQm9uZXNVc2luZ1NoYWRlcnMgOiB0cnVlLCAvL1RlbGwgdGhlIGRlYnVnTWVzaCB0byB1c2Ugb3Igbm90IHVzZSB0aGUgR1BVIGZvciBpdHMgY2FsY3VsYXRpb25zLCBpZiB5b3UgZXZlciB3YW50IHRvIGRvIHBpY2tpbmcgb24gdGhlIG1lc2ggdGhpcyB3aWxsIG5lZWQgdG8gYmUgRmFsc2UuIERlZmF1bHQ6IFRydWVcbiAgICAgICAgICAgIHVzZUFsbEJvbmVzIDogdHJ1ZSwgLy9WaXN1YWxpemUgYWxsIGJvbmVzIG9yIHNraXAgdGhlIG9uZXMgd2l0aCBubyBpbmZsdWVuY2UuXG4gICAgICAgICAgICBkaXNwbGF5TW9kZSA6IFNrZWxldG9uVmlld2VyLkRJU1BMQVlfTElORVMsIC8vQSB2YWx1ZSB0aGF0IGNvbnRyb2xzIHdoaWNoIGRpc3BsYXkgbW9kZSB0byB1c2UuIChTa2VsZXRvblZpZXdlci5ESVNQTEFZX0xJTkVTID0gMCwgU2tlbGV0b25WaWV3ZXIuRElTUExBWV9TUEhFUkVTID0gMSwgU2tlbGV0b25WaWV3ZXIuRElTUExBWV9TUEhFUkVfQU5EX1NQVVJTID0gMikuIERlZmF1bHQgPSAwLlxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBza2VsZXRvblZpZXdlciA9IG5ldyBTa2VsZXRvblZpZXdlcihcbiAgICAgICAgICAgIHNrZWxldG9uLCAvL1RhcmdldCBTa2VsZXRvblxuICAgICAgICAgICAgbWVzaCwgLy9UaGF0IHNrZWxldG9ucyBBdHRhY2hlZCBNZXNoIG9yIGEgTm9kZSB3aXRoIHRoZSBzYW1lIGdsb2JhbE1hdHJpeFxuICAgICAgICAgICAgdGhpcy5jb3JlLnNjZW5lLCAvL1RoZSBTY2VuZSBzY29wZVxuICAgICAgICAgICAgdHJ1ZSwgLy9hdXRvVXBkYXRlQm9uZU1hdHJpY2VzP1xuICAgICAgICAgICAgbWVzaC5yZW5kZXJpbmdHcm91cElkID4gMCA/IG1lc2gucmVuZGVyaW5nR3JvdXBJZCArIDEgOiAxLCAvLyByZW5kZXJpbmdHcm91cElkXG4gICAgICAgICAgICBvcHRpb25zLCAvL0NvbmZpZ3VyYXRpb24gT3B0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBza2VsZXRvblZpZXdlcjtcbiAgICB9XG59XG4iLCIvKipcclxuICogVGhyb3dzIHdoZW4gbWFuZGF0b3J5IGJvbmUgY291bGQgbm90IGZpbmRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCb25lTm90Rm91bmRFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gJ0JvbmVOb3RGb3VuZEVycm9yJztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGJvbmVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihgQm9uZToke2JvbmVOYW1lfSBOb3RGb3VuZGApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZSc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBCb25lTm90Rm91bmRFcnJvciB9IGZyb20gJy4vZXJyb3JzJztcclxuXHJcbmludGVyZmFjZSBUcmFuc2Zvcm1Ob2RlTWFwIHtcclxuICAgIFtuYW1lOiBzdHJpbmddOiBUcmFuc2Zvcm1Ob2RlO1xyXG59XHJcblxyXG4vKipcclxuICogSHVtYW5vaWRCb25lIOOCkuWPluW+l+OBmeOCi+ODoeOCveODg+ODiee+pFxyXG4gKiBAc2VlIGh0dHBzOi8vZG9jcy51bml0eTNkLmNvbS9qYS8yMDE4LjMvU2NyaXB0UmVmZXJlbmNlL0h1bWFuQm9keUJvbmVzLmh0bWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBIdW1hbm9pZEJvbmUge1xyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvLyBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBub2RlTWFwOiBUcmFuc2Zvcm1Ob2RlTWFwKSB7fVxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyBub2RlTWFwOiBUcmFuc2Zvcm1Ob2RlTWFwKSB7fVxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLm5vZGVNYXAgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsLtcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBoaXBzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2hpcHMnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5aSq44KC44KCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFVwcGVyTGVnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2xlZnRVcHBlckxlZycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PlpKrjgoLjgoJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFVwcGVyTGVnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3JpZ2h0VXBwZXJMZWcnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem44Gy44GWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdExvd2VyTGVnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2xlZnRMb3dlckxlZycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PjgbLjgZZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodExvd2VyTGVnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3JpZ2h0TG93ZXJMZWcnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6Laz6aaWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdEZvb3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnbGVmdEZvb3QnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6Laz6aaWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRGb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3JpZ2h0Rm9vdCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDohIrmpI7jga7nrKzkuIBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzcGluZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdzcGluZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDog7hcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjaGVzdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdjaGVzdCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpppZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuZWNrKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ25lY2snKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6aCtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaGVhZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdoZWFkJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puiCqVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRTaG91bGRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdsZWZ0U2hvdWxkZXInKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6IKpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRTaG91bGRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodFNob3VsZGVyJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puS4iuiFlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRVcHBlckFybSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdsZWZ0VXBwZXJBcm0nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5LiK6IWVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRVcHBlckFybSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodFVwcGVyQXJtJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puOBsuOBmFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRMb3dlckFybSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdsZWZ0TG93ZXJBcm0nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z44Gy44GYXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRMb3dlckFybSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodExvd2VyQXJtJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puaJi+mmllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRIYW5kKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2xlZnRIYW5kJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+aJi+mmllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0SGFuZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodEhhbmQnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem44Gk44G+5YWIKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRUb2VzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFRvZXMnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z44Gk44G+5YWIKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0VG9lcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0VG9lcycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bnm64oT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdEV5ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRFeWUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z55uuKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0RXllKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRFeWUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6aGOKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGphdygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2phdycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bopqrmjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFRodW1iUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0VGh1bWJQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bopqrmjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFRodW1iSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFRodW1iSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puimquaMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0VGh1bWJEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0VGh1bWJEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5Lq65beu44GX5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRJbmRleFByb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdEluZGV4UHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5Lq65beu44GX5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRJbmRleEludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRJbmRleEludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bkurrlt67jgZfmjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdEluZGV4RGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdEluZGV4RGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puS4reaMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0TWlkZGxlUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0TWlkZGxlUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5Lit5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRNaWRkbGVJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puS4reaMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0TWlkZGxlRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdE1pZGRsZURpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bolqzmjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFJpbmdQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRSaW5nUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6Jas5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRSaW5nSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFJpbmdJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6Jas5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRSaW5nRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFJpbmdEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5bCP5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRMaXR0bGVQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRMaXR0bGVQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6blsI/mjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdExpdHRsZUludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5bCP5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRMaXR0bGVEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0TGl0dGxlRGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+imquaMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFRodW1iUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodFRodW1iUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6Kaq5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0VGh1bWJJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodFRodW1iSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+imquaMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFRodW1iRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRUaHVtYkRpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7Pkurrlt67jgZfmjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRJbmRleFByb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRJbmRleFByb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+S6uuW3ruOBl+aMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodEluZGV4SW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRJbmRleEludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7Pkurrlt67jgZfmjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRJbmRleERpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0SW5kZXhEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5Lit5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TWlkZGxlUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodE1pZGRsZVByb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+S4reaMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodE1pZGRsZUludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+S4reaMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodE1pZGRsZURpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0TWlkZGxlRGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+iWrOaMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFJpbmdQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0UmluZ1Byb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+iWrOaMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFJpbmdJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodFJpbmdJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6Jas5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0UmluZ0Rpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0UmluZ0Rpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PlsI/mjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRMaXR0bGVQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0TGl0dGxlUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5bCP5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5bCP5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TGl0dGxlRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRMaXR0bGVEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5LiK6IO4KE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHVwcGVyQ2hlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCd1cHBlckNoZXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv4XpoIjjg5zjg7zjg7PjgpLlj5blvpfjgZnjgovjgILlj5blvpflh7rmnaXjgarjgYTloLTlkIjjga/kvovlpJbjgpLnmbrnlJ/jgZnjgotcclxuICAgICAqXHJcbiAgICAgKiBAdGhyb3dzIEJvbmVOb3RGb3VuZEVycm9yXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBIdW1hbm9pZEJvbmVOYW1lXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWFuZGF0b3J5Qm9uZShuYW1lOiBzdHJpbmcpOiBUcmFuc2Zvcm1Ob2RlIHtcclxuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlTWFwW25hbWVdO1xyXG4gICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQm9uZU5vdEZvdW5kRXJyb3IobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Kq44OX44K344On44OK44Or44Oc44O844Oz44KS5Y+W5b6X44GZ44KLXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG5hbWUgSHVtYW5vaWRCb25lTmFtZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE9wdGlvbmFsQm9uZShuYW1lOiBzdHJpbmcpOiBOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm5vZGVNYXAgJiYgdGhpcy5ub2RlTWFwW25hbWVdKSB8fCBudWxsO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgQ29sb3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgeyBWZWN0b3I0IH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsLCBCYXNlVGV4dHVyZSwgVGV4dHVyZSwgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUnO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZSc7XHJcbmltcG9ydCB0eXBlIHsgSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmQgfSBmcm9tICcuL3ZybS1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgTVRvb25NYXRlcmlhbCB9IGZyb20gJ2JhYnlsb24tbXRvb24tbWF0ZXJpYWwnO1xyXG5cclxudHlwZSBTdXBwb3J0ZWRNYXRlcmlhbCA9IE1Ub29uTWF0ZXJpYWwgfCBQQlJNYXRlcmlhbDtcclxuXHJcbi8qKlxyXG4gKiBmaXJzdFZhbHVlIOOBryBmYWxzZSDlm7rlrprjgaDjgYzjgIEgVW5pVlJNIOOBq+WAo+OBo+OBpuWumue+qeOBl+OBpuOBhOOCi1xyXG4gKi9cclxudHlwZSBTZXR0ZXIgPSAodmFsdWU6IG51bWJlciwgZmlyc3RWYWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcclxuXHJcbmNvbnN0IFBCUk1hdGVyaWFsVGV4dHVyZU1hcDogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBrZXlvZiBQQlJNYXRlcmlhbCB9ID0ge1xyXG4gICAgX01haW5UZXg6ICdhbGJlZG9UZXh0dXJlJyxcclxufTtcclxuXHJcbmNvbnN0IFBCUk1hdGVyaWFsQ29sb3JNYXA6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXToga2V5b2YgUEJSTWF0ZXJpYWwgfSA9IHtcclxuICAgIF9Db2xvcjogJ2FsYmVkb0NvbG9yJyxcclxufTtcclxuXHJcbmNvbnN0IE1Ub29uTWF0ZXJpYWxUZXh0dXJlTWFwOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IGtleW9mIE1Ub29uTWF0ZXJpYWwgfSA9IHtcclxuICAgIF9NYWluVGV4OiAnZGlmZnVzZVRleHR1cmUnLFxyXG4gICAgX0VtaXNzaW9uTWFwOiAnZW1pc3NpdmVUZXh0dXJlJyxcclxuICAgIF9CdW1wTWFwOiAnYnVtcFRleHR1cmUnLFxyXG4gICAgX1NoYWRlVGV4dHVyZTogJ3NoYWRlVGV4dHVyZScsXHJcbiAgICBfUmVjZWl2ZVNoYWRvd1RleHR1cmU6ICdyZWNlaXZlU2hhZG93VGV4dHVyZScsXHJcbiAgICBfU2hhZGluZ0dyYWRlVGV4dHVyZTogJ3NoYWRpbmdHcmFkZVRleHR1cmUnLFxyXG4gICAgX1JpbVRleHR1cmU6ICdyaW1UZXh0dXJlJyxcclxuICAgIF9TcGhlcmVBZGQ6ICdtYXRDYXBUZXh0dXJlJyxcclxuICAgIF9PdXRsaW5lV2lkdGhUZXh0dXJlOiAnb3V0bGluZVdpZHRoVGV4dHVyZScsXHJcbiAgICBfVXZBbmltTWFza1RleHR1cmU6ICd1dkFuaW1hdGlvbk1hc2tUZXh0dXJlJyxcclxufTtcclxuXHJcbmNvbnN0IE1Ub29uTWF0ZXJpYWxDb2xvck1hcDogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBrZXlvZiBNVG9vbk1hdGVyaWFsIH0gPSB7XHJcbiAgICBfQ29sb3I6ICdkaWZmdXNlQ29sb3InLFxyXG4gICAgX1NoYWRlQ29sb3I6ICdzaGFkZUNvbG9yJyxcclxuICAgIF9SaW1Db2xvcjogJ3JpbUNvbG9yJyxcclxuICAgIF9FbWlzc2lvbkNvbG9yOiAnZW1pc3NpdmVDb2xvcicsXHJcbiAgICBfT3V0bGluZUNvbG9yOiAnb3V0bGluZUNvbG9yJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi80ZmZkOTdjMmU5MzM5NjgzY2U5YmYyMWU3M2Y1MTBiZDkwYzJhNWIyL0Fzc2V0cy9WUk0vUnVudGltZS9CbGVuZFNoYXBlL01hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyLmNzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtX21hdGVyaWFsTWFwOiB7IFttYXRlcmlhbE5hbWU6IHN0cmluZ106IFN1cHBvcnRlZE1hdGVyaWFsIH0gPSB7fTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbV9tYXRlcmlhbFNldHRlck1hcDogeyBbYmluZGluZ0tleTogc3RyaW5nXTogU2V0dGVyIH0gPSB7fTtcclxuICAgIHByaXZhdGUgbV9tYXRlcmlhbFZhbHVlTWFwOiB7IFtiaW5kaW5nS2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBtX3VzZWQ6IHsgW3RhcmdldEtleTogc3RyaW5nXTogYW55IH0gPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJhc2VWYWx1ZUNhY2hlOiB7IFtiaW5kaW5nS2V5OiBzdHJpbmddOiBWZWN0b3I0IH0gPSB7fTtcclxuICAgIHByaXZhdGUgbWF0ZXJpYWxWYWx1ZXNUb0FwcGx5OiB7IFtiaW5kaW5nS2V5OiBzdHJpbmddOiBJVlJNQmxlbmRTaGFwZU1hdGVyaWFsQmluZCB9ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWxzIFZSTeOBruWFqCBNYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG1hdGVyaWFsVmFsdWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXRlcmlhbHM6IE1hdGVyaWFsW10sIHByaXZhdGUgcmVhZG9ubHkgbWF0ZXJpYWxWYWx1ZXM6IElWUk1CbGVuZFNoYXBlTWF0ZXJpYWxCaW5kW10pIHtcclxuICAgICAgICBpZiAobWF0ZXJpYWxzLmxlbmd0aCA9PT0gMCB8fCBtYXRlcmlhbFZhbHVlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDjg5fjg63jg5Hjg4bjgqPlkI3jga7lpInmj5vjgavlr77lv5zjgZfjgabjgYTjgosgTVRvb25NYXRlcmlhbCDjgaggUEJSTWF0ZXJpYWwg44KS5L+d5a2Y44GZ44KLXHJcbiAgICAgICAgbWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbCBpbnN0YW5jZW9mIE1Ub29uTWF0ZXJpYWwgfHwgbWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX21hdGVyaWFsTWFwW21hdGVyaWFsLm5hbWVdID0gbWF0ZXJpYWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBtYXRlcmlhbFZhbHVlcy5mb3JFYWNoKChtYXRlcmlhbFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJpbmRpbmdLZXkgPSB0aGlzLm1ha2VCaW5kaW5nS2V5KG1hdGVyaWFsVmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX21hdGVyaWFsU2V0dGVyTWFwW2JpbmRpbmdLZXldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSB0aGlzLm1fbWF0ZXJpYWxNYXBbbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWVdO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgYmFzZVZhbHVlID0gdGhpcy5nZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIGlmICghYmFzZVZhbHVlIHx8IG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUubGVuZ3RoICE9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g44Oi44O844OV44Kj44Oz44Kw55So44GrIGJhc2VWYWx1ZSAo5Yid5pyf5YCkKSDjgaggbWF0ZXJpYWxWYWx1ZSDjgpLkv53lrZjjgZnjgotcclxuICAgICAgICAgICAgdGhpcy5iYXNlVmFsdWVDYWNoZVtiaW5kaW5nS2V5XSA9IGJhc2VWYWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbFZhbHVlc1RvQXBwbHlbYmluZGluZ0tleV0gPSBtYXRlcmlhbFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0VmFsdWUgPSBWZWN0b3I0LkZyb21BcnJheShtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlKTtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWVOYW1lID0gbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWU7XHJcbiAgICAgICAgICAgIC8vIFVuaXR5IOOBqOW6p+aomeezu+OBjOeVsOOBquOCi+OBn+OCgeOAgeODhuOCr+OCueODgeODo+OBriB2T2Zmc2V0IOOCkuWPjei7ouOBmeOCi1xyXG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKFBCUk1hdGVyaWFsVGV4dHVyZU1hcCkuc29tZSgoaykgPT4gdmFsdWVOYW1lLnN0YXJ0c1dpdGgoaykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFsdWUudyAqPSAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhNVG9vbk1hdGVyaWFsVGV4dHVyZU1hcCkuc29tZSgoaykgPT4gdmFsdWVOYW1lLnN0YXJ0c1dpdGgoaykpKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZS53ICo9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZU5hbWUuZW5kc1dpdGgoJ19TVF9TJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIOODhuOCr+OCueODgeODo+OBriB15pa55ZCRIOOBruOBv+abtOaWsOOBmeOCi1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0dGVyOiBTZXR0ZXIgPSAodmFsdWUsIGZpcnN0VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsdWUgPSBmaXJzdFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYmFzZVZhbHVlLmFkZCh0YXJnZXRWYWx1ZS5zdWJ0cmFjdChiYXNlVmFsdWUpLnNjYWxlKHZhbHVlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSkhLmFkZCh0YXJnZXRWYWx1ZS5zdWJ0cmFjdChiYXNlVmFsdWUpLnNjYWxlKHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gdGhpcy5nZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUpITtcclxuICAgICAgICAgICAgICAgICAgICBzcmMueCA9IHByb3BWYWx1ZS54O1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYy56ID0gcHJvcFZhbHVlLno7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUsIHNyYyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX21hdGVyaWFsU2V0dGVyTWFwW2JpbmRpbmdLZXldID0gc2V0dGVyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZS5lbmRzV2l0aCgnX1NUX1QnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8g44OG44Kv44K544OB44Oj44GuIHbmlrnlkJEg44Gu44G/5pu05paw44GZ44KLXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXR0ZXI6IFNldHRlciA9ICh2YWx1ZSwgZmlyc3RWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZSA9IGZpcnN0VmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBiYXNlVmFsdWUuYWRkKHRhcmdldFZhbHVlLnN1YnRyYWN0KGJhc2VWYWx1ZSkuc2NhbGUodmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lKSEuYWRkKHRhcmdldFZhbHVlLnN1YnRyYWN0KGJhc2VWYWx1ZSkuc2NhbGUodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcmMgPSB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSkhO1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYy55ID0gcHJvcFZhbHVlLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjLncgPSBwcm9wVmFsdWUudztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSwgc3JjKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWF0ZXJpYWxTZXR0ZXJNYXBbYmluZGluZ0tleV0gPSBzZXR0ZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXR0ZXI6IFNldHRlciA9ICh2YWx1ZSwgZmlyc3RWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZSA9IGZpcnN0VmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBiYXNlVmFsdWUuYWRkKHRhcmdldFZhbHVlLnN1YnRyYWN0KGJhc2VWYWx1ZSkuc2NhbGUodmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lKSEuYWRkKHRhcmdldFZhbHVlLnN1YnRyYWN0KGJhc2VWYWx1ZSkuc2NhbGUodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSwgcHJvcFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWF0ZXJpYWxTZXR0ZXJNYXBbYmluZGluZ0tleV0gPSBzZXR0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuaVZSTSDjgafjga8gRGljdGlvbmFyeSDjga7jgq3jg7znlKjjga7jgq/jg6njgrnjgpLlrprnvqnjgZfjgabjgYTjgovjgYzjgIHmloflrZfliJfjgafku6PnlKjjgZnjgotcclxuICAgICAqIE1hdGVyaWFsVmFsdWVCaW5kaW5nLkJhc2VWYWx1ZSDjga/lr77lv5zjgZnjgovjg5fjg63jg5Hjg4bjgqPjga7liJ3mnJ/lgKTjgarjga7jgafnhKHoppbjgafjgY3jgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtYWtlQmluZGluZ0tleShtYXRlcmlhbFZhbHVlOiBJVlJNQmxlbmRTaGFwZU1hdGVyaWFsQmluZCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke21hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lfV8ke21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lfV8ke21hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUuam9pbignLScpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmlWUk0g44Gn44GvIERpY3Rpb25hcnkg44Gu44Kt44O855So44Gu44Kv44Op44K544KS5a6a576p44GX44Gm44GE44KL44GM44CB5paH5a2X5YiX44Gn5Luj55So44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWFrZVRhcmdldEtleShtYXRlcmlhbFZhbHVlOiBJVlJNQmxlbmRTaGFwZU1hdGVyaWFsQmluZCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke21hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lfV8ke21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg6Ljg7zjg5XjgqPjg7PjgrDjgpLooYzjgYZcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlgKQoMOOAnDEpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3JwaGluZyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRlVmFsdWUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuYXBwbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1hdGVyaWFsVmFsdWUg44GU44Go44Gr6YeN44G/44KS6KiI566X44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWNjdW11bGF0ZVZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYmluZGluZ0tleSA9IHRoaXMubWFrZUJpbmRpbmdLZXkobWF0ZXJpYWxWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fbWF0ZXJpYWxWYWx1ZU1hcFtiaW5kaW5nS2V5XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX21hdGVyaWFsVmFsdWVNYXBbYmluZGluZ0tleV0gKz0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWF0ZXJpYWxWYWx1ZU1hcFtiaW5kaW5nS2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXRlcmlhbCDjga7jg5fjg63jg5Hjg4bjgqPjgpLmm7TmlrDjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhcHBseSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fdXNlZCA9IHt9O1xyXG5cclxuICAgICAgICBPYmplY3QuZW50cmllcyh0aGlzLm1hdGVyaWFsVmFsdWVzVG9BcHBseSkuZm9yRWFjaCgoW2JpbmRpbmdLZXksIG1hdGVyaWFsVmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEtleSA9IHRoaXMubWFrZVRhcmdldEtleShtYXRlcmlhbFZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKCEodGFyZ2V0S2V5IGluIHRoaXMubV91c2VkKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSB0aGlzLm1fbWF0ZXJpYWxNYXBbbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmJhc2VWYWx1ZUNhY2hlW2JpbmRpbmdLZXldLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5a++6LGh44Gu44OX44Ot44OR44OG44Kj44KS5Yid5pyf5YCk44Gr5oi744GZXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZU5hbWUgPSBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZU5hbWUuZW5kc1dpdGgoJ19TVF9TJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gdGhpcy5nZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUpITtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS55ID0gdi55O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLncgPSB2Lnc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZS5lbmRzV2l0aCgnX1NUX1QnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSkhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnggPSB2Lng7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUueiA9IHYuejtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX3VzZWRbdGFyZ2V0S2V5XSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldHRlciA9IHRoaXMubV9tYXRlcmlhbFNldHRlck1hcFtiaW5kaW5nS2V5XTtcclxuICAgICAgICAgICAgaWYgKHNldHRlcikge1xyXG4gICAgICAgICAgICAgICAgc2V0dGVyKHRoaXMubV9tYXRlcmlhbFZhbHVlTWFwW2JpbmRpbmdLZXldLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tX21hdGVyaWFsVmFsdWVNYXAgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODnuODhuODquOCouODq+OBruODhuOCr+OCueODgeODo+OBi+iJsuOBq+WvvuW/nOOBmeOCiyBWZWN0b3I0IOOCkuWPluW+l+OBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWw6IFN1cHBvcnRlZE1hdGVyaWFsLCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IE51bGxhYmxlPFZlY3RvcjQ+IHtcclxuICAgICAgICBjb25zdCBtYXRjaCA9IHByb3BlcnR5TmFtZS5tYXRjaCgvXihfW15fXSspLyk7XHJcbiAgICAgICAgaWYgKCFtYXRjaCB8fCAhbWF0Y2hbMV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGtleSA9IG1hdGNoWzFdO1xyXG4gICAgICAgIGlmIChtYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIGlmIChQQlJNYXRlcmlhbFRleHR1cmVNYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFRleHR1cmVJbnRvVmVjdG9yNFdoZW5Ob3ROdWxsKG1hdGVyaWFsW1BCUk1hdGVyaWFsVGV4dHVyZU1hcFtrZXldXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFBCUk1hdGVyaWFsQ29sb3JNYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydENvbG9ySW50b1ZlY3RvcjQobWF0ZXJpYWxbUEJSTWF0ZXJpYWxDb2xvck1hcFtrZXldXSwgbWF0ZXJpYWwuYWxwaGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBNVG9vbk1hdGVyaWFsXHJcbiAgICAgICAgaWYgKE1Ub29uTWF0ZXJpYWxUZXh0dXJlTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFRleHR1cmVJbnRvVmVjdG9yNFdoZW5Ob3ROdWxsKG1hdGVyaWFsW01Ub29uTWF0ZXJpYWxUZXh0dXJlTWFwW2tleV1dKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1Ub29uTWF0ZXJpYWxDb2xvck1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRDb2xvckludG9WZWN0b3I0KG1hdGVyaWFsW01Ub29uTWF0ZXJpYWxDb2xvck1hcFtrZXldXSwgbWF0ZXJpYWwuYWxwaGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRleHR1cmUg44KSIFZlY3RvcjQg44Gr5aSJ5o+b44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVydFRleHR1cmVJbnRvVmVjdG9yNFdoZW5Ob3ROdWxsKHRleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPik6IE51bGxhYmxlPFZlY3RvcjQ+IHtcclxuICAgICAgICBpZiAoIXRleHR1cmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHQgPSB0ZXh0dXJlIGFzIFRleHR1cmU7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3I0KHQudVNjYWxlLCB0LnZTY2FsZSwgdC51T2Zmc2V0LCB0LnZPZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29sb3IzIOOBqyBhbHBoYSDjgpLliqDjgYjjgaYgVmVjdG9yNCDjgavlpInmj5vjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb252ZXJ0Q29sb3JJbnRvVmVjdG9yNChjb2xvcjogQ29sb3IzLCBhbHBoYTogbnVtYmVyKTogVmVjdG9yNCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3I0KGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGFscGhhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODnuODhuODquOCouODq+OBruODhuOCr+OCueODgeODo+OBi+iJsuOCkuabtOaWsOOBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWw6IFN1cHBvcnRlZE1hdGVyaWFsLCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IFZlY3RvcjQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtYXRjaCA9IHByb3BlcnR5TmFtZS5tYXRjaCgvXihfW15fXSspLyk7XHJcbiAgICAgICAgaWYgKCFtYXRjaCB8fCAhbWF0Y2hbMV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBrZXkgPSBtYXRjaFsxXTtcclxuICAgICAgICBpZiAobWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBpZiAoUEJSTWF0ZXJpYWxUZXh0dXJlTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dHVyZVdoZW5Ob3ROdWxsKG1hdGVyaWFsW1BCUk1hdGVyaWFsVGV4dHVyZU1hcFtrZXldXSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChQQlJNYXRlcmlhbENvbG9yTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdfQ29sb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGEgPSB2YWx1ZS53O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb2xvcihtYXRlcmlhbFtQQlJNYXRlcmlhbENvbG9yTWFwW2tleV1dLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBNVG9vbk1hdGVyaWFsXHJcbiAgICAgICAgaWYgKE1Ub29uTWF0ZXJpYWxUZXh0dXJlTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0dXJlV2hlbk5vdE51bGwobWF0ZXJpYWxbTVRvb25NYXRlcmlhbFRleHR1cmVNYXBba2V5XV0sIHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTVRvb25NYXRlcmlhbENvbG9yTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ19Db2xvcicpIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhID0gdmFsdWUudztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbG9yKG1hdGVyaWFsW01Ub29uTWF0ZXJpYWxDb2xvck1hcFtrZXldXSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRleHR1cmUg44KSIFZlY3RvcjQg44Gn5pu05paw44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVGV4dHVyZVdoZW5Ob3ROdWxsKHRleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiwgdmFsdWU6IFZlY3RvcjQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGV4dHVyZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0ID0gdGV4dHVyZSBhcyBUZXh0dXJlO1xyXG4gICAgICAgICAgICB0LnVTY2FsZSA9IHZhbHVlLng7XHJcbiAgICAgICAgICAgIHQudlNjYWxlID0gdmFsdWUueTtcclxuICAgICAgICAgICAgdC51T2Zmc2V0ID0gdmFsdWUuejtcclxuICAgICAgICAgICAgdC52T2Zmc2V0ID0gdmFsdWUudztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xvcjMg44KSIFZlY3RvcjQg44Gn5pu05paw44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQ29sb3IoY29sb3I6IENvbG9yMywgdmFsdWU6IFZlY3RvcjQpOiB2b2lkIHtcclxuICAgICAgICBjb2xvci5yID0gdmFsdWUueDtcclxuICAgICAgICBjb2xvci5nID0gdmFsdWUueTtcclxuICAgICAgICBjb2xvci5iID0gdmFsdWUuejtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IFZlY3RvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZSc7XHJcbmltcG9ydCB7IFNwaGVyZUJ1aWxkZXIgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL0J1aWxkZXJzL3NwaGVyZUJ1aWxkZXInO1xyXG5pbXBvcnQgeyBDb2xsaWRlciB9IGZyb20gJy4vY29sbGlkZXInO1xyXG5cclxuLyoqXHJcbiAqIFZSTSBTcHJpbmdCb25lIENvbGxpZGVyR3JvdXBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb2xsaWRlckdyb3VwIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBjb2xsaWRlcnM6IENvbGxpZGVyW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB0cmFuc2Zvcm0gVGhlIG5vZGUgb2YgdGhlIGNvbGxpZGVyIGdyb3VwIGZvciBzZXR0aW5nIHVwIGNvbGxpc2lvbiBkZXRlY3Rpb25zLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHRyYW5zZm9ybTogVHJhbnNmb3JtTm9kZSkge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBvZmZzZXR0ZWQgY29sbGlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IFRoZSBsb2NhbCBjb29yZGluYXRlIGZyb20gdGhlIG5vZGUgb2YgdGhlIGNvbGxpZGVyIGdyb3VwLlxyXG4gICAgICogQHBhcmFtIHJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBjb2xsaWRlci5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZENvbGxpZGVyKG9mZnNldDogVmVjdG9yMywgcmFkaXVzOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBzcGhlcmUgPSBTcGhlcmVCdWlsZGVyLkNyZWF0ZVNwaGVyZShcclxuICAgICAgICAgICAgYCR7dGhpcy50cmFuc2Zvcm0ubmFtZX1fQ29sbGlkZXJTcGhlcmVgLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50czogNixcclxuICAgICAgICAgICAgICAgIGRpYW1ldGVyOiByYWRpdXMgKiAyLjAsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLmdldFNjZW5lKClcclxuICAgICAgICApO1xyXG4gICAgICAgIHNwaGVyZS5zZXRQYXJlbnQodGhpcy50cmFuc2Zvcm0pO1xyXG4gICAgICAgIHNwaGVyZS5zZXRQb3NpdGlvbldpdGhMb2NhbFZlY3RvcihvZmZzZXQpO1xyXG4gICAgICAgIHNwaGVyZS5zZXRFbmFibGVkKGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xsaWRlcnMucHVzaChuZXcgQ29sbGlkZXIob2Zmc2V0LCByYWRpdXMsIHNwaGVyZSkpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgTWVzaCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZSc7XHJcbmltcG9ydCB0eXBlIHsgVmVjdG9yMyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoJztcclxuXHJcbi8qKlxyXG4gKiBDb2xsaWRlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbGxpZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG9mZnNldCBUaGUgbG9jYWwgY29vcmRpbmF0ZSBmcm9tIHRoZSBub2RlIG9mIHRoZSBjb2xsaWRlciBncm91cC5cclxuICAgICAqIEBwYXJhbSByYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgY29sbGlkZXIuXHJcbiAgICAgKiBAcGFyYW0gc3BoZXJlIFRoZSBzcGVoZXJlIG1lc2ggZm9yIHdvcmxkTWF0cml4IGFuZCBnaXptby5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBvZmZzZXQ6IFZlY3RvcjMsIHB1YmxpYyByZWFkb25seSByYWRpdXM6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IHNwaGVyZTogTWVzaCkge31cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL3RyYW5zZm9ybU5vZGUnO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgeyBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uIH0gZnJvbSAnLi4vdnJtLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9jb2xsaWRlci1ncm91cCc7XHJcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmUgfSBmcm9tICcuL3ZybS1zcHJpbmctYm9uZSc7XHJcblxyXG4vKipcclxuICogZnVuY3Rpb24gdG8gZ2V0IGJvbmUgZnJvbSBub2RlSW5kZXhcclxuICovXHJcbnR5cGUgZ2V0Qm9uZSA9IChub2RlSW5kZXg6IG51bWJlcikgPT4gTnVsbGFibGU8VHJhbnNmb3JtTm9kZT47XHJcblxyXG4vLyogVE9ETzogUGF0Y2hlZC5cclxuLyoqXHJcbiAqIE9wdGlvbnMgZm9yIGNyZWF0aW5nIHNwcmluZ3NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uc3RydWN0U3ByaW5nc09wdGlvbnMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmVzaWxpZW5jZSBvZiB0aGUgc3dheWluZyBvYmplY3RcclxuICAgICAqL1xyXG4gICAgc3RpZmZuZXNzPzogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3RyZW5ndGggb2YgZ3Jhdml0eVxyXG4gICAgICovXHJcbiAgICBncmF2aXR5UG93ZXI/OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkaXJlY3Rpb24gb2YgZ3Jhdml0eS4gU2V0ICgwLCAtMSwgMCkgZm9yIHNpbXVsYXRpbmcgdGhlIGdyYXZpdHkuIFNldCAoMSwgMCwgMCkgZm9yIHNpbXVsYXRpbmcgdGhlIHdpbmQuXHJcbiAgICAgKi9cclxuICAgIGdyYXZpdHlEaXI/OiBWZWN0b3IzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmVzaXN0YW5jZSAoZGVjZWxlcmF0aW9uKSBvZiBhdXRvbWF0aWMgYW5pbWF0aW9uXHJcbiAgICAgKi9cclxuICAgIGRyYWdGb3JjZT86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJhZGl1cyBvZiB0aGUgc3BoZXJlIHVzZWQgZm9yIHRoZSBjb2xsaXNpb24gZGV0ZWN0aW9uIHdpdGggY29sbGlkZXJzXHJcbiAgICAgKi9cclxuICAgIGhpdFJhZGl1cz86IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFZSTSBTcHJpbmdCb25lIENvbnRyb2xsZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTcHJpbmdCb25lQ29udHJvbGxlciB7XHJcbiAgICAvKipcclxuICAgICAqIFNwcmluZyBCb25lIExpc3RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzcHJpbmdzOiBWUk1TcHJpbmdCb25lW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZXh0IFNlY29uZGFyeUFuaW1hdGlvbiBPYmplY3RcclxuICAgICAqIEBwYXJhbSBnZXRCb25lXHJcbiAgICAgKi9cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBleHQ6IElWUk1TZWNvbmRhcnlBbmltYXRpb24sIGdldEJvbmU6IGdldEJvbmUsIG9wdGlvbnM/OiBDb25zdHJ1Y3RTcHJpbmdzT3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzID0gdGhpcy5jb25zdHJ1Y3RDb2xsaWRlckdyb3VwcyhnZXRCb25lKTtcclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAvLyB0aGlzLnNwcmluZ3MgPSB0aGlzLmNvbnN0cnVjdFNwcmluZ3MoZ2V0Qm9uZSwgY29sbGlkZXJHcm91cHMpO1xyXG4gICAgICAgIHRoaXMuc3ByaW5ncyA9IHRoaXMuY29uc3RydWN0U3ByaW5ncyhnZXRCb25lLCBjb2xsaWRlckdyb3Vwcywgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5zcHJpbmdzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgYWxsIFNwcmluZ0JvbmVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRlbHRhVGltZSBFbGFwc2VkIHNlYyBmcm9tIHByZXZpb3VzIGZyYW1lXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZG9jcy51bml0eTNkLmNvbS9TY3JpcHRSZWZlcmVuY2UvVGltZS1kZWx0YVRpbWUuaHRtbFxyXG4gICAgICovXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIC8vIHB1YmxpYyBhc3luYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIsIGJvbmVPcHRpb25zPzogQ29uc3RydWN0U3ByaW5nc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyDjg53jg7zjgrrlvozjga7jgYLjgonjgbbjgorpmLLmraLjga7jgZ/jgoEgY2xhbXBcclxuICAgICAgICBkZWx0YVRpbWUgPSBNYXRoLm1heCgwLjAsIE1hdGgubWluKDE2LjY2NiwgZGVsdGFUaW1lKSkgLyAxMDAwO1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gdGhpcy5zcHJpbmdzLm1hcDxQcm9taXNlPHZvaWQ+Pigoc3ByaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgICAgICAvLyByZXR1cm4gc3ByaW5nLnVwZGF0ZShkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3ByaW5nLnVwZGF0ZShkZWx0YVRpbWUsIGJvbmVPcHRpb25zKTtcclxuICAgICAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvKiBEbyBub3RoaW5nICovXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RDb2xsaWRlckdyb3VwcyhnZXRCb25lOiBnZXRCb25lKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmV4dC5jb2xsaWRlckdyb3VwcyB8fCAhdGhpcy5leHQuY29sbGlkZXJHcm91cHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXJHcm91cHM6IENvbGxpZGVyR3JvdXBbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZXh0LmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYm9uZSA9IGdldEJvbmUoY29sbGlkZXJHcm91cC5ub2RlKSBhcyBUcmFuc2Zvcm1Ob2RlO1xyXG4gICAgICAgICAgICBjb25zdCBnID0gbmV3IENvbGxpZGVyR3JvdXAoYm9uZSk7XHJcbiAgICAgICAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnLmFkZENvbGxpZGVyKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZSTSDlj7PmiYvns7tZX1VQLCAtWl9Gcm9udCDjgYvjgokgQmFieWxvbi5qcyDlt6bmiYvns7tZX1VQLCArWl9Gcm9udCDjgavjgZnjgotcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMygtY29sbGlkZXIub2Zmc2V0LngsIGNvbGxpZGVyLm9mZnNldC55LCAtY29sbGlkZXIub2Zmc2V0LnopLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVyLnJhZGl1c1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbGxpZGVyR3JvdXBzLnB1c2goZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVyR3JvdXBzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0U3ByaW5ncyhnZXRCb25lOiBnZXRCb25lLCBjb2xsaWRlckdyb3VwczogQ29sbGlkZXJHcm91cFtdLCBvcHRpb25zPzogQ29uc3RydWN0U3ByaW5nc09wdGlvbnMpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZXh0LmJvbmVHcm91cHMgfHwgIXRoaXMuZXh0LmJvbmVHcm91cHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3ByaW5nczogVlJNU3ByaW5nQm9uZVtdID0gW107XHJcbiAgICAgICAgdGhpcy5leHQuYm9uZUdyb3Vwcy5mb3JFYWNoKChzcHJpbmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgcm9vdEJvbmVzID0gKHNwcmluZy5ib25lcyB8fCBbXSkubWFwKChib25lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0Qm9uZShib25lKSBhcyBUcmFuc2Zvcm1Ob2RlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaW5nQ29sbGlkZXJzID0gKHNwcmluZy5jb2xsaWRlckdyb3VwcyB8fCBbXSkubWFwPENvbGxpZGVyR3JvdXA+KChnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbGlkZXJHcm91cHNbZ107XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzcHJpbmdzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAgICAgICAgIC8vIG5ldyBWUk1TcHJpbmdCb25lKFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNwcmluZy5jb21tZW50LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNwcmluZy5zdGlmZmluZXNzLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNwcmluZy5ncmF2aXR5UG93ZXIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbmV3IFZlY3RvcjMoXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vIFZSTSDlj7PmiYvns7tZX1VQLCAtWl9Gcm9udCDjgYvjgokgQmFieWxvbi5qcyDlt6bmiYvns7tZX1VQLCArWl9Gcm9udCDjgavjgZnjgotcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLXNwcmluZy5ncmF2aXR5RGlyLngsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNwcmluZy5ncmF2aXR5RGlyLnksXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC1zcHJpbmcuZ3Jhdml0eURpci56XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgKS5ub3JtYWxpemUoKSxcclxuICAgICAgICAgICAgICAgIC8vICAgICBzcHJpbmcuZHJhZ0ZvcmNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGdldEJvbmUoc3ByaW5nLmNlbnRlciksXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc3ByaW5nLmhpdFJhZGl1cyxcclxuICAgICAgICAgICAgICAgIC8vICAgICByb290Qm9uZXMsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc3ByaW5nQ29sbGlkZXJzXHJcbiAgICAgICAgICAgICAgICAvLyApXHJcbiAgICAgICAgICAgICAgICBuZXcgVlJNU3ByaW5nQm9uZShcclxuICAgICAgICAgICAgICAgICAgICBzcHJpbmcuY29tbWVudCxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPy5zdGlmZm5lc3MgPyBvcHRpb25zLnN0aWZmbmVzcyA6IHNwcmluZy5zdGlmZmluZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM/LmdyYXZpdHlQb3dlciA/IG9wdGlvbnMuZ3Jhdml0eVBvd2VyIDogc3ByaW5nLmdyYXZpdHlQb3dlcixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPy5ncmF2aXR5RGlyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gb3B0aW9ucy5ncmF2aXR5RGlyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbmV3IFZlY3RvcjMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZSTSDlj7PmiYvns7tZX1VQLCAtWl9Gcm9udCDjgYvjgokgQmFieWxvbi5qcyDlt6bmiYvns7tZX1VQLCArWl9Gcm9udCDjgavjgZnjgotcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLXNwcmluZy5ncmF2aXR5RGlyLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcmluZy5ncmF2aXR5RGlyLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1zcHJpbmcuZ3Jhdml0eURpci56XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKS5ub3JtYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPy5kcmFnRm9yY2UgPyBvcHRpb25zLmRyYWdGb3JjZSA6IHNwcmluZy5kcmFnRm9yY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0Qm9uZShzcHJpbmcuY2VudGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPy5oaXRSYWRpdXMgPyBvcHRpb25zLmhpdFJhZGl1cyA6IHNwcmluZy5oaXRSYWRpdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdEJvbmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwcmluZ0NvbGxpZGVyc1xyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzcHJpbmdzO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1hdHJpeCwgUXVhdGVybmlvbiwgVmVjdG9yMyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoJztcclxuaW1wb3J0IHR5cGUgeyBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlJztcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB0eXBlIHsgQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vY29sbGlkZXItZ3JvdXAnO1xyXG4vLyBiYXNlZCBvblxyXG4vLyBodHRwOi8vcm9ja2V0anVtcC5za3IuanAvdW5pdHkzZC8xMDkvXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kd2FuZ28vVW5pVlJNL2Jsb2IvbWFzdGVyL1NjcmlwdHMvU3ByaW5nQm9uZS9WUk1TcHJpbmdCb25lLmNzXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waXhpdi90aHJlZS12cm0vYmxvYi9hYWQ1NTFlMDQxZmFkNTUzYzE5ZDIwOTFlNWY1ZWFmZjFlYjhmYWE4L3BhY2thZ2VzL3RocmVlLXZybS9zcmMvc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lLnRzXHJcblxyXG5jb25zdCBJREVOVElUWV9NQVRSSVggPSBNYXRyaXguSWRlbnRpdHkoKTtcclxuXHJcbmNvbnN0IF92M0EgPSBuZXcgVmVjdG9yMygpO1xyXG5jb25zdCBfdjNCID0gbmV3IFZlY3RvcjMoKTtcclxuY29uc3QgX3YzQyA9IG5ldyBWZWN0b3IzKCk7XHJcbmNvbnN0IF9xdWF0QSA9IG5ldyBRdWF0ZXJuaW9uKCk7XHJcbmNvbnN0IF9tYXRBID0gbmV3IE1hdHJpeCgpO1xyXG5jb25zdCBfbWF0QiA9IG5ldyBNYXRyaXgoKTtcclxuXHJcbi8qKlxyXG4gKiBWZXJsZXQgU3ByaW5nIEJvbmVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTG9naWMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsIGxvY2FsIHRyYW5zZm9ybSBNYXJpeFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGluaXRpYWxMb2NhbE1hdHJpeDogTWF0cml4O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZWQgaW5pdGlhbCBsb2NhbCByb3RhdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGluaXRpYWxMb2NhbFJvdGF0aW9uOiBRdWF0ZXJuaW9uO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZWQgaW5pdGlhbCBsb2NhbCBjaGlsZCBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGluaXRpYWxMb2NhbENoaWxkUG9zaXRpb246IFZlY3RvcjM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMZW5ndGggb2YgdGhlIGJvbmUgaW4gcmVsYXRpdmUgc3BhY2UgdW5pdC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjZW50ZXJTcGFjZUJvbmVMZW5ndGg6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogUG9zaXRpb24gb2YgdGhlIGJvbmUgaW4gcmVsYXRpdmUgc3BhY2UgdW5pdC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjZW50ZXJTcGFjZVBvc2l0aW9uOiBWZWN0b3IzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZlcmVuY2Ugb2YgcGFyZW50IHJvdGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYm9uZUF4aXM6IFZlY3RvcjM7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50VGFpbDogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKCk7XHJcbiAgICBwcml2YXRlIHByZXZUYWlsOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoKTtcclxuICAgIHByaXZhdGUgbmV4dFRhaWw6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGNlbnRlciBDZW50ZXIgcmVmZXJlbmNlIG9mIFRyYW5zZm9ybU5vZGVcclxuICAgICAqIEBwYXJhbSByYWRpdXMgQ29sbGlzaW9uIFJhZGl1c1xyXG4gICAgICogQHBhcmFtIHRyYW5zZm9ybSBCYXNlIFRyYW5zZm9ybU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjZW50ZXI6IE51bGxhYmxlPFRyYW5zZm9ybU5vZGU+LCBwdWJsaWMgcmVhZG9ubHkgcmFkaXVzOiBudW1iZXIsIHB1YmxpYyByZWFkb25seSB0cmFuc2Zvcm06IFRyYW5zZm9ybU5vZGUpIHtcclxuICAgICAgICAvLyBJbml0aWFsaXplIHJvdGF0aW9uUXVhdGVybmlvbiB3aGVuIG5vdCBpbml0aWFsaXplZFxyXG4gICAgICAgIGlmICghdHJhbnNmb3JtLnJvdGF0aW9uUXVhdGVybmlvbikge1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm0ucm90YXRpb25RdWF0ZXJuaW9uID0gdHJhbnNmb3JtLnJvdGF0aW9uLnRvUXVhdGVybmlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd29ybGRNYXRyaXggPSB0cmFuc2Zvcm0uZ2V0V29ybGRNYXRyaXgoKTtcclxuICAgICAgICB0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24gPSB3b3JsZE1hdHJpeC5nZXRUcmFuc2xhdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxMb2NhbE1hdHJpeCA9IHRyYW5zZm9ybS5fbG9jYWxNYXRyaXguY2xvbmUoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxMb2NhbFJvdGF0aW9uID0gdHJhbnNmb3JtLnJvdGF0aW9uUXVhdGVybmlvbi5jbG9uZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRyYW5zZm9ybS5nZXRDaGlsZFRyYW5zZm9ybU5vZGVzKHRydWUpO1xyXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uID0gdHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCkubm9ybWFsaXplKCkuc2NhbGVJblBsYWNlKDAuMDcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbiA9IGNoaWxkcmVuWzBdLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzVG9SZWYodGhpcy5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLCB3b3JsZE1hdHJpeCwgdGhpcy5jdXJyZW50VGFpbCk7XHJcbiAgICAgICAgdGhpcy5wcmV2VGFpbC5jb3B5RnJvbSh0aGlzLmN1cnJlbnRUYWlsKTtcclxuICAgICAgICB0aGlzLm5leHRUYWlsLmNvcHlGcm9tKHRoaXMuY3VycmVudFRhaWwpO1xyXG5cclxuICAgICAgICB0aGlzLmJvbmVBeGlzID0gdGhpcy5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLm5vcm1hbGl6ZVRvTmV3KCk7XHJcbiAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKHRoaXMuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbiwgd29ybGRNYXRyaXgsIF92M0EpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyU3BhY2VCb25lTGVuZ3RoID0gX3YzQS5zdWJ0cmFjdEluUGxhY2UodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKS5sZW5ndGgoKTtcclxuXHJcbiAgICAgICAgaWYgKGNlbnRlcikge1xyXG4gICAgICAgICAgICB0aGlzLmdldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKHRoaXMuY3VycmVudFRhaWwsIF9tYXRBLCB0aGlzLmN1cnJlbnRUYWlsKTtcclxuICAgICAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKHRoaXMucHJldlRhaWwsIF9tYXRBLCB0aGlzLnByZXZUYWlsKTtcclxuICAgICAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKHRoaXMubmV4dFRhaWwsIF9tYXRBLCB0aGlzLm5leHRUYWlsKTtcclxuXHJcbiAgICAgICAgICAgIHdvcmxkTWF0cml4Lm11bHRpcGx5VG9SZWYoX21hdEEsIF9tYXRBKTtcclxuXHJcbiAgICAgICAgICAgIF9tYXRBLmdldFRyYW5zbGF0aW9uVG9SZWYodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24sIF9tYXRBLCBfdjNBKTtcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXJTcGFjZUJvbmVMZW5ndGggPSBfdjNBLnN1YnRyYWN0SW5QbGFjZSh0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24pLmxlbmd0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBUYWlsIHBvc2l0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHN0aWZmbmVzc0ZvcmNlIEN1cnJlbnQgZnJhbWUgc3RpZmZuZXNzXHJcbiAgICAgKiBAcGFyYW0gZHJhZ0ZvcmNlIEN1cnJlbnQgZnJhbWUgZHJhZyBmb3JjZVxyXG4gICAgICogQHBhcmFtIGV4dGVybmFsIEN1cnJlbnQgZnJhbWUgZXh0ZXJuYWwgZm9yY2VcclxuICAgICAqIEBwYXJhbSBjb2xsaWRlckdyb3VwcyBDdXJyZW50IGZyYW1lIGNvbGxpZGVyR3JvdXBzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGUoc3RpZmZuZXNzRm9yY2U6IG51bWJlciwgZHJhZ0ZvcmNlOiBudW1iZXIsIGV4dGVybmFsOiBWZWN0b3IzLCBjb2xsaWRlckdyb3VwczogQ29sbGlkZXJHcm91cFtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKE51bWJlci5pc05hTih0aGlzLnRyYW5zZm9ybS5nZXRBYnNvbHV0ZVBvc2l0aW9uKCkueCkpIHtcclxuICAgICAgICAgICAgLy8gRG8gbm90IHVwZGF0ZSB3aGVuIGFic29sdXRlIHBvc2l0aW9uIGlzIGludmFsaWRcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gR2V0IGJvbmUgcG9zaXRpb24gaW4gY2VudGVyIHNwYWNlXHJcbiAgICAgICAgdGhpcy5nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5nZXRXb3JsZE1hdHJpeCgpLm11bHRpcGx5VG9SZWYoX21hdEEsIF9tYXRBKTtcclxuICAgICAgICBfbWF0QS5nZXRUcmFuc2xhdGlvblRvUmVmKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIC8vIEdldCBwYXJlbnQgcG9zaXRpb24gaW4gY2VudGVyIHNwYWNlXHJcbiAgICAgICAgdGhpcy5nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRCKTtcclxuICAgICAgICB0aGlzLmdldFBhcmVudE1hdHJpeFdvcmxkKCkubXVsdGlwbHlUb1JlZihfbWF0QiwgX21hdEIpO1xyXG5cclxuICAgICAgICAvLyB2ZXJsZXTnqY3liIbjgafmrKHjga7kvY3nva7jgpLoqIjnrpdcclxuICAgICAgICB0aGlzLm5leHRUYWlsLmNvcHlGcm9tKHRoaXMuY3VycmVudFRhaWwpO1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8g5rib6KGw5LuY44GN44Gn5YmN44Gu44OV44Os44O844Og44Gu56e75YuV44KS57aZ57aaXHJcbiAgICAgICAgICAgIF92M0EuY29weUZyb20odGhpcy5jdXJyZW50VGFpbClcclxuICAgICAgICAgICAgICAgIC5zdWJ0cmFjdEluUGxhY2UodGhpcy5wcmV2VGFpbClcclxuICAgICAgICAgICAgICAgIC5zY2FsZUluUGxhY2UoMS4wIC0gZHJhZ0ZvcmNlKTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0VGFpbC5hZGRJblBsYWNlKF92M0EpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIOimquOBruWbnui7ouOBq+OCiOOCi+WtkOODnOODvOODs+OBruenu+WLleebruaomVxyXG4gICAgICAgICAgICBfdjNBLmNvcHlGcm9tKHRoaXMuYm9uZUF4aXMpO1xyXG4gICAgICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzVG9SZWYoX3YzQSwgdGhpcy5pbml0aWFsTG9jYWxNYXRyaXgsIF92M0EpO1xyXG4gICAgICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzVG9SZWYoX3YzQSwgX21hdEIsIF92M0EpO1xyXG4gICAgICAgICAgICBfdjNBLnN1YnRyYWN0SW5QbGFjZSh0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24pLm5vcm1hbGl6ZSgpLnNjYWxlSW5QbGFjZShzdGlmZm5lc3NGb3JjZSk7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dFRhaWwuYWRkSW5QbGFjZShfdjNBKTtcclxuICAgICAgICB9XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyDlpJblipvjgavjgojjgovnp7vli5Xph49cclxuICAgICAgICAgICAgdGhpcy5uZXh0VGFpbC5hZGRJblBsYWNlKGV4dGVybmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyDplbfjgZXjgpIgYm9uZUxlbmd0aCDjgavlvLfliLZcclxuICAgICAgICAgICAgdGhpcy5uZXh0VGFpbC5zdWJ0cmFjdEluUGxhY2UodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKS5zY2FsZUluUGxhY2UodGhpcy5jZW50ZXJTcGFjZUJvbmVMZW5ndGgpLmFkZEluUGxhY2UodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBDb2xsaXNpb24g44Gn56e75YuVXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZShjb2xsaWRlckdyb3VwcywgdGhpcy5uZXh0VGFpbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByZXZUYWlsLmNvcHlGcm9tKHRoaXMuY3VycmVudFRhaWwpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRhaWwuY29weUZyb20odGhpcy5uZXh0VGFpbCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdGlhbExvY2FsTWF0cml4Lm11bHRpcGx5VG9SZWYoX21hdEIsIF9tYXRBKTtcclxuICAgICAgICBjb25zdCBpbml0aWFsQ2VudGVyU3BhY2VNYXRyaXhJbnYgPSBfbWF0QS5pbnZlcnQoKTtcclxuICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzVG9SZWYodGhpcy5uZXh0VGFpbCwgaW5pdGlhbENlbnRlclNwYWNlTWF0cml4SW52LCBfdjNBKTtcclxuICAgICAgICBfdjNBLm5vcm1hbGl6ZVRvUmVmKF92M0IpO1xyXG4gICAgICAgIFF1YXRlcm5pb24uRnJvbVVuaXRWZWN0b3JzVG9SZWYodGhpcy5ib25lQXhpcywgX3YzQiwgX3F1YXRBKTtcclxuICAgICAgICBjb25zdCBhcHBseVJvdGF0aW9uID0gX3F1YXRBO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbExvY2FsUm90YXRpb24ubXVsdGlwbHlUb1JlZihhcHBseVJvdGF0aW9uLCB0aGlzLnRyYW5zZm9ybS5yb3RhdGlvblF1YXRlcm5pb24hKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIFdvcmxkTWF0cml4XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0uY29tcHV0ZVdvcmxkTWF0cml4KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgd29ybGQgc3BhY2UgaW50byBjZW50ZXIgc3BhY2UuXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0IFRhcmdldCBtYXRyaXhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNYXRyaXhXb3JsZFRvQ2VudGVyKHJlc3VsdDogTWF0cml4KTogTWF0cml4IHtcclxuICAgICAgICBpZiAodGhpcy5jZW50ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXIuZ2V0V29ybGRNYXRyaXgoKS5pbnZlcnRUb1JlZihyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5jb3B5RnJvbShJREVOVElUWV9NQVRSSVgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgd29ybGQgbWF0cml4IG9mIGl0cyBwYXJlbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhcmVudE1hdHJpeFdvcmxkKCk6IE1hdHJpeCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBhcmVudCA/ICh0aGlzLnRyYW5zZm9ybS5wYXJlbnQgYXMgVHJhbnNmb3JtTm9kZSkuZ2V0V29ybGRNYXRyaXgoKSA6IElERU5USVRZX01BVFJJWDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOihneeqgeWIpOWumuOCkuihjOOBhlxyXG4gICAgICogQHBhcmFtIGNvbGxpZGVyR3JvdXBzXHJcbiAgICAgKiBAcGFyYW0gdGFpbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbGxpZGUoY29sbGlkZXJHcm91cHM6IENvbGxpZGVyR3JvdXBbXSwgdGFpbDogVmVjdG9yMykge1xyXG4gICAgICAgIGNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcclxuICAgICAgICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5zcGhlcmUuY29tcHV0ZVdvcmxkTWF0cml4KCkubXVsdGlwbHlUb1JlZihfbWF0QSwgX21hdEEpO1xyXG4gICAgICAgICAgICAgICAgX21hdEEuZ2V0VHJhbnNsYXRpb25Ub1JlZihfdjNBKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbiA9IF92M0E7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1heEFic1NjYWxlID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbGxpZGVyLnNwaGVyZS5hYnNvbHV0ZVNjYWxpbmcuYXNBcnJheSgpLmZvckVhY2goKHMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhBYnNTY2FsZSA9IE1hdGgubWF4KG1heEFic1NjYWxlLCBNYXRoLmFicyhzKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbGxpZGVyUmFkaXVzID0gY29sbGlkZXIucmFkaXVzICogbWF4QWJzU2NhbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByID0gdGhpcy5yYWRpdXMgKyBjb2xsaWRlclJhZGl1cztcclxuXHJcbiAgICAgICAgICAgICAgICB0YWlsLnN1YnRyYWN0VG9SZWYoY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uLCBfdjNCKTtcclxuICAgICAgICAgICAgICAgIGlmIChfdjNCLmxlbmd0aFNxdWFyZWQoKSA8PSByICogcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbCA9IF92M0IuY29weUZyb20odGFpbCkuc3VidHJhY3RJblBsYWNlKGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zRnJvbUNvbGxpZGVyID0gX3YzQy5jb3B5RnJvbShjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24pLmFkZEluUGxhY2Uobm9ybWFsLnNjYWxlSW5QbGFjZShyKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhaWwuY29weUZyb20oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc0Zyb21Db2xsaWRlci5zdWJ0cmFjdEluUGxhY2UodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKS5zY2FsZUluUGxhY2UodGhpcy5jZW50ZXJTcGFjZUJvbmVMZW5ndGgpLmFkZEluUGxhY2UodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFN0YW5kYXJkTWF0ZXJpYWwgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBDb2xvcjMsIFZlY3RvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB7IE1lc2hCdWlsZGVyIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy9tZXNoQnVpbGRlcic7XHJcbmltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZSc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IENvbGxpZGVyR3JvdXAgfSBmcm9tICcuL2NvbGxpZGVyLWdyb3VwJztcclxuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUxvZ2ljIH0gZnJvbSAnLi92cm0tc3ByaW5nLWJvbmUtbG9naWMnO1xyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyogVE9ETzogUGF0Y2hlZC5cclxuaW1wb3J0IHR5cGUgeyBDb25zdHJ1Y3RTcHJpbmdzT3B0aW9ucyB9IGZyb20gJy4vc3ByaW5nLWJvbmUtY29udHJvbGxlcic7XHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vKipcclxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvVW5pVlJNL2Jsb2IvbWFzdGVyL0Fzc2V0cy9WUk0vVW5pVlJNL1NjcmlwdHMvU3ByaW5nQm9uZS9WUk1TcHJpbmdCb25lLmNzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZSB7XHJcbiAgICBwdWJsaWMgdmVybGV0czogVlJNU3ByaW5nQm9uZUxvZ2ljW10gPSBbXTtcclxuICAgIHByaXZhdGUgYWN0aXZlQm9uZXM6IFRyYW5zZm9ybU5vZGVbXSA9IFtdO1xyXG5cclxuICAgIC8qKiBAaGlkZGVuICovXHJcbiAgICBwcml2YXRlIGRyYXdHaXptbyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi8wLjBcclxuICAgICAqIEBwYXJhbSBjb21tZW50IEFubm90YXRpb24gY29tbWVudFxyXG4gICAgICogQHBhcmFtIHN0aWZmbmVzcyBUaGUgcmVzaWxpZW5jZSBvZiB0aGUgc3dheWluZyBvYmplY3QgKHRoZSBwb3dlciBvZiByZXR1cm5pbmcgdG8gdGhlIGluaXRpYWwgcG9zZSkuXHJcbiAgICAgKiBAcGFyYW0gZ3Jhdml0eVBvd2VyIFRoZSBzdHJlbmd0aCBvZiBncmF2aXR5LlxyXG4gICAgICogQHBhcmFtIGdyYXZpdHlEaXIgVGhlIGRpcmVjdGlvbiBvZiBncmF2aXR5LiBTZXQgKDAsIC0xLCAwKSBmb3Igc2ltdWxhdGluZyB0aGUgZ3Jhdml0eS4gU2V0ICgxLCAwLCAwKSBmb3Igc2ltdWxhdGluZyB0aGUgd2luZC5cclxuICAgICAqIEBwYXJhbSBkcmFnRm9yY2UgVGhlIHJlc2lzdGFuY2UgKGRlY2VsZXJhdGlvbikgb2YgYXV0b21hdGljIGFuaW1hdGlvbi5cclxuICAgICAqIEBwYXJhbSBjZW50ZXIgVGhlIHJlZmVyZW5jZSBwb2ludCBvZiBhIHN3YXlpbmcgb2JqZWN0IGNhbiBiZSBzZXQgYXQgYW55IGxvY2F0aW9uIGV4Y2VwdCB0aGUgb3JpZ2luLlxyXG4gICAgICogICAgICAgICAgICAgICBXaGVuIGltcGxlbWVudGluZyBVSSBtb3Zpbmcgd2l0aCB3YXJwLFxyXG4gICAgICogICAgICAgICAgICAgICB0aGUgcGFyZW50IG5vZGUgdG8gbW92ZSB3aXRoIHdhcnAgY2FuIGJlIHNwZWNpZmllZCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBtYWtlIHRoZSBvYmplY3Qgc3dheWluZyB3aXRoIHdhcnAgbW92ZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gaGl0UmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIHNwaGVyZSB1c2VkIGZvciB0aGUgY29sbGlzaW9uIGRldGVjdGlvbiB3aXRoIGNvbGxpZGVycy5cclxuICAgICAqIEBwYXJhbSBib25lcyBTcGVjaWZ5IHRoZSBub2RlIGluZGV4IG9mIHRoZSByb290IGJvbmUgb2YgdGhlIHN3YXlpbmcgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIGNvbGxpZGVyR3JvdXBzIFNwZWNpZnkgdGhlIGluZGV4IG9mIHRoZSBjb2xsaWRlciBncm91cCBmb3IgY29sbGlzaW9ucyB3aXRoIHN3YXlpbmcgb2JqZWN0cy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIC8vIHB1YmxpYyByZWFkb25seSBzdGlmZm5lc3M6IG51bWJlcixcclxuICAgICAgICAvLyBwdWJsaWMgcmVhZG9ubHkgZ3Jhdml0eVBvd2VyOiBudW1iZXIsXHJcbiAgICAgICAgLy8gcHVibGljIHJlYWRvbmx5IGdyYXZpdHlEaXI6IFZlY3RvcjMsXHJcbiAgICAgICAgLy8gcHVibGljIHJlYWRvbmx5IGRyYWdGb3JjZTogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyBzdGlmZm5lc3M6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgZ3Jhdml0eVBvd2VyOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIGdyYXZpdHlEaXI6IFZlY3RvcjMsXHJcbiAgICAgICAgcHVibGljIGRyYWdGb3JjZTogbnVtYmVyLFxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2VudGVyOiBOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPixcclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgLy8gcHVibGljIHJlYWRvbmx5IGhpdFJhZGl1czogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyBoaXRSYWRpdXM6IG51bWJlcixcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvbmVzOiBBcnJheTxOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPj4sXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyR3JvdXBzOiBDb2xsaWRlckdyb3VwW11cclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQm9uZXMgPSB0aGlzLmJvbmVzLmZpbHRlcigoYm9uZSkgPT4gYm9uZSAhPT0gbnVsbCkgYXMgVHJhbnNmb3JtTm9kZVtdO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQm9uZXMuZm9yRWFjaCgoYm9uZSkgPT4ge1xyXG4gICAgICAgICAgICBbYm9uZV0uY29uY2F0KGJvbmUuZ2V0Q2hpbGRUcmFuc2Zvcm1Ob2RlcygpKS5mb3JFYWNoKChiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcmxldHMucHVzaChuZXcgVlJNU3ByaW5nQm9uZUxvZ2ljKHRoaXMuY2VudGVyLCB0aGlzLmhpdFJhZGl1cywgYikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgdGhpcy5ncmF2aXR5RGlyLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kcmF3R2l6bW8pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cEdpem1vKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXBHaXptbygpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZUJvbmVzLmZvckVhY2goKGJvbmUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2NlbmUgPSBib25lLmdldFNjZW5lKCk7XHJcbiAgICAgICAgICAgIFtib25lXS5jb25jYXQoYm9uZS5nZXRDaGlsZFRyYW5zZm9ybU5vZGVzKCkpLmZvckVhY2goKGIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJvbmVHaXptbyA9IE1lc2hCdWlsZGVyLkNyZWF0ZVNwaGVyZShcclxuICAgICAgICAgICAgICAgICAgICBiLm5hbWUgKyAnX2JvbmVHaXptbycsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50czogNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbWV0ZXI6IHRoaXMuaGl0UmFkaXVzICogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXQgPSBuZXcgU3RhbmRhcmRNYXRlcmlhbChiLm5hbWUgKyAnX2JvbmVHaXptb21hdCcsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgIG1hdC5lbWlzc2l2ZUNvbG9yID0gQ29sb3IzLlJlZCgpO1xyXG4gICAgICAgICAgICAgICAgbWF0LndpcmVmcmFtZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBib25lR2l6bW8ubWF0ZXJpYWwgPSBtYXQ7XHJcbiAgICAgICAgICAgICAgICBib25lR2l6bW8uc2V0UGFyZW50KGIpO1xyXG4gICAgICAgICAgICAgICAgYm9uZUdpem1vLnBvc2l0aW9uID0gVmVjdG9yMy5aZXJvKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjZW5lID0gZ3JvdXAudHJhbnNmb3JtLmdldFNjZW5lKCk7XHJcbiAgICAgICAgICAgIGdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BoZXJlID0gY29sbGlkZXIuc3BoZXJlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzcGhlcmUuaXNFbmFibGVkKGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwaGVyZS5zZXRFbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdCA9IG5ldyBTdGFuZGFyZE1hdGVyaWFsKGdyb3VwLnRyYW5zZm9ybS5uYW1lICsgJ19jb2xsaWRlckdpem1vbWF0Jywgc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdC5lbWlzc2l2ZUNvbG9yID0gQ29sb3IzLlllbGxvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdC53aXJlZnJhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwaGVyZS5tYXRlcmlhbCA9IG1hdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgYm9uZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGVsdGFUaW1lXHJcbiAgICAgKi9cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgLy8gcHVibGljIGFzeW5jIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlciwgYm9uZU9wdGlvbnM/OiBDb25zdHJ1Y3RTcHJpbmdzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIGNvbnN0IG9sZE9wdGlvbnMgPSB0aGlzLnVwZGF0ZU9wdGlvbnMoYm9uZU9wdGlvbnMpO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICBjb25zdCBzdGlmZm5lc3MgPSB0aGlzLnN0aWZmbmVzcyAqIGRlbHRhVGltZTtcclxuICAgICAgICBjb25zdCBleHRlcm5hbCA9IHRoaXMuZ3Jhdml0eURpci5zY2FsZSh0aGlzLmdyYXZpdHlQb3dlciAqIGRlbHRhVGltZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gdGhpcy52ZXJsZXRzLm1hcDxQcm9taXNlPHZvaWQ+PigodmVybGV0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmVybGV0LnVwZGF0ZShzdGlmZm5lc3MsIHRoaXMuZHJhZ0ZvcmNlLCBleHRlcm5hbCwgdGhpcy5jb2xsaWRlckdyb3Vwcyk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAvLyBSZXN0b3JlIG9wdGlvbnNcclxuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMob2xkT3B0aW9ucyk7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8qIERvIE5vdGhpbmcgKi9cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIHByaXZhdGUgdXBkYXRlT3B0aW9ucyhib25lT3B0aW9ucz86IENvbnN0cnVjdFNwcmluZ3NPcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3QgYmFja3VwT3B0aW9uczogQ29uc3RydWN0U3ByaW5nc09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHN0aWZmbmVzczogdGhpcy5zdGlmZm5lc3MsXHJcbiAgICAgICAgICAgIGdyYXZpdHlQb3dlcjogdGhpcy5ncmF2aXR5UG93ZXIsXHJcbiAgICAgICAgICAgIGdyYXZpdHlEaXI6IHRoaXMuZ3Jhdml0eURpci5jbG9uZSgpLFxyXG4gICAgICAgICAgICBkcmFnRm9yY2U6IHRoaXMuZHJhZ0ZvcmNlLFxyXG4gICAgICAgICAgICBoaXRSYWRpdXM6IHRoaXMuaGl0UmFkaXVzLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdGlmZm5lc3MgPSBib25lT3B0aW9ucz8uc3RpZmZuZXNzIHx8IHRoaXMuc3RpZmZuZXNzO1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eVBvd2VyID0gYm9uZU9wdGlvbnM/LmdyYXZpdHlQb3dlciB8fCB0aGlzLmdyYXZpdHlQb3dlcjtcclxuICAgICAgICB0aGlzLmdyYXZpdHlEaXIgPSBib25lT3B0aW9ucz8uZ3Jhdml0eURpciB8fCB0aGlzLmdyYXZpdHlEaXI7XHJcbiAgICAgICAgdGhpcy5kcmFnRm9yY2UgPSBib25lT3B0aW9ucz8uZHJhZ0ZvcmNlIHx8IHRoaXMuZHJhZ0ZvcmNlO1xyXG4gICAgICAgIHRoaXMuaGl0UmFkaXVzID0gYm9uZU9wdGlvbnM/LmhpdFJhZGl1cyB8fCB0aGlzLmhpdFJhZGl1cztcclxuXHJcbiAgICAgICAgcmV0dXJuIGJhY2t1cE9wdGlvbnM7XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL21lc2gnO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiwgSU1hdGVyaWFsLCBJTWVzaFByaW1pdGl2ZSB9IGZyb20gJ0BiYWJ5bG9uanMvbG9hZGVycy9nbFRGLzIuMCc7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICdAYmFieWxvbmpzL2xvYWRlcnMvZ2xURi8yLjAnO1xyXG5pbXBvcnQgeyBWUk1NYW5hZ2VyIH0gZnJvbSAnLi92cm0tbWFuYWdlcic7XHJcbmltcG9ydCB7IFZSTU1hdGVyaWFsR2VuZXJhdG9yIH0gZnJvbSAnLi92cm0tbWF0ZXJpYWwtZ2VuZXJhdG9yJztcclxuXHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vKiBUT0RPOiBQYXRjaGVkLlxyXG5pbXBvcnQgdHlwZSB7IFZSTUZpbGVMb2FkZXIgfSBmcm9tICcuL3ZybS1maWxlLWxvYWRlcic7XHJcbmltcG9ydCB0eXBlIHsgR0xURkxvYWRlckV4dGVuc2lvbk9ic2VydmVyIH0gZnJvbSAnLi4vLi4vbG9hZGVyLW9ic2VydmVyJztcclxuaW1wb3J0IHR5cGUgeyBWM0RDb3JlIH0gZnJvbSAnLi4vLi4vLi4vaW5kZXgnO1xyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLyoqXHJcbiAqIGBleHRlbnNpb25zYCDjgavlhaXjgovmi6HlvLXjgq3jg7xcclxuICovXHJcbmNvbnN0IE5BTUUgPSAnVlJNJztcclxuXHJcbi8qKlxyXG4gKiBWUk0g5ouh5by144KS5Yem55CG44GZ44KLXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi8wLjApXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVlJNTG9hZGVyRXh0ZW5zaW9uIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE5BTUUgPSAnVlJNJztcclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQgPSB0cnVlO1xyXG4gICAgLyoqXHJcbiAgICAgKiDjgZPjga4gTWVzaCBpbmRleCDku6XpmY3jgYzoqq3jgb/ovrzjgb/lr77osaFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtZXNoZXNGcm9tID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog44GT44GuIFRyYW5zZm9ybU5vZGUgaW5kZXgg5Lul6ZmN44GM6Kqt44G/6L6844G/5a++6LGhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJhbnNmb3JtTm9kZXNGcm9tID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog44GT44GuIE1hdGVyaWFsIGluZGV4IOS7pemZjeOBjOiqreOBv+i+vOOBv+WvvuixoVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1hdGVyaWFsc0Zyb20gPSAwO1xyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkZXIgb2JzZXJ2ZXJzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9hZGVyT2JzZXJ2ZXJzOiBHTFRGTG9hZGVyRXh0ZW5zaW9uT2JzZXJ2ZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBvbkxvYWRlZENhbGxCYWNrOiBGdW5jdGlvbjtcclxuICAgIC8qKlxyXG4gICAgICogVlJNIE1hbmFnZXIgZnJvbSB0aGlzIGxvYWQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWFuYWdlcjogVlJNTWFuYWdlcjtcclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGxvYWRlcjogR0xURkxvYWRlcixcclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICBwcml2YXRlIHYzRENvcmU6IFYzRENvcmVcclxuICAgICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIGNvbnN0cnVjdG9yKCknKTtcclxuXHJcbiAgICAgICAgLy8gR0xURkxvYWRlciBoYXMgYWxyZWFkeSBhZGRlZCByb290TWVzaCBhcyBfX3Jvb3RfXyBiZWZvcmUgbG9hZCBleHRlbnNpb25cclxuICAgICAgICAvLyBAc2VlIGdsVEZMb2FkZXIuX2xvYWREYXRhXHJcbiAgICAgICAgdGhpcy5tZXNoZXNGcm9tID0gdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lLm1lc2hlcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtTm9kZXNGcm9tID0gdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lLnRyYW5zZm9ybU5vZGVzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsc0Zyb20gPSB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmUubWF0ZXJpYWxzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgdGhpcy5hZGRMb2FkZXJPYnNlcnZlcih0aGlzLnYzRENvcmUpO1xyXG4gICAgICAgIHRoaXMub25Mb2FkZWRDYWxsQmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgdGhpcy5vbkxvYWRlZENhbGxCYWNrKCknKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMubWFuYWdlcjogJywgdGhpcy5tYW5hZ2VyKTtcclxuXHJcbiAgICAgICAgICAgIHYzRENvcmUuYWRkVlJNTWFuYWdlcih0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdjNEQ29yZS5hZGRPbkxvYWRDb21wbGV0ZUNhbGxiYWNrcyh0aGlzLm9uTG9hZGVkQ2FsbEJhY2spO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgKHRoaXMubG9hZGVyIGFzIGFueSkgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICB0aGlzLmxvYWRlck9ic2VydmVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMudjNEQ29yZS5yZW1vdmVPbkxvYWRDb21wbGV0ZUNhbGxiYWNrKHRoaXMub25Mb2FkZWRDYWxsQmFjayk7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25SZWFkeSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2FsbCBvblJlYWR5KCknKTtcclxuICAgICAgICBjb25zb2xlLmxvZygndGhpcy5sb2FkZXI6ICcsIHRoaXMubG9hZGVyKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnMgfHwgIXRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9uc1tOQU1FXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCByZXR1cm4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgLy8gY29uc3Qgc2NlbmUgPSB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmU7XHJcbiAgICAgICAgLy8gY29uc3QgbWFuYWdlciA9IG5ldyBWUk1NYW5hZ2VyKFxyXG4gICAgICAgIC8vICAgICB0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnNbVlJNTG9hZGVyRXh0ZW5zaW9uLk5BTUVdLFxyXG4gICAgICAgIC8vICAgICB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmUsXHJcbiAgICAgICAgLy8gICAgIHRoaXMubWVzaGVzRnJvbSxcclxuICAgICAgICAvLyAgICAgdGhpcy50cmFuc2Zvcm1Ob2Rlc0Zyb20sXHJcbiAgICAgICAgLy8gICAgIHRoaXMubWF0ZXJpYWxzRnJvbSxcclxuICAgICAgICAvLyApO1xyXG4gICAgICAgIC8vIHNjZW5lLm1ldGFkYXRhID0gc2NlbmUubWV0YWRhdGEgfHwge307XHJcbiAgICAgICAgLy8gc2NlbmUubWV0YWRhdGEudnJtTWFuYWdlcnMgPSBzY2VuZS5tZXRhZGF0YS52cm1NYW5hZ2VycyB8fCBbXTtcclxuICAgICAgICAvLyBzY2VuZS5tZXRhZGF0YS52cm1NYW5hZ2Vycy5wdXNoKHRoaXMubWFuYWdlcik7XHJcblxyXG4gICAgICAgIGNvbnN0IHVyaSA9ICh0aGlzLmxvYWRlci5wYXJlbnQgYXMgdW5rbm93biBhcyBWUk1GaWxlTG9hZGVyKS51cmk7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyID0gbmV3IFZSTU1hbmFnZXIodGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zW05BTUVdLCB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmUsIHRoaXMubWVzaGVzRnJvbSwgdGhpcy50cmFuc2Zvcm1Ob2Rlc0Zyb20sIHRoaXMubWF0ZXJpYWxzRnJvbSwgdXJpKTtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lLm9uRGlzcG9zZU9ic2VydmFibGUuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gU2NlbmUgZGlzcG9zZSDmmYLjgasgTWFuYWdlciDjgoLnoLTmo4TjgZnjgotcclxuICAgICAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgICAgIC8vIG1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmUubWV0YWRhdGEudnJtTWFuYWdlcnMgPSBbXTtcclxuICAgICAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3RyeSB0byBjYWxsIG9ic2VydmVyLm9uTG9hZFJlYWR5KCknKTtcclxuICAgICAgICBmb3IgKGNvbnN0IG9ic2VydmVyIG9mIHRoaXMubG9hZGVyT2JzZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvYnNlcnZlcjogJywgb2JzZXJ2ZXIpO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5vbkxvYWRSZWFkeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgLy8gcHVibGljIF9sb2FkVmVydGV4RGF0YUFzeW5jKGNvbnRleHQ6IHN0cmluZywgcHJpbWl0aXZlOiBJTWVzaFByaW1pdGl2ZSwgYmFieWxvbk1lc2g6IE1lc2gpIHtcclxuICAgIHB1YmxpYyBfbG9hZFZlcnRleERhdGFBc3luYyhjb250ZXh0OiBzdHJpbmcsIHByaW1pdGl2ZTogSU1lc2hQcmltaXRpdmUsIGJhYnlsb25NZXNoOiBNZXNoKTogYW55IHtcclxuICAgICAgICBpZiAoIXByaW1pdGl2ZS5leHRyYXMgfHwgIXByaW1pdGl2ZS5leHRyYXMudGFyZ2V0TmFtZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOOBvuOBoCBNb3JwaFRhcmdldCDjgYznlJ/miJDjgZXjgozjgabjgYTjgarjgYTjga7jgafjgIHjg6Hjgr/mg4XloLHjgavjg6Ljg7zjg5Xjgr/jg7zjgrLjg4Pjg4jmg4XloLHjgpLlhaXjgozjgabjgYrjgY9cclxuICAgICAgICBiYWJ5bG9uTWVzaC5tZXRhZGF0YSA9IGJhYnlsb25NZXNoLm1ldGFkYXRhIHx8IHt9O1xyXG4gICAgICAgIGJhYnlsb25NZXNoLm1ldGFkYXRhLnZybVRhcmdldE5hbWVzID0gcHJpbWl0aXZlLmV4dHJhcy50YXJnZXROYW1lcztcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfbG9hZE1hdGVyaWFsQXN5bmMoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBtZXNoOiBNZXNoLCBiYWJ5bG9uRHJhd01vZGU6IG51bWJlciwgYXNzaWduOiAoYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCkgPT4gdm9pZCk6IE51bGxhYmxlPFByb21pc2U8TWF0ZXJpYWw+PiB7XHJcbiAgICAgICAgLy8g44K444Kn44ON44Os44O844K/44Gn44Oe44OG44Oq44Ki44Or44KS55Sf5oiQ44GZ44KLXHJcbiAgICAgICAgcmV0dXJuIG5ldyBWUk1NYXRlcmlhbEdlbmVyYXRvcih0aGlzLmxvYWRlcikuZ2VuZXJhdGUoY29udGV4dCwgbWF0ZXJpYWwsIG1lc2gsIGJhYnlsb25EcmF3TW9kZSwgYXNzaWduKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIG9ic2VydmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRMb2FkZXJPYnNlcnZlcihvYnNlcnZlcjogR0xURkxvYWRlckV4dGVuc2lvbk9ic2VydmVyKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkZXJPYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbn1cclxuXHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vKiBUT0RPOiBQYXRjaGVkLlxyXG4vLyDjg63jg7zjg4Djg7zjgavnmbvpjLLjgZnjgotcclxuLy8gR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgVlJNTG9hZGVyRXh0ZW5zaW9uKGxvYWRlcikpO1xyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4iLCIvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyogVE9ETzogUGF0Y2hlZC5cclxuLy8gaW1wb3J0IHsgU2NlbmVMb2FkZXIgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTG9hZGluZy9zY2VuZUxvYWRlcic7XHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5pbXBvcnQgeyBHTFRGRmlsZUxvYWRlciB9IGZyb20gJ0BiYWJ5bG9uanMvbG9hZGVycy9nbFRGL2dsVEZGaWxlTG9hZGVyJztcclxuXHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vKiBUT0RPOiBQYXRjaGVkLlxyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgeyBWUk1NYW5hZ2VyIH0gZnJvbSAnLi92cm0tbWFuYWdlcic7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvc2NlbmUnO1xyXG5pbXBvcnQgdHlwZSB7IElTY2VuZUxvYWRlclByb2dyZXNzRXZlbnQgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTG9hZGluZy9zY2VuZUxvYWRlcic7XHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vKipcclxuICogVlJNL1ZDSSDjg5XjgqHjgqTjg6vjgpLoqq3jgb/ovrzjgoHjgovjgojjgYbjgavjgZnjgotcclxuICog5ouh5by15a2Q44KS5aSJ5pu044GX44Gf44Gg44GRXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVlJNRmlsZUxvYWRlciBleHRlbmRzIEdMVEZGaWxlTG9hZGVyIHtcclxuICAgIHB1YmxpYyBuYW1lID0gJ3ZybSc7XHJcbiAgICBwdWJsaWMgZXh0ZW5zaW9ucyA9IHtcclxuICAgICAgICAnLnZybSc6IHsgaXNCaW5hcnk6IHRydWUgfSxcclxuICAgICAgICAnLnZjaSc6IHsgaXNCaW5hcnk6IHRydWUgfSxcclxuICAgIH07XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIHB1YmxpYyB1cmk6IHN0cmluZztcclxuICAgIHB1YmxpYyB2cm1NYW5hZ2VyOiBOdWxsYWJsZTxWUk1NYW5hZ2VyPiA9IG51bGw7XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgcHVibGljIGNyZWF0ZVBsdWdpbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZSTUZpbGVMb2FkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIHB1YmxpYyBsb2FkQXN5bmMoc2NlbmU6IFNjZW5lLCBkYXRhOiBhbnksIHJvb3RVcmw6IHN0cmluZywgb25Qcm9ncmVzcz86IChldmVudDogSVNjZW5lTG9hZGVyUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZCwgZmlsZU5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnVyaSA9IHJvb3RVcmw7XHJcbiAgICAgICAgaWYgKGZpbGVOYW1lKSB0aGlzLnVyaSArPSBmaWxlTmFtZTtcclxuICAgICAgICByZXR1cm4gc3VwZXIubG9hZEFzeW5jKHNjZW5lLCBkYXRhLCByb290VXJsLCBvblByb2dyZXNzLCBmaWxlTmFtZSk7XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbn1cclxuXHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vKiBUT0RPOiBQYXRjaGVkLlxyXG4vLyBpZiAoU2NlbmVMb2FkZXIpIHtcclxuLy8gICAgIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKG5ldyBWUk1GaWxlTG9hZGVyKCkpO1xyXG4vLyB9XHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgSVZSTVZlY3RvcjMge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgejogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0ZW5zaW9ucy5WUk1cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTSB7XHJcbiAgICBleHBvcnRlclZlcnNpb246IHN0cmluZztcclxuICAgIHNwZWNWZXJzaW9uOiBzdHJpbmc7XHJcbiAgICBtZXRhOiBJVlJNTWV0YTtcclxuICAgIGh1bWFub2lkOiBJVlJNSHVtYW5vaWQ7XHJcbiAgICBmaXJzdFBlcnNvbjogSVZSTUZpcnN0UGVyc29uO1xyXG4gICAgYmxlbmRTaGFwZU1hc3RlcjogSVZSTUJsZW5kU2hhcGVNYXN0ZXI7XHJcbiAgICBzZWNvbmRhcnlBbmltYXRpb246IElWUk1TZWNvbmRhcnlBbmltYXRpb247XHJcbiAgICBtYXRlcmlhbFByb3BlcnRpZXM6IElWUk1NYXRlcmlhbFByb3BlcnR5W107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRlbnNpb25zLlZSTS5tZXRhXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1NZXRhIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XHJcbiAgICBhdXRob3I6IHN0cmluZztcclxuICAgIGNvbnRhY3RJbmZvcm1hdGlvbj86IHN0cmluZztcclxuICAgIHJlZmVyZW5jZT86IHN0cmluZztcclxuICAgIHRleHR1cmU/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRlbnNpb25zLlZSTS5odW1hbm9pZFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNSHVtYW5vaWQge1xyXG4gICAgaHVtYW5Cb25lczogSVZSTUh1bWFub2lkQm9uZVtdO1xyXG4gICAgYXJtU3RyZXRjaD86IG51bWJlcjtcclxuICAgIGxlZ1N0cmV0Y2g/OiBudW1iZXI7XHJcbiAgICB1cHBlckFybVR3aXN0PzogbnVtYmVyO1xyXG4gICAgbG93ZXJBcm1Ud2lzdD86IG51bWJlcjtcclxuICAgIHVwcGVyTGVnVHdpc3Q/OiBudW1iZXI7XHJcbiAgICBsb3dlckxlZ1R3aXN0PzogbnVtYmVyO1xyXG4gICAgZmVldFNwYWNpbmc/OiBudW1iZXI7XHJcbiAgICBoYXNUcmFuc2xhdGlvbkRvRj86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUh1bWFub2lkQm9uZSB7XHJcbiAgICBib25lOiBzdHJpbmc7XHJcbiAgICBub2RlOiBudW1iZXI7XHJcbiAgICB1c2VEZWZhdWx0VmFsdWVzOiBib29sZWFuO1xyXG4gICAgbWluPzogSVZSTVZlY3RvcjM7XHJcbiAgICBtYXg/OiBJVlJNVmVjdG9yMztcclxuICAgIGNlbnRlcj86IElWUk1WZWN0b3IzO1xyXG4gICAgYXhpc0xlbmd0aD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB7XHJcbiAgICBtZXNoOiBudW1iZXI7XHJcbiAgICBmaXJzdFBlcnNvbkZsYWc6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNRmlyc3RQZXJzb25EZWdyZWVNYXAge1xyXG4gICAgY3VydmU6IG51bWJlcltdO1xyXG4gICAgeFJhbmdlOiBudW1iZXI7XHJcbiAgICB5UmFuZ2U6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dGVuc2lvbnMuVlJNLmZpcnN0UGVyc29uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1GaXJzdFBlcnNvbiB7XHJcbiAgICBmaXJzdFBlcnNvbkJvbmU6IG51bWJlcjtcclxuICAgIGZpcnN0UGVyc29uQm9uZU9mZnNldDogSVZSTVZlY3RvcjM7XHJcbiAgICBtZXNoQW5ub3RhdGlvbnM6IElWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW107XHJcbiAgICBsb29rQXRUeXBlTmFtZTogJ0JvbmUnIHwgJ0JsZW5kU2hhcGUnO1xyXG4gICAgbG9va0F0SG9yaXpvbnRhbElubmVyOiBJVlJNRmlyc3RQZXJzb25EZWdyZWVNYXA7XHJcbiAgICBsb29rQXRIb3Jpem9udGFsT3V0ZXI6IElWUk1GaXJzdFBlcnNvbkRlZ3JlZU1hcDtcclxuICAgIGxvb2tBdFZlcnRpY2FsRG93bjogSVZSTUZpcnN0UGVyc29uRGVncmVlTWFwO1xyXG4gICAgbG9va0F0VmVydGljYWxVcDogSVZSTUZpcnN0UGVyc29uRGVncmVlTWFwO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0ZW5zaW9ucy5WUk0uYmxlbmRTaGFwZU1hc3RlclxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNQmxlbmRTaGFwZU1hc3RlciB7XHJcbiAgICBibGVuZFNoYXBlR3JvdXBzOiBJVlJNQmxlbmRTaGFwZUdyb3VwW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUJsZW5kU2hhcGVHcm91cCB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBwcmVzZXROYW1lOiBzdHJpbmc7XHJcbiAgICBiaW5kczogSVZSTUJsZW5kU2hhcGVCaW5kW107XHJcbiAgICBtYXRlcmlhbFZhbHVlczogSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmRbXTtcclxuICAgIGlzQmluYXJ5OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1CbGVuZFNoYXBlQmluZCB7XHJcbiAgICBtZXNoOiBudW1iZXI7XHJcbiAgICBpbmRleDogbnVtYmVyO1xyXG4gICAgd2VpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmQge1xyXG4gICAgbWF0ZXJpYWxOYW1lOiBzdHJpbmc7XHJcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcclxuICAgIHRhcmdldFZhbHVlOiBudW1iZXJbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uU3ByaW5nIHtcclxuICAgIGNvbW1lbnQ6IHN0cmluZztcclxuICAgIHN0aWZmaW5lc3M6IG51bWJlcjtcclxuICAgIGdyYXZpdHlQb3dlcjogbnVtYmVyO1xyXG4gICAgZ3Jhdml0eURpcjogSVZSTVZlY3RvcjM7XHJcbiAgICBkcmFnRm9yY2U6IG51bWJlcjtcclxuICAgIGNlbnRlcjogbnVtYmVyO1xyXG4gICAgaGl0UmFkaXVzOiBudW1iZXI7XHJcbiAgICBib25lczogbnVtYmVyW107XHJcbiAgICBjb2xsaWRlckdyb3VwczogbnVtYmVyW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTVNlY29uZGFyeUFuaW1hdGlvbkNvbGxpZGVyIHtcclxuICAgIG9mZnNldDogSVZSTVZlY3RvcjM7XHJcbiAgICByYWRpdXM6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXJHcm91cCB7XHJcbiAgICBub2RlOiBudW1iZXI7XHJcbiAgICBjb2xsaWRlcnM6IElWUk1TZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlcltdO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0ZW5zaW9ucy5WUk0uc2Vjb25kYXJ5QW5pbWF0aW9uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1TZWNvbmRhcnlBbmltYXRpb24ge1xyXG4gICAgYm9uZUdyb3VwczogSVZSTVNlY29uZGFyeUFuaW1hdGlvblNwcmluZ1tdO1xyXG4gICAgY29sbGlkZXJHcm91cHM6IElWUk1TZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlckdyb3VwW107XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIElWUk1NYXRlcmlhbFByb3BlcnR5U2hhZGVyIHtcclxuICAgIFZSTV9VU0VfR0xURlNIQURFUiA9ICdWUk1fVVNFX0dMVEZTSEFERVInLFxyXG4gICAgVlJNTVRvb24gPSAnVlJNL01Ub29uJyxcclxuICAgIFZSTVVubGl0VHJhbnNwYXJlbnRaV3JpdGUgPSAnVlJNL1VubGl0VHJhbnNwYXJlbnRaV3JpdGUnLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1NYXRlcmlhbFByb3BlcnR5RmxvYXRQcm9wZXJ0aWVzIHtcclxuICAgIF9DdXRvZmY/OiBudW1iZXI7XHJcbiAgICBfQnVtcFNjYWxlPzogbnVtYmVyO1xyXG4gICAgX1JlY2VpdmVTaGFkb3dSYXRlPzogbnVtYmVyO1xyXG4gICAgX1NoYWRpbmdHcmFkZVJhdGU/OiBudW1iZXI7XHJcbiAgICBfU2hhZGVTaGlmdD86IG51bWJlcjtcclxuICAgIF9TaGFkZVRvb255PzogbnVtYmVyO1xyXG4gICAgX0xpZ2h0Q29sb3JBdHRlbnVhdGlvbj86IG51bWJlcjtcclxuICAgIF9JbmRpcmVjdExpZ2h0SW50ZW5zaXR5PzogbnVtYmVyO1xyXG4gICAgX1JpbUxpZ2h0aW5nTWl4PzogbnVtYmVyO1xyXG4gICAgX1JpbUZyZXNuZWxQb3dlcj86IG51bWJlcjtcclxuICAgIF9SaW1MaWZ0PzogbnVtYmVyO1xyXG4gICAgX091dGxpbmVXaWR0aD86IG51bWJlcjtcclxuICAgIF9PdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U/OiBudW1iZXI7XHJcbiAgICBfT3V0bGluZUxpZ2h0aW5nTWl4PzogbnVtYmVyO1xyXG4gICAgX1V2QW5pbVNjcm9sbFg/OiBudW1iZXI7XHJcbiAgICBfVXZBbmltU2Nyb2xsWT86IG51bWJlcjtcclxuICAgIF9VdkFuaW1Sb3RhdGlvbj86IG51bWJlcjtcclxuICAgIF9EZWJ1Z01vZGU/OiBudW1iZXI7XHJcbiAgICBfQmxlbmRNb2RlPzogbnVtYmVyO1xyXG4gICAgX091dGxpbmVXaWR0aE1vZGU/OiBudW1iZXI7XHJcbiAgICBfT3V0bGluZUNvbG9yTW9kZT86IG51bWJlcjtcclxuICAgIF9DdWxsTW9kZT86IG51bWJlcjtcclxuICAgIF9PdXRsaW5lQ3VsbE1vZGU/OiBudW1iZXI7XHJcbiAgICBfU3JjQmxlbmQ/OiBudW1iZXI7XHJcbiAgICBfRHN0QmxlbmQ/OiBudW1iZXI7XHJcbiAgICBfWldyaXRlPzogbnVtYmVyO1xyXG4gICAgW3Byb3A6IHN0cmluZ106IG51bWJlciB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHkgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTU1hdGVyaWFsUHJvcGVydHlWZWN0b3JQcm9wZXJ0aWVzIHtcclxuICAgIF9Db2xvcj86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1NoYWRlQ29sb3I/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9NYWluVGV4PzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfU2hhZGVUZXh0dXJlPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfQnVtcE1hcD86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1JlY2VpdmVTaGFkb3dUZXh0dXJlPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfU2hhZGluZ0dyYWRlVGV4dHVyZT86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1JpbUNvbG9yPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfUmltVGV4dHVyZT86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1NwaGVyZUFkZD86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX0VtaXNzaW9uQ29sb3I/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9FbWlzc2lvbk1hcD86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX091dGxpbmVXaWR0aFRleHR1cmU/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9PdXRsaW5lQ29sb3I/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9VdkFuaW1NYXNrVGV4dHVyZT86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgW3Byb3A6IHN0cmluZ106IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5IHwgdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1NYXRlcmlhbFByb3BlcnR5VGV4dHVyZVByb3BlcnRpZXMge1xyXG4gICAgX01haW5UZXg/OiBudW1iZXI7XHJcbiAgICBfU2hhZGVUZXh0dXJlPzogbnVtYmVyO1xyXG4gICAgX0J1bXBNYXA/OiBudW1iZXI7XHJcbiAgICBfUmVjZWl2ZVNoYWRvd1RleHR1cmU/OiBudW1iZXI7XHJcbiAgICBfU2hhZGluZ0dyYWRlVGV4dHVyZT86IG51bWJlcjtcclxuICAgIF9SaW1UZXh0dXJlPzogbnVtYmVyO1xyXG4gICAgX1NwaGVyZUFkZD86IG51bWJlcjtcclxuICAgIF9FbWlzc2lvbk1hcD86IG51bWJlcjtcclxuICAgIF9PdXRsaW5lV2lkdGhUZXh0dXJlPzogbnVtYmVyO1xyXG4gICAgX1V2QW5pbU1hc2tUZXh0dXJlPzogbnVtYmVyO1xyXG4gICAgW3Byb3A6IHN0cmluZ106IG51bWJlciB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eUtleXdvcmRNYXAge1xyXG4gICAgX05PUk1BTE1BUD86IGJvb2xlYW47XHJcbiAgICBfQUxQSEFURVNUX09OPzogYm9vbGVhbjtcclxuICAgIF9BTFBIQUJMRU5EX09OPzogYm9vbGVhbjtcclxuICAgIF9BTFBIQVBSRU1VTFRJUExZX09OPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVRhZ01hcCB7XHJcbiAgICBSZW5kZXJUeXBlPzogJ09wYXF1ZScgfCAnVHJhbnNwYXJlbnRDdXRvdXQnIHwgJ1RyYW5zcGFyZW50JztcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dGVuc2lvbnMuVlJNLm1hdGVyaWFsUHJvcGVydGllc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBzaGFkZXI6IElWUk1NYXRlcmlhbFByb3BlcnR5U2hhZGVyO1xyXG4gICAgcmVuZGVyUXVldWU6IG51bWJlcjtcclxuICAgIGZsb2F0UHJvcGVydGllczogSVZSTU1hdGVyaWFsUHJvcGVydHlGbG9hdFByb3BlcnRpZXM7XHJcbiAgICB2ZWN0b3JQcm9wZXJ0aWVzOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVZlY3RvclByb3BlcnRpZXM7XHJcbiAgICB0ZXh0dXJlUHJvcGVydGllczogSVZSTU1hdGVyaWFsUHJvcGVydHlUZXh0dXJlUHJvcGVydGllcztcclxuICAgIGtleXdvcmRNYXA6IElWUk1NYXRlcmlhbFByb3BlcnR5S2V5d29yZE1hcDtcclxuICAgIHRhZ01hcDogSVZSTU1hdGVyaWFsUHJvcGVydHlUYWdNYXA7XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoJztcclxuaW1wb3J0IHR5cGUgeyBNZXNoIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy9tZXNoJztcclxuaW1wb3J0IHR5cGUgeyBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlJztcclxuaW1wb3J0IHR5cGUgeyBNb3JwaFRhcmdldCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9Nb3JwaC9tb3JwaFRhcmdldCc7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvc2NlbmUnO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgU3ByaW5nQm9uZUNvbnRyb2xsZXIgfSBmcm9tICcuL3NlY29uZGFyeS1hbmltYXRpb24vc3ByaW5nLWJvbmUtY29udHJvbGxlcic7XHJcbmltcG9ydCB7IEh1bWFub2lkQm9uZSB9IGZyb20gJy4vaHVtYW5vaWQtYm9uZSc7XHJcbmltcG9ydCB0eXBlIHsgSVZSTSB9IGZyb20gJy4vdnJtLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlciB9IGZyb20gJy4vbWF0ZXJpYWwtdmFsdWUtYmluZGluZy1tZXJnZXInO1xyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyogVE9ETzogUGF0Y2hlZC5cclxuaW1wb3J0IHsgQ29uc3RydWN0U3ByaW5nc09wdGlvbnMgfSBmcm9tICcuL3NlY29uZGFyeS1hbmltYXRpb24vc3ByaW5nLWJvbmUtY29udHJvbGxlcic7XHJcbmltcG9ydCB0eXBlIHsgTm9kZSwgVGFyZ2V0Q2FtZXJhIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlJztcclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmludGVyZmFjZSBJc0JpbmFyeU1hcCB7XHJcbiAgICBbbW9ycGhOYW1lOiBzdHJpbmddOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTW9ycGhUYXJnZXRTZXR0aW5nIHtcclxuICAgIHRhcmdldDogTW9ycGhUYXJnZXQ7XHJcbiAgICB3ZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIE1vcnBoVGFyZ2V0TWFwIHtcclxuICAgIFttb3JwaE5hbWU6IHN0cmluZ106IE1vcnBoVGFyZ2V0U2V0dGluZ1tdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXAge1xyXG4gICAgW21vcnBoTmFtZTogc3RyaW5nXTogTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBUcmFuc2Zvcm1Ob2RlTWFwIHtcclxuICAgIFtodW1hbkJvbmVOYW1lOiBzdHJpbmddOiBUcmFuc2Zvcm1Ob2RlO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVHJhbnNmb3JtTm9kZUNhY2hlIHtcclxuICAgIFtub2RlSW5kZXg6IG51bWJlcl06IFRyYW5zZm9ybU5vZGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBNZXNoQ2FjaGUge1xyXG4gICAgW21lc2hJbmRleDogbnVtYmVyXTogTWVzaFtdO1xyXG59XHJcblxyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyogVE9ETzogUGF0Y2hlZC5cclxuZXhwb3J0IGNsYXNzIG1vcnBoaW5nVGFyZ2V0UHJvcGVydHkge1xyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcjtcclxuICAgIGdldCB2YWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdmFsdWUpKTtcclxuICAgICAgICB0aGlzLm1hbmFnZXIubW9ycGhpbmcodGhpcy5sYWJlbCwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyLCBwcml2YXRlIG1hbmFnZXI6IFZSTU1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgTW9ycGhUYXJnZXRQcm9wZXJ0eU1hcCB7XHJcbiAgICBbbW9ycGhOYW1lOiBzdHJpbmddOiBtb3JwaGluZ1RhcmdldFByb3BlcnR5O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zZm9ybU5vZGVUcmVlTm9kZSB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcGFyZW50OiBudW1iZXI7XHJcbiAgICBjaGlsZHJlbj86IFRyYW5zZm9ybU5vZGVUcmVlTm9kZVtdO1xyXG59XHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vKipcclxuICogVW5pdHkgSHVtYW5vaWQgQm9uZSDlkI1cclxuICovXHJcbmV4cG9ydCB0eXBlIEh1bWFuQm9uZU5hbWUgPVxyXG4gICAgfCAnaGlwcydcclxuICAgIHwgJ2xlZnRVcHBlckxlZydcclxuICAgIHwgJ3JpZ2h0VXBwZXJMZWcnXHJcbiAgICB8ICdsZWZ0TG93ZXJMZWcnXHJcbiAgICB8ICdyaWdodExvd2VyTGVnJ1xyXG4gICAgfCAnbGVmdEZvb3QnXHJcbiAgICB8ICdyaWdodEZvb3QnXHJcbiAgICB8ICdzcGluZSdcclxuICAgIHwgJ2NoZXN0J1xyXG4gICAgfCAnbmVjaydcclxuICAgIHwgJ2hlYWQnXHJcbiAgICB8ICdsZWZ0U2hvdWxkZXInXHJcbiAgICB8ICdyaWdodFNob3VsZGVyJ1xyXG4gICAgfCAnbGVmdFVwcGVyQXJtJ1xyXG4gICAgfCAncmlnaHRVcHBlckFybSdcclxuICAgIHwgJ2xlZnRMb3dlckFybSdcclxuICAgIHwgJ3JpZ2h0TG93ZXJBcm0nXHJcbiAgICB8ICdsZWZ0SGFuZCdcclxuICAgIHwgJ3JpZ2h0SGFuZCdcclxuICAgIHwgJ2xlZnRUb2VzJ1xyXG4gICAgfCAncmlnaHRUb2VzJ1xyXG4gICAgfCAnbGVmdEV5ZSdcclxuICAgIHwgJ3JpZ2h0RXllJ1xyXG4gICAgfCAnamF3J1xyXG4gICAgfCAnbGVmdFRodW1iUHJveGltYWwnXHJcbiAgICB8ICdsZWZ0VGh1bWJJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdsZWZ0VGh1bWJEaXN0YWwnXHJcbiAgICB8ICdsZWZ0SW5kZXhQcm94aW1hbCdcclxuICAgIHwgJ2xlZnRJbmRleEludGVybWVkaWF0ZSdcclxuICAgIHwgJ2xlZnRJbmRleERpc3RhbCdcclxuICAgIHwgJ2xlZnRNaWRkbGVQcm94aW1hbCdcclxuICAgIHwgJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdsZWZ0TWlkZGxlRGlzdGFsJ1xyXG4gICAgfCAnbGVmdFJpbmdQcm94aW1hbCdcclxuICAgIHwgJ2xlZnRSaW5nSW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAnbGVmdFJpbmdEaXN0YWwnXHJcbiAgICB8ICdsZWZ0TGl0dGxlUHJveGltYWwnXHJcbiAgICB8ICdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAnbGVmdExpdHRsZURpc3RhbCdcclxuICAgIHwgJ3JpZ2h0VGh1bWJQcm94aW1hbCdcclxuICAgIHwgJ3JpZ2h0VGh1bWJJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdyaWdodFRodW1iRGlzdGFsJ1xyXG4gICAgfCAncmlnaHRJbmRleFByb3hpbWFsJ1xyXG4gICAgfCAncmlnaHRJbmRleEludGVybWVkaWF0ZSdcclxuICAgIHwgJ3JpZ2h0SW5kZXhEaXN0YWwnXHJcbiAgICB8ICdyaWdodE1pZGRsZVByb3hpbWFsJ1xyXG4gICAgfCAncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdyaWdodE1pZGRsZURpc3RhbCdcclxuICAgIHwgJ3JpZ2h0UmluZ1Byb3hpbWFsJ1xyXG4gICAgfCAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAncmlnaHRSaW5nRGlzdGFsJ1xyXG4gICAgfCAncmlnaHRMaXR0bGVQcm94aW1hbCdcclxuICAgIHwgJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAncmlnaHRMaXR0bGVEaXN0YWwnXHJcbiAgICB8ICd1cHBlckNoZXN0J1xyXG4gICAgfCBzdHJpbmc7XHJcblxyXG4vKipcclxuICogVlJNIOOCreODo+ODqeOCr+OCv+ODvOOCkuWLleS9nOOBleOBm+OCi+OBn+OCgeOBruODnuODjeODvOOCuOODo1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZSTU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBpc0JpbmFyeU1vcnBoTWFwOiBJc0JpbmFyeU1hcCA9IHt9O1xyXG4gICAgcHJpdmF0ZSBtb3JwaFRhcmdldE1hcDogTW9ycGhUYXJnZXRNYXAgPSB7fTtcclxuICAgIHByaXZhdGUgbWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXA6IE1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwID0ge307XHJcbiAgICBwcml2YXRlIHByZXNldE1vcnBoVGFyZ2V0TWFwOiBNb3JwaFRhcmdldE1hcCA9IHt9O1xyXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1Ob2RlTWFwOiBUcmFuc2Zvcm1Ob2RlTWFwID0ge307XHJcbiAgICBwcml2YXRlIHRyYW5zZm9ybU5vZGVDYWNoZTogVHJhbnNmb3JtTm9kZUNhY2hlID0ge307XHJcbiAgICBwcml2YXRlIG1lc2hDYWNoZTogTWVzaENhY2hlID0ge307XHJcbiAgICBwcml2YXRlIF9odW1hbm9pZEJvbmU6IEh1bWFub2lkQm9uZTtcclxuICAgIHByaXZhdGUgX3Jvb3RNZXNoOiBNZXNoO1xyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgcHVibGljIHN0YXRpYyBST09UX01FU0hfUFJFRklYID0gJ3ZybV9yb290Xyc7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHJhbnNmb3JtTm9kZVRyZWU6IFRyYW5zZm9ybU5vZGVUcmVlTm9kZTtcclxuICAgIGdldCB0cmFuc2Zvcm1Ob2RlVHJlZSgpOiBUcmFuc2Zvcm1Ob2RlVHJlZU5vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1Ob2RlVHJlZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgdGhlIHdheSBCYWJ5bG9uSlMgYW5pbWF0aW9uIHdvcmtzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBNb3JwaFRhcmdldFByb3BlcnR5TWFwOiBNb3JwaFRhcmdldFByb3BlcnR5TWFwID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBfcm9vdFNrZWxldG9uOiBOb2RlO1xyXG5cclxuICAgIHByaXZhdGUgX2NhbWVyYXM6IFRhcmdldENhbWVyYVtdID0gW107XHJcblxyXG4gICAgZ2V0IGNhbWVyYXMoKTogVGFyZ2V0Q2FtZXJhW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYW1lcmFzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhcHBlbmRDYW1lcmEoY2FtZXJhOiBUYXJnZXRDYW1lcmEpIHtcclxuICAgICAgICB0aGlzLl9jYW1lcmFzLnB1c2goY2FtZXJhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRDYW1lcmFzKCkge1xyXG4gICAgICAgIHRoaXMuX2NhbWVyYXMgPSBbXTtcclxuICAgIH1cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlY29uZGFyeSBBbmltYXRpb24g44Go44GX44Gm5a6a576p44GV44KM44Gm44GE44KLIFZSTSBTcHJpbmcgQm9uZSDjga7jgrPjg7Pjg4jjg63jg7zjg6lcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHNwcmluZ0JvbmVDb250cm9sbGVyOiBTcHJpbmdCb25lQ29udHJvbGxlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXh0IGdsVEYuZXh0ZW5zaW9ucy5WUk0g44Gu5Lit6LqrIGpzb25cclxuICAgICAqIEBwYXJhbSBzY2VuZVxyXG4gICAgICogQHBhcmFtIG1lc2hlc0Zyb20g44GT44Gu55Wq5Y+35Lul6ZmN44Gu44Oh44OD44K344Ol44GM44GT44GuIFZSTSDjgavoqbLlvZPjgZnjgotcclxuICAgICAqIEBwYXJhbSB0cmFuc2Zvcm1Ob2Rlc0Zyb20g44GT44Gu55Wq5Y+35Lul6ZmN44GuIFRyYW5zZm9ybU5vZGUg44GM44GT44GuIFZSTSDjgavoqbLlvZPjgZnjgotcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbHNOb2Rlc0Zyb20g44GT44Gu55Wq5Y+35Lul6ZmN44GuIE1hdGVyaWFsIOOBjOOBk+OBriBWUk0g44Gr6Kmy5b2T44GZ44KLXHJcbiAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgKiBAcGFyYW0gdXJpIFVSSSB0aGlzIG1hbmFnZXIgYmVsb25ncyB0b1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGV4dDogSVZSTSxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzaGVzRnJvbTogbnVtYmVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdHJhbnNmb3JtTm9kZXNGcm9tOiBudW1iZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBtYXRlcmlhbHNOb2Rlc0Zyb206IG51bWJlcixcclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdXJpOiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMubWVzaENhY2hlID0gdGhpcy5jb25zdHJ1Y3RNZXNoQ2FjaGUoKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybU5vZGVDYWNoZSA9IHRoaXMuY29uc3RydWN0VHJhbnNmb3JtTm9kZUNhY2hlKCk7XHJcbiAgICAgICAgdGhpcy5zcHJpbmdCb25lQ29udHJvbGxlciA9IG5ldyBTcHJpbmdCb25lQ29udHJvbGxlcih0aGlzLmV4dC5zZWNvbmRhcnlBbmltYXRpb24sIHRoaXMuZmluZFRyYW5zZm9ybU5vZGUuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmV4dC5ibGVuZFNoYXBlTWFzdGVyICYmIHRoaXMuZXh0LmJsZW5kU2hhcGVNYXN0ZXIuYmxlbmRTaGFwZUdyb3Vwcykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdElzQmluYXJ5TWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0TW9ycGhUYXJnZXRNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlck1hcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnN0cnVjdFRyYW5zZm9ybU5vZGVNYXAoKTtcclxuXHJcbiAgICAgICAgdGhpcy5faHVtYW5vaWRCb25lID0gbmV3IEh1bWFub2lkQm9uZSh0aGlzLnRyYW5zZm9ybU5vZGVNYXApO1xyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAvLyogVE9ETzogSGFuZGxlIGxhdGVyLlxyXG4gICAgICAgIC8vIHRoaXMucmVtb3ZlRHVwbGljYXRlU2tlbGV0b25zKCk7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNrZWxldG9uID0gdGhpcy5nZXRSb290U2tlbGV0b25Ob2RlKCk7XHJcbiAgICAgICAgLy8gUmVuYW1lIF9fcm9vdF9fIG5vZGVcclxuICAgICAgICB0aGlzLnJvb3RNZXNoLm5hbWUgPSBWUk1NYW5hZ2VyLlJPT1RfTUVTSF9QUkVGSVggKyB0aGlzLnNjZW5lLmdldE5vZGVzKCkuZmlsdGVyKChlKSA9PiBlLm5hbWUuaW5jbHVkZXMoVlJNTWFuYWdlci5ST09UX01FU0hfUFJFRklYKSkubGVuZ3RoO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfVxyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgZHVwbGljYXRlIHNrZWxldG9ucyB3aGVuIGltcG9ydGluZyBWUk0uXHJcbiAgICAgKiBPbmx5IHRlc3RlZCBvbiBWUm9pZFN0dWRpbyBvdXRwdXQgZmlsZXMuXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZUR1cGxpY2F0ZVNrZWxldG9ucygpIHtcclxuICAgICAgICBsZXQgc2tlbGV0b24gPSBudWxsO1xyXG4gICAgICAgIGZvciAoY29uc3Qgbm9kZUluZGV4IG9mIE9iamVjdC5rZXlzKHRoaXMubWVzaENhY2hlKS5tYXAoTnVtYmVyKSkge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNoZXMgPSB0aGlzLm1lc2hDYWNoZVtub2RlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAobWVzaGVzLmxlbmd0aCAmJiBtZXNoZXNbMF0uc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICBza2VsZXRvbiA9IG1lc2hlc1swXS5za2VsZXRvbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcm9vdE1lc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vdEJvbmUgPSBza2VsZXRvbi5ib25lc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXN1YWxseSBpdCBpcyBjYWxsZWQgXCJSb290XCIsIGJ1dCB0aGVyZSBhcmUgZXhjZXB0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm9vdEJvbmUubmFtZSAhPT0gJ1Jvb3QnKSBjb25zb2xlLndhcm4oJ1RoZSBmaXJzdCBib25lIGhhcyBhIGRpZmZlcmVudCBuYW1lIHRoYW4gXCJSb290XCInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlYWsgc2FuaXR5IGNoZWNrXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNrZWxldG9uLmJvbmVzLmxlbmd0aCAhPSBtZXNoZXNbMF0uc2tlbGV0b24uYm9uZXMubGVuZ3RoKSBjb25zb2xlLndhcm4oJ1NrZWxldG9ucyBoYXZlIGRpZmZlcmVudCBudW1iZXJzIG9mIGJvbmVzIScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZXNoZXNbMF0uc2tlbGV0b24uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWVzaCBvZiBtZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaC5za2VsZXRvbiA9IHNrZWxldG9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmQgdGhlIHJvb3Qgbm9kZSBvZiBza2VsZXRvbi5cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Um9vdFNrZWxldG9uTm9kZSgpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCByb290TWVzaENoaWxkcmVuID0gdGhpcy5fcm9vdE1lc2guZ2V0Q2hpbGRyZW4oKG5vZGU6IE5vZGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGUubmFtZSA9PT0gJ1Jvb3QnIHx8IG5vZGUubmFtZSA9PT0gJ0FybWF0dXJlJztcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocm9vdE1lc2hDaGlsZHJlbi5sZW5ndGggPiAwKSByZXR1cm4gcm9vdE1lc2hDaGlsZHJlblswXTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgaW4gc2NlbmUgZGlyZWN0bHlcclxuICAgICAgICAgICAgY29uc3Qgcm9vdE1lc2hDaGlsZCA9IHRoaXMuc2NlbmUuZ2V0Tm9kZUJ5TmFtZSgnUm9vdCcpID8gdGhpcy5zY2VuZS5nZXROb2RlQnlOYW1lKCdSb290JykgOiB0aGlzLnNjZW5lLmdldE5vZGVCeU5hbWUoJ0FybWF0dXJlJyk7XHJcbiAgICAgICAgICAgIGlmIChyb290TWVzaENoaWxkICYmICFyb290TWVzaENoaWxkLnBhcmVudCkgcmV0dXJuIHJvb3RNZXNoQ2hpbGQ7XHJcbiAgICAgICAgICAgIGVsc2UgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBmaW5kIHJvb3Qgc2tlbGV0b24gbm9kZSEnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvKipcclxuICAgICAqIFNlY29uZGFyeSBBbmltYXRpb24g44KS5pu05paw44GZ44KLXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRlbHRhVGltZSDliY3jg5Xjg6zjg7zjg6DjgYvjgonjga7ntYzpgY7np5LmlbAoc2VjKVxyXG4gICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICogQHBhcmFtIGJvbmVPcHRpb25zXHJcbiAgICAgKi9cclxuICAgIC8vIHB1YmxpYyBhc3luYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIC8vICAgICBhd2FpdCB0aGlzLnNwcmluZ0JvbmVDb250cm9sbGVyLnVwZGF0ZShkZWx0YVRpbWUpO1xyXG4gICAgLy8gfVxyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlciwgYm9uZU9wdGlvbnM/OiBDb25zdHJ1Y3RTcHJpbmdzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc3ByaW5nQm9uZUNvbnRyb2xsZXIudXBkYXRlKGRlbHRhVGltZSwgYm9uZU9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56C05qOE5Yem55CGXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3ByaW5nQm9uZUNvbnRyb2xsZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX2h1bWFub2lkQm9uZS5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIHRoaXMuX3Jvb3RTa2VsZXRvbi5kaXNwb3NlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Jvb3RNZXNoKSB0aGlzLl9yb290TWVzaC5kaXNwb3NlKCk7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgICh0aGlzLm1vcnBoVGFyZ2V0TWFwIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLm1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLnByZXNldE1vcnBoVGFyZ2V0TWFwIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLnRyYW5zZm9ybU5vZGVNYXAgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMudHJhbnNmb3JtTm9kZUNhY2hlIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLm1lc2hDYWNoZSBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5fcm9vdE1lc2ggYXMgYW55KSA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgICh0aGlzLk1vcnBoVGFyZ2V0UHJvcGVydHlNYXAgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMuX2NhbWVyYXMgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMuX3RyYW5zZm9ybU5vZGVUcmVlIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Oi44O844OV44Kj44Oz44Kw44KS6KGM44GGXHJcbiAgICAgKiBAcGFyYW0gbGFiZWwg44Oi44O844OV5ZCNXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YCkKDDjgJwxKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW9ycGhpbmcobGFiZWw6IHN0cmluZywgdmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLmNhbGNNb3JwaFZhbHVlKGxhYmVsLCB2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMubW9ycGhUYXJnZXRNYXBbbGFiZWxdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9ycGhUYXJnZXRNYXBbbGFiZWxdLmZvckVhY2goKHNldHRpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldHRpbmcudGFyZ2V0LmluZmx1ZW5jZSA9IHYgKiAoc2V0dGluZy53ZWlnaHQgLyAxMDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXBbbGFiZWxdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXBbbGFiZWxdLm1vcnBoaW5nKHYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODl+ODquOCu+ODg+ODiOODouODvOODleOBruODouODvOODleOCo+ODs+OCsOOCkuihjOOBhlxyXG4gICAgICogQHBhcmFtIGxhYmVsIOODouODvOODleWQjVxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWApCgw44CcMSlcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vcnBoaW5nUHJlc2V0KGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJlc2V0TW9ycGhUYXJnZXRNYXBbbGFiZWxdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuY2FsY01vcnBoVmFsdWUobGFiZWwsIHZhbHVlKTtcclxuICAgICAgICB0aGlzLnByZXNldE1vcnBoVGFyZ2V0TWFwW2xhYmVsXS5mb3JFYWNoKChzZXR0aW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHRpbmcudGFyZ2V0LmluZmx1ZW5jZSA9IHYgKiAoc2V0dGluZy53ZWlnaHQgLyAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Oi44O844OV44Kj44Oz44Kw55So44Gu5YCk44KS6KiI566X44GZ44KLXHJcbiAgICAgKiBAcGFyYW0gbGFiZWwg44Oi44O844OV5ZCNXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YCkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY01vcnBoVmFsdWUobGFiZWw6IHN0cmluZywgdmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgdiA9IE1hdGgubWF4KDAuMCwgTWF0aC5taW4oMS4wLCB2YWx1ZSkpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzQmluYXJ5TW9ycGhNYXBbbGFiZWxdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2ID4gMC41ID8gMS4wIDogMC4wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGxpc3QgbW9ycGhpbmcgbmFtZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TW9ycGhpbmdMaXN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5tb3JwaFRhcmdldE1hcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIDkurrnp7DmmYLjga7jgqvjg6Hjg6nkvY3nva7jgpLntbblr77luqfmqJnjgajjgZfjgablj5blvpfjgZnjgotcclxuICAgICAqXHJcbiAgICAgKiBmaXJzdFBlcnNvbkJvbmUg44GM5pyq6Kit5a6a44Gu5aC05ZCI44GvIG51bGwg44KS6L+U44GZXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMg5LiA5Lq656ew5pmC44Gu44Kr44Oh44Op44Gu54++5Zyo44Gr44GK44GR44KL57W25a++5bqn5qiZXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRGaXJzdFBlcnNvbkNhbWVyYVBvc2l0aW9uKCk6IE51bGxhYmxlPFZlY3RvcjM+IHtcclxuICAgICAgICBjb25zdCBmaXJzdFBlcnNvbkJvbmUgPSB0aGlzLmdldEZpcnN0UGVyc29uQm9uZSgpO1xyXG4gICAgICAgIGlmICghZmlyc3RQZXJzb25Cb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYmFzZVBvcyA9IGZpcnN0UGVyc29uQm9uZS5nZXRBYnNvbHV0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0UG9zID0gdGhpcy5leHQuZmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0O1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyhiYXNlUG9zLnggKyBvZmZzZXRQb3MueCwgYmFzZVBvcy55ICsgb2Zmc2V0UG9zLnksIGJhc2VQb3MueiArIG9mZnNldFBvcy56KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4gOS6uuensOaZguOBq+mgreOBqOOBv+OBquOBmSBUcmFuc2Zvcm1Ob2RlIOOCkuWPluW+l+OBmeOCi1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Rmlyc3RQZXJzb25Cb25lKCk6IE51bGxhYmxlPFRyYW5zZm9ybU5vZGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kVHJhbnNmb3JtTm9kZSh0aGlzLmV4dC5maXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgLyoqXHJcbiAgICAgKiDjg5zjg7zjg7PlkI3jgYvjgonjgZ3jga7jg5zjg7zjg7PjgavoqbLlvZPjgZnjgosgVHJhbnNmb3JtTm9kZSDjgpLlj5blvpfjgZnjgotcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBIdW1hbkJvbmVOYW1lXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgaHVtYW5vaWRCb25lIGdldHRlciBpbnN0ZWFkLiBUaGlzIG1ldGhvZCB3aWxsIGRlbGV0ZSBhdCB2Mi5cclxuICAgICAqL1xyXG4gICAgLy8gcHVibGljIGdldEJvbmUobmFtZTogSHVtYW5Cb25lTmFtZSk6IE51bGxhYmxlPFRyYW5zZm9ybU5vZGU+IHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Ob2RlTWFwW25hbWVdIHx8IG51bGw7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHVibGljIGdldCByb290U2tlbGV0b25Ob2RlKCk6IE5vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb290U2tlbGV0b247XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgSHVtYW5vaWRCb25lIE1ldGhvZHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBodW1hbm9pZEJvbmUoKTogSHVtYW5vaWRCb25lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHVtYW5vaWRCb25lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVlJNIFJvb3QgbWVzaFxyXG4gICAgICpcclxuICAgICAqIFVzZWZ1bCBmb3IgTW9kZWwgVHJhbnNmb3JtYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByb290TWVzaCgpOiBNZXNoIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdE1lc2g7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub2RlIOeVquWPt+OBi+OCieipsuW9k+OBmeOCiyBUcmFuc2Zvcm1Ob2RlIOOCkuaOouOBmVxyXG4gICAgICog5pWw44GM5aSa44GP44Gq44KL44Gu44Gn44Kt44Oj44OD44K344Ol44Gr5Y+C54Wn44KS5oyB44Gk5qeL6YCg44Gr44GZ44KLXHJcbiAgICAgKiBnbHRmIOOBriBub2RlIOeVquWPt+OBryBgbWV0YWRhdGEuZ2x0Zi5wb2ludGVyc2Ag44Gr6KiY6Yyy44GV44KM44Gm44GE44KLXHJcbiAgICAgKiBAcGFyYW0gbm9kZUluZGV4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kVHJhbnNmb3JtTm9kZShub2RlSW5kZXg6IG51bWJlcik6IE51bGxhYmxlPFRyYW5zZm9ybU5vZGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Ob2RlQ2FjaGVbbm9kZUluZGV4XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXNoIOeVquWPt+OBi+OCieODoeODg+OCt+ODpeOCkuaOouOBmVxyXG4gICAgICogZ2x0ZiDjga4gbWVzaCDnlarlj7fjga8gYG1ldGFkYXRhLmdsdGYucG9pbnRlcnNgIOOBq+iomOmMsuOBleOCjOOBpuOBhOOCi1xyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGZpbmRNZXNoZXMgaW5zdGVhZC4gVGhpcyBtZXRob2QgaGFzIGJyb2tlbi5cclxuICAgICAqL1xyXG4gICAgLy8gcHVibGljIGZpbmRNZXNoKG1lc2hJbmRleDogbnVtYmVyKTogTnVsbGFibGU8TWVzaD4ge1xyXG4gICAgLy8gICAgIHJldHVybiAodGhpcy5tZXNoQ2FjaGVbbWVzaEluZGV4XSAmJiB0aGlzLm1lc2hDYWNoZVttZXNoSW5kZXhdWzBdKSB8fCBudWxsO1xyXG4gICAgLy8gfVxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIGluZGV4IG9mIHMgc3BlY2lmaWMgVHJhbnNmb3JtTm9kZSBmcm9tIGNhY2hlXHJcbiAgICAgKiBAcGFyYW0gbm9kZVxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIGluZGV4T2ZUcmFuc2Zvcm1Ob2RlKG5vZGU6IE51bGxhYmxlPE5vZGU+KTogbnVtYmVyIHtcclxuICAgICAgICBmb3IgKGNvbnN0IFtrLCB2XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLnRyYW5zZm9ybU5vZGVDYWNoZSkpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUgPT0gdikgcmV0dXJuIHBhcnNlSW50KGssIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWVzaCDnlarlj7fjgYvjgonjg6Hjg4Pjgrfjg6XjgpLmjqLjgZlcclxuICAgICAqIGdsdGYg44GuIG1lc2gg55Wq5Y+344GvIGBtZXRhZGF0YS5nbHRmLnBvaW50ZXJzYCDjgavoqJjpjLLjgZXjgozjgabjgYTjgotcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRNZXNoZXMobWVzaEluZGV4OiBudW1iZXIpOiBOdWxsYWJsZTxNZXNoW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZXNoQ2FjaGVbbWVzaEluZGV4XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LqL5YmN44GrIE1vcnBoVGFyZ2V0IOOBqCBpc0JpbmFyeSDjgpLntJDku5jjgZHjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RJc0JpbmFyeU1hcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmV4dC5ibGVuZFNoYXBlTWFzdGVyLmJsZW5kU2hhcGVHcm91cHMuZm9yRWFjaCgoZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzQmluYXJ5TW9ycGhNYXBbZy5uYW1lXSA9IGcuaXNCaW5hcnk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuovliY3jgasgTW9ycGhUYXJnZXQg44GoIEJsZW5kU2hhcGUg44KS57SQ5LuY44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0TW9ycGhUYXJnZXRNYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5leHQuYmxlbmRTaGFwZU1hc3Rlci5ibGVuZFNoYXBlR3JvdXBzLmZvckVhY2goKGcpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFnLmJpbmRzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZy5iaW5kcy5mb3JFYWNoKChiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNoZXMgPSB0aGlzLmZpbmRNZXNoZXMoYi5tZXNoKTtcclxuICAgICAgICAgICAgICAgIGlmICghbWVzaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVuZGVmaW5lZCBCbGVuZFNoYXBlQmluZCBNZXNoYCwgYik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWVzaGVzLmZvckVhY2goKG1lc2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldE1hbmFnZXIgPSBtZXNoLm1vcnBoVGFyZ2V0TWFuYWdlcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1vcnBoVGFyZ2V0TWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVW5kZWZpbmVkIG1vcnBoVGFyZ2V0TWFuYWdlcmAsIGIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IG1vcnBoVGFyZ2V0TWFuYWdlci5nZXRUYXJnZXQoYi5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3JwaFRhcmdldE1hcFtnLm5hbWVdID0gdGhpcy5tb3JwaFRhcmdldE1hcFtnLm5hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9ycGhUYXJnZXRNYXBbZy5uYW1lXS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IGIud2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTW9ycGhUYXJnZXRQcm9wZXJ0eU1hcFtnLm5hbWVdID0gbmV3IG1vcnBoaW5nVGFyZ2V0UHJvcGVydHkoZy5uYW1lLCAwLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZy5wcmVzZXROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlc2V0TW9ycGhUYXJnZXRNYXBbZy5wcmVzZXROYW1lXSA9IHRoaXMucHJlc2V0TW9ycGhUYXJnZXRNYXBbZy5wcmVzZXROYW1lXSB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcFtnLnByZXNldE5hbWVdLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiBiLndlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LqL5YmN44GrIE1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyIOOBqOODouODvOODleWQjeOCkue0kOS7mOOBkeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdE1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwKCkge1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFscyA9IHRoaXMuc2NlbmUubWF0ZXJpYWxzLnNsaWNlKHRoaXMubWF0ZXJpYWxzTm9kZXNGcm9tKTtcclxuICAgICAgICB0aGlzLmV4dC5ibGVuZFNoYXBlTWFzdGVyLmJsZW5kU2hhcGVHcm91cHMuZm9yRWFjaCgoZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWcubWF0ZXJpYWxWYWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwW2cubmFtZV0gPSBuZXcgTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXIobWF0ZXJpYWxzLCBnLm1hdGVyaWFsVmFsdWVzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS6i+WJjeOBqyBUcmFuc2Zvcm1Ob2RlIOOBqCBib25lIOWQjeOCkue0kOOBpeOBkeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdFRyYW5zZm9ybU5vZGVNYXAoKSB7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgY29uc3QgdHJlZVByZUFycjogVHJhbnNmb3JtTm9kZVRyZWVOb2RlW10gPSBbXTtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICB0aGlzLmV4dC5odW1hbm9pZC5odW1hbkJvbmVzLmZvckVhY2goKGIpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZmluZFRyYW5zZm9ybU5vZGUoYi5ub2RlKTtcclxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1Ob2RlTWFwW2IuYm9uZV0gPSBub2RlO1xyXG4gICAgICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAgICAgdHJlZVByZUFyci5wdXNoKHsgaWQ6IGIubm9kZSwgbmFtZTogYi5ib25lLCBwYXJlbnQ6IHRoaXMuaW5kZXhPZlRyYW5zZm9ybU5vZGUobm9kZS5wYXJlbnQpIH0pO1xyXG4gICAgICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICBjb25zdCB0cmVlID0gdGhpcy5oaWVyYXJjaHkodHJlZVByZUFycik7XHJcbiAgICAgICAgaWYgKHRyZWUubGVuZ3RoID09PSAwKSB0aHJvdyBFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBib25lIGhpZXJhcmNoeSB0cmVlIScpO1xyXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybU5vZGVUcmVlID0gdHJlZVswXTtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIH1cclxuXHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIHByaXZhdGUgaGllcmFyY2h5KGRhdGE6IFRyYW5zZm9ybU5vZGVUcmVlTm9kZVtdKSB7XHJcbiAgICAgICAgY29uc3QgdHJlZTogVHJhbnNmb3JtTm9kZVRyZWVOb2RlW10gPSBbXTtcclxuICAgICAgICBjb25zdCBjaGlsZE9mOiBhbnkgPSB7fTtcclxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBpdGVtLmlkO1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBpdGVtLnBhcmVudDtcclxuICAgICAgICAgICAgY2hpbGRPZltpZF0gPSBjaGlsZE9mW2lkXSB8fCBbXTtcclxuICAgICAgICAgICAgaXRlbS5jaGlsZHJlbiA9IGNoaWxkT2ZbaWRdO1xyXG4gICAgICAgICAgICAvLyBBc3N1bWUgSGlwcyBpcyByb290XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT0gbnVsbCAmJiB0aGlzLnRyYW5zZm9ybU5vZGVDYWNoZVtwYXJlbnRdLnBhcmVudCAhPSB0aGlzLl9yb290TWVzaCAmJiBpdGVtLm5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2hpcHMnKSB7XHJcbiAgICAgICAgICAgICAgICAoY2hpbGRPZltwYXJlbnRdID0gY2hpbGRPZltwYXJlbnRdIHx8IFtdKS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJlZS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRyZWU7XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub2RlIOeVquWPt+OBqCBUcmFuc2Zvcm1Ob2RlIOOCkue0kOOBpeOBkeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdFRyYW5zZm9ybU5vZGVDYWNoZSgpIHtcclxuICAgICAgICBjb25zdCBjYWNoZTogVHJhbnNmb3JtTm9kZUNhY2hlID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSB0aGlzLnRyYW5zZm9ybU5vZGVzRnJvbTsgaW5kZXggPCB0aGlzLnNjZW5lLnRyYW5zZm9ybU5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5zY2VuZS50cmFuc2Zvcm1Ob2Rlc1tpbmRleF07XHJcbiAgICAgICAgICAgIC8vIOODneOCpOODs+OCv+OBjOeZu+mMsuOBleOCjOOBpuOBhOOBquOBhOOCguOBruOBr+ecgeeVpVxyXG4gICAgICAgICAgICBpZiAoIW5vZGUgfHwgIW5vZGUubWV0YWRhdGEgfHwgIW5vZGUubWV0YWRhdGEuZ2x0ZiB8fCAhbm9kZS5tZXRhZGF0YS5nbHRmLnBvaW50ZXJzIHx8IG5vZGUubWV0YWRhdGEuZ2x0Zi5wb2ludGVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcG9pbnRlciBvZiBub2RlLm1ldGFkYXRhLmdsdGYucG9pbnRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2ludGVyLnN0YXJ0c1dpdGgoJy9ub2Rlcy8nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5vZGVJbmRleCA9IHBhcnNlSW50KChwb2ludGVyIGFzIHN0cmluZykuc3Vic3RyKDcpLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gcGFyc2VJbnQoKHBvaW50ZXIgYXMgc3RyaW5nKS5zdWJzdHJpbmcoNyksIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgICAgICBjYWNoZVtub2RlSW5kZXhdID0gbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FjaGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXNoIOeVquWPt+OBqCBNZXNoIOOCkue0kOOBpeOBkeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdE1lc2hDYWNoZSgpIHtcclxuICAgICAgICBjb25zdCBjYWNoZTogTWVzaENhY2hlID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSB0aGlzLm1lc2hlc0Zyb207IGluZGV4IDwgdGhpcy5zY2VuZS5tZXNoZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc2ggPSB0aGlzLnNjZW5lLm1lc2hlc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmIChtZXNoLmlkID09PSAnX19yb290X18nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb290TWVzaCA9IG1lc2ggYXMgTWVzaDtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOODneOCpOODs+OCv+OBjOeZu+mMsuOBleOCjOOBpuOBhOOBquOBhOOCguOBruOBr+ecgeeVpVxyXG4gICAgICAgICAgICBpZiAoIW1lc2ggfHwgIW1lc2gubWV0YWRhdGEgfHwgIW1lc2gubWV0YWRhdGEuZ2x0ZiB8fCAhbWVzaC5tZXRhZGF0YS5nbHRmLnBvaW50ZXJzIHx8IG1lc2gubWV0YWRhdGEuZ2x0Zi5wb2ludGVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcG9pbnRlciBvZiBtZXNoLm1ldGFkYXRhLmdsdGYucG9pbnRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gKHBvaW50ZXIgYXMgc3RyaW5nKS5tYXRjaCgvXlxcL21lc2hlc1xcLyhcXGQrKS4rJC8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZVtub2RlSW5kZXhdID0gY2FjaGVbbm9kZUluZGV4XSB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZVtub2RlSW5kZXhdLnB1c2gobWVzaCBhcyBNZXNoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FjaGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB3aGV0aGVyIHNoYWRvdyBhcmUgcmVjZWl2ZWQuXHJcbiAgICAgKiBAcGFyYW0gZW5hYmxlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2hhZG93RW5hYmxlZChlbmFibGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBub2RlSW5kZXggb2YgT2JqZWN0LmtleXModGhpcy5tZXNoQ2FjaGUpLm1hcChOdW1iZXIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc2hlcyA9IHRoaXMubWVzaENhY2hlW25vZGVJbmRleF07XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbWVzaCBvZiBtZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgIG1lc2gucmVjZWl2ZVNoYWRvd3MgPSBlbmFibGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL21hdGVyaWFsJztcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmUnO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmUnO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB0eXBlIHsgTWVzaCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvbWVzaCc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IEdMVEZMb2FkZXIsIElNYXRlcmlhbCB9IGZyb20gJ0BiYWJ5bG9uanMvbG9hZGVycy9nbFRGLzIuMCc7XHJcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWwgfSBmcm9tICdiYWJ5bG9uLW10b29uLW1hdGVyaWFsJztcclxuaW1wb3J0IHR5cGUgeyBJVlJNTWF0ZXJpYWxQcm9wZXJ0eSwgSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHkgfSBmcm9tICcuL3ZybS1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSVZSTU1hdGVyaWFsUHJvcGVydHlTaGFkZXIgfSBmcm9tICcuL3ZybS1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL0VuZ2luZXMvZW5naW5lJztcclxuXHJcbi8qKlxyXG4gKiBWUk0g44Gn5oyH5a6a44GV44KM44KLIE1hdGVyaWFsIOOCkueUn+aIkOOBmeOCi1xyXG4gKiBbVlJNIOOBjOaPkOS+m+OBmeOCi+OCt+OCp+ODvOODgF0oaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9zaGFkZXJzL2luZGV4Lmh0bWwpIOOCkueJueWumuOBl+iqreOBv+i+vOOCgFxyXG4gKiAtIFVubGl0VGV4dHVyZTog5LiN6YCP5piOLCBWUk0g44OV44Kh44Kk44Or5YG044GnIFtLSFJfbWF0ZXJpYWxzX3VubGl0XShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvdHJlZS9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc191bmxpdCkg44GM5a6a576p44GV44KM44Gm44GE44KL44Gf44KB44CB5L2V44KC44GX44Gq44GEXHJcbiAqIC0gVW5saXRDdXRvdXQ6IOmAj+aYjuW6puOBjOmWvuWApOS7peS4i+OBrumDqOWIhuOCkumAj+aYjuOBqOOBmeOCiywg5ZCM5LiKXHJcbiAqIC0gVW5saXRUcmFuc3BhcmVudDog44Ki44Or44OV44Kh44OW44Os44Oz44OJ44CCWldyaXRl44GX44Gq44GELCDlkIzkuIpcclxuICogLSBVbmxpdFRyYW5zcGFyZW50WldyaXRlOiDjgqLjg6vjg5XjgqHjg5bjg6zjg7Pjg4njgIJaV3JpdGXjgZnjgossIOWQjOS4iuOBq+WKoOOBiOOAgeODl+ODreODkeODhuOCo+OBpyBaV3JpdGUg44KS5by35Yi244GX44Gm44GE44G+44GZXHJcbiAqIC0gTVRvb246IE1Ub29uTWF0ZXJpYWwg44KS5beu44GX5pu/44GI44Gm44GE44G+44GZ44CCXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVlJNTWF0ZXJpYWxHZW5lcmF0b3Ige1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsb2FkZXI6IEdMVEZMb2FkZXIpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg57jg4bjg6rjgqLjg6vjgpLnlJ/miJDjgZnjgosgUHJvbWlzZSDjgpLov5TjgZlcclxuICAgICAqIFZSTSDlr77osaHlpJbjga7loLTlkIjjga8gbnVsbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGUoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBtZXNoOiBNZXNoLCBiYWJ5bG9uRHJhd01vZGU6IG51bWJlciwgYXNzaWduOiAoYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCkgPT4gdm9pZCk6IE51bGxhYmxlPFByb21pc2U8TWF0ZXJpYWw+PiB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxQcm9wID0gdGhpcy5maW5kTWF0ZXJpYWxQcm9wZXJ0eUJ5TmFtZShtYXRlcmlhbC5uYW1lLCB0aGlzLmdldE1hdGVyaWFsUHJvcGVydGllcygpKTtcclxuICAgICAgICBpZiAoIW1hdGVyaWFsUHJvcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzaC5hbHBoYUluZGV4ID0gbWF0ZXJpYWxQcm9wLnJlbmRlclF1ZXVlO1xyXG4gICAgICAgIGNvbnN0IG5ld01hdGVyaWFsID0gdGhpcy5jcmVhdGVNYXRlcmlhbEJ5U2hhZGVyKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uRHJhd01vZGUsIG1hdGVyaWFsUHJvcCk7XHJcbiAgICAgICAgaWYgKCFuZXdNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXNzaWduKG5ld01hdGVyaWFsKTtcclxuICAgICAgICBpZiAobmV3TWF0ZXJpYWwgaW5zdGFuY2VvZiBNVG9vbk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRNVG9vblRleHR1cmVzQXN5bmMoY29udGV4dCwgbmV3TWF0ZXJpYWwsIG1hdGVyaWFsUHJvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3TWF0ZXJpYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVlJNIOOBvuOBn+OBryBWQ0kg44GL44KJ44Oe44OG44Oq44Ki44Or44OX44Ot44OR44OG44Kj44Gu6YWN5YiX44KS5o6i44GZXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWF0ZXJpYWxQcm9wZXJ0aWVzKCk6IElWUk1NYXRlcmlhbFByb3BlcnR5W10ge1xyXG4gICAgICAgIGlmICghdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucy5WUk0gJiYgdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zLlZSTS5tYXRlcmlhbFByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucy5WUk0ubWF0ZXJpYWxQcm9wZXJ0aWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zLlZDQVNUX3ZjaV9tYXRlcmlhbF91bml0eSAmJiB0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnMuVkNBU1RfdmNpX21hdGVyaWFsX3VuaXR5Lm1hdGVyaWFscykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zLlZDQVNUX3ZjaV9tYXRlcmlhbF91bml0eS5tYXRlcmlhbHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODnuODhuODquOCouODq+WQjeOBi+OCiSBNYXRlcmlhbFByb3BlcnR5IOOCkuaOouOBmVxyXG4gICAgICogQHBhcmFtIG1hdGVyaWFsTmFtZSDjg57jg4bjg6rjgqLjg6vlkI1cclxuICAgICAqIEBwYXJhbSBleHRlbnNpb24g5ouh5by144OH44O844K/XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE1hdGVyaWFsUHJvcGVydHlCeU5hbWUobWF0ZXJpYWxOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsIG1hdGVyaWFsczogSVZSTU1hdGVyaWFsUHJvcGVydHlbXSk6IE51bGxhYmxlPElWUk1NYXRlcmlhbFByb3BlcnR5PiB7XHJcbiAgICAgICAgaWYgKCFtYXRlcmlhbE5hbWUgfHwgIW1hdGVyaWFscykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbWF0cyA9IG1hdGVyaWFscy5maWx0ZXIoKHYpID0+IHYubmFtZSA9PT0gbWF0ZXJpYWxOYW1lKTtcclxuICAgICAgICBpZiAobWF0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLmxvZyhgRHVwbGljYXRlZCB2cm0gbWF0ZXJpYWwgbmFtZSBmb3VuZDogJHttYXRlcmlhbE5hbWV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXRzW21hdHMubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg4bjgq/jgrnjg4Hjg6PjgpLoqq3jgb/ovrzjgoBcclxuICAgICAqIEBwYXJhbSBjb250ZXh0IOePvuWcqOOBruOCs+ODs+ODhuOCreOCueODiFxyXG4gICAgICogQHBhcmFtIG1hdGVyaWFsIOeUn+aIkOOBl+OBnyBNVG9vbk1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gcHJvcCDnlJ/miJDjgZfjgZ8gTVRvb25NYXRlcmlhbCDjga7jg57jg4bjg6rjgqLjg6vjg5fjg63jg5Hjg4bjgqNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkTVRvb25UZXh0dXJlc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IE1Ub29uTWF0ZXJpYWwsIHByb3A6IElWUk1NYXRlcmlhbFByb3BlcnR5KTogUHJvbWlzZTxNYXRlcmlhbD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzOiBBcnJheTxQcm9taXNlPEJhc2VUZXh0dXJlPj4gPSBbXTtcclxuICAgICAgICAvLyDlhajjgabjga7jg4bjgq/jgrnjg4Hjg6Pjga4gVVYgT2Zmc2V0ICYgU2NhbGUg44Gv44Oh44Kk44Oz44OG44Kv44K544OB44Oj44Gu44KC44Gu44KS5rWB55So44GZ44KLXHJcbiAgICAgICAgY29uc3QgdXZPZmZzZXRTY2FsZSA9IHByb3AudmVjdG9yUHJvcGVydGllcy5fTWFpblRleDtcclxuICAgICAgICBpZiAoIXV2T2Zmc2V0U2NhbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtYXRlcmlhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFwcGx5VGV4dHVyZSA9IChpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkLCBjYWxsYmFjazogKHRleHR1cmU6IEJhc2VUZXh0dXJlKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KGluZGV4LCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIubG9hZFRleHR1cmVJbmZvQXN5bmMoYCR7Y29udGV4dH0vdGV4dHVyZXMvJHtpbmRleH1gLCB7IGluZGV4OiB2YWx1ZSB9LCAoYmFieWxvblRleHR1cmU6IEJhc2VUZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWun+mam+OBryBUZXh0dXJlIOOCpOODs+OCueOCv+ODs+OCueOBjOadpeOCi+OBruOBp+OCreODo+OCueODiFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gYmFieWxvblRleHR1cmUgYXMgVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC51T2Zmc2V0ID0gdXZPZmZzZXRTY2FsZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC52T2Zmc2V0ID0gdXZPZmZzZXRTY2FsZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC51U2NhbGUgPSB1dk9mZnNldFNjYWxlWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LnZTY2FsZSA9IHV2T2Zmc2V0U2NhbGVbM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGJhYnlsb25UZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX01haW5UZXgsICh0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbC5hbHBoYUJsZW5kIHx8IG1hdGVyaWFsLmFscGhhVGVzdCkge1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5oYXNBbHBoYSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9TaGFkZVRleHR1cmUsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwuc2hhZGVUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9CdW1wTWFwLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLmJ1bXBUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9SZWNlaXZlU2hhZG93VGV4dHVyZSwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5yZWNlaXZlU2hhZG93VGV4dHVyZSA9IHRleHR1cmUpKTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fU2hhZGluZ0dyYWRlVGV4dHVyZSwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5zaGFkaW5nR3JhZGVUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9SaW1UZXh0dXJlLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLnJpbVRleHR1cmUgPSB0ZXh0dXJlKSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX1NwaGVyZUFkZCwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5tYXRDYXBUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9FbWlzc2lvbk1hcCwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5lbWlzc2l2ZVRleHR1cmUgPSB0ZXh0dXJlKSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX091dGxpbmVXaWR0aFRleHR1cmUsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwub3V0bGluZVdpZHRoVGV4dHVyZSA9IHRleHR1cmUpKTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fVXZBbmltTWFza1RleHR1cmUsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwudXZBbmltYXRpb25NYXNrVGV4dHVyZSA9IHRleHR1cmUpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IG1hdGVyaWFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOOCt+OCp+ODvOODgOWQjeOBi+OCieODnuODhuODquOCouODq+OCkuaOqOa4rOOBl+OBpueUn+aIkOOBmeOCi1xyXG4gICAgICogQHBhcmFtIGNvbnRleHQg54++5Zyo44Gu44Kz44Oz44OG44Kt44K544OIXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWwgZ2xURiDjg57jg4bjg6rjgqLjg6tcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uRHJhd01vZGUg5o+P55S756iu6aGeXHJcbiAgICAgKiBAcGFyYW0gcHJvcCDnlJ/miJDjgZnjgovjg57jg4bjg6rjgqLjg6vjg5fjg63jg5Hjg4bjgqNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVNYXRlcmlhbEJ5U2hhZGVyKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbkRyYXdNb2RlOiBudW1iZXIsIHByb3A6IElWUk1NYXRlcmlhbFByb3BlcnR5KTogTnVsbGFibGU8TWF0ZXJpYWw+IHtcclxuICAgICAgICBpZiAocHJvcC5zaGFkZXIgPT09IElWUk1NYXRlcmlhbFByb3BlcnR5U2hhZGVyLlZSTU1Ub29uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG10b29uTWF0ZXJpYWwgPSBuZXcgTVRvb25NYXRlcmlhbChtYXRlcmlhbC5uYW1lIHx8IGBNVG9vbk1hdGVyaWFsJHttYXRlcmlhbC5pbmRleH1gLCB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1Ub29uTWF0ZXJpYWxQcm9wZXJ0aWVzKG10b29uTWF0ZXJpYWwsIHByb3ApO1xyXG4gICAgICAgICAgICByZXR1cm4gbXRvb25NYXRlcmlhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByb3Auc2hhZGVyID09PSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVNoYWRlci5WUk1VbmxpdFRyYW5zcGFyZW50WldyaXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdCA9IHRoaXMubG9hZGVyLmNyZWF0ZU1hdGVyaWFsKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uRHJhd01vZGUpO1xyXG4gICAgICAgICAgICAvLyDpgJrluLjjg57jg4bjg6rjgqLjg6vjgasgRGVwdGggV3JpdGUg44KS5by35Yi2XHJcbiAgICAgICAgICAgIG1hdC5kaXNhYmxlRGVwdGhXcml0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBtYXQuZm9yY2VEZXB0aFdyaXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg57jg4bjg6rjgqLjg6vjgasgVlJNIOODl+ODreODkeODhuOCo+OCkuioreWumlxyXG4gICAgICogVlJNIOODl+ODreODkeODhuOCo+OBqOODnuODhuODquOCouODq+ODl+ODreODkeODhuOCo+OBruODnuODg+ODlOODs+OCsOOCkuihjOOBo+OBpuOBhOOCi1xyXG4gICAgICog5Yid5pyf5YCk44Gv44Oe44OG44Oq44Ki44Or5a6f6KOF5YG044Gr5oyB44Gj44Gm44GE44KL44Gf44KB44CB5YCk44GM44GC44KL5aC05ZCI44Gu44G/5LiK5pu444GN44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TVRvb25NYXRlcmlhbFByb3BlcnRpZXMobWF0ZXJpYWw6IE1Ub29uTWF0ZXJpYWwsIHByb3A6IElWUk1NYXRlcmlhbFByb3BlcnR5KSB7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX0N1dG9mZiwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuYWxwaGFDdXRPZmYgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eT4ocHJvcC52ZWN0b3JQcm9wZXJ0aWVzLl9Db2xvciwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyBDb2xvcjModmFsdWVbMF0sIHZhbHVlWzFdLCB2YWx1ZVsyXSk7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhID0gdmFsdWVbM107XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5Pihwcm9wLnZlY3RvclByb3BlcnRpZXMuX1NoYWRlQ29sb3IsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5zaGFkZUNvbG9yID0gbmV3IENvbG9yMyh2YWx1ZVswXSwgdmFsdWVbMV0sIHZhbHVlWzJdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fQnVtcFNjYWxlLCAodmFsdWUpID0+IChtYXRlcmlhbC5idW1wU2NhbGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9SZWNlaXZlU2hhZG93UmF0ZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwucmVjZWl2ZVNoYWRvd1JhdGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9TaGFkaW5nR3JhZGVSYXRlLCAodmFsdWUpID0+IChtYXRlcmlhbC5zaGFkaW5nR3JhZGVSYXRlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fU2hhZGVTaGlmdCwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuc2hhZGVTaGlmdCA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1NoYWRlVG9vbnksICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnNoYWRlVG9vbnkgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9MaWdodENvbG9yQXR0ZW51YXRpb24sICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbiA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX0luZGlyZWN0TGlnaHRJbnRlbnNpdHksICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmluZGlyZWN0TGlnaHRJbnRlbnNpdHkgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eT4ocHJvcC52ZWN0b3JQcm9wZXJ0aWVzLl9SaW1Db2xvciwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLnJpbUNvbG9yID0gbmV3IENvbG9yMyh2YWx1ZVswXSwgdmFsdWVbMV0sIHZhbHVlWzJdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fUmltTGlnaHRpbmdNaXgsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnJpbUxpZ2h0aW5nTWl4ID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fUmltRnJlc25lbFBvd2VyLCAodmFsdWUpID0+IChtYXRlcmlhbC5yaW1GcmVzbmVsUG93ZXIgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9SaW1MaWZ0LCAodmFsdWUpID0+IChtYXRlcmlhbC5yaW1MaWZ0ID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8SVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk+KHByb3AudmVjdG9yUHJvcGVydGllcy5fRW1pc3Npb25Db2xvciwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmVtaXNzaXZlQ29sb3IgPSBuZXcgQ29sb3IzKHZhbHVlWzBdLCB2YWx1ZVsxXSwgdmFsdWVbMl0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9PdXRsaW5lV2lkdGgsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLm91dGxpbmVXaWR0aCA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX091dGxpbmVTY2FsZWRNYXhEaXN0YW5jZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwub3V0bGluZVNjYWxlZE1heERpc3RhbmNlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8SVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk+KHByb3AudmVjdG9yUHJvcGVydGllcy5fT3V0bGluZUNvbG9yLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwub3V0bGluZUNvbG9yID0gbmV3IENvbG9yMyh2YWx1ZVswXSwgdmFsdWVbMV0sIHZhbHVlWzJdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fT3V0bGluZUxpZ2h0aW5nTWl4LCAodmFsdWUpID0+IChtYXRlcmlhbC5vdXRsaW5lTGlnaHRpbmdNaXggPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9VdkFuaW1TY3JvbGxYLCAodmFsdWUpID0+IChtYXRlcmlhbC51dkFuaW1hdGlvblNjcm9sbFggPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9VdkFuaW1TY3JvbGxZLCAodmFsdWUpID0+IChtYXRlcmlhbC51dkFuaW1hdGlvblNjcm9sbFkgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9VdkFuaW1Sb3RhdGlvbiwgKHZhbHVlKSA9PiAobWF0ZXJpYWwudXZBbmltYXRpb25Sb3RhdGlvbiA9IHZhbHVlKSk7XHJcblxyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9EZWJ1Z01vZGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmRlYnVnTW9kZSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX0JsZW5kTW9kZSwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogLy8gT3BhcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGFCbGVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhVGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOiAvLyBUcmFuc3BhcmVudEN1dG91dFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhQmxlbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYVRlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhTW9kZSA9IEVuZ2luZS5BTFBIQV9DT01CSU5FO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiAvLyBUcmFuc3BhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhQmxlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhVGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhTW9kZSA9IEVuZ2luZS5BTFBIQV9DT01CSU5FO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX091dGxpbmVXaWR0aE1vZGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLm91dGxpbmVXaWR0aE1vZGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9PdXRsaW5lQ29sb3JNb2RlLCAodmFsdWUpID0+IChtYXRlcmlhbC5vdXRsaW5lQ29sb3JNb2RlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fQ3VsbE1vZGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmN1bGxNb2RlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fT3V0bGluZUN1bGxNb2RlLCAodmFsdWUpID0+IChtYXRlcmlhbC5vdXRsaW5lQ3VsbE1vZGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxib29sZWFuPihwcm9wLmtleXdvcmRNYXAuX0FMUEhBQkxFTkRfT04sICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmFscGhhQmxlbmQgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxib29sZWFuPihwcm9wLmtleXdvcmRNYXAuX0FMUEhBVEVTVF9PTiwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuYWxwaGFUZXN0ID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fWldyaXRlLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZm9yY2VEZXB0aFdyaXRlID0gTWF0aC5yb3VuZCh2YWx1ZSkgPT09IDE7XHJcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbC5mb3JjZURlcHRoV3JpdGUpIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmRpc2FibGVEZXB0aFdyaXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOODl+ODreODkeODhuOCo+OBjOioreWumuOBleOCjOOBpuOBhOOCjOOBsOOCs+ODvOODq+ODkOODg+OCr+OCkuWun+ihjOOBmeOCi1xyXG4gKi9cclxuZnVuY3Rpb24gYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPFQ+KHByb3A6IFQgfCB1bmRlZmluZWQsIGNhbGxiYWNrOiAodmFsdWU6IFQpID0+IHZvaWQpIHtcclxuICAgIGlmICh0eXBlb2YgcHJvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjYWxsYmFjayhwcm9wKTtcclxufVxyXG4iLCJpbXBvcnQgeyBBcmNSb3RhdGVDYW1lcmEgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0NhbWVyYXMvYXJjUm90YXRlQ2FtZXJhXCI7XG5pbXBvcnQgeyBDb2xvcjMsIFZlY3RvcjMgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGhcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvRW5naW5lcy9lbmdpbmVcIjtcbmltcG9ydCB7IERpcmVjdGlvbmFsTGlnaHQgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xpZ2h0cy9kaXJlY3Rpb25hbExpZ2h0XCI7XG5pbXBvcnQgeyBIZW1pc3BoZXJpY0xpZ2h0IH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9MaWdodHMvaGVtaXNwaGVyaWNMaWdodFwiO1xuaW1wb3J0IHsgUG9pbnRMaWdodCB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTGlnaHRzL3BvaW50TGlnaHRcIjtcbmltcG9ydCB7IFNoYWRvd0dlbmVyYXRvciB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTGlnaHRzL1NoYWRvd3Mvc2hhZG93R2VuZXJhdG9yXCI7XG5pbXBvcnQgeyBTY2VuZUxvYWRlciB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xuaW1wb3J0IHsgTWVzaCB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTWVzaGVzL21lc2hcIjtcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9zY2VuZVwiO1xuaW1wb3J0IHR5cGUgeyBWUk1NYW5hZ2VyIH0gZnJvbSBcIi4uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3ZybS1tYW5hZ2VyXCI7XG5cbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiQGJhYnlsb25qcy9sb2FkZXJzL2dsVEYvMi4wXCI7XG5cbmltcG9ydCBcIkBiYWJ5bG9uanMvY29yZS9IZWxwZXJzL3NjZW5lSGVscGVyc1wiO1xuaW1wb3J0IFwiQGJhYnlsb25qcy9jb3JlL01lc2hlcy9CdWlsZGVycy9zcGhlcmVCdWlsZGVyXCI7XG5pbXBvcnQgXCJAYmFieWxvbmpzL2NvcmUvTWVzaGVzL0J1aWxkZXJzL3RvcnVzS25vdEJ1aWxkZXJcIjtcbmltcG9ydCBcIkBiYWJ5bG9uanMvaW5zcGVjdG9yXCI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXNcbmltcG9ydCAqIGFzIEJWTCBmcm9tIFwiLi9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL2luZGV4XCI7XG5cbmltcG9ydCB7IFYzRENvcmUgfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHtcbiAgVlJNRmlsZUxvYWRlcixcbiAgVlJNTG9hZGVyRXh0ZW5zaW9uLFxufSBmcm9tIFwiLi9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjXCI7XG5cbi8vIHdpbmRvdy5vbmxvYWQgPSBhc3luYyAoZSkgPT4ge1xuYXN5bmMgZnVuY3Rpb24gbWFpbjIoKSB7XG4gIC8vKiBEZWZpbmUgdnJtIGZpbGUgcGF0aC5cbiAgY29uc3QgdnJtRmlsZSA9IFwiLi90ZXN0ZmlsZXMvZGVmYXVsdC52cm1cIjtcblxuICAvLyogQ3JlYXRlIGFuIEVuZ2luZSBpbnN0YW5jZS5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgY29uc3QgZGVidWdQcm9wZXJ0aWVzID0gZ2V0RGVidWdQcm9wZXJ0aWVzKCk7XG4gIGNvbnNvbGUubG9nKFwiZGVidWdQcm9wZXJ0aWVzLndlYmdsMTogXCIsIGRlYnVnUHJvcGVydGllcy53ZWJnbDEpO1xuICBjb25zdCBlbmdpbmUgPSBuZXcgRW5naW5lKGNhbnZhcywgdHJ1ZSwge1xuICAgIGFscGhhOiBmYWxzZSxcbiAgICBkaXNhYmxlV2ViR0wyU3VwcG9ydDogZGVidWdQcm9wZXJ0aWVzLndlYmdsMSxcbiAgfSk7XG4gIGNvbnN0IHNjZW5lID0gbmV3IFNjZW5lKGVuZ2luZSk7XG4gIGNvbnN0IGNhbWVyYSA9IG5ldyBBcmNSb3RhdGVDYW1lcmEoXG4gICAgXCJNYWluQ2FtZXJhMVwiLFxuICAgIDAsXG4gICAgMCxcbiAgICAzLFxuICAgIG5ldyBWZWN0b3IzKDAsIDEuMiwgMCksXG4gICAgc2NlbmUsXG4gICAgdHJ1ZVxuICApO1xuICBjYW1lcmEubG93ZXJSYWRpdXNMaW1pdCA9IDAuMTtcbiAgY2FtZXJhLnVwcGVyUmFkaXVzTGltaXQgPSAyMDtcbiAgY2FtZXJhLndoZWVsRGVsdGFQZXJjZW50YWdlID0gMC4wMTtcbiAgY2FtZXJhLm1pblogPSAwLjM7XG4gIGNhbWVyYS5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDEuMiwgLTMpO1xuICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xuXG4gIC8vKiBDcmVhdGUgYSBWM0RDb3JlIGluc3RhbmNlLlxuICBjb25zdCB2M0RDb3JlID0gbmV3IFYzRENvcmUoZW5naW5lLCBzY2VuZSwgY2FtZXJhKTtcbiAgdjNEQ29yZS50cmFuc3BhcmVudEJhY2tncm91bmQoKTtcbiAgYXdhaXQgdjNEQ29yZS5BcHBlbmRBc3luYyhcIlwiLCB2cm1GaWxlKTtcblxuICAvLyBHZXQgbWFuYWdlcnNcbiAgLy8gY29uc3QgdnJtTWFuYWdlciA9IHYzRENvcmUuZ2V0VlJNTWFuYWdlckJ5VVJJKHZybUZpbGUpO1xuICAvLyBjb25zb2xlLmxvZyhcInZybU1hbmFnZXI6IFwiLCB2cm1NYW5hZ2VyKTtcblxuICAvLyBDYW1lcmFcbiAgLy8gdjNEQ29yZS5hdHRhY2hDYW1lcmFUbyh2cm1NYW5hZ2VyKTtcblxuICAvLyBMaWdodHNcbiAgdjNEQ29yZS5hZGRBbWJpZW50TGlnaHQobmV3IENvbG9yMygxLCAxLCAxKSk7XG5cbiAgLy8gTG9jayBjYW1lcmEgdGFyZ2V0XG4gIC8vIHYzRENvcmUuc2NlbmUub25CZWZvcmVSZW5kZXJPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XG4gIC8vICAgdnJtTWFuYWdlci5jYW1lcmFzWzBdLnNldFRhcmdldCh2cm1NYW5hZ2VyLnJvb3RNZXNoLmdldEFic29sdXRlUG9zaXRpb24oKSk7XG4gIC8vIH0pO1xuXG4gIGVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHtcbiAgICB2M0RDb3JlLnNjZW5lLnJlbmRlcigpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbjEoKSB7XG4gIGlmIChTY2VuZUxvYWRlcikge1xuICAgIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKG5ldyBCVkwuVlJNRmlsZUxvYWRlcigpKTtcbiAgfVxuICAvLyBHTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKFwiVlJNXCIsIChsb2FkZXIpID0+IHtcbiAgLy8gICBjb25zb2xlLmxvZyhcImxvYWRlcjogXCIsIGxvYWRlcik7XG4gIC8vICAgY29uc29sZS5sb2coXCJsb2FkZXIuYmFieWxvblNjZW5lOiBcIiwgbG9hZGVyLmJhYnlsb25TY2VuZSk7XG4gIC8vICAgcmV0dXJuIG5ldyBWUk0obG9hZGVyKTtcbiAgLy8gfSk7XG5cbiAgY29uc3QgZGVidWdQcm9wZXJ0aWVzID0gZ2V0RGVidWdQcm9wZXJ0aWVzKCk7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGNvbnN0IGVuZ2luZSA9IG5ldyBFbmdpbmUoY2FudmFzLCB0cnVlLCB7XG4gICAgYWxwaGE6IGZhbHNlLFxuICAgIGRpc2FibGVXZWJHTDJTdXBwb3J0OiBkZWJ1Z1Byb3BlcnRpZXMud2ViZ2wxLFxuICB9KTtcbiAgY29uc3Qgc2NlbmUgPSBuZXcgU2NlbmUoZW5naW5lKTtcbiAgY29uc3QgY2FtZXJhID0gbmV3IEFyY1JvdGF0ZUNhbWVyYShcbiAgICBcIk1haW5DYW1lcmExXCIsXG4gICAgMCxcbiAgICAwLFxuICAgIDMsXG4gICAgbmV3IFZlY3RvcjMoMCwgMS4yLCAwKSxcbiAgICBzY2VuZSxcbiAgICB0cnVlXG4gICk7XG4gIGNhbWVyYS5sb3dlclJhZGl1c0xpbWl0ID0gMC4xO1xuICBjYW1lcmEudXBwZXJSYWRpdXNMaW1pdCA9IDIwO1xuICBjYW1lcmEud2hlZWxEZWx0YVBlcmNlbnRhZ2UgPSAwLjAxO1xuICBjYW1lcmEubWluWiA9IDAuMztcbiAgY2FtZXJhLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMS4yLCAtMyk7XG4gIGNhbWVyYS5hdHRhY2hDb250cm9sKGNhbnZhcywgdHJ1ZSk7XG4gIGNvbnNvbGUubG9nKFwiY2FtZXJhOiBcIiwgY2FtZXJhKTtcblxuICBjb25zdCBkaXJlY3Rpb25hbExpZ2h0ID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoXG4gICAgXCJEaXJlY3Rpb25hbExpZ2h0MVwiLFxuICAgIG5ldyBWZWN0b3IzKDAsIC0wLjUsIDEuMCksXG4gICAgc2NlbmVcbiAgKTtcbiAgZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDI1LCAtNTApO1xuICBkaXJlY3Rpb25hbExpZ2h0LnNldEVuYWJsZWQodHJ1ZSk7XG5cbiAgKHdpbmRvdyBhcyBhbnkpLmN1cnJlbnRTY2VuZSA9IHNjZW5lO1xuICBlbmdpbmUucnVuUmVuZGVyTG9vcCgoKSA9PiB7XG4gICAgc2NlbmUucmVuZGVyKCk7XG4gIH0pO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFNjZW5lTG9hZGVyLkFwcGVuZEFzeW5jKFxuICAgIFwiXCIsXG4gICAgXCIuL3Rlc3RmaWxlcy9kZWZhdWx0LnZybVwiLFxuICAgIHNjZW5lXG4gICk7XG4gIC8vIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgU2NlbmVMb2FkZXIuTG9hZEFzeW5jKFxuICAvLyAgIFwiZmlsZTpcIixcbiAgLy8gICBcIi4vdGVzdGZpbGVzL2RlZmF1bHQudnJtXCIsXG4gIC8vICAgZW5naW5lXG4gIC8vICk7XG4gIGNvbnNvbGUubG9nKFwicmVzcG9uc2U6IFwiLCByZXNwb25zZSk7XG4gIGNvbnNvbGUubG9nKFwicmVzcG9uc2UubWV0YWRhdGE6IFwiLCByZXNwb25zZS5tZXRhZGF0YSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIGlmIChTY2VuZUxvYWRlcikge1xuICAgIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKG5ldyBCVkwuVlJNRmlsZUxvYWRlcigpKTtcbiAgfVxuICAvLyBHTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKFwiVlJNXCIsIChsb2FkZXIpID0+IHtcbiAgLy8gICBjb25zb2xlLmxvZyhcImxvYWRlcjogXCIsIGxvYWRlcik7XG4gIC8vICAgcmV0dXJuIG5ldyBCVkwuVlJNTG9hZGVyRXh0ZW5zaW9uKGxvYWRlcik7XG4gIC8vIH0pO1xuXG4gIGNvbnN0IGRlYnVnUHJvcGVydGllcyA9IGdldERlYnVnUHJvcGVydGllcygpO1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBjb25zb2xlLmxvZyhcImRlYnVnUHJvcGVydGllcy53ZWJnbDE6IFwiLCBkZWJ1Z1Byb3BlcnRpZXMud2ViZ2wxKTtcbiAgY29uc3QgZW5naW5lID0gbmV3IEVuZ2luZShjYW52YXMsIHRydWUsIHtcbiAgICBhbHBoYTogZmFsc2UsXG4gICAgZGlzYWJsZVdlYkdMMlN1cHBvcnQ6IGRlYnVnUHJvcGVydGllcy53ZWJnbDEsXG4gIH0pO1xuICBjb25zb2xlLmxvZyhcImVuZ2luZTogXCIsIGVuZ2luZSk7XG4gIGNvbnN0IHNjZW5lID0gbmV3IFNjZW5lKGVuZ2luZSk7XG4gIGNvbnNvbGUubG9nKFwic2NlbmU6IFwiLCBzY2VuZSk7XG4gIGNvbnN0IGNhbWVyYSA9IG5ldyBBcmNSb3RhdGVDYW1lcmEoXG4gICAgXCJNYWluQ2FtZXJhMVwiLFxuICAgIDAsXG4gICAgMCxcbiAgICAzLFxuICAgIG5ldyBWZWN0b3IzKDAsIDEuMiwgMCksXG4gICAgc2NlbmUsXG4gICAgdHJ1ZVxuICApO1xuICBjYW1lcmEubG93ZXJSYWRpdXNMaW1pdCA9IDAuMTtcbiAgY2FtZXJhLnVwcGVyUmFkaXVzTGltaXQgPSAyMDtcbiAgY2FtZXJhLndoZWVsRGVsdGFQZXJjZW50YWdlID0gMC4wMTtcbiAgY2FtZXJhLm1pblogPSAwLjM7XG4gIGNhbWVyYS5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDEuMiwgLTMpO1xuICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xuICBjb25zb2xlLmxvZyhcImNhbWVyYTogXCIsIGNhbWVyYSk7XG5cbiAgc2NlbmUuY3JlYXRlRGVmYXVsdEVudmlyb25tZW50KHtcbiAgICBjcmVhdGVHcm91bmQ6IHRydWUsXG4gICAgY3JlYXRlU2t5Ym94OiBmYWxzZSxcbiAgICBlbmFibGVHcm91bmRNaXJyb3I6IGZhbHNlLFxuICAgIGVuYWJsZUdyb3VuZFNoYWRvdzogZmFsc2UsXG4gIH0pO1xuXG4gIC8vIExpZ2h0c1xuICBjb25zdCBkaXJlY3Rpb25hbExpZ2h0ID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoXG4gICAgXCJEaXJlY3Rpb25hbExpZ2h0MVwiLFxuICAgIG5ldyBWZWN0b3IzKDAsIC0wLjUsIDEuMCksXG4gICAgc2NlbmVcbiAgKTtcbiAgZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDI1LCAtNTApO1xuICBkaXJlY3Rpb25hbExpZ2h0LnNldEVuYWJsZWQodHJ1ZSk7XG4gIGNvbnN0IGhlbWlzcGhlcmljTGlnaHQgPSBuZXcgSGVtaXNwaGVyaWNMaWdodChcbiAgICBcIkhlbWlzcGhlcmljTGlnaHQxXCIsXG4gICAgbmV3IFZlY3RvcjMoLTAuMiwgLTAuOCwgLTEpLFxuICAgIHNjZW5lXG4gICk7XG4gIGhlbWlzcGhlcmljTGlnaHQuc2V0RW5hYmxlZChmYWxzZSk7XG4gIGNvbnN0IHBvaW50TGlnaHQgPSBuZXcgUG9pbnRMaWdodChcIlBvaW50TGlnaHQxXCIsIG5ldyBWZWN0b3IzKDAsIDAsIDEpLCBzY2VuZSk7XG4gIHBvaW50TGlnaHQuc2V0RW5hYmxlZChmYWxzZSk7XG5cbiAgLy8gTWVzaGVzXG4gIGNvbnN0IHN0YW5kYXJkTWF0ZXJpYWxTcGhlcmUgPSBNZXNoLkNyZWF0ZVNwaGVyZShcbiAgICBcIlN0YW5kYXJkTWF0ZXJpYWxTcGhlcmUxXCIsXG4gICAgMTYsXG4gICAgMSxcbiAgICBzY2VuZVxuICApO1xuICBzdGFuZGFyZE1hdGVyaWFsU3BoZXJlLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMS41LCAxLjIsIDApO1xuICBzdGFuZGFyZE1hdGVyaWFsU3BoZXJlLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcblxuICBjb25zdCBzaGFkb3dDYXN0ZXIgPSBNZXNoLkNyZWF0ZVRvcnVzS25vdChcbiAgICBcIlNoYWRvd0Nhc3RlclwiLFxuICAgIDEsXG4gICAgMC4yLFxuICAgIDMyLFxuICAgIDMyLFxuICAgIDIsXG4gICAgMyxcbiAgICBzY2VuZVxuICApO1xuICBzaGFkb3dDYXN0ZXIucG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLjAsIDUuMCwgLTEwLjApO1xuICBzaGFkb3dDYXN0ZXIuc2V0RW5hYmxlZChkZWJ1Z1Byb3BlcnRpZXMuc2hhZG93KTtcbiAgaWYgKGRlYnVnUHJvcGVydGllcy5zaGFkb3cpIHtcbiAgICBjb25zdCBzaGFkb3dHZW5lcmF0b3IgPSBuZXcgU2hhZG93R2VuZXJhdG9yKDEwMjQsIGRpcmVjdGlvbmFsTGlnaHQpO1xuICAgIHNoYWRvd0dlbmVyYXRvci5hZGRTaGFkb3dDYXN0ZXIoc2hhZG93Q2FzdGVyKTtcbiAgfVxuXG4gIGlmIChkZWJ1Z1Byb3BlcnRpZXMuaW5zcGVjdG9yKSB7XG4gICAgYXdhaXQgc2NlbmUuZGVidWdMYXllci5zaG93KHtcbiAgICAgIGdsb2JhbFJvb3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid3JhcHBlclwiKSBhcyBIVE1MRWxlbWVudCxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEV4cG9zZSBjdXJyZW50IHNjZW5lXG4gICh3aW5kb3cgYXMgYW55KS5jdXJyZW50U2NlbmUgPSBzY2VuZTtcblxuICBzY2VuZS5vbkJlZm9yZVJlbmRlck9ic2VydmFibGUuYWRkKCgpID0+IHtcbiAgICAvLyBTcHJpbmdCb25lXG4gICAgaWYgKCFzY2VuZS5tZXRhZGF0YSB8fCAhc2NlbmUubWV0YWRhdGEudnJtTWFuYWdlcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbWFuYWdlcnMgPSBzY2VuZS5tZXRhZGF0YS52cm1NYW5hZ2VycyBhcyBWUk1NYW5hZ2VyW107XG4gICAgY29uc3QgZGVsdGFUaW1lID0gc2NlbmUuZ2V0RW5naW5lKCkuZ2V0RGVsdGFUaW1lKCk7XG4gICAgbWFuYWdlcnMuZm9yRWFjaCgobWFuYWdlcikgPT4ge1xuICAgICAgbWFuYWdlci51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICB9KTtcbiAgfSk7XG4gIGVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHtcbiAgICBzY2VuZS5yZW5kZXIoKTtcbiAgICBzaGFkb3dDYXN0ZXIucm90YXRlKFZlY3RvcjMuVXAoKSwgMC4wMSk7XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgZW5naW5lLnJlc2l6ZSgpO1xuICB9KTtcbiAgY29uc29sZS5sb2coXCJ0cnkgdG8gY2FsbCBTY2VuZUxvYWRlci5BcHBlbmRBc3luYygpXCIpO1xuICBjb25zb2xlLmxvZyhcIlNjZW5lTG9hZGVyOiBcIiwgU2NlbmVMb2FkZXIpO1xuICAvLyBhd2FpdCBTY2VuZUxvYWRlci5BcHBlbmRBc3luYyhcIi4vXCIsIFwiQWxpY2lhU29saWQudnJtXCIsIHNjZW5lKTtcbiAgLy8gYXdhaXQgU2NlbmVMb2FkZXIuQXBwZW5kQXN5bmMoXCIuL1wiLCBcIjc4MjI0NDQzMzY0OTcwMDQ1MjYudnJtXCIsIHNjZW5lKTtcbiAgYXdhaXQgU2NlbmVMb2FkZXIuQXBwZW5kQXN5bmMoXCIuL1wiLCBcImRlZmF1bHQudnJtXCIsIHNjZW5lKTtcblxuICBjb25zb2xlLmxvZyhcInRyeSB0byBjYWxsIGFkZEV2ZW50TGlzdGVuZXIoKVwiKTtcbiAgbGV0IGZpbGVDb3VudCA9IDE7XG4gIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGUtaW5wdXRcIikgYXMgSFRNTElucHV0RWxlbWVudCkuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNoYW5nZVwiLFxuICAgIChldnQpID0+IHtcbiAgICAgIGNvbnN0IGZpbGUgPSAoZXZ0IGFzIGFueSkudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgY29uc29sZS5sb2coYGxvYWRzICR7ZmlsZS5uYW1lfSAke2ZpbGUuc2l6ZX0gYnl0ZXNgKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNoQ291bnQgPSBzY2VuZS5tZXNoZXMubGVuZ3RoO1xuICAgICAgU2NlbmVMb2FkZXIuQXBwZW5kKFwiZmlsZTpcIiwgZmlsZSwgc2NlbmUsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYGxvYWRlZCAke2ZpbGUubmFtZX1gKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGN1cnJlbnRNZXNoQ291bnQ7IGkgPCBzY2VuZS5tZXNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBzY2VuZS5tZXNoZXNbaV0udHJhbnNsYXRlKFZlY3RvcjMuUmlnaHQoKSwgMS41ICogZmlsZUNvdW50KTtcbiAgICAgICAgICBzY2VuZS5tZXNoZXNbaV0ucmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGZpbGVDb3VudCsrO1xuICAgICAgfSk7XG4gICAgfVxuICApO1xufVxuXG5pbnRlcmZhY2UgRGVidWdQcm9wZXJ0aWVzIHtcbiAgd2ViZ2wxOiBib29sZWFuO1xuICBzaGFkb3c6IGJvb2xlYW47XG4gIGluc3BlY3RvcjogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZ2V0RGVidWdQcm9wZXJ0aWVzKCk6IERlYnVnUHJvcGVydGllcyB7XG4gIGNvbnN0IGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICByZXR1cm4ge1xuICAgIHdlYmdsMTogaHJlZi5pbmNsdWRlcyhcIndlYmdsMVwiKSxcbiAgICBzaGFkb3c6IGhyZWYuaW5jbHVkZXMoXCJzaGFkb3dcIiksXG4gICAgaW5zcGVjdG9yOiBocmVmLmluY2x1ZGVzKFwiaW5zcGVjdG9yXCIpLFxuICB9O1xufVxuXG5tYWluMigpLmNhdGNoKChyZWFzb24pID0+IHtcbiAgY29uc29sZS5lcnJvcihyZWFzb24pO1xufSk7XG4iLCIvKiogQ29weXJpZ2h0IChjKSAyMDIxIFRoZSB2M2QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMgZmlsZSxcbiAqIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKi9cblxuZXhwb3J0ICogZnJvbSBcIi4vdjNkLWNvcmVcIlxuZXhwb3J0ICogZnJvbSBcIi4vaGVscGVyXCJcbiIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5pbXBvcnQge0hhcmR3YXJlU2NhbGluZ09wdGltaXphdGlvbixcbiAgICBMZW5zRmxhcmVzT3B0aW1pemF0aW9uLFxuICAgIE51bGxhYmxlLFxuICAgIFBhcnRpY2xlc09wdGltaXphdGlvbixcbiAgICBQb3N0UHJvY2Vzc2VzT3B0aW1pemF0aW9uLFxuICAgIFJlbmRlclRhcmdldHNPcHRpbWl6YXRpb24sIFNjZW5lLCBTY2VuZU9wdGltaXplciwgU2NlbmVPcHRpbWl6ZXJPcHRpb25zLCBUZXh0dXJlT3B0aW1pemF0aW9uIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZVwiO1xuaW1wb3J0IHtWM0RDb3JlfSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIFYzRFNjZW5lT3B0aW1pemVyIHtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbWl6ZWQgc2NlbmUgb3B0aW1pemVyIG9wdGlvbnMuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9vcHRpb25zOiBTY2VuZU9wdGltaXplck9wdGlvbnM7XG4gICAgZ2V0IG9wdGlvbnMoKTogU2NlbmVPcHRpbWl6ZXJPcHRpb25ze1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9XG4gICAgc2V0IG9wdGlvbnModmFsdWU6IFNjZW5lT3B0aW1pemVyT3B0aW9ucykge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2NlbmVPcHRpbWl6ZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX29wdGltaXplcjogU2NlbmVPcHRpbWl6ZXI7XG4gICAgZ2V0IG9wdGltaXplcigpOiBTY2VuZU9wdGltaXplciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpbWl6ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHNjZW5lOiBTY2VuZSxcbiAgICAgICAgb3B0aW9ucz86IE51bGxhYmxlPFNjZW5lT3B0aW1pemVyT3B0aW9ucz4sXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IFYzRFNjZW5lT3B0aW1pemVyLkN1c3RvbU9wdGltaXplck9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5fb3B0aW1pemVyID0gbmV3IFNjZW5lT3B0aW1pemVyKHNjZW5lLCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgdGhpcy5fb3B0aW1pemVyLnRhcmdldEZyYW1lUmF0ZSA9IFYzRENvcmUuRlJBTUVSQVRFO1xuICAgICAgICB0aGlzLl9vcHRpbWl6ZXIudHJhY2tlckR1cmF0aW9uID0gMjAwMDtcblxuICAgICAgICB0aGlzLl9vcHRpbWl6ZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5zZXR1cEZvY3VzRXZlbnRzKHRoaXMuX29wdGltaXplcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgQ3VzdG9tT3B0aW1pemVyT3B0aW9ucygpOiBTY2VuZU9wdGltaXplck9wdGlvbnMge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gbmV3IFNjZW5lT3B0aW1pemVyT3B0aW9ucygpO1xuICAgICAgICBvcHRpb25zLmFkZE9wdGltaXphdGlvbihuZXcgTGVuc0ZsYXJlc09wdGltaXphdGlvbigwKSk7XG4gICAgICAgIG9wdGlvbnMuYWRkT3B0aW1pemF0aW9uKG5ldyBQYXJ0aWNsZXNPcHRpbWl6YXRpb24oMSkpO1xuICAgICAgICBvcHRpb25zLmFkZE9wdGltaXphdGlvbihuZXcgVGV4dHVyZU9wdGltaXphdGlvbigxLCA1MTIpKTtcbiAgICAgICAgb3B0aW9ucy5hZGRPcHRpbWl6YXRpb24obmV3IFJlbmRlclRhcmdldHNPcHRpbWl6YXRpb24oMikpO1xuICAgICAgICBvcHRpb25zLmFkZE9wdGltaXphdGlvbihuZXcgUG9zdFByb2Nlc3Nlc09wdGltaXphdGlvbigzKSk7XG4gICAgICAgIG9wdGlvbnMuYWRkT3B0aW1pemF0aW9uKG5ldyBIYXJkd2FyZVNjYWxpbmdPcHRpbWl6YXRpb24oNCwgMikpO1xuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBGb2N1c0V2ZW50cyhvcHRpbWl6ZXI6IFNjZW5lT3B0aW1pemVyKSB7XG4gICAgICAgIGlmICh3aW5kb3cpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0dXBGb2N1c0V2ZW50c1wiKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJyxmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wdGltaXplciBzdGFydFwiKTtcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZXIuc3RhcnQoKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JyxmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wdGltaXplciBzdG9wXCIpO1xuICAgICAgICAgICAgICAgIG9wdGltaXplci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgb3B0aW1pemVyLnJlc2V0KCk7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5pbXBvcnQge01hdGVyaWFsLCBCYWNrZ3JvdW5kTWF0ZXJpYWwsIEJhc2VUZXh0dXJlLCBDb2xvcjMsIEN1YmVUZXh0dXJlLCBNZXNoLCBTY2VuZSwgVGV4dHVyZX0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZVwiO1xuaW1wb3J0IHtTa3lNYXRlcmlhbH0gZnJvbSBcIkBiYWJ5bG9uanMvbWF0ZXJpYWxzXCI7XG5cblxuZXhwb3J0IGNsYXNzIHYzRFNreUJveCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfZW52aXJvbm1lbnRUZXh0dXJlQ0ROVXJsID0gXCJodHRwczovL2Fzc2V0cy5iYWJ5bG9uanMuY29tL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudFNwZWN1bGFyLmVudlwiO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2t5Ym94OiBNZXNoO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NreWJveEJhc2U6IE1lc2g7XG4gICAgZ2V0IHNreWJveCgpOiBNZXNoIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NreWJveDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2t5Ym94TWF0ZXJpYWw6IEJhY2tncm91bmRNYXRlcmlhbDtcbiAgICBwdWJsaWMgc2t5Ym94QmFzZU1hdGVyaWFsOiBTa3lNYXRlcmlhbDtcbiAgICBwdWJsaWMgc2t5Ym94UmVmbGVjdGlvblRleHR1cmU6IEN1YmVUZXh0dXJlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHNjZW5lOiBTY2VuZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB0ZXh0dXJlTmFtZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm94U2l6ZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZW52VGV4dHVyZT86IEJhc2VUZXh0dXJlLFxuICAgICkge1xuICAgICAgICB0aGlzLl9za3lib3ggPSBNZXNoLkNyZWF0ZUJveChcIlNreWJveFwiLCBib3hTaXplLCB0aGlzLnNjZW5lLCB1bmRlZmluZWQsIE1lc2guQkFDS1NJREUpO1xuICAgICAgICB0aGlzLl9za3lib3hCYXNlID0gTWVzaC5DcmVhdGVCb3goXCJTa3lib3hCYXNlXCIsIGJveFNpemUrMSwgdGhpcy5zY2VuZSwgdW5kZWZpbmVkLCBNZXNoLkJBQ0tTSURFKTtcbiAgICAgICAgdGhpcy5jcmVhdGVNYXRlcmlhbCh0ZXh0dXJlTmFtZSk7XG4gICAgICAgIHRoaXMuX3NreWJveC5tYXRlcmlhbCA9IHRoaXMuc2t5Ym94TWF0ZXJpYWw7XG4gICAgICAgIHRoaXMuX3NreWJveEJhc2UubWF0ZXJpYWwgPSB0aGlzLnNreWJveEJhc2VNYXRlcmlhbDtcbiAgICAgICAgdGhpcy5fc2t5Ym94LnJlbmRlcmluZ0dyb3VwSWQgPSAwO1xuICAgICAgICB0aGlzLl9za3lib3hCYXNlLnJlbmRlcmluZ0dyb3VwSWQgPSAwO1xuICAgICAgICB0aGlzLl9za3lib3gubWF0ZXJpYWwudHJhbnNwYXJlbmN5TW9kZSA9IE1hdGVyaWFsLk1BVEVSSUFMX0FMUEhBVEVTVEFOREJMRU5EO1xuICAgICAgICB0aGlzLl9za3lib3gubWF0ZXJpYWwuYWxwaGEgPSAwLjU7XG4gICAgICAgIHRoaXMuc2V0dXBJbWFnZVByb2Nlc3NpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgc2t5Ym94IG1hdGVyaWFsIGFuZCB0aGUgc2t5Ym94IHJlZmxlY3Rpb24gdGV4dHVyZVxuICAgICAqIEBwYXJhbSB0ZXh0dXJlTmFtZSBuYW1lIChVUkkpIHRvIHRoZSB0ZXh0dXJlIGZpbGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZU1hdGVyaWFsKHRleHR1cmVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5za3lib3hCYXNlTWF0ZXJpYWwgPSBuZXcgU2t5TWF0ZXJpYWwoXCJTa3lib3hCYXNlTWF0ZXJpYWxcIiwgdGhpcy5zY2VuZSk7XG4gICAgICAgIHRoaXMuc2t5Ym94TWF0ZXJpYWwgPSBuZXcgQmFja2dyb3VuZE1hdGVyaWFsKFwiU2t5Ym94TWF0ZXJpYWxcIiwgdGhpcy5zY2VuZSk7XG4gICAgICAgIHRoaXMuc2t5Ym94TWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2t5Ym94TWF0ZXJpYWwudXNlUkdCQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5za3lib3hNYXRlcmlhbC5wcmltYXJ5Q29sb3IgPSBuZXcgQ29sb3IzKDEsIDEsIDEpO1xuICAgICAgICB0aGlzLnNreWJveE1hdGVyaWFsLmVuYWJsZU5vaXNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5za3lib3hSZWZsZWN0aW9uVGV4dHVyZSA9IG5ldyBDdWJlVGV4dHVyZSh0ZXh0dXJlTmFtZSwgdGhpcy5zY2VuZSk7XG4gICAgICAgIHRoaXMuc2t5Ym94UmVmbGVjdGlvblRleHR1cmUuY29vcmRpbmF0ZXNNb2RlID0gVGV4dHVyZS5TS1lCT1hfTU9ERTtcbiAgICAgICAgdGhpcy5za3lib3hSZWZsZWN0aW9uVGV4dHVyZS5nYW1tYVNwYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2t5Ym94TWF0ZXJpYWwucmVmbGVjdGlvblRleHR1cmUgPSB0aGlzLnNreWJveFJlZmxlY3Rpb25UZXh0dXJlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBpbWFnZSBwcm9jZXNzaW5nIGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIG9wdGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXR1cEltYWdlUHJvY2Vzc2luZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2VuZS5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmNvbnRyYXN0ID0gMS4yO1xuICAgICAgICB0aGlzLnNjZW5lLmltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24uZXhwb3N1cmUgPSAwLjg7XG4gICAgICAgIHRoaXMuc2NlbmUuaW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi50b25lTWFwcGluZ0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjZW5lLmVudmlyb25tZW50VGV4dHVyZSA9IHRoaXMuZW52VGV4dHVyZSA/IHRoaXMuZW52VGV4dHVyZVxuICAgICAgICAgICAgOiBDdWJlVGV4dHVyZS5DcmVhdGVGcm9tUHJlZmlsdGVyZWREYXRhKHYzRFNreUJveC5fZW52aXJvbm1lbnRUZXh0dXJlQ0ROVXJsLCB0aGlzLnNjZW5lKTtcbiAgICB9XG59XG4iLCIvKiogQ29weXJpZ2h0IChjKSAyMDIxIFRoZSB2M2QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMgZmlsZSxcbiAqIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKi9cblxuaW1wb3J0IHtJU2hhZG93TGlnaHQsIExpZ2h0LFxuICAgIEFuaW1hdGlvbn0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZVwiO1xuaW1wb3J0IHtDb2xvcjMsIENvbG9yNCwgUXVhdGVybmlvbiwgU2l6ZSwgVmVjdG9yMiwgVmVjdG9yMyB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNJU2hhZG93TGlnaHQobGlnaHQ6IExpZ2h0KSA6IGxpZ2h0IGlzIElTaGFkb3dMaWdodCB7XG4gICAgcmV0dXJuIChsaWdodCBhcyBJU2hhZG93TGlnaHQpLnNldFNoYWRvd1Byb2plY3Rpb25NYXRyaXggIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuaW1hdGlvbkRhdGFUeXBlKHZhbHVlOiBhbnkpIHtcbiAgICBsZXQgZGF0YVR5cGUgPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAoIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgZGF0YVR5cGUgPSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgUXVhdGVybmlvbikge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1FVQVRFUk5JT047XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFZlY3RvcjMpIHtcbiAgICAgICAgZGF0YVR5cGUgPSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9WRUNUT1IzO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBWZWN0b3IyKSB7XG4gICAgICAgIGRhdGFUeXBlID0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfVkVDVE9SMjtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQ29sb3IzKSB7XG4gICAgICAgIGRhdGFUeXBlID0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfQ09MT1IzO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBDb2xvcjQpIHtcbiAgICAgICAgZGF0YVR5cGUgPSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9DT0xPUjQ7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNpemUpIHtcbiAgICAgICAgZGF0YVR5cGUgPSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9TSVpFO1xuICAgIH1cblxuICAgIGlmIChkYXRhVHlwZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRhdGFUeXBlO1xuICAgIH1cbn1cbiIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5pbXBvcnQgeyBBcmNSb3RhdGVDYW1lcmEgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0NhbWVyYXMvYXJjUm90YXRlQ2FtZXJhXCI7XG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvc2NlbmVcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvRW5naW5lcy9lbmdpbmVcIjtcbmltcG9ydCB7IFNjZW5lTG9hZGVyIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCI7XG5pbXBvcnQgeyBDb2xvcjMsIENvbG9yNCwgVmVjdG9yMyB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aFwiO1xuXG5pbXBvcnQgeyBHTFRGTG9hZGVyRXh0ZW5zaW9uT2JzZXJ2ZXIgfSBmcm9tIFwiLi9pbXBvcnRlci9sb2FkZXItb2JzZXJ2ZXJcIjtcbmltcG9ydCB7XG4gIFZSTUZpbGVMb2FkZXIsXG4gIFZSTUxvYWRlckV4dGVuc2lvbixcbiAgVlJNTWFuYWdlcixcbn0gZnJvbSBcIi4vaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyY1wiO1xuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gXCJAYmFieWxvbmpzL2xvYWRlcnMvZ2xURi8yLjBcIjtcbmltcG9ydCB7IEhlbWlzcGhlcmljTGlnaHQgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xpZ2h0cy9oZW1pc3BoZXJpY0xpZ2h0XCI7XG5pbXBvcnQge1xuICBBbmltYXRpb24sXG4gIEFuaW1hdGFibGUsXG4gIENhbWVyYSxcbiAgRGVmYXVsdFJlbmRlcmluZ1BpcGVsaW5lLFxuICBFdmVudFN0YXRlLFxuICBJU2hhZG93TGlnaHQsXG4gIFNoYWRvd0dlbmVyYXRvcixcbiAgRGVwdGhPZkZpZWxkRWZmZWN0Qmx1ckxldmVsLFxuICBJQW5pbWF0aW9uS2V5LFxuICBFYXNpbmdGdW5jdGlvbixcbiAgTnVsbGFibGUsXG4gIFNjZW5lT3B0aW1pemVyT3B0aW9ucyxcbn0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZVwiO1xuaW1wb3J0IHsgZ2V0QW5pbWF0aW9uRGF0YVR5cGUsIGlzSVNoYWRvd0xpZ2h0IH0gZnJvbSBcIi4vdXRpbGl0aWVzL3R5cGVzXCI7XG5pbXBvcnQgeyBWM0RTY2VuZU9wdGltaXplciB9IGZyb20gXCIuL3NjZW5lL29wdGltaXplclwiO1xuaW1wb3J0IHsgdjNEU2t5Qm94IH0gZnJvbSBcIi4vc2NlbmUvc2t5Ym94XCI7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbExpZ2h0IH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9MaWdodHMvZGlyZWN0aW9uYWxMaWdodFwiO1xuXG5leHBvcnQgY2xhc3MgVjNEQ29yZSBpbXBsZW1lbnRzIEdMVEZMb2FkZXJFeHRlbnNpb25PYnNlcnZlciB7XG4gIHB1YmxpYyBzdGF0aWMgRlJBTUVSQVRFID0gNjA7XG5cbiAgLyoqXG4gICAqIEdMVEZGaWxlTG9hZGVyIHBsdWdpbiBmYWN0b3J5XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIF92cm1GaWxlTG9hZGVyID0gbmV3IFZSTUZpbGVMb2FkZXIoKTtcblxuICAvLyBXaGV0aGVyIHN0YXJ0cyBzcHJpbmcgYm9uZXMgYW5pbWF0aW9uIGF1dG9tYXRpY2FsbHlcbiAgcHJpdmF0ZSBfc3ByaW5nQm9uZXNBdXRvVXBkYXRlID0gdHJ1ZTtcbiAgZ2V0IHNwcmluZ0JvbmVzQXV0b1VwZGF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3ByaW5nQm9uZXNBdXRvVXBkYXRlO1xuICB9XG4gIHNldCBzcHJpbmdCb25lc0F1dG9VcGRhdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zcHJpbmdCb25lc0F1dG9VcGRhdGUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGFkb3cgZ2VuZXJhdG9yc1xuICAgKi9cbiAgcHJpdmF0ZSBfc2hhZG93R2VuZXJhdG9yczogTWFwPElTaGFkb3dMaWdodCwgU2hhZG93R2VuZXJhdG9yPiA9IG5ldyBNYXA8XG4gICAgSVNoYWRvd0xpZ2h0LFxuICAgIFNoYWRvd0dlbmVyYXRvclxuICA+KCk7XG5cbiAgLyoqXG4gICAqIFNjZW5lIG9wdGltaXplclxuICAgKi9cbiAgcHJpdmF0ZSBfc2NlbmVPcHRpbWl6ZXI6IFYzRFNjZW5lT3B0aW1pemVyO1xuXG4gIC8qKlxuICAgKiBSZW5kZXJpbmcgcGlwZWxpbmVcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX3JlbmRlcmluZ1BpcGVsaW5lOiBEZWZhdWx0UmVuZGVyaW5nUGlwZWxpbmU7XG4gIGdldCByZW5kZXJpbmdQaXBlbGluZSgpOiBEZWZhdWx0UmVuZGVyaW5nUGlwZWxpbmUge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFja3Mgd2hlbiBsb2FkaW5nIGlzIGRvbmVcbiAgICovXG4gIHByaXZhdGUgX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzOiBGdW5jdGlvbltdID0gW107XG4gIHB1YmxpYyBhZGRPbkxvYWRDb21wbGV0ZUNhbGxiYWNrcyhjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkxvYWRDb21wbGV0ZUNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVPbkxvYWRDb21wbGV0ZUNhbGxiYWNrKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICB0aGlzLl9vbkxvYWRDb21wbGV0ZUNhbGxiYWNrcy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVzZXRPbkxvYWRDb21wbGV0ZUNhbGxiYWNrcygpIHtcbiAgICB0aGlzLl9vbkxvYWRDb21wbGV0ZUNhbGxiYWNrcyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmVmb3JlUmVuZGVyRnVuYzogKFxuICAgIGV2ZW50RGF0YTogU2NlbmUsXG4gICAgZXZlbnRTdGF0ZTogRXZlbnRTdGF0ZVxuICApID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgcHJpdmF0ZSBfYWZ0ZXJSZW5kZXJGdW5jOiAoZXZlbnREYXRhOiBTY2VuZSwgZXZlbnRTdGF0ZTogRXZlbnRTdGF0ZSkgPT4gdm9pZCA9XG4gICAgKCkgPT4ge1xuICAgICAgZm9yIChjb25zdCBtYW5hZ2VyIG9mIHRoaXMubG9hZGVkVlJNTWFuYWdlcnMpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NwcmluZ0JvbmVzQXV0b1VwZGF0ZSlcbiAgICAgICAgICBtYW5hZ2VyLnVwZGF0ZSh0aGlzLmVuZ2luZS5nZXREZWx0YVRpbWUoKSk7XG4gICAgICB9XG4gICAgfTtcblxuICBwdWJsaWMgdXBkYXRlQmVmb3JlUmVuZGVyRnVuY3Rpb24oXG4gICAgZnVuYzogKGV2ZW50RGF0YTogU2NlbmUsIGV2ZW50U3RhdGU6IEV2ZW50U3RhdGUpID0+IHZvaWRcbiAgKSB7XG4gICAgdGhpcy5fYmVmb3JlUmVuZGVyRnVuYyA9IGZ1bmM7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQWZ0ZXJSZW5kZXJGdW5jdGlvbihcbiAgICBmdW5jOiAoZXZlbnREYXRhOiBTY2VuZSwgZXZlbnRTdGF0ZTogRXZlbnRTdGF0ZSkgPT4gdm9pZFxuICApIHtcbiAgICB0aGlzLl9hZnRlclJlbmRlckZ1bmMgPSBmdW5jO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FtZXJhT25CZWZvcmVSZW5kZXJGdW5jOiBGdW5jdGlvbltdID0gW107XG4gIHByaXZhdGUgX21haW5DYW1lcmE6IENhbWVyYTtcbiAgZ2V0IG1haW5DYW1lcmEoKTogQ2FtZXJhIHtcbiAgICByZXR1cm4gdGhpcy5fbWFpbkNhbWVyYTtcbiAgfVxuICBzZXQgbWFpbkNhbWVyYSh2YWx1ZTogQ2FtZXJhKSB7XG4gICAgdGhpcy5fbWFpbkNhbWVyYSA9IHZhbHVlO1xuICB9XG5cbiAgLy8qIFRPRE86IFBhdGNoZWQuXG4gIC8vIHB1YmxpYyBza3lCb3g6IHYzRFNreUJveCA9IG51bGw7XG4gIHB1YmxpYyBza3lCb3g6IHYzRFNreUJveDtcblxuICAvKipcbiAgICogTG9hZGVkIFZSTSBNYW5hZ2Vyc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHVibGljIGxvYWRlZFZSTU1hbmFnZXJzOiBWUk1NYW5hZ2VyW10gPSBbXTtcbiAgcHVibGljIGFkZFZSTU1hbmFnZXIobWFuYWdlcjogVlJNTWFuYWdlcikge1xuICAgIGlmIChtYW5hZ2VyKSB0aGlzLmxvYWRlZFZSTU1hbmFnZXJzLnB1c2gobWFuYWdlcik7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFZSTSBNYW5hZ2VyIGJ5IGluZGV4XG4gICAqIEBwYXJhbSBpZHhcbiAgICovXG4gIHB1YmxpYyBnZXRWUk1NYW5hZ2VyQnlJbmRleChpZHg6IG51bWJlcikge1xuICAgIHJldHVybiBpZHggPj0gMCAmJiBpZHggPCB0aGlzLmxvYWRlZFZSTU1hbmFnZXJzLmxlbmd0aFxuICAgICAgPyB0aGlzLmxvYWRlZFZSTU1hbmFnZXJzW2lkeF1cbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgVlJNIE1hbmFnZXIgYnkgVVJJXG4gICAqIFZSTSBkb2Vzbid0IGhhdmUgYW55IFVJRCBpbiBtZXRhZGF0YS4gVGl0bGUgY2FuIGJlIHVuZmlsbGVkIHRvby5cbiAgICogRmlsZW5hbWUgaXMgdGhlIG9ubHkgcmVhc29uYWJsZSBJRC5cbiAgICogQHBhcmFtIHVyaVxuICAgKi9cbiAgLy8gVlJNIGRvZXNuJ3QgaGF2ZSBhbnkgVUlEIGluIG1ldGFkYXRhLiBUaXRsZSBjYW4gYmUgdW5maWxsZWQgdG9vLlxuICAvLyBGaWxlbmFtZSBpcyB0aGUgb25seSByZWFzb25hYmxlIElELlxuICBwdWJsaWMgZ2V0VlJNTWFuYWdlckJ5VVJJKHVyaTogU3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2coXCJjYWxsIGdldFZSTU1hbmFnZXJCeVVSSSgpXCIpO1xuICAgIGNvbnNvbGUubG9nKFwidXJpOiBcIiwgdXJpKTtcbiAgICBjb25zb2xlLmxvZyhcInRoaXMubG9hZGVkVlJNTWFuYWdlcnM6IFwiLCB0aGlzLmxvYWRlZFZSTU1hbmFnZXJzKTtcblxuICAgIGZvciAoY29uc3QgbWFuYWdlciBvZiB0aGlzLmxvYWRlZFZSTU1hbmFnZXJzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm1hbmFnZXI6IFwiLCBtYW5hZ2VyKTtcbiAgICAgIGNvbnNvbGUubG9nKFwibWFuYWdlci51cmk6IFwiLCBtYW5hZ2VyLnVyaSk7XG5cbiAgICAgIGlmIChtYW5hZ2VyLnVyaSA9PT0gdXJpKSByZXR1cm4gbWFuYWdlcjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgZW5naW5lOiBFbmdpbmUsXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXG4gICAgLy8gcHVibGljIHNjZW5lPzogU2NlbmUsXG4gICAgcHVibGljIHNjZW5lOiBTY2VuZSxcbiAgICBjYW1lcmE/OiBDYW1lcmFcbiAgKSB7XG4gICAgY29uc29sZS5sb2coXCJjYWxsIGNvbnN0cnVjdG9yKClcIik7XG4gICAgY29uc29sZS5sb2coXCJlbmdpbmU6IFwiLCBlbmdpbmUpO1xuICAgIGNvbnNvbGUubG9nKFwic2NlbmU6IFwiLCBzY2VuZSk7XG4gICAgY29uc29sZS5sb2coXCJjYW1lcmE6IFwiLCBjYW1lcmEpO1xuXG4gICAgLy8gUmVnaXN0ZXJcbiAgICB0aGlzLnJlZ2lzdGVyVnJtUGx1Z2luKCk7XG4gICAgdGhpcy5yZWdpc3RlclZybUV4dGVuc2lvbigpO1xuXG4gICAgaWYgKCF0aGlzLnNjZW5lKSB0aGlzLnNjZW5lID0gbmV3IFNjZW5lKHRoaXMuZW5naW5lKTtcbiAgICBlbHNlIHRoaXMuZW5naW5lID0gdGhpcy5zY2VuZS5nZXRFbmdpbmUoKTtcblxuICAgIHRoaXMuc2V0dXBPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5lbmFibGVSZXNpemUoKTtcblxuICAgIGlmIChjYW1lcmEpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FtZXJhOiBcIiwgY2FtZXJhKTtcbiAgICAgIHRoaXMuX21haW5DYW1lcmEgPSBjYW1lcmE7XG4gICAgICB0aGlzLnNjZW5lLnN3aXRjaEFjdGl2ZUNhbWVyYShjYW1lcmEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENhbWVyYSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lID0gbmV3IERlZmF1bHRSZW5kZXJpbmdQaXBlbGluZShcbiAgICAgIFwiZGVmYXVsdFBpcGVsaW5lXCIsIC8vIFRoZSBuYW1lIG9mIHRoZSBwaXBlbGluZVxuICAgICAgdHJ1ZSwgLy8gRG8geW91IHdhbnQgdGhlIHBpcGVsaW5lIHRvIHVzZSBIRFIgdGV4dHVyZT9cbiAgICAgIHRoaXMuc2NlbmUsIC8vIFRoZSBzY2VuZSBpbnN0YW5jZVxuICAgICAgW3RoaXMuX21haW5DYW1lcmFdIC8vIFRoZSBsaXN0IG9mIGNhbWVyYXMgdG8gYmUgYXR0YWNoZWQgdG9cbiAgICApO1xuICAgIHRoaXMuc2V0dXBSZW5kZXJpbmdQaXBlbGluZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgYmFja2dyb3VuZCB0cmFuc3BhcmVudC5cbiAgICovXG4gIHB1YmxpYyB0cmFuc3BhcmVudEJhY2tncm91bmQoKSB7XG4gICAgY29uc29sZS5sb2coXCJjYWxsIHRyYW5zcGFyZW50QmFja2dyb3VuZCgpXCIpO1xuXG4gICAgdGhpcy5zY2VuZS5jbGVhckNvbG9yLmEgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgYmFja2dyb3VuZCBzb2xpZC5cbiAgICovXG4gIHB1YmxpYyBzb2xpZEJhY2tncm91bmQoKSB7XG4gICAgdGhpcy5zY2VuZS5jbGVhckNvbG9yLmEgPSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBiYWNrZ3JvdW5kIGNvbG9yLlxuICAgKiBAcGFyYW0gY29sb3JcbiAgICovXG4gIHB1YmxpYyBzZXRCYWNrZ3JvdW5kQ29sb3IoY29sb3I6IENvbG9yMykge1xuICAgIHRoaXMuc2NlbmUuY2xlYXJDb2xvciA9IENvbG9yNC5Gcm9tQ29sb3IzKFxuICAgICAgY29sb3IsXG4gICAgICB0aGlzLnNjZW5lLmNsZWFyQ29sb3IuYVxuICAgICkudG9MaW5lYXJTcGFjZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBiYWNrZ3JvdW5kIGNvbG9yIGZyb20gaGV4IHN0cmluZy5cbiAgICogQHBhcmFtIGhleCBIZXggY29sb3Igc3RyaW5nXG4gICAqL1xuICBwdWJsaWMgc2V0QmFja2dyb3VuZENvbG9ySGV4KGhleDogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IoQ29sb3IzLkZyb21IZXhTdHJpbmcoaGV4KSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIGFtYmllbnQgbGlnaHQuXG4gICAqIEBwYXJhbSBjb2xvciBjb2xvciBvZiB0aGUgbGlnaHRcbiAgICovXG4gIHB1YmxpYyBhZGRBbWJpZW50TGlnaHQoY29sb3I/OiBDb2xvcjMpIHtcbiAgICBjb25zdCBsaWdodCA9IG5ldyBIZW1pc3BoZXJpY0xpZ2h0KFxuICAgICAgXCJWM0RIZW1pTGlnaHRcIixcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDEsIDEpLFxuICAgICAgdGhpcy5zY2VuZVxuICAgICk7XG4gICAgaWYgKGNvbG9yKSBsaWdodC5kaWZmdXNlID0gY29sb3I7XG4gICAgbGlnaHQuc2V0RW5hYmxlZCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBiYXNpYyBhcmMgcm90YXRlIGNhbWVyYSB0byBzY2VuZS5cbiAgICogVE9ETzogdGhlcmUgc2VlbXMgdG8gYmUgYSBidWcgd2hlbiBtZXNoZXMgYXJlIG5lYXIgdGhlIGVkZ2Ugb2YgY2FtZXJhIGNvbmVcbiAgICogUHJvYmFibHkgaGFzIHNvbWV0aGluZyB0byBkbyB3aXRoIGN1bGxpbmdcbiAgICogQHBhcmFtIHJhZGl1cyByb3RhdGlvbiByYWRpdXNcbiAgICovXG4gIHByaXZhdGUgYWRkQ2FtZXJhKHJhZGl1czogbnVtYmVyID0gMykge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCBhZGRDYW1lcmEoKVwiKTtcbiAgICBjb25zb2xlLmxvZyhcInJhZGl1czogXCIsIHJhZGl1cyk7XG5cbiAgICBjb25zdCBjYW1lcmEgPSBuZXcgQXJjUm90YXRlQ2FtZXJhKFxuICAgICAgXCJWM0RNYWluQ2FtZXJhXCIsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHJhZGl1cyxcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxuICAgICAgdGhpcy5zY2VuZSxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIGNhbWVyYS5sb3dlclJhZGl1c0xpbWl0ID0gMC4xO1xuICAgIGNhbWVyYS51cHBlclJhZGl1c0xpbWl0ID0gMjA7XG4gICAgY2FtZXJhLndoZWVsRGVsdGFQZXJjZW50YWdlID0gMC4wNTtcbiAgICBjYW1lcmEubWluWiA9IDA7XG4gICAgY2FtZXJhLnNldFBvc2l0aW9uKG5ldyBWZWN0b3IzKDAsIDEuNSwgLTUpKTtcbiAgICBjYW1lcmEuYXR0YWNoQ29udHJvbCh0aGlzLmVuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXMoKSk7XG5cbiAgICB0aGlzLl9tYWluQ2FtZXJhID0gY2FtZXJhO1xuICAgIHRoaXMuc2NlbmUuc3dpdGNoQWN0aXZlQ2FtZXJhKHRoaXMuX21haW5DYW1lcmEsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGFyYyByb3RhdGUgZm9sbG93aW5nIGNhbWVyYSB0byBWUk0gbW9kZWwuXG4gICAqIFByb2JhYmx5IGhhcyBzb21ldGhpbmcgdG8gZG8gd2l0aCBjdWxsaW5nXG4gICAqIEBwYXJhbSBtYW5hZ2VyIFZSTSBNYW5hZ2VyIHRvIGF0dGFjaCB0aGUgY2FtZXJhIHRvXG4gICAqIEBwYXJhbSByYWRpdXMgcm90YXRpb24gcmFkaXVzXG4gICAqL1xuICBwdWJsaWMgYXR0YWNoQ2FtZXJhVG8obWFuYWdlcjogVlJNTWFuYWdlciwgcmFkaXVzOiBudW1iZXIgPSAzKSB7XG4gICAgY29uc29sZS5sb2coXCJjYWxsIGF0dGFjaENhbWVyYVRvKClcIik7XG4gICAgY29uc29sZS5sb2coXCJtYW5hZ2VyOiBcIiwgbWFuYWdlcik7XG4gICAgY29uc29sZS5sb2coXCJyYWRpdXM6IFwiLCByYWRpdXMpO1xuXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IEFyY1JvdGF0ZUNhbWVyYShcbiAgICAgIFwiVjNEQXJjQ2FtZXJhXCIgKyBtYW5hZ2VyLmNhbWVyYXMubGVuZ3RoLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICByYWRpdXMsXG4gICAgICBtYW5hZ2VyLnJvb3RNZXNoLnBvc2l0aW9uLFxuICAgICAgdGhpcy5zY2VuZSxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY2FtZXJhLmxvd2VyUmFkaXVzTGltaXQgPSAwLjE7XG4gICAgY2FtZXJhLnVwcGVyUmFkaXVzTGltaXQgPSAyMDtcbiAgICBjYW1lcmEud2hlZWxEZWx0YVBlcmNlbnRhZ2UgPSAwLjA1O1xuICAgIGNhbWVyYS5taW5aID0gMDtcbiAgICBjYW1lcmEuc2V0UG9zaXRpb24obmV3IFZlY3RvcjMoMCwgMS41LCAtNSkpO1xuICAgIGNhbWVyYS5zZXRUYXJnZXQobWFuYWdlci5yb290TWVzaC5nZXRBYnNvbHV0ZVBvc2l0aW9uKCkpO1xuICAgIGNhbWVyYS5hdHRhY2hDb250cm9sKHRoaXMuZW5naW5lLmdldFJlbmRlcmluZ0NhbnZhcygpKTtcblxuICAgIG1hbmFnZXIuYXBwZW5kQ2FtZXJhKGNhbWVyYSk7XG5cbiAgICB0aGlzLl9jYW1lcmFPbkJlZm9yZVJlbmRlckZ1bmMucHVzaCgoKSA9PiB7XG4gICAgICBjYW1lcmEuc2V0VGFyZ2V0KG1hbmFnZXIucm9vdE1lc2guZ2V0QWJzb2x1dGVQb3NpdGlvbigpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBDcmVhdGUgYSBza3lib3ggZm9yIHRoZSBzY2VuZS5cbiAgICogQHBhcmFtIHNpemUgc2l6ZSBvZiB0aGUgc2t5Ym94XG4gICAqIEBwYXJhbSB0ZXh0dXJlTmFtZSBwYXRoIHRvIHNreWJveCB0ZXh0dXJlXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlU2t5Qm94KHNpemU6IG51bWJlciwgdGV4dHVyZU5hbWU/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuc2t5Qm94KSB7XG4gICAgICB0aGlzLnNreUJveCA9IG5ldyB2M0RTa3lCb3goXG4gICAgICAgIHRoaXMuc2NlbmUsXG4gICAgICAgIHRleHR1cmVOYW1lID8gdGV4dHVyZU5hbWUgOiBcInRleHR1cmUvc2t5Ym94XCIsXG4gICAgICAgIHNpemVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZSBzaGFkb3cgY2FzdGVyIGZvciBsaWdodC5cbiAgICogQHBhcmFtIGxpZ2h0IExpZ2h0IHRvIGVuYWJsZSBzaGFkb3dzLlxuICAgKi9cbiAgcHVibGljIGVuYWJsZVNoYWJvd3MobGlnaHQ/OiBJU2hhZG93TGlnaHQpIHtcbiAgICBpZiAobGlnaHQpIHtcbiAgICAgIGlmICghdGhpcy5fc2hhZG93R2VuZXJhdG9ycy5oYXMobGlnaHQpKSB7XG4gICAgICAgIGNvbnN0IHNoYWRvd0dlbmVyYXRvciA9IG5ldyBTaGFkb3dHZW5lcmF0b3IoMTAyNCwgbGlnaHQpO1xuICAgICAgICB0aGlzLnNldHVwU2hhZG93R2VuZXJhdG9yKHNoYWRvd0dlbmVyYXRvcik7XG4gICAgICAgIHRoaXMuX3NoYWRvd0dlbmVyYXRvcnMuc2V0KGxpZ2h0LCBzaGFkb3dHZW5lcmF0b3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiTGlnaHQgXCIgKyBsaWdodC5uYW1lICsgXCIgYWxyZWFkeSBoYXMgYSBzaGFkb3cgZ2VuZXJhdG9yIVwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoY29uc3QgbCBvZiB0aGlzLnNjZW5lLmxpZ2h0cykge1xuICAgICAgICBpZiAoaXNJU2hhZG93TGlnaHQobCkpIHtcbiAgICAgICAgICBjb25zdCBzaGFkb3dHZW5lcmF0b3IgPSBuZXcgU2hhZG93R2VuZXJhdG9yKDEwMjQsIGwpO1xuICAgICAgICAgIHRoaXMuc2V0dXBTaGFkb3dHZW5lcmF0b3Ioc2hhZG93R2VuZXJhdG9yKTtcbiAgICAgICAgICB0aGlzLl9zaGFkb3dHZW5lcmF0b3JzLnNldChsLCBzaGFkb3dHZW5lcmF0b3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb3JyZXNwb25kaW5nIHNoYWRvdyBnZW5lcmF0b3IgZm9yIGxpZ2h0LlxuICAgKiBAcGFyYW0gbGlnaHQgTGlnaHQgdG8gZ2V0IHNoYWRvdyBnZW5lcmF0b3JcbiAgICovXG4gIC8vKiBUT0RPOiBQYXRjaGVkLlxuICAvLyBwdWJsaWMgZ2V0U2hhZG93bkdlbmVyYXRvcihsaWdodDogSVNoYWRvd0xpZ2h0KTogTnVsbGFibGU8U2hhZG93R2VuZXJhdG9yPiB7XG4gIHB1YmxpYyBnZXRTaGFkb3duR2VuZXJhdG9yKGxpZ2h0OiBJU2hhZG93TGlnaHQpOiBTaGFkb3dHZW5lcmF0b3IgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9zaGFkb3dHZW5lcmF0b3JzLmdldChsaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIHN0YXJ0aW5nIGFuaW1hdGlvblxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBuYW1lXG4gICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gZHVyYXRpb25cbiAgICogQHBhcmFtIGZyb21cbiAgICogQHBhcmFtIHRvXG4gICAqIEBwYXJhbSBsb29wTW9kZVxuICAgKiBAcGFyYW0gZWFzaW5nRnVuY3Rpb25cbiAgICogQHBhcmFtIGVhc2luZ01vZGVcbiAgICovXG4gIHB1YmxpYyBzdGFydFF1aWNrQW5pbWF0aW9uKFxuICAgIHRhcmdldDogYW55LFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBwcm9wZXJ0eTogc3RyaW5nLFxuICAgIGR1cmF0aW9uOiBudW1iZXIsXG4gICAgZnJvbTogYW55LFxuICAgIHRvOiBhbnksXG4gICAgbG9vcE1vZGU/OiBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZWFzaW5nRnVuY3Rpb24/OiBFYXNpbmdGdW5jdGlvbixcbiAgICBlYXNpbmdNb2RlPzogbnVtYmVyXG4gICk6IEFuaW1hdGFibGUge1xuICAgIGNvbnN0IGFuaW0gPSB0aGlzLmNyZWF0ZUFuaW1hdGlvbihcbiAgICAgIHRhcmdldCxcbiAgICAgIG5hbWUsXG4gICAgICBwcm9wZXJ0eSxcbiAgICAgIFtcbiAgICAgICAgeyBmcmFtZTogMCwgdmFsdWU6IGZyb20gfSxcbiAgICAgICAgeyBmcmFtZTogZHVyYXRpb24sIHZhbHVlOiB0byB9LFxuICAgICAgXSxcbiAgICAgIGxvb3BNb2RlLFxuICAgICAgZWFzaW5nRnVuY3Rpb24sXG4gICAgICBlYXNpbmdNb2RlXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5zY2VuZS5iZWdpbkRpcmVjdEFuaW1hdGlvbihcbiAgICAgIGFuaW1bMF0sXG4gICAgICBbYW5pbVsxXV0sXG4gICAgICAwLFxuICAgICAgZHVyYXRpb24sXG4gICAgICBmYWxzZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGFuaW1hdGlvblxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBuYW1lXG4gICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ga2V5RnJhbWVzXG4gICAqIEBwYXJhbSBsb29wTW9kZVxuICAgKiBAcGFyYW0gZWFzaW5nRnVuY3Rpb25cbiAgICogQHBhcmFtIGVhc2luZ01vZGVcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVBbmltYXRpb24oXG4gICAgdGFyZ2V0OiBhbnksXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHByb3BlcnR5OiBzdHJpbmcsXG4gICAga2V5RnJhbWVzOiBBcnJheTxJQW5pbWF0aW9uS2V5PixcbiAgICBsb29wTW9kZT86IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBlYXNpbmdGdW5jdGlvbj86IEVhc2luZ0Z1bmN0aW9uLFxuICAgIGVhc2luZ01vZGU/OiBudW1iZXJcbiAgKTogW2FueSwgQW5pbWF0aW9uXSB7XG4gICAgLy8gTWFrZSBzdXJlIGtleUZyYW1lcyBpcyBub3QgZW1wdHlcbiAgICBpZiAoa2V5RnJhbWVzLmxlbmd0aCA8IDEpIHRocm93IEVycm9yKFwiS2V5IEZyYW1lcyBlbXB0eVwiKTtcblxuICAgIC8vIEdldCBkYXRhIHR5cGVcbiAgICBjb25zdCBkYXRhVHlwZSA9IGdldEFuaW1hdGlvbkRhdGFUeXBlKGtleUZyYW1lc1swXS52YWx1ZSk7XG4gICAgaWYgKGRhdGFUeXBlID09PSBudWxsKVxuICAgICAgdGhyb3cgRXJyb3IoXCJDYW5ub3QgZGV0ZXJtaW5lIGRhdGEgdHlwZSBmcm9tIGtleWZyYW1lcyFcIik7XG5cbiAgICBjb25zdCBhbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKFxuICAgICAgbmFtZSxcbiAgICAgIHByb3BlcnR5LFxuICAgICAgVjNEQ29yZS5GUkFNRVJBVEUsXG4gICAgICBkYXRhVHlwZSxcbiAgICAgIGxvb3BNb2RlXG4gICAgKTtcbiAgICBhbmltYXRpb24uc2V0S2V5cyhrZXlGcmFtZXMpO1xuXG4gICAgaWYgKGVhc2luZ0Z1bmN0aW9uKSB7XG4gICAgICBpZiAoZWFzaW5nTW9kZSkgZWFzaW5nRnVuY3Rpb24uc2V0RWFzaW5nTW9kZShlYXNpbmdNb2RlKTtcbiAgICAgIGFuaW1hdGlvbi5zZXRFYXNpbmdGdW5jdGlvbihlYXNpbmdGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFt0YXJnZXQsIGFuaW1hdGlvbl07XG4gIH1cblxuICBwdWJsaWMgZW5hYmxlT3B0aW1pemVyKG9wdGlvbnM/OiBTY2VuZU9wdGltaXplck9wdGlvbnMpIHtcbiAgICB0aGlzLl9zY2VuZU9wdGltaXplciA9IG5ldyBWM0RTY2VuZU9wdGltaXplcih0aGlzLnNjZW5lLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8vIERvbid0IG1ha2Ugd3JhcHBlcnMgc3RhdGljLCBzbyBwbHVnaW5zIHdpbGwgYWx3YXlzIGJlIHJlZ2lzdGVyZWRcbiAgLyoqXG4gICAqIFdyYXBwZXIgZm9yIFNjZW5lTG9hZGVyLkFwcGVuZEFzeW5jLlxuICAgKiBAcGFyYW0gcm9vdFVybCBhIHN0cmluZyB0aGF0IGRlZmluZXMgdGhlIHJvb3QgdXJsIGZvciB0aGUgc2NlbmUgYW5kIHJlc291cmNlcyBvciB0aGUgY29uY2F0ZW5hdGlvbiBvZiByb290VVJMIGFuZCBmaWxlbmFtZVxuICAgKiBAcGFyYW0gc2NlbmVGaWxlbmFtZSBhIHN0cmluZyB0aGF0IGRlZmluZXMgdGhlIG5hbWUgb2YgdGhlIHNjZW5lIGZpbGUgb3Igc3RhcnRzIHdpdGggXCJkYXRhOlwiIGZvbGxvd2luZyBieSB0aGUgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgc2NlbmUgb3IgYSBGaWxlIG9iamVjdCAoZGVmYXVsdDogZW1wdHkgc3RyaW5nKVxuICAgKi9cbiAgcHVibGljIEFwcGVuZEFzeW5jKFxuICAgIHJvb3RVcmw6IHN0cmluZyxcbiAgICBzY2VuZUZpbGVuYW1lPzogc3RyaW5nIHwgRmlsZVxuICApOiBQcm9taXNlPFNjZW5lPiB7XG4gICAgY29uc29sZS5sb2coXCJjYWxsIEFwcGVuZEFzeW5jXCIpO1xuXG4gICAgcmV0dXJuIFNjZW5lTG9hZGVyLkFwcGVuZEFzeW5jKHJvb3RVcmwsIHNjZW5lRmlsZW5hbWUsIHRoaXMuc2NlbmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgZm9yIFNjZW5lTG9hZGVyLkxvYWRBc3luY1xuICAgKiBAcGFyYW0gcm9vdFVybCBhIHN0cmluZyB0aGF0IGRlZmluZXMgdGhlIHJvb3QgdXJsIGZvciB0aGUgc2NlbmUgYW5kIHJlc291cmNlcyBvciB0aGUgY29uY2F0ZW5hdGlvbiBvZiByb290VVJMIGFuZCBmaWxlbmFtZVxuICAgKiBAcGFyYW0gc2NlbmVGaWxlbmFtZSBhIHN0cmluZyB0aGF0IGRlZmluZXMgdGhlIG5hbWUgb2YgdGhlIHNjZW5lIGZpbGUgb3Igc3RhcnRzIHdpdGggXCJkYXRhOlwiIGZvbGxvd2luZyBieSB0aGUgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgc2NlbmUgb3IgYSBGaWxlIG9iamVjdCAoZGVmYXVsdDogZW1wdHkgc3RyaW5nKVxuICAgKi9cbiAgcHVibGljIExvYWRBc3luYyhcbiAgICByb290VXJsOiBzdHJpbmcsXG4gICAgc2NlbmVGaWxlbmFtZT86IHN0cmluZyB8IEZpbGVcbiAgKTogUHJvbWlzZTxTY2VuZT4ge1xuICAgIHJldHVybiBTY2VuZUxvYWRlci5Mb2FkQXN5bmMocm9vdFVybCwgc2NlbmVGaWxlbmFtZSwgdGhpcy5lbmdpbmUpO1xuICB9XG5cbiAgLy8gR0xURkxvYWRlckV4dGVuc2lvbk9ic2VydmVyXG4gIHB1YmxpYyBvbkxvYWRSZWFkeSgpIHtcbiAgICBjb25zb2xlLmxvZyhcImNhbGwgb25Mb2FkUmVhZHkoKVwiKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwidGhpcy5fb25Mb2FkQ29tcGxldGVDYWxsYmFja3M6IFwiLFxuICAgICAgdGhpcy5fb25Mb2FkQ29tcGxldGVDYWxsYmFja3NcbiAgICApO1xuICAgIGZvciAoY29uc3QgZiBvZiB0aGlzLl9vbkxvYWRDb21wbGV0ZUNhbGxiYWNrcykge1xuICAgICAgZigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdXAgZm9yIHRpbWUgdXBkYXRlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXR1cE9ic2VydmFibGUoKSB7XG4gICAgdGhpcy5zY2VuZS5vbkJlZm9yZVJlbmRlck9ic2VydmFibGUuYWRkKFxuICAgICAgKGV2ZW50RGF0YTogU2NlbmUsIGV2ZW50U3RhdGU6IEV2ZW50U3RhdGUpID0+IHtcbiAgICAgICAgdGhpcy5fYmVmb3JlUmVuZGVyRnVuYyhldmVudERhdGEsIGV2ZW50U3RhdGUpO1xuICAgICAgfVxuICAgICk7XG4gICAgLy8gQ2FtZXJhXG4gICAgdGhpcy5zY2VuZS5vbkJlZm9yZVJlbmRlck9ic2VydmFibGUuYWRkKCgpID0+IHtcbiAgICAgIGZvciAoY29uc3QgZiBvZiB0aGlzLl9jYW1lcmFPbkJlZm9yZVJlbmRlckZ1bmMpIGYoKTtcbiAgICB9KTtcbiAgICAvLyBVcGRhdGUgc2Vjb25kYXJ5IGFuaW1hdGlvblxuICAgIHRoaXMuc2NlbmUub25BZnRlclJlbmRlck9ic2VydmFibGUuYWRkKFxuICAgICAgKGV2ZW50RGF0YTogU2NlbmUsIGV2ZW50U3RhdGU6IEV2ZW50U3RhdGUpID0+IHtcbiAgICAgICAgdGhpcy5fYWZ0ZXJSZW5kZXJGdW5jKGV2ZW50RGF0YSwgZXZlbnRTdGF0ZSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlUmVzaXplKCkge1xuICBcdC8vKiBUT0RPOiBQYXRjaGVkLlxuICAgIC8vIHRoaXMuZW5naW5lLmdldFJlbmRlcmluZ0NhbnZhcygpLm9ucmVzaXplID0gKCkgPT4ge1xuICAgIHRoaXMuZW5naW5lLmdldFJlbmRlcmluZ0NhbnZhcygpIS5vbnJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuZW5naW5lLnJlc2l6ZSgpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHNldHVwU2hhZG93R2VuZXJhdG9yKHNoYWRvd0dlbmVyYXRvcjogYW55KSB7XG4gICAgc2hhZG93R2VuZXJhdG9yLnVzZVBlcmNlbnRhZ2VDbG9zZXJGaWx0ZXJpbmcgPSB0cnVlO1xuICAgIHNoYWRvd0dlbmVyYXRvci5maWx0ZXJpbmdRdWFsaXR5ID0gU2hhZG93R2VuZXJhdG9yLlFVQUxJVFlfSElHSDtcbiAgfVxuXG4gIC8vIFRPRE8gVW5yZWdpc3RlclxuICBwcml2YXRlIHJlZ2lzdGVyVnJtRXh0ZW5zaW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCByZWdpc3RlclZybUV4dGVuc2lvbigpXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiVlJNTG9hZGVyRXh0ZW5zaW9uLk5BTUU6IFwiLCBWUk1Mb2FkZXJFeHRlbnNpb24uTkFNRSk7XG5cbiAgICAvLyDjg63jg7zjg4Djg7zjgavnmbvpjLLjgZnjgotcbiAgICBHTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKFZSTUxvYWRlckV4dGVuc2lvbi5OQU1FLCAobG9hZGVyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImxvYWRlcjogXCIsIGxvYWRlcik7XG4gICAgICBjb25zb2xlLmxvZyhcInRoaXM6IFwiLCB0aGlzKTtcbiAgICAgIHJldHVybiBuZXcgVlJNTG9hZGVyRXh0ZW5zaW9uKGxvYWRlciwgdGhpcyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyVnJtUGx1Z2luKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2FsbCByZWdpc3RlclZybVBsdWdpbigpXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiU2NlbmVMb2FkZXI6IFwiLCBTY2VuZUxvYWRlcik7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBcIlNjZW5lTG9hZGVyLkdldFBsdWdpbkZvckV4dGVuc2lvbigudnJtKS5uYW1lOiBcIixcbiAgICAgIFNjZW5lTG9hZGVyLkdldFBsdWdpbkZvckV4dGVuc2lvbihcIi52cm1cIikubmFtZVxuICAgICk7XG5cbiAgICAvLyBpZiAoXG4gICAgLy8gICBTY2VuZUxvYWRlciAmJlxuICAgIC8vICAgU2NlbmVMb2FkZXIuR2V0UGx1Z2luRm9yRXh0ZW5zaW9uKFwiLnZybVwiKS5uYW1lID09PSBcInZybVwiXG4gICAgLy8gKSB7XG4gICAgaWYgKFNjZW5lTG9hZGVyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInRyeSB0byBjYWxsIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKClcIik7XG4gICAgICBjb25zb2xlLmxvZyhcInRoaXMuX3ZybUZpbGVMb2FkZXI6IFwiLCB0aGlzLl92cm1GaWxlTG9hZGVyKTtcbiAgICAgIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKHRoaXMuX3ZybUZpbGVMb2FkZXIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBSZW5kZXJpbmdQaXBlbGluZSgpIHtcbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZS5zYW1wbGVzID0gNDtcbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZS5kZXB0aE9mRmllbGRFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZS5kZXB0aE9mRmllbGRCbHVyTGV2ZWwgPVxuICAgICAgRGVwdGhPZkZpZWxkRWZmZWN0Qmx1ckxldmVsLk1lZGl1bTtcbiAgICB0aGlzLl9yZW5kZXJpbmdQaXBlbGluZS5kZXB0aE9mRmllbGQuZm9jdXNEaXN0YW5jZSA9IDIwMDA7IC8vIGRpc3RhbmNlIG9mIHRoZSBjdXJyZW50IGZvY3VzIHBvaW50IGZyb20gdGhlIGNhbWVyYSBpbiBtaWxsaW1ldGVycyBjb25zaWRlcmluZyAxIHNjZW5lIHVuaXQgaXMgMSBtZXRlclxuICAgIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lLmRlcHRoT2ZGaWVsZC5mb2NhbExlbmd0aCA9IDEwOyAvLyBmb2NhbCBsZW5ndGggb2YgdGhlIGNhbWVyYSBpbiBtaWxsaW1ldGVyc1xuICAgIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lLmRlcHRoT2ZGaWVsZC5mU3RvcCA9IDEuNDsgLy8gYWthIEYgbnVtYmVyIG9mIHRoZSBjYW1lcmEgZGVmaW5lZCBpbiBzdG9wcyBhcyBpdCB3b3VsZCBiZSBvbiBhIHBoeXNpY2FsIGRldmljZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFYzRENvcmU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt2M2RfY29yZVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt2M2RfY29yZVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc35tYWluXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LXRlc3QudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==