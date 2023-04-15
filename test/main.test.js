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
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper.ts":
/*!***********************!*\
  !*** ./src/helper.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialValueBindingMerger": () => (/* binding */ MaterialValueBindingMerger)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/core */ "./node_modules/@babylonjs/core/index.js");
/* harmony import */ var _shader_babylon_mtoon_material_src__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shader/babylon-mtoon-material/src */ "./src/shader/babylon-mtoon-material/src/index.ts");


//* TODO: Handle later.
// import { MToonMaterial } from 'babylon-mtoon-material';

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
            if (material instanceof _shader_babylon_mtoon_material_src__WEBPACK_IMPORTED_MODULE_2__.MToonMaterial || material instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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
        // console.log('call constructor()');
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
        // GLTFLoader has already added rootMesh as __root__ before load extension
        // @see glTFLoader._loadData
        this.meshesFrom = this.loader.babylonScene.meshes.length - 1;
        this.transformNodesFrom = this.loader.babylonScene.transformNodes.length;
        this.materialsFrom = this.loader.babylonScene.materials.length;
        //*---------------------------------------------------------------------
        //* TODO: Patched.
        this.addLoaderObserver(this.v3DCore);
        this.onLoadedCallBack = () => {
            // console.log('call this.onLoadedCallBack()');
            // console.log('this.manager: ', this.manager);
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
        // console.log('call onReady()');
        // console.log('this.loader: ', this.loader);
        if (!this.loader.gltf.extensions || !this.loader.gltf.extensions[NAME]) {
            // console.log('call return');
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
        // console.log('try to call observer.onLoadReady()');
        for (const observer of this.loaderObservers) {
            // console.log('observer: ', observer);
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

"use strict";
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

"use strict";
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

"use strict";
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
    getHeadBoneCameraPosition() {
        const firstPersonBone = this.getBone("head");
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
    getBone(name) {
        return this.transformNodeMap[name] || null;
    }
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VRMMaterialGenerator": () => (/* binding */ VRMMaterialGenerator)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "./node_modules/@babylonjs/core/Maths/math.js");
/* harmony import */ var _shader_babylon_mtoon_material_src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shader/babylon-mtoon-material/src */ "./src/shader/babylon-mtoon-material/src/index.ts");
/* harmony import */ var _vrm_interfaces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vrm-interfaces */ "./src/importer/babylon-vrm-loader/src/vrm-interfaces.ts");
/* harmony import */ var _babylonjs_core_Engines_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core/Engines/engine */ "./node_modules/@babylonjs/core/Engines/engine.js");

//* TODO: Handle later.
// import { MToonMaterial } from 'babylon-mtoon-material';



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
        if (newMaterial instanceof _shader_babylon_mtoon_material_src__WEBPACK_IMPORTED_MODULE_1__.MToonMaterial) {
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
            const mtoonMaterial = new _shader_babylon_mtoon_material_src__WEBPACK_IMPORTED_MODULE_1__.MToonMaterial(material.name || `MToonMaterial${material.index}`, this.loader.babylonScene);
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

"use strict";
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
/* harmony import */ var _importer_babylon_vrm_loader_src_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./importer/babylon-vrm-loader/src/index */ "./src/importer/babylon-vrm-loader/src/vrm-file-loader.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./index */ "./src/index.ts");










// import "@babylonjs/core/Helpers/sceneHelpers";
// import "@babylonjs/core/Meshes/Builders/sphereBuilder";
// import "@babylonjs/core/Meshes/Builders/torusKnotBuilder";
// import "@babylonjs/inspector";
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
    const v3DCore = new _index__WEBPACK_IMPORTED_MODULE_10__.V3DCore(engine, scene, camera);
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
        _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__.SceneLoader.RegisterPlugin(new _importer_babylon_vrm_loader_src_index__WEBPACK_IMPORTED_MODULE_11__.VRMFileLoader());
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
        _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_7__.SceneLoader.RegisterPlugin(new _importer_babylon_vrm_loader_src_index__WEBPACK_IMPORTED_MODULE_11__.VRMFileLoader());
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./src/shader/babylon-mtoon-material/src/index.ts":
/*!********************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CullMode": () => (/* reexport safe */ _mtoon_material__WEBPACK_IMPORTED_MODULE_0__.CullMode),
/* harmony export */   "DebugMode": () => (/* reexport safe */ _mtoon_material__WEBPACK_IMPORTED_MODULE_0__.DebugMode),
/* harmony export */   "MToonMaterial": () => (/* reexport safe */ _mtoon_material__WEBPACK_IMPORTED_MODULE_0__.MToonMaterial),
/* harmony export */   "OutlineColorMode": () => (/* reexport safe */ _mtoon_material__WEBPACK_IMPORTED_MODULE_0__.OutlineColorMode),
/* harmony export */   "OutlineWidthMode": () => (/* reexport safe */ _mtoon_material__WEBPACK_IMPORTED_MODULE_0__.OutlineWidthMode)
/* harmony export */ });
/* harmony import */ var _mtoon_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mtoon-material */ "./src/shader/babylon-mtoon-material/src/mtoon-material.ts");



/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/inspectable-custom-properties.ts":
/*!********************************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/inspectable-custom-properties.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getInspectableCustomProperties": () => (/* binding */ getInspectableCustomProperties)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Misc/iInspectable */ "./node_modules/@babylonjs/core/Misc/iInspectable.js");

/**
 * MToonMaterial に Inspector 上で調整可能なパラメータを設定する
 * @link https://doc.babylonjs.com/toolsAndResources/tools/inspector#extensibility
 */
function getInspectableCustomProperties() {
    return [
        {
            label: 'DiffuseColor',
            propertyName: 'diffuseColor',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Color3,
        },
        {
            label: 'AmbientColor',
            propertyName: 'ambientColor',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Color3,
        },
        {
            label: 'EmissiveColor',
            propertyName: 'emissiveColor',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Color3,
        },
        {
            label: 'ShadeColor',
            propertyName: 'shadeColor',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Color3,
        },
        {
            label: 'RimColor',
            propertyName: 'rimColor',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Color3,
        },
        {
            label: 'OutlineColor',
            propertyName: 'outlineColor',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Color3,
        },
        {
            label: 'ReceiveShadowRate',
            propertyName: 'receiveShadowRate',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 1,
            step: 0.01,
        },
        {
            label: 'ShadingGradeRate',
            propertyName: 'shadingGradeRate',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 1,
            step: 0.01,
        },
        {
            label: 'ShadeShift',
            propertyName: 'shadeShift',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: -1,
            max: 1,
            step: 0.01,
        },
        {
            label: 'ShadeToony',
            propertyName: 'shadeToony',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 1,
            step: 0.01,
        },
        {
            label: 'LightColorAttenuation',
            propertyName: 'lightColorAttenuation',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 1,
            step: 0.01,
        },
        {
            label: 'IndirectLightIntensity',
            propertyName: 'indirectLightIntensity',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 1,
            step: 0.01,
        },
        {
            label: 'RimLightingMix',
            propertyName: 'rimLightingMix',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 1,
            step: 0.01,
        },
        {
            label: 'RimFresnelPower',
            propertyName: 'rimFresnelPower',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0.01,
            max: 100,
            step: 4,
        },
        {
            label: 'RimLift',
            propertyName: 'rimLift',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0.0,
            max: 1,
            step: 0.01,
        },
        {
            label: 'OutlineWidth',
            propertyName: 'outlineWidth',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0.01,
            max: 1,
            step: 0.01,
        },
        {
            label: 'OutlineScaledMaxDistance',
            propertyName: 'outlineScaledMaxDistance',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 1.0,
            max: 10.0,
            step: 0.01,
        },
        {
            label: 'OutlineLightingMix',
            propertyName: 'outlineLightingMix',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 1,
            step: 0.01,
        },
        {
            label: 'DebugMode',
            propertyName: 'debugMode',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 2,
            step: 1,
        },
        {
            label: 'OutlineWidthMode',
            propertyName: 'outlineWidthMode',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 2,
            step: 1,
        },
        {
            label: 'OutlineColorMode',
            propertyName: 'outlineColorMode',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 1,
            step: 1,
        },
        {
            label: 'CullMode',
            propertyName: 'cullMode',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 2,
            step: 1,
        },
        {
            label: 'OutlineCullMode',
            propertyName: 'outlineCullMode',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 2,
            step: 1,
        },
        {
            label: 'AlphaCutOff',
            propertyName: 'alphaCutOff',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: 0,
            max: 1,
            step: 0.01,
        },
        {
            label: 'UV Animation Scroll X',
            propertyName: 'uvAnimationScrollX',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: -1,
            max: 1,
            step: 0.1,
        },
        {
            label: 'UV Animation Scroll Y',
            propertyName: 'uvAnimationScrollY',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: -1,
            max: 1,
            step: 0.1,
        },
        {
            label: 'UV Animation Rotation',
            propertyName: 'uvAnimationRotation',
            type: _babylonjs_core_Misc_iInspectable__WEBPACK_IMPORTED_MODULE_0__.InspectableType.Slider,
            min: -0.5,
            max: 0.5,
            step: 0.01,
        },
    ];
}


/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/mtoon-material-defines.ts":
/*!*************************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/mtoon-material-defines.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MToonMaterialDefines": () => (/* binding */ MToonMaterialDefines)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_Materials_materialDefines__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Materials/materialDefines */ "./node_modules/@babylonjs/core/Materials/materialDefines.js");
/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Material Defines
 */
class MToonMaterialDefines extends _babylonjs_core_Materials_materialDefines__WEBPACK_IMPORTED_MODULE_0__.MaterialDefines {
    /**
     * @inheritdoc
     */
    constructor(externalProperties) {
        super(externalProperties);
        /** @see light-fragment.frag */
        this.CUSTOMUSERLIGHTING = true;
        // MToon Specific
        this.MTOON_OUTLINE_WIDTH_WORLD = false;
        this.MTOON_OUTLINE_WIDTH_SCREEN = false;
        this.MTOON_OUTLINE_COLOR_FIXED = false;
        this.MTOON_OUTLINE_COLOR_MIXED = false;
        this.MTOON_DEBUG_NORMAL = false;
        this.MTOON_DEBUG_LITSHADERRATE = false;
        // MToon textures
        this.SHADE = false;
        this.SHADEDIRECTUV = 0;
        this.RECEIVE_SHADOW = false;
        this.RECEIVE_SHADOWDIRECTUV = 0;
        this.SHADING_GRADE = false;
        this.SHADING_GRADEDIRECTUV = 0;
        this.RIM = false;
        this.RIMDIRECTUV = 0;
        this.MATCAP = false;
        this.MATCAPDIRECTUV = 0;
        this.OUTLINE_WIDTH = false;
        this.OUTLINE_WIDTHDIRECTUV = 0;
        this.UV_ANIMATION_MASK = false;
        this.UV_ANIMATION_MASKDIRECTUV = 0;
        // Misc
        this.MAINUV1 = false;
        this.MAINUV2 = false;
        this.MAINUV3 = false;
        this.MAINUV4 = false;
        this.MAINUV5 = false;
        this.MAINUV6 = false;
        this.DIFFUSE = false;
        this.DIFFUSEDIRECTUV = 0;
        this.BAKED_VERTEX_ANIMATION_TEXTURE = false;
        // public AMBIENT = false;
        // public AMBIENTDIRECTUV = 0;
        // public OPACITY = false;
        // public OPACITYDIRECTUV = 0;
        // public OPACITYRGB = false;
        // public REFLECTION = false;
        this.EMISSIVE = false;
        this.EMISSIVEDIRECTUV = 0;
        // public SPECULAR = false;
        // public SPECULARDIRECTUV = 0;
        this.BUMP = false;
        this.BUMPDIRECTUV = 0;
        this.PARALLAX = false;
        this.PARALLAXOCCLUSION = false;
        // public SPECULAROVERALPHA = false;
        this.CLIPPLANE = false;
        this.CLIPPLANE2 = false;
        this.CLIPPLANE3 = false;
        this.CLIPPLANE4 = false;
        this.CLIPPLANE5 = false;
        this.CLIPPLANE6 = false;
        this.ALPHATEST = false;
        this.DEPTHPREPASS = false;
        this.ALPHAFROMDIFFUSE = false;
        this.POINTSIZE = false;
        this.FOG = false;
        // public SPECULARTERM = false;
        // public DIFFUSEFRESNEL = false;
        // public OPACITYFRESNEL = false;
        // public REFLECTIONFRESNEL = false;
        // public REFRACTIONFRESNEL = false;
        // public EMISSIVEFRESNEL = false;
        // public FRESNEL = false;
        this.NORMAL = false;
        // public TANGENT = false;
        this.UV1 = false;
        this.UV2 = false;
        this.UV3 = false;
        this.UV4 = false;
        this.UV5 = false;
        this.UV6 = false;
        this.VERTEXCOLOR = false;
        this.VERTEXALPHA = false;
        this.NUM_BONE_INFLUENCERS = 0;
        this.BonesPerMesh = 0;
        this.BONETEXTURE = false;
        this.BONES_VELOCITY_ENABLED = false;
        this.INSTANCES = false;
        this.THIN_INSTANCES = false;
        // public INSTANCESCOLOR = false;
        // public GLOSSINESS = false;
        // public ROUGHNESS = false;
        // public EMISSIVEASILLUMINATION = false;
        // public LINKEMISSIVEWITHDIFFUSE = false;
        // public REFLECTIONFRESNELFROMSPECULAR = false;
        // public LIGHTMAP = false;
        // public LIGHTMAPDIRECTUV = 0;
        this.OBJECTSPACE_NORMALMAP = false;
        // public USELIGHTMAPASSHADOWMAP = false;
        // public REFLECTIONMAP_3D = false;
        // public REFLECTIONMAP_SPHERICAL = false;
        // public REFLECTIONMAP_PLANAR = false;
        // public REFLECTIONMAP_CUBIC = false;
        // public USE_LOCAL_REFLECTIONMAP_CUBIC = false;
        // public USE_LOCAL_REFRACTIONMAP_CUBIC = false;
        // public REFLECTIONMAP_PROJECTION = false;
        // public REFLECTIONMAP_SKYBOX = false;
        // public REFLECTIONMAP_EXPLICIT = false;
        // public REFLECTIONMAP_EQUIRECTANGULAR = false;
        // public REFLECTIONMAP_EQUIRECTANGULAR_FIXED = false;
        // public REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = false;
        // public REFLECTIONMAP_OPPOSITEZ = false;
        // public INVERTCUBICMAP = false;
        this.LOGARITHMICDEPTH = false;
        // public REFRACTION = false;
        // public REFRACTIONMAP_3D = false;
        // public REFLECTIONOVERALPHA = false;
        this.TWOSIDEDLIGHTING = false;
        this.SHADOWFLOAT = false;
        this.MORPHTARGETS = false;
        this.MORPHTARGETS_NORMAL = false;
        this.MORPHTARGETS_TANGENT = false;
        this.MORPHTARGETS_UV = false;
        this.NUM_MORPH_INFLUENCERS = 0;
        this.MORPHTARGETS_TEXTURE = false;
        this.NONUNIFORMSCALING = false; // https://playground.babylonjs.com#V6DWIH
        this.PREMULTIPLYALPHA = false; // https://playground.babylonjs.com#LNVJJ7
        this.ALPHATEST_AFTERALLALPHACOMPUTATIONS = false;
        this.ALPHABLEND = true;
        this.PREPASS = false;
        this.PREPASS_IRRADIANCE = false;
        this.PREPASS_IRRADIANCE_INDEX = -1;
        this.PREPASS_ALBEDO_SQRT = false;
        this.PREPASS_ALBEDO_SQRT_INDEX = -1;
        this.PREPASS_DEPTH = false;
        this.PREPASS_DEPTH_INDEX = -1;
        this.PREPASS_NORMAL = false;
        this.PREPASS_NORMAL_INDEX = -1;
        this.PREPASS_POSITION = false;
        this.PREPASS_POSITION_INDEX = -1;
        this.PREPASS_VELOCITY = false;
        this.PREPASS_VELOCITY_INDEX = -1;
        this.PREPASS_REFLECTIVITY = false;
        this.PREPASS_REFLECTIVITY_INDEX = -1;
        this.SCENE_MRT_COUNT = 0;
        // public RGBDLIGHTMAP = false;
        // public RGBDREFLECTION = false;
        // public RGBDREFRACTION = false;
        this.IMAGEPROCESSING = false;
        this.VIGNETTE = false;
        this.VIGNETTEBLENDMODEMULTIPLY = false;
        this.VIGNETTEBLENDMODEOPAQUE = false;
        this.TONEMAPPING = false;
        this.TONEMAPPING_ACES = false;
        this.CONTRAST = false;
        this.COLORCURVES = false;
        this.COLORGRADING = false;
        this.COLORGRADING3D = false;
        this.SAMPLER3DGREENDEPTH = false;
        this.SAMPLER3DBGRMAP = false;
        this.IMAGEPROCESSINGPOSTPROCESS = false;
        this.SKIPFINALCOLORCLAMP = false;
        this.MULTIVIEW = false;
        this.ORDER_INDEPENDENT_TRANSPARENCY = false;
        this.ORDER_INDEPENDENT_TRANSPARENCY_16BITS = false;
        // /**
        //  * If the reflection texture on this material is in linear color space
        //  * @hidden
        //  */
        this.IS_REFLECTION_LINEAR = false;
        // /**
        //  * If the refraction texture on this material is in linear color space
        //  * @hidden
        //  */
        this.IS_REFRACTION_LINEAR = false;
        this.EXPOSURE = false;
        this.FLIP_U = false;
        this.FLIP_V = false;
        this.rebuild();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setReflectionMode(modeToEnable) {
        throw new Error('This material cannot use `setReflectionMode`');
    }
}


/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/mtoon-material.ts":
/*!*****************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/mtoon-material.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CullMode": () => (/* binding */ CullMode),
/* harmony export */   "DebugMode": () => (/* binding */ DebugMode),
/* harmony export */   "MToonMaterial": () => (/* binding */ MToonMaterial),
/* harmony export */   "OutlineColorMode": () => (/* binding */ OutlineColorMode),
/* harmony export */   "OutlineWidthMode": () => (/* binding */ OutlineWidthMode)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Misc/decorators */ "./node_modules/@babylonjs/core/Misc/decorators.js");
/* harmony import */ var _babylonjs_core_Misc_smartArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/core/Misc/smartArray */ "./node_modules/@babylonjs/core/Misc/smartArray.js");
/* harmony import */ var _babylonjs_core_scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core/scene */ "./node_modules/@babylonjs/core/scene.js");
/* harmony import */ var _babylonjs_core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babylonjs/core/Maths/math.vector */ "./node_modules/@babylonjs/core/Maths/math.vector.js");
/* harmony import */ var _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babylonjs/core/Maths/math.color */ "./node_modules/@babylonjs/core/Maths/math.color.js");
/* harmony import */ var _babylonjs_core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babylonjs/core/Buffers/buffer */ "./node_modules/@babylonjs/core/Buffers/buffer.js");
/* harmony import */ var _babylonjs_core_Materials_imageProcessingConfiguration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babylonjs/core/Materials/imageProcessingConfiguration */ "./node_modules/@babylonjs/core/Materials/imageProcessingConfiguration.js");
/* harmony import */ var _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babylonjs/core/Materials/material */ "./node_modules/@babylonjs/core/Materials/material.js");
/* harmony import */ var _babylonjs_core_Materials_pushMaterial__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babylonjs/core/Materials/pushMaterial */ "./node_modules/@babylonjs/core/Materials/pushMaterial.js");
/* harmony import */ var _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babylonjs/core/Materials/materialHelper */ "./node_modules/@babylonjs/core/Materials/materialHelper.js");
/* harmony import */ var _babylonjs_core_Engines_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babylonjs/core/Engines/constants */ "./node_modules/@babylonjs/core/Engines/constants.js");
/* harmony import */ var _babylonjs_core_Materials_effectFallbacks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babylonjs/core/Materials/effectFallbacks */ "./node_modules/@babylonjs/core/Materials/effectFallbacks.js");
/* harmony import */ var _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babylonjs/core/Materials/effect */ "./node_modules/@babylonjs/core/Materials/effect.js");
/* harmony import */ var _babylonjs_core_Materials_material_detailMapConfiguration__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babylonjs/core/Materials/material.detailMapConfiguration */ "./node_modules/@babylonjs/core/Materials/material.detailMapConfiguration.js");
/* harmony import */ var _babylonjs_core_Materials_materialPluginEvent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babylonjs/core/Materials/materialPluginEvent */ "./node_modules/@babylonjs/core/Materials/materialPluginEvent.js");
/* harmony import */ var _inspectable_custom_properties__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./inspectable-custom-properties */ "./src/shader/babylon-mtoon-material/src/inspectable-custom-properties.ts");
/* harmony import */ var _mtoon_outline_renderer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./mtoon-outline-renderer */ "./src/shader/babylon-mtoon-material/src/mtoon-outline-renderer.ts");
/* harmony import */ var _mtoon_material_defines__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./mtoon-material-defines */ "./src/shader/babylon-mtoon-material/src/mtoon-material-defines.ts");
/* harmony import */ var _shaders_ubo_declaration_vert__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./shaders/ubo-declaration.vert */ "./src/shader/babylon-mtoon-material/src/shaders/ubo-declaration.vert");
/* harmony import */ var _shaders_ubo_declaration_vert__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_shaders_ubo_declaration_vert__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _shaders_vertex_declaration_vert__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./shaders/vertex-declaration.vert */ "./src/shader/babylon-mtoon-material/src/shaders/vertex-declaration.vert");
/* harmony import */ var _shaders_vertex_declaration_vert__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_shaders_vertex_declaration_vert__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _shaders_fragment_declaration_frag__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./shaders/fragment-declaration.frag */ "./src/shader/babylon-mtoon-material/src/shaders/fragment-declaration.frag");
/* harmony import */ var _shaders_fragment_declaration_frag__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_shaders_fragment_declaration_frag__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _shaders_mtoon_fragment_functions_frag__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./shaders/mtoon-fragment-functions.frag */ "./src/shader/babylon-mtoon-material/src/shaders/mtoon-fragment-functions.frag");
/* harmony import */ var _shaders_mtoon_fragment_functions_frag__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_shaders_mtoon_fragment_functions_frag__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _shaders_bump_fragment_frag__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./shaders/bump-fragment.frag */ "./src/shader/babylon-mtoon-material/src/shaders/bump-fragment.frag");
/* harmony import */ var _shaders_bump_fragment_frag__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_shaders_bump_fragment_frag__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _shaders_light_fragment_frag__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./shaders/light-fragment.frag */ "./src/shader/babylon-mtoon-material/src/shaders/light-fragment.frag");
/* harmony import */ var _shaders_light_fragment_frag__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_shaders_light_fragment_frag__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _shaders_mtoon_vert__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./shaders/mtoon.vert */ "./src/shader/babylon-mtoon-material/src/shaders/mtoon.vert");
/* harmony import */ var _shaders_mtoon_vert__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_shaders_mtoon_vert__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _shaders_mtoon_frag__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./shaders/mtoon.frag */ "./src/shader/babylon-mtoon-material/src/shaders/mtoon.frag");
/* harmony import */ var _shaders_mtoon_frag__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_shaders_mtoon_frag__WEBPACK_IMPORTED_MODULE_25__);







// import { PrePassConfiguration } from "./prePassConfiguration";












const onCreatedEffectParameters = { effect: null, subMesh: null };








/**
 * Debug shading mode
 */
var DebugMode;
(function (DebugMode) {
    DebugMode[DebugMode["None"] = 0] = "None";
    DebugMode[DebugMode["Normal"] = 1] = "Normal";
    DebugMode[DebugMode["LitShadeRate"] = 2] = "LitShadeRate";
})(DebugMode || (DebugMode = {}));
/**
 * Outline color mode
 */
var OutlineColorMode;
(function (OutlineColorMode) {
    OutlineColorMode[OutlineColorMode["FixedColor"] = 0] = "FixedColor";
    OutlineColorMode[OutlineColorMode["MixedLighting"] = 1] = "MixedLighting";
})(OutlineColorMode || (OutlineColorMode = {}));
/**
 * Outline width mode
 */
var OutlineWidthMode;
(function (OutlineWidthMode) {
    OutlineWidthMode[OutlineWidthMode["None"] = 0] = "None";
    OutlineWidthMode[OutlineWidthMode["WorldCorrdinates"] = 1] = "WorldCorrdinates";
    OutlineWidthMode[OutlineWidthMode["ScreenCoordinates"] = 2] = "ScreenCoordinates";
})(OutlineWidthMode || (OutlineWidthMode = {}));
/**
 * Cull mode
 */
var CullMode;
(function (CullMode) {
    CullMode[CullMode["Off"] = 0] = "Off";
    CullMode[CullMode["Front"] = 1] = "Front";
    CullMode[CullMode["Back"] = 2] = "Back";
})(CullMode || (CullMode = {}));
/**
 * MToon は日本のアニメ的表現をすることを目標としています。
 * 主色 (Lit Color) と陰色 (Shade Color) の 2 色を、Lighting パラメータや光源環境に応じて混合することでそれを実現します。
 * VRM での出力パラメータとプロパティのマッピングは下記となります。
 *
 * MToon aims for making Japanese anime expressions.
 * It is achieved by mixing Lit Color and Shade Color based on Lighting parameters and light source environment.
 *
 * @see https://github.com/Santarh/MToon/
 * @see https://vrm.dev/univrm/shaders/mtoon/
 * @see https://doc.babylonjs.com/babylon101/materials
 */
class MToonMaterial extends _babylonjs_core_Materials_pushMaterial__WEBPACK_IMPORTED_MODULE_8__.PushMaterial {
    /**
     * the list of textures
     *
     * @returns {Array<Nullable<BaseTexture>>}
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    get appendedTextures() {
        return [
            this._diffuseTexture,
            this._emissiveTexture,
            this._bumpTexture,
            this._shadeTexture,
            this._receiveShadowTexture,
            this._shadingGradeTexture,
            this._rimTexture,
            this._matCapTexture,
            this._outlineWidthTexture,
            this._uvAnimationMaskTexture,
        ];
    }
    /**
     * the list of active textures
     *
     * @returns {BaseTexture[]}
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    get appendedActiveTextures() {
        return this.appendedTextures.filter((t) => t !== null);
    }
    /**
     * Gets the image processing configuration used either in this material.
     */
    get imageProcessingConfiguration() {
        return this._imageProcessingConfiguration;
    }
    /**
     * Sets the Default image processing configuration used either in the this material.
     *
     * If sets to null, the scene one is in use.
     */
    set imageProcessingConfiguration(value) {
        this._attachImageProcessingConfiguration(value);
        // Ensure the effect will be rebuilt.
        this._markAllSubMeshesAsTexturesDirty();
    }
    /**
     * Attaches a new image processing configuration to the Standard Material.
     * @param configuration
     */
    _attachImageProcessingConfiguration(configuration) {
        if (configuration === this._imageProcessingConfiguration) {
            return;
        }
        // Detaches observer
        if (this._imageProcessingConfiguration && this._imageProcessingObserver) {
            this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver);
        }
        // Pick the scene configuration if needed
        if (!configuration) {
            this._imageProcessingConfiguration = this.getScene().imageProcessingConfiguration;
        }
        else {
            this._imageProcessingConfiguration = configuration;
        }
        // Attaches observer
        if (this._imageProcessingConfiguration) {
            this._imageProcessingObserver = this._imageProcessingConfiguration.onUpdateParameters.add(() => {
                this._markAllSubMeshesAsImageProcessingDirty();
            });
        }
    }
    // /**
    //  * Defines additional PrePass parameters for the material.
    //  */
    // public readonly prePassConfiguration: PrePassConfiguration;
    /**
     * Can this material render to prepass
     * No support for PrePass
     */
    get isPrePassCapable() {
        // return !this.disableDepthWrite;
        return false;
    }
    /**
     * Gets whether the color curves effect is enabled.
     */
    get cameraColorCurvesEnabled() {
        return this.imageProcessingConfiguration.colorCurvesEnabled;
    }
    /**
     * Sets whether the color curves effect is enabled.
     */
    set cameraColorCurvesEnabled(value) {
        this.imageProcessingConfiguration.colorCurvesEnabled = value;
    }
    /**
     * Gets whether the color grading effect is enabled.
     */
    get cameraColorGradingEnabled() {
        return this.imageProcessingConfiguration.colorGradingEnabled;
    }
    /**
     * Gets whether the color grading effect is enabled.
     */
    set cameraColorGradingEnabled(value) {
        this.imageProcessingConfiguration.colorGradingEnabled = value;
    }
    /**
     * Gets whether tonemapping is enabled or not.
     */
    get cameraToneMappingEnabled() {
        return this._imageProcessingConfiguration.toneMappingEnabled;
    }
    /**
     * Sets whether tonemapping is enabled or not
     */
    set cameraToneMappingEnabled(value) {
        this._imageProcessingConfiguration.toneMappingEnabled = value;
    }
    /**
     * The camera exposure used on this material.
     * This property is here and not in the camera to allow controlling exposure without full screen post process.
     * This corresponds to a photographic exposure.
     */
    get cameraExposure() {
        return this._imageProcessingConfiguration.exposure;
    }
    /**
     * The camera exposure used on this material.
     * This property is here and not in the camera to allow controlling exposure without full screen post process.
     * This corresponds to a photographic exposure.
     */
    set cameraExposure(value) {
        this._imageProcessingConfiguration.exposure = value;
    }
    /**
     * Gets The camera contrast used on this material.
     */
    get cameraContrast() {
        return this._imageProcessingConfiguration.contrast;
    }
    /**
     * Sets The camera contrast used on this material.
     */
    set cameraContrast(value) {
        this._imageProcessingConfiguration.contrast = value;
    }
    /**
     * Gets the Color Grading 2D Lookup Texture.
     */
    get cameraColorGradingTexture() {
        return this._imageProcessingConfiguration.colorGradingTexture;
    }
    /**
     * Sets the Color Grading 2D Lookup Texture.
     */
    set cameraColorGradingTexture(value) {
        this._imageProcessingConfiguration.colorGradingTexture = value;
    }
    /**
     * The color grading curves provide additional color adjustmnent that is applied after any color grading transform (3D LUT).
     * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
     * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
     * corresponding to low luminance, medium luminance, and high luminance areas respectively.
     */
    get cameraColorCurves() {
        return this._imageProcessingConfiguration.colorCurves;
    }
    /**
     * The color grading curves provide additional color adjustment that is applied after any color grading transform (3D LUT).
     * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
     * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
     * corresponding to low luminance, medium luminance, and high luminance areas respectively.
     */
    set cameraColorCurves(value) {
        this._imageProcessingConfiguration.colorCurves = value;
    }
    /**
     * Can this material render to several textures at once
     */
    get canRenderToMRT() {
        return true;
    }
    get bumpScale() {
        return this._bumpScale;
    }
    set bumpScale(value) {
        this._bumpScale = value;
    }
    get receiveShadowRate() {
        return this._receiveShadowRate;
    }
    set receiveShadowRate(value) {
        this._receiveShadowRate = Math.max(0.0, Math.min(1.0, value));
        this._markAllSubMeshesAsLightsDirty();
    }
    get shadingGradeRate() {
        return this._shadingGradeRate;
    }
    set shadingGradeRate(value) {
        this._shadingGradeRate = Math.max(0.0, Math.min(1.0, value));
        this._markAllSubMeshesAsLightsDirty();
    }
    get shadeShift() {
        return this._shadeShift;
    }
    set shadeShift(value) {
        this._shadeShift = Math.max(-1.0, Math.min(1.0, value));
        this._markAllSubMeshesAsLightsDirty();
    }
    get shadeToony() {
        return this._shadeToony;
    }
    set shadeToony(value) {
        this._shadeToony = Math.max(0.0, Math.min(1.0, value));
        this._markAllSubMeshesAsLightsDirty();
    }
    get lightColorAttenuation() {
        return this._lightColorAttenuation;
    }
    set lightColorAttenuation(value) {
        this._lightColorAttenuation = Math.max(0.0, Math.min(1.0, value));
        this._markAllSubMeshesAsLightsDirty();
    }
    get indirectLightIntensity() {
        return this._indirectLightIntensity;
    }
    set indirectLightIntensity(value) {
        this._indirectLightIntensity = Math.max(0.0, Math.min(1.0, value));
        this._markAllSubMeshesAsLightsDirty();
    }
    get rimLightingMix() {
        return this._rimLightingMix;
    }
    set rimLightingMix(value) {
        this._rimLightingMix = Math.max(0.0, Math.min(1.0, value));
        this._markAllSubMeshesAsLightsDirty();
    }
    get rimFresnelPower() {
        return this._rimFresnelPower;
    }
    set rimFresnelPower(value) {
        this._rimFresnelPower = Math.max(0.0, Math.min(100.0, value));
        this._markAllSubMeshesAsLightsDirty();
    }
    get rimLift() {
        return this._rimLift;
    }
    set rimLift(value) {
        this._rimLift = Math.max(0.0, Math.min(1.0, value));
        this._markAllSubMeshesAsLightsDirty();
    }
    get outlineWidth() {
        return this._outlineWidth;
    }
    set outlineWidth(value) {
        this._outlineWidth = Math.max(0.01, Math.min(1.0, value));
        this._markAllSubMeshesAsAttributesDirty();
    }
    get outlineScaledMaxDistance() {
        return this._outlineScaledMaxDistance;
    }
    set outlineScaledMaxDistance(value) {
        this._outlineScaledMaxDistance = Math.max(1.0, Math.min(10.0, value));
        this._markAllSubMeshesAsAttributesDirty();
    }
    get outlineLightingMix() {
        return this._outlineLightingMix;
    }
    set outlineLightingMix(value) {
        this._outlineLightingMix = Math.max(0.0, Math.min(1.0, value));
        this._markAllSubMeshesAsAttributesDirty();
    }
    get uvAnimationScrollX() {
        return this._uvAnimationScrollX;
    }
    set uvAnimationScrollX(value) {
        this._uvAnimationScrollX = value;
        this._markAllSubMeshesAsMiscDirty();
    }
    get uvAnimationScrollY() {
        return this._uvAnimationScrollY;
    }
    set uvAnimationScrollY(value) {
        this._uvAnimationScrollY = value;
        this._markAllSubMeshesAsMiscDirty();
    }
    get uvAnimationRotation() {
        return this._uvAnimationRotation;
    }
    set uvAnimationRotation(value) {
        this._uvAnimationRotation = value;
        this._markAllSubMeshesAsMiscDirty();
    }
    get alphaTest() {
        return this._alphaTest;
    }
    set alphaTest(value) {
        this._alphaTest = value;
        if (value) {
            if (this.alphaBlend) {
                this._transparencyMode = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.MATERIAL_ALPHATESTANDBLEND;
            }
            else {
                this._transparencyMode = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.MATERIAL_ALPHATEST;
            }
        }
        else {
            if (this.alphaBlend) {
                this._transparencyMode = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.MATERIAL_ALPHABLEND;
            }
            else {
                this._transparencyMode = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.MATERIAL_OPAQUE;
            }
        }
        this._markAllSubMeshesAsMiscDirty();
    }
    get alphaBlend() {
        return this._alphaBlend;
    }
    set alphaBlend(value) {
        this._alphaBlend = value;
        if (value) {
            this.backFaceCulling = true;
            if (this.alphaTest) {
                this._transparencyMode = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.MATERIAL_ALPHATESTANDBLEND;
            }
            else {
                this._transparencyMode = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.MATERIAL_ALPHABLEND;
            }
        }
        else {
            if (this.alphaTest) {
                this._transparencyMode = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.MATERIAL_ALPHATEST;
            }
            else {
                this._transparencyMode = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.MATERIAL_OPAQUE;
            }
        }
        this._markAllSubMeshesAsMiscDirty();
    }
    get outlineWidthMode() {
        return this._outlineWidthMode;
    }
    set outlineWidthMode(value) {
        this._outlineWidthMode = value;
        if (value !== OutlineWidthMode.None && !this.outlineRenderer) {
            /**
             * このマテリアル用のアウトラインレンダラーを生成する
             */
            this.outlineRenderer = new _mtoon_outline_renderer__WEBPACK_IMPORTED_MODULE_16__.MToonOutlineRenderer(this.getScene(), this);
        }
        this._markAllSubMeshesAsMiscDirty();
    }
    enableOutlineRender() {
        this.isOutline = 1.0;
    }
    disaableOutlineRender() {
        this.isOutline = 0.0;
    }
    get cullMode() {
        return this._cullMode;
    }
    set cullMode(value) {
        this._cullMode = value;
        switch (this._cullMode) {
            case CullMode.Off:
                // 両面を描画する
                this.backFaceCulling = false;
                this.sideOrientation = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.ClockWiseSideOrientation;
                this.twoSidedLighting = false;
                break;
            case CullMode.Front:
                // 表面を描画しない(=裏面だけ描画する)
                this.backFaceCulling = true;
                this.sideOrientation = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.CounterClockWiseSideOrientation;
                this.twoSidedLighting = true;
                break;
            case CullMode.Back:
                // 裏面を描画しない(=表面だけ描画する) デフォルト
                this.backFaceCulling = true;
                this.sideOrientation = _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.ClockWiseSideOrientation;
                this.twoSidedLighting = false;
                break;
        }
        this._markAllSubMeshesAsMiscDirty();
    }
    /**
     * アウトライン用 CullMode を設定
     * @hidden
     */
    applyOutlineCullMode() {
        this.storedCullMode = this.cullMode;
        this.cullMode = this._outlineCullMode;
    }
    /**
     * CullMode をリストア
     * @hidden
     */
    restoreOutlineCullMode() {
        this.cullMode = this.storedCullMode;
    }
    /**
     * @hidden
     */
    getOutlineRendererName() {
        if (!this.outlineRenderer) {
            return '';
        }
        return this.outlineRenderer.name;
    }
    //#endregion
    /**
     * {@inheritdoc}
     */
    constructor(name, scene) {
        super(name, scene);
        //#region Properties
        //#region Textures
        this._diffuseTexture = null;
        /**
         * The basic texture of the material as viewed under a light.
         */
        this.diffuseTexture = null;
        this._emissiveTexture = null;
        /**
         * Define texture of the material as if self lit.
         * This will be mixed in the final result even in the absence of light.
         */
        this.emissiveTexture = null;
        this._bumpTexture = null;
        /**
         * Bump mapping is a technique to simulate bump and dents on a rendered surface.
         * These are made by creating a normal map from an image. The means to do this can be found on the web, a search for 'normal map generator' will bring up free and paid for methods of doing this.
         * @see https://doc.babylonjs.com/how_to/more_materials#bump-map
         */
        this.bumpTexture = null;
        this._shadeTexture = null;
        /**
         * The basic texture of the material as viewed does not receive a light
         */
        this.shadeTexture = null;
        this._receiveShadowTexture = null;
        /**
         * Receiving shadow rate with texture
         * receiveShadowRate * texture.a
         */
        this.receiveShadowTexture = null;
        this._shadingGradeTexture = null;
        /**
         * Shading grade rate
         * shadingGradeRate * (1.0 - texture.r))
         */
        this.shadingGradeTexture = null;
        this._rimTexture = null;
        /**
         * Parametric Rim Lighting
         */
        this.rimTexture = null;
        this._matCapTexture = null;
        /**
         * MatCap Lighting
         */
        this.matCapTexture = null;
        this._outlineWidthTexture = null;
        /**
         * Adjust outline width
         */
        this.outlineWidthTexture = null;
        this._uvAnimationMaskTexture = null;
        /**
         * UV animation mask
         */
        this.uvAnimationMaskTexture = null;
        //#endregion
        //#region Colors
        /**
         * Multiplier of diffuseTexture
         */
        this.diffuseColor = new _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_4__.Color3(1.0, 1.0, 1.0);
        /**
         * babylon.js Ambient light
         */
        this.ambientColor = new _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_4__.Color3(0.0, 0.0, 0.0);
        /**
         * Emissive color
         */
        this.emissiveColor = new _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_4__.Color3(0.0, 0.0, 0.0);
        /**
         * Multiplier of shadeTexture
         */
        this.shadeColor = new _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_4__.Color3(0.97, 0.81, 0.86);
        /**
         * Rim color
         */
        this.rimColor = new _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_4__.Color3(0.0, 0.0, 0.0);
        /**
         * Outline color
         */
        this.outlineColor = new _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_4__.Color3(0.0, 0.0, 0.0);
        //#endregion
        //#region StandardMaterial parameters
        /**
         * If true, the emissive value is added into the end result, otherwise it is multiplied in.
         */
        this.useEmissiveAsIllumination = false;
        /**
         * If true, some kind of energy conservation will prevent the end result to be more than 1 by reducing
         * the emissive level when the final color is close to one.
         */
        this.linkEmissiveWithDiffuse = false;
        /**
         * Specifies that the material will keeps the reflection highlights over a transparent surface (only the most luminous ones).
         * A car glass is a good exemple of that. When the street lights reflects on it you can not see what is behind.
         */
        this.useReflectionOverAlpha = false;
        this._disableLighting = false;
        /**
         * Allows using an object space normal map (instead of tangent space).
         * No support
         */
        this.useObjectSpaceNormalMap = false;
        /**
         * Is parallax enabled or not.
         * @see https://doc.babylonjs.com/how_to/using_parallax_mapping
         * No support
         */
        this.useParallax = false;
        /**
         * Is parallax occlusion enabled or not.
         * If true, the outcome is way more realistic than traditional Parallax but you can expect a performance hit that worthes consideration.
         * @see https://doc.babylonjs.com/how_to/using_parallax_mapping
         * No support
         */
        this.useParallaxOcclusion = false;
        /**
         * No support for specular
         */
        this.specularSupported = false;
        /**
         * In case of light mapping, define whether the map contains light or shadow informations.
         * No support
         */
        this.useLightmapAsShadowmap = false;
        /**
         * No support for vertex colors
         */
        this.useVertexColor = false;
        /**
         * Support for bones in shader
         */
        this.useBones = true;
        /**
         * Support for morph targets in shader
         */
        this.useMorphTargets = true;
        /**
         * No support for vertex alpha
         */
        this.useVertexAlpha = false;
        /**
         * No support for baked vertex animation
         */
        this.useBakedVertexAnimation = false;
        /**
         * Defines the alpha limits in alpha test mode.
         */
        this.alphaCutOff = 0.4;
        this._useAlphaFromDiffuseTexture = true;
        this._maxSimultaneousLights = 4;
        /**
         * inverted state equals with Unity
         */
        this._invertNormalMapX = true;
        /**
         * inverted state equals with Unity
         */
        this._invertNormalMapY = true;
        this._twoSidedLighting = false;
        this._renderTargets = new _babylonjs_core_Misc_smartArray__WEBPACK_IMPORTED_MODULE_1__.SmartArray(16);
        this._worldViewProjectionMatrix = _babylonjs_core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_3__.Matrix.Zero();
        this._globalAmbientColor = new _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_4__.Color3(0, 0, 0);
        this._cacheHasRenderTargetTextures = false;
        //#endregion
        //#region MToon parameters
        this._bumpScale = 1.0;
        this._receiveShadowRate = 1.0;
        this._shadingGradeRate = 1.0;
        this._shadeShift = 0.0;
        this._shadeToony = 0.9;
        this._lightColorAttenuation = 0.0;
        this._indirectLightIntensity = 0.1;
        this._rimLightingMix = 0;
        this._rimFresnelPower = 1;
        this._rimLift = 0;
        this._outlineWidth = 0.5;
        this._outlineScaledMaxDistance = 1.0;
        this._outlineLightingMix = 1.0;
        this._uvAnimationScrollX = 0.0;
        this._uvAnimationScrollY = 0.0;
        this._uvAnimationRotation = 0.0;
        this._alphaTest = false;
        this._alphaBlend = false;
        this._debugMode = DebugMode.None;
        /** @hidden */
        this.debugMode = DebugMode.None;
        this._outlineWidthMode = OutlineWidthMode.None;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.isOutline = 0.0;
        this.outlineColorMode = OutlineColorMode.MixedLighting;
        this._cullMode = CullMode.Back;
        this._outlineCullMode = CullMode.Front;
        this.outlineCullMode = CullMode.Front;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.storedCullMode = CullMode.Back;
        //#endregion
        /**
         * flip mainUv.x if true
         */
        this.flipU = false;
        /**
         * flip mainUv.y if true
         */
        this.flipV = false;
        this.detailMap = new _babylonjs_core_Materials_material_detailMapConfiguration__WEBPACK_IMPORTED_MODULE_13__.DetailMapConfiguration(this);
        // Setup the default processing configuration to the scene.
        this._attachImageProcessingConfiguration(null);
        // this.prePassConfiguration = new PrePassConfiguration();
        this.getRenderTargetTextures = () => {
            this._renderTargets.reset();
            // if (StandardMaterial.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget) {
            //     this._renderTargets.push(<RenderTargetTexture>this._reflectionTexture);
            // }
            // if (StandardMaterial.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget) {
            //     this._renderTargets.push(<RenderTargetTexture>this._refractionTexture);
            // }
            this._eventInfo.renderTargets = this._renderTargets;
            this._callbackPluginEventFillRenderTargetTextures(this._eventInfo);
            return this._renderTargets;
        };
        // Register shaders to ShadersStore
        if (!_babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_12__.Effect.IncludesShadersStore.mtoonUboDeclaration) {
            _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_12__.Effect.IncludesShadersStore.mtoonUboDeclaration = (_shaders_ubo_declaration_vert__WEBPACK_IMPORTED_MODULE_18___default());
            _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_12__.Effect.IncludesShadersStore.mtoonVertexDeclaration = (_shaders_vertex_declaration_vert__WEBPACK_IMPORTED_MODULE_19___default());
            _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_12__.Effect.IncludesShadersStore.mtoonFragmentDeclaration = (_shaders_fragment_declaration_frag__WEBPACK_IMPORTED_MODULE_20___default());
            _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_12__.Effect.IncludesShadersStore.mtoonFragmentFunctions = (_shaders_mtoon_fragment_functions_frag__WEBPACK_IMPORTED_MODULE_21___default());
            _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_12__.Effect.IncludesShadersStore.mtoonLightFragment = (_shaders_light_fragment_frag__WEBPACK_IMPORTED_MODULE_23___default());
            _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_12__.Effect.IncludesShadersStore.mtoonBumpFragment = (_shaders_bump_fragment_frag__WEBPACK_IMPORTED_MODULE_22___default());
            _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_12__.Effect.ShadersStore.mtoonVertexShader = (_shaders_mtoon_vert__WEBPACK_IMPORTED_MODULE_24___default());
            _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_12__.Effect.ShadersStore.mtoonFragmentShader = (_shaders_mtoon_frag__WEBPACK_IMPORTED_MODULE_25___default());
        }
        // Add properties to Inspactor
        this.inspectableCustomProperties = this.inspectableCustomProperties || [];
        this.inspectableCustomProperties.push(...(0,_inspectable_custom_properties__WEBPACK_IMPORTED_MODULE_15__.getInspectableCustomProperties)());
    }
    /**
     * Gets a boolean indicating that current material needs to register RTT
     */
    get hasRenderTargetTextures() {
        // if (StandardMaterial.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget) {
        //     return true;
        // }
        // if (StandardMaterial.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget) {
        //     return true;
        // }
        return false;
    }
    /**
     * {@inheritdoc}
     */
    getClassName() {
        return 'MToonMaterial';
    }
    /**
     * In case the depth buffer does not allow enough depth precision for your scene (might be the case in large scenes)
     * You can try switching to logarithmic depth.
     * @see https://doc.babylonjs.com/how_to/using_logarithmic_depth_buffer
     */
    get useLogarithmicDepth() {
        return this._useLogarithmicDepth;
    }
    set useLogarithmicDepth(value) {
        const newValue = value && this.getScene().getEngine().getCaps().fragmentDepthSupported;
        if (this._useLogarithmicDepth !== newValue) {
            this._useLogarithmicDepth = newValue;
            this._markAllSubMeshesAsMiscDirty();
        }
    }
    /**
     * {@inheritdoc}
     */
    needAlphaBlending() {
        if (this._disableAlphaBlending) {
            return false;
        }
        // return (this.alpha < 1.0) || (this._opacityTexture != null) || this._shouldUseAlphaFromDiffuseTexture() || this._opacityFresnelParameters && this._opacityFresnelParameters.isEnabled;
        return this.alpha < 1.0 || this._shouldUseAlphaFromDiffuseTexture();
    }
    /**
     * {@inheritdoc}
     */
    needAlphaTesting() {
        if (this._forceAlphaTest) {
            return true;
        }
        if (this._alphaTest) {
            return true;
        }
        return this._hasAlphaChannel() && (this._transparencyMode == null || this._transparencyMode === _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.MATERIAL_ALPHATEST);
    }
    /**
     * {@inheritdoc}
     */
    _shouldUseAlphaFromDiffuseTexture() {
        return this._diffuseTexture != null && this._diffuseTexture.hasAlpha && this._useAlphaFromDiffuseTexture && this._transparencyMode !== _babylonjs_core_Materials_material__WEBPACK_IMPORTED_MODULE_7__.Material.MATERIAL_OPAQUE;
    }
    /**
     * {@inheritdoc}
     */
    _hasAlphaChannel() {
        return this._diffuseTexture !== null && this._diffuseTexture.hasAlpha; // || this._opacityTexture != null;
    }
    /**
     * {@inheritdoc}
     */
    getAlphaTestTexture() {
        return this._diffuseTexture;
    }
    /**
     * {@inheritdoc}
     */
    isReadyForSubMesh(mesh, subMesh, useInstances = false) {
        if (!this._uniformBufferLayoutBuilt) {
            this.buildUniformLayout();
        }
        if (subMesh.effect && this.isFrozen) {
            if (subMesh.effect._wasPreviouslyReady && subMesh.effect._wasPreviouslyUsingInstances === useInstances) {
                return true;
            }
        }
        if (!subMesh.materialDefines) {
            this._callbackPluginEventGeneric(_babylonjs_core_Materials_materialPluginEvent__WEBPACK_IMPORTED_MODULE_14__.MaterialPluginEvent.GetDefineNames, this._eventInfo);
            subMesh.materialDefines = new _mtoon_material_defines__WEBPACK_IMPORTED_MODULE_17__.MToonMaterialDefines();
        }
        const scene = this.getScene();
        const defines = subMesh.materialDefines;
        if (this._isReadyForSubMesh(subMesh)) {
            return true;
        }
        const engine = scene.getEngine();
        // Lights
        defines._needNormals = _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, this.specularSupported, this._maxSimultaneousLights, this._disableLighting);
        if (this.outlineWidthMode !== OutlineWidthMode.None) {
            // Normals is needed when rendering outline
            defines._needNormals = true;
        }
        this.applyDefines(defines);
        // Multiview
        _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareDefinesForMultiview(scene, defines);
        // PrePass
        const oit = this.needAlphaBlendingForMesh(mesh) && scene.useOrderIndependentTransparency;
        // MaterialHelper.PrepareDefinesForPrePass(scene, defines, this.canRenderToMRT && !oit);
        // Order independant transparency
        _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareDefinesForOIT(scene, defines, oit);
        // Textures
        if (defines._areTexturesDirty) {
            this._eventInfo.hasRenderTargetTextures = false;
            this._callbackPluginEventHasRenderTargetTextures(this._eventInfo);
            this._cacheHasRenderTargetTextures = this._eventInfo.hasRenderTargetTextures;
            defines._needUVs = false;
            for (let i = 1; i <= _babylonjs_core_Engines_constants__WEBPACK_IMPORTED_MODULE_10__.Constants.MAX_SUPPORTED_UV_SETS; ++i) {
                defines['MAINUV' + i] = false;
            }
            if (scene.texturesEnabled) {
                // Check texture is ready
                if (!this.isReadyForTexture(this._diffuseTexture, defines, 'DIFFUSE') ||
                    !this.isReadyForTexture(this._emissiveTexture, defines, 'EMISSIVE') ||
                    !this.isReadyForTexture(this._shadeTexture, defines, 'SHADE') ||
                    !this.isReadyForTexture(this._receiveShadowTexture, defines, 'RECEIVE_SHADOW') ||
                    !this.isReadyForTexture(this._shadingGradeTexture, defines, 'SHADING_GRADE') ||
                    !this.isReadyForTexture(this._rimTexture, defines, 'RIM') ||
                    !this.isReadyForTexture(this._matCapTexture, defines, 'MATCAP') ||
                    !this.isReadyForTexture(this._outlineWidthTexture, defines, 'OUTLINE_WIDTH') ||
                    !this.isReadyForTexture(this._uvAnimationMaskTexture, defines, 'UV_ANIMATION_MASK')) {
                    return false;
                }
                if (scene.getEngine().getCaps().standardDerivatives && this._bumpTexture) {
                    // Bump texure can not be not blocking.
                    if (!this._bumpTexture.isReady()) {
                        return false;
                    }
                    _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareDefinesForMergedUV(this._bumpTexture, defines, 'BUMP');
                    defines.PARALLAX = this.useParallax;
                    defines.PARALLAXOCCLUSION = this.useParallaxOcclusion;
                    defines.OBJECTSPACE_NORMALMAP = this.useObjectSpaceNormalMap;
                }
                else {
                    defines.BUMP = false;
                    defines.PARALLAX = false;
                    defines.PARALLAXOCCLUSION = false;
                }
                defines.TWOSIDEDLIGHTING = !this._backFaceCulling && this._twoSidedLighting;
            }
            else {
                defines.DIFFUSE = false;
                defines.EMISSIVE = false;
                defines.SHADE = false;
                defines.RECEIVE_SHADOW = false;
                defines.SHADING_GRADE = false;
                defines.RIM = false;
                defines.MATCAP = false;
                defines.OUTLINE_WIDTH = false;
                defines.BUMP = false;
                defines.UV_ANIMATION_MASK = false;
            }
            defines.ALPHAFROMDIFFUSE = this._shouldUseAlphaFromDiffuseTexture();
            // defines.EMISSIVEASILLUMINATION = this._useEmissiveAsIllumination;
            // defines.LINKEMISSIVEWITHDIFFUSE = this._linkEmissiveWithDiffuse;
            // defines.SPECULAROVERALPHA = this._useSpecularOverAlpha;
            defines.PREMULTIPLYALPHA = this.alphaMode === _babylonjs_core_Engines_constants__WEBPACK_IMPORTED_MODULE_10__.Constants.ALPHA_PREMULTIPLIED || this.alphaMode === _babylonjs_core_Engines_constants__WEBPACK_IMPORTED_MODULE_10__.Constants.ALPHA_PREMULTIPLIED_PORTERDUFF;
            defines.ALPHATEST_AFTERALLALPHACOMPUTATIONS = this.transparencyMode !== null;
            defines.ALPHABLEND = this.transparencyMode === null || this.needAlphaBlendingForMesh(mesh); // check on null for backward compatibility
        }
        this._eventInfo.isReadyForSubMesh = true;
        this._eventInfo.defines = defines;
        this._callbackPluginEventIsReadyForSubMesh(this._eventInfo);
        if (!this._eventInfo.isReadyForSubMesh) {
            return false;
        }
        if (defines._areImageProcessingDirty && this._imageProcessingConfiguration) {
            if (!this._imageProcessingConfiguration.isReady()) {
                return false;
            }
            this._imageProcessingConfiguration.prepareDefines(defines);
            // defines.IS_REFLECTION_LINEAR = (this.reflectionTexture != null && !this.reflectionTexture.gammaSpace);
            // defines.IS_REFRACTION_LINEAR = (this.refractionTexture != null && !this.refractionTexture.gammaSpace);
        }
        if (this.flipU !== defines.FLIP_U) {
            defines.FLIP_U = this.flipU;
            defines.markAsUnprocessed();
        }
        if (this.flipV !== defines.FLIP_V) {
            defines.FLIP_V = this.flipV;
            defines.markAsUnprocessed();
        }
        // Misc.
        _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareDefinesForMisc(mesh, scene, this._useLogarithmicDepth, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh) || this._forceAlphaTest, defines);
        // Values that need to be evaluated on every frame
        _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances, null, subMesh.getRenderingMesh().hasThinInstances);
        // External config
        this._eventInfo.defines = defines;
        this._eventInfo.mesh = mesh;
        this._callbackPluginEventPrepareDefinesBeforeAttributes(this._eventInfo);
        // Attribs
        _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareDefinesForAttributes(mesh, defines, this.useVertexColor, this.useBones, this.useMorphTargets, this.useVertexAlpha, this.useBakedVertexAnimation);
        // External config
        this._callbackPluginEventPrepareDefines(this._eventInfo);
        // Get correct effect
        if (defines.isDirty) {
            const lightDisposed = defines._areLightsDisposed;
            defines.markAsProcessed();
            // Fallbacks
            const fallbacks = new _babylonjs_core_Materials_effectFallbacks__WEBPACK_IMPORTED_MODULE_11__.EffectFallbacks();
            if (defines.BUMP) {
                fallbacks.addFallback(0, 'BUMP');
            }
            if (defines.PARALLAX) {
                fallbacks.addFallback(1, 'PARALLAX');
            }
            if (defines.PARALLAXOCCLUSION) {
                fallbacks.addFallback(0, 'PARALLAXOCCLUSION');
            }
            if (defines.FOG) {
                fallbacks.addFallback(1, 'FOG');
            }
            if (defines.POINTSIZE) {
                fallbacks.addFallback(0, 'POINTSIZE');
            }
            if (defines.LOGARITHMICDEPTH) {
                fallbacks.addFallback(0, 'LOGARITHMICDEPTH');
            }
            _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this._maxSimultaneousLights);
            if (defines.MULTIVIEW) {
                fallbacks.addFallback(0, 'MULTIVIEW');
            }
            // Attributes
            const attribs = [_babylonjs_core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_5__.VertexBuffer.PositionKind];
            if (defines.NORMAL) {
                attribs.push(_babylonjs_core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_5__.VertexBuffer.NormalKind);
            }
            if (defines.TANGENT) {
                attribs.push(_babylonjs_core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_5__.VertexBuffer.TangentKind);
            }
            for (let i = 1; i <= _babylonjs_core_Engines_constants__WEBPACK_IMPORTED_MODULE_10__.Constants.MAX_SUPPORTED_UV_SETS; ++i) {
                if (defines['UV' + i]) {
                    attribs.push(`uv${i === 1 ? '' : i}`);
                }
            }
            if (defines.INSTANCESCOLOR) {
                attribs.push(_babylonjs_core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_5__.VertexBuffer.ColorInstanceKind);
            }
            _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
            _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareAttributesForInstances(attribs, defines);
            _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareAttributesForMorphTargets(attribs, mesh, defines);
            _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareAttributesForBakedVertexAnimation(attribs, mesh, defines);
            const shaderName = 'mtoon';
            const uniforms = [
                // StandardMaterial uniforms
                'world',
                'view',
                'viewProjection',
                'vEyePosition',
                'vLightsType',
                'vAmbientColor',
                'visibility',
                'vFogInfos',
                'vFogColor',
                'pointSize',
                'mBones',
                'vClipPlane',
                'vClipPlane2',
                'vClipPlane3',
                'vClipPlane4',
                'vClipPlane5',
                'vClipPlane6',
                // "diffuseLeftColor", "diffuseRightColor", "opacityParts", "reflectionLeftColor", "reflectionRightColor", "emissiveLeftColor", "emissiveRightColor", "refractionLeftColor", "refractionRightColor",
                // "vReflectionPosition", "vReflectionSize", "vRefractionPosition", "vRefractionSize",
                'logarithmicDepthConstant',
                'vTangentSpaceParams',
                'alphaCutOff',
                'boneTextureWidth',
                'morphTargetTextureInfo',
                'morphTargetTextureIndices',
                // Texture uniforms
                'vDiffuseColor',
                'vDiffuseInfos',
                'diffuseMatrix',
                'vEmissiveColor',
                'vEmissiveInfos',
                'emissiveMatrix',
                'vBumpInfos',
                'bumpMatrix',
                'vShadeColor',
                'vShadeInfos',
                'shadeMatrix',
                'vReceiveShadowInfos',
                'receiveShadowMatrix',
                'vShadingGradeInfos',
                'shadingGradeMatrix',
                'vRimColor',
                'vRimInfos',
                'RimMatrix',
                'vMatCapInfos',
                'MatCapMatrix',
                'vOutlineColor',
                'vOutlineWidthInfos',
                'outlineWidthMatrix',
                // MToon uniforms
                'aspect',
                'isOutline',
                'shadingGradeRate',
                'receiveShadowRate',
                'shadeShift',
                'shadeToony',
                'rimLightingMix',
                'rimFresnelPower',
                'rimLift',
                'lightColorAttenuation',
                'indirectLightIntensity',
                'outlineWidth',
                'outlineScaledMaxDistance',
                'outlineLightingMix',
                'uvAnimationScrollX',
                'uvAnimationScrollY',
                'uvAnimationRotation',
                'vEyeUp',
                'time',
                // Material#bindViewProjection
                'projection',
            ];
            const samplers = [
                // StandardMaterial samplers
                'diffuseSampler',
                'ambientSampler',
                'emissiveSampler',
                'bumpSampler',
                'boneSampler',
                'morphTargets',
                'oitDepthSampler',
                'oitFrontColorSampler',
                // MToon samplers
                'shadeSampler',
                'receiveShadowSampler',
                'shadingGradeSampler',
                'rimSampler',
                'matCapSampler',
                'outlineWidthSampler',
                'uvAnimationMaskSampler',
            ];
            const uniformBuffers = ['Material', 'Scene', 'Mesh'];
            this._eventInfo.fallbacks = fallbacks;
            this._eventInfo.fallbackRank = 0;
            this._eventInfo.defines = defines;
            this._eventInfo.uniforms = uniforms;
            this._eventInfo.attributes = attribs;
            this._eventInfo.samplers = samplers;
            this._eventInfo.uniformBuffersNames = uniformBuffers;
            this._eventInfo.customCode = undefined;
            this._eventInfo.mesh = mesh;
            this._callbackPluginEventGeneric(_babylonjs_core_Materials_materialPluginEvent__WEBPACK_IMPORTED_MODULE_14__.MaterialPluginEvent.PrepareEffect, this._eventInfo);
            // PrePassConfiguration.AddUniforms(uniforms);
            // PrePassConfiguration.AddSamplers(samplers);
            if (_babylonjs_core_Materials_imageProcessingConfiguration__WEBPACK_IMPORTED_MODULE_6__.ImageProcessingConfiguration) {
                _babylonjs_core_Materials_imageProcessingConfiguration__WEBPACK_IMPORTED_MODULE_6__.ImageProcessingConfiguration.PrepareUniforms(uniforms, defines);
                _babylonjs_core_Materials_imageProcessingConfiguration__WEBPACK_IMPORTED_MODULE_6__.ImageProcessingConfiguration.PrepareSamplers(samplers, defines);
            }
            _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareUniformsAndSamplersList({
                uniformsNames: uniforms,
                uniformBuffersNames: uniformBuffers,
                samplers,
                defines,
                maxSimultaneousLights: this._maxSimultaneousLights,
            });
            const csnrOptions = {};
            const join = defines.toString();
            const previousEffect = subMesh.effect;
            let effect = scene.getEngine().createEffect(shaderName, {
                attributes: attribs,
                uniformsNames: uniforms,
                uniformBuffersNames: uniformBuffers,
                samplers,
                defines: join,
                fallbacks,
                onCompiled: this.onCompiled,
                onError: this.onError,
                indexParameters: {
                    maxSimultaneousLights: this._maxSimultaneousLights,
                    maxSimultaneousMorphTargets: defines.NUM_MORPH_INFLUENCERS,
                },
                processFinalCode: csnrOptions.processFinalCode,
                processCodeAfterIncludes: this._eventInfo.customCode,
                multiTarget: defines.PREPASS,
            }, engine);
            if (effect) {
                if (this._onEffectCreatedObservable) {
                    onCreatedEffectParameters.effect = effect;
                    onCreatedEffectParameters.subMesh = subMesh;
                    this._onEffectCreatedObservable.notifyObservers(onCreatedEffectParameters);
                }
                // Use previous effect while new one is compiling
                if (this.allowShaderHotSwapping && previousEffect && !effect.isReady()) {
                    effect = previousEffect;
                    defines.markAsUnprocessed();
                    if (lightDisposed) {
                        // re register in case it takes more than one frame.
                        defines._areLightsDisposed = true;
                        return false;
                    }
                }
                else {
                    scene.resetCachedMaterial();
                    subMesh.setEffect(effect, defines, this._materialContext);
                }
            }
        }
        if (!subMesh.effect || !subMesh.effect.isReady()) {
            return false;
        }
        defines._renderId = scene.getRenderId();
        subMesh.effect._wasPreviouslyReady = true;
        subMesh.effect._wasPreviouslyUsingInstances = useInstances;
        return true;
    }
    /**
     * Determine the layout of the UniformBufferObject
     * Must be added in the same order as the `uniform Material` in the shader
     * UBOs can be used to efficiently pass variables to shaders, but only WebGL v2 is supported.
     * babylon.js automatically falls back on WebGL v1
     * The second argument is the number of floats
     */
    buildUniformLayout() {
        const ubo = this._uniformBuffer;
        ubo.addUniform('vDiffuseColor', 4);
        ubo.addUniform('vDiffuseInfos', 2);
        ubo.addUniform('diffuseMatrix', 16);
        ubo.addUniform('vEmissiveColor', 3);
        ubo.addUniform('vEmissiveInfos', 2);
        ubo.addUniform('emissiveMatrix', 16);
        ubo.addUniform('vBumpInfos', 3);
        ubo.addUniform('bumpMatrix', 16);
        ubo.addUniform('vShadeColor', 3);
        ubo.addUniform('vShadeInfos', 2);
        ubo.addUniform('shadeMatrix', 16);
        ubo.addUniform('vReceiveShadowInfos', 2);
        ubo.addUniform('receiveShadowMatrix', 16);
        ubo.addUniform('vShadingGradeInfos', 2);
        ubo.addUniform('shadingGradeMatrix', 16);
        ubo.addUniform('vRimColor', 3);
        ubo.addUniform('vRimInfos', 2);
        ubo.addUniform('rimMatrix', 16);
        ubo.addUniform('vMatCapInfos', 2);
        ubo.addUniform('matCapMatrix', 16);
        ubo.addUniform('vOutlineColor', 3);
        ubo.addUniform('vOutlineWidthInfos', 2);
        ubo.addUniform('outlineWidthMatrix', 16);
        ubo.addUniform('vUvAnimationMaskInfos', 2);
        ubo.addUniform('uvAnimationMaskMatrix', 16);
        ubo.addUniform('vTangentSpaceParams', 2);
        ubo.addUniform('pointSize', 1);
        ubo.addUniform('shadingGradeRate', 1);
        ubo.addUniform('receiveShadowRate', 1);
        ubo.addUniform('shadeShift', 1);
        ubo.addUniform('shadeToony', 1);
        ubo.addUniform('lightColorAttenuation', 1);
        ubo.addUniform('indirectLightIntensity', 1);
        ubo.addUniform('rimLightingMix', 1);
        ubo.addUniform('rimFresnelPower', 1);
        ubo.addUniform('rimLift', 1);
        ubo.addUniform('outlineWidth', 1);
        ubo.addUniform('outlineScaledMaxDistance', 1);
        ubo.addUniform('outlineLightingMix', 1);
        ubo.addUniform('uvAnimationScrollX', 1);
        ubo.addUniform('uvAnimationScrollY', 1);
        ubo.addUniform('uvAnimationRotation', 1);
        ubo.addUniform('vEyeUp', 3);
        ubo.addUniform('alphaCutOff', 1);
        ubo.addUniform('vAmbientColor', 3);
        ubo.addUniform('aspect', 1);
        ubo.addUniform('isOutline', 1);
        ubo.addUniform('time', 4);
        ubo.addUniform('visibility', 1);
        super.buildUniformLayout();
    }
    /**
     * {@inheritdoc}
     * Binds current shader variables
     * This method is called every frame, so even if it is redundant, it prefers speed.
     */
    bindForSubMesh(world, mesh, subMesh) {
        const scene = this.getScene();
        const defines = subMesh.materialDefines;
        const effect = subMesh.effect;
        if (!defines || !effect) {
            return;
        }
        this._activeEffect = effect;
        // Matrices Mesh.
        mesh.getMeshUniformBuffer().bindToEffect(effect, 'Mesh');
        mesh.transferToEffect(world);
        // Binding unconditionally
        this._uniformBuffer.bindToEffect(effect, 'Material');
        // this.prePassConfiguration.bindForSubMesh(this._activeEffect, scene, mesh, world, this.isFrozen);
        this._eventInfo.subMesh = subMesh;
        this._callbackPluginEventHardBindForSubMesh(this._eventInfo);
        // Normal Matrix
        if (defines.OBJECTSPACE_NORMALMAP) {
            world.toNormalMatrix(this._normalMatrix);
            this.bindOnlyNormalMatrix(this._normalMatrix);
        }
        const mustRebind = this._mustRebind(scene, effect, mesh.visibility);
        // Bones
        _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.BindBonesParameters(mesh, effect);
        const ubo = this._uniformBuffer;
        if (mustRebind) {
            this.bindViewProjection(effect);
            if (!ubo.useUbo || !this.isFrozen || !ubo.isSync) {
                if (scene.texturesEnabled) {
                    this.bindTexture(this._diffuseTexture, ubo, effect, 'diffuse', 'vDiffuseInfos');
                    this.bindTexture(this._emissiveTexture, ubo, effect, 'emissive', 'vEmissiveInfos');
                    if (this._bumpTexture && scene.getEngine().getCaps().standardDerivatives) {
                        ubo.updateFloat3('vBumpInfos', this._bumpTexture.coordinatesIndex, 1.0 / this._bumpTexture.level, this._bumpScale);
                        _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.BindTextureMatrix(this._bumpTexture, ubo, 'bump');
                        effect.setTexture(`bumpSampler`, this._bumpTexture);
                        // bumpTexture は babylon.js のデフォルトと反対の状態である
                        if (scene._mirroredCameraPosition) {
                            ubo.updateFloat2('vTangentSpaceParams', this._invertNormalMapX ? 1.0 : -1.0, this._invertNormalMapY ? 1.0 : -1.0);
                        }
                        else {
                            ubo.updateFloat2('vTangentSpaceParams', this._invertNormalMapX ? -1.0 : 1.0, this._invertNormalMapY ? -1.0 : 1.0);
                        }
                    }
                    this.bindTexture(this._shadeTexture, ubo, effect, 'shade', 'vShadeInfos');
                    this.bindTexture(this._receiveShadowTexture, ubo, effect, 'receiveShadow', 'vReceiveShadowInfos');
                    this.bindTexture(this._shadingGradeTexture, ubo, effect, 'shadingGrade', 'vShadingGradeInfos');
                    this.bindTexture(this._rimTexture, ubo, effect, 'rim', 'vRimInfos');
                    this.bindTexture(this._matCapTexture, ubo, effect, 'matCap', 'vMatCapInfos');
                    this.bindTexture(this._outlineWidthTexture, ubo, effect, 'outlineWidth', 'vOutlineWidthInfos');
                    this.bindTexture(this._uvAnimationMaskTexture, ubo, effect, 'uvAnimationMask', 'vUvAnimationMaskInfos');
                    if (this._hasAlphaChannel()) {
                        ubo.updateFloat('alphaCutOff', this.alphaCutOff);
                    }
                }
                // Point size
                if (this.pointsCloud) {
                    ubo.updateFloat('pointSize', this.pointSize);
                }
                // MToon uniforms
                ubo.updateFloat('receiveShadowRate', this._receiveShadowRate);
                ubo.updateFloat('shadingGradeRate', this._shadingGradeRate);
                ubo.updateFloat('shadeShift', this._shadeShift);
                ubo.updateFloat('shadeToony', this._shadeToony);
                ubo.updateFloat('lightColorAttenuation', this._lightColorAttenuation);
                ubo.updateFloat('indirectLightIntensity', this._indirectLightIntensity);
                ubo.updateFloat('rimLightingMix', this._rimLightingMix);
                ubo.updateFloat('rimFresnelPower', this._rimFresnelPower);
                ubo.updateFloat('rimLift', this._rimLift);
                ubo.updateFloat('outlineWidth', this._outlineWidth);
                ubo.updateFloat('outlineScaledMaxDistance', this._outlineScaledMaxDistance);
                ubo.updateFloat('outlineLightingMix', this._outlineLightingMix);
                ubo.updateFloat('uvAnimationScrollX', this._uvAnimationScrollX);
                ubo.updateFloat('uvAnimationScrollY', this._uvAnimationScrollY);
                ubo.updateFloat('uvAnimationRotation', this._uvAnimationRotation);
                // Colors
                scene.ambientColor.multiplyToRef(this.ambientColor, this._globalAmbientColor);
                ubo.updateColor3('vAmbientColor', this._globalAmbientColor);
                ubo.updateColor4('vDiffuseColor', this.diffuseColor, this.alpha);
                ubo.updateColor3('vEmissiveColor', this.emissiveColor);
                ubo.updateColor3('vShadeColor', this.shadeColor);
                ubo.updateColor3('vRimColor', this.rimColor);
                ubo.updateColor4('vOutlineColor', this.outlineColor, 1.0);
                ubo.updateVector3('vEyeUp', scene.activeCamera.upVector);
            }
            // OIT with depth peeling
            const anyScene = scene;
            if (anyScene.useOrderIndependentTransparency && this.needAlphaBlendingForMesh(mesh) && anyScene.depthPeelingRenderer) {
                anyScene.depthPeelingRenderer.bind(effect);
            }
            this._eventInfo.subMesh = subMesh;
            this._callbackPluginEventBindForSubMesh(this._eventInfo);
            // Clip plane
            _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.BindClipPlane(effect, scene);
            // Colors
            this.bindEyePosition(effect);
        }
        else if (scene.getEngine()._features.needToAlwaysBindUniformBuffers) {
            this._needToBindSceneUbo = true;
        }
        if (mustRebind || !this.isFrozen) {
            // Lights
            if (scene.lightsEnabled && !this._disableLighting) {
                _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.BindLights(scene, mesh, effect, defines, this._maxSimultaneousLights);
            }
            // View
            if ((scene.fogEnabled && mesh.applyFog && scene.fogMode !== _babylonjs_core_scene__WEBPACK_IMPORTED_MODULE_2__.Scene.FOGMODE_NONE) || mesh.receiveShadows) {
                this.bindView(effect);
            }
            // Fog
            _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.BindFogParameters(scene, mesh, effect);
            // Morph targets
            if (defines.NUM_MORPH_INFLUENCERS) {
                _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.BindMorphTargetParameters(mesh, effect);
            }
            if (defines.BAKED_VERTEX_ANIMATION_TEXTURE) {
                mesh.bakedVertexAnimationManager?.bind(effect, defines.INSTANCES);
            }
            // Log. depth
            if (this.useLogarithmicDepth) {
                _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.BindLogDepth(defines, effect, scene);
            }
            // image processing
            if (this._imageProcessingConfiguration && !this._imageProcessingConfiguration.applyByPostProcess) {
                this._imageProcessingConfiguration.bind(this._activeEffect);
            }
            // MToon bindings
            ubo.updateFloat('aspect', scene.getEngine().getAspectRatio(scene.activeCamera));
            ubo.updateFloat('isOutline', this.isOutline);
            // this variable is compatible with [Unity's _Time](https://docs.unity3d.com/Manual/SL-UnityShaderVariables.html)
            const t = window.performance.now() / 1000;
            ubo.updateVector4('time', new _babylonjs_core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_3__.Vector4(t / 20, t, t * 2, t * 3));
        }
        this._afterBind(mesh, this._activeEffect);
        ubo.update();
    }
    /**
     * {@inheritdoc}
     */
    getAnimatables() {
        const results = super.getAnimatables();
        for (const texture of this.appendedActiveTextures) {
            if (texture.animations && texture.animations.length > 0) {
                results.push(texture);
            }
        }
        return results;
    }
    /**
     * {@inheritdoc}
     */
    getActiveTextures() {
        const activeTextures = super.getActiveTextures().concat(this.appendedActiveTextures);
        return activeTextures;
    }
    /**
     * {@inheritdoc}
     */
    hasTexture(texture) {
        if (super.hasTexture(texture)) {
            return true;
        }
        for (const tex of this.appendedActiveTextures) {
            if (tex === texture) {
                return true;
            }
        }
        return false;
    }
    /**
     * {@inheritdoc}
     */
    dispose(forceDisposeEffect, forceDisposeTextures) {
        delete this.outlineRenderer;
        if (forceDisposeTextures) {
            for (const texture of this.appendedActiveTextures) {
                texture.dispose();
            }
        }
        if (this._imageProcessingConfiguration && this._imageProcessingObserver) {
            this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver);
        }
        super.dispose(forceDisposeEffect, forceDisposeTextures);
    }
    /**
     * {@inheritdoc}
     */
    clone(name) {
        const result = _babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Clone(() => new MToonMaterial(name, this.getScene()), this);
        result.name = name;
        result.id = name;
        this.stencil.copyTo(result.stencil);
        return result;
    }
    /**
     * {@inheritdoc}
     */
    static Parse(source, scene, rootUrl) {
        const material = _babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(() => new MToonMaterial(source.name, scene), source, scene, rootUrl);
        if (source.stencil) {
            material.stencil.parse(source.stencil, scene, rootUrl);
        }
        return material;
    }
    /**
     * 独自メソッド: テクスチャ情報をバインドする
     * @param texture
     * @param effect
     * @param name
     * @param infoName
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    bindTexture(texture, ubo, effect, name, infoName) {
        if (!texture) {
            return;
        }
        this._uniformBuffer.updateFloat2(infoName, texture.coordinatesIndex, texture.level);
        _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.BindTextureMatrix(texture, ubo, name);
        effect.setTexture(`${name}Sampler`, texture);
    }
    /**
     * 独自メソッド: テクスチャの用意が終わっているか確認する
     * @param texture
     * @param defines
     * @param key
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    isReadyForTexture(texture, defines, key) {
        if (!texture) {
            defines[key] = false;
            return true;
        }
        if (!texture.isReadyOrNotBlocking()) {
            return false;
        }
        _babylonjs_core_Materials_materialHelper__WEBPACK_IMPORTED_MODULE_9__.MaterialHelper.PrepareDefinesForMergedUV(texture, defines, key);
        return true;
    }
    /**
     * 独自メソッド: 定数を設定する
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    applyDefines(defines) {
        switch (this._debugMode) {
            case DebugMode.Normal:
                if (defines.MTOON_DEBUG_NORMAL !== true) {
                    defines.MTOON_DEBUG_NORMAL = true;
                    defines.MTOON_DEBUG_LITSHADERATE = false;
                    defines.markAsUnprocessed();
                }
                break;
            case DebugMode.LitShadeRate:
                if (defines.MTOON_DEBUG_LITSHADERATE !== true) {
                    defines.MTOON_DEBUG_NORMAL = false;
                    defines.MTOON_DEBUG_LITSHADERATE = true;
                    defines.markAsUnprocessed();
                }
                break;
            case DebugMode.None:
                if (defines.MTOON_DEBUG_NORMAL === true) {
                    defines.MTOON_DEBUG_NORMAL = false;
                    defines.markAsUnprocessed();
                }
                if (defines.MTOON_DEBUG_LITSHADERATE === true) {
                    defines.MTOON_DEBUG_LITSHADERATE = false;
                    defines.markAsUnprocessed();
                }
                break;
        }
        switch (this.outlineWidthMode) {
            case OutlineWidthMode.WorldCorrdinates:
                if (defines.MTOON_OUTLINE_WIDTH_WORLD !== true) {
                    defines.MTOON_OUTLINE_WIDTH_WORLD = true;
                    defines.MTOON_OUTLINE_WIDTH_SCREEN = false;
                    defines.markAsUnprocessed();
                }
                break;
            case OutlineWidthMode.ScreenCoordinates:
                if (defines.MTOON_OUTLINE_WIDTH_SCREEN !== true) {
                    defines.MTOON_OUTLINE_WIDTH_WORLD = false;
                    defines.MTOON_OUTLINE_WIDTH_SCREEN = true;
                    defines.markAsUnprocessed();
                }
                break;
            case OutlineWidthMode.None:
                if (defines.MTOON_OUTLINE_WIDTH_SCREEN !== false || defines.MTOON_OUTLINE_WIDTH_WORLD !== false) {
                    defines.MTOON_OUTLINE_WIDTH_SCREEN = false;
                    defines.MTOON_OUTLINE_WIDTH_WORLD = false;
                    defines.markAsUnprocessed();
                }
                break;
        }
        switch (this.outlineColorMode) {
            case OutlineColorMode.FixedColor:
                if (defines.MTOON_OUTLINE_COLOR_FIXED !== true) {
                    defines.MTOON_OUTLINE_COLOR_FIXED = true;
                    defines.MTOON_OUTLINE_COLOR_MIXED = false;
                    defines.markAsUnprocessed();
                }
                break;
            case OutlineColorMode.MixedLighting:
                if (defines.MTOON_OUTLINE_COLOR_MIXED !== true) {
                    defines.MTOON_OUTLINE_COLOR_FIXED = false;
                    defines.MTOON_OUTLINE_COLOR_MIXED = true;
                    defines.markAsUnprocessed();
                }
                break;
        }
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)('diffuseTexture')
], MToonMaterial.prototype, "_diffuseTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesAndMiscDirty')
], MToonMaterial.prototype, "diffuseTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)('emissiveTexture')
], MToonMaterial.prototype, "_emissiveTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "emissiveTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)('bumpTexture')
], MToonMaterial.prototype, "_bumpTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "bumpTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)('shadeTexture')
], MToonMaterial.prototype, "_shadeTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "shadeTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)('receiveShadowTexture')
], MToonMaterial.prototype, "_receiveShadowTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "receiveShadowTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)('shadingGradeTexture')
], MToonMaterial.prototype, "_shadingGradeTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "shadingGradeTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)('rimTexture')
], MToonMaterial.prototype, "_rimTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "rimTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)('matCapTexture')
], MToonMaterial.prototype, "_matCapTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "matCapTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)('outlineWidthTexture')
], MToonMaterial.prototype, "_outlineWidthTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "outlineWidthTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)('outlineWidthTexture')
], MToonMaterial.prototype, "_uvAnimationMaskTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "uvAnimationMaskTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)('diffuse')
], MToonMaterial.prototype, "diffuseColor", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('ambient')
], MToonMaterial.prototype, "ambientColor", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('emissive')
], MToonMaterial.prototype, "emissiveColor", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('shade')
], MToonMaterial.prototype, "shadeColor", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('rim')
], MToonMaterial.prototype, "rimColor", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('outline')
], MToonMaterial.prototype, "outlineColor", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "useEmissiveAsIllumination", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "linkEmissiveWithDiffuse", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "useReflectionOverAlpha", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('disableLighting')
], MToonMaterial.prototype, "_disableLighting", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsLightsDirty')
], MToonMaterial.prototype, "disableLighting", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "alphaCutOff", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('useAlphaFromDiffuseTexture')
], MToonMaterial.prototype, "_useAlphaFromDiffuseTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesAndMiscDirty')
], MToonMaterial.prototype, "useAlphaFromDiffuseTexture", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('maxSimultaneousLights')
], MToonMaterial.prototype, "_maxSimultaneousLights", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsLightsDirty')
], MToonMaterial.prototype, "maxSimultaneousLights", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('invertNormalMapX')
], MToonMaterial.prototype, "_invertNormalMapX", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "invertNormalMapX", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('invertNormalMapY')
], MToonMaterial.prototype, "_invertNormalMapY", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "invertNormalMapY", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('twoSidedLighting')
], MToonMaterial.prototype, "_twoSidedLighting", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsTexturesDirty')
], MToonMaterial.prototype, "twoSidedLighting", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "bumpScale", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "receiveShadowRate", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "shadingGradeRate", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "shadeShift", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "shadeToony", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "lightColorAttenuation", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "indirectLightIntensity", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "rimLightingMix", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "rimFresnelPower", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "rimLift", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "outlineWidth", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "outlineScaledMaxDistance", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "outlineLightingMix", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "uvAnimationScrollX", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "uvAnimationScrollY", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "uvAnimationRotation", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('alphaTest')
], MToonMaterial.prototype, "_alphaTest", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "alphaTest", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "alphaBlend", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('debugMode')
], MToonMaterial.prototype, "_debugMode", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsMiscDirty')
], MToonMaterial.prototype, "debugMode", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsMiscDirty')
], MToonMaterial.prototype, "outlineColorMode", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "cullMode", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "_outlineCullMode", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)('_markAllSubMeshesAsMiscDirty')
], MToonMaterial.prototype, "outlineCullMode", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('flipU')
], MToonMaterial.prototype, "flipU", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)('flipV')
], MToonMaterial.prototype, "flipV", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_babylonjs_core_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
], MToonMaterial.prototype, "useLogarithmicDepth", null);


/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/mtoon-outline-renderer.ts":
/*!*************************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/mtoon-outline-renderer.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MToonOutlineRenderer": () => (/* binding */ MToonOutlineRenderer)
/* harmony export */ });
/* harmony import */ var _babylonjs_core_sceneComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/sceneComponent */ "./node_modules/@babylonjs/core/sceneComponent.js");

// eslint-disable-next-line @typescript-eslint/naming-convention
const BASE_NAME = 'MToonOutline';
/**
 * MToon outline renderer
 * @see OutlineRenderer
 */
class MToonOutlineRenderer {
    /**
     * @inheritdoc
     * MToonMaterial ごとにインスタンスを生成する
     */
    constructor(scene, material) {
        this.scene = scene;
        this.material = material;
        this.name = `${BASE_NAME}_${material.name}_${MToonOutlineRenderer.rendererId++}`;
        this.scene._addComponent(this);
        this._engine = this.scene.getEngine();
        this._passIdForDrawWrapper = [];
        for (let i = 0; i < 1; ++i) {
            this._passIdForDrawWrapper[i] = this._engine.createRenderPassId(`Outline Renderer (${i})`);
        }
    }
    /**
     * @inheritdoc
     * シーン描画前後にレンダリング処理を登録する
     */
    register() {
        this.scene._afterRenderingMeshStage.registerStep(_babylonjs_core_sceneComponent__WEBPACK_IMPORTED_MODULE_0__.SceneComponentConstants.STEP_AFTERRENDERINGMESH_OUTLINE, this, this._afterRenderingMesh);
    }
    /**
     * @inheritdoc
     */
    rebuild() {
        // Nothing to do here.
    }
    /**
     * @inheritdoc
     */
    dispose() {
        for (let i = 0; i < this._passIdForDrawWrapper.length; ++i) {
            this._engine.releaseRenderPassId(this._passIdForDrawWrapper[i]);
        }
    }
    /**
     * Renders the outline in the canvas.
     * @param subMesh Defines the sumesh to render
     * @param batch Defines the batch of meshes in case of instances
     * @param renderPassId Render pass id to use to render the mesh
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    render(subMesh, batch, renderPassId) {
        renderPassId = renderPassId ?? this._passIdForDrawWrapper[0];
        const scene = this.scene;
        const effect = subMesh.effect;
        if (!effect || !effect.isReady() || !this.scene.activeCamera) {
            return;
        }
        const drawWrapper = subMesh._getDrawWrapper(renderPassId, true);
        if (!drawWrapper) {
            return;
        }
        drawWrapper.setEffect(effect);
        if (!drawWrapper.effect || !drawWrapper.effect.isReady()) {
            return;
        }
        const ownerMesh = subMesh.getMesh();
        const replacementMesh = ownerMesh._internalAbstractMeshDataInfo._actAsRegularMesh ? ownerMesh : null;
        const renderingMesh = subMesh.getRenderingMesh();
        const effectiveMesh = replacementMesh ? replacementMesh : renderingMesh;
        if (!scene.activeCamera) {
            return;
        }
        this.material.applyOutlineCullMode();
        this.material.enableOutlineRender();
        this._engine.enableEffect(drawWrapper);
        if (!this.isHardwareInstancedRendering(subMesh, batch)) {
            renderingMesh._bind(subMesh, effect, this.material.fillMode);
        }
        this.material._preBind(effect);
        renderingMesh._processRendering(effectiveMesh, subMesh, effect, this.material.fillMode, batch, this.isHardwareInstancedRendering(subMesh, batch), (isInstance, world, effectiveMaterial) => {
            if (effectiveMaterial) {
                effectiveMaterial.bindForSubMesh(world, effectiveMesh, subMesh);
            }
        }, this.material);
        this.material.restoreOutlineCullMode();
        this.material.disaableOutlineRender();
    }
    /**
     * このメッシュを描画した後に実行されるコールバック
     */
    _afterRenderingMesh(mesh, subMesh, batch) {
        if (!this.willRender(subMesh)) {
            return;
        }
        const cullBackFaces = this._engine.cullBackFaces;
        this._engine.cullBackFaces = false;
        this.render(subMesh, batch, this._passIdForDrawWrapper[0]);
        this._engine.cullBackFaces = cullBackFaces;
    }
    /**
     * インスタンシングを行うかどうか
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    isHardwareInstancedRendering(subMesh, batch) {
        if (!this._engine.getCaps().instancedArrays) {
            return false;
        }
        if (batch.visibleInstances[subMesh._id] === null) {
            return false;
        }
        if (typeof batch.visibleInstances[subMesh._id] === 'undefined') {
            return false;
        }
        return subMesh.getRenderingMesh().hasThinInstances;
    }
    /**
     * このメッシュでアウトラインを描画するかどうか
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    willRender(subMesh) {
        const material = subMesh.getMaterial();
        if (!material || material.getClassName() !== 'MToonMaterial' || material.getOutlineRendererName() !== this.name) {
            // このコンポーネントの Material ではない
            return false;
        }
        return true;
    }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
MToonOutlineRenderer.rendererId = 0;


/***/ }),

/***/ "./src/utilities/types.ts":
/*!********************************!*\
  !*** ./src/utilities/types.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
        // console.log("call getVRMManagerByURI()");
        // console.log("uri: ", uri);
        // console.log("this.loadedVRMManagers: ", this.loadedVRMManagers);
        for (const manager of this.loadedVRMManagers) {
            // console.log("manager: ", manager);
            // console.log("manager.uri: ", manager.uri);
            if (manager.uri === uri)
                return manager;
        }
        return null;
    }
    constructor(engine, 
    //* TODO: Patched.
    // public scene?: Scene,
    scene, camera) {
        // console.log("call constructor()");
        // console.log("engine: ", engine);
        // console.log("scene: ", scene);
        // console.log("camera: ", camera);
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
            // console.log("camera: ", camera);
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
        // console.log("call transparentBackground()");
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
        // console.log("call addCamera()");
        // console.log("radius: ", radius);
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
        // console.log("call attachCameraTo()");
        // console.log("manager: ", manager);
        // console.log("radius: ", radius);
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
        // console.log("call AppendAsync");
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
        // console.log("call onLoadReady()");
        // console.log(
        //   "this._onLoadCompleteCallbacks: ",
        //   this._onLoadCompleteCallbacks
        // );
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
        // console.log("call registerVrmExtension()");
        // console.log("VRMLoaderExtension.NAME: ", VRMLoaderExtension.NAME);
        // ローダーに登録する
        _babylonjs_loaders_glTF_2_0__WEBPACK_IMPORTED_MODULE_4__.GLTFLoader.RegisterExtension(_importer_babylon_vrm_loader_src__WEBPACK_IMPORTED_MODULE_11__.VRMLoaderExtension.NAME, (loader) => {
            // console.log("loader: ", loader);
            // console.log("this: ", this);
            return new _importer_babylon_vrm_loader_src__WEBPACK_IMPORTED_MODULE_11__.VRMLoaderExtension(loader, this);
        });
    }
    registerVrmPlugin() {
        // console.log("call registerVrmPlugin()");
        // console.log("SceneLoader: ", SceneLoader);
        // console.log(
        //   "SceneLoader.GetPluginForExtension(.vrm).name: ",
        //   SceneLoader.GetPluginForExtension(".vrm").name
        // );
        // if (
        //   SceneLoader &&
        //   SceneLoader.GetPluginForExtension(".vrm").name === "vrm"
        // ) {
        if (_babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_2__.SceneLoader) {
            // console.log("try to call SceneLoader.RegisterPlugin()");
            // console.log("this._vrmFileLoader: ", this._vrmFileLoader);
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


/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/shaders/bump-fragment.frag":
/*!**************************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/shaders/bump-fragment.frag ***!
  \**************************************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (2:5)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| // replace vBumpUV to mainUv\n> vec2 uvOffset = vec2(0.0, 0.0);\n| \n| #if defined(BUMP) || defined(PARALLAX) || defined(DETAIL)");

/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/shaders/fragment-declaration.frag":
/*!*********************************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/shaders/fragment-declaration.frag ***!
  \*********************************************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (1:8)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> uniform vec4 vEyePosition;\n| \n| // Colors");

/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/shaders/light-fragment.frag":
/*!***************************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/shaders/light-fragment.frag ***!
  \***************************************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> #ifdef LIGHT{X}\n|     #if defined(SHADOWONLY) || defined(LIGHTMAP) && defined(LIGHTMAPEXCLUDED{X}) && defined(LIGHTMAPNOSPECULAR{X})\n|         //No light calculation");

/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/shaders/mtoon-fragment-functions.frag":
/*!*************************************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/shaders/mtoon-fragment-functions.frag ***!
  \*************************************************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (5:5)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| * Compute Directional or Point light direction\n| */\n> vec3 computeLightDirection(vec4 lightData) {\n|     return normalize(mix(lightData.xyz - vPositionW, -lightData.xyz, lightData.w));\n| }");

/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/shaders/mtoon.frag":
/*!******************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/shaders/mtoon.frag ***!
  \******************************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> #include<__decl__mtoonFragment>\n| \n| #extension GL_OES_standard_derivatives : enable");

/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/shaders/mtoon.vert":
/*!******************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/shaders/mtoon.vert ***!
  \******************************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (4:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| // This include is special, it will be replaced to UboDeclaration(WebGL2) or VertexDeclaration(WebGL1).\n| // @see effect.ts\n> #include<__decl__mtoonVertex>\n| \n| // Attributes");

/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/shaders/ubo-declaration.vert":
/*!****************************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/shaders/ubo-declaration.vert ***!
  \****************************************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (3:29)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| // it will be replaced to UboDeclaration(WebGL2) or VertexDeclaration(WebGL1).\n| \n> layout(std140, column_major) uniform;\n| \n| uniform Material");

/***/ }),

/***/ "./src/shader/babylon-mtoon-material/src/shaders/vertex-declaration.vert":
/*!*******************************************************************************!*\
  !*** ./src/shader/babylon-mtoon-material/src/shaders/vertex-declaration.vert ***!
  \*******************************************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (2:8)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| // Uniforms\n> uniform mat4 viewProjection;\n| uniform mat4 view;\n| uniform mat4 projection;");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9lcnJvcnMudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9odW1hbm9pZC1ib25lLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvbWF0ZXJpYWwtdmFsdWUtYmluZGluZy1tZXJnZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy9zZWNvbmRhcnktYW5pbWF0aW9uL2NvbGxpZGVyLWdyb3VwLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvc2Vjb25kYXJ5LWFuaW1hdGlvbi9jb2xsaWRlci50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3NlY29uZGFyeS1hbmltYXRpb24vc3ByaW5nLWJvbmUtY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3NlY29uZGFyeS1hbmltYXRpb24vdnJtLXNwcmluZy1ib25lLWxvZ2ljLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvc2Vjb25kYXJ5LWFuaW1hdGlvbi92cm0tc3ByaW5nLWJvbmUudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy92cm0tZXh0ZW5zaW9uLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvdnJtLWZpbGUtbG9hZGVyLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL2ltcG9ydGVyL2JhYnlsb24tdnJtLWxvYWRlci9zcmMvdnJtLWludGVyZmFjZXMudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW1wb3J0ZXIvYmFieWxvbi12cm0tbG9hZGVyL3NyYy92cm0tbWFuYWdlci50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3ZybS1tYXRlcmlhbC1nZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvaW5kZXgtdGVzdC50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9zY2VuZS9vcHRpbWl6ZXIudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvc2NlbmUvc2t5Ym94LnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL3NoYWRlci9iYWJ5bG9uLW10b29uLW1hdGVyaWFsL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy9zaGFkZXIvYmFieWxvbi1tdG9vbi1tYXRlcmlhbC9zcmMvaW5zcGVjdGFibGUtY3VzdG9tLXByb3BlcnRpZXMudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvc2hhZGVyL2JhYnlsb24tbXRvb24tbWF0ZXJpYWwvc3JjL210b29uLW1hdGVyaWFsLWRlZmluZXMudHMiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvLi9zcmMvc2hhZGVyL2JhYnlsb24tbXRvb24tbWF0ZXJpYWwvc3JjL210b29uLW1hdGVyaWFsLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL3NoYWRlci9iYWJ5bG9uLW10b29uLW1hdGVyaWFsL3NyYy9tdG9vbi1vdXRsaW5lLXJlbmRlcmVyLnRzIiwid2VicGFjazovL3YzZC1jb3JlLy4vc3JjL3V0aWxpdGllcy90eXBlcy50cyIsIndlYnBhY2s6Ly92M2QtY29yZS8uL3NyYy92M2QtY29yZS50cyIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3YzZC1jb3JlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3YzZC1jb3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3YzZC1jb3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92M2QtY29yZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdjNkLWNvcmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInYzZC1jb3JlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInYzZC1jb3JlXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5pbXBvcnQge0Fic3RyYWN0TWVzaCwgTWVzaCwgTnVsbGFibGUsIFNoYWRvd0dlbmVyYXRvciwgU2tlbGV0b24sIFNrZWxldG9uVmlld2VyLCBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZVwiO1xuaW1wb3J0IFYzRENvcmUgZnJvbSBcIi4vdjNkLWNvcmVcIjtcblxuZXhwb3J0IGNsYXNzIFYzREhlbHBlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjb3JlOiBWM0RDb3JlXG4gICAgKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBhIG5vZGUgY2FzdCBzaGFkb3cgZnJvbSBhIFNoYWRvd0dlbmVyYXRvclxuICAgICAqIEBwYXJhbSBzaGFkb3dHZW5lcmF0b3JcbiAgICAgKiBAcGFyYW0gbm9kZU5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkTm9kZVRvU2hhZG93Q2FzdGVyQnlOYW1lKFxuICAgICAgICBzaGFkb3dHZW5lcmF0b3I6IE51bGxhYmxlPFNoYWRvd0dlbmVyYXRvcj4sXG4gICAgICAgIG5vZGVOYW1lOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgc2hhZG93R2VuZXJhdG9yPy5hZGRTaGFkb3dDYXN0ZXIodGhpcy5jb3JlLnNjZW5lLmdldE5vZGVCeU5hbWUobm9kZU5hbWUpIGFzIE1lc2gpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2Ugbm9kZXMgY2FzdCBzaGFkb3cgZnJvbSBhIFNoYWRvd0dlbmVyYXRvclxuICAgICAqIEBwYXJhbSBzaGFkb3dHZW5lcmF0b3JcbiAgICAgKiBAcGFyYW0gbm9kZU5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkTm9kZVRvU2hhZG93Q2FzdGVyQ29udGFpbnNOYW1lKFxuICAgICAgICBzaGFkb3dHZW5lcmF0b3I6IE51bGxhYmxlPFNoYWRvd0dlbmVyYXRvcj4sXG4gICAgICAgIG5vZGVOYW1lOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgaWYgKCFzaGFkb3dHZW5lcmF0b3IpIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuY29yZS5zY2VuZS5nZXROb2RlcygpKSB7XG4gICAgICAgICAgICBpZiAobm9kZSAmJiBub2RlLm5hbWUuaW5jbHVkZXMobm9kZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgc2hhZG93R2VuZXJhdG9yLmFkZFNoYWRvd0Nhc3Rlcihub2RlIGFzIE1lc2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBub2RlIHJlY2VpdmUgc2hhZG93XG4gICAgICogQHBhcmFtIG5vZGVOYW1lXG4gICAgICovXG4gICAgcHVibGljIG1ha2VSZWNlaXZlU2hhZG93QnlOYW1lKG5vZGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgKHRoaXMuY29yZS5zY2VuZS5nZXROb2RlQnlOYW1lKG5vZGVOYW1lKSBhcyBNZXNoKS5yZWNlaXZlU2hhZG93cyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBub2RlcyByZWNlaXZlIHNoYWRvd1xuICAgICAqIEBwYXJhbSBub2RlTmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBtYWtlUmVjZWl2ZVNoYWRvd0NvbnRhaW5zTmFtZShub2RlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLmNvcmUuc2NlbmUuZ2V0Tm9kZXMoKSkge1xuICAgICAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5uYW1lLmluY2x1ZGVzKG5vZGVOYW1lKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIChub2RlIGFzIE1lc2gpLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93U2tlbGV0b25EZWJ1ZyhcbiAgICAgICAgc2tlbGV0b246IFNrZWxldG9uLFxuICAgICAgICBtZXNoOiBBYnN0cmFjdE1lc2hcbiAgICApIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHBhdXNlQW5pbWF0aW9ucyA6IHRydWUsIC8vVHJ1ZSBvciBGYWxzZSBmbGFnIHRvIHBhdXNlIHRoZSBhbmltYXRpb25zIHdoaWxlIHRyeWluZyB0byBjb25zdHJ1Y3QgdGhlIGRlYnVnTWVzaC4gRGVmYXVsdDogVHJ1ZVxuICAgICAgICAgICAgcmV0dXJuVG9SZXN0IDogZmFsc2UsIC8vRmxhZyB0byBmb3JjZSB0aGUgc2tlbGV0b24gYmFjayBpbnRvIGl0cyByZXN0UG9zZSBiZWZvcmUgY29uc3RydWN0aW5nIHRoZSBkZWJ1Z01lc2guIERlZmF1bHQ6IEZhbHNlXG4gICAgICAgICAgICBjb21wdXRlQm9uZXNVc2luZ1NoYWRlcnMgOiB0cnVlLCAvL1RlbGwgdGhlIGRlYnVnTWVzaCB0byB1c2Ugb3Igbm90IHVzZSB0aGUgR1BVIGZvciBpdHMgY2FsY3VsYXRpb25zLCBpZiB5b3UgZXZlciB3YW50IHRvIGRvIHBpY2tpbmcgb24gdGhlIG1lc2ggdGhpcyB3aWxsIG5lZWQgdG8gYmUgRmFsc2UuIERlZmF1bHQ6IFRydWVcbiAgICAgICAgICAgIHVzZUFsbEJvbmVzIDogdHJ1ZSwgLy9WaXN1YWxpemUgYWxsIGJvbmVzIG9yIHNraXAgdGhlIG9uZXMgd2l0aCBubyBpbmZsdWVuY2UuXG4gICAgICAgICAgICBkaXNwbGF5TW9kZSA6IFNrZWxldG9uVmlld2VyLkRJU1BMQVlfTElORVMsIC8vQSB2YWx1ZSB0aGF0IGNvbnRyb2xzIHdoaWNoIGRpc3BsYXkgbW9kZSB0byB1c2UuIChTa2VsZXRvblZpZXdlci5ESVNQTEFZX0xJTkVTID0gMCwgU2tlbGV0b25WaWV3ZXIuRElTUExBWV9TUEhFUkVTID0gMSwgU2tlbGV0b25WaWV3ZXIuRElTUExBWV9TUEhFUkVfQU5EX1NQVVJTID0gMikuIERlZmF1bHQgPSAwLlxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBza2VsZXRvblZpZXdlciA9IG5ldyBTa2VsZXRvblZpZXdlcihcbiAgICAgICAgICAgIHNrZWxldG9uLCAvL1RhcmdldCBTa2VsZXRvblxuICAgICAgICAgICAgbWVzaCwgLy9UaGF0IHNrZWxldG9ucyBBdHRhY2hlZCBNZXNoIG9yIGEgTm9kZSB3aXRoIHRoZSBzYW1lIGdsb2JhbE1hdHJpeFxuICAgICAgICAgICAgdGhpcy5jb3JlLnNjZW5lLCAvL1RoZSBTY2VuZSBzY29wZVxuICAgICAgICAgICAgdHJ1ZSwgLy9hdXRvVXBkYXRlQm9uZU1hdHJpY2VzP1xuICAgICAgICAgICAgbWVzaC5yZW5kZXJpbmdHcm91cElkID4gMCA/IG1lc2gucmVuZGVyaW5nR3JvdXBJZCArIDEgOiAxLCAvLyByZW5kZXJpbmdHcm91cElkXG4gICAgICAgICAgICBvcHRpb25zLCAvL0NvbmZpZ3VyYXRpb24gT3B0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBza2VsZXRvblZpZXdlcjtcbiAgICB9XG59XG4iLCIvKipcclxuICogVGhyb3dzIHdoZW4gbWFuZGF0b3J5IGJvbmUgY291bGQgbm90IGZpbmRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCb25lTm90Rm91bmRFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gJ0JvbmVOb3RGb3VuZEVycm9yJztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGJvbmVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihgQm9uZToke2JvbmVOYW1lfSBOb3RGb3VuZGApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZSc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBCb25lTm90Rm91bmRFcnJvciB9IGZyb20gJy4vZXJyb3JzJztcclxuXHJcbmludGVyZmFjZSBUcmFuc2Zvcm1Ob2RlTWFwIHtcclxuICAgIFtuYW1lOiBzdHJpbmddOiBUcmFuc2Zvcm1Ob2RlO1xyXG59XHJcblxyXG4vKipcclxuICogSHVtYW5vaWRCb25lIOOCkuWPluW+l+OBmeOCi+ODoeOCveODg+ODiee+pFxyXG4gKiBAc2VlIGh0dHBzOi8vZG9jcy51bml0eTNkLmNvbS9qYS8yMDE4LjMvU2NyaXB0UmVmZXJlbmNlL0h1bWFuQm9keUJvbmVzLmh0bWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBIdW1hbm9pZEJvbmUge1xyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvLyBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBub2RlTWFwOiBUcmFuc2Zvcm1Ob2RlTWFwKSB7fVxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyBub2RlTWFwOiBUcmFuc2Zvcm1Ob2RlTWFwKSB7fVxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLm5vZGVNYXAgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsLtcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBoaXBzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2hpcHMnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5aSq44KC44KCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFVwcGVyTGVnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2xlZnRVcHBlckxlZycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PlpKrjgoLjgoJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFVwcGVyTGVnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3JpZ2h0VXBwZXJMZWcnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem44Gy44GWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdExvd2VyTGVnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2xlZnRMb3dlckxlZycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PjgbLjgZZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodExvd2VyTGVnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3JpZ2h0TG93ZXJMZWcnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6Laz6aaWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdEZvb3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFuZGF0b3J5Qm9uZSgnbGVmdEZvb3QnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6Laz6aaWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRGb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ3JpZ2h0Rm9vdCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDohIrmpI7jga7nrKzkuIBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzcGluZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdzcGluZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDog7hcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjaGVzdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdjaGVzdCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpppZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuZWNrKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ25lY2snKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6aCtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaGVhZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdoZWFkJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puiCqVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRTaG91bGRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdsZWZ0U2hvdWxkZXInKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6IKpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRTaG91bGRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodFNob3VsZGVyJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puS4iuiFlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRVcHBlckFybSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdsZWZ0VXBwZXJBcm0nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5LiK6IWVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRVcHBlckFybSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodFVwcGVyQXJtJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puOBsuOBmFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRMb3dlckFybSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdsZWZ0TG93ZXJBcm0nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z44Gy44GYXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRMb3dlckFybSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodExvd2VyQXJtJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puaJi+mmllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRIYW5kKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hbmRhdG9yeUJvbmUoJ2xlZnRIYW5kJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+aJi+mmllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0SGFuZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYW5kYXRvcnlCb25lKCdyaWdodEhhbmQnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem44Gk44G+5YWIKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRUb2VzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFRvZXMnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z44Gk44G+5YWIKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0VG9lcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0VG9lcycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bnm64oT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdEV5ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRFeWUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z55uuKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0RXllKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRFeWUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6aGOKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGphdygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2phdycpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bopqrmjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFRodW1iUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0VGh1bWJQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bopqrmjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFRodW1iSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFRodW1iSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puimquaMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0VGh1bWJEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0VGh1bWJEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5Lq65beu44GX5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRJbmRleFByb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdEluZGV4UHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5Lq65beu44GX5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRJbmRleEludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRJbmRleEludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bkurrlt67jgZfmjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdEluZGV4RGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdEluZGV4RGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puS4reaMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0TWlkZGxlUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0TWlkZGxlUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5Lit5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRNaWRkbGVJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW3puS4reaMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsZWZ0TWlkZGxlRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdE1pZGRsZURpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bolqzmjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdFJpbmdQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRSaW5nUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6Jas5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRSaW5nSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFJpbmdJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem6Jas5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRSaW5nRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgnbGVmdFJpbmdEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5bCP5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRMaXR0bGVQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRMaXR0bGVQcm94aW1hbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6blsI/mjIfnrKzkuozmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGVmdExpdHRsZUludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bem5bCP5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRMaXR0bGVEaXN0YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdsZWZ0TGl0dGxlRGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+imquaMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFRodW1iUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodFRodW1iUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6Kaq5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0VGh1bWJJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodFRodW1iSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+imquaMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFRodW1iRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRUaHVtYkRpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7Pkurrlt67jgZfmjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRJbmRleFByb3hpbWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRJbmRleFByb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+S6uuW3ruOBl+aMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodEluZGV4SW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRJbmRleEludGVybWVkaWF0ZScpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7Pkurrlt67jgZfmjIfnrKzkuInmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRJbmRleERpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0SW5kZXhEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5Lit5oyH56ys5LiA5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TWlkZGxlUHJveGltYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodE1pZGRsZVByb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+S4reaMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodE1pZGRsZUludGVybWVkaWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+S4reaMh+esrOS4ieaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodE1pZGRsZURpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0TWlkZGxlRGlzdGFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+iWrOaMh+esrOS4gOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFJpbmdQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0UmluZ1Byb3hpbWFsJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPs+iWrOaMh+esrOS6jOaMh+mqqChPcHRpb25hbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByaWdodFJpbmdJbnRlcm1lZGlhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCdyaWdodFJpbmdJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z6Jas5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0UmluZ0Rpc3RhbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0UmluZ0Rpc3RhbCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PlsI/mjIfnrKzkuIDmjIfpqqgoT3B0aW9uYWwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRMaXR0bGVQcm94aW1hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25hbEJvbmUoJ3JpZ2h0TGl0dGxlUHJveGltYWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5bCP5oyH56ys5LqM5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+z5bCP5oyH56ys5LiJ5oyH6aqoKE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TGl0dGxlRGlzdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbmFsQm9uZSgncmlnaHRMaXR0bGVEaXN0YWwnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5LiK6IO4KE9wdGlvbmFsKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHVwcGVyQ2hlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uYWxCb25lKCd1cHBlckNoZXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv4XpoIjjg5zjg7zjg7PjgpLlj5blvpfjgZnjgovjgILlj5blvpflh7rmnaXjgarjgYTloLTlkIjjga/kvovlpJbjgpLnmbrnlJ/jgZnjgotcclxuICAgICAqXHJcbiAgICAgKiBAdGhyb3dzIEJvbmVOb3RGb3VuZEVycm9yXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBIdW1hbm9pZEJvbmVOYW1lXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWFuZGF0b3J5Qm9uZShuYW1lOiBzdHJpbmcpOiBUcmFuc2Zvcm1Ob2RlIHtcclxuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlTWFwW25hbWVdO1xyXG4gICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQm9uZU5vdEZvdW5kRXJyb3IobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Kq44OX44K344On44OK44Or44Oc44O844Oz44KS5Y+W5b6X44GZ44KLXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG5hbWUgSHVtYW5vaWRCb25lTmFtZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE9wdGlvbmFsQm9uZShuYW1lOiBzdHJpbmcpOiBOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm5vZGVNYXAgJiYgdGhpcy5ub2RlTWFwW25hbWVdKSB8fCBudWxsO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgQ29sb3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgeyBWZWN0b3I0IH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsLCBCYXNlVGV4dHVyZSwgVGV4dHVyZSwgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUnO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZSc7XHJcbmltcG9ydCB0eXBlIHsgSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmQgfSBmcm9tICcuL3ZybS1pbnRlcmZhY2VzJztcclxuLy8qIFRPRE86IEhhbmRsZSBsYXRlci5cclxuLy8gaW1wb3J0IHsgTVRvb25NYXRlcmlhbCB9IGZyb20gJ2JhYnlsb24tbXRvb24tbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsIH0gZnJvbSAnLi4vLi4vLi4vc2hhZGVyL2JhYnlsb24tbXRvb24tbWF0ZXJpYWwvc3JjJztcclxuXHJcbnR5cGUgU3VwcG9ydGVkTWF0ZXJpYWwgPSBNVG9vbk1hdGVyaWFsIHwgUEJSTWF0ZXJpYWw7XHJcblxyXG4vKipcclxuICogZmlyc3RWYWx1ZSDjga8gZmFsc2Ug5Zu65a6a44Gg44GM44CBIFVuaVZSTSDjgavlgKPjgaPjgablrprnvqnjgZfjgabjgYTjgotcclxuICovXHJcbnR5cGUgU2V0dGVyID0gKHZhbHVlOiBudW1iZXIsIGZpcnN0VmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XHJcblxyXG5jb25zdCBQQlJNYXRlcmlhbFRleHR1cmVNYXA6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXToga2V5b2YgUEJSTWF0ZXJpYWwgfSA9IHtcclxuICAgIF9NYWluVGV4OiAnYWxiZWRvVGV4dHVyZScsXHJcbn07XHJcblxyXG5jb25zdCBQQlJNYXRlcmlhbENvbG9yTWFwOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IGtleW9mIFBCUk1hdGVyaWFsIH0gPSB7XHJcbiAgICBfQ29sb3I6ICdhbGJlZG9Db2xvcicsXHJcbn07XHJcblxyXG5jb25zdCBNVG9vbk1hdGVyaWFsVGV4dHVyZU1hcDogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBrZXlvZiBNVG9vbk1hdGVyaWFsIH0gPSB7XHJcbiAgICBfTWFpblRleDogJ2RpZmZ1c2VUZXh0dXJlJyxcclxuICAgIF9FbWlzc2lvbk1hcDogJ2VtaXNzaXZlVGV4dHVyZScsXHJcbiAgICBfQnVtcE1hcDogJ2J1bXBUZXh0dXJlJyxcclxuICAgIF9TaGFkZVRleHR1cmU6ICdzaGFkZVRleHR1cmUnLFxyXG4gICAgX1JlY2VpdmVTaGFkb3dUZXh0dXJlOiAncmVjZWl2ZVNoYWRvd1RleHR1cmUnLFxyXG4gICAgX1NoYWRpbmdHcmFkZVRleHR1cmU6ICdzaGFkaW5nR3JhZGVUZXh0dXJlJyxcclxuICAgIF9SaW1UZXh0dXJlOiAncmltVGV4dHVyZScsXHJcbiAgICBfU3BoZXJlQWRkOiAnbWF0Q2FwVGV4dHVyZScsXHJcbiAgICBfT3V0bGluZVdpZHRoVGV4dHVyZTogJ291dGxpbmVXaWR0aFRleHR1cmUnLFxyXG4gICAgX1V2QW5pbU1hc2tUZXh0dXJlOiAndXZBbmltYXRpb25NYXNrVGV4dHVyZScsXHJcbn07XHJcblxyXG5jb25zdCBNVG9vbk1hdGVyaWFsQ29sb3JNYXA6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXToga2V5b2YgTVRvb25NYXRlcmlhbCB9ID0ge1xyXG4gICAgX0NvbG9yOiAnZGlmZnVzZUNvbG9yJyxcclxuICAgIF9TaGFkZUNvbG9yOiAnc2hhZGVDb2xvcicsXHJcbiAgICBfUmltQ29sb3I6ICdyaW1Db2xvcicsXHJcbiAgICBfRW1pc3Npb25Db2xvcjogJ2VtaXNzaXZlQ29sb3InLFxyXG4gICAgX091dGxpbmVDb2xvcjogJ291dGxpbmVDb2xvcicsXHJcbn07XHJcblxyXG4vKipcclxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvVW5pVlJNL2Jsb2IvNGZmZDk3YzJlOTMzOTY4M2NlOWJmMjFlNzNmNTEwYmQ5MGMyYTViMi9Bc3NldHMvVlJNL1J1bnRpbWUvQmxlbmRTaGFwZS9NYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlci5jc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbV9tYXRlcmlhbE1hcDogeyBbbWF0ZXJpYWxOYW1lOiBzdHJpbmddOiBTdXBwb3J0ZWRNYXRlcmlhbCB9ID0ge307XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1fbWF0ZXJpYWxTZXR0ZXJNYXA6IHsgW2JpbmRpbmdLZXk6IHN0cmluZ106IFNldHRlciB9ID0ge307XHJcbiAgICBwcml2YXRlIG1fbWF0ZXJpYWxWYWx1ZU1hcDogeyBbYmluZGluZ0tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuICAgIHByaXZhdGUgbV91c2VkOiB7IFt0YXJnZXRLZXk6IHN0cmluZ106IGFueSB9ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBiYXNlVmFsdWVDYWNoZTogeyBbYmluZGluZ0tleTogc3RyaW5nXTogVmVjdG9yNCB9ID0ge307XHJcbiAgICBwcml2YXRlIG1hdGVyaWFsVmFsdWVzVG9BcHBseTogeyBbYmluZGluZ0tleTogc3RyaW5nXTogSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmQgfSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG1hdGVyaWFscyBWUk3jga7lhaggTWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbFZhbHVlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobWF0ZXJpYWxzOiBNYXRlcmlhbFtdLCBwcml2YXRlIHJlYWRvbmx5IG1hdGVyaWFsVmFsdWVzOiBJVlJNQmxlbmRTaGFwZU1hdGVyaWFsQmluZFtdKSB7XHJcbiAgICAgICAgaWYgKG1hdGVyaWFscy5sZW5ndGggPT09IDAgfHwgbWF0ZXJpYWxWYWx1ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g44OX44Ot44OR44OG44Kj5ZCN44Gu5aSJ5o+b44Gr5a++5b+c44GX44Gm44GE44KLIE1Ub29uTWF0ZXJpYWwg44GoIFBCUk1hdGVyaWFsIOOCkuS/neWtmOOBmeOCi1xyXG4gICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwgaW5zdGFuY2VvZiBNVG9vbk1hdGVyaWFsIHx8IG1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9tYXRlcmlhbE1hcFttYXRlcmlhbC5uYW1lXSA9IG1hdGVyaWFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWF0ZXJpYWxWYWx1ZXMuZm9yRWFjaCgobWF0ZXJpYWxWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBiaW5kaW5nS2V5ID0gdGhpcy5tYWtlQmluZGluZ0tleShtYXRlcmlhbFZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9tYXRlcmlhbFNldHRlck1hcFtiaW5kaW5nS2V5XSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gdGhpcy5tX21hdGVyaWFsTWFwW21hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lXTtcclxuICAgICAgICAgICAgaWYgKCFtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VWYWx1ZSA9IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoIWJhc2VWYWx1ZSB8fCBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlLmxlbmd0aCAhPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOODouODvOODleOCo+ODs+OCsOeUqOOBqyBiYXNlVmFsdWUgKOWIneacn+WApCkg44GoIG1hdGVyaWFsVmFsdWUg44KS5L+d5a2Y44GZ44KLXHJcbiAgICAgICAgICAgIHRoaXMuYmFzZVZhbHVlQ2FjaGVbYmluZGluZ0tleV0gPSBiYXNlVmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxWYWx1ZXNUb0FwcGx5W2JpbmRpbmdLZXldID0gbWF0ZXJpYWxWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldFZhbHVlID0gVmVjdG9yNC5Gcm9tQXJyYXkobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlTmFtZSA9IG1hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lO1xyXG4gICAgICAgICAgICAvLyBVbml0eSDjgajluqfmqJnns7vjgYznlbDjgarjgovjgZ/jgoHjgIHjg4bjgq/jgrnjg4Hjg6Pjga4gdk9mZnNldCDjgpLlj43ou6LjgZnjgotcclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhQQlJNYXRlcmlhbFRleHR1cmVNYXApLnNvbWUoKGspID0+IHZhbHVlTmFtZS5zdGFydHNXaXRoKGspKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlLncgKj0gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoTVRvb25NYXRlcmlhbFRleHR1cmVNYXApLnNvbWUoKGspID0+IHZhbHVlTmFtZS5zdGFydHNXaXRoKGspKSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0VmFsdWUudyAqPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmFsdWVOYW1lLmVuZHNXaXRoKCdfU1RfUycpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDjg4bjgq/jgrnjg4Hjg6Pjga4gdeaWueWQkSDjga7jgb/mm7TmlrDjgZnjgotcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldHRlcjogU2V0dGVyID0gKHZhbHVlLCBmaXJzdFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlID0gZmlyc3RWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGJhc2VWYWx1ZS5hZGQodGFyZ2V0VmFsdWUuc3VidHJhY3QoYmFzZVZhbHVlKS5zY2FsZSh2YWx1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5nZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUpIS5hZGQodGFyZ2V0VmFsdWUuc3VidHJhY3QoYmFzZVZhbHVlKS5zY2FsZSh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lKSE7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjLnggPSBwcm9wVmFsdWUueDtcclxuICAgICAgICAgICAgICAgICAgICBzcmMueiA9IHByb3BWYWx1ZS56O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lLCBzcmMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9tYXRlcmlhbFNldHRlck1hcFtiaW5kaW5nS2V5XSA9IHNldHRlcjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWUuZW5kc1dpdGgoJ19TVF9UJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIOODhuOCr+OCueODgeODo+OBriB25pa55ZCRIOOBruOBv+abtOaWsOOBmeOCi1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0dGVyOiBTZXR0ZXIgPSAodmFsdWUsIGZpcnN0VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsdWUgPSBmaXJzdFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYmFzZVZhbHVlLmFkZCh0YXJnZXRWYWx1ZS5zdWJ0cmFjdChiYXNlVmFsdWUpLnNjYWxlKHZhbHVlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSkhLmFkZCh0YXJnZXRWYWx1ZS5zdWJ0cmFjdChiYXNlVmFsdWUpLnNjYWxlKHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gdGhpcy5nZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUpITtcclxuICAgICAgICAgICAgICAgICAgICBzcmMueSA9IHByb3BWYWx1ZS55O1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYy53ID0gcHJvcFZhbHVlLnc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUsIHNyYyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX21hdGVyaWFsU2V0dGVyTWFwW2JpbmRpbmdLZXldID0gc2V0dGVyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0dGVyOiBTZXR0ZXIgPSAodmFsdWUsIGZpcnN0VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsdWUgPSBmaXJzdFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYmFzZVZhbHVlLmFkZCh0YXJnZXRWYWx1ZS5zdWJ0cmFjdChiYXNlVmFsdWUpLnNjYWxlKHZhbHVlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmdldE1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWwsIHZhbHVlTmFtZSkhLmFkZCh0YXJnZXRWYWx1ZS5zdWJ0cmFjdChiYXNlVmFsdWUpLnNjYWxlKHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUsIHByb3BWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX21hdGVyaWFsU2V0dGVyTWFwW2JpbmRpbmdLZXldID0gc2V0dGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmlWUk0g44Gn44GvIERpY3Rpb25hcnkg44Gu44Kt44O855So44Gu44Kv44Op44K544KS5a6a576p44GX44Gm44GE44KL44GM44CB5paH5a2X5YiX44Gn5Luj55So44GZ44KLXHJcbiAgICAgKiBNYXRlcmlhbFZhbHVlQmluZGluZy5CYXNlVmFsdWUg44Gv5a++5b+c44GZ44KL44OX44Ot44OR44OG44Kj44Gu5Yid5pyf5YCk44Gq44Gu44Gn54Sh6KaW44Gn44GN44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWFrZUJpbmRpbmdLZXkobWF0ZXJpYWxWYWx1ZTogSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmQpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHttYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZX1fJHttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZX1fJHttYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlLmpvaW4oJy0nKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5pVlJNIOOBp+OBryBEaWN0aW9uYXJ5IOOBruOCreODvOeUqOOBruOCr+ODqeOCueOCkuWumue+qeOBl+OBpuOBhOOCi+OBjOOAgeaWh+Wtl+WIl+OBp+S7o+eUqOOBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1ha2VUYXJnZXRLZXkobWF0ZXJpYWxWYWx1ZTogSVZSTUJsZW5kU2hhcGVNYXRlcmlhbEJpbmQpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHttYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZX1fJHttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZX1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Oi44O844OV44Kj44Oz44Kw44KS6KGM44GGXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YCkKDDjgJwxKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW9ycGhpbmcodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYWNjdW11bGF0ZVZhbHVlKHZhbHVlKTtcclxuICAgICAgICB0aGlzLmFwcGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtYXRlcmlhbFZhbHVlIOOBlOOBqOOBq+mHjeOBv+OCkuioiOeul+OBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFjY3VtdWxhdGVWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbFZhbHVlcy5mb3JFYWNoKChtYXRlcmlhbFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJpbmRpbmdLZXkgPSB0aGlzLm1ha2VCaW5kaW5nS2V5KG1hdGVyaWFsVmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX21hdGVyaWFsVmFsdWVNYXBbYmluZGluZ0tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9tYXRlcmlhbFZhbHVlTWFwW2JpbmRpbmdLZXldICs9IHZhbHVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX21hdGVyaWFsVmFsdWVNYXBbYmluZGluZ0tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWF0ZXJpYWwg44Gu44OX44Ot44OR44OG44Kj44KS5pu05paw44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXBwbHkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX3VzZWQgPSB7fTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXModGhpcy5tYXRlcmlhbFZhbHVlc1RvQXBwbHkpLmZvckVhY2goKFtiaW5kaW5nS2V5LCBtYXRlcmlhbFZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRLZXkgPSB0aGlzLm1ha2VUYXJnZXRLZXkobWF0ZXJpYWxWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICghKHRhcmdldEtleSBpbiB0aGlzLm1fdXNlZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gdGhpcy5tX21hdGVyaWFsTWFwW21hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5iYXNlVmFsdWVDYWNoZVtiaW5kaW5nS2V5XS5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWvvuixoeOBruODl+ODreODkeODhuOCo+OCkuWIneacn+WApOOBq+aIu+OBmVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVOYW1lID0gbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVOYW1lLmVuZHNXaXRoKCdfU1RfUycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IHRoaXMuZ2V0TWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbCwgdmFsdWVOYW1lKSE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUueSA9IHYueTtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS53ID0gdi53O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWUuZW5kc1dpdGgoJ19TVF9UJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gdGhpcy5nZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUpITtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS54ID0gdi54O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnogPSB2Lno7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsLCB2YWx1ZU5hbWUsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV91c2VkW3RhcmdldEtleV0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXR0ZXIgPSB0aGlzLm1fbWF0ZXJpYWxTZXR0ZXJNYXBbYmluZGluZ0tleV07XHJcbiAgICAgICAgICAgIGlmIChzZXR0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHNldHRlcih0aGlzLm1fbWF0ZXJpYWxWYWx1ZU1hcFtiaW5kaW5nS2V5XSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubV9tYXRlcmlhbFZhbHVlTWFwID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg57jg4bjg6rjgqLjg6vjga7jg4bjgq/jgrnjg4Hjg6PjgYvoibLjgavlr77lv5zjgZnjgosgVmVjdG9yNCDjgpLlj5blvpfjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsOiBTdXBwb3J0ZWRNYXRlcmlhbCwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBOdWxsYWJsZTxWZWN0b3I0PiB7XHJcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBwcm9wZXJ0eU5hbWUubWF0Y2goL14oX1teX10rKS8pO1xyXG4gICAgICAgIGlmICghbWF0Y2ggfHwgIW1hdGNoWzFdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBrZXkgPSBtYXRjaFsxXTtcclxuICAgICAgICBpZiAobWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBpZiAoUEJSTWF0ZXJpYWxUZXh0dXJlTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUZXh0dXJlSW50b1ZlY3RvcjRXaGVuTm90TnVsbChtYXRlcmlhbFtQQlJNYXRlcmlhbFRleHR1cmVNYXBba2V5XV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChQQlJNYXRlcmlhbENvbG9yTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRDb2xvckludG9WZWN0b3I0KG1hdGVyaWFsW1BCUk1hdGVyaWFsQ29sb3JNYXBba2V5XV0sIG1hdGVyaWFsLmFscGhhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTVRvb25NYXRlcmlhbFxyXG4gICAgICAgIGlmIChNVG9vbk1hdGVyaWFsVGV4dHVyZU1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUZXh0dXJlSW50b1ZlY3RvcjRXaGVuTm90TnVsbChtYXRlcmlhbFtNVG9vbk1hdGVyaWFsVGV4dHVyZU1hcFtrZXldXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNVG9vbk1hdGVyaWFsQ29sb3JNYXBba2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0Q29sb3JJbnRvVmVjdG9yNChtYXRlcmlhbFtNVG9vbk1hdGVyaWFsQ29sb3JNYXBba2V5XV0sIG1hdGVyaWFsLmFscGhhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXh0dXJlIOOCkiBWZWN0b3I0IOOBq+WkieaPm+OBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnZlcnRUZXh0dXJlSW50b1ZlY3RvcjRXaGVuTm90TnVsbCh0ZXh0dXJlOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4pOiBOdWxsYWJsZTxWZWN0b3I0PiB7XHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0ID0gdGV4dHVyZSBhcyBUZXh0dXJlO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yNCh0LnVTY2FsZSwgdC52U2NhbGUsIHQudU9mZnNldCwgdC52T2Zmc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbG9yMyDjgasgYWxwaGEg44KS5Yqg44GI44GmIFZlY3RvcjQg44Gr5aSJ5o+b44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVydENvbG9ySW50b1ZlY3RvcjQoY29sb3I6IENvbG9yMywgYWxwaGE6IG51bWJlcik6IFZlY3RvcjQge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yNChjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBhbHBoYSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg57jg4bjg6rjgqLjg6vjga7jg4bjgq/jgrnjg4Hjg6PjgYvoibLjgpLmm7TmlrDjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsOiBTdXBwb3J0ZWRNYXRlcmlhbCwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBWZWN0b3I0KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBwcm9wZXJ0eU5hbWUubWF0Y2goL14oX1teX10rKS8pO1xyXG4gICAgICAgIGlmICghbWF0Y2ggfHwgIW1hdGNoWzFdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qga2V5ID0gbWF0Y2hbMV07XHJcbiAgICAgICAgaWYgKG1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgaWYgKFBCUk1hdGVyaWFsVGV4dHVyZU1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHR1cmVXaGVuTm90TnVsbChtYXRlcmlhbFtQQlJNYXRlcmlhbFRleHR1cmVNYXBba2V5XV0sIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoUEJSTWF0ZXJpYWxDb2xvck1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnX0NvbG9yJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhID0gdmFsdWUudztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29sb3IobWF0ZXJpYWxbUEJSTWF0ZXJpYWxDb2xvck1hcFtrZXldXSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTVRvb25NYXRlcmlhbFxyXG4gICAgICAgIGlmIChNVG9vbk1hdGVyaWFsVGV4dHVyZU1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dHVyZVdoZW5Ob3ROdWxsKG1hdGVyaWFsW01Ub29uTWF0ZXJpYWxUZXh0dXJlTWFwW2tleV1dLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1Ub29uTWF0ZXJpYWxDb2xvck1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdfQ29sb3InKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYSA9IHZhbHVlLnc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb2xvcihtYXRlcmlhbFtNVG9vbk1hdGVyaWFsQ29sb3JNYXBba2V5XV0sIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXh0dXJlIOOCkiBWZWN0b3I0IOOBp+abtOaWsOOBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRleHR1cmVXaGVuTm90TnVsbCh0ZXh0dXJlOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4sIHZhbHVlOiBWZWN0b3I0KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRleHR1cmUpIHtcclxuICAgICAgICAgICAgY29uc3QgdCA9IHRleHR1cmUgYXMgVGV4dHVyZTtcclxuICAgICAgICAgICAgdC51U2NhbGUgPSB2YWx1ZS54O1xyXG4gICAgICAgICAgICB0LnZTY2FsZSA9IHZhbHVlLnk7XHJcbiAgICAgICAgICAgIHQudU9mZnNldCA9IHZhbHVlLno7XHJcbiAgICAgICAgICAgIHQudk9mZnNldCA9IHZhbHVlLnc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29sb3IzIOOCkiBWZWN0b3I0IOOBp+abtOaWsOOBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNvbG9yKGNvbG9yOiBDb2xvcjMsIHZhbHVlOiBWZWN0b3I0KTogdm9pZCB7XHJcbiAgICAgICAgY29sb3IuciA9IHZhbHVlLng7XHJcbiAgICAgICAgY29sb3IuZyA9IHZhbHVlLnk7XHJcbiAgICAgICAgY29sb3IuYiA9IHZhbHVlLno7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBWZWN0b3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL3RyYW5zZm9ybU5vZGUnO1xyXG5pbXBvcnQgeyBTcGhlcmVCdWlsZGVyIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy9CdWlsZGVycy9zcGhlcmVCdWlsZGVyJztcclxuaW1wb3J0IHsgQ29sbGlkZXIgfSBmcm9tICcuL2NvbGxpZGVyJztcclxuXHJcbi8qKlxyXG4gKiBWUk0gU3ByaW5nQm9uZSBDb2xsaWRlckdyb3VwXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29sbGlkZXJHcm91cCB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgY29sbGlkZXJzOiBDb2xsaWRlcltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gdHJhbnNmb3JtIFRoZSBub2RlIG9mIHRoZSBjb2xsaWRlciBncm91cCBmb3Igc2V0dGluZyB1cCBjb2xsaXNpb24gZGV0ZWN0aW9ucy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0cmFuc2Zvcm06IFRyYW5zZm9ybU5vZGUpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgb2Zmc2V0dGVkIGNvbGxpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9mZnNldCBUaGUgbG9jYWwgY29vcmRpbmF0ZSBmcm9tIHRoZSBub2RlIG9mIHRoZSBjb2xsaWRlciBncm91cC5cclxuICAgICAqIEBwYXJhbSByYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgY29sbGlkZXIuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRDb2xsaWRlcihvZmZzZXQ6IFZlY3RvcjMsIHJhZGl1czogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3Qgc3BoZXJlID0gU3BoZXJlQnVpbGRlci5DcmVhdGVTcGhlcmUoXHJcbiAgICAgICAgICAgIGAke3RoaXMudHJhbnNmb3JtLm5hbWV9X0NvbGxpZGVyU3BoZXJlYCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudHM6IDYsXHJcbiAgICAgICAgICAgICAgICBkaWFtZXRlcjogcmFkaXVzICogMi4wLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5nZXRTY2VuZSgpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzcGhlcmUuc2V0UGFyZW50KHRoaXMudHJhbnNmb3JtKTtcclxuICAgICAgICBzcGhlcmUuc2V0UG9zaXRpb25XaXRoTG9jYWxWZWN0b3Iob2Zmc2V0KTtcclxuICAgICAgICBzcGhlcmUuc2V0RW5hYmxlZChmYWxzZSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29sbGlkZXJzLnB1c2gobmV3IENvbGxpZGVyKG9mZnNldCwgcmFkaXVzLCBzcGhlcmUpKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tICdAYmFieWxvbmpzL2NvcmUnO1xyXG5pbXBvcnQgdHlwZSB7IFZlY3RvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcblxyXG4vKipcclxuICogQ29sbGlkZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb2xsaWRlciB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBvZmZzZXQgVGhlIGxvY2FsIGNvb3JkaW5hdGUgZnJvbSB0aGUgbm9kZSBvZiB0aGUgY29sbGlkZXIgZ3JvdXAuXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIGNvbGxpZGVyLlxyXG4gICAgICogQHBhcmFtIHNwaGVyZSBUaGUgc3BlaGVyZSBtZXNoIGZvciB3b3JsZE1hdHJpeCBhbmQgZ2l6bW8uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb2Zmc2V0OiBWZWN0b3IzLCBwdWJsaWMgcmVhZG9ubHkgcmFkaXVzOiBudW1iZXIsIHB1YmxpYyByZWFkb25seSBzcGhlcmU6IE1lc2gpIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoJztcclxuaW1wb3J0IHR5cGUgeyBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlJztcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB0eXBlIHsgSVZSTVNlY29uZGFyeUFuaW1hdGlvbiB9IGZyb20gJy4uL3ZybS1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vY29sbGlkZXItZ3JvdXAnO1xyXG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lIH0gZnJvbSAnLi92cm0tc3ByaW5nLWJvbmUnO1xyXG5cclxuLyoqXHJcbiAqIGZ1bmN0aW9uIHRvIGdldCBib25lIGZyb20gbm9kZUluZGV4XHJcbiAqL1xyXG50eXBlIGdldEJvbmUgPSAobm9kZUluZGV4OiBudW1iZXIpID0+IE51bGxhYmxlPFRyYW5zZm9ybU5vZGU+O1xyXG5cclxuLy8qIFRPRE86IFBhdGNoZWQuXHJcbi8qKlxyXG4gKiBPcHRpb25zIGZvciBjcmVhdGluZyBzcHJpbmdzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENvbnN0cnVjdFNwcmluZ3NPcHRpb25zIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJlc2lsaWVuY2Ugb2YgdGhlIHN3YXlpbmcgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHN0aWZmbmVzcz86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHN0cmVuZ3RoIG9mIGdyYXZpdHlcclxuICAgICAqL1xyXG4gICAgZ3Jhdml0eVBvd2VyPzogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGlyZWN0aW9uIG9mIGdyYXZpdHkuIFNldCAoMCwgLTEsIDApIGZvciBzaW11bGF0aW5nIHRoZSBncmF2aXR5LiBTZXQgKDEsIDAsIDApIGZvciBzaW11bGF0aW5nIHRoZSB3aW5kLlxyXG4gICAgICovXHJcbiAgICBncmF2aXR5RGlyPzogVmVjdG9yMztcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJlc2lzdGFuY2UgKGRlY2VsZXJhdGlvbikgb2YgYXV0b21hdGljIGFuaW1hdGlvblxyXG4gICAgICovXHJcbiAgICBkcmFnRm9yY2U/OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSByYWRpdXMgb2YgdGhlIHNwaGVyZSB1c2VkIGZvciB0aGUgY29sbGlzaW9uIGRldGVjdGlvbiB3aXRoIGNvbGxpZGVyc1xyXG4gICAgICovXHJcbiAgICBoaXRSYWRpdXM/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBWUk0gU3ByaW5nQm9uZSBDb250cm9sbGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3ByaW5nQm9uZUNvbnRyb2xsZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTcHJpbmcgQm9uZSBMaXN0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3ByaW5nczogVlJNU3ByaW5nQm9uZVtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGV4dCBTZWNvbmRhcnlBbmltYXRpb24gT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gZ2V0Qm9uZVxyXG4gICAgICovXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZXh0OiBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uLCBnZXRCb25lOiBnZXRCb25lLCBvcHRpb25zPzogQ29uc3RydWN0U3ByaW5nc09wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IHRoaXMuY29uc3RydWN0Q29sbGlkZXJHcm91cHMoZ2V0Qm9uZSk7XHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgLy8gdGhpcy5zcHJpbmdzID0gdGhpcy5jb25zdHJ1Y3RTcHJpbmdzKGdldEJvbmUsIGNvbGxpZGVyR3JvdXBzKTtcclxuICAgICAgICB0aGlzLnNwcmluZ3MgPSB0aGlzLmNvbnN0cnVjdFNwcmluZ3MoZ2V0Qm9uZSwgY29sbGlkZXJHcm91cHMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuc3ByaW5ncyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGFsbCBTcHJpbmdCb25lc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkZWx0YVRpbWUgRWxhcHNlZCBzZWMgZnJvbSBwcmV2aW91cyBmcmFtZVxyXG4gICAgICogQHNlZSBodHRwczovL2RvY3MudW5pdHkzZC5jb20vU2NyaXB0UmVmZXJlbmNlL1RpbWUtZGVsdGFUaW1lLmh0bWxcclxuICAgICAqL1xyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvLyBwdWJsaWMgYXN5bmMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyLCBib25lT3B0aW9ucz86IENvbnN0cnVjdFNwcmluZ3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8g44Od44O844K65b6M44Gu44GC44KJ44G244KK6Ziy5q2i44Gu44Gf44KBIGNsYW1wXHJcbiAgICAgICAgZGVsdGFUaW1lID0gTWF0aC5tYXgoMC4wLCBNYXRoLm1pbigxNi42NjYsIGRlbHRhVGltZSkpIC8gMTAwMDtcclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IHRoaXMuc3ByaW5ncy5tYXA8UHJvbWlzZTx2b2lkPj4oKHNwcmluZykgPT4ge1xyXG4gICAgICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAgICAgLy8gcmV0dXJuIHNwcmluZy51cGRhdGUoZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNwcmluZy51cGRhdGUoZGVsdGFUaW1lLCBib25lT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLyogRG8gbm90aGluZyAqL1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0Q29sbGlkZXJHcm91cHMoZ2V0Qm9uZTogZ2V0Qm9uZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5leHQuY29sbGlkZXJHcm91cHMgfHwgIXRoaXMuZXh0LmNvbGxpZGVyR3JvdXBzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzOiBDb2xsaWRlckdyb3VwW10gPSBbXTtcclxuICAgICAgICB0aGlzLmV4dC5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvbmUgPSBnZXRCb25lKGNvbGxpZGVyR3JvdXAubm9kZSkgYXMgVHJhbnNmb3JtTm9kZTtcclxuICAgICAgICAgICAgY29uc3QgZyA9IG5ldyBDb2xsaWRlckdyb3VwKGJvbmUpO1xyXG4gICAgICAgICAgICBjb2xsaWRlckdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZy5hZGRDb2xsaWRlcihcclxuICAgICAgICAgICAgICAgICAgICAvLyBWUk0g5Y+z5omL57O7WV9VUCwgLVpfRnJvbnQg44GL44KJIEJhYnlsb24uanMg5bem5omL57O7WV9VUCwgK1pfRnJvbnQg44Gr44GZ44KLXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3RvcjMoLWNvbGxpZGVyLm9mZnNldC54LCBjb2xsaWRlci5vZmZzZXQueSwgLWNvbGxpZGVyLm9mZnNldC56KSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5yYWRpdXNcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb2xsaWRlckdyb3Vwcy5wdXNoKGcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjb2xsaWRlckdyb3VwcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdFNwcmluZ3MoZ2V0Qm9uZTogZ2V0Qm9uZSwgY29sbGlkZXJHcm91cHM6IENvbGxpZGVyR3JvdXBbXSwgb3B0aW9ucz86IENvbnN0cnVjdFNwcmluZ3NPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmV4dC5ib25lR3JvdXBzIHx8ICF0aGlzLmV4dC5ib25lR3JvdXBzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNwcmluZ3M6IFZSTVNwcmluZ0JvbmVbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZXh0LmJvbmVHcm91cHMuZm9yRWFjaCgoc3ByaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvb3RCb25lcyA9IChzcHJpbmcuYm9uZXMgfHwgW10pLm1hcCgoYm9uZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEJvbmUoYm9uZSkgYXMgVHJhbnNmb3JtTm9kZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcmluZ0NvbGxpZGVycyA9IChzcHJpbmcuY29sbGlkZXJHcm91cHMgfHwgW10pLm1hcDxDb2xsaWRlckdyb3VwPigoZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxpZGVyR3JvdXBzW2ddO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3ByaW5ncy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgICAgICAgICAvLyBuZXcgVlJNU3ByaW5nQm9uZShcclxuICAgICAgICAgICAgICAgIC8vICAgICBzcHJpbmcuY29tbWVudCxcclxuICAgICAgICAgICAgICAgIC8vICAgICBzcHJpbmcuc3RpZmZpbmVzcyxcclxuICAgICAgICAgICAgICAgIC8vICAgICBzcHJpbmcuZ3Jhdml0eVBvd2VyLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG5ldyBWZWN0b3IzKFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAvLyBWUk0g5Y+z5omL57O7WV9VUCwgLVpfRnJvbnQg44GL44KJIEJhYnlsb24uanMg5bem5omL57O7WV9VUCwgK1pfRnJvbnQg44Gr44GZ44KLXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC1zcHJpbmcuZ3Jhdml0eURpci54LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBzcHJpbmcuZ3Jhdml0eURpci55LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAtc3ByaW5nLmdyYXZpdHlEaXIuelxyXG4gICAgICAgICAgICAgICAgLy8gICAgICkubm9ybWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc3ByaW5nLmRyYWdGb3JjZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICBnZXRCb25lKHNwcmluZy5jZW50ZXIpLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNwcmluZy5oaXRSYWRpdXMsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgcm9vdEJvbmVzLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNwcmluZ0NvbGxpZGVyc1xyXG4gICAgICAgICAgICAgICAgLy8gKVxyXG4gICAgICAgICAgICAgICAgbmV3IFZSTVNwcmluZ0JvbmUoXHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaW5nLmNvbW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz8uc3RpZmZuZXNzID8gb3B0aW9ucy5zdGlmZm5lc3MgOiBzcHJpbmcuc3RpZmZpbmVzcyxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPy5ncmF2aXR5UG93ZXIgPyBvcHRpb25zLmdyYXZpdHlQb3dlciA6IHNwcmluZy5ncmF2aXR5UG93ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz8uZ3Jhdml0eURpclxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbnMuZ3Jhdml0eURpclxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBWZWN0b3IzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWUk0g5Y+z5omL57O7WV9VUCwgLVpfRnJvbnQg44GL44KJIEJhYnlsb24uanMg5bem5omL57O7WV9VUCwgK1pfRnJvbnQg44Gr44GZ44KLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1zcHJpbmcuZ3Jhdml0eURpci54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpbmcuZ3Jhdml0eURpci55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtc3ByaW5nLmdyYXZpdHlEaXIuelxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICkubm9ybWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz8uZHJhZ0ZvcmNlID8gb3B0aW9ucy5kcmFnRm9yY2UgOiBzcHJpbmcuZHJhZ0ZvcmNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGdldEJvbmUoc3ByaW5nLmNlbnRlciksXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz8uaGl0UmFkaXVzID8gb3B0aW9ucy5oaXRSYWRpdXMgOiBzcHJpbmcuaGl0UmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvb3RCb25lcyxcclxuICAgICAgICAgICAgICAgICAgICBzcHJpbmdDb2xsaWRlcnNcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3ByaW5ncztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNYXRyaXgsIFF1YXRlcm5pb24sIFZlY3RvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZSc7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IENvbGxpZGVyR3JvdXAgfSBmcm9tICcuL2NvbGxpZGVyLWdyb3VwJztcclxuLy8gYmFzZWQgb25cclxuLy8gaHR0cDovL3JvY2tldGp1bXAuc2tyLmpwL3VuaXR5M2QvMTA5L1xyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9ibG9iL21hc3Rlci9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jc1xyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL2Jsb2IvYWFkNTUxZTA0MWZhZDU1M2MxOWQyMDkxZTVmNWVhZmYxZWI4ZmFhOC9wYWNrYWdlcy90aHJlZS12cm0vc3JjL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZS50c1xyXG5cclxuY29uc3QgSURFTlRJVFlfTUFUUklYID0gTWF0cml4LklkZW50aXR5KCk7XHJcblxyXG5jb25zdCBfdjNBID0gbmV3IFZlY3RvcjMoKTtcclxuY29uc3QgX3YzQiA9IG5ldyBWZWN0b3IzKCk7XHJcbmNvbnN0IF92M0MgPSBuZXcgVmVjdG9yMygpO1xyXG5jb25zdCBfcXVhdEEgPSBuZXcgUXVhdGVybmlvbigpO1xyXG5jb25zdCBfbWF0QSA9IG5ldyBNYXRyaXgoKTtcclxuY29uc3QgX21hdEIgPSBuZXcgTWF0cml4KCk7XHJcblxyXG4vKipcclxuICogVmVybGV0IFNwcmluZyBCb25lXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUxvZ2ljIHtcclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbCBsb2NhbCB0cmFuc2Zvcm0gTWFyaXhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbml0aWFsTG9jYWxNYXRyaXg6IE1hdHJpeDtcclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVkIGluaXRpYWwgbG9jYWwgcm90YXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbml0aWFsTG9jYWxSb3RhdGlvbjogUXVhdGVybmlvbjtcclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVkIGluaXRpYWwgbG9jYWwgY2hpbGQgcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uOiBWZWN0b3IzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGVuZ3RoIG9mIHRoZSBib25lIGluIHJlbGF0aXZlIHNwYWNlIHVuaXQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2VudGVyU3BhY2VCb25lTGVuZ3RoOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSBib25lIGluIHJlbGF0aXZlIHNwYWNlIHVuaXQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2VudGVyU3BhY2VQb3NpdGlvbjogVmVjdG9yMztcclxuICAgIC8qKlxyXG4gICAgICogUmVmZXJlbmNlIG9mIHBhcmVudCByb3RhdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJvbmVBeGlzOiBWZWN0b3IzO1xyXG5cclxuICAgIHByaXZhdGUgY3VycmVudFRhaWw6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygpO1xyXG4gICAgcHJpdmF0ZSBwcmV2VGFpbDogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKCk7XHJcbiAgICBwcml2YXRlIG5leHRUYWlsOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBjZW50ZXIgQ2VudGVyIHJlZmVyZW5jZSBvZiBUcmFuc2Zvcm1Ob2RlXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIENvbGxpc2lvbiBSYWRpdXNcclxuICAgICAqIEBwYXJhbSB0cmFuc2Zvcm0gQmFzZSBUcmFuc2Zvcm1Ob2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY2VudGVyOiBOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPiwgcHVibGljIHJlYWRvbmx5IHJhZGl1czogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgdHJhbnNmb3JtOiBUcmFuc2Zvcm1Ob2RlKSB7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSByb3RhdGlvblF1YXRlcm5pb24gd2hlbiBub3QgaW5pdGlhbGl6ZWRcclxuICAgICAgICBpZiAoIXRyYW5zZm9ybS5yb3RhdGlvblF1YXRlcm5pb24pIHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtLnJvdGF0aW9uUXVhdGVybmlvbiA9IHRyYW5zZm9ybS5yb3RhdGlvbi50b1F1YXRlcm5pb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdvcmxkTWF0cml4ID0gdHJhbnNmb3JtLmdldFdvcmxkTWF0cml4KCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uID0gd29ybGRNYXRyaXguZ2V0VHJhbnNsYXRpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0aWFsTG9jYWxNYXRyaXggPSB0cmFuc2Zvcm0uX2xvY2FsTWF0cml4LmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsTG9jYWxSb3RhdGlvbiA9IHRyYW5zZm9ybS5yb3RhdGlvblF1YXRlcm5pb24uY2xvbmUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0cmFuc2Zvcm0uZ2V0Q2hpbGRUcmFuc2Zvcm1Ob2Rlcyh0cnVlKTtcclxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbiA9IHRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpLm5vcm1hbGl6ZSgpLnNjYWxlSW5QbGFjZSgwLjA3KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24gPSBjaGlsZHJlblswXS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKHRoaXMuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbiwgd29ybGRNYXRyaXgsIHRoaXMuY3VycmVudFRhaWwpO1xyXG4gICAgICAgIHRoaXMucHJldlRhaWwuY29weUZyb20odGhpcy5jdXJyZW50VGFpbCk7XHJcbiAgICAgICAgdGhpcy5uZXh0VGFpbC5jb3B5RnJvbSh0aGlzLmN1cnJlbnRUYWlsKTtcclxuXHJcbiAgICAgICAgdGhpcy5ib25lQXhpcyA9IHRoaXMuaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbi5ub3JtYWxpemVUb05ldygpO1xyXG4gICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLmluaXRpYWxMb2NhbENoaWxkUG9zaXRpb24sIHdvcmxkTWF0cml4LCBfdjNBKTtcclxuICAgICAgICB0aGlzLmNlbnRlclNwYWNlQm9uZUxlbmd0aCA9IF92M0Euc3VidHJhY3RJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbikubGVuZ3RoKCk7XHJcblxyXG4gICAgICAgIGlmIChjZW50ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLmN1cnJlbnRUYWlsLCBfbWF0QSwgdGhpcy5jdXJyZW50VGFpbCk7XHJcbiAgICAgICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLnByZXZUYWlsLCBfbWF0QSwgdGhpcy5wcmV2VGFpbCk7XHJcbiAgICAgICAgICAgIFZlY3RvcjMuVHJhbnNmb3JtQ29vcmRpbmF0ZXNUb1JlZih0aGlzLm5leHRUYWlsLCBfbWF0QSwgdGhpcy5uZXh0VGFpbCk7XHJcblxyXG4gICAgICAgICAgICB3b3JsZE1hdHJpeC5tdWx0aXBseVRvUmVmKF9tYXRBLCBfbWF0QSk7XHJcblxyXG4gICAgICAgICAgICBfbWF0QS5nZXRUcmFuc2xhdGlvblRvUmVmKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzVG9SZWYodGhpcy5pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLCBfbWF0QSwgX3YzQSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyU3BhY2VCb25lTGVuZ3RoID0gX3YzQS5zdWJ0cmFjdEluUGxhY2UodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKS5sZW5ndGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgVGFpbCBwb3NpdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzdGlmZm5lc3NGb3JjZSBDdXJyZW50IGZyYW1lIHN0aWZmbmVzc1xyXG4gICAgICogQHBhcmFtIGRyYWdGb3JjZSBDdXJyZW50IGZyYW1lIGRyYWcgZm9yY2VcclxuICAgICAqIEBwYXJhbSBleHRlcm5hbCBDdXJyZW50IGZyYW1lIGV4dGVybmFsIGZvcmNlXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkZXJHcm91cHMgQ3VycmVudCBmcmFtZSBjb2xsaWRlckdyb3Vwc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKHN0aWZmbmVzc0ZvcmNlOiBudW1iZXIsIGRyYWdGb3JjZTogbnVtYmVyLCBleHRlcm5hbDogVmVjdG9yMywgY29sbGlkZXJHcm91cHM6IENvbGxpZGVyR3JvdXBbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy50cmFuc2Zvcm0uZ2V0QWJzb2x1dGVQb3NpdGlvbigpLngpKSB7XHJcbiAgICAgICAgICAgIC8vIERvIG5vdCB1cGRhdGUgd2hlbiBhYnNvbHV0ZSBwb3NpdGlvbiBpcyBpbnZhbGlkXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldCBib25lIHBvc2l0aW9uIGluIGNlbnRlciBzcGFjZVxyXG4gICAgICAgIHRoaXMuZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0uZ2V0V29ybGRNYXRyaXgoKS5tdWx0aXBseVRvUmVmKF9tYXRBLCBfbWF0QSk7XHJcbiAgICAgICAgX21hdEEuZ2V0VHJhbnNsYXRpb25Ub1JlZih0aGlzLmNlbnRlclNwYWNlUG9zaXRpb24pO1xyXG5cclxuICAgICAgICAvLyBHZXQgcGFyZW50IHBvc2l0aW9uIGluIGNlbnRlciBzcGFjZVxyXG4gICAgICAgIHRoaXMuZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0Qik7XHJcbiAgICAgICAgdGhpcy5nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLm11bHRpcGx5VG9SZWYoX21hdEIsIF9tYXRCKTtcclxuXHJcbiAgICAgICAgLy8gdmVybGV056mN5YiG44Gn5qyh44Gu5L2N572u44KS6KiI566XXHJcbiAgICAgICAgdGhpcy5uZXh0VGFpbC5jb3B5RnJvbSh0aGlzLmN1cnJlbnRUYWlsKTtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIOa4m+ihsOS7mOOBjeOBp+WJjeOBruODleODrOODvOODoOOBruenu+WLleOCkue2mee2mlxyXG4gICAgICAgICAgICBfdjNBLmNvcHlGcm9tKHRoaXMuY3VycmVudFRhaWwpXHJcbiAgICAgICAgICAgICAgICAuc3VidHJhY3RJblBsYWNlKHRoaXMucHJldlRhaWwpXHJcbiAgICAgICAgICAgICAgICAuc2NhbGVJblBsYWNlKDEuMCAtIGRyYWdGb3JjZSk7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dFRhaWwuYWRkSW5QbGFjZShfdjNBKTtcclxuICAgICAgICB9XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyDopqrjga7lm57ou6LjgavjgojjgovlrZDjg5zjg7zjg7Pjga7np7vli5Xnm67mqJlcclxuICAgICAgICAgICAgX3YzQS5jb3B5RnJvbSh0aGlzLmJvbmVBeGlzKTtcclxuICAgICAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKF92M0EsIHRoaXMuaW5pdGlhbExvY2FsTWF0cml4LCBfdjNBKTtcclxuICAgICAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKF92M0EsIF9tYXRCLCBfdjNBKTtcclxuICAgICAgICAgICAgX3YzQS5zdWJ0cmFjdEluUGxhY2UodGhpcy5jZW50ZXJTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKS5zY2FsZUluUGxhY2Uoc3RpZmZuZXNzRm9yY2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRUYWlsLmFkZEluUGxhY2UoX3YzQSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8g5aSW5Yqb44Gr44KI44KL56e75YuV6YePXHJcbiAgICAgICAgICAgIHRoaXMubmV4dFRhaWwuYWRkSW5QbGFjZShleHRlcm5hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8g6ZW344GV44KSIGJvbmVMZW5ndGgg44Gr5by35Yi2XHJcbiAgICAgICAgICAgIHRoaXMubmV4dFRhaWwuc3VidHJhY3RJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCkuc2NhbGVJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VCb25lTGVuZ3RoKS5hZGRJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ29sbGlzaW9uIOOBp+enu+WLlVxyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGUoY29sbGlkZXJHcm91cHMsIHRoaXMubmV4dFRhaWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2VGFpbC5jb3B5RnJvbSh0aGlzLmN1cnJlbnRUYWlsKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUYWlsLmNvcHlGcm9tKHRoaXMubmV4dFRhaWwpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxMb2NhbE1hdHJpeC5tdWx0aXBseVRvUmVmKF9tYXRCLCBfbWF0QSk7XHJcbiAgICAgICAgY29uc3QgaW5pdGlhbENlbnRlclNwYWNlTWF0cml4SW52ID0gX21hdEEuaW52ZXJ0KCk7XHJcbiAgICAgICAgVmVjdG9yMy5UcmFuc2Zvcm1Db29yZGluYXRlc1RvUmVmKHRoaXMubmV4dFRhaWwsIGluaXRpYWxDZW50ZXJTcGFjZU1hdHJpeEludiwgX3YzQSk7XHJcbiAgICAgICAgX3YzQS5ub3JtYWxpemVUb1JlZihfdjNCKTtcclxuICAgICAgICBRdWF0ZXJuaW9uLkZyb21Vbml0VmVjdG9yc1RvUmVmKHRoaXMuYm9uZUF4aXMsIF92M0IsIF9xdWF0QSk7XHJcbiAgICAgICAgY29uc3QgYXBwbHlSb3RhdGlvbiA9IF9xdWF0QTtcclxuICAgICAgICB0aGlzLmluaXRpYWxMb2NhbFJvdGF0aW9uLm11bHRpcGx5VG9SZWYoYXBwbHlSb3RhdGlvbiwgdGhpcy50cmFuc2Zvcm0ucm90YXRpb25RdWF0ZXJuaW9uISk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBXb3JsZE1hdHJpeFxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLmNvbXB1dGVXb3JsZE1hdHJpeCh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG1hdHJpeCB0aGF0IGNvbnZlcnRzIHdvcmxkIHNwYWNlIGludG8gY2VudGVyIHNwYWNlLlxyXG4gICAgICogQHBhcmFtIHJlc3VsdCBUYXJnZXQgbWF0cml4XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWF0cml4V29ybGRUb0NlbnRlcihyZXN1bHQ6IE1hdHJpeCk6IE1hdHJpeCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyLmdldFdvcmxkTWF0cml4KCkuaW52ZXJ0VG9SZWYocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQuY29weUZyb20oSURFTlRJVFlfTUFUUklYKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHdvcmxkIG1hdHJpeCBvZiBpdHMgcGFyZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQYXJlbnRNYXRyaXhXb3JsZCgpOiBNYXRyaXgge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wYXJlbnQgPyAodGhpcy50cmFuc2Zvcm0ucGFyZW50IGFzIFRyYW5zZm9ybU5vZGUpLmdldFdvcmxkTWF0cml4KCkgOiBJREVOVElUWV9NQVRSSVg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDooZ3nqoHliKTlrprjgpLooYzjgYZcclxuICAgICAqIEBwYXJhbSBjb2xsaWRlckdyb3Vwc1xyXG4gICAgICogQHBhcmFtIHRhaWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb2xsaWRlKGNvbGxpZGVyR3JvdXBzOiBDb2xsaWRlckdyb3VwW10sIHRhaWw6IFZlY3RvcjMpIHtcclxuICAgICAgICBjb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXIuc3BoZXJlLmNvbXB1dGVXb3JsZE1hdHJpeCgpLm11bHRpcGx5VG9SZWYoX21hdEEsIF9tYXRBKTtcclxuICAgICAgICAgICAgICAgIF9tYXRBLmdldFRyYW5zbGF0aW9uVG9SZWYoX3YzQSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24gPSBfdjNBO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtYXhBYnNTY2FsZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5zcGhlcmUuYWJzb2x1dGVTY2FsaW5nLmFzQXJyYXkoKS5mb3JFYWNoKChzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4QWJzU2NhbGUgPSBNYXRoLm1heChtYXhBYnNTY2FsZSwgTWF0aC5hYnMocykpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xsaWRlclJhZGl1cyA9IGNvbGxpZGVyLnJhZGl1cyAqIG1heEFic1NjYWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgciA9IHRoaXMucmFkaXVzICsgY29sbGlkZXJSYWRpdXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFpbC5zdWJ0cmFjdFRvUmVmKGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbiwgX3YzQik7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3YzQi5sZW5ndGhTcXVhcmVkKCkgPD0gciAqIHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3JtYWwgPSBfdjNCLmNvcHlGcm9tKHRhaWwpLnN1YnRyYWN0SW5QbGFjZShjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc0Zyb21Db2xsaWRlciA9IF92M0MuY29weUZyb20oY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uKS5hZGRJblBsYWNlKG5vcm1hbC5zY2FsZUluUGxhY2UocikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0YWlsLmNvcHlGcm9tKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NGcm9tQ29sbGlkZXIuc3VidHJhY3RJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCkuc2NhbGVJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VCb25lTGVuZ3RoKS5hZGRJblBsYWNlKHRoaXMuY2VudGVyU3BhY2VQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsJztcclxuaW1wb3J0IHsgQ29sb3IzLCBWZWN0b3IzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgeyBNZXNoQnVpbGRlciB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvbWVzaEJ1aWxkZXInO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL3RyYW5zZm9ybU5vZGUnO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgeyBDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9jb2xsaWRlci1ncm91cCc7XHJcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVMb2dpYyB9IGZyb20gJy4vdnJtLXNwcmluZy1ib25lLWxvZ2ljJztcclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8qIFRPRE86IFBhdGNoZWQuXHJcbmltcG9ydCB0eXBlIHsgQ29uc3RydWN0U3ByaW5nc09wdGlvbnMgfSBmcm9tICcuL3NwcmluZy1ib25lLWNvbnRyb2xsZXInO1xyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLyoqXHJcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iL21hc3Rlci9Bc3NldHMvVlJNL1VuaVZSTS9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmUge1xyXG4gICAgcHVibGljIHZlcmxldHM6IFZSTVNwcmluZ0JvbmVMb2dpY1tdID0gW107XHJcbiAgICBwcml2YXRlIGFjdGl2ZUJvbmVzOiBUcmFuc2Zvcm1Ob2RlW10gPSBbXTtcclxuXHJcbiAgICAvKiogQGhpZGRlbiAqL1xyXG4gICAgcHJpdmF0ZSBkcmF3R2l6bW8gPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vMC4wXHJcbiAgICAgKiBAcGFyYW0gY29tbWVudCBBbm5vdGF0aW9uIGNvbW1lbnRcclxuICAgICAqIEBwYXJhbSBzdGlmZm5lc3MgVGhlIHJlc2lsaWVuY2Ugb2YgdGhlIHN3YXlpbmcgb2JqZWN0ICh0aGUgcG93ZXIgb2YgcmV0dXJuaW5nIHRvIHRoZSBpbml0aWFsIHBvc2UpLlxyXG4gICAgICogQHBhcmFtIGdyYXZpdHlQb3dlciBUaGUgc3RyZW5ndGggb2YgZ3Jhdml0eS5cclxuICAgICAqIEBwYXJhbSBncmF2aXR5RGlyIFRoZSBkaXJlY3Rpb24gb2YgZ3Jhdml0eS4gU2V0ICgwLCAtMSwgMCkgZm9yIHNpbXVsYXRpbmcgdGhlIGdyYXZpdHkuIFNldCAoMSwgMCwgMCkgZm9yIHNpbXVsYXRpbmcgdGhlIHdpbmQuXHJcbiAgICAgKiBAcGFyYW0gZHJhZ0ZvcmNlIFRoZSByZXNpc3RhbmNlIChkZWNlbGVyYXRpb24pIG9mIGF1dG9tYXRpYyBhbmltYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gY2VudGVyIFRoZSByZWZlcmVuY2UgcG9pbnQgb2YgYSBzd2F5aW5nIG9iamVjdCBjYW4gYmUgc2V0IGF0IGFueSBsb2NhdGlvbiBleGNlcHQgdGhlIG9yaWdpbi5cclxuICAgICAqICAgICAgICAgICAgICAgV2hlbiBpbXBsZW1lbnRpbmcgVUkgbW92aW5nIHdpdGggd2FycCxcclxuICAgICAqICAgICAgICAgICAgICAgdGhlIHBhcmVudCBub2RlIHRvIG1vdmUgd2l0aCB3YXJwIGNhbiBiZSBzcGVjaWZpZWQgaWYgeW91IGRvbid0IHdhbnQgdG8gbWFrZSB0aGUgb2JqZWN0IHN3YXlpbmcgd2l0aCB3YXJwIG1vdmVtZW50LlxyXG4gICAgICogQHBhcmFtIGhpdFJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBzcGhlcmUgdXNlZCBmb3IgdGhlIGNvbGxpc2lvbiBkZXRlY3Rpb24gd2l0aCBjb2xsaWRlcnMuXHJcbiAgICAgKiBAcGFyYW0gYm9uZXMgU3BlY2lmeSB0aGUgbm9kZSBpbmRleCBvZiB0aGUgcm9vdCBib25lIG9mIHRoZSBzd2F5aW5nIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSBjb2xsaWRlckdyb3VwcyBTcGVjaWZ5IHRoZSBpbmRleCBvZiB0aGUgY29sbGlkZXIgZ3JvdXAgZm9yIGNvbGxpc2lvbnMgd2l0aCBzd2F5aW5nIG9iamVjdHMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29tbWVudDogc3RyaW5nLFxyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAvLyBwdWJsaWMgcmVhZG9ubHkgc3RpZmZuZXNzOiBudW1iZXIsXHJcbiAgICAgICAgLy8gcHVibGljIHJlYWRvbmx5IGdyYXZpdHlQb3dlcjogbnVtYmVyLFxyXG4gICAgICAgIC8vIHB1YmxpYyByZWFkb25seSBncmF2aXR5RGlyOiBWZWN0b3IzLFxyXG4gICAgICAgIC8vIHB1YmxpYyByZWFkb25seSBkcmFnRm9yY2U6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgc3RpZmZuZXNzOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIGdyYXZpdHlQb3dlcjogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyBncmF2aXR5RGlyOiBWZWN0b3IzLFxyXG4gICAgICAgIHB1YmxpYyBkcmFnRm9yY2U6IG51bWJlcixcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNlbnRlcjogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4sXHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIC8vIHB1YmxpYyByZWFkb25seSBoaXRSYWRpdXM6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgaGl0UmFkaXVzOiBudW1iZXIsXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib25lczogQXJyYXk8TnVsbGFibGU8VHJhbnNmb3JtTm9kZT4+LFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2xsaWRlckdyb3VwczogQ29sbGlkZXJHcm91cFtdXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZUJvbmVzID0gdGhpcy5ib25lcy5maWx0ZXIoKGJvbmUpID0+IGJvbmUgIT09IG51bGwpIGFzIFRyYW5zZm9ybU5vZGVbXTtcclxuICAgICAgICB0aGlzLmFjdGl2ZUJvbmVzLmZvckVhY2goKGJvbmUpID0+IHtcclxuICAgICAgICAgICAgW2JvbmVdLmNvbmNhdChib25lLmdldENoaWxkVHJhbnNmb3JtTm9kZXMoKSkuZm9yRWFjaCgoYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJsZXRzLnB1c2gobmV3IFZSTVNwcmluZ0JvbmVMb2dpYyh0aGlzLmNlbnRlciwgdGhpcy5oaXRSYWRpdXMsIGIpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIHRoaXMuZ3Jhdml0eURpci5ub3JtYWxpemUoKTtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHJhd0dpem1vKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBHaXptbygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwR2l6bW8oKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVCb25lcy5mb3JFYWNoKChib25lKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjZW5lID0gYm9uZS5nZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICBbYm9uZV0uY29uY2F0KGJvbmUuZ2V0Q2hpbGRUcmFuc2Zvcm1Ob2RlcygpKS5mb3JFYWNoKChiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBib25lR2l6bW8gPSBNZXNoQnVpbGRlci5DcmVhdGVTcGhlcmUoXHJcbiAgICAgICAgICAgICAgICAgICAgYi5uYW1lICsgJ19ib25lR2l6bW8nLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudHM6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYW1ldGVyOiB0aGlzLmhpdFJhZGl1cyAqIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ID0gbmV3IFN0YW5kYXJkTWF0ZXJpYWwoYi5uYW1lICsgJ19ib25lR2l6bW9tYXQnLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICBtYXQuZW1pc3NpdmVDb2xvciA9IENvbG9yMy5SZWQoKTtcclxuICAgICAgICAgICAgICAgIG1hdC53aXJlZnJhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYm9uZUdpem1vLm1hdGVyaWFsID0gbWF0O1xyXG4gICAgICAgICAgICAgICAgYm9uZUdpem1vLnNldFBhcmVudChiKTtcclxuICAgICAgICAgICAgICAgIGJvbmVHaXptby5wb3NpdGlvbiA9IFZlY3RvcjMuWmVybygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzY2VuZSA9IGdyb3VwLnRyYW5zZm9ybS5nZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICBncm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaGVyZSA9IGNvbGxpZGVyLnNwaGVyZTtcclxuICAgICAgICAgICAgICAgIGlmICghc3BoZXJlLmlzRW5hYmxlZChmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGhlcmUuc2V0RW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXQgPSBuZXcgU3RhbmRhcmRNYXRlcmlhbChncm91cC50cmFuc2Zvcm0ubmFtZSArICdfY29sbGlkZXJHaXptb21hdCcsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXQuZW1pc3NpdmVDb2xvciA9IENvbG9yMy5ZZWxsb3coKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXQud2lyZWZyYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzcGhlcmUubWF0ZXJpYWwgPSBtYXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGJvbmVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRlbHRhVGltZVxyXG4gICAgICovXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIC8vIHB1YmxpYyBhc3luYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIsIGJvbmVPcHRpb25zPzogQ29uc3RydWN0U3ByaW5nc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICBjb25zdCBvbGRPcHRpb25zID0gdGhpcy51cGRhdGVPcHRpb25zKGJvbmVPcHRpb25zKTtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RpZmZuZXNzID0gdGhpcy5zdGlmZm5lc3MgKiBkZWx0YVRpbWU7XHJcbiAgICAgICAgY29uc3QgZXh0ZXJuYWwgPSB0aGlzLmdyYXZpdHlEaXIuc2NhbGUodGhpcy5ncmF2aXR5UG93ZXIgKiBkZWx0YVRpbWUpO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IHRoaXMudmVybGV0cy5tYXA8UHJvbWlzZTx2b2lkPj4oKHZlcmxldCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZlcmxldC51cGRhdGUoc3RpZmZuZXNzLCB0aGlzLmRyYWdGb3JjZSwgZXh0ZXJuYWwsIHRoaXMuY29sbGlkZXJHcm91cHMpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgLy8gUmVzdG9yZSBvcHRpb25zXHJcbiAgICAgICAgdGhpcy51cGRhdGVPcHRpb25zKG9sZE9wdGlvbnMpO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvKiBEbyBOb3RoaW5nICovXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU9wdGlvbnMoYm9uZU9wdGlvbnM/OiBDb25zdHJ1Y3RTcHJpbmdzT3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IGJhY2t1cE9wdGlvbnM6IENvbnN0cnVjdFNwcmluZ3NPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBzdGlmZm5lc3M6IHRoaXMuc3RpZmZuZXNzLFxyXG4gICAgICAgICAgICBncmF2aXR5UG93ZXI6IHRoaXMuZ3Jhdml0eVBvd2VyLFxyXG4gICAgICAgICAgICBncmF2aXR5RGlyOiB0aGlzLmdyYXZpdHlEaXIuY2xvbmUoKSxcclxuICAgICAgICAgICAgZHJhZ0ZvcmNlOiB0aGlzLmRyYWdGb3JjZSxcclxuICAgICAgICAgICAgaGl0UmFkaXVzOiB0aGlzLmhpdFJhZGl1cyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3RpZmZuZXNzID0gYm9uZU9wdGlvbnM/LnN0aWZmbmVzcyB8fCB0aGlzLnN0aWZmbmVzcztcclxuICAgICAgICB0aGlzLmdyYXZpdHlQb3dlciA9IGJvbmVPcHRpb25zPy5ncmF2aXR5UG93ZXIgfHwgdGhpcy5ncmF2aXR5UG93ZXI7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5RGlyID0gYm9uZU9wdGlvbnM/LmdyYXZpdHlEaXIgfHwgdGhpcy5ncmF2aXR5RGlyO1xyXG4gICAgICAgIHRoaXMuZHJhZ0ZvcmNlID0gYm9uZU9wdGlvbnM/LmRyYWdGb3JjZSB8fCB0aGlzLmRyYWdGb3JjZTtcclxuICAgICAgICB0aGlzLmhpdFJhZGl1cyA9IGJvbmVPcHRpb25zPy5oaXRSYWRpdXMgfHwgdGhpcy5oaXRSYWRpdXM7XHJcblxyXG4gICAgICAgIHJldHVybiBiYWNrdXBPcHRpb25zO1xyXG4gICAgfVxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL21hdGVyaWFsJztcclxuaW1wb3J0IHR5cGUgeyBNZXNoIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy9tZXNoJztcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZMb2FkZXJFeHRlbnNpb24sIElNYXRlcmlhbCwgSU1lc2hQcmltaXRpdmUgfSBmcm9tICdAYmFieWxvbmpzL2xvYWRlcnMvZ2xURi8yLjAnO1xyXG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSAnQGJhYnlsb25qcy9sb2FkZXJzL2dsVEYvMi4wJztcclxuaW1wb3J0IHsgVlJNTWFuYWdlciB9IGZyb20gJy4vdnJtLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBWUk1NYXRlcmlhbEdlbmVyYXRvciB9IGZyb20gJy4vdnJtLW1hdGVyaWFsLWdlbmVyYXRvcic7XHJcblxyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyogVE9ETzogUGF0Y2hlZC5cclxuaW1wb3J0IHR5cGUgeyBWUk1GaWxlTG9hZGVyIH0gZnJvbSAnLi92cm0tZmlsZS1sb2FkZXInO1xyXG5pbXBvcnQgdHlwZSB7IEdMVEZMb2FkZXJFeHRlbnNpb25PYnNlcnZlciB9IGZyb20gJy4uLy4uL2xvYWRlci1vYnNlcnZlcic7XHJcbmltcG9ydCB0eXBlIHsgVjNEQ29yZSB9IGZyb20gJy4uLy4uLy4uL2luZGV4JztcclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8qKlxyXG4gKiBgZXh0ZW5zaW9uc2Ag44Gr5YWl44KL5ouh5by144Kt44O8XHJcbiAqL1xyXG5jb25zdCBOQU1FID0gJ1ZSTSc7XHJcblxyXG4vKipcclxuICogVlJNIOaLoeW8teOCkuWHpueQhuOBmeOCi1xyXG4gKiBbU3BlY2lmaWNhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vMC4wKVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZSTUxvYWRlckV4dGVuc2lvbiBpbXBsZW1lbnRzIElHTFRGTG9hZGVyRXh0ZW5zaW9uIHtcclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBOQU1FID0gJ1ZSTSc7XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICog44GT44GuIE1lc2ggaW5kZXgg5Lul6ZmN44GM6Kqt44G/6L6844G/5a++6LGhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWVzaGVzRnJvbSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOOBk+OBriBUcmFuc2Zvcm1Ob2RlIGluZGV4IOS7pemZjeOBjOiqreOBv+i+vOOBv+WvvuixoVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyYW5zZm9ybU5vZGVzRnJvbSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOOBk+OBriBNYXRlcmlhbCBpbmRleCDku6XpmY3jgYzoqq3jgb/ovrzjgb/lr77osaFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtYXRlcmlhbHNGcm9tID0gMDtcclxuXHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZGVyIG9ic2VydmVyc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvYWRlck9ic2VydmVyczogR0xURkxvYWRlckV4dGVuc2lvbk9ic2VydmVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgb25Mb2FkZWRDYWxsQmFjazogRnVuY3Rpb247XHJcbiAgICAvKipcclxuICAgICAqIFZSTSBNYW5hZ2VyIGZyb20gdGhpcyBsb2FkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1hbmFnZXI6IFZSTU1hbmFnZXI7XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkZXI6IEdMVEZMb2FkZXIsXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgcHJpdmF0ZSB2M0RDb3JlOiBWM0RDb3JlXHJcbiAgICApIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2FsbCBjb25zdHJ1Y3RvcigpJyk7XHJcblxyXG4gICAgICAgIC8vIEdMVEZMb2FkZXIgaGFzIGFscmVhZHkgYWRkZWQgcm9vdE1lc2ggYXMgX19yb290X18gYmVmb3JlIGxvYWQgZXh0ZW5zaW9uXHJcbiAgICAgICAgLy8gQHNlZSBnbFRGTG9hZGVyLl9sb2FkRGF0YVxyXG4gICAgICAgIHRoaXMubWVzaGVzRnJvbSA9IHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZS5tZXNoZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybU5vZGVzRnJvbSA9IHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZS50cmFuc2Zvcm1Ob2Rlcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNGcm9tID0gdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lLm1hdGVyaWFscy5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIHRoaXMuYWRkTG9hZGVyT2JzZXJ2ZXIodGhpcy52M0RDb3JlKTtcclxuICAgICAgICB0aGlzLm9uTG9hZGVkQ2FsbEJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjYWxsIHRoaXMub25Mb2FkZWRDYWxsQmFjaygpJyk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzLm1hbmFnZXI6ICcsIHRoaXMubWFuYWdlcik7XHJcblxyXG4gICAgICAgICAgICB2M0RDb3JlLmFkZFZSTU1hbmFnZXIodGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHYzRENvcmUuYWRkT25Mb2FkQ29tcGxldGVDYWxsYmFja3ModGhpcy5vbkxvYWRlZENhbGxCYWNrKTtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgICh0aGlzLmxvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgdGhpcy5sb2FkZXJPYnNlcnZlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLnYzRENvcmUucmVtb3ZlT25Mb2FkQ29tcGxldGVDYWxsYmFjayh0aGlzLm9uTG9hZGVkQ2FsbEJhY2spO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uUmVhZHkoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NhbGwgb25SZWFkeSgpJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMubG9hZGVyOiAnLCB0aGlzLmxvYWRlcik7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zIHx8ICF0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnNbTkFNRV0pIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NhbGwgcmV0dXJuJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIC8vIGNvbnN0IHNjZW5lID0gdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lO1xyXG4gICAgICAgIC8vIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNTWFuYWdlcihcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zW1ZSTUxvYWRlckV4dGVuc2lvbi5OQU1FXSxcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lLFxyXG4gICAgICAgIC8vICAgICB0aGlzLm1lc2hlc0Zyb20sXHJcbiAgICAgICAgLy8gICAgIHRoaXMudHJhbnNmb3JtTm9kZXNGcm9tLFxyXG4gICAgICAgIC8vICAgICB0aGlzLm1hdGVyaWFsc0Zyb20sXHJcbiAgICAgICAgLy8gKTtcclxuICAgICAgICAvLyBzY2VuZS5tZXRhZGF0YSA9IHNjZW5lLm1ldGFkYXRhIHx8IHt9O1xyXG4gICAgICAgIC8vIHNjZW5lLm1ldGFkYXRhLnZybU1hbmFnZXJzID0gc2NlbmUubWV0YWRhdGEudnJtTWFuYWdlcnMgfHwgW107XHJcbiAgICAgICAgLy8gc2NlbmUubWV0YWRhdGEudnJtTWFuYWdlcnMucHVzaCh0aGlzLm1hbmFnZXIpO1xyXG5cclxuICAgICAgICBjb25zdCB1cmkgPSAodGhpcy5sb2FkZXIucGFyZW50IGFzIHVua25vd24gYXMgVlJNRmlsZUxvYWRlcikudXJpO1xyXG4gICAgICAgIHRoaXMubWFuYWdlciA9IG5ldyBWUk1NYW5hZ2VyKHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9uc1tOQU1FXSwgdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lLCB0aGlzLm1lc2hlc0Zyb20sIHRoaXMudHJhbnNmb3JtTm9kZXNGcm9tLCB0aGlzLm1hdGVyaWFsc0Zyb20sIHVyaSk7XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgIHRoaXMubG9hZGVyLmJhYnlsb25TY2VuZS5vbkRpc3Bvc2VPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFNjZW5lIGRpc3Bvc2Ug5pmC44GrIE1hbmFnZXIg44KC56C05qOE44GZ44KLXHJcbiAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgICAgICAvLyBtYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5sb2FkZXIuYmFieWxvblNjZW5lLm1ldGFkYXRhLnZybU1hbmFnZXJzID0gW107XHJcbiAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0cnkgdG8gY2FsbCBvYnNlcnZlci5vbkxvYWRSZWFkeSgpJyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBvYnNlcnZlciBvZiB0aGlzLmxvYWRlck9ic2VydmVycykge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnb2JzZXJ2ZXI6ICcsIG9ic2VydmVyKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIub25Mb2FkUmVhZHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIC8vIHB1YmxpYyBfbG9hZFZlcnRleERhdGFBc3luYyhjb250ZXh0OiBzdHJpbmcsIHByaW1pdGl2ZTogSU1lc2hQcmltaXRpdmUsIGJhYnlsb25NZXNoOiBNZXNoKSB7XHJcbiAgICBwdWJsaWMgX2xvYWRWZXJ0ZXhEYXRhQXN5bmMoY29udGV4dDogc3RyaW5nLCBwcmltaXRpdmU6IElNZXNoUHJpbWl0aXZlLCBiYWJ5bG9uTWVzaDogTWVzaCk6IGFueSB7XHJcbiAgICAgICAgaWYgKCFwcmltaXRpdmUuZXh0cmFzIHx8ICFwcmltaXRpdmUuZXh0cmFzLnRhcmdldE5hbWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDjgb7jgaAgTW9ycGhUYXJnZXQg44GM55Sf5oiQ44GV44KM44Gm44GE44Gq44GE44Gu44Gn44CB44Oh44K/5oOF5aCx44Gr44Oi44O844OV44K/44O844Ky44OD44OI5oOF5aCx44KS5YWl44KM44Gm44GK44GPXHJcbiAgICAgICAgYmFieWxvbk1lc2gubWV0YWRhdGEgPSBiYWJ5bG9uTWVzaC5tZXRhZGF0YSB8fCB7fTtcclxuICAgICAgICBiYWJ5bG9uTWVzaC5tZXRhZGF0YS52cm1UYXJnZXROYW1lcyA9IHByaW1pdGl2ZS5leHRyYXMudGFyZ2V0TmFtZXM7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRNYXRlcmlhbEFzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgbWVzaDogTWVzaCwgYmFieWxvbkRyYXdNb2RlOiBudW1iZXIsIGFzc2lnbjogKGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpID0+IHZvaWQpOiBOdWxsYWJsZTxQcm9taXNlPE1hdGVyaWFsPj4ge1xyXG4gICAgICAgIC8vIOOCuOOCp+ODjeODrOODvOOCv+OBp+ODnuODhuODquOCouODq+OCkueUn+aIkOOBmeOCi1xyXG4gICAgICAgIHJldHVybiBuZXcgVlJNTWF0ZXJpYWxHZW5lcmF0b3IodGhpcy5sb2FkZXIpLmdlbmVyYXRlKGNvbnRleHQsIG1hdGVyaWFsLCBtZXNoLCBiYWJ5bG9uRHJhd01vZGUsIGFzc2lnbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBvYnNlcnZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkTG9hZGVyT2JzZXJ2ZXIob2JzZXJ2ZXI6IEdMVEZMb2FkZXJFeHRlbnNpb25PYnNlcnZlcikge1xyXG4gICAgICAgIHRoaXMubG9hZGVyT2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG59XHJcblxyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyogVE9ETzogUGF0Y2hlZC5cclxuLy8g44Ot44O844OA44O844Gr55m76Yyy44GZ44KLXHJcbi8vIEdMVEZMb2FkZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGxvYWRlcikgPT4gbmV3IFZSTUxvYWRlckV4dGVuc2lvbihsb2FkZXIpKTtcclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuIiwiLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8qIFRPRE86IFBhdGNoZWQuXHJcbi8vIGltcG9ydCB7IFNjZW5lTG9hZGVyIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXInO1xyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuaW1wb3J0IHsgR0xURkZpbGVMb2FkZXIgfSBmcm9tICdAYmFieWxvbmpzL2xvYWRlcnMvZ2xURi9nbFRGRmlsZUxvYWRlcic7XHJcblxyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyogVE9ETzogUGF0Y2hlZC5cclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB0eXBlIHsgVlJNTWFuYWdlciB9IGZyb20gJy4vdnJtLW1hbmFnZXInO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3NjZW5lJztcclxuaW1wb3J0IHR5cGUgeyBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50IH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXInO1xyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLyoqXHJcbiAqIFZSTS9WQ0kg44OV44Kh44Kk44Or44KS6Kqt44G/6L6844KB44KL44KI44GG44Gr44GZ44KLXHJcbiAqIOaLoeW8teWtkOOCkuWkieabtOOBl+OBn+OBoOOBkVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZSTUZpbGVMb2FkZXIgZXh0ZW5kcyBHTFRGRmlsZUxvYWRlciB7XHJcbiAgICBwdWJsaWMgbmFtZSA9ICd2cm0nO1xyXG4gICAgcHVibGljIGV4dGVuc2lvbnMgPSB7XHJcbiAgICAgICAgJy52cm0nOiB7IGlzQmluYXJ5OiB0cnVlIH0sXHJcbiAgICAgICAgJy52Y2knOiB7IGlzQmluYXJ5OiB0cnVlIH0sXHJcbiAgICB9O1xyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICBwdWJsaWMgdXJpOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdnJtTWFuYWdlcjogTnVsbGFibGU8VlJNTWFuYWdlcj4gPSBudWxsO1xyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVQbHVnaW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWUk1GaWxlTG9hZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICBwdWJsaWMgbG9hZEFzeW5jKHNjZW5lOiBTY2VuZSwgZGF0YTogYW55LCByb290VXJsOiBzdHJpbmcsIG9uUHJvZ3Jlc3M/OiAoZXZlbnQ6IElTY2VuZUxvYWRlclByb2dyZXNzRXZlbnQpID0+IHZvaWQsIGZpbGVOYW1lPzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy51cmkgPSByb290VXJsO1xyXG4gICAgICAgIGlmIChmaWxlTmFtZSkgdGhpcy51cmkgKz0gZmlsZU5hbWU7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmxvYWRBc3luYyhzY2VuZSwgZGF0YSwgcm9vdFVybCwgb25Qcm9ncmVzcywgZmlsZU5hbWUpO1xyXG4gICAgfVxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG59XHJcblxyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyogVE9ETzogUGF0Y2hlZC5cclxuLy8gaWYgKFNjZW5lTG9hZGVyKSB7XHJcbi8vICAgICBTY2VuZUxvYWRlci5SZWdpc3RlclBsdWdpbihuZXcgVlJNRmlsZUxvYWRlcigpKTtcclxuLy8gfVxyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIElWUk1WZWN0b3IzIHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIHo6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dGVuc2lvbnMuVlJNXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWUk0ge1xyXG4gICAgZXhwb3J0ZXJWZXJzaW9uOiBzdHJpbmc7XHJcbiAgICBzcGVjVmVyc2lvbjogc3RyaW5nO1xyXG4gICAgbWV0YTogSVZSTU1ldGE7XHJcbiAgICBodW1hbm9pZDogSVZSTUh1bWFub2lkO1xyXG4gICAgZmlyc3RQZXJzb246IElWUk1GaXJzdFBlcnNvbjtcclxuICAgIGJsZW5kU2hhcGVNYXN0ZXI6IElWUk1CbGVuZFNoYXBlTWFzdGVyO1xyXG4gICAgc2Vjb25kYXJ5QW5pbWF0aW9uOiBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uO1xyXG4gICAgbWF0ZXJpYWxQcm9wZXJ0aWVzOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVtdO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0ZW5zaW9ucy5WUk0ubWV0YVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNTWV0YSB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgYXV0aG9yOiBzdHJpbmc7XHJcbiAgICBjb250YWN0SW5mb3JtYXRpb24/OiBzdHJpbmc7XHJcbiAgICByZWZlcmVuY2U/OiBzdHJpbmc7XHJcbiAgICB0ZXh0dXJlPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0ZW5zaW9ucy5WUk0uaHVtYW5vaWRcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUh1bWFub2lkIHtcclxuICAgIGh1bWFuQm9uZXM6IElWUk1IdW1hbm9pZEJvbmVbXTtcclxuICAgIGFybVN0cmV0Y2g/OiBudW1iZXI7XHJcbiAgICBsZWdTdHJldGNoPzogbnVtYmVyO1xyXG4gICAgdXBwZXJBcm1Ud2lzdD86IG51bWJlcjtcclxuICAgIGxvd2VyQXJtVHdpc3Q/OiBudW1iZXI7XHJcbiAgICB1cHBlckxlZ1R3aXN0PzogbnVtYmVyO1xyXG4gICAgbG93ZXJMZWdUd2lzdD86IG51bWJlcjtcclxuICAgIGZlZXRTcGFjaW5nPzogbnVtYmVyO1xyXG4gICAgaGFzVHJhbnNsYXRpb25Eb0Y/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1IdW1hbm9pZEJvbmUge1xyXG4gICAgYm9uZTogc3RyaW5nO1xyXG4gICAgbm9kZTogbnVtYmVyO1xyXG4gICAgdXNlRGVmYXVsdFZhbHVlczogYm9vbGVhbjtcclxuICAgIG1pbj86IElWUk1WZWN0b3IzO1xyXG4gICAgbWF4PzogSVZSTVZlY3RvcjM7XHJcbiAgICBjZW50ZXI/OiBJVlJNVmVjdG9yMztcclxuICAgIGF4aXNMZW5ndGg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb24ge1xyXG4gICAgbWVzaDogbnVtYmVyO1xyXG4gICAgZmlyc3RQZXJzb25GbGFnOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUZpcnN0UGVyc29uRGVncmVlTWFwIHtcclxuICAgIGN1cnZlOiBudW1iZXJbXTtcclxuICAgIHhSYW5nZTogbnVtYmVyO1xyXG4gICAgeVJhbmdlOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRlbnNpb25zLlZSTS5maXJzdFBlcnNvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNRmlyc3RQZXJzb24ge1xyXG4gICAgZmlyc3RQZXJzb25Cb25lOiBudW1iZXI7XHJcbiAgICBmaXJzdFBlcnNvbkJvbmVPZmZzZXQ6IElWUk1WZWN0b3IzO1xyXG4gICAgbWVzaEFubm90YXRpb25zOiBJVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdO1xyXG4gICAgbG9va0F0VHlwZU5hbWU6ICdCb25lJyB8ICdCbGVuZFNoYXBlJztcclxuICAgIGxvb2tBdEhvcml6b250YWxJbm5lcjogSVZSTUZpcnN0UGVyc29uRGVncmVlTWFwO1xyXG4gICAgbG9va0F0SG9yaXpvbnRhbE91dGVyOiBJVlJNRmlyc3RQZXJzb25EZWdyZWVNYXA7XHJcbiAgICBsb29rQXRWZXJ0aWNhbERvd246IElWUk1GaXJzdFBlcnNvbkRlZ3JlZU1hcDtcclxuICAgIGxvb2tBdFZlcnRpY2FsVXA6IElWUk1GaXJzdFBlcnNvbkRlZ3JlZU1hcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dGVuc2lvbnMuVlJNLmJsZW5kU2hhcGVNYXN0ZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTUJsZW5kU2hhcGVNYXN0ZXIge1xyXG4gICAgYmxlbmRTaGFwZUdyb3VwczogSVZSTUJsZW5kU2hhcGVHcm91cFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1CbGVuZFNoYXBlR3JvdXAge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcHJlc2V0TmFtZTogc3RyaW5nO1xyXG4gICAgYmluZHM6IElWUk1CbGVuZFNoYXBlQmluZFtdO1xyXG4gICAgbWF0ZXJpYWxWYWx1ZXM6IElWUk1CbGVuZFNoYXBlTWF0ZXJpYWxCaW5kW107XHJcbiAgICBpc0JpbmFyeTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNQmxlbmRTaGFwZUJpbmQge1xyXG4gICAgbWVzaDogbnVtYmVyO1xyXG4gICAgaW5kZXg6IG51bWJlcjtcclxuICAgIHdlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1CbGVuZFNoYXBlTWF0ZXJpYWxCaW5kIHtcclxuICAgIG1hdGVyaWFsTmFtZTogc3RyaW5nO1xyXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XHJcbiAgICB0YXJnZXRWYWx1ZTogbnVtYmVyW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTVNlY29uZGFyeUFuaW1hdGlvblNwcmluZyB7XHJcbiAgICBjb21tZW50OiBzdHJpbmc7XHJcbiAgICBzdGlmZmluZXNzOiBudW1iZXI7XHJcbiAgICBncmF2aXR5UG93ZXI6IG51bWJlcjtcclxuICAgIGdyYXZpdHlEaXI6IElWUk1WZWN0b3IzO1xyXG4gICAgZHJhZ0ZvcmNlOiBudW1iZXI7XHJcbiAgICBjZW50ZXI6IG51bWJlcjtcclxuICAgIGhpdFJhZGl1czogbnVtYmVyO1xyXG4gICAgYm9uZXM6IG51bWJlcltdO1xyXG4gICAgY29sbGlkZXJHcm91cHM6IG51bWJlcltdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1TZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlciB7XHJcbiAgICBvZmZzZXQ6IElWUk1WZWN0b3IzO1xyXG4gICAgcmFkaXVzOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTVNlY29uZGFyeUFuaW1hdGlvbkNvbGxpZGVyR3JvdXAge1xyXG4gICAgbm9kZTogbnVtYmVyO1xyXG4gICAgY29sbGlkZXJzOiBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXJbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dGVuc2lvbnMuVlJNLnNlY29uZGFyeUFuaW1hdGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uIHtcclxuICAgIGJvbmVHcm91cHM6IElWUk1TZWNvbmRhcnlBbmltYXRpb25TcHJpbmdbXTtcclxuICAgIGNvbGxpZGVyR3JvdXBzOiBJVlJNU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXJHcm91cFtdO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVNoYWRlciB7XHJcbiAgICBWUk1fVVNFX0dMVEZTSEFERVIgPSAnVlJNX1VTRV9HTFRGU0hBREVSJyxcclxuICAgIFZSTU1Ub29uID0gJ1ZSTS9NVG9vbicsXHJcbiAgICBWUk1VbmxpdFRyYW5zcGFyZW50WldyaXRlID0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50WldyaXRlJyxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eUZsb2F0UHJvcGVydGllcyB7XHJcbiAgICBfQ3V0b2ZmPzogbnVtYmVyO1xyXG4gICAgX0J1bXBTY2FsZT86IG51bWJlcjtcclxuICAgIF9SZWNlaXZlU2hhZG93UmF0ZT86IG51bWJlcjtcclxuICAgIF9TaGFkaW5nR3JhZGVSYXRlPzogbnVtYmVyO1xyXG4gICAgX1NoYWRlU2hpZnQ/OiBudW1iZXI7XHJcbiAgICBfU2hhZGVUb29ueT86IG51bWJlcjtcclxuICAgIF9MaWdodENvbG9yQXR0ZW51YXRpb24/OiBudW1iZXI7XHJcbiAgICBfSW5kaXJlY3RMaWdodEludGVuc2l0eT86IG51bWJlcjtcclxuICAgIF9SaW1MaWdodGluZ01peD86IG51bWJlcjtcclxuICAgIF9SaW1GcmVzbmVsUG93ZXI/OiBudW1iZXI7XHJcbiAgICBfUmltTGlmdD86IG51bWJlcjtcclxuICAgIF9PdXRsaW5lV2lkdGg/OiBudW1iZXI7XHJcbiAgICBfT3V0bGluZVNjYWxlZE1heERpc3RhbmNlPzogbnVtYmVyO1xyXG4gICAgX091dGxpbmVMaWdodGluZ01peD86IG51bWJlcjtcclxuICAgIF9VdkFuaW1TY3JvbGxYPzogbnVtYmVyO1xyXG4gICAgX1V2QW5pbVNjcm9sbFk/OiBudW1iZXI7XHJcbiAgICBfVXZBbmltUm90YXRpb24/OiBudW1iZXI7XHJcbiAgICBfRGVidWdNb2RlPzogbnVtYmVyO1xyXG4gICAgX0JsZW5kTW9kZT86IG51bWJlcjtcclxuICAgIF9PdXRsaW5lV2lkdGhNb2RlPzogbnVtYmVyO1xyXG4gICAgX091dGxpbmVDb2xvck1vZGU/OiBudW1iZXI7XHJcbiAgICBfQ3VsbE1vZGU/OiBudW1iZXI7XHJcbiAgICBfT3V0bGluZUN1bGxNb2RlPzogbnVtYmVyO1xyXG4gICAgX1NyY0JsZW5kPzogbnVtYmVyO1xyXG4gICAgX0RzdEJsZW5kPzogbnVtYmVyO1xyXG4gICAgX1pXcml0ZT86IG51bWJlcjtcclxuICAgIFtwcm9wOiBzdHJpbmddOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5ID0gW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWUk1NYXRlcmlhbFByb3BlcnR5VmVjdG9yUHJvcGVydGllcyB7XHJcbiAgICBfQ29sb3I/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9TaGFkZUNvbG9yPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfTWFpblRleD86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1NoYWRlVGV4dHVyZT86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX0J1bXBNYXA/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9SZWNlaXZlU2hhZG93VGV4dHVyZT86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1NoYWRpbmdHcmFkZVRleHR1cmU/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9SaW1Db2xvcj86IElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5O1xyXG4gICAgX1JpbVRleHR1cmU/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9TcGhlcmVBZGQ/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9FbWlzc2lvbkNvbG9yPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfRW1pc3Npb25NYXA/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIF9PdXRsaW5lV2lkdGhUZXh0dXJlPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfT3V0bGluZUNvbG9yPzogSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk7XHJcbiAgICBfVXZBbmltTWFza1RleHR1cmU/OiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eTtcclxuICAgIFtwcm9wOiBzdHJpbmddOiBJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eSB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVRleHR1cmVQcm9wZXJ0aWVzIHtcclxuICAgIF9NYWluVGV4PzogbnVtYmVyO1xyXG4gICAgX1NoYWRlVGV4dHVyZT86IG51bWJlcjtcclxuICAgIF9CdW1wTWFwPzogbnVtYmVyO1xyXG4gICAgX1JlY2VpdmVTaGFkb3dUZXh0dXJlPzogbnVtYmVyO1xyXG4gICAgX1NoYWRpbmdHcmFkZVRleHR1cmU/OiBudW1iZXI7XHJcbiAgICBfUmltVGV4dHVyZT86IG51bWJlcjtcclxuICAgIF9TcGhlcmVBZGQ/OiBudW1iZXI7XHJcbiAgICBfRW1pc3Npb25NYXA/OiBudW1iZXI7XHJcbiAgICBfT3V0bGluZVdpZHRoVGV4dHVyZT86IG51bWJlcjtcclxuICAgIF9VdkFuaW1NYXNrVGV4dHVyZT86IG51bWJlcjtcclxuICAgIFtwcm9wOiBzdHJpbmddOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTU1hdGVyaWFsUHJvcGVydHlLZXl3b3JkTWFwIHtcclxuICAgIF9OT1JNQUxNQVA/OiBib29sZWFuO1xyXG4gICAgX0FMUEhBVEVTVF9PTj86IGJvb2xlYW47XHJcbiAgICBfQUxQSEFCTEVORF9PTj86IGJvb2xlYW47XHJcbiAgICBfQUxQSEFQUkVNVUxUSVBMWV9PTj86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTU1hdGVyaWFsUHJvcGVydHlUYWdNYXAge1xyXG4gICAgUmVuZGVyVHlwZT86ICdPcGFxdWUnIHwgJ1RyYW5zcGFyZW50Q3V0b3V0JyB8ICdUcmFuc3BhcmVudCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRlbnNpb25zLlZSTS5tYXRlcmlhbFByb3BlcnRpZXNcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZSTU1hdGVyaWFsUHJvcGVydHkge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc2hhZGVyOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVNoYWRlcjtcclxuICAgIHJlbmRlclF1ZXVlOiBudW1iZXI7XHJcbiAgICBmbG9hdFByb3BlcnRpZXM6IElWUk1NYXRlcmlhbFByb3BlcnR5RmxvYXRQcm9wZXJ0aWVzO1xyXG4gICAgdmVjdG9yUHJvcGVydGllczogSVZSTU1hdGVyaWFsUHJvcGVydHlWZWN0b3JQcm9wZXJ0aWVzO1xyXG4gICAgdGV4dHVyZVByb3BlcnRpZXM6IElWUk1NYXRlcmlhbFByb3BlcnR5VGV4dHVyZVByb3BlcnRpZXM7XHJcbiAgICBrZXl3b3JkTWFwOiBJVlJNTWF0ZXJpYWxQcm9wZXJ0eUtleXdvcmRNYXA7XHJcbiAgICB0YWdNYXA6IElWUk1NYXRlcmlhbFByb3BlcnR5VGFnTWFwO1xyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aCc7XHJcbmltcG9ydCB0eXBlIHsgTWVzaCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvbWVzaCc7XHJcbmltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZSc7XHJcbmltcG9ydCB0eXBlIHsgTW9ycGhUYXJnZXQgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTW9ycGgvbW9ycGhUYXJnZXQnO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3NjZW5lJztcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IFNwcmluZ0JvbmVDb250cm9sbGVyIH0gZnJvbSAnLi9zZWNvbmRhcnktYW5pbWF0aW9uL3NwcmluZy1ib25lLWNvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBIdW1hbm9pZEJvbmUgfSBmcm9tICcuL2h1bWFub2lkLWJvbmUnO1xyXG5pbXBvcnQgdHlwZSB7IElWUk0gfSBmcm9tICcuL3ZybS1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXIgfSBmcm9tICcuL21hdGVyaWFsLXZhbHVlLWJpbmRpbmctbWVyZ2VyJztcclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8qIFRPRE86IFBhdGNoZWQuXHJcbmltcG9ydCB7IENvbnN0cnVjdFNwcmluZ3NPcHRpb25zIH0gZnJvbSAnLi9zZWNvbmRhcnktYW5pbWF0aW9uL3NwcmluZy1ib25lLWNvbnRyb2xsZXInO1xyXG5pbXBvcnQgdHlwZSB7IE5vZGUsIFRhcmdldENhbWVyYSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZSc7XHJcbi8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5pbnRlcmZhY2UgSXNCaW5hcnlNYXAge1xyXG4gICAgW21vcnBoTmFtZTogc3RyaW5nXTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIE1vcnBoVGFyZ2V0U2V0dGluZyB7XHJcbiAgICB0YXJnZXQ6IE1vcnBoVGFyZ2V0O1xyXG4gICAgd2VpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBNb3JwaFRhcmdldE1hcCB7XHJcbiAgICBbbW9ycGhOYW1lOiBzdHJpbmddOiBNb3JwaFRhcmdldFNldHRpbmdbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIE1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwIHtcclxuICAgIFttb3JwaE5hbWU6IHN0cmluZ106IE1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVHJhbnNmb3JtTm9kZU1hcCB7XHJcbiAgICBbaHVtYW5Cb25lTmFtZTogc3RyaW5nXTogVHJhbnNmb3JtTm9kZTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFRyYW5zZm9ybU5vZGVDYWNoZSB7XHJcbiAgICBbbm9kZUluZGV4OiBudW1iZXJdOiBUcmFuc2Zvcm1Ob2RlO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTWVzaENhY2hlIHtcclxuICAgIFttZXNoSW5kZXg6IG51bWJlcl06IE1lc2hbXTtcclxufVxyXG5cclxuLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8qIFRPRE86IFBhdGNoZWQuXHJcbmV4cG9ydCBjbGFzcyBtb3JwaGluZ1RhcmdldFByb3BlcnR5IHtcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XHJcbiAgICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyLm1vcnBoaW5nKHRoaXMubGFiZWwsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZywgdmFsdWU6IG51bWJlciwgcHJpdmF0ZSBtYW5hZ2VyOiBWUk1NYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIE1vcnBoVGFyZ2V0UHJvcGVydHlNYXAge1xyXG4gICAgW21vcnBoTmFtZTogc3RyaW5nXTogbW9ycGhpbmdUYXJnZXRQcm9wZXJ0eTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2Zvcm1Ob2RlVHJlZU5vZGUge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHBhcmVudDogbnVtYmVyO1xyXG4gICAgY2hpbGRyZW4/OiBUcmFuc2Zvcm1Ob2RlVHJlZU5vZGVbXTtcclxufVxyXG4vLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLyoqXHJcbiAqIFVuaXR5IEh1bWFub2lkIEJvbmUg5ZCNXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBIdW1hbkJvbmVOYW1lID1cclxuICAgIHwgJ2hpcHMnXHJcbiAgICB8ICdsZWZ0VXBwZXJMZWcnXHJcbiAgICB8ICdyaWdodFVwcGVyTGVnJ1xyXG4gICAgfCAnbGVmdExvd2VyTGVnJ1xyXG4gICAgfCAncmlnaHRMb3dlckxlZydcclxuICAgIHwgJ2xlZnRGb290J1xyXG4gICAgfCAncmlnaHRGb290J1xyXG4gICAgfCAnc3BpbmUnXHJcbiAgICB8ICdjaGVzdCdcclxuICAgIHwgJ25lY2snXHJcbiAgICB8ICdoZWFkJ1xyXG4gICAgfCAnbGVmdFNob3VsZGVyJ1xyXG4gICAgfCAncmlnaHRTaG91bGRlcidcclxuICAgIHwgJ2xlZnRVcHBlckFybSdcclxuICAgIHwgJ3JpZ2h0VXBwZXJBcm0nXHJcbiAgICB8ICdsZWZ0TG93ZXJBcm0nXHJcbiAgICB8ICdyaWdodExvd2VyQXJtJ1xyXG4gICAgfCAnbGVmdEhhbmQnXHJcbiAgICB8ICdyaWdodEhhbmQnXHJcbiAgICB8ICdsZWZ0VG9lcydcclxuICAgIHwgJ3JpZ2h0VG9lcydcclxuICAgIHwgJ2xlZnRFeWUnXHJcbiAgICB8ICdyaWdodEV5ZSdcclxuICAgIHwgJ2phdydcclxuICAgIHwgJ2xlZnRUaHVtYlByb3hpbWFsJ1xyXG4gICAgfCAnbGVmdFRodW1iSW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAnbGVmdFRodW1iRGlzdGFsJ1xyXG4gICAgfCAnbGVmdEluZGV4UHJveGltYWwnXHJcbiAgICB8ICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdsZWZ0SW5kZXhEaXN0YWwnXHJcbiAgICB8ICdsZWZ0TWlkZGxlUHJveGltYWwnXHJcbiAgICB8ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAnbGVmdE1pZGRsZURpc3RhbCdcclxuICAgIHwgJ2xlZnRSaW5nUHJveGltYWwnXHJcbiAgICB8ICdsZWZ0UmluZ0ludGVybWVkaWF0ZSdcclxuICAgIHwgJ2xlZnRSaW5nRGlzdGFsJ1xyXG4gICAgfCAnbGVmdExpdHRsZVByb3hpbWFsJ1xyXG4gICAgfCAnbGVmdExpdHRsZUludGVybWVkaWF0ZSdcclxuICAgIHwgJ2xlZnRMaXR0bGVEaXN0YWwnXHJcbiAgICB8ICdyaWdodFRodW1iUHJveGltYWwnXHJcbiAgICB8ICdyaWdodFRodW1iSW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAncmlnaHRUaHVtYkRpc3RhbCdcclxuICAgIHwgJ3JpZ2h0SW5kZXhQcm94aW1hbCdcclxuICAgIHwgJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnXHJcbiAgICB8ICdyaWdodEluZGV4RGlzdGFsJ1xyXG4gICAgfCAncmlnaHRNaWRkbGVQcm94aW1hbCdcclxuICAgIHwgJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJ1xyXG4gICAgfCAncmlnaHRNaWRkbGVEaXN0YWwnXHJcbiAgICB8ICdyaWdodFJpbmdQcm94aW1hbCdcclxuICAgIHwgJ3JpZ2h0UmluZ0ludGVybWVkaWF0ZSdcclxuICAgIHwgJ3JpZ2h0UmluZ0Rpc3RhbCdcclxuICAgIHwgJ3JpZ2h0TGl0dGxlUHJveGltYWwnXHJcbiAgICB8ICdyaWdodExpdHRsZUludGVybWVkaWF0ZSdcclxuICAgIHwgJ3JpZ2h0TGl0dGxlRGlzdGFsJ1xyXG4gICAgfCAndXBwZXJDaGVzdCdcclxuICAgIHwgc3RyaW5nO1xyXG5cclxuLyoqXHJcbiAqIFZSTSDjgq3jg6Pjg6njgq/jgr/jg7zjgpLli5XkvZzjgZXjgZvjgovjgZ/jgoHjga7jg57jg43jg7zjgrjjg6NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWUk1NYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgaXNCaW5hcnlNb3JwaE1hcDogSXNCaW5hcnlNYXAgPSB7fTtcclxuICAgIHByaXZhdGUgbW9ycGhUYXJnZXRNYXA6IE1vcnBoVGFyZ2V0TWFwID0ge307XHJcbiAgICBwcml2YXRlIG1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwOiBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlck1hcCA9IHt9O1xyXG4gICAgcHJpdmF0ZSBwcmVzZXRNb3JwaFRhcmdldE1hcDogTW9ycGhUYXJnZXRNYXAgPSB7fTtcclxuICAgIHByaXZhdGUgdHJhbnNmb3JtTm9kZU1hcDogVHJhbnNmb3JtTm9kZU1hcCA9IHt9O1xyXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1Ob2RlQ2FjaGU6IFRyYW5zZm9ybU5vZGVDYWNoZSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBtZXNoQ2FjaGU6IE1lc2hDYWNoZSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfaHVtYW5vaWRCb25lOiBIdW1hbm9pZEJvbmU7XHJcbiAgICBwcml2YXRlIF9yb290TWVzaDogTWVzaDtcclxuXHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIHB1YmxpYyBzdGF0aWMgUk9PVF9NRVNIX1BSRUZJWCA9ICd2cm1fcm9vdF8nO1xyXG5cclxuICAgIHByaXZhdGUgX3RyYW5zZm9ybU5vZGVUcmVlOiBUcmFuc2Zvcm1Ob2RlVHJlZU5vZGU7XHJcbiAgICBnZXQgdHJhbnNmb3JtTm9kZVRyZWUoKTogVHJhbnNmb3JtTm9kZVRyZWVOb2RlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtTm9kZVRyZWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIHRoZSB3YXkgQmFieWxvbkpTIGFuaW1hdGlvbiB3b3Jrc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTW9ycGhUYXJnZXRQcm9wZXJ0eU1hcDogTW9ycGhUYXJnZXRQcm9wZXJ0eU1hcCA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgX3Jvb3RTa2VsZXRvbjogTm9kZTtcclxuXHJcbiAgICBwcml2YXRlIF9jYW1lcmFzOiBUYXJnZXRDYW1lcmFbXSA9IFtdO1xyXG5cclxuICAgIGdldCBjYW1lcmFzKCk6IFRhcmdldENhbWVyYVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FtZXJhcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXBwZW5kQ2FtZXJhKGNhbWVyYTogVGFyZ2V0Q2FtZXJhKSB7XHJcbiAgICAgICAgdGhpcy5fY2FtZXJhcy5wdXNoKGNhbWVyYSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0Q2FtZXJhcygpIHtcclxuICAgICAgICB0aGlzLl9jYW1lcmFzID0gW107XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWNvbmRhcnkgQW5pbWF0aW9uIOOBqOOBl+OBpuWumue+qeOBleOCjOOBpuOBhOOCiyBWUk0gU3ByaW5nIEJvbmUg44Gu44Kz44Oz44OI44Ot44O844OpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lQ29udHJvbGxlcjogU3ByaW5nQm9uZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV4dCBnbFRGLmV4dGVuc2lvbnMuVlJNIOOBruS4rei6qyBqc29uXHJcbiAgICAgKiBAcGFyYW0gc2NlbmVcclxuICAgICAqIEBwYXJhbSBtZXNoZXNGcm9tIOOBk+OBrueVquWPt+S7pemZjeOBruODoeODg+OCt+ODpeOBjOOBk+OBriBWUk0g44Gr6Kmy5b2T44GZ44KLXHJcbiAgICAgKiBAcGFyYW0gdHJhbnNmb3JtTm9kZXNGcm9tIOOBk+OBrueVquWPt+S7pemZjeOBriBUcmFuc2Zvcm1Ob2RlIOOBjOOBk+OBriBWUk0g44Gr6Kmy5b2T44GZ44KLXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWxzTm9kZXNGcm9tIOOBk+OBrueVquWPt+S7pemZjeOBriBNYXRlcmlhbCDjgYzjgZPjga4gVlJNIOOBq+ipsuW9k+OBmeOCi1xyXG4gICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICogQHBhcmFtIHVyaSBVUkkgdGhpcyBtYW5hZ2VyIGJlbG9uZ3MgdG9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBleHQ6IElWUk0sXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHNjZW5lOiBTY2VuZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG1lc2hlc0Zyb206IG51bWJlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHRyYW5zZm9ybU5vZGVzRnJvbTogbnVtYmVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbWF0ZXJpYWxzTm9kZXNGcm9tOiBudW1iZXIsXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHVyaTogc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLm1lc2hDYWNoZSA9IHRoaXMuY29uc3RydWN0TWVzaENhY2hlKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1Ob2RlQ2FjaGUgPSB0aGlzLmNvbnN0cnVjdFRyYW5zZm9ybU5vZGVDYWNoZSgpO1xyXG4gICAgICAgIHRoaXMuc3ByaW5nQm9uZUNvbnRyb2xsZXIgPSBuZXcgU3ByaW5nQm9uZUNvbnRyb2xsZXIodGhpcy5leHQuc2Vjb25kYXJ5QW5pbWF0aW9uLCB0aGlzLmZpbmRUcmFuc2Zvcm1Ob2RlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5leHQuYmxlbmRTaGFwZU1hc3RlciAmJiB0aGlzLmV4dC5ibGVuZFNoYXBlTWFzdGVyLmJsZW5kU2hhcGVHcm91cHMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RJc0JpbmFyeU1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdE1vcnBoVGFyZ2V0TWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0TWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RUcmFuc2Zvcm1Ob2RlTWFwKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2h1bWFub2lkQm9uZSA9IG5ldyBIdW1hbm9pZEJvbmUodGhpcy50cmFuc2Zvcm1Ob2RlTWFwKTtcclxuXHJcbiAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgLy8qIFRPRE86IEhhbmRsZSBsYXRlci5cclxuICAgICAgICAvLyB0aGlzLnJlbW92ZUR1cGxpY2F0ZVNrZWxldG9ucygpO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTa2VsZXRvbiA9IHRoaXMuZ2V0Um9vdFNrZWxldG9uTm9kZSgpO1xyXG4gICAgICAgIC8vIFJlbmFtZSBfX3Jvb3RfXyBub2RlXHJcbiAgICAgICAgdGhpcy5yb290TWVzaC5uYW1lID0gVlJNTWFuYWdlci5ST09UX01FU0hfUFJFRklYICsgdGhpcy5zY2VuZS5nZXROb2RlcygpLmZpbHRlcigoZSkgPT4gZS5uYW1lLmluY2x1ZGVzKFZSTU1hbmFnZXIuUk9PVF9NRVNIX1BSRUZJWCkpLmxlbmd0aDtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIH1cclxuXHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGR1cGxpY2F0ZSBza2VsZXRvbnMgd2hlbiBpbXBvcnRpbmcgVlJNLlxyXG4gICAgICogT25seSB0ZXN0ZWQgb24gVlJvaWRTdHVkaW8gb3V0cHV0IGZpbGVzLlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVEdXBsaWNhdGVTa2VsZXRvbnMoKSB7XHJcbiAgICAgICAgbGV0IHNrZWxldG9uID0gbnVsbDtcclxuICAgICAgICBmb3IgKGNvbnN0IG5vZGVJbmRleCBvZiBPYmplY3Qua2V5cyh0aGlzLm1lc2hDYWNoZSkubWFwKE51bWJlcikpIHtcclxuICAgICAgICAgICAgY29uc3QgbWVzaGVzID0gdGhpcy5tZXNoQ2FjaGVbbm9kZUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKG1lc2hlcy5sZW5ndGggJiYgbWVzaGVzWzBdLnNrZWxldG9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNrZWxldG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tlbGV0b24gPSBtZXNoZXNbMF0uc2tlbGV0b247XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jvb3RNZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvb3RCb25lID0gc2tlbGV0b24uYm9uZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzdWFsbHkgaXQgaXMgY2FsbGVkIFwiUm9vdFwiLCBidXQgdGhlcmUgYXJlIGV4Y2VwdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvb3RCb25lLm5hbWUgIT09ICdSb290JykgY29uc29sZS53YXJuKCdUaGUgZmlyc3QgYm9uZSBoYXMgYSBkaWZmZXJlbnQgbmFtZSB0aGFuIFwiUm9vdFwiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB3ZWFrIHNhbml0eSBjaGVja1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChza2VsZXRvbi5ib25lcy5sZW5ndGggIT0gbWVzaGVzWzBdLnNrZWxldG9uLmJvbmVzLmxlbmd0aCkgY29uc29sZS53YXJuKCdTa2VsZXRvbnMgaGF2ZSBkaWZmZXJlbnQgbnVtYmVycyBvZiBib25lcyEnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzaGVzWzBdLnNrZWxldG9uLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1lc2ggb2YgbWVzaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2guc2tlbGV0b24gPSBza2VsZXRvbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIHRoZSByb290IG5vZGUgb2Ygc2tlbGV0b24uXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFJvb3RTa2VsZXRvbk5vZGUoKTogTm9kZSB7XHJcbiAgICAgICAgY29uc3Qgcm9vdE1lc2hDaGlsZHJlbiA9IHRoaXMuX3Jvb3RNZXNoLmdldENoaWxkcmVuKChub2RlOiBOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlLm5hbWUgPT09ICdSb290JyB8fCBub2RlLm5hbWUgPT09ICdBcm1hdHVyZSc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHJvb3RNZXNoQ2hpbGRyZW4ubGVuZ3RoID4gMCkgcmV0dXJuIHJvb3RNZXNoQ2hpbGRyZW5bMF07XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIGluIHNjZW5lIGRpcmVjdGx5XHJcbiAgICAgICAgICAgIGNvbnN0IHJvb3RNZXNoQ2hpbGQgPSB0aGlzLnNjZW5lLmdldE5vZGVCeU5hbWUoJ1Jvb3QnKSA/IHRoaXMuc2NlbmUuZ2V0Tm9kZUJ5TmFtZSgnUm9vdCcpIDogdGhpcy5zY2VuZS5nZXROb2RlQnlOYW1lKCdBcm1hdHVyZScpO1xyXG4gICAgICAgICAgICBpZiAocm9vdE1lc2hDaGlsZCAmJiAhcm9vdE1lc2hDaGlsZC5wYXJlbnQpIHJldHVybiByb290TWVzaENoaWxkO1xyXG4gICAgICAgICAgICBlbHNlIHRocm93IEVycm9yKCdDYW5ub3QgZmluZCByb290IHNrZWxldG9uIG5vZGUhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWNvbmRhcnkgQW5pbWF0aW9uIOOCkuabtOaWsOOBmeOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkZWx0YVRpbWUg5YmN44OV44Os44O844Og44GL44KJ44Gu57WM6YGO56eS5pWwKHNlYylcclxuICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAqIEBwYXJhbSBib25lT3B0aW9uc1xyXG4gICAgICovXHJcbiAgICAvLyBwdWJsaWMgYXN5bmMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5zcHJpbmdCb25lQ29udHJvbGxlci51cGRhdGUoZGVsdGFUaW1lKTtcclxuICAgIC8vIH1cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIsIGJvbmVPcHRpb25zPzogQ29uc3RydWN0U3ByaW5nc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLnNwcmluZ0JvbmVDb250cm9sbGVyLnVwZGF0ZShkZWx0YVRpbWUsIGJvbmVPcHRpb25zKTtcclxuICAgIH1cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOegtOajhOWHpueQhlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNwcmluZ0JvbmVDb250cm9sbGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLl9odW1hbm9pZEJvbmUuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICB0aGlzLl9yb290U2tlbGV0b24uZGlzcG9zZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9yb290TWVzaCkgdGhpcy5fcm9vdE1lc2guZGlzcG9zZSgpO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICAodGhpcy5tb3JwaFRhcmdldE1hcCBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5tYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlck1hcCBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcCBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy50cmFuc2Zvcm1Ob2RlTWFwIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLnRyYW5zZm9ybU5vZGVDYWNoZSBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5tZXNoQ2FjaGUgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMuX3Jvb3RNZXNoIGFzIGFueSkgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICAodGhpcy5Nb3JwaFRhcmdldFByb3BlcnR5TWFwIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLl9jYW1lcmFzIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLl90cmFuc2Zvcm1Ob2RlVHJlZSBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODouODvOODleOCo+ODs+OCsOOCkuihjOOBhlxyXG4gICAgICogQHBhcmFtIGxhYmVsIOODouODvOODleWQjVxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWApCgw44CcMSlcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vcnBoaW5nKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB2ID0gdGhpcy5jYWxjTW9ycGhWYWx1ZShsYWJlbCwgdmFsdWUpO1xyXG4gICAgICAgIGlmICh0aGlzLm1vcnBoVGFyZ2V0TWFwW2xhYmVsXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vcnBoVGFyZ2V0TWFwW2xhYmVsXS5mb3JFYWNoKChzZXR0aW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nLnRhcmdldC5pbmZsdWVuY2UgPSB2ICogKHNldHRpbmcud2VpZ2h0IC8gMTAwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwW2xhYmVsXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsVmFsdWVCaW5kaW5nTWVyZ2VyTWFwW2xhYmVsXS5tb3JwaGluZyh2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg5fjg6rjgrvjg4Pjg4jjg6Ljg7zjg5Xjga7jg6Ljg7zjg5XjgqPjg7PjgrDjgpLooYzjgYZcclxuICAgICAqIEBwYXJhbSBsYWJlbCDjg6Ljg7zjg5XlkI1cclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlgKQoMOOAnDEpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3JwaGluZ1ByZXNldChsYWJlbDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByZXNldE1vcnBoVGFyZ2V0TWFwW2xhYmVsXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLmNhbGNNb3JwaFZhbHVlKGxhYmVsLCB2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcFtsYWJlbF0uZm9yRWFjaCgoc2V0dGluZykgPT4ge1xyXG4gICAgICAgICAgICBzZXR0aW5nLnRhcmdldC5pbmZsdWVuY2UgPSB2ICogKHNldHRpbmcud2VpZ2h0IC8gMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODouODvOODleOCo+ODs+OCsOeUqOOBruWApOOCkuioiOeul+OBmeOCi1xyXG4gICAgICogQHBhcmFtIGxhYmVsIOODouODvOODleWQjVxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWApFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGNNb3JwaFZhbHVlKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHYgPSBNYXRoLm1heCgwLjAsIE1hdGgubWluKDEuMCwgdmFsdWUpKTtcclxuICAgICAgICBpZiAodGhpcy5pc0JpbmFyeU1vcnBoTWFwW2xhYmVsXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdiA+IDAuNSA/IDEuMCA6IDAuMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBsaXN0IG1vcnBoaW5nIG5hbWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE1vcnBoaW5nTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMubW9ycGhUYXJnZXRNYXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiA5Lq656ew5pmC44Gu44Kr44Oh44Op5L2N572u44KS57W25a++5bqn5qiZ44Go44GX44Gm5Y+W5b6X44GZ44KLXHJcbiAgICAgKlxyXG4gICAgICogZmlyc3RQZXJzb25Cb25lIOOBjOacquioreWumuOBruWgtOWQiOOBryBudWxsIOOCkui/lOOBmVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIOS4gOS6uuensOaZguOBruOCq+ODoeODqeOBruePvuWcqOOBq+OBiuOBkeOCi+e1tuWvvuW6p+aomVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Rmlyc3RQZXJzb25DYW1lcmFQb3NpdGlvbigpOiBOdWxsYWJsZTxWZWN0b3IzPiB7XHJcbiAgICAgICAgY29uc3QgZmlyc3RQZXJzb25Cb25lID0gdGhpcy5nZXRGaXJzdFBlcnNvbkJvbmUoKTtcclxuICAgICAgICBpZiAoIWZpcnN0UGVyc29uQm9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2VQb3MgPSBmaXJzdFBlcnNvbkJvbmUuZ2V0QWJzb2x1dGVQb3NpdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IG9mZnNldFBvcyA9IHRoaXMuZXh0LmZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldDtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoYmFzZVBvcy54ICsgb2Zmc2V0UG9zLngsIGJhc2VQb3MueSArIG9mZnNldFBvcy55LCBiYXNlUG9zLnogKyBvZmZzZXRQb3Mueik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEhlYWRCb25lQ2FtZXJhUG9zaXRpb24oKTogTnVsbGFibGU8VmVjdG9yMz4ge1xyXG4gICAgICAgIGNvbnN0IGZpcnN0UGVyc29uQm9uZSA9IHRoaXMuZ2V0Qm9uZShcImhlYWRcIik7XHJcbiAgICAgICAgaWYgKCFmaXJzdFBlcnNvbkJvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBiYXNlUG9zID0gZmlyc3RQZXJzb25Cb25lLmdldEFic29sdXRlUG9zaXRpb24oKTtcclxuICAgICAgICBjb25zdCBvZmZzZXRQb3MgPSB0aGlzLmV4dC5maXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKGJhc2VQb3MueCArIG9mZnNldFBvcy54LCBiYXNlUG9zLnkgKyBvZmZzZXRQb3MueSwgYmFzZVBvcy56ICsgb2Zmc2V0UG9zLnopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiA5Lq656ew5pmC44Gr6aCt44Go44G/44Gq44GZIFRyYW5zZm9ybU5vZGUg44KS5Y+W5b6X44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRGaXJzdFBlcnNvbkJvbmUoKTogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRUcmFuc2Zvcm1Ob2RlKHRoaXMuZXh0LmZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvKipcclxuICAgICAqIOODnOODvOODs+WQjeOBi+OCieOBneOBruODnOODvOODs+OBq+ipsuW9k+OBmeOCiyBUcmFuc2Zvcm1Ob2RlIOOCkuWPluW+l+OBmeOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lIEh1bWFuQm9uZU5hbWVcclxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBodW1hbm9pZEJvbmUgZ2V0dGVyIGluc3RlYWQuIFRoaXMgbWV0aG9kIHdpbGwgZGVsZXRlIGF0IHYyLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBIdW1hbkJvbmVOYW1lKTogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybU5vZGVNYXBbbmFtZV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJvb3RTa2VsZXRvbk5vZGUoKTogTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RTa2VsZXRvbjtcclxuICAgIH1cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBIdW1hbm9pZEJvbmUgTWV0aG9kc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGh1bWFub2lkQm9uZSgpOiBIdW1hbm9pZEJvbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odW1hbm9pZEJvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWUk0gUm9vdCBtZXNoXHJcbiAgICAgKlxyXG4gICAgICogVXNlZnVsIGZvciBNb2RlbCBUcmFuc2Zvcm1hdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJvb3RNZXNoKCk6IE1lc2gge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb290TWVzaDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vZGUg55Wq5Y+344GL44KJ6Kmy5b2T44GZ44KLIFRyYW5zZm9ybU5vZGUg44KS5o6i44GZXHJcbiAgICAgKiDmlbDjgYzlpJrjgY/jgarjgovjga7jgafjgq3jg6Pjg4Pjgrfjg6Xjgavlj4LnhafjgpLmjIHjgaTmp4vpgKDjgavjgZnjgotcclxuICAgICAqIGdsdGYg44GuIG5vZGUg55Wq5Y+344GvIGBtZXRhZGF0YS5nbHRmLnBvaW50ZXJzYCDjgavoqJjpjLLjgZXjgozjgabjgYTjgotcclxuICAgICAqIEBwYXJhbSBub2RlSW5kZXhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRUcmFuc2Zvcm1Ob2RlKG5vZGVJbmRleDogbnVtYmVyKTogTnVsbGFibGU8VHJhbnNmb3JtTm9kZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybU5vZGVDYWNoZVtub2RlSW5kZXhdIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAvKipcclxuICAgICAqIG1lc2gg55Wq5Y+344GL44KJ44Oh44OD44K344Ol44KS5o6i44GZXHJcbiAgICAgKiBnbHRmIOOBriBtZXNoIOeVquWPt+OBryBgbWV0YWRhdGEuZ2x0Zi5wb2ludGVyc2Ag44Gr6KiY6Yyy44GV44KM44Gm44GE44KLXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgZmluZE1lc2hlcyBpbnN0ZWFkLiBUaGlzIG1ldGhvZCBoYXMgYnJva2VuLlxyXG4gICAgICovXHJcbiAgICAvLyBwdWJsaWMgZmluZE1lc2gobWVzaEluZGV4OiBudW1iZXIpOiBOdWxsYWJsZTxNZXNoPiB7XHJcbiAgICAvLyAgICAgcmV0dXJuICh0aGlzLm1lc2hDYWNoZVttZXNoSW5kZXhdICYmIHRoaXMubWVzaENhY2hlW21lc2hJbmRleF1bMF0pIHx8IG51bGw7XHJcbiAgICAvLyB9XHJcbiAgICAvKipcclxuICAgICAqIEZpbmQgaW5kZXggb2YgcyBzcGVjaWZpYyBUcmFuc2Zvcm1Ob2RlIGZyb20gY2FjaGVcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgaW5kZXhPZlRyYW5zZm9ybU5vZGUobm9kZTogTnVsbGFibGU8Tm9kZT4pOiBudW1iZXIge1xyXG4gICAgICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMudHJhbnNmb3JtTm9kZUNhY2hlKSkge1xyXG4gICAgICAgICAgICBpZiAobm9kZSA9PSB2KSByZXR1cm4gcGFyc2VJbnQoaywgMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXNoIOeVquWPt+OBi+OCieODoeODg+OCt+ODpeOCkuaOouOBmVxyXG4gICAgICogZ2x0ZiDjga4gbWVzaCDnlarlj7fjga8gYG1ldGFkYXRhLmdsdGYucG9pbnRlcnNgIOOBq+iomOmMsuOBleOCjOOBpuOBhOOCi1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE1lc2hlcyhtZXNoSW5kZXg6IG51bWJlcik6IE51bGxhYmxlPE1lc2hbXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc2hDYWNoZVttZXNoSW5kZXhdIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuovliY3jgasgTW9ycGhUYXJnZXQg44GoIGlzQmluYXJ5IOOCkue0kOS7mOOBkeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdElzQmluYXJ5TWFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZXh0LmJsZW5kU2hhcGVNYXN0ZXIuYmxlbmRTaGFwZUdyb3Vwcy5mb3JFYWNoKChnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCaW5hcnlNb3JwaE1hcFtnLm5hbWVdID0gZy5pc0JpbmFyeTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS6i+WJjeOBqyBNb3JwaFRhcmdldCDjgaggQmxlbmRTaGFwZSDjgpLntJDku5jjgZHjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RNb3JwaFRhcmdldE1hcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmV4dC5ibGVuZFNoYXBlTWFzdGVyLmJsZW5kU2hhcGVHcm91cHMuZm9yRWFjaCgoZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWcuYmluZHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnLmJpbmRzLmZvckVhY2goKGIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc2hlcyA9IHRoaXMuZmluZE1lc2hlcyhiLm1lc2gpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVW5kZWZpbmVkIEJsZW5kU2hhcGVCaW5kIE1lc2hgLCBiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0TWFuYWdlciA9IG1lc2gubW9ycGhUYXJnZXRNYW5hZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbW9ycGhUYXJnZXRNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmRlZmluZWQgbW9ycGhUYXJnZXRNYW5hZ2VyYCwgYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbW9ycGhUYXJnZXRNYW5hZ2VyLmdldFRhcmdldChiLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vcnBoVGFyZ2V0TWFwW2cubmFtZV0gPSB0aGlzLm1vcnBoVGFyZ2V0TWFwW2cubmFtZV0gfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3JwaFRhcmdldE1hcFtnLm5hbWVdLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlaWdodDogYi53ZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Nb3JwaFRhcmdldFByb3BlcnR5TWFwW2cubmFtZV0gPSBuZXcgbW9ycGhpbmdUYXJnZXRQcm9wZXJ0eShnLm5hbWUsIDAsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnLnByZXNldE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcFtnLnByZXNldE5hbWVdID0gdGhpcy5wcmVzZXRNb3JwaFRhcmdldE1hcFtnLnByZXNldE5hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXNldE1vcnBoVGFyZ2V0TWFwW2cucHJlc2V0TmFtZV0ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IGIud2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuovliY3jgasgTWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXIg44Go44Oi44O844OV5ZCN44KS57SQ5LuY44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0TWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXAoKSB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gdGhpcy5zY2VuZS5tYXRlcmlhbHMuc2xpY2UodGhpcy5tYXRlcmlhbHNOb2Rlc0Zyb20pO1xyXG4gICAgICAgIHRoaXMuZXh0LmJsZW5kU2hhcGVNYXN0ZXIuYmxlbmRTaGFwZUdyb3Vwcy5mb3JFYWNoKChnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZy5tYXRlcmlhbFZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxWYWx1ZUJpbmRpbmdNZXJnZXJNYXBbZy5uYW1lXSA9IG5ldyBNYXRlcmlhbFZhbHVlQmluZGluZ01lcmdlcihtYXRlcmlhbHMsIGcubWF0ZXJpYWxWYWx1ZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LqL5YmN44GrIFRyYW5zZm9ybU5vZGUg44GoIGJvbmUg5ZCN44KS57SQ44Gl44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0VHJhbnNmb3JtTm9kZU1hcCgpIHtcclxuICAgICAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgICAgICBjb25zdCB0cmVlUHJlQXJyOiBUcmFuc2Zvcm1Ob2RlVHJlZU5vZGVbXSA9IFtdO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHRoaXMuZXh0Lmh1bWFub2lkLmh1bWFuQm9uZXMuZm9yRWFjaCgoYikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5maW5kVHJhbnNmb3JtTm9kZShiLm5vZGUpO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU5vZGVNYXBbYi5ib25lXSA9IG5vZGU7XHJcbiAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgICAgICB0cmVlUHJlQXJyLnB1c2goeyBpZDogYi5ub2RlLCBuYW1lOiBiLmJvbmUsIHBhcmVudDogdGhpcy5pbmRleE9mVHJhbnNmb3JtTm9kZShub2RlLnBhcmVudCkgfSk7XHJcbiAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgICAgIGNvbnN0IHRyZWUgPSB0aGlzLmhpZXJhcmNoeSh0cmVlUHJlQXJyKTtcclxuICAgICAgICBpZiAodHJlZS5sZW5ndGggPT09IDApIHRocm93IEVycm9yKCdGYWlsZWQgdG8gY29uc3RydWN0IGJvbmUgaGllcmFyY2h5IHRyZWUhJyk7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtTm9kZVRyZWUgPSB0cmVlWzBdO1xyXG4gICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfVxyXG5cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vKiBUT0RPOiBQYXRjaGVkLlxyXG4gICAgcHJpdmF0ZSBoaWVyYXJjaHkoZGF0YTogVHJhbnNmb3JtTm9kZVRyZWVOb2RlW10pIHtcclxuICAgICAgICBjb25zdCB0cmVlOiBUcmFuc2Zvcm1Ob2RlVHJlZU5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkT2Y6IGFueSA9IHt9O1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGl0ZW0uaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGl0ZW0ucGFyZW50O1xyXG4gICAgICAgICAgICBjaGlsZE9mW2lkXSA9IGNoaWxkT2ZbaWRdIHx8IFtdO1xyXG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuID0gY2hpbGRPZltpZF07XHJcbiAgICAgICAgICAgIC8vIEFzc3VtZSBIaXBzIGlzIHJvb3RcclxuICAgICAgICAgICAgaWYgKHBhcmVudCAhPSBudWxsICYmIHRoaXMudHJhbnNmb3JtTm9kZUNhY2hlW3BhcmVudF0ucGFyZW50ICE9IHRoaXMuX3Jvb3RNZXNoICYmIGl0ZW0ubmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaGlwcycpIHtcclxuICAgICAgICAgICAgICAgIChjaGlsZE9mW3BhcmVudF0gPSBjaGlsZE9mW3BhcmVudF0gfHwgW10pLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmVlLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJlZTtcclxuICAgIH1cclxuICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vZGUg55Wq5Y+344GoIFRyYW5zZm9ybU5vZGUg44KS57SQ44Gl44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0VHJhbnNmb3JtTm9kZUNhY2hlKCkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlOiBUcmFuc2Zvcm1Ob2RlQ2FjaGUgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMudHJhbnNmb3JtTm9kZXNGcm9tOyBpbmRleCA8IHRoaXMuc2NlbmUudHJhbnNmb3JtTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnNjZW5lLnRyYW5zZm9ybU5vZGVzW2luZGV4XTtcclxuICAgICAgICAgICAgLy8g44Od44Kk44Oz44K/44GM55m76Yyy44GV44KM44Gm44GE44Gq44GE44KC44Gu44Gv55yB55WlXHJcbiAgICAgICAgICAgIGlmICghbm9kZSB8fCAhbm9kZS5tZXRhZGF0YSB8fCAhbm9kZS5tZXRhZGF0YS5nbHRmIHx8ICFub2RlLm1ldGFkYXRhLmdsdGYucG9pbnRlcnMgfHwgbm9kZS5tZXRhZGF0YS5nbHRmLnBvaW50ZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBwb2ludGVyIG9mIG5vZGUubWV0YWRhdGEuZ2x0Zi5wb2ludGVycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50ZXIuc3RhcnRzV2l0aCgnL25vZGVzLycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAgICAgLy8qIFRPRE86IFBhdGNoZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgbm9kZUluZGV4ID0gcGFyc2VJbnQoKHBvaW50ZXIgYXMgc3RyaW5nKS5zdWJzdHIoNyksIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlSW5kZXggPSBwYXJzZUludCgocG9pbnRlciBhcyBzdHJpbmcpLnN1YnN0cmluZyg3KSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW25vZGVJbmRleF0gPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYWNoZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1lc2gg55Wq5Y+344GoIE1lc2gg44KS57SQ44Gl44GR44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0TWVzaENhY2hlKCkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlOiBNZXNoQ2FjaGUgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMubWVzaGVzRnJvbTsgaW5kZXggPCB0aGlzLnNjZW5lLm1lc2hlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgbWVzaCA9IHRoaXMuc2NlbmUubWVzaGVzW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKG1lc2guaWQgPT09ICdfX3Jvb3RfXycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RNZXNoID0gbWVzaCBhcyBNZXNoO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g44Od44Kk44Oz44K/44GM55m76Yyy44GV44KM44Gm44GE44Gq44GE44KC44Gu44Gv55yB55WlXHJcbiAgICAgICAgICAgIGlmICghbWVzaCB8fCAhbWVzaC5tZXRhZGF0YSB8fCAhbWVzaC5tZXRhZGF0YS5nbHRmIHx8ICFtZXNoLm1ldGFkYXRhLmdsdGYucG9pbnRlcnMgfHwgbWVzaC5tZXRhZGF0YS5nbHRmLnBvaW50ZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBwb2ludGVyIG9mIG1lc2gubWV0YWRhdGEuZ2x0Zi5wb2ludGVycykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSAocG9pbnRlciBhcyBzdHJpbmcpLm1hdGNoKC9eXFwvbWVzaGVzXFwvKFxcZCspLiskLyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlSW5kZXggPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW25vZGVJbmRleF0gPSBjYWNoZVtub2RlSW5kZXhdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW25vZGVJbmRleF0ucHVzaChtZXNoIGFzIE1lc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYWNoZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHdoZXRoZXIgc2hhZG93IGFyZSByZWNlaXZlZC5cclxuICAgICAqIEBwYXJhbSBlbmFibGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTaGFkb3dFbmFibGVkKGVuYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5vZGVJbmRleCBvZiBPYmplY3Qua2V5cyh0aGlzLm1lc2hDYWNoZSkubWFwKE51bWJlcikpIHtcclxuICAgICAgICAgICAgY29uc3QgbWVzaGVzID0gdGhpcy5tZXNoQ2FjaGVbbm9kZUluZGV4XTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBtZXNoIG9mIG1lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgbWVzaC5yZWNlaXZlU2hhZG93cyA9IGVuYWJsZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZSc7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZSc7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoJztcclxuaW1wb3J0IHR5cGUgeyBNZXNoIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy9tZXNoJztcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB0eXBlIHsgR0xURkxvYWRlciwgSU1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9sb2FkZXJzL2dsVEYvMi4wJztcclxuLy8qIFRPRE86IEhhbmRsZSBsYXRlci5cclxuLy8gaW1wb3J0IHsgTVRvb25NYXRlcmlhbCB9IGZyb20gJ2JhYnlsb24tbXRvb24tbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsIH0gZnJvbSAnLi4vLi4vLi4vc2hhZGVyL2JhYnlsb24tbXRvb24tbWF0ZXJpYWwvc3JjJztcclxuaW1wb3J0IHR5cGUgeyBJVlJNTWF0ZXJpYWxQcm9wZXJ0eSwgSVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHkgfSBmcm9tICcuL3ZybS1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSVZSTU1hdGVyaWFsUHJvcGVydHlTaGFkZXIgfSBmcm9tICcuL3ZybS1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL0VuZ2luZXMvZW5naW5lJztcclxuXHJcbi8qKlxyXG4gKiBWUk0g44Gn5oyH5a6a44GV44KM44KLIE1hdGVyaWFsIOOCkueUn+aIkOOBmeOCi1xyXG4gKiBbVlJNIOOBjOaPkOS+m+OBmeOCi+OCt+OCp+ODvOODgF0oaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9zaGFkZXJzL2luZGV4Lmh0bWwpIOOCkueJueWumuOBl+iqreOBv+i+vOOCgFxyXG4gKiAtIFVubGl0VGV4dHVyZTog5LiN6YCP5piOLCBWUk0g44OV44Kh44Kk44Or5YG044GnIFtLSFJfbWF0ZXJpYWxzX3VubGl0XShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvdHJlZS9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc191bmxpdCkg44GM5a6a576p44GV44KM44Gm44GE44KL44Gf44KB44CB5L2V44KC44GX44Gq44GEXHJcbiAqIC0gVW5saXRDdXRvdXQ6IOmAj+aYjuW6puOBjOmWvuWApOS7peS4i+OBrumDqOWIhuOCkumAj+aYjuOBqOOBmeOCiywg5ZCM5LiKXHJcbiAqIC0gVW5saXRUcmFuc3BhcmVudDog44Ki44Or44OV44Kh44OW44Os44Oz44OJ44CCWldyaXRl44GX44Gq44GELCDlkIzkuIpcclxuICogLSBVbmxpdFRyYW5zcGFyZW50WldyaXRlOiDjgqLjg6vjg5XjgqHjg5bjg6zjg7Pjg4njgIJaV3JpdGXjgZnjgossIOWQjOS4iuOBq+WKoOOBiOOAgeODl+ODreODkeODhuOCo+OBpyBaV3JpdGUg44KS5by35Yi244GX44Gm44GE44G+44GZXHJcbiAqIC0gTVRvb246IE1Ub29uTWF0ZXJpYWwg44KS5beu44GX5pu/44GI44Gm44GE44G+44GZ44CCXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVlJNTWF0ZXJpYWxHZW5lcmF0b3Ige1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsb2FkZXI6IEdMVEZMb2FkZXIpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg57jg4bjg6rjgqLjg6vjgpLnlJ/miJDjgZnjgosgUHJvbWlzZSDjgpLov5TjgZlcclxuICAgICAqIFZSTSDlr77osaHlpJbjga7loLTlkIjjga8gbnVsbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGUoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBtZXNoOiBNZXNoLCBiYWJ5bG9uRHJhd01vZGU6IG51bWJlciwgYXNzaWduOiAoYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCkgPT4gdm9pZCk6IE51bGxhYmxlPFByb21pc2U8TWF0ZXJpYWw+PiB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxQcm9wID0gdGhpcy5maW5kTWF0ZXJpYWxQcm9wZXJ0eUJ5TmFtZShtYXRlcmlhbC5uYW1lLCB0aGlzLmdldE1hdGVyaWFsUHJvcGVydGllcygpKTtcclxuICAgICAgICBpZiAoIW1hdGVyaWFsUHJvcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzaC5hbHBoYUluZGV4ID0gbWF0ZXJpYWxQcm9wLnJlbmRlclF1ZXVlO1xyXG4gICAgICAgIGNvbnN0IG5ld01hdGVyaWFsID0gdGhpcy5jcmVhdGVNYXRlcmlhbEJ5U2hhZGVyKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uRHJhd01vZGUsIG1hdGVyaWFsUHJvcCk7XHJcbiAgICAgICAgaWYgKCFuZXdNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXNzaWduKG5ld01hdGVyaWFsKTtcclxuICAgICAgICBpZiAobmV3TWF0ZXJpYWwgaW5zdGFuY2VvZiBNVG9vbk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRNVG9vblRleHR1cmVzQXN5bmMoY29udGV4dCwgbmV3TWF0ZXJpYWwsIG1hdGVyaWFsUHJvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3TWF0ZXJpYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVlJNIOOBvuOBn+OBryBWQ0kg44GL44KJ44Oe44OG44Oq44Ki44Or44OX44Ot44OR44OG44Kj44Gu6YWN5YiX44KS5o6i44GZXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWF0ZXJpYWxQcm9wZXJ0aWVzKCk6IElWUk1NYXRlcmlhbFByb3BlcnR5W10ge1xyXG4gICAgICAgIGlmICghdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucy5WUk0gJiYgdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zLlZSTS5tYXRlcmlhbFByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyLmdsdGYuZXh0ZW5zaW9ucy5WUk0ubWF0ZXJpYWxQcm9wZXJ0aWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zLlZDQVNUX3ZjaV9tYXRlcmlhbF91bml0eSAmJiB0aGlzLmxvYWRlci5nbHRmLmV4dGVuc2lvbnMuVkNBU1RfdmNpX21hdGVyaWFsX3VuaXR5Lm1hdGVyaWFscykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkZXIuZ2x0Zi5leHRlbnNpb25zLlZDQVNUX3ZjaV9tYXRlcmlhbF91bml0eS5tYXRlcmlhbHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODnuODhuODquOCouODq+WQjeOBi+OCiSBNYXRlcmlhbFByb3BlcnR5IOOCkuaOouOBmVxyXG4gICAgICogQHBhcmFtIG1hdGVyaWFsTmFtZSDjg57jg4bjg6rjgqLjg6vlkI1cclxuICAgICAqIEBwYXJhbSBleHRlbnNpb24g5ouh5by144OH44O844K/XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE1hdGVyaWFsUHJvcGVydHlCeU5hbWUobWF0ZXJpYWxOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsIG1hdGVyaWFsczogSVZSTU1hdGVyaWFsUHJvcGVydHlbXSk6IE51bGxhYmxlPElWUk1NYXRlcmlhbFByb3BlcnR5PiB7XHJcbiAgICAgICAgaWYgKCFtYXRlcmlhbE5hbWUgfHwgIW1hdGVyaWFscykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbWF0cyA9IG1hdGVyaWFscy5maWx0ZXIoKHYpID0+IHYubmFtZSA9PT0gbWF0ZXJpYWxOYW1lKTtcclxuICAgICAgICBpZiAobWF0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLmxvZyhgRHVwbGljYXRlZCB2cm0gbWF0ZXJpYWwgbmFtZSBmb3VuZDogJHttYXRlcmlhbE5hbWV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXRzW21hdHMubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg4bjgq/jgrnjg4Hjg6PjgpLoqq3jgb/ovrzjgoBcclxuICAgICAqIEBwYXJhbSBjb250ZXh0IOePvuWcqOOBruOCs+ODs+ODhuOCreOCueODiFxyXG4gICAgICogQHBhcmFtIG1hdGVyaWFsIOeUn+aIkOOBl+OBnyBNVG9vbk1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gcHJvcCDnlJ/miJDjgZfjgZ8gTVRvb25NYXRlcmlhbCDjga7jg57jg4bjg6rjgqLjg6vjg5fjg63jg5Hjg4bjgqNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkTVRvb25UZXh0dXJlc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IE1Ub29uTWF0ZXJpYWwsIHByb3A6IElWUk1NYXRlcmlhbFByb3BlcnR5KTogUHJvbWlzZTxNYXRlcmlhbD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzOiBBcnJheTxQcm9taXNlPEJhc2VUZXh0dXJlPj4gPSBbXTtcclxuICAgICAgICAvLyDlhajjgabjga7jg4bjgq/jgrnjg4Hjg6Pjga4gVVYgT2Zmc2V0ICYgU2NhbGUg44Gv44Oh44Kk44Oz44OG44Kv44K544OB44Oj44Gu44KC44Gu44KS5rWB55So44GZ44KLXHJcbiAgICAgICAgY29uc3QgdXZPZmZzZXRTY2FsZSA9IHByb3AudmVjdG9yUHJvcGVydGllcy5fTWFpblRleDtcclxuICAgICAgICBpZiAoIXV2T2Zmc2V0U2NhbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtYXRlcmlhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFwcGx5VGV4dHVyZSA9IChpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkLCBjYWxsYmFjazogKHRleHR1cmU6IEJhc2VUZXh0dXJlKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KGluZGV4LCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIubG9hZFRleHR1cmVJbmZvQXN5bmMoYCR7Y29udGV4dH0vdGV4dHVyZXMvJHtpbmRleH1gLCB7IGluZGV4OiB2YWx1ZSB9LCAoYmFieWxvblRleHR1cmU6IEJhc2VUZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWun+mam+OBryBUZXh0dXJlIOOCpOODs+OCueOCv+ODs+OCueOBjOadpeOCi+OBruOBp+OCreODo+OCueODiFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gYmFieWxvblRleHR1cmUgYXMgVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC51T2Zmc2V0ID0gdXZPZmZzZXRTY2FsZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC52T2Zmc2V0ID0gdXZPZmZzZXRTY2FsZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC51U2NhbGUgPSB1dk9mZnNldFNjYWxlWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LnZTY2FsZSA9IHV2T2Zmc2V0U2NhbGVbM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGJhYnlsb25UZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX01haW5UZXgsICh0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbC5hbHBoYUJsZW5kIHx8IG1hdGVyaWFsLmFscGhhVGVzdCkge1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5oYXNBbHBoYSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9TaGFkZVRleHR1cmUsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwuc2hhZGVUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9CdW1wTWFwLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLmJ1bXBUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9SZWNlaXZlU2hhZG93VGV4dHVyZSwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5yZWNlaXZlU2hhZG93VGV4dHVyZSA9IHRleHR1cmUpKTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fU2hhZGluZ0dyYWRlVGV4dHVyZSwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5zaGFkaW5nR3JhZGVUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9SaW1UZXh0dXJlLCAodGV4dHVyZSkgPT4gKG1hdGVyaWFsLnJpbVRleHR1cmUgPSB0ZXh0dXJlKSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX1NwaGVyZUFkZCwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5tYXRDYXBUZXh0dXJlID0gdGV4dHVyZSkpO1xyXG4gICAgICAgIGFwcGx5VGV4dHVyZShwcm9wLnRleHR1cmVQcm9wZXJ0aWVzLl9FbWlzc2lvbk1hcCwgKHRleHR1cmUpID0+IChtYXRlcmlhbC5lbWlzc2l2ZVRleHR1cmUgPSB0ZXh0dXJlKSk7XHJcbiAgICAgICAgYXBwbHlUZXh0dXJlKHByb3AudGV4dHVyZVByb3BlcnRpZXMuX091dGxpbmVXaWR0aFRleHR1cmUsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwub3V0bGluZVdpZHRoVGV4dHVyZSA9IHRleHR1cmUpKTtcclxuICAgICAgICBhcHBseVRleHR1cmUocHJvcC50ZXh0dXJlUHJvcGVydGllcy5fVXZBbmltTWFza1RleHR1cmUsICh0ZXh0dXJlKSA9PiAobWF0ZXJpYWwudXZBbmltYXRpb25NYXNrVGV4dHVyZSA9IHRleHR1cmUpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IG1hdGVyaWFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOOCt+OCp+ODvOODgOWQjeOBi+OCieODnuODhuODquOCouODq+OCkuaOqOa4rOOBl+OBpueUn+aIkOOBmeOCi1xyXG4gICAgICogQHBhcmFtIGNvbnRleHQg54++5Zyo44Gu44Kz44Oz44OG44Kt44K544OIXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWwgZ2xURiDjg57jg4bjg6rjgqLjg6tcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uRHJhd01vZGUg5o+P55S756iu6aGeXHJcbiAgICAgKiBAcGFyYW0gcHJvcCDnlJ/miJDjgZnjgovjg57jg4bjg6rjgqLjg6vjg5fjg63jg5Hjg4bjgqNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVNYXRlcmlhbEJ5U2hhZGVyKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbkRyYXdNb2RlOiBudW1iZXIsIHByb3A6IElWUk1NYXRlcmlhbFByb3BlcnR5KTogTnVsbGFibGU8TWF0ZXJpYWw+IHtcclxuICAgICAgICBpZiAocHJvcC5zaGFkZXIgPT09IElWUk1NYXRlcmlhbFByb3BlcnR5U2hhZGVyLlZSTU1Ub29uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG10b29uTWF0ZXJpYWwgPSBuZXcgTVRvb25NYXRlcmlhbChtYXRlcmlhbC5uYW1lIHx8IGBNVG9vbk1hdGVyaWFsJHttYXRlcmlhbC5pbmRleH1gLCB0aGlzLmxvYWRlci5iYWJ5bG9uU2NlbmUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1Ub29uTWF0ZXJpYWxQcm9wZXJ0aWVzKG10b29uTWF0ZXJpYWwsIHByb3ApO1xyXG4gICAgICAgICAgICByZXR1cm4gbXRvb25NYXRlcmlhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByb3Auc2hhZGVyID09PSBJVlJNTWF0ZXJpYWxQcm9wZXJ0eVNoYWRlci5WUk1VbmxpdFRyYW5zcGFyZW50WldyaXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdCA9IHRoaXMubG9hZGVyLmNyZWF0ZU1hdGVyaWFsKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uRHJhd01vZGUpO1xyXG4gICAgICAgICAgICAvLyDpgJrluLjjg57jg4bjg6rjgqLjg6vjgasgRGVwdGggV3JpdGUg44KS5by35Yi2XHJcbiAgICAgICAgICAgIG1hdC5kaXNhYmxlRGVwdGhXcml0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBtYXQuZm9yY2VEZXB0aFdyaXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg57jg4bjg6rjgqLjg6vjgasgVlJNIOODl+ODreODkeODhuOCo+OCkuioreWumlxyXG4gICAgICogVlJNIOODl+ODreODkeODhuOCo+OBqOODnuODhuODquOCouODq+ODl+ODreODkeODhuOCo+OBruODnuODg+ODlOODs+OCsOOCkuihjOOBo+OBpuOBhOOCi1xyXG4gICAgICog5Yid5pyf5YCk44Gv44Oe44OG44Oq44Ki44Or5a6f6KOF5YG044Gr5oyB44Gj44Gm44GE44KL44Gf44KB44CB5YCk44GM44GC44KL5aC05ZCI44Gu44G/5LiK5pu444GN44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TVRvb25NYXRlcmlhbFByb3BlcnRpZXMobWF0ZXJpYWw6IE1Ub29uTWF0ZXJpYWwsIHByb3A6IElWUk1NYXRlcmlhbFByb3BlcnR5KSB7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX0N1dG9mZiwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuYWxwaGFDdXRPZmYgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eT4ocHJvcC52ZWN0b3JQcm9wZXJ0aWVzLl9Db2xvciwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyBDb2xvcjModmFsdWVbMF0sIHZhbHVlWzFdLCB2YWx1ZVsyXSk7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhID0gdmFsdWVbM107XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPElWUk1WZWN0b3JNYXRlcmlhbFByb3BlcnR5Pihwcm9wLnZlY3RvclByb3BlcnRpZXMuX1NoYWRlQ29sb3IsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5zaGFkZUNvbG9yID0gbmV3IENvbG9yMyh2YWx1ZVswXSwgdmFsdWVbMV0sIHZhbHVlWzJdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fQnVtcFNjYWxlLCAodmFsdWUpID0+IChtYXRlcmlhbC5idW1wU2NhbGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9SZWNlaXZlU2hhZG93UmF0ZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwucmVjZWl2ZVNoYWRvd1JhdGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9TaGFkaW5nR3JhZGVSYXRlLCAodmFsdWUpID0+IChtYXRlcmlhbC5zaGFkaW5nR3JhZGVSYXRlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fU2hhZGVTaGlmdCwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuc2hhZGVTaGlmdCA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX1NoYWRlVG9vbnksICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnNoYWRlVG9vbnkgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9MaWdodENvbG9yQXR0ZW51YXRpb24sICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbiA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX0luZGlyZWN0TGlnaHRJbnRlbnNpdHksICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmluZGlyZWN0TGlnaHRJbnRlbnNpdHkgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxJVlJNVmVjdG9yTWF0ZXJpYWxQcm9wZXJ0eT4ocHJvcC52ZWN0b3JQcm9wZXJ0aWVzLl9SaW1Db2xvciwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLnJpbUNvbG9yID0gbmV3IENvbG9yMyh2YWx1ZVswXSwgdmFsdWVbMV0sIHZhbHVlWzJdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fUmltTGlnaHRpbmdNaXgsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLnJpbUxpZ2h0aW5nTWl4ID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fUmltRnJlc25lbFBvd2VyLCAodmFsdWUpID0+IChtYXRlcmlhbC5yaW1GcmVzbmVsUG93ZXIgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9SaW1MaWZ0LCAodmFsdWUpID0+IChtYXRlcmlhbC5yaW1MaWZ0ID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8SVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk+KHByb3AudmVjdG9yUHJvcGVydGllcy5fRW1pc3Npb25Db2xvciwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmVtaXNzaXZlQ29sb3IgPSBuZXcgQ29sb3IzKHZhbHVlWzBdLCB2YWx1ZVsxXSwgdmFsdWVbMl0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9PdXRsaW5lV2lkdGgsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLm91dGxpbmVXaWR0aCA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX091dGxpbmVTY2FsZWRNYXhEaXN0YW5jZSwgKHZhbHVlKSA9PiAobWF0ZXJpYWwub3V0bGluZVNjYWxlZE1heERpc3RhbmNlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8SVZSTVZlY3Rvck1hdGVyaWFsUHJvcGVydHk+KHByb3AudmVjdG9yUHJvcGVydGllcy5fT3V0bGluZUNvbG9yLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwub3V0bGluZUNvbG9yID0gbmV3IENvbG9yMyh2YWx1ZVswXSwgdmFsdWVbMV0sIHZhbHVlWzJdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fT3V0bGluZUxpZ2h0aW5nTWl4LCAodmFsdWUpID0+IChtYXRlcmlhbC5vdXRsaW5lTGlnaHRpbmdNaXggPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9VdkFuaW1TY3JvbGxYLCAodmFsdWUpID0+IChtYXRlcmlhbC51dkFuaW1hdGlvblNjcm9sbFggPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9VdkFuaW1TY3JvbGxZLCAodmFsdWUpID0+IChtYXRlcmlhbC51dkFuaW1hdGlvblNjcm9sbFkgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9VdkFuaW1Sb3RhdGlvbiwgKHZhbHVlKSA9PiAobWF0ZXJpYWwudXZBbmltYXRpb25Sb3RhdGlvbiA9IHZhbHVlKSk7XHJcblxyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9EZWJ1Z01vZGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmRlYnVnTW9kZSA9IHZhbHVlKSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX0JsZW5kTW9kZSwgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogLy8gT3BhcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGFCbGVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhVGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOiAvLyBUcmFuc3BhcmVudEN1dG91dFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhQmxlbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYVRlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhTW9kZSA9IEVuZ2luZS5BTFBIQV9DT01CSU5FO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiAvLyBUcmFuc3BhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhQmxlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhVGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhTW9kZSA9IEVuZ2luZS5BTFBIQV9DT01CSU5FO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPG51bWJlcj4ocHJvcC5mbG9hdFByb3BlcnRpZXMuX091dGxpbmVXaWR0aE1vZGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLm91dGxpbmVXaWR0aE1vZGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxudW1iZXI+KHByb3AuZmxvYXRQcm9wZXJ0aWVzLl9PdXRsaW5lQ29sb3JNb2RlLCAodmFsdWUpID0+IChtYXRlcmlhbC5vdXRsaW5lQ29sb3JNb2RlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fQ3VsbE1vZGUsICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmN1bGxNb2RlID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fT3V0bGluZUN1bGxNb2RlLCAodmFsdWUpID0+IChtYXRlcmlhbC5vdXRsaW5lQ3VsbE1vZGUgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxib29sZWFuPihwcm9wLmtleXdvcmRNYXAuX0FMUEhBQkxFTkRfT04sICh2YWx1ZSkgPT4gKG1hdGVyaWFsLmFscGhhQmxlbmQgPSB2YWx1ZSkpO1xyXG4gICAgICAgIGFwcGx5UHJvcGVydHlXaGVuRGVmaW5lZDxib29sZWFuPihwcm9wLmtleXdvcmRNYXAuX0FMUEhBVEVTVF9PTiwgKHZhbHVlKSA9PiAobWF0ZXJpYWwuYWxwaGFUZXN0ID0gdmFsdWUpKTtcclxuICAgICAgICBhcHBseVByb3BlcnR5V2hlbkRlZmluZWQ8bnVtYmVyPihwcm9wLmZsb2F0UHJvcGVydGllcy5fWldyaXRlLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZm9yY2VEZXB0aFdyaXRlID0gTWF0aC5yb3VuZCh2YWx1ZSkgPT09IDE7XHJcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbC5mb3JjZURlcHRoV3JpdGUpIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmRpc2FibGVEZXB0aFdyaXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOODl+ODreODkeODhuOCo+OBjOioreWumuOBleOCjOOBpuOBhOOCjOOBsOOCs+ODvOODq+ODkOODg+OCr+OCkuWun+ihjOOBmeOCi1xyXG4gKi9cclxuZnVuY3Rpb24gYXBwbHlQcm9wZXJ0eVdoZW5EZWZpbmVkPFQ+KHByb3A6IFQgfCB1bmRlZmluZWQsIGNhbGxiYWNrOiAodmFsdWU6IFQpID0+IHZvaWQpIHtcclxuICAgIGlmICh0eXBlb2YgcHJvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjYWxsYmFjayhwcm9wKTtcclxufVxyXG4iLCJpbXBvcnQgeyBBcmNSb3RhdGVDYW1lcmEgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0NhbWVyYXMvYXJjUm90YXRlQ2FtZXJhXCI7XG5pbXBvcnQgeyBDb2xvcjMsIFZlY3RvcjMgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGhcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvRW5naW5lcy9lbmdpbmVcIjtcbmltcG9ydCB7IERpcmVjdGlvbmFsTGlnaHQgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xpZ2h0cy9kaXJlY3Rpb25hbExpZ2h0XCI7XG5pbXBvcnQgeyBIZW1pc3BoZXJpY0xpZ2h0IH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9MaWdodHMvaGVtaXNwaGVyaWNMaWdodFwiO1xuaW1wb3J0IHsgUG9pbnRMaWdodCB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTGlnaHRzL3BvaW50TGlnaHRcIjtcbmltcG9ydCB7IFNoYWRvd0dlbmVyYXRvciB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTGlnaHRzL1NoYWRvd3Mvc2hhZG93R2VuZXJhdG9yXCI7XG5pbXBvcnQgeyBTY2VuZUxvYWRlciB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xuaW1wb3J0IHsgTWVzaCB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTWVzaGVzL21lc2hcIjtcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9zY2VuZVwiO1xuaW1wb3J0IHR5cGUgeyBWUk1NYW5hZ2VyIH0gZnJvbSBcIi4uL3NyYy9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL3ZybS1tYW5hZ2VyXCI7XG5cbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiQGJhYnlsb25qcy9sb2FkZXJzL2dsVEYvMi4wXCI7XG5cbi8vIGltcG9ydCBcIkBiYWJ5bG9uanMvY29yZS9IZWxwZXJzL3NjZW5lSGVscGVyc1wiO1xuLy8gaW1wb3J0IFwiQGJhYnlsb25qcy9jb3JlL01lc2hlcy9CdWlsZGVycy9zcGhlcmVCdWlsZGVyXCI7XG4vLyBpbXBvcnQgXCJAYmFieWxvbmpzL2NvcmUvTWVzaGVzL0J1aWxkZXJzL3RvcnVzS25vdEJ1aWxkZXJcIjtcbi8vIGltcG9ydCBcIkBiYWJ5bG9uanMvaW5zcGVjdG9yXCI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXNcbmltcG9ydCAqIGFzIEJWTCBmcm9tIFwiLi9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjL2luZGV4XCI7XG5cbmltcG9ydCB7IFYzRENvcmUgfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHtcbiAgVlJNRmlsZUxvYWRlcixcbiAgVlJNTG9hZGVyRXh0ZW5zaW9uLFxufSBmcm9tIFwiLi9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjXCI7XG5cbi8vIHdpbmRvdy5vbmxvYWQgPSBhc3luYyAoZSkgPT4ge1xuYXN5bmMgZnVuY3Rpb24gbWFpbjIoKSB7XG4gIC8vKiBEZWZpbmUgdnJtIGZpbGUgcGF0aC5cbiAgY29uc3QgdnJtRmlsZSA9IFwiLi90ZXN0ZmlsZXMvZGVmYXVsdC52cm1cIjtcblxuICAvLyogQ3JlYXRlIGFuIEVuZ2luZSBpbnN0YW5jZS5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgY29uc3QgZGVidWdQcm9wZXJ0aWVzID0gZ2V0RGVidWdQcm9wZXJ0aWVzKCk7XG4gIGNvbnNvbGUubG9nKFwiZGVidWdQcm9wZXJ0aWVzLndlYmdsMTogXCIsIGRlYnVnUHJvcGVydGllcy53ZWJnbDEpO1xuICBjb25zdCBlbmdpbmUgPSBuZXcgRW5naW5lKGNhbnZhcywgdHJ1ZSwge1xuICAgIGFscGhhOiBmYWxzZSxcbiAgICBkaXNhYmxlV2ViR0wyU3VwcG9ydDogZGVidWdQcm9wZXJ0aWVzLndlYmdsMSxcbiAgfSk7XG4gIGNvbnN0IHNjZW5lID0gbmV3IFNjZW5lKGVuZ2luZSk7XG4gIGNvbnN0IGNhbWVyYSA9IG5ldyBBcmNSb3RhdGVDYW1lcmEoXG4gICAgXCJNYWluQ2FtZXJhMVwiLFxuICAgIDAsXG4gICAgMCxcbiAgICAzLFxuICAgIG5ldyBWZWN0b3IzKDAsIDEuMiwgMCksXG4gICAgc2NlbmUsXG4gICAgdHJ1ZVxuICApO1xuICBjYW1lcmEubG93ZXJSYWRpdXNMaW1pdCA9IDAuMTtcbiAgY2FtZXJhLnVwcGVyUmFkaXVzTGltaXQgPSAyMDtcbiAgY2FtZXJhLndoZWVsRGVsdGFQZXJjZW50YWdlID0gMC4wMTtcbiAgY2FtZXJhLm1pblogPSAwLjM7XG4gIGNhbWVyYS5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDEuMiwgLTMpO1xuICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xuXG4gIC8vKiBDcmVhdGUgYSBWM0RDb3JlIGluc3RhbmNlLlxuICBjb25zdCB2M0RDb3JlID0gbmV3IFYzRENvcmUoZW5naW5lLCBzY2VuZSwgY2FtZXJhKTtcbiAgdjNEQ29yZS50cmFuc3BhcmVudEJhY2tncm91bmQoKTtcbiAgYXdhaXQgdjNEQ29yZS5BcHBlbmRBc3luYyhcIlwiLCB2cm1GaWxlKTtcblxuICAvLyBHZXQgbWFuYWdlcnNcbiAgLy8gY29uc3QgdnJtTWFuYWdlciA9IHYzRENvcmUuZ2V0VlJNTWFuYWdlckJ5VVJJKHZybUZpbGUpO1xuICAvLyBjb25zb2xlLmxvZyhcInZybU1hbmFnZXI6IFwiLCB2cm1NYW5hZ2VyKTtcblxuICAvLyBDYW1lcmFcbiAgLy8gdjNEQ29yZS5hdHRhY2hDYW1lcmFUbyh2cm1NYW5hZ2VyKTtcblxuICAvLyBMaWdodHNcbiAgdjNEQ29yZS5hZGRBbWJpZW50TGlnaHQobmV3IENvbG9yMygxLCAxLCAxKSk7XG5cbiAgLy8gTG9jayBjYW1lcmEgdGFyZ2V0XG4gIC8vIHYzRENvcmUuc2NlbmUub25CZWZvcmVSZW5kZXJPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XG4gIC8vICAgdnJtTWFuYWdlci5jYW1lcmFzWzBdLnNldFRhcmdldCh2cm1NYW5hZ2VyLnJvb3RNZXNoLmdldEFic29sdXRlUG9zaXRpb24oKSk7XG4gIC8vIH0pO1xuXG4gIGVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHtcbiAgICB2M0RDb3JlLnNjZW5lLnJlbmRlcigpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbjEoKSB7XG4gIGlmIChTY2VuZUxvYWRlcikge1xuICAgIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKG5ldyBCVkwuVlJNRmlsZUxvYWRlcigpKTtcbiAgfVxuICAvLyBHTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKFwiVlJNXCIsIChsb2FkZXIpID0+IHtcbiAgLy8gICBjb25zb2xlLmxvZyhcImxvYWRlcjogXCIsIGxvYWRlcik7XG4gIC8vICAgY29uc29sZS5sb2coXCJsb2FkZXIuYmFieWxvblNjZW5lOiBcIiwgbG9hZGVyLmJhYnlsb25TY2VuZSk7XG4gIC8vICAgcmV0dXJuIG5ldyBWUk0obG9hZGVyKTtcbiAgLy8gfSk7XG5cbiAgY29uc3QgZGVidWdQcm9wZXJ0aWVzID0gZ2V0RGVidWdQcm9wZXJ0aWVzKCk7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGNvbnN0IGVuZ2luZSA9IG5ldyBFbmdpbmUoY2FudmFzLCB0cnVlLCB7XG4gICAgYWxwaGE6IGZhbHNlLFxuICAgIGRpc2FibGVXZWJHTDJTdXBwb3J0OiBkZWJ1Z1Byb3BlcnRpZXMud2ViZ2wxLFxuICB9KTtcbiAgY29uc3Qgc2NlbmUgPSBuZXcgU2NlbmUoZW5naW5lKTtcbiAgY29uc3QgY2FtZXJhID0gbmV3IEFyY1JvdGF0ZUNhbWVyYShcbiAgICBcIk1haW5DYW1lcmExXCIsXG4gICAgMCxcbiAgICAwLFxuICAgIDMsXG4gICAgbmV3IFZlY3RvcjMoMCwgMS4yLCAwKSxcbiAgICBzY2VuZSxcbiAgICB0cnVlXG4gICk7XG4gIGNhbWVyYS5sb3dlclJhZGl1c0xpbWl0ID0gMC4xO1xuICBjYW1lcmEudXBwZXJSYWRpdXNMaW1pdCA9IDIwO1xuICBjYW1lcmEud2hlZWxEZWx0YVBlcmNlbnRhZ2UgPSAwLjAxO1xuICBjYW1lcmEubWluWiA9IDAuMztcbiAgY2FtZXJhLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMS4yLCAtMyk7XG4gIGNhbWVyYS5hdHRhY2hDb250cm9sKGNhbnZhcywgdHJ1ZSk7XG4gIGNvbnNvbGUubG9nKFwiY2FtZXJhOiBcIiwgY2FtZXJhKTtcblxuICBjb25zdCBkaXJlY3Rpb25hbExpZ2h0ID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoXG4gICAgXCJEaXJlY3Rpb25hbExpZ2h0MVwiLFxuICAgIG5ldyBWZWN0b3IzKDAsIC0wLjUsIDEuMCksXG4gICAgc2NlbmVcbiAgKTtcbiAgZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDI1LCAtNTApO1xuICBkaXJlY3Rpb25hbExpZ2h0LnNldEVuYWJsZWQodHJ1ZSk7XG5cbiAgKHdpbmRvdyBhcyBhbnkpLmN1cnJlbnRTY2VuZSA9IHNjZW5lO1xuICBlbmdpbmUucnVuUmVuZGVyTG9vcCgoKSA9PiB7XG4gICAgc2NlbmUucmVuZGVyKCk7XG4gIH0pO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFNjZW5lTG9hZGVyLkFwcGVuZEFzeW5jKFxuICAgIFwiXCIsXG4gICAgXCIuL3Rlc3RmaWxlcy9kZWZhdWx0LnZybVwiLFxuICAgIHNjZW5lXG4gICk7XG4gIC8vIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgU2NlbmVMb2FkZXIuTG9hZEFzeW5jKFxuICAvLyAgIFwiZmlsZTpcIixcbiAgLy8gICBcIi4vdGVzdGZpbGVzL2RlZmF1bHQudnJtXCIsXG4gIC8vICAgZW5naW5lXG4gIC8vICk7XG4gIGNvbnNvbGUubG9nKFwicmVzcG9uc2U6IFwiLCByZXNwb25zZSk7XG4gIGNvbnNvbGUubG9nKFwicmVzcG9uc2UubWV0YWRhdGE6IFwiLCByZXNwb25zZS5tZXRhZGF0YSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIGlmIChTY2VuZUxvYWRlcikge1xuICAgIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKG5ldyBCVkwuVlJNRmlsZUxvYWRlcigpKTtcbiAgfVxuICAvLyBHTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKFwiVlJNXCIsIChsb2FkZXIpID0+IHtcbiAgLy8gICBjb25zb2xlLmxvZyhcImxvYWRlcjogXCIsIGxvYWRlcik7XG4gIC8vICAgcmV0dXJuIG5ldyBCVkwuVlJNTG9hZGVyRXh0ZW5zaW9uKGxvYWRlcik7XG4gIC8vIH0pO1xuXG4gIGNvbnN0IGRlYnVnUHJvcGVydGllcyA9IGdldERlYnVnUHJvcGVydGllcygpO1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBjb25zb2xlLmxvZyhcImRlYnVnUHJvcGVydGllcy53ZWJnbDE6IFwiLCBkZWJ1Z1Byb3BlcnRpZXMud2ViZ2wxKTtcbiAgY29uc3QgZW5naW5lID0gbmV3IEVuZ2luZShjYW52YXMsIHRydWUsIHtcbiAgICBhbHBoYTogZmFsc2UsXG4gICAgZGlzYWJsZVdlYkdMMlN1cHBvcnQ6IGRlYnVnUHJvcGVydGllcy53ZWJnbDEsXG4gIH0pO1xuICBjb25zb2xlLmxvZyhcImVuZ2luZTogXCIsIGVuZ2luZSk7XG4gIGNvbnN0IHNjZW5lID0gbmV3IFNjZW5lKGVuZ2luZSk7XG4gIGNvbnNvbGUubG9nKFwic2NlbmU6IFwiLCBzY2VuZSk7XG4gIGNvbnN0IGNhbWVyYSA9IG5ldyBBcmNSb3RhdGVDYW1lcmEoXG4gICAgXCJNYWluQ2FtZXJhMVwiLFxuICAgIDAsXG4gICAgMCxcbiAgICAzLFxuICAgIG5ldyBWZWN0b3IzKDAsIDEuMiwgMCksXG4gICAgc2NlbmUsXG4gICAgdHJ1ZVxuICApO1xuICBjYW1lcmEubG93ZXJSYWRpdXNMaW1pdCA9IDAuMTtcbiAgY2FtZXJhLnVwcGVyUmFkaXVzTGltaXQgPSAyMDtcbiAgY2FtZXJhLndoZWVsRGVsdGFQZXJjZW50YWdlID0gMC4wMTtcbiAgY2FtZXJhLm1pblogPSAwLjM7XG4gIGNhbWVyYS5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDEuMiwgLTMpO1xuICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xuICBjb25zb2xlLmxvZyhcImNhbWVyYTogXCIsIGNhbWVyYSk7XG5cbiAgc2NlbmUuY3JlYXRlRGVmYXVsdEVudmlyb25tZW50KHtcbiAgICBjcmVhdGVHcm91bmQ6IHRydWUsXG4gICAgY3JlYXRlU2t5Ym94OiBmYWxzZSxcbiAgICBlbmFibGVHcm91bmRNaXJyb3I6IGZhbHNlLFxuICAgIGVuYWJsZUdyb3VuZFNoYWRvdzogZmFsc2UsXG4gIH0pO1xuXG4gIC8vIExpZ2h0c1xuICBjb25zdCBkaXJlY3Rpb25hbExpZ2h0ID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoXG4gICAgXCJEaXJlY3Rpb25hbExpZ2h0MVwiLFxuICAgIG5ldyBWZWN0b3IzKDAsIC0wLjUsIDEuMCksXG4gICAgc2NlbmVcbiAgKTtcbiAgZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDI1LCAtNTApO1xuICBkaXJlY3Rpb25hbExpZ2h0LnNldEVuYWJsZWQodHJ1ZSk7XG4gIGNvbnN0IGhlbWlzcGhlcmljTGlnaHQgPSBuZXcgSGVtaXNwaGVyaWNMaWdodChcbiAgICBcIkhlbWlzcGhlcmljTGlnaHQxXCIsXG4gICAgbmV3IFZlY3RvcjMoLTAuMiwgLTAuOCwgLTEpLFxuICAgIHNjZW5lXG4gICk7XG4gIGhlbWlzcGhlcmljTGlnaHQuc2V0RW5hYmxlZChmYWxzZSk7XG4gIGNvbnN0IHBvaW50TGlnaHQgPSBuZXcgUG9pbnRMaWdodChcIlBvaW50TGlnaHQxXCIsIG5ldyBWZWN0b3IzKDAsIDAsIDEpLCBzY2VuZSk7XG4gIHBvaW50TGlnaHQuc2V0RW5hYmxlZChmYWxzZSk7XG5cbiAgLy8gTWVzaGVzXG4gIGNvbnN0IHN0YW5kYXJkTWF0ZXJpYWxTcGhlcmUgPSBNZXNoLkNyZWF0ZVNwaGVyZShcbiAgICBcIlN0YW5kYXJkTWF0ZXJpYWxTcGhlcmUxXCIsXG4gICAgMTYsXG4gICAgMSxcbiAgICBzY2VuZVxuICApO1xuICBzdGFuZGFyZE1hdGVyaWFsU3BoZXJlLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMS41LCAxLjIsIDApO1xuICBzdGFuZGFyZE1hdGVyaWFsU3BoZXJlLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcblxuICBjb25zdCBzaGFkb3dDYXN0ZXIgPSBNZXNoLkNyZWF0ZVRvcnVzS25vdChcbiAgICBcIlNoYWRvd0Nhc3RlclwiLFxuICAgIDEsXG4gICAgMC4yLFxuICAgIDMyLFxuICAgIDMyLFxuICAgIDIsXG4gICAgMyxcbiAgICBzY2VuZVxuICApO1xuICBzaGFkb3dDYXN0ZXIucG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLjAsIDUuMCwgLTEwLjApO1xuICBzaGFkb3dDYXN0ZXIuc2V0RW5hYmxlZChkZWJ1Z1Byb3BlcnRpZXMuc2hhZG93KTtcbiAgaWYgKGRlYnVnUHJvcGVydGllcy5zaGFkb3cpIHtcbiAgICBjb25zdCBzaGFkb3dHZW5lcmF0b3IgPSBuZXcgU2hhZG93R2VuZXJhdG9yKDEwMjQsIGRpcmVjdGlvbmFsTGlnaHQpO1xuICAgIHNoYWRvd0dlbmVyYXRvci5hZGRTaGFkb3dDYXN0ZXIoc2hhZG93Q2FzdGVyKTtcbiAgfVxuXG4gIGlmIChkZWJ1Z1Byb3BlcnRpZXMuaW5zcGVjdG9yKSB7XG4gICAgYXdhaXQgc2NlbmUuZGVidWdMYXllci5zaG93KHtcbiAgICAgIGdsb2JhbFJvb3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid3JhcHBlclwiKSBhcyBIVE1MRWxlbWVudCxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEV4cG9zZSBjdXJyZW50IHNjZW5lXG4gICh3aW5kb3cgYXMgYW55KS5jdXJyZW50U2NlbmUgPSBzY2VuZTtcblxuICBzY2VuZS5vbkJlZm9yZVJlbmRlck9ic2VydmFibGUuYWRkKCgpID0+IHtcbiAgICAvLyBTcHJpbmdCb25lXG4gICAgaWYgKCFzY2VuZS5tZXRhZGF0YSB8fCAhc2NlbmUubWV0YWRhdGEudnJtTWFuYWdlcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbWFuYWdlcnMgPSBzY2VuZS5tZXRhZGF0YS52cm1NYW5hZ2VycyBhcyBWUk1NYW5hZ2VyW107XG4gICAgY29uc3QgZGVsdGFUaW1lID0gc2NlbmUuZ2V0RW5naW5lKCkuZ2V0RGVsdGFUaW1lKCk7XG4gICAgbWFuYWdlcnMuZm9yRWFjaCgobWFuYWdlcikgPT4ge1xuICAgICAgbWFuYWdlci51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICB9KTtcbiAgfSk7XG4gIGVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHtcbiAgICBzY2VuZS5yZW5kZXIoKTtcbiAgICBzaGFkb3dDYXN0ZXIucm90YXRlKFZlY3RvcjMuVXAoKSwgMC4wMSk7XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgZW5naW5lLnJlc2l6ZSgpO1xuICB9KTtcbiAgY29uc29sZS5sb2coXCJ0cnkgdG8gY2FsbCBTY2VuZUxvYWRlci5BcHBlbmRBc3luYygpXCIpO1xuICBjb25zb2xlLmxvZyhcIlNjZW5lTG9hZGVyOiBcIiwgU2NlbmVMb2FkZXIpO1xuICAvLyBhd2FpdCBTY2VuZUxvYWRlci5BcHBlbmRBc3luYyhcIi4vXCIsIFwiQWxpY2lhU29saWQudnJtXCIsIHNjZW5lKTtcbiAgLy8gYXdhaXQgU2NlbmVMb2FkZXIuQXBwZW5kQXN5bmMoXCIuL1wiLCBcIjc4MjI0NDQzMzY0OTcwMDQ1MjYudnJtXCIsIHNjZW5lKTtcbiAgYXdhaXQgU2NlbmVMb2FkZXIuQXBwZW5kQXN5bmMoXCIuL1wiLCBcImRlZmF1bHQudnJtXCIsIHNjZW5lKTtcblxuICBjb25zb2xlLmxvZyhcInRyeSB0byBjYWxsIGFkZEV2ZW50TGlzdGVuZXIoKVwiKTtcbiAgbGV0IGZpbGVDb3VudCA9IDE7XG4gIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGUtaW5wdXRcIikgYXMgSFRNTElucHV0RWxlbWVudCkuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNoYW5nZVwiLFxuICAgIChldnQpID0+IHtcbiAgICAgIGNvbnN0IGZpbGUgPSAoZXZ0IGFzIGFueSkudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgY29uc29sZS5sb2coYGxvYWRzICR7ZmlsZS5uYW1lfSAke2ZpbGUuc2l6ZX0gYnl0ZXNgKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNoQ291bnQgPSBzY2VuZS5tZXNoZXMubGVuZ3RoO1xuICAgICAgU2NlbmVMb2FkZXIuQXBwZW5kKFwiZmlsZTpcIiwgZmlsZSwgc2NlbmUsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYGxvYWRlZCAke2ZpbGUubmFtZX1gKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGN1cnJlbnRNZXNoQ291bnQ7IGkgPCBzY2VuZS5tZXNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBzY2VuZS5tZXNoZXNbaV0udHJhbnNsYXRlKFZlY3RvcjMuUmlnaHQoKSwgMS41ICogZmlsZUNvdW50KTtcbiAgICAgICAgICBzY2VuZS5tZXNoZXNbaV0ucmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGZpbGVDb3VudCsrO1xuICAgICAgfSk7XG4gICAgfVxuICApO1xufVxuXG5pbnRlcmZhY2UgRGVidWdQcm9wZXJ0aWVzIHtcbiAgd2ViZ2wxOiBib29sZWFuO1xuICBzaGFkb3c6IGJvb2xlYW47XG4gIGluc3BlY3RvcjogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZ2V0RGVidWdQcm9wZXJ0aWVzKCk6IERlYnVnUHJvcGVydGllcyB7XG4gIGNvbnN0IGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICByZXR1cm4ge1xuICAgIHdlYmdsMTogaHJlZi5pbmNsdWRlcyhcIndlYmdsMVwiKSxcbiAgICBzaGFkb3c6IGhyZWYuaW5jbHVkZXMoXCJzaGFkb3dcIiksXG4gICAgaW5zcGVjdG9yOiBocmVmLmluY2x1ZGVzKFwiaW5zcGVjdG9yXCIpLFxuICB9O1xufVxuXG5tYWluMigpLmNhdGNoKChyZWFzb24pID0+IHtcbiAgY29uc29sZS5lcnJvcihyZWFzb24pO1xufSk7XG4iLCIvKiogQ29weXJpZ2h0IChjKSAyMDIxIFRoZSB2M2QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMgZmlsZSxcbiAqIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKi9cblxuZXhwb3J0ICogZnJvbSBcIi4vdjNkLWNvcmVcIlxuZXhwb3J0ICogZnJvbSBcIi4vaGVscGVyXCJcbiIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5pbXBvcnQge0hhcmR3YXJlU2NhbGluZ09wdGltaXphdGlvbixcbiAgICBMZW5zRmxhcmVzT3B0aW1pemF0aW9uLFxuICAgIE51bGxhYmxlLFxuICAgIFBhcnRpY2xlc09wdGltaXphdGlvbixcbiAgICBQb3N0UHJvY2Vzc2VzT3B0aW1pemF0aW9uLFxuICAgIFJlbmRlclRhcmdldHNPcHRpbWl6YXRpb24sIFNjZW5lLCBTY2VuZU9wdGltaXplciwgU2NlbmVPcHRpbWl6ZXJPcHRpb25zLCBUZXh0dXJlT3B0aW1pemF0aW9uIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZVwiO1xuaW1wb3J0IHtWM0RDb3JlfSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIFYzRFNjZW5lT3B0aW1pemVyIHtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbWl6ZWQgc2NlbmUgb3B0aW1pemVyIG9wdGlvbnMuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9vcHRpb25zOiBTY2VuZU9wdGltaXplck9wdGlvbnM7XG4gICAgZ2V0IG9wdGlvbnMoKTogU2NlbmVPcHRpbWl6ZXJPcHRpb25ze1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9XG4gICAgc2V0IG9wdGlvbnModmFsdWU6IFNjZW5lT3B0aW1pemVyT3B0aW9ucykge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2NlbmVPcHRpbWl6ZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX29wdGltaXplcjogU2NlbmVPcHRpbWl6ZXI7XG4gICAgZ2V0IG9wdGltaXplcigpOiBTY2VuZU9wdGltaXplciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpbWl6ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHNjZW5lOiBTY2VuZSxcbiAgICAgICAgb3B0aW9ucz86IE51bGxhYmxlPFNjZW5lT3B0aW1pemVyT3B0aW9ucz4sXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IFYzRFNjZW5lT3B0aW1pemVyLkN1c3RvbU9wdGltaXplck9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5fb3B0aW1pemVyID0gbmV3IFNjZW5lT3B0aW1pemVyKHNjZW5lLCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgdGhpcy5fb3B0aW1pemVyLnRhcmdldEZyYW1lUmF0ZSA9IFYzRENvcmUuRlJBTUVSQVRFO1xuICAgICAgICB0aGlzLl9vcHRpbWl6ZXIudHJhY2tlckR1cmF0aW9uID0gMjAwMDtcblxuICAgICAgICB0aGlzLl9vcHRpbWl6ZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5zZXR1cEZvY3VzRXZlbnRzKHRoaXMuX29wdGltaXplcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgQ3VzdG9tT3B0aW1pemVyT3B0aW9ucygpOiBTY2VuZU9wdGltaXplck9wdGlvbnMge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gbmV3IFNjZW5lT3B0aW1pemVyT3B0aW9ucygpO1xuICAgICAgICBvcHRpb25zLmFkZE9wdGltaXphdGlvbihuZXcgTGVuc0ZsYXJlc09wdGltaXphdGlvbigwKSk7XG4gICAgICAgIG9wdGlvbnMuYWRkT3B0aW1pemF0aW9uKG5ldyBQYXJ0aWNsZXNPcHRpbWl6YXRpb24oMSkpO1xuICAgICAgICBvcHRpb25zLmFkZE9wdGltaXphdGlvbihuZXcgVGV4dHVyZU9wdGltaXphdGlvbigxLCA1MTIpKTtcbiAgICAgICAgb3B0aW9ucy5hZGRPcHRpbWl6YXRpb24obmV3IFJlbmRlclRhcmdldHNPcHRpbWl6YXRpb24oMikpO1xuICAgICAgICBvcHRpb25zLmFkZE9wdGltaXphdGlvbihuZXcgUG9zdFByb2Nlc3Nlc09wdGltaXphdGlvbigzKSk7XG4gICAgICAgIG9wdGlvbnMuYWRkT3B0aW1pemF0aW9uKG5ldyBIYXJkd2FyZVNjYWxpbmdPcHRpbWl6YXRpb24oNCwgMikpO1xuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBGb2N1c0V2ZW50cyhvcHRpbWl6ZXI6IFNjZW5lT3B0aW1pemVyKSB7XG4gICAgICAgIGlmICh3aW5kb3cpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0dXBGb2N1c0V2ZW50c1wiKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJyxmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wdGltaXplciBzdGFydFwiKTtcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZXIuc3RhcnQoKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JyxmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wdGltaXplciBzdG9wXCIpO1xuICAgICAgICAgICAgICAgIG9wdGltaXplci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgb3B0aW1pemVyLnJlc2V0KCk7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5pbXBvcnQge01hdGVyaWFsLCBCYWNrZ3JvdW5kTWF0ZXJpYWwsIEJhc2VUZXh0dXJlLCBDb2xvcjMsIEN1YmVUZXh0dXJlLCBNZXNoLCBTY2VuZSwgVGV4dHVyZX0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZVwiO1xuaW1wb3J0IHtTa3lNYXRlcmlhbH0gZnJvbSBcIkBiYWJ5bG9uanMvbWF0ZXJpYWxzXCI7XG5cblxuZXhwb3J0IGNsYXNzIHYzRFNreUJveCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfZW52aXJvbm1lbnRUZXh0dXJlQ0ROVXJsID0gXCJodHRwczovL2Fzc2V0cy5iYWJ5bG9uanMuY29tL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudFNwZWN1bGFyLmVudlwiO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2t5Ym94OiBNZXNoO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NreWJveEJhc2U6IE1lc2g7XG4gICAgZ2V0IHNreWJveCgpOiBNZXNoIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NreWJveDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2t5Ym94TWF0ZXJpYWw6IEJhY2tncm91bmRNYXRlcmlhbDtcbiAgICBwdWJsaWMgc2t5Ym94QmFzZU1hdGVyaWFsOiBTa3lNYXRlcmlhbDtcbiAgICBwdWJsaWMgc2t5Ym94UmVmbGVjdGlvblRleHR1cmU6IEN1YmVUZXh0dXJlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHNjZW5lOiBTY2VuZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB0ZXh0dXJlTmFtZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm94U2l6ZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZW52VGV4dHVyZT86IEJhc2VUZXh0dXJlLFxuICAgICkge1xuICAgICAgICB0aGlzLl9za3lib3ggPSBNZXNoLkNyZWF0ZUJveChcIlNreWJveFwiLCBib3hTaXplLCB0aGlzLnNjZW5lLCB1bmRlZmluZWQsIE1lc2guQkFDS1NJREUpO1xuICAgICAgICB0aGlzLl9za3lib3hCYXNlID0gTWVzaC5DcmVhdGVCb3goXCJTa3lib3hCYXNlXCIsIGJveFNpemUrMSwgdGhpcy5zY2VuZSwgdW5kZWZpbmVkLCBNZXNoLkJBQ0tTSURFKTtcbiAgICAgICAgdGhpcy5jcmVhdGVNYXRlcmlhbCh0ZXh0dXJlTmFtZSk7XG4gICAgICAgIHRoaXMuX3NreWJveC5tYXRlcmlhbCA9IHRoaXMuc2t5Ym94TWF0ZXJpYWw7XG4gICAgICAgIHRoaXMuX3NreWJveEJhc2UubWF0ZXJpYWwgPSB0aGlzLnNreWJveEJhc2VNYXRlcmlhbDtcbiAgICAgICAgdGhpcy5fc2t5Ym94LnJlbmRlcmluZ0dyb3VwSWQgPSAwO1xuICAgICAgICB0aGlzLl9za3lib3hCYXNlLnJlbmRlcmluZ0dyb3VwSWQgPSAwO1xuICAgICAgICB0aGlzLl9za3lib3gubWF0ZXJpYWwudHJhbnNwYXJlbmN5TW9kZSA9IE1hdGVyaWFsLk1BVEVSSUFMX0FMUEhBVEVTVEFOREJMRU5EO1xuICAgICAgICB0aGlzLl9za3lib3gubWF0ZXJpYWwuYWxwaGEgPSAwLjU7XG4gICAgICAgIHRoaXMuc2V0dXBJbWFnZVByb2Nlc3NpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgc2t5Ym94IG1hdGVyaWFsIGFuZCB0aGUgc2t5Ym94IHJlZmxlY3Rpb24gdGV4dHVyZVxuICAgICAqIEBwYXJhbSB0ZXh0dXJlTmFtZSBuYW1lIChVUkkpIHRvIHRoZSB0ZXh0dXJlIGZpbGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZU1hdGVyaWFsKHRleHR1cmVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5za3lib3hCYXNlTWF0ZXJpYWwgPSBuZXcgU2t5TWF0ZXJpYWwoXCJTa3lib3hCYXNlTWF0ZXJpYWxcIiwgdGhpcy5zY2VuZSk7XG4gICAgICAgIHRoaXMuc2t5Ym94TWF0ZXJpYWwgPSBuZXcgQmFja2dyb3VuZE1hdGVyaWFsKFwiU2t5Ym94TWF0ZXJpYWxcIiwgdGhpcy5zY2VuZSk7XG4gICAgICAgIHRoaXMuc2t5Ym94TWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2t5Ym94TWF0ZXJpYWwudXNlUkdCQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5za3lib3hNYXRlcmlhbC5wcmltYXJ5Q29sb3IgPSBuZXcgQ29sb3IzKDEsIDEsIDEpO1xuICAgICAgICB0aGlzLnNreWJveE1hdGVyaWFsLmVuYWJsZU5vaXNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5za3lib3hSZWZsZWN0aW9uVGV4dHVyZSA9IG5ldyBDdWJlVGV4dHVyZSh0ZXh0dXJlTmFtZSwgdGhpcy5zY2VuZSk7XG4gICAgICAgIHRoaXMuc2t5Ym94UmVmbGVjdGlvblRleHR1cmUuY29vcmRpbmF0ZXNNb2RlID0gVGV4dHVyZS5TS1lCT1hfTU9ERTtcbiAgICAgICAgdGhpcy5za3lib3hSZWZsZWN0aW9uVGV4dHVyZS5nYW1tYVNwYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2t5Ym94TWF0ZXJpYWwucmVmbGVjdGlvblRleHR1cmUgPSB0aGlzLnNreWJveFJlZmxlY3Rpb25UZXh0dXJlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBpbWFnZSBwcm9jZXNzaW5nIGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIG9wdGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXR1cEltYWdlUHJvY2Vzc2luZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2VuZS5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmNvbnRyYXN0ID0gMS4yO1xuICAgICAgICB0aGlzLnNjZW5lLmltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24uZXhwb3N1cmUgPSAwLjg7XG4gICAgICAgIHRoaXMuc2NlbmUuaW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi50b25lTWFwcGluZ0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjZW5lLmVudmlyb25tZW50VGV4dHVyZSA9IHRoaXMuZW52VGV4dHVyZSA/IHRoaXMuZW52VGV4dHVyZVxuICAgICAgICAgICAgOiBDdWJlVGV4dHVyZS5DcmVhdGVGcm9tUHJlZmlsdGVyZWREYXRhKHYzRFNreUJveC5fZW52aXJvbm1lbnRUZXh0dXJlQ0ROVXJsLCB0aGlzLnNjZW5lKTtcbiAgICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL210b29uLW1hdGVyaWFsJztcclxuIiwiaW1wb3J0IHR5cGUgeyBJSW5zcGVjdGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWlzYy9pSW5zcGVjdGFibGUnO1xyXG5pbXBvcnQgeyBJbnNwZWN0YWJsZVR5cGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWlzYy9pSW5zcGVjdGFibGUnO1xyXG5cclxuLyoqXHJcbiAqIE1Ub29uTWF0ZXJpYWwg44GrIEluc3BlY3RvciDkuIrjgafoqr/mlbTlj6/og73jgarjg5Hjg6njg6Hjg7zjgr/jgpLoqK3lrprjgZnjgotcclxuICogQGxpbmsgaHR0cHM6Ly9kb2MuYmFieWxvbmpzLmNvbS90b29sc0FuZFJlc291cmNlcy90b29scy9pbnNwZWN0b3IjZXh0ZW5zaWJpbGl0eVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEluc3BlY3RhYmxlQ3VzdG9tUHJvcGVydGllcygpOiBJSW5zcGVjdGFibGVbXSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdEaWZmdXNlQ29sb3InLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdkaWZmdXNlQ29sb3InLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnNwZWN0YWJsZVR5cGUuQ29sb3IzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ0FtYmllbnRDb2xvcicsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ2FtYmllbnRDb2xvcicsXHJcbiAgICAgICAgICAgIHR5cGU6IEluc3BlY3RhYmxlVHlwZS5Db2xvcjMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnRW1pc3NpdmVDb2xvcicsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ2VtaXNzaXZlQ29sb3InLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnNwZWN0YWJsZVR5cGUuQ29sb3IzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ1NoYWRlQ29sb3InLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdzaGFkZUNvbG9yJyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLkNvbG9yMyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdSaW1Db2xvcicsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3JpbUNvbG9yJyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLkNvbG9yMyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdPdXRsaW5lQ29sb3InLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdvdXRsaW5lQ29sb3InLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnNwZWN0YWJsZVR5cGUuQ29sb3IzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ1JlY2VpdmVTaGFkb3dSYXRlJyxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAncmVjZWl2ZVNoYWRvd1JhdGUnLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnNwZWN0YWJsZVR5cGUuU2xpZGVyLFxyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogMSxcclxuICAgICAgICAgICAgc3RlcDogMC4wMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdTaGFkaW5nR3JhZGVSYXRlJyxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnc2hhZGluZ0dyYWRlUmF0ZScsXHJcbiAgICAgICAgICAgIHR5cGU6IEluc3BlY3RhYmxlVHlwZS5TbGlkZXIsXHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiAxLFxyXG4gICAgICAgICAgICBzdGVwOiAwLjAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ1NoYWRlU2hpZnQnLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdzaGFkZVNoaWZ0JyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLlNsaWRlcixcclxuICAgICAgICAgICAgbWluOiAtMSxcclxuICAgICAgICAgICAgbWF4OiAxLFxyXG4gICAgICAgICAgICBzdGVwOiAwLjAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ1NoYWRlVG9vbnknLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdzaGFkZVRvb255JyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLlNsaWRlcixcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnTGlnaHRDb2xvckF0dGVudWF0aW9uJyxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnbGlnaHRDb2xvckF0dGVudWF0aW9uJyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLlNsaWRlcixcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnSW5kaXJlY3RMaWdodEludGVuc2l0eScsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ2luZGlyZWN0TGlnaHRJbnRlbnNpdHknLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnNwZWN0YWJsZVR5cGUuU2xpZGVyLFxyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogMSxcclxuICAgICAgICAgICAgc3RlcDogMC4wMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdSaW1MaWdodGluZ01peCcsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3JpbUxpZ2h0aW5nTWl4JyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLlNsaWRlcixcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnUmltRnJlc25lbFBvd2VyJyxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAncmltRnJlc25lbFBvd2VyJyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLlNsaWRlcixcclxuICAgICAgICAgICAgbWluOiAwLjAxLFxyXG4gICAgICAgICAgICBtYXg6IDEwMCxcclxuICAgICAgICAgICAgc3RlcDogNCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdSaW1MaWZ0JyxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAncmltTGlmdCcsXHJcbiAgICAgICAgICAgIHR5cGU6IEluc3BlY3RhYmxlVHlwZS5TbGlkZXIsXHJcbiAgICAgICAgICAgIG1pbjogMC4wLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnT3V0bGluZVdpZHRoJyxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnb3V0bGluZVdpZHRoJyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLlNsaWRlcixcclxuICAgICAgICAgICAgbWluOiAwLjAxLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnT3V0bGluZVNjYWxlZE1heERpc3RhbmNlJyxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnb3V0bGluZVNjYWxlZE1heERpc3RhbmNlJyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLlNsaWRlcixcclxuICAgICAgICAgICAgbWluOiAxLjAsXHJcbiAgICAgICAgICAgIG1heDogMTAuMCxcclxuICAgICAgICAgICAgc3RlcDogMC4wMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdPdXRsaW5lTGlnaHRpbmdNaXgnLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdvdXRsaW5lTGlnaHRpbmdNaXgnLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnNwZWN0YWJsZVR5cGUuU2xpZGVyLFxyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogMSxcclxuICAgICAgICAgICAgc3RlcDogMC4wMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdEZWJ1Z01vZGUnLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdkZWJ1Z01vZGUnLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnNwZWN0YWJsZVR5cGUuU2xpZGVyLFxyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogMixcclxuICAgICAgICAgICAgc3RlcDogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdPdXRsaW5lV2lkdGhNb2RlJyxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnb3V0bGluZVdpZHRoTW9kZScsXHJcbiAgICAgICAgICAgIHR5cGU6IEluc3BlY3RhYmxlVHlwZS5TbGlkZXIsXHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiAyLFxyXG4gICAgICAgICAgICBzdGVwOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ091dGxpbmVDb2xvck1vZGUnLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdvdXRsaW5lQ29sb3JNb2RlJyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLlNsaWRlcixcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnQ3VsbE1vZGUnLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdjdWxsTW9kZScsXHJcbiAgICAgICAgICAgIHR5cGU6IEluc3BlY3RhYmxlVHlwZS5TbGlkZXIsXHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiAyLFxyXG4gICAgICAgICAgICBzdGVwOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ091dGxpbmVDdWxsTW9kZScsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ291dGxpbmVDdWxsTW9kZScsXHJcbiAgICAgICAgICAgIHR5cGU6IEluc3BlY3RhYmxlVHlwZS5TbGlkZXIsXHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiAyLFxyXG4gICAgICAgICAgICBzdGVwOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ0FscGhhQ3V0T2ZmJyxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnYWxwaGFDdXRPZmYnLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnNwZWN0YWJsZVR5cGUuU2xpZGVyLFxyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogMSxcclxuICAgICAgICAgICAgc3RlcDogMC4wMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdVViBBbmltYXRpb24gU2Nyb2xsIFgnLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICd1dkFuaW1hdGlvblNjcm9sbFgnLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnNwZWN0YWJsZVR5cGUuU2xpZGVyLFxyXG4gICAgICAgICAgICBtaW46IC0xLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDAuMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdVViBBbmltYXRpb24gU2Nyb2xsIFknLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICd1dkFuaW1hdGlvblNjcm9sbFknLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnNwZWN0YWJsZVR5cGUuU2xpZGVyLFxyXG4gICAgICAgICAgICBtaW46IC0xLFxyXG4gICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDAuMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdVViBBbmltYXRpb24gUm90YXRpb24nLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICd1dkFuaW1hdGlvblJvdGF0aW9uJyxcclxuICAgICAgICAgICAgdHlwZTogSW5zcGVjdGFibGVUeXBlLlNsaWRlcixcclxuICAgICAgICAgICAgbWluOiAtMC41LFxyXG4gICAgICAgICAgICBtYXg6IDAuNSxcclxuICAgICAgICAgICAgc3RlcDogMC4wMSxcclxuICAgICAgICB9LFxyXG4gICAgXTtcclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0IHsgTWF0ZXJpYWxEZWZpbmVzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9tYXRlcmlhbERlZmluZXMnO1xyXG5pbXBvcnQgdHlwZSB7IElJbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uRGVmaW5lcyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvaW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbic7XHJcblxyXG4vKipcclxuICogTWF0ZXJpYWwgRGVmaW5lc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1Ub29uTWF0ZXJpYWxEZWZpbmVzIGV4dGVuZHMgTWF0ZXJpYWxEZWZpbmVzIGltcGxlbWVudHMgSUltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb25EZWZpbmVzIHtcclxuICAgIC8qKiBAc2VlIGxpZ2h0LWZyYWdtZW50LmZyYWcgKi9cclxuICAgIHB1YmxpYyBDVVNUT01VU0VSTElHSFRJTkcgPSB0cnVlO1xyXG5cclxuICAgIC8vIE1Ub29uIFNwZWNpZmljXHJcbiAgICBwdWJsaWMgTVRPT05fT1VUTElORV9XSURUSF9XT1JMRCA9IGZhbHNlO1xyXG4gICAgcHVibGljIE1UT09OX09VVExJTkVfV0lEVEhfU0NSRUVOID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgTVRPT05fT1VUTElORV9DT0xPUl9GSVhFRCA9IGZhbHNlO1xyXG4gICAgcHVibGljIE1UT09OX09VVExJTkVfQ09MT1JfTUlYRUQgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBNVE9PTl9ERUJVR19OT1JNQUwgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBNVE9PTl9ERUJVR19MSVRTSEFERVJSQVRFID0gZmFsc2U7XHJcblxyXG4gICAgLy8gTVRvb24gdGV4dHVyZXNcclxuICAgIHB1YmxpYyBTSEFERSA9IGZhbHNlO1xyXG4gICAgcHVibGljIFNIQURFRElSRUNUVVYgPSAwO1xyXG4gICAgcHVibGljIFJFQ0VJVkVfU0hBRE9XID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgUkVDRUlWRV9TSEFET1dESVJFQ1RVViA9IDA7XHJcbiAgICBwdWJsaWMgU0hBRElOR19HUkFERSA9IGZhbHNlO1xyXG4gICAgcHVibGljIFNIQURJTkdfR1JBREVESVJFQ1RVViA9IDA7XHJcbiAgICBwdWJsaWMgUklNID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgUklNRElSRUNUVVYgPSAwO1xyXG4gICAgcHVibGljIE1BVENBUCA9IGZhbHNlO1xyXG4gICAgcHVibGljIE1BVENBUERJUkVDVFVWID0gMDtcclxuICAgIHB1YmxpYyBPVVRMSU5FX1dJRFRIID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgT1VUTElORV9XSURUSERJUkVDVFVWID0gMDtcclxuICAgIHB1YmxpYyBVVl9BTklNQVRJT05fTUFTSyA9IGZhbHNlO1xyXG4gICAgcHVibGljIFVWX0FOSU1BVElPTl9NQVNLRElSRUNUVVYgPSAwO1xyXG5cclxuICAgIC8vIE1pc2NcclxuICAgIHB1YmxpYyBNQUlOVVYxID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgTUFJTlVWMiA9IGZhbHNlO1xyXG4gICAgcHVibGljIE1BSU5VVjMgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBNQUlOVVY0ID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgTUFJTlVWNSA9IGZhbHNlO1xyXG4gICAgcHVibGljIE1BSU5VVjYgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBESUZGVVNFID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgRElGRlVTRURJUkVDVFVWID0gMDtcclxuICAgIHB1YmxpYyBCQUtFRF9WRVJURVhfQU5JTUFUSU9OX1RFWFRVUkUgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBBTUJJRU5UID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgQU1CSUVOVERJUkVDVFVWID0gMDtcclxuICAgIC8vIHB1YmxpYyBPUEFDSVRZID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgT1BBQ0lUWURJUkVDVFVWID0gMDtcclxuICAgIC8vIHB1YmxpYyBPUEFDSVRZUkdCID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUkVGTEVDVElPTiA9IGZhbHNlO1xyXG4gICAgcHVibGljIEVNSVNTSVZFID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgRU1JU1NJVkVESVJFQ1RVViA9IDA7XHJcbiAgICAvLyBwdWJsaWMgU1BFQ1VMQVIgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBTUEVDVUxBUkRJUkVDVFVWID0gMDtcclxuICAgIHB1YmxpYyBCVU1QID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQlVNUERJUkVDVFVWID0gMDtcclxuICAgIHB1YmxpYyBQQVJBTExBWCA9IGZhbHNlO1xyXG4gICAgcHVibGljIFBBUkFMTEFYT0NDTFVTSU9OID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgU1BFQ1VMQVJPVkVSQUxQSEEgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBDTElQUExBTkUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBDTElQUExBTkUyID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQ0xJUFBMQU5FMyA9IGZhbHNlO1xyXG4gICAgcHVibGljIENMSVBQTEFORTQgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBDTElQUExBTkU1ID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQ0xJUFBMQU5FNiA9IGZhbHNlO1xyXG4gICAgcHVibGljIEFMUEhBVEVTVCA9IGZhbHNlO1xyXG4gICAgcHVibGljIERFUFRIUFJFUEFTUyA9IGZhbHNlO1xyXG4gICAgcHVibGljIEFMUEhBRlJPTURJRkZVU0UgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBQT0lOVFNJWkUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBGT0cgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBTUEVDVUxBUlRFUk0gPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBESUZGVVNFRlJFU05FTCA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIE9QQUNJVFlGUkVTTkVMID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUkVGTEVDVElPTkZSRVNORUwgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBSRUZSQUNUSU9ORlJFU05FTCA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIEVNSVNTSVZFRlJFU05FTCA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIEZSRVNORUwgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBOT1JNQUwgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBUQU5HRU5UID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVVYxID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVVYyID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVVYzID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVVY0ID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVVY1ID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVVY2ID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVkVSVEVYQ09MT1IgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBWRVJURVhBTFBIQSA9IGZhbHNlO1xyXG4gICAgcHVibGljIE5VTV9CT05FX0lORkxVRU5DRVJTID0gMDtcclxuICAgIHB1YmxpYyBCb25lc1Blck1lc2ggPSAwO1xyXG4gICAgcHVibGljIEJPTkVURVhUVVJFID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQk9ORVNfVkVMT0NJVFlfRU5BQkxFRCA9IGZhbHNlO1xyXG4gICAgcHVibGljIElOU1RBTkNFUyA9IGZhbHNlO1xyXG4gICAgcHVibGljIFRISU5fSU5TVEFOQ0VTID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgSU5TVEFOQ0VTQ09MT1IgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBHTE9TU0lORVNTID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUk9VR0hORVNTID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgRU1JU1NJVkVBU0lMTFVNSU5BVElPTiA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIExJTktFTUlTU0lWRVdJVEhESUZGVVNFID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUkVGTEVDVElPTkZSRVNORUxGUk9NU1BFQ1VMQVIgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBMSUdIVE1BUCA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIExJR0hUTUFQRElSRUNUVVYgPSAwO1xyXG4gICAgcHVibGljIE9CSkVDVFNQQUNFX05PUk1BTE1BUCA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIFVTRUxJR0hUTUFQQVNTSEFET1dNQVAgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBSRUZMRUNUSU9OTUFQXzNEID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUkVGTEVDVElPTk1BUF9TUEhFUklDQUwgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBSRUZMRUNUSU9OTUFQX1BMQU5BUiA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIFJFRkxFQ1RJT05NQVBfQ1VCSUMgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBVU0VfTE9DQUxfUkVGTEVDVElPTk1BUF9DVUJJQyA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIFVTRV9MT0NBTF9SRUZSQUNUSU9OTUFQX0NVQklDID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUkVGTEVDVElPTk1BUF9QUk9KRUNUSU9OID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUkVGTEVDVElPTk1BUF9TS1lCT1ggPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBSRUZMRUNUSU9OTUFQX0VYUExJQ0lUID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUkVGTEVDVElPTk1BUF9FUVVJUkVDVEFOR1VMQVIgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBSRUZMRUNUSU9OTUFQX0VRVUlSRUNUQU5HVUxBUl9GSVhFRCA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIFJFRkxFQ1RJT05NQVBfTUlSUk9SRURFUVVJUkVDVEFOR1VMQVJfRklYRUQgPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBSRUZMRUNUSU9OTUFQX09QUE9TSVRFWiA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIElOVkVSVENVQklDTUFQID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgTE9HQVJJVEhNSUNERVBUSCA9IGZhbHNlO1xyXG4gICAgLy8gcHVibGljIFJFRlJBQ1RJT04gPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBSRUZSQUNUSU9OTUFQXzNEID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUkVGTEVDVElPTk9WRVJBTFBIQSA9IGZhbHNlO1xyXG4gICAgcHVibGljIFRXT1NJREVETElHSFRJTkcgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBTSEFET1dGTE9BVCA9IGZhbHNlO1xyXG4gICAgcHVibGljIE1PUlBIVEFSR0VUUyA9IGZhbHNlO1xyXG4gICAgcHVibGljIE1PUlBIVEFSR0VUU19OT1JNQUwgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBNT1JQSFRBUkdFVFNfVEFOR0VOVCA9IGZhbHNlO1xyXG4gICAgcHVibGljIE1PUlBIVEFSR0VUU19VViA9IGZhbHNlO1xyXG4gICAgcHVibGljIE5VTV9NT1JQSF9JTkZMVUVOQ0VSUyA9IDA7XHJcbiAgICBwdWJsaWMgTU9SUEhUQVJHRVRTX1RFWFRVUkUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBOT05VTklGT1JNU0NBTElORyA9IGZhbHNlOyAvLyBodHRwczovL3BsYXlncm91bmQuYmFieWxvbmpzLmNvbSNWNkRXSUhcclxuICAgIHB1YmxpYyBQUkVNVUxUSVBMWUFMUEhBID0gZmFsc2U7IC8vIGh0dHBzOi8vcGxheWdyb3VuZC5iYWJ5bG9uanMuY29tI0xOVkpKN1xyXG4gICAgcHVibGljIEFMUEhBVEVTVF9BRlRFUkFMTEFMUEhBQ09NUFVUQVRJT05TID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQUxQSEFCTEVORCA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIFBSRVBBU1MgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBQUkVQQVNTX0lSUkFESUFOQ0UgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBQUkVQQVNTX0lSUkFESUFOQ0VfSU5ERVggPSAtMTtcclxuICAgIHB1YmxpYyBQUkVQQVNTX0FMQkVET19TUVJUID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgUFJFUEFTU19BTEJFRE9fU1FSVF9JTkRFWCA9IC0xO1xyXG4gICAgcHVibGljIFBSRVBBU1NfREVQVEggPSBmYWxzZTtcclxuICAgIHB1YmxpYyBQUkVQQVNTX0RFUFRIX0lOREVYID0gLTE7XHJcbiAgICBwdWJsaWMgUFJFUEFTU19OT1JNQUwgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBQUkVQQVNTX05PUk1BTF9JTkRFWCA9IC0xO1xyXG4gICAgcHVibGljIFBSRVBBU1NfUE9TSVRJT04gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBQUkVQQVNTX1BPU0lUSU9OX0lOREVYID0gLTE7XHJcbiAgICBwdWJsaWMgUFJFUEFTU19WRUxPQ0lUWSA9IGZhbHNlO1xyXG4gICAgcHVibGljIFBSRVBBU1NfVkVMT0NJVFlfSU5ERVggPSAtMTtcclxuICAgIHB1YmxpYyBQUkVQQVNTX1JFRkxFQ1RJVklUWSA9IGZhbHNlO1xyXG4gICAgcHVibGljIFBSRVBBU1NfUkVGTEVDVElWSVRZX0lOREVYID0gLTE7XHJcbiAgICBwdWJsaWMgU0NFTkVfTVJUX0NPVU5UID0gMDtcclxuXHJcbiAgICAvLyBwdWJsaWMgUkdCRExJR0hUTUFQID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUkdCRFJFRkxFQ1RJT04gPSBmYWxzZTtcclxuICAgIC8vIHB1YmxpYyBSR0JEUkVGUkFDVElPTiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBJTUFHRVBST0NFU1NJTkcgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBWSUdORVRURSA9IGZhbHNlO1xyXG4gICAgcHVibGljIFZJR05FVFRFQkxFTkRNT0RFTVVMVElQTFkgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBWSUdORVRURUJMRU5ETU9ERU9QQVFVRSA9IGZhbHNlO1xyXG4gICAgcHVibGljIFRPTkVNQVBQSU5HID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVE9ORU1BUFBJTkdfQUNFUyA9IGZhbHNlO1xyXG4gICAgcHVibGljIENPTlRSQVNUID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQ09MT1JDVVJWRVMgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBDT0xPUkdSQURJTkcgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBDT0xPUkdSQURJTkczRCA9IGZhbHNlO1xyXG4gICAgcHVibGljIFNBTVBMRVIzREdSRUVOREVQVEggPSBmYWxzZTtcclxuICAgIHB1YmxpYyBTQU1QTEVSM0RCR1JNQVAgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBJTUFHRVBST0NFU1NJTkdQT1NUUFJPQ0VTUyA9IGZhbHNlO1xyXG4gICAgcHVibGljIFNLSVBGSU5BTENPTE9SQ0xBTVAgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBNVUxUSVZJRVcgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBPUkRFUl9JTkRFUEVOREVOVF9UUkFOU1BBUkVOQ1kgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBPUkRFUl9JTkRFUEVOREVOVF9UUkFOU1BBUkVOQ1lfMTZCSVRTID0gZmFsc2U7XHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiBJZiB0aGUgcmVmbGVjdGlvbiB0ZXh0dXJlIG9uIHRoaXMgbWF0ZXJpYWwgaXMgaW4gbGluZWFyIGNvbG9yIHNwYWNlXHJcbiAgICAvLyAgKiBAaGlkZGVuXHJcbiAgICAvLyAgKi9cclxuICAgIHB1YmxpYyBJU19SRUZMRUNUSU9OX0xJTkVBUiA9IGZhbHNlO1xyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiBJZiB0aGUgcmVmcmFjdGlvbiB0ZXh0dXJlIG9uIHRoaXMgbWF0ZXJpYWwgaXMgaW4gbGluZWFyIGNvbG9yIHNwYWNlXHJcbiAgICAvLyAgKiBAaGlkZGVuXHJcbiAgICAvLyAgKi9cclxuICAgIHB1YmxpYyBJU19SRUZSQUNUSU9OX0xJTkVBUiA9IGZhbHNlO1xyXG4gICAgcHVibGljIEVYUE9TVVJFID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIEZMSVBfVSA9IGZhbHNlO1xyXG4gICAgcHVibGljIEZMSVBfViA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXh0ZXJuYWxQcm9wZXJ0aWVzPzogeyBbbmFtZTogc3RyaW5nXTogeyB0eXBlOiBzdHJpbmc7IGRlZmF1bHQ6IGFueSB9IH0pIHtcclxuICAgICAgICBzdXBlcihleHRlcm5hbFByb3BlcnRpZXMpO1xyXG4gICAgICAgIHRoaXMucmVidWlsZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIHB1YmxpYyBzZXRSZWZsZWN0aW9uTW9kZShtb2RlVG9FbmFibGU6IHN0cmluZykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtYXRlcmlhbCBjYW5ub3QgdXNlIGBzZXRSZWZsZWN0aW9uTW9kZWAnKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBzZXJpYWxpemUsIFNlcmlhbGl6YXRpb25IZWxwZXIsIHNlcmlhbGl6ZUFzQ29sb3IzLCBleHBhbmRUb1Byb3BlcnR5LCBzZXJpYWxpemVBc1RleHR1cmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWlzYy9kZWNvcmF0b3JzJztcclxuaW1wb3J0IHR5cGUgeyBPYnNlcnZlciB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NaXNjL29ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBTbWFydEFycmF5IH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01pc2Mvc21hcnRBcnJheSc7XHJcbmltcG9ydCB0eXBlIHsgSUFuaW1hdGFibGUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvQW5pbWF0aW9ucy9hbmltYXRhYmxlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgU2NlbmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvc2NlbmUnO1xyXG5pbXBvcnQgeyBNYXRyaXgsIFZlY3RvcjQgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aC52ZWN0b3InO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0aHMvbWF0aC5jb2xvcic7XHJcbmltcG9ydCB7IFZlcnRleEJ1ZmZlciB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9CdWZmZXJzL2J1ZmZlcic7XHJcbmltcG9ydCB0eXBlIHsgU3ViTWVzaCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvc3ViTWVzaCc7XHJcbmltcG9ydCB0eXBlIHsgQWJzdHJhY3RNZXNoIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01lc2hlcy9hYnN0cmFjdE1lc2gnO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWVzaGVzL21lc2gnO1xyXG4vLyBpbXBvcnQgeyBQcmVQYXNzQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuL3ByZVBhc3NDb25maWd1cmF0aW9uXCI7XHJcblxyXG5pbXBvcnQgeyBJbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHR5cGUgeyBDb2xvckN1cnZlcyB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvY29sb3JDdXJ2ZXMnO1xyXG5pbXBvcnQgdHlwZSB7IElDdXN0b21TaGFkZXJOYW1lUmVzb2x2ZU9wdGlvbnMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL21hdGVyaWFsJztcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL21hdGVyaWFsJztcclxuaW1wb3J0IHR5cGUgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsJztcclxuaW1wb3J0IHsgUHVzaE1hdGVyaWFsIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9wdXNoTWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbEhlbHBlciB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxIZWxwZXInO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmUnO1xyXG5pbXBvcnQgdHlwZSB7IFJlbmRlclRhcmdldFRleHR1cmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3JlbmRlclRhcmdldFRleHR1cmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL0VuZ2luZXMvY29uc3RhbnRzJztcclxuaW1wb3J0IHsgRWZmZWN0RmFsbGJhY2tzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGVyaWFscy9lZmZlY3RGYWxsYmFja3MnO1xyXG5pbXBvcnQgdHlwZSB7IElFZmZlY3RDcmVhdGlvbk9wdGlvbnMgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL2VmZmVjdCc7XHJcbmltcG9ydCB7IEVmZmVjdCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvZWZmZWN0JztcclxuaW1wb3J0IHsgRGV0YWlsTWFwQ29uZmlndXJhdGlvbiB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWwuZGV0YWlsTWFwQ29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IE1hdGVyaWFsUGx1Z2luRXZlbnQgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL21hdGVyaWFsUGx1Z2luRXZlbnQnO1xyXG5pbXBvcnQgdHlwZSB7IFVuaWZvcm1CdWZmZXIgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvTWF0ZXJpYWxzL3VuaWZvcm1CdWZmZXInO1xyXG5cclxuaW1wb3J0IHsgZ2V0SW5zcGVjdGFibGVDdXN0b21Qcm9wZXJ0aWVzIH0gZnJvbSAnLi9pbnNwZWN0YWJsZS1jdXN0b20tcHJvcGVydGllcyc7XHJcbmltcG9ydCB7IE1Ub29uT3V0bGluZVJlbmRlcmVyIH0gZnJvbSAnLi9tdG9vbi1vdXRsaW5lLXJlbmRlcmVyJztcclxuaW1wb3J0IHsgTVRvb25NYXRlcmlhbERlZmluZXMgfSBmcm9tICcuL210b29uLW1hdGVyaWFsLWRlZmluZXMnO1xyXG5cclxuY29uc3Qgb25DcmVhdGVkRWZmZWN0UGFyYW1ldGVycyA9IHsgZWZmZWN0OiBudWxsIGFzIHVua25vd24gYXMgRWZmZWN0LCBzdWJNZXNoOiBudWxsIGFzIHVua25vd24gYXMgTnVsbGFibGU8U3ViTWVzaD4gfTtcclxuXHJcbmltcG9ydCBVYm9EZWNsYXJhdGlvbiBmcm9tICcuL3NoYWRlcnMvdWJvLWRlY2xhcmF0aW9uLnZlcnQnO1xyXG5pbXBvcnQgVmVydGV4RGVjbGFyYXRpb24gZnJvbSAnLi9zaGFkZXJzL3ZlcnRleC1kZWNsYXJhdGlvbi52ZXJ0JztcclxuaW1wb3J0IEZyYWdtZW50RGVjbGFyYXRpb24gZnJvbSAnLi9zaGFkZXJzL2ZyYWdtZW50LWRlY2xhcmF0aW9uLmZyYWcnO1xyXG5pbXBvcnQgRnJhZ21lbnRGdW5jdGlvbnMgZnJvbSAnLi9zaGFkZXJzL210b29uLWZyYWdtZW50LWZ1bmN0aW9ucy5mcmFnJztcclxuaW1wb3J0IEJ1bXBGcmFnbWVudCBmcm9tICcuL3NoYWRlcnMvYnVtcC1mcmFnbWVudC5mcmFnJztcclxuaW1wb3J0IExpZ2h0RnJhZ21lbnQgZnJvbSAnLi9zaGFkZXJzL2xpZ2h0LWZyYWdtZW50LmZyYWcnO1xyXG5pbXBvcnQgVmVydGV4U2hhZGVyIGZyb20gJy4vc2hhZGVycy9tdG9vbi52ZXJ0JztcclxuaW1wb3J0IEZyYWdtZW50U2hhZGVyIGZyb20gJy4vc2hhZGVycy9tdG9vbi5mcmFnJztcclxuXHJcbi8qKlxyXG4gKiBEZWJ1ZyBzaGFkaW5nIG1vZGVcclxuICovXHJcbmV4cG9ydCBlbnVtIERlYnVnTW9kZSB7XHJcbiAgICBOb25lID0gMCxcclxuICAgIE5vcm1hbCxcclxuICAgIExpdFNoYWRlUmF0ZSxcclxufVxyXG4vKipcclxuICogT3V0bGluZSBjb2xvciBtb2RlXHJcbiAqL1xyXG5leHBvcnQgZW51bSBPdXRsaW5lQ29sb3JNb2RlIHtcclxuICAgIEZpeGVkQ29sb3IgPSAwLFxyXG4gICAgTWl4ZWRMaWdodGluZyxcclxufVxyXG4vKipcclxuICogT3V0bGluZSB3aWR0aCBtb2RlXHJcbiAqL1xyXG5leHBvcnQgZW51bSBPdXRsaW5lV2lkdGhNb2RlIHtcclxuICAgIE5vbmUgPSAwLFxyXG4gICAgV29ybGRDb3JyZGluYXRlcyxcclxuICAgIFNjcmVlbkNvb3JkaW5hdGVzLFxyXG59XHJcbi8qKlxyXG4gKiBDdWxsIG1vZGVcclxuICovXHJcbmV4cG9ydCBlbnVtIEN1bGxNb2RlIHtcclxuICAgIE9mZiA9IDAsXHJcbiAgICBGcm9udCxcclxuICAgIEJhY2ssXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNVG9vbiDjga/ml6XmnKzjga7jgqLjg4vjg6HnmoTooajnj77jgpLjgZnjgovjgZPjgajjgpLnm67mqJnjgajjgZfjgabjgYTjgb7jgZnjgIJcclxuICog5Li76ImyIChMaXQgQ29sb3IpIOOBqOmZsOiJsiAoU2hhZGUgQ29sb3IpIOOBriAyIOiJsuOCkuOAgUxpZ2h0aW5nIOODkeODqeODoeODvOOCv+OChOWFiea6kOeSsOWig+OBq+W/nOOBmOOBpua3t+WQiOOBmeOCi+OBk+OBqOOBp+OBneOCjOOCkuWun+ePvuOBl+OBvuOBmeOAglxyXG4gKiBWUk0g44Gn44Gu5Ye65Yqb44OR44Op44Oh44O844K/44Go44OX44Ot44OR44OG44Kj44Gu44Oe44OD44OU44Oz44Kw44Gv5LiL6KiY44Go44Gq44KK44G+44GZ44CCXHJcbiAqXHJcbiAqIE1Ub29uIGFpbXMgZm9yIG1ha2luZyBKYXBhbmVzZSBhbmltZSBleHByZXNzaW9ucy5cclxuICogSXQgaXMgYWNoaWV2ZWQgYnkgbWl4aW5nIExpdCBDb2xvciBhbmQgU2hhZGUgQ29sb3IgYmFzZWQgb24gTGlnaHRpbmcgcGFyYW1ldGVycyBhbmQgbGlnaHQgc291cmNlIGVudmlyb25tZW50LlxyXG4gKlxyXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9TYW50YXJoL01Ub29uL1xyXG4gKiBAc2VlIGh0dHBzOi8vdnJtLmRldi91bml2cm0vc2hhZGVycy9tdG9vbi9cclxuICogQHNlZSBodHRwczovL2RvYy5iYWJ5bG9uanMuY29tL2JhYnlsb24xMDEvbWF0ZXJpYWxzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTVRvb25NYXRlcmlhbCBleHRlbmRzIFB1c2hNYXRlcmlhbCB7XHJcbiAgICAvLyNyZWdpb24gUHJvcGVydGllc1xyXG4gICAgLy8jcmVnaW9uIFRleHR1cmVzXHJcbiAgICBAc2VyaWFsaXplQXNUZXh0dXJlKCdkaWZmdXNlVGV4dHVyZScpXHJcbiAgICBwcml2YXRlIF9kaWZmdXNlVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGJhc2ljIHRleHR1cmUgb2YgdGhlIG1hdGVyaWFsIGFzIHZpZXdlZCB1bmRlciBhIGxpZ2h0LlxyXG4gICAgICovXHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eSgnX21hcmtBbGxTdWJNZXNoZXNBc1RleHR1cmVzQW5kTWlzY0RpcnR5JylcclxuICAgIHB1YmxpYyBkaWZmdXNlVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+ID0gbnVsbDtcclxuXHJcbiAgICBAc2VyaWFsaXplQXNUZXh0dXJlKCdlbWlzc2l2ZVRleHR1cmUnKVxyXG4gICAgcHJpdmF0ZSBfZW1pc3NpdmVUZXh0dXJlOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4gPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmUgdGV4dHVyZSBvZiB0aGUgbWF0ZXJpYWwgYXMgaWYgc2VsZiBsaXQuXHJcbiAgICAgKiBUaGlzIHdpbGwgYmUgbWl4ZWQgaW4gdGhlIGZpbmFsIHJlc3VsdCBldmVuIGluIHRoZSBhYnNlbmNlIG9mIGxpZ2h0LlxyXG4gICAgICovXHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eSgnX21hcmtBbGxTdWJNZXNoZXNBc1RleHR1cmVzRGlydHknKVxyXG4gICAgcHVibGljIGVtaXNzaXZlVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+ID0gbnVsbDtcclxuXHJcbiAgICBAc2VyaWFsaXplQXNUZXh0dXJlKCdidW1wVGV4dHVyZScpXHJcbiAgICBwcml2YXRlIF9idW1wVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICogQnVtcCBtYXBwaW5nIGlzIGEgdGVjaG5pcXVlIHRvIHNpbXVsYXRlIGJ1bXAgYW5kIGRlbnRzIG9uIGEgcmVuZGVyZWQgc3VyZmFjZS5cclxuICAgICAqIFRoZXNlIGFyZSBtYWRlIGJ5IGNyZWF0aW5nIGEgbm9ybWFsIG1hcCBmcm9tIGFuIGltYWdlLiBUaGUgbWVhbnMgdG8gZG8gdGhpcyBjYW4gYmUgZm91bmQgb24gdGhlIHdlYiwgYSBzZWFyY2ggZm9yICdub3JtYWwgbWFwIGdlbmVyYXRvcicgd2lsbCBicmluZyB1cCBmcmVlIGFuZCBwYWlkIGZvciBtZXRob2RzIG9mIGRvaW5nIHRoaXMuXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZG9jLmJhYnlsb25qcy5jb20vaG93X3RvL21vcmVfbWF0ZXJpYWxzI2J1bXAtbWFwXHJcbiAgICAgKi9cclxuICAgIEBleHBhbmRUb1Byb3BlcnR5KCdfbWFya0FsbFN1Yk1lc2hlc0FzVGV4dHVyZXNEaXJ0eScpXHJcbiAgICBwdWJsaWMgYnVtcFRleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiA9IG51bGw7XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzVGV4dHVyZSgnc2hhZGVUZXh0dXJlJylcclxuICAgIHByaXZhdGUgX3NoYWRlVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGJhc2ljIHRleHR1cmUgb2YgdGhlIG1hdGVyaWFsIGFzIHZpZXdlZCBkb2VzIG5vdCByZWNlaXZlIGEgbGlnaHRcclxuICAgICAqL1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoJ19tYXJrQWxsU3ViTWVzaGVzQXNUZXh0dXJlc0RpcnR5JylcclxuICAgIHB1YmxpYyBzaGFkZVRleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiA9IG51bGw7XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzVGV4dHVyZSgncmVjZWl2ZVNoYWRvd1RleHR1cmUnKVxyXG4gICAgcHJpdmF0ZSBfcmVjZWl2ZVNoYWRvd1RleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmluZyBzaGFkb3cgcmF0ZSB3aXRoIHRleHR1cmVcclxuICAgICAqIHJlY2VpdmVTaGFkb3dSYXRlICogdGV4dHVyZS5hXHJcbiAgICAgKi9cclxuICAgIEBleHBhbmRUb1Byb3BlcnR5KCdfbWFya0FsbFN1Yk1lc2hlc0FzVGV4dHVyZXNEaXJ0eScpXHJcbiAgICBwdWJsaWMgcmVjZWl2ZVNoYWRvd1RleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiA9IG51bGw7XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzVGV4dHVyZSgnc2hhZGluZ0dyYWRlVGV4dHVyZScpXHJcbiAgICBwcml2YXRlIF9zaGFkaW5nR3JhZGVUZXh0dXJlOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4gPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTaGFkaW5nIGdyYWRlIHJhdGVcclxuICAgICAqIHNoYWRpbmdHcmFkZVJhdGUgKiAoMS4wIC0gdGV4dHVyZS5yKSlcclxuICAgICAqL1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoJ19tYXJrQWxsU3ViTWVzaGVzQXNUZXh0dXJlc0RpcnR5JylcclxuICAgIHB1YmxpYyBzaGFkaW5nR3JhZGVUZXh0dXJlOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4gPSBudWxsO1xyXG5cclxuICAgIEBzZXJpYWxpemVBc1RleHR1cmUoJ3JpbVRleHR1cmUnKVxyXG4gICAgcHJpdmF0ZSBfcmltVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICogUGFyYW1ldHJpYyBSaW0gTGlnaHRpbmdcclxuICAgICAqL1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoJ19tYXJrQWxsU3ViTWVzaGVzQXNUZXh0dXJlc0RpcnR5JylcclxuICAgIHB1YmxpYyByaW1UZXh0dXJlOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4gPSBudWxsO1xyXG5cclxuICAgIEBzZXJpYWxpemVBc1RleHR1cmUoJ21hdENhcFRleHR1cmUnKVxyXG4gICAgcHJpdmF0ZSBfbWF0Q2FwVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICogTWF0Q2FwIExpZ2h0aW5nXHJcbiAgICAgKi9cclxuICAgIEBleHBhbmRUb1Byb3BlcnR5KCdfbWFya0FsbFN1Yk1lc2hlc0FzVGV4dHVyZXNEaXJ0eScpXHJcbiAgICBwdWJsaWMgbWF0Q2FwVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+ID0gbnVsbDtcclxuXHJcbiAgICBAc2VyaWFsaXplQXNUZXh0dXJlKCdvdXRsaW5lV2lkdGhUZXh0dXJlJylcclxuICAgIHByaXZhdGUgX291dGxpbmVXaWR0aFRleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIEFkanVzdCBvdXRsaW5lIHdpZHRoXHJcbiAgICAgKi9cclxuICAgIEBleHBhbmRUb1Byb3BlcnR5KCdfbWFya0FsbFN1Yk1lc2hlc0FzVGV4dHVyZXNEaXJ0eScpXHJcbiAgICBwdWJsaWMgb3V0bGluZVdpZHRoVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+ID0gbnVsbDtcclxuXHJcbiAgICBAc2VyaWFsaXplQXNUZXh0dXJlKCdvdXRsaW5lV2lkdGhUZXh0dXJlJylcclxuICAgIHByaXZhdGUgX3V2QW5pbWF0aW9uTWFza1RleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIFVWIGFuaW1hdGlvbiBtYXNrXHJcbiAgICAgKi9cclxuICAgIEBleHBhbmRUb1Byb3BlcnR5KCdfbWFya0FsbFN1Yk1lc2hlc0FzVGV4dHVyZXNEaXJ0eScpXHJcbiAgICBwdWJsaWMgdXZBbmltYXRpb25NYXNrVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSBsaXN0IG9mIHRleHR1cmVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PE51bGxhYmxlPEJhc2VUZXh0dXJlPj59XHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuICAgIHByaXZhdGUgZ2V0IGFwcGVuZGVkVGV4dHVyZXMoKTogQXJyYXk8TnVsbGFibGU8QmFzZVRleHR1cmU+PiB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgdGhpcy5fZGlmZnVzZVRleHR1cmUsXHJcbiAgICAgICAgICAgIHRoaXMuX2VtaXNzaXZlVGV4dHVyZSxcclxuICAgICAgICAgICAgdGhpcy5fYnVtcFRleHR1cmUsXHJcbiAgICAgICAgICAgIHRoaXMuX3NoYWRlVGV4dHVyZSxcclxuICAgICAgICAgICAgdGhpcy5fcmVjZWl2ZVNoYWRvd1RleHR1cmUsXHJcbiAgICAgICAgICAgIHRoaXMuX3NoYWRpbmdHcmFkZVRleHR1cmUsXHJcbiAgICAgICAgICAgIHRoaXMuX3JpbVRleHR1cmUsXHJcbiAgICAgICAgICAgIHRoaXMuX21hdENhcFRleHR1cmUsXHJcbiAgICAgICAgICAgIHRoaXMuX291dGxpbmVXaWR0aFRleHR1cmUsXHJcbiAgICAgICAgICAgIHRoaXMuX3V2QW5pbWF0aW9uTWFza1RleHR1cmUsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogdGhlIGxpc3Qgb2YgYWN0aXZlIHRleHR1cmVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Jhc2VUZXh0dXJlW119XHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuICAgIHByaXZhdGUgZ2V0IGFwcGVuZGVkQWN0aXZlVGV4dHVyZXMoKTogQmFzZVRleHR1cmVbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwZW5kZWRUZXh0dXJlcy5maWx0ZXIoKHQpID0+IHQgIT09IG51bGwpIGFzIEJhc2VUZXh0dXJlW107XHJcbiAgICB9XHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIC8vI3JlZ2lvbiBDb2xvcnNcclxuICAgIC8qKlxyXG4gICAgICogTXVsdGlwbGllciBvZiBkaWZmdXNlVGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBAc2VyaWFsaXplQXNDb2xvcjMoJ2RpZmZ1c2UnKVxyXG4gICAgcHVibGljIGRpZmZ1c2VDb2xvciA9IG5ldyBDb2xvcjMoMS4wLCAxLjAsIDEuMCk7XHJcbiAgICAvKipcclxuICAgICAqIGJhYnlsb24uanMgQW1iaWVudCBsaWdodFxyXG4gICAgICovXHJcbiAgICBAc2VyaWFsaXplKCdhbWJpZW50JylcclxuICAgIHB1YmxpYyBhbWJpZW50Q29sb3IgPSBuZXcgQ29sb3IzKDAuMCwgMC4wLCAwLjApO1xyXG4gICAgLyoqXHJcbiAgICAgKiBFbWlzc2l2ZSBjb2xvclxyXG4gICAgICovXHJcbiAgICBAc2VyaWFsaXplKCdlbWlzc2l2ZScpXHJcbiAgICBwdWJsaWMgZW1pc3NpdmVDb2xvciA9IG5ldyBDb2xvcjMoMC4wLCAwLjAsIDAuMCk7XHJcbiAgICAvKipcclxuICAgICAqIE11bHRpcGxpZXIgb2Ygc2hhZGVUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIEBzZXJpYWxpemUoJ3NoYWRlJylcclxuICAgIHB1YmxpYyBzaGFkZUNvbG9yID0gbmV3IENvbG9yMygwLjk3LCAwLjgxLCAwLjg2KTtcclxuICAgIC8qKlxyXG4gICAgICogUmltIGNvbG9yXHJcbiAgICAgKi9cclxuICAgIEBzZXJpYWxpemUoJ3JpbScpXHJcbiAgICBwdWJsaWMgcmltQ29sb3IgPSBuZXcgQ29sb3IzKDAuMCwgMC4wLCAwLjApO1xyXG4gICAgLyoqXHJcbiAgICAgKiBPdXRsaW5lIGNvbG9yXHJcbiAgICAgKi9cclxuICAgIEBzZXJpYWxpemUoJ291dGxpbmUnKVxyXG4gICAgcHVibGljIG91dGxpbmVDb2xvciA9IG5ldyBDb2xvcjMoMC4wLCAwLjAsIDAuMCk7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIC8vI3JlZ2lvbiBTdGFuZGFyZE1hdGVyaWFsIHBhcmFtZXRlcnNcclxuICAgIC8qKlxyXG4gICAgICogSWYgdHJ1ZSwgdGhlIGVtaXNzaXZlIHZhbHVlIGlzIGFkZGVkIGludG8gdGhlIGVuZCByZXN1bHQsIG90aGVyd2lzZSBpdCBpcyBtdWx0aXBsaWVkIGluLlxyXG4gICAgICovXHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eSgnX21hcmtBbGxTdWJNZXNoZXNBc1RleHR1cmVzRGlydHknKVxyXG4gICAgcHVibGljIHJlYWRvbmx5IHVzZUVtaXNzaXZlQXNJbGx1bWluYXRpb24gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogSWYgdHJ1ZSwgc29tZSBraW5kIG9mIGVuZXJneSBjb25zZXJ2YXRpb24gd2lsbCBwcmV2ZW50IHRoZSBlbmQgcmVzdWx0IHRvIGJlIG1vcmUgdGhhbiAxIGJ5IHJlZHVjaW5nXHJcbiAgICAgKiB0aGUgZW1pc3NpdmUgbGV2ZWwgd2hlbiB0aGUgZmluYWwgY29sb3IgaXMgY2xvc2UgdG8gb25lLlxyXG4gICAgICovXHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eSgnX21hcmtBbGxTdWJNZXNoZXNBc1RleHR1cmVzRGlydHknKVxyXG4gICAgcHVibGljIHJlYWRvbmx5IGxpbmtFbWlzc2l2ZVdpdGhEaWZmdXNlID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmllcyB0aGF0IHRoZSBtYXRlcmlhbCB3aWxsIGtlZXBzIHRoZSByZWZsZWN0aW9uIGhpZ2hsaWdodHMgb3ZlciBhIHRyYW5zcGFyZW50IHN1cmZhY2UgKG9ubHkgdGhlIG1vc3QgbHVtaW5vdXMgb25lcykuXHJcbiAgICAgKiBBIGNhciBnbGFzcyBpcyBhIGdvb2QgZXhlbXBsZSBvZiB0aGF0LiBXaGVuIHRoZSBzdHJlZXQgbGlnaHRzIHJlZmxlY3RzIG9uIGl0IHlvdSBjYW4gbm90IHNlZSB3aGF0IGlzIGJlaGluZC5cclxuICAgICAqL1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoJ19tYXJrQWxsU3ViTWVzaGVzQXNUZXh0dXJlc0RpcnR5JylcclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VSZWZsZWN0aW9uT3ZlckFscGhhID0gZmFsc2U7XHJcbiAgICBAc2VyaWFsaXplKCdkaXNhYmxlTGlnaHRpbmcnKVxyXG4gICAgcHJpdmF0ZSBfZGlzYWJsZUxpZ2h0aW5nID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIERvZXMgbGlnaHRzIGZyb20gdGhlIHNjZW5lIGltcGFjdHMgdGhpcyBtYXRlcmlhbC5cclxuICAgICAqIEl0IGNhbiBiZSBhIG5pY2UgdHJpY2sgZm9yIHBlcmZvcm1hbmNlIHRvIGRpc2FibGUgbGlnaHRpbmcgb24gYSBmdWxseSBlbWlzc2l2ZSBtYXRlcmlhbC5cclxuICAgICAqL1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoJ19tYXJrQWxsU3ViTWVzaGVzQXNMaWdodHNEaXJ0eScpXHJcbiAgICBwdWJsaWMgZGlzYWJsZUxpZ2h0aW5nOiBib29sZWFuO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgdXNpbmcgYW4gb2JqZWN0IHNwYWNlIG5vcm1hbCBtYXAgKGluc3RlYWQgb2YgdGFuZ2VudCBzcGFjZSkuXHJcbiAgICAgKiBObyBzdXBwb3J0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VPYmplY3RTcGFjZU5vcm1hbE1hcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJcyBwYXJhbGxheCBlbmFibGVkIG9yIG5vdC5cclxuICAgICAqIEBzZWUgaHR0cHM6Ly9kb2MuYmFieWxvbmpzLmNvbS9ob3dfdG8vdXNpbmdfcGFyYWxsYXhfbWFwcGluZ1xyXG4gICAgICogTm8gc3VwcG9ydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdXNlUGFyYWxsYXg6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogSXMgcGFyYWxsYXggb2NjbHVzaW9uIGVuYWJsZWQgb3Igbm90LlxyXG4gICAgICogSWYgdHJ1ZSwgdGhlIG91dGNvbWUgaXMgd2F5IG1vcmUgcmVhbGlzdGljIHRoYW4gdHJhZGl0aW9uYWwgUGFyYWxsYXggYnV0IHlvdSBjYW4gZXhwZWN0IGEgcGVyZm9ybWFuY2UgaGl0IHRoYXQgd29ydGhlcyBjb25zaWRlcmF0aW9uLlxyXG4gICAgICogQHNlZSBodHRwczovL2RvYy5iYWJ5bG9uanMuY29tL2hvd190by91c2luZ19wYXJhbGxheF9tYXBwaW5nXHJcbiAgICAgKiBObyBzdXBwb3J0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VQYXJhbGxheE9jY2x1c2lvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBObyBzdXBwb3J0IGZvciBzcGVjdWxhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3BlY3VsYXJTdXBwb3J0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogSW4gY2FzZSBvZiBsaWdodCBtYXBwaW5nLCBkZWZpbmUgd2hldGhlciB0aGUgbWFwIGNvbnRhaW5zIGxpZ2h0IG9yIHNoYWRvdyBpbmZvcm1hdGlvbnMuXHJcbiAgICAgKiBObyBzdXBwb3J0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VMaWdodG1hcEFzU2hhZG93bWFwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIE5vIHN1cHBvcnQgZm9yIHZlcnRleCBjb2xvcnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHVzZVZlcnRleENvbG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIFN1cHBvcnQgZm9yIGJvbmVzIGluIHNoYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdXNlQm9uZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdXBwb3J0IGZvciBtb3JwaCB0YXJnZXRzIGluIHNoYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdXNlTW9ycGhUYXJnZXRzOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICogTm8gc3VwcG9ydCBmb3IgdmVydGV4IGFscGhhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VWZXJ0ZXhBbHBoYTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBObyBzdXBwb3J0IGZvciBiYWtlZCB2ZXJ0ZXggYW5pbWF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VCYWtlZFZlcnRleEFuaW1hdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgYWxwaGEgbGltaXRzIGluIGFscGhhIHRlc3QgbW9kZS5cclxuICAgICAqL1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgYWxwaGFDdXRPZmYgPSAwLjQ7XHJcbiAgICBAc2VyaWFsaXplKCd1c2VBbHBoYUZyb21EaWZmdXNlVGV4dHVyZScpXHJcbiAgICBwcml2YXRlIF91c2VBbHBoYUZyb21EaWZmdXNlVGV4dHVyZSA9IHRydWU7XHJcbiAgICAvKipcclxuICAgICAqIERvZXMgdGhlIHRyYW5zcGFyZW5jeSBjb21lIGZyb20gdGhlIGRpZmZ1c2UgdGV4dHVyZSBhbHBoYSBjaGFubmVsLlxyXG4gICAgICovXHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eSgnX21hcmtBbGxTdWJNZXNoZXNBc1RleHR1cmVzQW5kTWlzY0RpcnR5JylcclxuICAgIHB1YmxpYyB1c2VBbHBoYUZyb21EaWZmdXNlVGV4dHVyZTogYm9vbGVhbjtcclxuICAgIEBzZXJpYWxpemUoJ21heFNpbXVsdGFuZW91c0xpZ2h0cycpXHJcbiAgICBwcml2YXRlIF9tYXhTaW11bHRhbmVvdXNMaWdodHMgPSA0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBsaWdodHMgdGhhdCBjYW4gYmUgdXNlZCBpbiB0aGUgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoJ19tYXJrQWxsU3ViTWVzaGVzQXNMaWdodHNEaXJ0eScpXHJcbiAgICBwdWJsaWMgbWF4U2ltdWx0YW5lb3VzTGlnaHRzOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIGludmVydGVkIHN0YXRlIGVxdWFscyB3aXRoIFVuaXR5XHJcbiAgICAgKi9cclxuICAgIEBzZXJpYWxpemUoJ2ludmVydE5vcm1hbE1hcFgnKVxyXG4gICAgcHJpdmF0ZSBfaW52ZXJ0Tm9ybWFsTWFwWCA9IHRydWU7XHJcbiAgICAvKipcclxuICAgICAqIElmIHNldHMgdG8gdHJ1ZSwgeCBjb21wb25lbnQgb2Ygbm9ybWFsIG1hcCB2YWx1ZSB3aWxsIGludmVydCAoeCA9IDEuMCAtIHgpLlxyXG4gICAgICovXHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eSgnX21hcmtBbGxTdWJNZXNoZXNBc1RleHR1cmVzRGlydHknKVxyXG4gICAgcHVibGljIGludmVydE5vcm1hbE1hcFg6IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIGludmVydGVkIHN0YXRlIGVxdWFscyB3aXRoIFVuaXR5XHJcbiAgICAgKi9cclxuICAgIEBzZXJpYWxpemUoJ2ludmVydE5vcm1hbE1hcFknKVxyXG4gICAgcHJpdmF0ZSBfaW52ZXJ0Tm9ybWFsTWFwWSA9IHRydWU7XHJcbiAgICAvKipcclxuICAgICAqIElmIHNldHMgdG8gdHJ1ZSwgeSBjb21wb25lbnQgb2Ygbm9ybWFsIG1hcCB2YWx1ZSB3aWxsIGludmVydCAoeSA9IDEuMCAtIHkpLlxyXG4gICAgICovXHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eSgnX21hcmtBbGxTdWJNZXNoZXNBc1RleHR1cmVzRGlydHknKVxyXG4gICAgcHVibGljIGludmVydE5vcm1hbE1hcFk6IGJvb2xlYW47XHJcbiAgICBAc2VyaWFsaXplKCd0d29TaWRlZExpZ2h0aW5nJylcclxuICAgIHByaXZhdGUgX3R3b1NpZGVkTGlnaHRpbmcgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogSWYgc2V0cyB0byB0cnVlIGFuZCBiYWNrZmFjZUN1bGxpbmcgaXMgZmFsc2UsIG5vcm1hbHMgd2lsbCBiZSBmbGlwcGVkIG9uIHRoZSBiYWNrc2lkZS5cclxuICAgICAqL1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoJ19tYXJrQWxsU3ViTWVzaGVzQXNUZXh0dXJlc0RpcnR5JylcclxuICAgIHB1YmxpYyB0d29TaWRlZExpZ2h0aW5nOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBjb25maWd1cmF0aW9uIHJlbGF0ZWQgdG8gaW1hZ2UgcHJvY2Vzc2luZyBhdmFpbGFibGUgaW4gdGhlIHN0YW5kYXJkIE1hdGVyaWFsLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX2ltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb246IEltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBpbWFnZSBwcm9jZXNzaW5nIGNvbmZpZ3VyYXRpb24gdXNlZCBlaXRoZXIgaW4gdGhpcyBtYXRlcmlhbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uKCk6IEltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgRGVmYXVsdCBpbWFnZSBwcm9jZXNzaW5nIGNvbmZpZ3VyYXRpb24gdXNlZCBlaXRoZXIgaW4gdGhlIHRoaXMgbWF0ZXJpYWwuXHJcbiAgICAgKlxyXG4gICAgICogSWYgc2V0cyB0byBudWxsLCB0aGUgc2NlbmUgb25lIGlzIGluIHVzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBpbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uKHZhbHVlOiBJbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fYXR0YWNoSW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbih2YWx1ZSk7XHJcblxyXG4gICAgICAgIC8vIEVuc3VyZSB0aGUgZWZmZWN0IHdpbGwgYmUgcmVidWlsdC5cclxuICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNUZXh0dXJlc0RpcnR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZWVwIHRyYWNrIG9mIHRoZSBpbWFnZSBwcm9jZXNzaW5nIG9ic2VydmVyIHRvIGFsbG93IGRpc3Bvc2UgYW5kIHJlcGxhY2UuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2ltYWdlUHJvY2Vzc2luZ09ic2VydmVyOiBOdWxsYWJsZTxPYnNlcnZlcjxJbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uPj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyBhIG5ldyBpbWFnZSBwcm9jZXNzaW5nIGNvbmZpZ3VyYXRpb24gdG8gdGhlIFN0YW5kYXJkIE1hdGVyaWFsLlxyXG4gICAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIF9hdHRhY2hJbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IE51bGxhYmxlPEltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb24gPT09IHRoaXMuX2ltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGV0YWNoZXMgb2JzZXJ2ZXJcclxuICAgICAgICBpZiAodGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbiAmJiB0aGlzLl9pbWFnZVByb2Nlc3NpbmdPYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLm9uVXBkYXRlUGFyYW1ldGVycy5yZW1vdmUodGhpcy5faW1hZ2VQcm9jZXNzaW5nT2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGljayB0aGUgc2NlbmUgY29uZmlndXJhdGlvbiBpZiBuZWVkZWRcclxuICAgICAgICBpZiAoIWNvbmZpZ3VyYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbiA9IHRoaXMuZ2V0U2NlbmUoKS5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXR0YWNoZXMgb2JzZXJ2ZXJcclxuICAgICAgICBpZiAodGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9pbWFnZVByb2Nlc3NpbmdPYnNlcnZlciA9IHRoaXMuX2ltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24ub25VcGRhdGVQYXJhbWV0ZXJzLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNJbWFnZVByb2Nlc3NpbmdEaXJ0eSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiBEZWZpbmVzIGFkZGl0aW9uYWwgUHJlUGFzcyBwYXJhbWV0ZXJzIGZvciB0aGUgbWF0ZXJpYWwuXHJcbiAgICAvLyAgKi9cclxuICAgIC8vIHB1YmxpYyByZWFkb25seSBwcmVQYXNzQ29uZmlndXJhdGlvbjogUHJlUGFzc0NvbmZpZ3VyYXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW4gdGhpcyBtYXRlcmlhbCByZW5kZXIgdG8gcHJlcGFzc1xyXG4gICAgICogTm8gc3VwcG9ydCBmb3IgUHJlUGFzc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzUHJlUGFzc0NhcGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gcmV0dXJuICF0aGlzLmRpc2FibGVEZXB0aFdyaXRlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgY29sb3IgY3VydmVzIGVmZmVjdCBpcyBlbmFibGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNhbWVyYUNvbG9yQ3VydmVzRW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmNvbG9yQ3VydmVzRW5hYmxlZDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBjb2xvciBjdXJ2ZXMgZWZmZWN0IGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgY2FtZXJhQ29sb3JDdXJ2ZXNFbmFibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmNvbG9yQ3VydmVzRW5hYmxlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBjb2xvciBncmFkaW5nIGVmZmVjdCBpcyBlbmFibGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNhbWVyYUNvbG9yR3JhZGluZ0VuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5jb2xvckdyYWRpbmdFbmFibGVkO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIGNvbG9yIGdyYWRpbmcgZWZmZWN0IGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgY2FtZXJhQ29sb3JHcmFkaW5nRW5hYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5jb2xvckdyYWRpbmdFbmFibGVkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdG9uZW1hcHBpbmcgaXMgZW5hYmxlZCBvciBub3QuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY2FtZXJhVG9uZU1hcHBpbmdFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLnRvbmVNYXBwaW5nRW5hYmxlZDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRvbmVtYXBwaW5nIGlzIGVuYWJsZWQgb3Igbm90XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgY2FtZXJhVG9uZU1hcHBpbmdFbmFibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi50b25lTWFwcGluZ0VuYWJsZWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjYW1lcmEgZXhwb3N1cmUgdXNlZCBvbiB0aGlzIG1hdGVyaWFsLlxyXG4gICAgICogVGhpcyBwcm9wZXJ0eSBpcyBoZXJlIGFuZCBub3QgaW4gdGhlIGNhbWVyYSB0byBhbGxvdyBjb250cm9sbGluZyBleHBvc3VyZSB3aXRob3V0IGZ1bGwgc2NyZWVuIHBvc3QgcHJvY2Vzcy5cclxuICAgICAqIFRoaXMgY29ycmVzcG9uZHMgdG8gYSBwaG90b2dyYXBoaWMgZXhwb3N1cmUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY2FtZXJhRXhwb3N1cmUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5leHBvc3VyZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNhbWVyYSBleHBvc3VyZSB1c2VkIG9uIHRoaXMgbWF0ZXJpYWwuXHJcbiAgICAgKiBUaGlzIHByb3BlcnR5IGlzIGhlcmUgYW5kIG5vdCBpbiB0aGUgY2FtZXJhIHRvIGFsbG93IGNvbnRyb2xsaW5nIGV4cG9zdXJlIHdpdGhvdXQgZnVsbCBzY3JlZW4gcG9zdCBwcm9jZXNzLlxyXG4gICAgICogVGhpcyBjb3JyZXNwb25kcyB0byBhIHBob3RvZ3JhcGhpYyBleHBvc3VyZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjYW1lcmFFeHBvc3VyZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5leHBvc3VyZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBUaGUgY2FtZXJhIGNvbnRyYXN0IHVzZWQgb24gdGhpcyBtYXRlcmlhbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjYW1lcmFDb250cmFzdCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmNvbnRyYXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBUaGUgY2FtZXJhIGNvbnRyYXN0IHVzZWQgb24gdGhpcyBtYXRlcmlhbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjYW1lcmFDb250cmFzdCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5jb250cmFzdCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgQ29sb3IgR3JhZGluZyAyRCBMb29rdXAgVGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjYW1lcmFDb2xvckdyYWRpbmdUZXh0dXJlKCk6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24uY29sb3JHcmFkaW5nVGV4dHVyZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgQ29sb3IgR3JhZGluZyAyRCBMb29rdXAgVGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjYW1lcmFDb2xvckdyYWRpbmdUZXh0dXJlKHZhbHVlOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4pIHtcclxuICAgICAgICB0aGlzLl9pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmNvbG9yR3JhZGluZ1RleHR1cmUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb2xvciBncmFkaW5nIGN1cnZlcyBwcm92aWRlIGFkZGl0aW9uYWwgY29sb3IgYWRqdXN0bW5lbnQgdGhhdCBpcyBhcHBsaWVkIGFmdGVyIGFueSBjb2xvciBncmFkaW5nIHRyYW5zZm9ybSAoM0QgTFVUKS5cclxuICAgICAqIFRoZXkgYWxsb3cgYmFzaWMgYWRqdXN0bWVudCBvZiBzYXR1cmF0aW9uIGFuZCBzbWFsbCBleHBvc3VyZSBhZGp1c3RtZW50cywgYWxvbmcgd2l0aCBjb2xvciBmaWx0ZXIgdGludGluZyB0byBwcm92aWRlIHdoaXRlIGJhbGFuY2UgYWRqdXN0bWVudCBvciBtb3JlIHN0eWxpc3RpYyBlZmZlY3RzLlxyXG4gICAgICogVGhlc2UgYXJlIHNpbWlsYXIgdG8gY29udHJvbHMgZm91bmQgaW4gbWFueSBwcm9mZXNzaW9uYWwgaW1hZ2luZyBvciBjb2xvcmlzdCBzb2Z0d2FyZS4gVGhlIGdsb2JhbCBjb250cm9scyBhcmUgYXBwbGllZCB0byB0aGUgZW50aXJlIGltYWdlLiBGb3IgYWR2YW5jZWQgdHVuaW5nLCBleHRyYSBjb250cm9scyBhcmUgcHJvdmlkZWQgdG8gYWRqdXN0IHRoZSBzaGFkb3csIG1pZHRvbmUgYW5kIGhpZ2hsaWdodCBhcmVhcyBvZiB0aGUgaW1hZ2U7XHJcbiAgICAgKiBjb3JyZXNwb25kaW5nIHRvIGxvdyBsdW1pbmFuY2UsIG1lZGl1bSBsdW1pbmFuY2UsIGFuZCBoaWdoIGx1bWluYW5jZSBhcmVhcyByZXNwZWN0aXZlbHkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY2FtZXJhQ29sb3JDdXJ2ZXMoKTogTnVsbGFibGU8Q29sb3JDdXJ2ZXM+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5jb2xvckN1cnZlcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbG9yIGdyYWRpbmcgY3VydmVzIHByb3ZpZGUgYWRkaXRpb25hbCBjb2xvciBhZGp1c3RtZW50IHRoYXQgaXMgYXBwbGllZCBhZnRlciBhbnkgY29sb3IgZ3JhZGluZyB0cmFuc2Zvcm0gKDNEIExVVCkuXHJcbiAgICAgKiBUaGV5IGFsbG93IGJhc2ljIGFkanVzdG1lbnQgb2Ygc2F0dXJhdGlvbiBhbmQgc21hbGwgZXhwb3N1cmUgYWRqdXN0bWVudHMsIGFsb25nIHdpdGggY29sb3IgZmlsdGVyIHRpbnRpbmcgdG8gcHJvdmlkZSB3aGl0ZSBiYWxhbmNlIGFkanVzdG1lbnQgb3IgbW9yZSBzdHlsaXN0aWMgZWZmZWN0cy5cclxuICAgICAqIFRoZXNlIGFyZSBzaW1pbGFyIHRvIGNvbnRyb2xzIGZvdW5kIGluIG1hbnkgcHJvZmVzc2lvbmFsIGltYWdpbmcgb3IgY29sb3Jpc3Qgc29mdHdhcmUuIFRoZSBnbG9iYWwgY29udHJvbHMgYXJlIGFwcGxpZWQgdG8gdGhlIGVudGlyZSBpbWFnZS4gRm9yIGFkdmFuY2VkIHR1bmluZywgZXh0cmEgY29udHJvbHMgYXJlIHByb3ZpZGVkIHRvIGFkanVzdCB0aGUgc2hhZG93LCBtaWR0b25lIGFuZCBoaWdobGlnaHQgYXJlYXMgb2YgdGhlIGltYWdlO1xyXG4gICAgICogY29ycmVzcG9uZGluZyB0byBsb3cgbHVtaW5hbmNlLCBtZWRpdW0gbHVtaW5hbmNlLCBhbmQgaGlnaCBsdW1pbmFuY2UgYXJlYXMgcmVzcGVjdGl2ZWx5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGNhbWVyYUNvbG9yQ3VydmVzKHZhbHVlOiBOdWxsYWJsZTxDb2xvckN1cnZlcz4pIHtcclxuICAgICAgICB0aGlzLl9pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmNvbG9yQ3VydmVzID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW4gdGhpcyBtYXRlcmlhbCByZW5kZXIgdG8gc2V2ZXJhbCB0ZXh0dXJlcyBhdCBvbmNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY2FuUmVuZGVyVG9NUlQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBkZXRhaWwgbWFwIHBhcmFtZXRlcnMgZm9yIHRoZSBtYXRlcmlhbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGRldGFpbE1hcDogRGV0YWlsTWFwQ29uZmlndXJhdGlvbjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3JlbmRlclRhcmdldHMgPSBuZXcgU21hcnRBcnJheTxSZW5kZXJUYXJnZXRUZXh0dXJlPigxNik7XHJcbiAgICBwcm90ZWN0ZWQgX3dvcmxkVmlld1Byb2plY3Rpb25NYXRyaXggPSBNYXRyaXguWmVybygpO1xyXG4gICAgcHJvdGVjdGVkIF9nbG9iYWxBbWJpZW50Q29sb3IgPSBuZXcgQ29sb3IzKDAsIDAsIDApO1xyXG4gICAgcHJvdGVjdGVkIF91c2VMb2dhcml0aG1pY0RlcHRoOiBib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9jYWNoZUhhc1JlbmRlclRhcmdldFRleHR1cmVzID0gZmFsc2U7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIC8vI3JlZ2lvbiBNVG9vbiBwYXJhbWV0ZXJzXHJcbiAgICBwcml2YXRlIF9idW1wU2NhbGUgPSAxLjA7XHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgYnVtcFNjYWxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idW1wU2NhbGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGJ1bXBTY2FsZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYnVtcFNjYWxlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9yZWNlaXZlU2hhZG93UmF0ZSA9IDEuMDtcclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCByZWNlaXZlU2hhZG93UmF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVjZWl2ZVNoYWRvd1JhdGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHJlY2VpdmVTaGFkb3dSYXRlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlU2hhZG93UmF0ZSA9IE1hdGgubWF4KDAuMCwgTWF0aC5taW4oMS4wLCB2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMuX21hcmtBbGxTdWJNZXNoZXNBc0xpZ2h0c0RpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9zaGFkaW5nR3JhZGVSYXRlID0gMS4wO1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IHNoYWRpbmdHcmFkZVJhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRpbmdHcmFkZVJhdGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHNoYWRpbmdHcmFkZVJhdGUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3NoYWRpbmdHcmFkZVJhdGUgPSBNYXRoLm1heCgwLjAsIE1hdGgubWluKDEuMCwgdmFsdWUpKTtcclxuICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNMaWdodHNEaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfc2hhZGVTaGlmdCA9IDAuMDtcclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBzaGFkZVNoaWZ0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFkZVNoaWZ0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBzaGFkZVNoaWZ0KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zaGFkZVNoaWZ0ID0gTWF0aC5tYXgoLTEuMCwgTWF0aC5taW4oMS4wLCB2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMuX21hcmtBbGxTdWJNZXNoZXNBc0xpZ2h0c0RpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9zaGFkZVRvb255ID0gMC45O1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IHNoYWRlVG9vbnkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRlVG9vbnk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHNoYWRlVG9vbnkodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3NoYWRlVG9vbnkgPSBNYXRoLm1heCgwLjAsIE1hdGgubWluKDEuMCwgdmFsdWUpKTtcclxuICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNMaWdodHNEaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfbGlnaHRDb2xvckF0dGVudWF0aW9uID0gMC4wO1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGxpZ2h0Q29sb3JBdHRlbnVhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlnaHRDb2xvckF0dGVudWF0aW9uO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBsaWdodENvbG9yQXR0ZW51YXRpb24odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0Q29sb3JBdHRlbnVhdGlvbiA9IE1hdGgubWF4KDAuMCwgTWF0aC5taW4oMS4wLCB2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMuX21hcmtBbGxTdWJNZXNoZXNBc0xpZ2h0c0RpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9pbmRpcmVjdExpZ2h0SW50ZW5zaXR5ID0gMC4xO1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGluZGlyZWN0TGlnaHRJbnRlbnNpdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZGlyZWN0TGlnaHRJbnRlbnNpdHk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGluZGlyZWN0TGlnaHRJbnRlbnNpdHkodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2luZGlyZWN0TGlnaHRJbnRlbnNpdHkgPSBNYXRoLm1heCgwLjAsIE1hdGgubWluKDEuMCwgdmFsdWUpKTtcclxuICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNMaWdodHNEaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfcmltTGlnaHRpbmdNaXggPSAwO1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IHJpbUxpZ2h0aW5nTWl4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yaW1MaWdodGluZ01peDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgcmltTGlnaHRpbmdNaXgodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3JpbUxpZ2h0aW5nTWl4ID0gTWF0aC5tYXgoMC4wLCBNYXRoLm1pbigxLjAsIHZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5fbWFya0FsbFN1Yk1lc2hlc0FzTGlnaHRzRGlydHkoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX3JpbUZyZXNuZWxQb3dlciA9IDE7XHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgcmltRnJlc25lbFBvd2VyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yaW1GcmVzbmVsUG93ZXI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHJpbUZyZXNuZWxQb3dlcih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fcmltRnJlc25lbFBvd2VyID0gTWF0aC5tYXgoMC4wLCBNYXRoLm1pbigxMDAuMCwgdmFsdWUpKTtcclxuICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNMaWdodHNEaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfcmltTGlmdCA9IDA7XHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgcmltTGlmdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmltTGlmdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgcmltTGlmdCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fcmltTGlmdCA9IE1hdGgubWF4KDAuMCwgTWF0aC5taW4oMS4wLCB2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMuX21hcmtBbGxTdWJNZXNoZXNBc0xpZ2h0c0RpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9vdXRsaW5lV2lkdGggPSAwLjU7XHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgb3V0bGluZVdpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vdXRsaW5lV2lkdGg7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IG91dGxpbmVXaWR0aCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fb3V0bGluZVdpZHRoID0gTWF0aC5tYXgoMC4wMSwgTWF0aC5taW4oMS4wLCB2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMuX21hcmtBbGxTdWJNZXNoZXNBc0F0dHJpYnV0ZXNEaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfb3V0bGluZVNjYWxlZE1heERpc3RhbmNlID0gMS4wO1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IG91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3V0bGluZVNjYWxlZE1heERpc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBvdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX291dGxpbmVTY2FsZWRNYXhEaXN0YW5jZSA9IE1hdGgubWF4KDEuMCwgTWF0aC5taW4oMTAuMCwgdmFsdWUpKTtcclxuICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNBdHRyaWJ1dGVzRGlydHkoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX291dGxpbmVMaWdodGluZ01peCA9IDEuMDtcclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBvdXRsaW5lTGlnaHRpbmdNaXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX291dGxpbmVMaWdodGluZ01peDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgb3V0bGluZUxpZ2h0aW5nTWl4KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9vdXRsaW5lTGlnaHRpbmdNaXggPSBNYXRoLm1heCgwLjAsIE1hdGgubWluKDEuMCwgdmFsdWUpKTtcclxuICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNBdHRyaWJ1dGVzRGlydHkoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX3V2QW5pbWF0aW9uU2Nyb2xsWCA9IDAuMDtcclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCB1dkFuaW1hdGlvblNjcm9sbFgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3V2QW5pbWF0aW9uU2Nyb2xsWDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgdXZBbmltYXRpb25TY3JvbGxYKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl91dkFuaW1hdGlvblNjcm9sbFggPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNNaXNjRGlydHkoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX3V2QW5pbWF0aW9uU2Nyb2xsWSA9IDAuMDtcclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCB1dkFuaW1hdGlvblNjcm9sbFkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3V2QW5pbWF0aW9uU2Nyb2xsWTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgdXZBbmltYXRpb25TY3JvbGxZKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl91dkFuaW1hdGlvblNjcm9sbFkgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNNaXNjRGlydHkoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX3V2QW5pbWF0aW9uUm90YXRpb24gPSAwLjA7XHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgdXZBbmltYXRpb25Sb3RhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXZBbmltYXRpb25Sb3RhdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgdXZBbmltYXRpb25Sb3RhdGlvbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fdXZBbmltYXRpb25Sb3RhdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21hcmtBbGxTdWJNZXNoZXNBc01pc2NEaXJ0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBzZXJpYWxpemUoJ2FscGhhVGVzdCcpXHJcbiAgICBwcml2YXRlIF9hbHBoYVRlc3QgPSBmYWxzZTtcclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGdldCBhbHBoYVRlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FscGhhVGVzdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgYWxwaGFUZXN0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fYWxwaGFUZXN0ID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFscGhhQmxlbmQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeU1vZGUgPSBNYXRlcmlhbC5NQVRFUklBTF9BTFBIQVRFU1RBTkRCTEVORDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeU1vZGUgPSBNYXRlcmlhbC5NQVRFUklBTF9BTFBIQVRFU1Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hbHBoYUJsZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc3BhcmVuY3lNb2RlID0gTWF0ZXJpYWwuTUFURVJJQUxfQUxQSEFCTEVORDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeU1vZGUgPSBNYXRlcmlhbC5NQVRFUklBTF9PUEFRVUU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFya0FsbFN1Yk1lc2hlc0FzTWlzY0RpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9hbHBoYUJsZW5kID0gZmFsc2U7XHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgYWxwaGFCbGVuZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWxwaGFCbGVuZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgYWxwaGFCbGVuZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2FscGhhQmxlbmQgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5iYWNrRmFjZUN1bGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hbHBoYVRlc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeU1vZGUgPSBNYXRlcmlhbC5NQVRFUklBTF9BTFBIQVRFU1RBTkRCTEVORDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeU1vZGUgPSBNYXRlcmlhbC5NQVRFUklBTF9BTFBIQUJMRU5EO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWxwaGFUZXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc3BhcmVuY3lNb2RlID0gTWF0ZXJpYWwuTUFURVJJQUxfQUxQSEFURVNUO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNwYXJlbmN5TW9kZSA9IE1hdGVyaWFsLk1BVEVSSUFMX09QQVFVRTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNNaXNjRGlydHkoKTtcclxuICAgIH1cclxuICAgIEBzZXJpYWxpemUoJ2RlYnVnTW9kZScpXHJcbiAgICBwcml2YXRlIF9kZWJ1Z01vZGUgPSBEZWJ1Z01vZGUuTm9uZTtcclxuICAgIC8qKiBAaGlkZGVuICovXHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eSgnX21hcmtBbGxTdWJNZXNoZXNBc01pc2NEaXJ0eScpXHJcbiAgICBwdWJsaWMgZGVidWdNb2RlOiBEZWJ1Z01vZGUgPSBEZWJ1Z01vZGUuTm9uZTtcclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICBwcml2YXRlIG91dGxpbmVSZW5kZXJlcj86IE1Ub29uT3V0bGluZVJlbmRlcmVyO1xyXG4gICAgcHJpdmF0ZSBfb3V0bGluZVdpZHRoTW9kZTogT3V0bGluZVdpZHRoTW9kZSA9IE91dGxpbmVXaWR0aE1vZGUuTm9uZTtcclxuICAgIHB1YmxpYyBnZXQgb3V0bGluZVdpZHRoTW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3V0bGluZVdpZHRoTW9kZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgb3V0bGluZVdpZHRoTW9kZSh2YWx1ZTogT3V0bGluZVdpZHRoTW9kZSkge1xyXG4gICAgICAgIHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodmFsdWUgIT09IE91dGxpbmVXaWR0aE1vZGUuTm9uZSAmJiAhdGhpcy5vdXRsaW5lUmVuZGVyZXIpIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOOBk+OBruODnuODhuODquOCouODq+eUqOOBruOCouOCpuODiOODqeOCpOODs+ODrOODs+ODgOODqeODvOOCkueUn+aIkOOBmeOCi1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5vdXRsaW5lUmVuZGVyZXIgPSBuZXcgTVRvb25PdXRsaW5lUmVuZGVyZXIodGhpcy5nZXRTY2VuZSgpLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFya0FsbFN1Yk1lc2hlc0FzTWlzY0RpcnR5KCk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICBwcml2YXRlIGlzT3V0bGluZTogbnVtYmVyID0gMC4wO1xyXG4gICAgcHVibGljIGVuYWJsZU91dGxpbmVSZW5kZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc091dGxpbmUgPSAxLjA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzYWFibGVPdXRsaW5lUmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNPdXRsaW5lID0gMC4wO1xyXG4gICAgfVxyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoJ19tYXJrQWxsU3ViTWVzaGVzQXNNaXNjRGlydHknKVxyXG4gICAgcHVibGljIG91dGxpbmVDb2xvck1vZGU6IE91dGxpbmVDb2xvck1vZGUgPSBPdXRsaW5lQ29sb3JNb2RlLk1peGVkTGlnaHRpbmc7XHJcbiAgICBwcml2YXRlIF9jdWxsTW9kZTogQ3VsbE1vZGUgPSBDdWxsTW9kZS5CYWNrO1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IGN1bGxNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdWxsTW9kZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgY3VsbE1vZGUodmFsdWU6IEN1bGxNb2RlKSB7XHJcbiAgICAgICAgdGhpcy5fY3VsbE1vZGUgPSB2YWx1ZTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2N1bGxNb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ3VsbE1vZGUuT2ZmOlxyXG4gICAgICAgICAgICAgICAgLy8g5Lih6Z2i44KS5o+P55S744GZ44KLXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlT3JpZW50YXRpb24gPSBNYXRlcmlhbC5DbG9ja1dpc2VTaWRlT3JpZW50YXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR3b1NpZGVkTGlnaHRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEN1bGxNb2RlLkZyb250OlxyXG4gICAgICAgICAgICAgICAgLy8g6KGo6Z2i44KS5o+P55S744GX44Gq44GEKD3oo4/pnaLjgaDjgZHmj4/nlLvjgZnjgospXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tGYWNlQ3VsbGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGVPcmllbnRhdGlvbiA9IE1hdGVyaWFsLkNvdW50ZXJDbG9ja1dpc2VTaWRlT3JpZW50YXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR3b1NpZGVkTGlnaHRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ3VsbE1vZGUuQmFjazpcclxuICAgICAgICAgICAgICAgIC8vIOijj+mdouOCkuaPj+eUu+OBl+OBquOBhCg96KGo6Z2i44Gg44GR5o+P55S744GZ44KLKSDjg4fjg5Xjgqnjg6vjg4hcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0ZhY2VDdWxsaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lkZU9yaWVudGF0aW9uID0gTWF0ZXJpYWwuQ2xvY2tXaXNlU2lkZU9yaWVudGF0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50d29TaWRlZExpZ2h0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFya0FsbFN1Yk1lc2hlc0FzTWlzY0RpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHByaXZhdGUgX291dGxpbmVDdWxsTW9kZSA9IEN1bGxNb2RlLkZyb250O1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoJ19tYXJrQWxsU3ViTWVzaGVzQXNNaXNjRGlydHknKVxyXG4gICAgcHVibGljIG91dGxpbmVDdWxsTW9kZTogQ3VsbE1vZGUgPSBDdWxsTW9kZS5Gcm9udDtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuICAgIHByaXZhdGUgc3RvcmVkQ3VsbE1vZGUgPSBDdWxsTW9kZS5CYWNrO1xyXG4gICAgLyoqXHJcbiAgICAgKiDjgqLjgqbjg4jjg6njgqTjg7PnlKggQ3VsbE1vZGUg44KS6Kit5a6aXHJcbiAgICAgKiBAaGlkZGVuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhcHBseU91dGxpbmVDdWxsTW9kZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0b3JlZEN1bGxNb2RlID0gdGhpcy5jdWxsTW9kZTtcclxuICAgICAgICB0aGlzLmN1bGxNb2RlID0gdGhpcy5fb3V0bGluZUN1bGxNb2RlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDdWxsTW9kZSDjgpLjg6rjgrnjg4jjgqJcclxuICAgICAqIEBoaWRkZW5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc3RvcmVPdXRsaW5lQ3VsbE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdWxsTW9kZSA9IHRoaXMuc3RvcmVkQ3VsbE1vZGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBoaWRkZW5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE91dGxpbmVSZW5kZXJlck5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIXRoaXMub3V0bGluZVJlbmRlcmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0bGluZVJlbmRlcmVyLm5hbWU7XHJcbiAgICB9XHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIC8qKlxyXG4gICAgICogZmxpcCBtYWluVXYueCBpZiB0cnVlXHJcbiAgICAgKi9cclxuICAgIEBzZXJpYWxpemUoJ2ZsaXBVJylcclxuICAgIHB1YmxpYyBmbGlwVSA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBmbGlwIG1haW5Vdi55IGlmIHRydWVcclxuICAgICAqL1xyXG4gICAgQHNlcmlhbGl6ZSgnZmxpcFYnKVxyXG4gICAgcHVibGljIGZsaXBWID0gZmFsc2U7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvKipcclxuICAgICAqIHtAaW5oZXJpdGRvY31cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2NlbmU/OiBTY2VuZSkge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5kZXRhaWxNYXAgPSBuZXcgRGV0YWlsTWFwQ29uZmlndXJhdGlvbih0aGlzIGFzIHVua25vd24gYXMgU3RhbmRhcmRNYXRlcmlhbCk7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIHRoZSBkZWZhdWx0IHByb2Nlc3NpbmcgY29uZmlndXJhdGlvbiB0byB0aGUgc2NlbmUuXHJcbiAgICAgICAgdGhpcy5fYXR0YWNoSW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbihudWxsKTtcclxuICAgICAgICAvLyB0aGlzLnByZVBhc3NDb25maWd1cmF0aW9uID0gbmV3IFByZVBhc3NDb25maWd1cmF0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UmVuZGVyVGFyZ2V0VGV4dHVyZXMgPSAoKTogU21hcnRBcnJheTxSZW5kZXJUYXJnZXRUZXh0dXJlPiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlclRhcmdldHMucmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIChTdGFuZGFyZE1hdGVyaWFsLlJlZmxlY3Rpb25UZXh0dXJlRW5hYmxlZCAmJiB0aGlzLl9yZWZsZWN0aW9uVGV4dHVyZSAmJiB0aGlzLl9yZWZsZWN0aW9uVGV4dHVyZS5pc1JlbmRlclRhcmdldCkge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5fcmVuZGVyVGFyZ2V0cy5wdXNoKDxSZW5kZXJUYXJnZXRUZXh0dXJlPnRoaXMuX3JlZmxlY3Rpb25UZXh0dXJlKTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKFN0YW5kYXJkTWF0ZXJpYWwuUmVmcmFjdGlvblRleHR1cmVFbmFibGVkICYmIHRoaXMuX3JlZnJhY3Rpb25UZXh0dXJlICYmIHRoaXMuX3JlZnJhY3Rpb25UZXh0dXJlLmlzUmVuZGVyVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLl9yZW5kZXJUYXJnZXRzLnB1c2goPFJlbmRlclRhcmdldFRleHR1cmU+dGhpcy5fcmVmcmFjdGlvblRleHR1cmUpO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9ldmVudEluZm8ucmVuZGVyVGFyZ2V0cyA9IHRoaXMuX3JlbmRlclRhcmdldHM7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrUGx1Z2luRXZlbnRGaWxsUmVuZGVyVGFyZ2V0VGV4dHVyZXModGhpcy5fZXZlbnRJbmZvKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJUYXJnZXRzO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFJlZ2lzdGVyIHNoYWRlcnMgdG8gU2hhZGVyc1N0b3JlXHJcbiAgICAgICAgaWYgKCFFZmZlY3QuSW5jbHVkZXNTaGFkZXJzU3RvcmUubXRvb25VYm9EZWNsYXJhdGlvbikge1xyXG4gICAgICAgICAgICBFZmZlY3QuSW5jbHVkZXNTaGFkZXJzU3RvcmUubXRvb25VYm9EZWNsYXJhdGlvbiA9IFVib0RlY2xhcmF0aW9uO1xyXG4gICAgICAgICAgICBFZmZlY3QuSW5jbHVkZXNTaGFkZXJzU3RvcmUubXRvb25WZXJ0ZXhEZWNsYXJhdGlvbiA9IFZlcnRleERlY2xhcmF0aW9uO1xyXG4gICAgICAgICAgICBFZmZlY3QuSW5jbHVkZXNTaGFkZXJzU3RvcmUubXRvb25GcmFnbWVudERlY2xhcmF0aW9uID0gRnJhZ21lbnREZWNsYXJhdGlvbjtcclxuICAgICAgICAgICAgRWZmZWN0LkluY2x1ZGVzU2hhZGVyc1N0b3JlLm10b29uRnJhZ21lbnRGdW5jdGlvbnMgPSBGcmFnbWVudEZ1bmN0aW9ucztcclxuICAgICAgICAgICAgRWZmZWN0LkluY2x1ZGVzU2hhZGVyc1N0b3JlLm10b29uTGlnaHRGcmFnbWVudCA9IExpZ2h0RnJhZ21lbnQ7XHJcbiAgICAgICAgICAgIEVmZmVjdC5JbmNsdWRlc1NoYWRlcnNTdG9yZS5tdG9vbkJ1bXBGcmFnbWVudCA9IEJ1bXBGcmFnbWVudDtcclxuICAgICAgICAgICAgRWZmZWN0LlNoYWRlcnNTdG9yZS5tdG9vblZlcnRleFNoYWRlciA9IFZlcnRleFNoYWRlcjtcclxuICAgICAgICAgICAgRWZmZWN0LlNoYWRlcnNTdG9yZS5tdG9vbkZyYWdtZW50U2hhZGVyID0gRnJhZ21lbnRTaGFkZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgcHJvcGVydGllcyB0byBJbnNwYWN0b3JcclxuICAgICAgICB0aGlzLmluc3BlY3RhYmxlQ3VzdG9tUHJvcGVydGllcyA9IHRoaXMuaW5zcGVjdGFibGVDdXN0b21Qcm9wZXJ0aWVzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuaW5zcGVjdGFibGVDdXN0b21Qcm9wZXJ0aWVzLnB1c2goLi4uZ2V0SW5zcGVjdGFibGVDdXN0b21Qcm9wZXJ0aWVzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIGJvb2xlYW4gaW5kaWNhdGluZyB0aGF0IGN1cnJlbnQgbWF0ZXJpYWwgbmVlZHMgdG8gcmVnaXN0ZXIgUlRUXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaGFzUmVuZGVyVGFyZ2V0VGV4dHVyZXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gaWYgKFN0YW5kYXJkTWF0ZXJpYWwuUmVmbGVjdGlvblRleHR1cmVFbmFibGVkICYmIHRoaXMuX3JlZmxlY3Rpb25UZXh0dXJlICYmIHRoaXMuX3JlZmxlY3Rpb25UZXh0dXJlLmlzUmVuZGVyVGFyZ2V0KSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKFN0YW5kYXJkTWF0ZXJpYWwuUmVmcmFjdGlvblRleHR1cmVFbmFibGVkICYmIHRoaXMuX3JlZnJhY3Rpb25UZXh0dXJlICYmIHRoaXMuX3JlZnJhY3Rpb25UZXh0dXJlLmlzUmVuZGVyVGFyZ2V0KSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICoge0Bpbmhlcml0ZG9jfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2xhc3NOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiAnTVRvb25NYXRlcmlhbCc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbiBjYXNlIHRoZSBkZXB0aCBidWZmZXIgZG9lcyBub3QgYWxsb3cgZW5vdWdoIGRlcHRoIHByZWNpc2lvbiBmb3IgeW91ciBzY2VuZSAobWlnaHQgYmUgdGhlIGNhc2UgaW4gbGFyZ2Ugc2NlbmVzKVxyXG4gICAgICogWW91IGNhbiB0cnkgc3dpdGNoaW5nIHRvIGxvZ2FyaXRobWljIGRlcHRoLlxyXG4gICAgICogQHNlZSBodHRwczovL2RvYy5iYWJ5bG9uanMuY29tL2hvd190by91c2luZ19sb2dhcml0aG1pY19kZXB0aF9idWZmZXJcclxuICAgICAqL1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ2V0IHVzZUxvZ2FyaXRobWljRGVwdGgoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZUxvZ2FyaXRobWljRGVwdGg7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHVzZUxvZ2FyaXRobWljRGVwdGgodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHZhbHVlICYmIHRoaXMuZ2V0U2NlbmUoKS5nZXRFbmdpbmUoKS5nZXRDYXBzKCkuZnJhZ21lbnREZXB0aFN1cHBvcnRlZDtcclxuICAgICAgICBpZiAodGhpcy5fdXNlTG9nYXJpdGhtaWNEZXB0aCAhPT0gbmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlTG9nYXJpdGhtaWNEZXB0aCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXJrQWxsU3ViTWVzaGVzQXNNaXNjRGlydHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB7QGluaGVyaXRkb2N9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZWVkQWxwaGFCbGVuZGluZygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5fZGlzYWJsZUFscGhhQmxlbmRpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmV0dXJuICh0aGlzLmFscGhhIDwgMS4wKSB8fCAodGhpcy5fb3BhY2l0eVRleHR1cmUgIT0gbnVsbCkgfHwgdGhpcy5fc2hvdWxkVXNlQWxwaGFGcm9tRGlmZnVzZVRleHR1cmUoKSB8fCB0aGlzLl9vcGFjaXR5RnJlc25lbFBhcmFtZXRlcnMgJiYgdGhpcy5fb3BhY2l0eUZyZXNuZWxQYXJhbWV0ZXJzLmlzRW5hYmxlZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5hbHBoYSA8IDEuMCB8fCB0aGlzLl9zaG91bGRVc2VBbHBoYUZyb21EaWZmdXNlVGV4dHVyZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICoge0Bpbmhlcml0ZG9jfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmVlZEFscGhhVGVzdGluZygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5fZm9yY2VBbHBoYVRlc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9hbHBoYVRlc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faGFzQWxwaGFDaGFubmVsKCkgJiYgKHRoaXMuX3RyYW5zcGFyZW5jeU1vZGUgPT0gbnVsbCB8fCB0aGlzLl90cmFuc3BhcmVuY3lNb2RlID09PSBNYXRlcmlhbC5NQVRFUklBTF9BTFBIQVRFU1QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICoge0Bpbmhlcml0ZG9jfVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX3Nob3VsZFVzZUFscGhhRnJvbURpZmZ1c2VUZXh0dXJlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaWZmdXNlVGV4dHVyZSAhPSBudWxsICYmIHRoaXMuX2RpZmZ1c2VUZXh0dXJlLmhhc0FscGhhICYmIHRoaXMuX3VzZUFscGhhRnJvbURpZmZ1c2VUZXh0dXJlICYmIHRoaXMuX3RyYW5zcGFyZW5jeU1vZGUgIT09IE1hdGVyaWFsLk1BVEVSSUFMX09QQVFVRTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHtAaW5oZXJpdGRvY31cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIF9oYXNBbHBoYUNoYW5uZWwoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpZmZ1c2VUZXh0dXJlICE9PSBudWxsICYmIHRoaXMuX2RpZmZ1c2VUZXh0dXJlLmhhc0FscGhhOyAvLyB8fCB0aGlzLl9vcGFjaXR5VGV4dHVyZSAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICoge0Bpbmhlcml0ZG9jfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWxwaGFUZXN0VGV4dHVyZSgpOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaWZmdXNlVGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHtAaW5oZXJpdGRvY31cclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzUmVhZHlGb3JTdWJNZXNoKG1lc2g6IEFic3RyYWN0TWVzaCwgc3ViTWVzaDogU3ViTWVzaCwgdXNlSW5zdGFuY2VzOiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3VuaWZvcm1CdWZmZXJMYXlvdXRCdWlsdCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkVW5pZm9ybUxheW91dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN1Yk1lc2guZWZmZWN0ICYmIHRoaXMuaXNGcm96ZW4pIHtcclxuICAgICAgICAgICAgaWYgKHN1Yk1lc2guZWZmZWN0Ll93YXNQcmV2aW91c2x5UmVhZHkgJiYgc3ViTWVzaC5lZmZlY3QuX3dhc1ByZXZpb3VzbHlVc2luZ0luc3RhbmNlcyA9PT0gdXNlSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzdWJNZXNoLm1hdGVyaWFsRGVmaW5lcykge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja1BsdWdpbkV2ZW50R2VuZXJpYyhNYXRlcmlhbFBsdWdpbkV2ZW50LkdldERlZmluZU5hbWVzLCB0aGlzLl9ldmVudEluZm8pO1xyXG4gICAgICAgICAgICBzdWJNZXNoLm1hdGVyaWFsRGVmaW5lcyA9IG5ldyBNVG9vbk1hdGVyaWFsRGVmaW5lcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2NlbmUgPSB0aGlzLmdldFNjZW5lKCk7XHJcbiAgICAgICAgY29uc3QgZGVmaW5lcyA9IHN1Yk1lc2gubWF0ZXJpYWxEZWZpbmVzIGFzIE1Ub29uTWF0ZXJpYWxEZWZpbmVzO1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1JlYWR5Rm9yU3ViTWVzaChzdWJNZXNoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVuZ2luZSA9IHNjZW5lLmdldEVuZ2luZSgpO1xyXG5cclxuICAgICAgICAvLyBMaWdodHNcclxuICAgICAgICBkZWZpbmVzLl9uZWVkTm9ybWFscyA9IE1hdGVyaWFsSGVscGVyLlByZXBhcmVEZWZpbmVzRm9yTGlnaHRzKHNjZW5lLCBtZXNoLCBkZWZpbmVzLCB0aGlzLnNwZWN1bGFyU3VwcG9ydGVkLCB0aGlzLl9tYXhTaW11bHRhbmVvdXNMaWdodHMsIHRoaXMuX2Rpc2FibGVMaWdodGluZyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm91dGxpbmVXaWR0aE1vZGUgIT09IE91dGxpbmVXaWR0aE1vZGUuTm9uZSkge1xyXG4gICAgICAgICAgICAvLyBOb3JtYWxzIGlzIG5lZWRlZCB3aGVuIHJlbmRlcmluZyBvdXRsaW5lXHJcbiAgICAgICAgICAgIGRlZmluZXMuX25lZWROb3JtYWxzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXBwbHlEZWZpbmVzKGRlZmluZXMpO1xyXG5cclxuICAgICAgICAvLyBNdWx0aXZpZXdcclxuICAgICAgICBNYXRlcmlhbEhlbHBlci5QcmVwYXJlRGVmaW5lc0Zvck11bHRpdmlldyhzY2VuZSwgZGVmaW5lcyk7XHJcblxyXG4gICAgICAgIC8vIFByZVBhc3NcclxuICAgICAgICBjb25zdCBvaXQgPSB0aGlzLm5lZWRBbHBoYUJsZW5kaW5nRm9yTWVzaChtZXNoKSAmJiAoc2NlbmUgYXMgYW55KS51c2VPcmRlckluZGVwZW5kZW50VHJhbnNwYXJlbmN5O1xyXG4gICAgICAgIC8vIE1hdGVyaWFsSGVscGVyLlByZXBhcmVEZWZpbmVzRm9yUHJlUGFzcyhzY2VuZSwgZGVmaW5lcywgdGhpcy5jYW5SZW5kZXJUb01SVCAmJiAhb2l0KTtcclxuXHJcbiAgICAgICAgLy8gT3JkZXIgaW5kZXBlbmRhbnQgdHJhbnNwYXJlbmN5XHJcbiAgICAgICAgTWF0ZXJpYWxIZWxwZXIuUHJlcGFyZURlZmluZXNGb3JPSVQoc2NlbmUsIGRlZmluZXMsIG9pdCk7XHJcblxyXG4gICAgICAgIC8vIFRleHR1cmVzXHJcbiAgICAgICAgaWYgKGRlZmluZXMuX2FyZVRleHR1cmVzRGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRJbmZvLmhhc1JlbmRlclRhcmdldFRleHR1cmVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrUGx1Z2luRXZlbnRIYXNSZW5kZXJUYXJnZXRUZXh0dXJlcyh0aGlzLl9ldmVudEluZm8pO1xyXG4gICAgICAgICAgICB0aGlzLl9jYWNoZUhhc1JlbmRlclRhcmdldFRleHR1cmVzID0gdGhpcy5fZXZlbnRJbmZvLmhhc1JlbmRlclRhcmdldFRleHR1cmVzO1xyXG4gICAgICAgICAgICBkZWZpbmVzLl9uZWVkVVZzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IENvbnN0YW50cy5NQVhfU1VQUE9SVEVEX1VWX1NFVFM7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgZGVmaW5lc1snTUFJTlVWJyArIGldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzY2VuZS50ZXh0dXJlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRleHR1cmUgaXMgcmVhZHlcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc1JlYWR5Rm9yVGV4dHVyZSh0aGlzLl9kaWZmdXNlVGV4dHVyZSwgZGVmaW5lcywgJ0RJRkZVU0UnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICF0aGlzLmlzUmVhZHlGb3JUZXh0dXJlKHRoaXMuX2VtaXNzaXZlVGV4dHVyZSwgZGVmaW5lcywgJ0VNSVNTSVZFJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc1JlYWR5Rm9yVGV4dHVyZSh0aGlzLl9zaGFkZVRleHR1cmUsIGRlZmluZXMsICdTSEFERScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMuaXNSZWFkeUZvclRleHR1cmUodGhpcy5fcmVjZWl2ZVNoYWRvd1RleHR1cmUsIGRlZmluZXMsICdSRUNFSVZFX1NIQURPVycpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMuaXNSZWFkeUZvclRleHR1cmUodGhpcy5fc2hhZGluZ0dyYWRlVGV4dHVyZSwgZGVmaW5lcywgJ1NIQURJTkdfR1JBREUnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICF0aGlzLmlzUmVhZHlGb3JUZXh0dXJlKHRoaXMuX3JpbVRleHR1cmUsIGRlZmluZXMsICdSSU0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICF0aGlzLmlzUmVhZHlGb3JUZXh0dXJlKHRoaXMuX21hdENhcFRleHR1cmUsIGRlZmluZXMsICdNQVRDQVAnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICF0aGlzLmlzUmVhZHlGb3JUZXh0dXJlKHRoaXMuX291dGxpbmVXaWR0aFRleHR1cmUsIGRlZmluZXMsICdPVVRMSU5FX1dJRFRIJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc1JlYWR5Rm9yVGV4dHVyZSh0aGlzLl91dkFuaW1hdGlvbk1hc2tUZXh0dXJlLCBkZWZpbmVzLCAnVVZfQU5JTUFUSU9OX01BU0snKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHNjZW5lLmdldEVuZ2luZSgpLmdldENhcHMoKS5zdGFuZGFyZERlcml2YXRpdmVzICYmIHRoaXMuX2J1bXBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQnVtcCB0ZXh1cmUgY2FuIG5vdCBiZSBub3QgYmxvY2tpbmcuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9idW1wVGV4dHVyZS5pc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBNYXRlcmlhbEhlbHBlci5QcmVwYXJlRGVmaW5lc0Zvck1lcmdlZFVWKHRoaXMuX2J1bXBUZXh0dXJlLCBkZWZpbmVzLCAnQlVNUCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLlBBUkFMTEFYID0gdGhpcy51c2VQYXJhbGxheDtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLlBBUkFMTEFYT0NDTFVTSU9OID0gdGhpcy51c2VQYXJhbGxheE9jY2x1c2lvbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5PQkpFQ1RTUEFDRV9OT1JNQUxNQVAgPSB0aGlzLnVzZU9iamVjdFNwYWNlTm9ybWFsTWFwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLkJVTVAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLlBBUkFMTEFYID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5QQVJBTExBWE9DQ0xVU0lPTiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRlZmluZXMuVFdPU0lERURMSUdIVElORyA9ICF0aGlzLl9iYWNrRmFjZUN1bGxpbmcgJiYgdGhpcy5fdHdvU2lkZWRMaWdodGluZztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlZmluZXMuRElGRlVTRSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZGVmaW5lcy5FTUlTU0lWRSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZGVmaW5lcy5TSEFERSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZGVmaW5lcy5SRUNFSVZFX1NIQURPVyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZGVmaW5lcy5TSEFESU5HX0dSQURFID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkZWZpbmVzLlJJTSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZGVmaW5lcy5NQVRDQVAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRlZmluZXMuT1VUTElORV9XSURUSCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZGVmaW5lcy5CVU1QID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkZWZpbmVzLlVWX0FOSU1BVElPTl9NQVNLID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlZmluZXMuQUxQSEFGUk9NRElGRlVTRSA9IHRoaXMuX3Nob3VsZFVzZUFscGhhRnJvbURpZmZ1c2VUZXh0dXJlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmVzLkVNSVNTSVZFQVNJTExVTUlOQVRJT04gPSB0aGlzLl91c2VFbWlzc2l2ZUFzSWxsdW1pbmF0aW9uO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5lcy5MSU5LRU1JU1NJVkVXSVRIRElGRlVTRSA9IHRoaXMuX2xpbmtFbWlzc2l2ZVdpdGhEaWZmdXNlO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5lcy5TUEVDVUxBUk9WRVJBTFBIQSA9IHRoaXMuX3VzZVNwZWN1bGFyT3ZlckFscGhhO1xyXG5cclxuICAgICAgICAgICAgZGVmaW5lcy5QUkVNVUxUSVBMWUFMUEhBID0gdGhpcy5hbHBoYU1vZGUgPT09IENvbnN0YW50cy5BTFBIQV9QUkVNVUxUSVBMSUVEIHx8IHRoaXMuYWxwaGFNb2RlID09PSBDb25zdGFudHMuQUxQSEFfUFJFTVVMVElQTElFRF9QT1JURVJEVUZGO1xyXG5cclxuICAgICAgICAgICAgZGVmaW5lcy5BTFBIQVRFU1RfQUZURVJBTExBTFBIQUNPTVBVVEFUSU9OUyA9IHRoaXMudHJhbnNwYXJlbmN5TW9kZSAhPT0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGRlZmluZXMuQUxQSEFCTEVORCA9IHRoaXMudHJhbnNwYXJlbmN5TW9kZSA9PT0gbnVsbCB8fCB0aGlzLm5lZWRBbHBoYUJsZW5kaW5nRm9yTWVzaChtZXNoKTsgLy8gY2hlY2sgb24gbnVsbCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZXZlbnRJbmZvLmlzUmVhZHlGb3JTdWJNZXNoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9ldmVudEluZm8uZGVmaW5lcyA9IGRlZmluZXM7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tQbHVnaW5FdmVudElzUmVhZHlGb3JTdWJNZXNoKHRoaXMuX2V2ZW50SW5mbyk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fZXZlbnRJbmZvLmlzUmVhZHlGb3JTdWJNZXNoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZWZpbmVzLl9hcmVJbWFnZVByb2Nlc3NpbmdEaXJ0eSAmJiB0aGlzLl9pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5pc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5wcmVwYXJlRGVmaW5lcyhkZWZpbmVzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluZXMuSVNfUkVGTEVDVElPTl9MSU5FQVIgPSAodGhpcy5yZWZsZWN0aW9uVGV4dHVyZSAhPSBudWxsICYmICF0aGlzLnJlZmxlY3Rpb25UZXh0dXJlLmdhbW1hU3BhY2UpO1xyXG4gICAgICAgICAgICAvLyBkZWZpbmVzLklTX1JFRlJBQ1RJT05fTElORUFSID0gKHRoaXMucmVmcmFjdGlvblRleHR1cmUgIT0gbnVsbCAmJiAhdGhpcy5yZWZyYWN0aW9uVGV4dHVyZS5nYW1tYVNwYWNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZsaXBVICE9PSBkZWZpbmVzLkZMSVBfVSkge1xyXG4gICAgICAgICAgICBkZWZpbmVzLkZMSVBfVSA9IHRoaXMuZmxpcFU7XHJcbiAgICAgICAgICAgIGRlZmluZXMubWFya0FzVW5wcm9jZXNzZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZmxpcFYgIT09IGRlZmluZXMuRkxJUF9WKSB7XHJcbiAgICAgICAgICAgIGRlZmluZXMuRkxJUF9WID0gdGhpcy5mbGlwVjtcclxuICAgICAgICAgICAgZGVmaW5lcy5tYXJrQXNVbnByb2Nlc3NlZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWlzYy5cclxuICAgICAgICBNYXRlcmlhbEhlbHBlci5QcmVwYXJlRGVmaW5lc0Zvck1pc2MoXHJcbiAgICAgICAgICAgIG1lc2gsXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICB0aGlzLl91c2VMb2dhcml0aG1pY0RlcHRoLFxyXG4gICAgICAgICAgICB0aGlzLnBvaW50c0Nsb3VkLFxyXG4gICAgICAgICAgICB0aGlzLmZvZ0VuYWJsZWQsXHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3VsZFR1cm5BbHBoYVRlc3RPbihtZXNoKSB8fCB0aGlzLl9mb3JjZUFscGhhVGVzdCxcclxuICAgICAgICAgICAgZGVmaW5lc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIFZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgZXZhbHVhdGVkIG9uIGV2ZXJ5IGZyYW1lXHJcbiAgICAgICAgTWF0ZXJpYWxIZWxwZXIuUHJlcGFyZURlZmluZXNGb3JGcmFtZUJvdW5kVmFsdWVzKHNjZW5lLCBlbmdpbmUsIGRlZmluZXMsIHVzZUluc3RhbmNlcywgbnVsbCwgc3ViTWVzaC5nZXRSZW5kZXJpbmdNZXNoKCkuaGFzVGhpbkluc3RhbmNlcyk7XHJcblxyXG4gICAgICAgIC8vIEV4dGVybmFsIGNvbmZpZ1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SW5mby5kZWZpbmVzID0gZGVmaW5lcztcclxuICAgICAgICB0aGlzLl9ldmVudEluZm8ubWVzaCA9IG1lc2g7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tQbHVnaW5FdmVudFByZXBhcmVEZWZpbmVzQmVmb3JlQXR0cmlidXRlcyh0aGlzLl9ldmVudEluZm8pO1xyXG5cclxuICAgICAgICAvLyBBdHRyaWJzXHJcbiAgICAgICAgTWF0ZXJpYWxIZWxwZXIuUHJlcGFyZURlZmluZXNGb3JBdHRyaWJ1dGVzKG1lc2gsIGRlZmluZXMsIHRoaXMudXNlVmVydGV4Q29sb3IsIHRoaXMudXNlQm9uZXMsIHRoaXMudXNlTW9ycGhUYXJnZXRzLCB0aGlzLnVzZVZlcnRleEFscGhhLCB0aGlzLnVzZUJha2VkVmVydGV4QW5pbWF0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gRXh0ZXJuYWwgY29uZmlnXHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tQbHVnaW5FdmVudFByZXBhcmVEZWZpbmVzKHRoaXMuX2V2ZW50SW5mbyk7XHJcblxyXG4gICAgICAgIC8vIEdldCBjb3JyZWN0IGVmZmVjdFxyXG4gICAgICAgIGlmIChkZWZpbmVzLmlzRGlydHkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlnaHREaXNwb3NlZCA9IGRlZmluZXMuX2FyZUxpZ2h0c0Rpc3Bvc2VkO1xyXG4gICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1Byb2Nlc3NlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRmFsbGJhY2tzXHJcbiAgICAgICAgICAgIGNvbnN0IGZhbGxiYWNrcyA9IG5ldyBFZmZlY3RGYWxsYmFja3MoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLkJVTVApIHtcclxuICAgICAgICAgICAgICAgIGZhbGxiYWNrcy5hZGRGYWxsYmFjaygwLCAnQlVNUCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmaW5lcy5QQVJBTExBWCkge1xyXG4gICAgICAgICAgICAgICAgZmFsbGJhY2tzLmFkZEZhbGxiYWNrKDEsICdQQVJBTExBWCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmaW5lcy5QQVJBTExBWE9DQ0xVU0lPTikge1xyXG4gICAgICAgICAgICAgICAgZmFsbGJhY2tzLmFkZEZhbGxiYWNrKDAsICdQQVJBTExBWE9DQ0xVU0lPTicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmaW5lcy5GT0cpIHtcclxuICAgICAgICAgICAgICAgIGZhbGxiYWNrcy5hZGRGYWxsYmFjaygxLCAnRk9HJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLlBPSU5UU0laRSkge1xyXG4gICAgICAgICAgICAgICAgZmFsbGJhY2tzLmFkZEZhbGxiYWNrKDAsICdQT0lOVFNJWkUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRlZmluZXMuTE9HQVJJVEhNSUNERVBUSCkge1xyXG4gICAgICAgICAgICAgICAgZmFsbGJhY2tzLmFkZEZhbGxiYWNrKDAsICdMT0dBUklUSE1JQ0RFUFRIJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIE1hdGVyaWFsSGVscGVyLkhhbmRsZUZhbGxiYWNrc0ZvclNoYWRvd3MoZGVmaW5lcywgZmFsbGJhY2tzLCB0aGlzLl9tYXhTaW11bHRhbmVvdXNMaWdodHMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRlZmluZXMuTVVMVElWSUVXKSB7XHJcbiAgICAgICAgICAgICAgICBmYWxsYmFja3MuYWRkRmFsbGJhY2soMCwgJ01VTFRJVklFVycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnMgPSBbVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZF07XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmaW5lcy5OT1JNQUwpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnMucHVzaChWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLlRBTkdFTlQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnMucHVzaChWZXJ0ZXhCdWZmZXIuVGFuZ2VudEtpbmQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBDb25zdGFudHMuTUFYX1NVUFBPUlRFRF9VVl9TRVRTOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZpbmVzWydVVicgKyBpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnMucHVzaChgdXYke2kgPT09IDEgPyAnJyA6IGl9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLklOU1RBTkNFU0NPTE9SKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJzLnB1c2goVmVydGV4QnVmZmVyLkNvbG9ySW5zdGFuY2VLaW5kKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgTWF0ZXJpYWxIZWxwZXIuUHJlcGFyZUF0dHJpYnV0ZXNGb3JCb25lcyhhdHRyaWJzLCBtZXNoLCBkZWZpbmVzLCBmYWxsYmFja3MpO1xyXG4gICAgICAgICAgICBNYXRlcmlhbEhlbHBlci5QcmVwYXJlQXR0cmlidXRlc0Zvckluc3RhbmNlcyhhdHRyaWJzLCBkZWZpbmVzKTtcclxuICAgICAgICAgICAgTWF0ZXJpYWxIZWxwZXIuUHJlcGFyZUF0dHJpYnV0ZXNGb3JNb3JwaFRhcmdldHMoYXR0cmlicywgbWVzaCwgZGVmaW5lcyk7XHJcbiAgICAgICAgICAgIE1hdGVyaWFsSGVscGVyLlByZXBhcmVBdHRyaWJ1dGVzRm9yQmFrZWRWZXJ0ZXhBbmltYXRpb24oYXR0cmlicywgbWVzaCwgZGVmaW5lcyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzaGFkZXJOYW1lID0gJ210b29uJztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVuaWZvcm1zID0gW1xyXG4gICAgICAgICAgICAgICAgLy8gU3RhbmRhcmRNYXRlcmlhbCB1bmlmb3Jtc1xyXG4gICAgICAgICAgICAgICAgJ3dvcmxkJyxcclxuICAgICAgICAgICAgICAgICd2aWV3JyxcclxuICAgICAgICAgICAgICAgICd2aWV3UHJvamVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndkV5ZVBvc2l0aW9uJyxcclxuICAgICAgICAgICAgICAgICd2TGlnaHRzVHlwZScsXHJcbiAgICAgICAgICAgICAgICAndkFtYmllbnRDb2xvcicsXHJcbiAgICAgICAgICAgICAgICAndmlzaWJpbGl0eScsXHJcbiAgICAgICAgICAgICAgICAndkZvZ0luZm9zJyxcclxuICAgICAgICAgICAgICAgICd2Rm9nQ29sb3InLFxyXG4gICAgICAgICAgICAgICAgJ3BvaW50U2l6ZScsXHJcbiAgICAgICAgICAgICAgICAnbUJvbmVzJyxcclxuICAgICAgICAgICAgICAgICd2Q2xpcFBsYW5lJyxcclxuICAgICAgICAgICAgICAgICd2Q2xpcFBsYW5lMicsXHJcbiAgICAgICAgICAgICAgICAndkNsaXBQbGFuZTMnLFxyXG4gICAgICAgICAgICAgICAgJ3ZDbGlwUGxhbmU0JyxcclxuICAgICAgICAgICAgICAgICd2Q2xpcFBsYW5lNScsXHJcbiAgICAgICAgICAgICAgICAndkNsaXBQbGFuZTYnLFxyXG4gICAgICAgICAgICAgICAgLy8gXCJkaWZmdXNlTGVmdENvbG9yXCIsIFwiZGlmZnVzZVJpZ2h0Q29sb3JcIiwgXCJvcGFjaXR5UGFydHNcIiwgXCJyZWZsZWN0aW9uTGVmdENvbG9yXCIsIFwicmVmbGVjdGlvblJpZ2h0Q29sb3JcIiwgXCJlbWlzc2l2ZUxlZnRDb2xvclwiLCBcImVtaXNzaXZlUmlnaHRDb2xvclwiLCBcInJlZnJhY3Rpb25MZWZ0Q29sb3JcIiwgXCJyZWZyYWN0aW9uUmlnaHRDb2xvclwiLFxyXG4gICAgICAgICAgICAgICAgLy8gXCJ2UmVmbGVjdGlvblBvc2l0aW9uXCIsIFwidlJlZmxlY3Rpb25TaXplXCIsIFwidlJlZnJhY3Rpb25Qb3NpdGlvblwiLCBcInZSZWZyYWN0aW9uU2l6ZVwiLFxyXG4gICAgICAgICAgICAgICAgJ2xvZ2FyaXRobWljRGVwdGhDb25zdGFudCcsXHJcbiAgICAgICAgICAgICAgICAndlRhbmdlbnRTcGFjZVBhcmFtcycsXHJcbiAgICAgICAgICAgICAgICAnYWxwaGFDdXRPZmYnLFxyXG4gICAgICAgICAgICAgICAgJ2JvbmVUZXh0dXJlV2lkdGgnLFxyXG4gICAgICAgICAgICAgICAgJ21vcnBoVGFyZ2V0VGV4dHVyZUluZm8nLFxyXG4gICAgICAgICAgICAgICAgJ21vcnBoVGFyZ2V0VGV4dHVyZUluZGljZXMnLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRleHR1cmUgdW5pZm9ybXNcclxuICAgICAgICAgICAgICAgICd2RGlmZnVzZUNvbG9yJyxcclxuICAgICAgICAgICAgICAgICd2RGlmZnVzZUluZm9zJyxcclxuICAgICAgICAgICAgICAgICdkaWZmdXNlTWF0cml4JyxcclxuICAgICAgICAgICAgICAgICd2RW1pc3NpdmVDb2xvcicsXHJcbiAgICAgICAgICAgICAgICAndkVtaXNzaXZlSW5mb3MnLFxyXG4gICAgICAgICAgICAgICAgJ2VtaXNzaXZlTWF0cml4JyxcclxuICAgICAgICAgICAgICAgICd2QnVtcEluZm9zJyxcclxuICAgICAgICAgICAgICAgICdidW1wTWF0cml4JyxcclxuICAgICAgICAgICAgICAgICd2U2hhZGVDb2xvcicsXHJcbiAgICAgICAgICAgICAgICAndlNoYWRlSW5mb3MnLFxyXG4gICAgICAgICAgICAgICAgJ3NoYWRlTWF0cml4JyxcclxuICAgICAgICAgICAgICAgICd2UmVjZWl2ZVNoYWRvd0luZm9zJyxcclxuICAgICAgICAgICAgICAgICdyZWNlaXZlU2hhZG93TWF0cml4JyxcclxuICAgICAgICAgICAgICAgICd2U2hhZGluZ0dyYWRlSW5mb3MnLFxyXG4gICAgICAgICAgICAgICAgJ3NoYWRpbmdHcmFkZU1hdHJpeCcsXHJcbiAgICAgICAgICAgICAgICAndlJpbUNvbG9yJyxcclxuICAgICAgICAgICAgICAgICd2UmltSW5mb3MnLFxyXG4gICAgICAgICAgICAgICAgJ1JpbU1hdHJpeCcsXHJcbiAgICAgICAgICAgICAgICAndk1hdENhcEluZm9zJyxcclxuICAgICAgICAgICAgICAgICdNYXRDYXBNYXRyaXgnLFxyXG4gICAgICAgICAgICAgICAgJ3ZPdXRsaW5lQ29sb3InLFxyXG4gICAgICAgICAgICAgICAgJ3ZPdXRsaW5lV2lkdGhJbmZvcycsXHJcbiAgICAgICAgICAgICAgICAnb3V0bGluZVdpZHRoTWF0cml4JyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNVG9vbiB1bmlmb3Jtc1xyXG4gICAgICAgICAgICAgICAgJ2FzcGVjdCcsXHJcbiAgICAgICAgICAgICAgICAnaXNPdXRsaW5lJyxcclxuICAgICAgICAgICAgICAgICdzaGFkaW5nR3JhZGVSYXRlJyxcclxuICAgICAgICAgICAgICAgICdyZWNlaXZlU2hhZG93UmF0ZScsXHJcbiAgICAgICAgICAgICAgICAnc2hhZGVTaGlmdCcsXHJcbiAgICAgICAgICAgICAgICAnc2hhZGVUb29ueScsXHJcbiAgICAgICAgICAgICAgICAncmltTGlnaHRpbmdNaXgnLFxyXG4gICAgICAgICAgICAgICAgJ3JpbUZyZXNuZWxQb3dlcicsXHJcbiAgICAgICAgICAgICAgICAncmltTGlmdCcsXHJcbiAgICAgICAgICAgICAgICAnbGlnaHRDb2xvckF0dGVudWF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdpbmRpcmVjdExpZ2h0SW50ZW5zaXR5JyxcclxuICAgICAgICAgICAgICAgICdvdXRsaW5lV2lkdGgnLFxyXG4gICAgICAgICAgICAgICAgJ291dGxpbmVTY2FsZWRNYXhEaXN0YW5jZScsXHJcbiAgICAgICAgICAgICAgICAnb3V0bGluZUxpZ2h0aW5nTWl4JyxcclxuICAgICAgICAgICAgICAgICd1dkFuaW1hdGlvblNjcm9sbFgnLFxyXG4gICAgICAgICAgICAgICAgJ3V2QW5pbWF0aW9uU2Nyb2xsWScsXHJcbiAgICAgICAgICAgICAgICAndXZBbmltYXRpb25Sb3RhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndkV5ZVVwJyxcclxuICAgICAgICAgICAgICAgICd0aW1lJyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNYXRlcmlhbCNiaW5kVmlld1Byb2plY3Rpb25cclxuICAgICAgICAgICAgICAgICdwcm9qZWN0aW9uJyxcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNhbXBsZXJzID0gW1xyXG4gICAgICAgICAgICAgICAgLy8gU3RhbmRhcmRNYXRlcmlhbCBzYW1wbGVyc1xyXG4gICAgICAgICAgICAgICAgJ2RpZmZ1c2VTYW1wbGVyJyxcclxuICAgICAgICAgICAgICAgICdhbWJpZW50U2FtcGxlcicsXHJcbiAgICAgICAgICAgICAgICAnZW1pc3NpdmVTYW1wbGVyJyxcclxuICAgICAgICAgICAgICAgICdidW1wU2FtcGxlcicsXHJcbiAgICAgICAgICAgICAgICAnYm9uZVNhbXBsZXInLFxyXG4gICAgICAgICAgICAgICAgJ21vcnBoVGFyZ2V0cycsXHJcbiAgICAgICAgICAgICAgICAnb2l0RGVwdGhTYW1wbGVyJyxcclxuICAgICAgICAgICAgICAgICdvaXRGcm9udENvbG9yU2FtcGxlcicsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTVRvb24gc2FtcGxlcnNcclxuICAgICAgICAgICAgICAgICdzaGFkZVNhbXBsZXInLFxyXG4gICAgICAgICAgICAgICAgJ3JlY2VpdmVTaGFkb3dTYW1wbGVyJyxcclxuICAgICAgICAgICAgICAgICdzaGFkaW5nR3JhZGVTYW1wbGVyJyxcclxuICAgICAgICAgICAgICAgICdyaW1TYW1wbGVyJyxcclxuICAgICAgICAgICAgICAgICdtYXRDYXBTYW1wbGVyJyxcclxuICAgICAgICAgICAgICAgICdvdXRsaW5lV2lkdGhTYW1wbGVyJyxcclxuICAgICAgICAgICAgICAgICd1dkFuaW1hdGlvbk1hc2tTYW1wbGVyJyxcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVuaWZvcm1CdWZmZXJzID0gWydNYXRlcmlhbCcsICdTY2VuZScsICdNZXNoJ107XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9ldmVudEluZm8uZmFsbGJhY2tzID0gZmFsbGJhY2tzO1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudEluZm8uZmFsbGJhY2tSYW5rID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRJbmZvLmRlZmluZXMgPSBkZWZpbmVzO1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudEluZm8udW5pZm9ybXMgPSB1bmlmb3JtcztcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRJbmZvLmF0dHJpYnV0ZXMgPSBhdHRyaWJzO1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudEluZm8uc2FtcGxlcnMgPSBzYW1wbGVycztcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRJbmZvLnVuaWZvcm1CdWZmZXJzTmFtZXMgPSB1bmlmb3JtQnVmZmVycztcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRJbmZvLmN1c3RvbUNvZGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50SW5mby5tZXNoID0gbWVzaDtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tQbHVnaW5FdmVudEdlbmVyaWMoTWF0ZXJpYWxQbHVnaW5FdmVudC5QcmVwYXJlRWZmZWN0LCB0aGlzLl9ldmVudEluZm8pO1xyXG5cclxuICAgICAgICAgICAgLy8gUHJlUGFzc0NvbmZpZ3VyYXRpb24uQWRkVW5pZm9ybXModW5pZm9ybXMpO1xyXG4gICAgICAgICAgICAvLyBQcmVQYXNzQ29uZmlndXJhdGlvbi5BZGRTYW1wbGVycyhzYW1wbGVycyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoSW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgSW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5QcmVwYXJlVW5pZm9ybXModW5pZm9ybXMsIGRlZmluZXMpO1xyXG4gICAgICAgICAgICAgICAgSW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5QcmVwYXJlU2FtcGxlcnMoc2FtcGxlcnMsIGRlZmluZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBNYXRlcmlhbEhlbHBlci5QcmVwYXJlVW5pZm9ybXNBbmRTYW1wbGVyc0xpc3Qoe1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybXNOYW1lczogdW5pZm9ybXMsXHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtQnVmZmVyc05hbWVzOiB1bmlmb3JtQnVmZmVycyxcclxuICAgICAgICAgICAgICAgIHNhbXBsZXJzLFxyXG4gICAgICAgICAgICAgICAgZGVmaW5lcyxcclxuICAgICAgICAgICAgICAgIG1heFNpbXVsdGFuZW91c0xpZ2h0czogdGhpcy5fbWF4U2ltdWx0YW5lb3VzTGlnaHRzLFxyXG4gICAgICAgICAgICB9IGFzIElFZmZlY3RDcmVhdGlvbk9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY3Nuck9wdGlvbnM6IElDdXN0b21TaGFkZXJOYW1lUmVzb2x2ZU9wdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGpvaW4gPSBkZWZpbmVzLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c0VmZmVjdCA9IHN1Yk1lc2guZWZmZWN0O1xyXG4gICAgICAgICAgICBsZXQgZWZmZWN0ID0gc2NlbmUuZ2V0RW5naW5lKCkuY3JlYXRlRWZmZWN0KFxyXG4gICAgICAgICAgICAgICAgc2hhZGVyTmFtZSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJzLFxyXG4gICAgICAgICAgICAgICAgICAgIHVuaWZvcm1zTmFtZXM6IHVuaWZvcm1zLFxyXG4gICAgICAgICAgICAgICAgICAgIHVuaWZvcm1CdWZmZXJzTmFtZXM6IHVuaWZvcm1CdWZmZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhbXBsZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZXM6IGpvaW4sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2tzLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGlsZWQ6IHRoaXMub25Db21waWxlZCxcclxuICAgICAgICAgICAgICAgICAgICBvbkVycm9yOiB0aGlzLm9uRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhQYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFNpbXVsdGFuZW91c0xpZ2h0czogdGhpcy5fbWF4U2ltdWx0YW5lb3VzTGlnaHRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhTaW11bHRhbmVvdXNNb3JwaFRhcmdldHM6IGRlZmluZXMuTlVNX01PUlBIX0lORkxVRU5DRVJTLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0ZpbmFsQ29kZTogY3Nuck9wdGlvbnMucHJvY2Vzc0ZpbmFsQ29kZSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzQ29kZUFmdGVySW5jbHVkZXM6IHRoaXMuX2V2ZW50SW5mby5jdXN0b21Db2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpVGFyZ2V0OiBkZWZpbmVzLlBSRVBBU1MsXHJcbiAgICAgICAgICAgICAgICB9IGFzIElFZmZlY3RDcmVhdGlvbk9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBlbmdpbmVcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlZmZlY3QpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vbkVmZmVjdENyZWF0ZWRPYnNlcnZhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DcmVhdGVkRWZmZWN0UGFyYW1ldGVycy5lZmZlY3QgPSBlZmZlY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DcmVhdGVkRWZmZWN0UGFyYW1ldGVycy5zdWJNZXNoID0gc3ViTWVzaDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkVmZmVjdENyZWF0ZWRPYnNlcnZhYmxlLm5vdGlmeU9ic2VydmVycyhvbkNyZWF0ZWRFZmZlY3RQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVc2UgcHJldmlvdXMgZWZmZWN0IHdoaWxlIG5ldyBvbmUgaXMgY29tcGlsaW5nXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGxvd1NoYWRlckhvdFN3YXBwaW5nICYmIHByZXZpb3VzRWZmZWN0ICYmICFlZmZlY3QuaXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0ID0gcHJldmlvdXNFZmZlY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5tYXJrQXNVbnByb2Nlc3NlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobGlnaHREaXNwb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZSByZWdpc3RlciBpbiBjYXNlIGl0IHRha2VzIG1vcmUgdGhhbiBvbmUgZnJhbWUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluZXMuX2FyZUxpZ2h0c0Rpc3Bvc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmUucmVzZXRDYWNoZWRNYXRlcmlhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Yk1lc2guc2V0RWZmZWN0KGVmZmVjdCwgZGVmaW5lcywgdGhpcy5fbWF0ZXJpYWxDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzdWJNZXNoLmVmZmVjdCB8fCAhc3ViTWVzaC5lZmZlY3QuaXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlZmluZXMuX3JlbmRlcklkID0gc2NlbmUuZ2V0UmVuZGVySWQoKTtcclxuICAgICAgICBzdWJNZXNoLmVmZmVjdC5fd2FzUHJldmlvdXNseVJlYWR5ID0gdHJ1ZTtcclxuICAgICAgICBzdWJNZXNoLmVmZmVjdC5fd2FzUHJldmlvdXNseVVzaW5nSW5zdGFuY2VzID0gdXNlSW5zdGFuY2VzO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZSB0aGUgbGF5b3V0IG9mIHRoZSBVbmlmb3JtQnVmZmVyT2JqZWN0XHJcbiAgICAgKiBNdXN0IGJlIGFkZGVkIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBgdW5pZm9ybSBNYXRlcmlhbGAgaW4gdGhlIHNoYWRlclxyXG4gICAgICogVUJPcyBjYW4gYmUgdXNlZCB0byBlZmZpY2llbnRseSBwYXNzIHZhcmlhYmxlcyB0byBzaGFkZXJzLCBidXQgb25seSBXZWJHTCB2MiBpcyBzdXBwb3J0ZWQuXHJcbiAgICAgKiBiYWJ5bG9uLmpzIGF1dG9tYXRpY2FsbHkgZmFsbHMgYmFjayBvbiBXZWJHTCB2MVxyXG4gICAgICogVGhlIHNlY29uZCBhcmd1bWVudCBpcyB0aGUgbnVtYmVyIG9mIGZsb2F0c1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYnVpbGRVbmlmb3JtTGF5b3V0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHVibyA9IHRoaXMuX3VuaWZvcm1CdWZmZXI7XHJcblxyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCd2RGlmZnVzZUNvbG9yJywgNCk7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3ZEaWZmdXNlSW5mb3MnLCAyKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgnZGlmZnVzZU1hdHJpeCcsIDE2KTtcclxuXHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3ZFbWlzc2l2ZUNvbG9yJywgMyk7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3ZFbWlzc2l2ZUluZm9zJywgMik7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ2VtaXNzaXZlTWF0cml4JywgMTYpO1xyXG5cclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgndkJ1bXBJbmZvcycsIDMpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCdidW1wTWF0cml4JywgMTYpO1xyXG5cclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgndlNoYWRlQ29sb3InLCAzKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgndlNoYWRlSW5mb3MnLCAyKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgnc2hhZGVNYXRyaXgnLCAxNik7XHJcblxyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCd2UmVjZWl2ZVNoYWRvd0luZm9zJywgMik7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3JlY2VpdmVTaGFkb3dNYXRyaXgnLCAxNik7XHJcblxyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCd2U2hhZGluZ0dyYWRlSW5mb3MnLCAyKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgnc2hhZGluZ0dyYWRlTWF0cml4JywgMTYpO1xyXG5cclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgndlJpbUNvbG9yJywgMyk7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3ZSaW1JbmZvcycsIDIpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCdyaW1NYXRyaXgnLCAxNik7XHJcblxyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCd2TWF0Q2FwSW5mb3MnLCAyKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgnbWF0Q2FwTWF0cml4JywgMTYpO1xyXG5cclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgndk91dGxpbmVDb2xvcicsIDMpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCd2T3V0bGluZVdpZHRoSW5mb3MnLCAyKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgnb3V0bGluZVdpZHRoTWF0cml4JywgMTYpO1xyXG5cclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgndlV2QW5pbWF0aW9uTWFza0luZm9zJywgMik7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3V2QW5pbWF0aW9uTWFza01hdHJpeCcsIDE2KTtcclxuXHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3ZUYW5nZW50U3BhY2VQYXJhbXMnLCAyKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgncG9pbnRTaXplJywgMSk7XHJcblxyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCdzaGFkaW5nR3JhZGVSYXRlJywgMSk7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3JlY2VpdmVTaGFkb3dSYXRlJywgMSk7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3NoYWRlU2hpZnQnLCAxKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgnc2hhZGVUb29ueScsIDEpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCdsaWdodENvbG9yQXR0ZW51YXRpb24nLCAxKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgnaW5kaXJlY3RMaWdodEludGVuc2l0eScsIDEpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCdyaW1MaWdodGluZ01peCcsIDEpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCdyaW1GcmVzbmVsUG93ZXInLCAxKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgncmltTGlmdCcsIDEpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCdvdXRsaW5lV2lkdGgnLCAxKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgnb3V0bGluZVNjYWxlZE1heERpc3RhbmNlJywgMSk7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ291dGxpbmVMaWdodGluZ01peCcsIDEpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCd1dkFuaW1hdGlvblNjcm9sbFgnLCAxKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgndXZBbmltYXRpb25TY3JvbGxZJywgMSk7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3V2QW5pbWF0aW9uUm90YXRpb24nLCAxKTtcclxuXHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ3ZFeWVVcCcsIDMpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCdhbHBoYUN1dE9mZicsIDEpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCd2QW1iaWVudENvbG9yJywgMyk7XHJcbiAgICAgICAgdWJvLmFkZFVuaWZvcm0oJ2FzcGVjdCcsIDEpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCdpc091dGxpbmUnLCAxKTtcclxuICAgICAgICB1Ym8uYWRkVW5pZm9ybSgndGltZScsIDQpO1xyXG4gICAgICAgIHViby5hZGRVbmlmb3JtKCd2aXNpYmlsaXR5JywgMSk7XHJcblxyXG4gICAgICAgIHN1cGVyLmJ1aWxkVW5pZm9ybUxheW91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICoge0Bpbmhlcml0ZG9jfVxyXG4gICAgICogQmluZHMgY3VycmVudCBzaGFkZXIgdmFyaWFibGVzXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgZXZlcnkgZnJhbWUsIHNvIGV2ZW4gaWYgaXQgaXMgcmVkdW5kYW50LCBpdCBwcmVmZXJzIHNwZWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmluZEZvclN1Yk1lc2god29ybGQ6IE1hdHJpeCwgbWVzaDogTWVzaCwgc3ViTWVzaDogU3ViTWVzaCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNjZW5lID0gdGhpcy5nZXRTY2VuZSgpO1xyXG4gICAgICAgIGNvbnN0IGRlZmluZXMgPSBzdWJNZXNoLm1hdGVyaWFsRGVmaW5lcyBhcyBNVG9vbk1hdGVyaWFsRGVmaW5lcztcclxuICAgICAgICBjb25zdCBlZmZlY3QgPSBzdWJNZXNoLmVmZmVjdDtcclxuICAgICAgICBpZiAoIWRlZmluZXMgfHwgIWVmZmVjdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdCA9IGVmZmVjdDtcclxuXHJcbiAgICAgICAgLy8gTWF0cmljZXMgTWVzaC5cclxuICAgICAgICBtZXNoLmdldE1lc2hVbmlmb3JtQnVmZmVyKCkuYmluZFRvRWZmZWN0KGVmZmVjdCwgJ01lc2gnKTtcclxuICAgICAgICBtZXNoLnRyYW5zZmVyVG9FZmZlY3Qod29ybGQpO1xyXG5cclxuICAgICAgICAvLyBCaW5kaW5nIHVuY29uZGl0aW9uYWxseVxyXG4gICAgICAgIHRoaXMuX3VuaWZvcm1CdWZmZXIuYmluZFRvRWZmZWN0KGVmZmVjdCwgJ01hdGVyaWFsJyk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMucHJlUGFzc0NvbmZpZ3VyYXRpb24uYmluZEZvclN1Yk1lc2godGhpcy5fYWN0aXZlRWZmZWN0LCBzY2VuZSwgbWVzaCwgd29ybGQsIHRoaXMuaXNGcm96ZW4pO1xyXG5cclxuICAgICAgICB0aGlzLl9ldmVudEluZm8uc3ViTWVzaCA9IHN1Yk1lc2g7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tQbHVnaW5FdmVudEhhcmRCaW5kRm9yU3ViTWVzaCh0aGlzLl9ldmVudEluZm8pO1xyXG5cclxuICAgICAgICAvLyBOb3JtYWwgTWF0cml4XHJcbiAgICAgICAgaWYgKGRlZmluZXMuT0JKRUNUU1BBQ0VfTk9STUFMTUFQKSB7XHJcbiAgICAgICAgICAgIHdvcmxkLnRvTm9ybWFsTWF0cml4KHRoaXMuX25vcm1hbE1hdHJpeCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZE9ubHlOb3JtYWxNYXRyaXgodGhpcy5fbm9ybWFsTWF0cml4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG11c3RSZWJpbmQgPSB0aGlzLl9tdXN0UmViaW5kKHNjZW5lLCBlZmZlY3QsIG1lc2gudmlzaWJpbGl0eSk7XHJcblxyXG4gICAgICAgIC8vIEJvbmVzXHJcbiAgICAgICAgTWF0ZXJpYWxIZWxwZXIuQmluZEJvbmVzUGFyYW1ldGVycyhtZXNoLCBlZmZlY3QpO1xyXG4gICAgICAgIGNvbnN0IHVibyA9IHRoaXMuX3VuaWZvcm1CdWZmZXI7XHJcbiAgICAgICAgaWYgKG11c3RSZWJpbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kVmlld1Byb2plY3Rpb24oZWZmZWN0KTtcclxuICAgICAgICAgICAgaWYgKCF1Ym8udXNlVWJvIHx8ICF0aGlzLmlzRnJvemVuIHx8ICF1Ym8uaXNTeW5jKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NlbmUudGV4dHVyZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kVGV4dHVyZSh0aGlzLl9kaWZmdXNlVGV4dHVyZSwgdWJvLCBlZmZlY3QsICdkaWZmdXNlJywgJ3ZEaWZmdXNlSW5mb3MnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRUZXh0dXJlKHRoaXMuX2VtaXNzaXZlVGV4dHVyZSwgdWJvLCBlZmZlY3QsICdlbWlzc2l2ZScsICd2RW1pc3NpdmVJbmZvcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idW1wVGV4dHVyZSAmJiBzY2VuZS5nZXRFbmdpbmUoKS5nZXRDYXBzKCkuc3RhbmRhcmREZXJpdmF0aXZlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQzKCd2QnVtcEluZm9zJywgdGhpcy5fYnVtcFRleHR1cmUuY29vcmRpbmF0ZXNJbmRleCwgMS4wIC8gdGhpcy5fYnVtcFRleHR1cmUubGV2ZWwsIHRoaXMuX2J1bXBTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGVyaWFsSGVscGVyLkJpbmRUZXh0dXJlTWF0cml4KHRoaXMuX2J1bXBUZXh0dXJlLCB1Ym8sICdidW1wJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdC5zZXRUZXh0dXJlKGBidW1wU2FtcGxlcmAsIHRoaXMuX2J1bXBUZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnVtcFRleHR1cmUg44GvIGJhYnlsb24uanMg44Gu44OH44OV44Kp44Or44OI44Go5Y+N5a++44Gu54q25oWL44Gn44GC44KLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2VuZS5fbWlycm9yZWRDYW1lcmFQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUZsb2F0MigndlRhbmdlbnRTcGFjZVBhcmFtcycsIHRoaXMuX2ludmVydE5vcm1hbE1hcFggPyAxLjAgOiAtMS4wLCB0aGlzLl9pbnZlcnROb3JtYWxNYXBZID8gMS4wIDogLTEuMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQyKCd2VGFuZ2VudFNwYWNlUGFyYW1zJywgdGhpcy5faW52ZXJ0Tm9ybWFsTWFwWCA/IC0xLjAgOiAxLjAsIHRoaXMuX2ludmVydE5vcm1hbE1hcFkgPyAtMS4wIDogMS4wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRUZXh0dXJlKHRoaXMuX3NoYWRlVGV4dHVyZSwgdWJvLCBlZmZlY3QsICdzaGFkZScsICd2U2hhZGVJbmZvcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFRleHR1cmUodGhpcy5fcmVjZWl2ZVNoYWRvd1RleHR1cmUsIHVibywgZWZmZWN0LCAncmVjZWl2ZVNoYWRvdycsICd2UmVjZWl2ZVNoYWRvd0luZm9zJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kVGV4dHVyZSh0aGlzLl9zaGFkaW5nR3JhZGVUZXh0dXJlLCB1Ym8sIGVmZmVjdCwgJ3NoYWRpbmdHcmFkZScsICd2U2hhZGluZ0dyYWRlSW5mb3MnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRUZXh0dXJlKHRoaXMuX3JpbVRleHR1cmUsIHVibywgZWZmZWN0LCAncmltJywgJ3ZSaW1JbmZvcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFRleHR1cmUodGhpcy5fbWF0Q2FwVGV4dHVyZSwgdWJvLCBlZmZlY3QsICdtYXRDYXAnLCAndk1hdENhcEluZm9zJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kVGV4dHVyZSh0aGlzLl9vdXRsaW5lV2lkdGhUZXh0dXJlLCB1Ym8sIGVmZmVjdCwgJ291dGxpbmVXaWR0aCcsICd2T3V0bGluZVdpZHRoSW5mb3MnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRUZXh0dXJlKHRoaXMuX3V2QW5pbWF0aW9uTWFza1RleHR1cmUsIHVibywgZWZmZWN0LCAndXZBbmltYXRpb25NYXNrJywgJ3ZVdkFuaW1hdGlvbk1hc2tJbmZvcycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faGFzQWxwaGFDaGFubmVsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUZsb2F0KCdhbHBoYUN1dE9mZicsIHRoaXMuYWxwaGFDdXRPZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQb2ludCBzaXplXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb2ludHNDbG91ZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHViby51cGRhdGVGbG9hdCgncG9pbnRTaXplJywgdGhpcy5wb2ludFNpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1Ub29uIHVuaWZvcm1zXHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQoJ3JlY2VpdmVTaGFkb3dSYXRlJywgdGhpcy5fcmVjZWl2ZVNoYWRvd1JhdGUpO1xyXG4gICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUZsb2F0KCdzaGFkaW5nR3JhZGVSYXRlJywgdGhpcy5fc2hhZGluZ0dyYWRlUmF0ZSk7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQoJ3NoYWRlU2hpZnQnLCB0aGlzLl9zaGFkZVNoaWZ0KTtcclxuICAgICAgICAgICAgICAgIHViby51cGRhdGVGbG9hdCgnc2hhZGVUb29ueScsIHRoaXMuX3NoYWRlVG9vbnkpO1xyXG4gICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUZsb2F0KCdsaWdodENvbG9yQXR0ZW51YXRpb24nLCB0aGlzLl9saWdodENvbG9yQXR0ZW51YXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUZsb2F0KCdpbmRpcmVjdExpZ2h0SW50ZW5zaXR5JywgdGhpcy5faW5kaXJlY3RMaWdodEludGVuc2l0eSk7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQoJ3JpbUxpZ2h0aW5nTWl4JywgdGhpcy5fcmltTGlnaHRpbmdNaXgpO1xyXG4gICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUZsb2F0KCdyaW1GcmVzbmVsUG93ZXInLCB0aGlzLl9yaW1GcmVzbmVsUG93ZXIpO1xyXG4gICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUZsb2F0KCdyaW1MaWZ0JywgdGhpcy5fcmltTGlmdCk7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQoJ291dGxpbmVXaWR0aCcsIHRoaXMuX291dGxpbmVXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQoJ291dGxpbmVTY2FsZWRNYXhEaXN0YW5jZScsIHRoaXMuX291dGxpbmVTY2FsZWRNYXhEaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQoJ291dGxpbmVMaWdodGluZ01peCcsIHRoaXMuX291dGxpbmVMaWdodGluZ01peCk7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQoJ3V2QW5pbWF0aW9uU2Nyb2xsWCcsIHRoaXMuX3V2QW5pbWF0aW9uU2Nyb2xsWCk7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQoJ3V2QW5pbWF0aW9uU2Nyb2xsWScsIHRoaXMuX3V2QW5pbWF0aW9uU2Nyb2xsWSk7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQoJ3V2QW5pbWF0aW9uUm90YXRpb24nLCB0aGlzLl91dkFuaW1hdGlvblJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2xvcnNcclxuICAgICAgICAgICAgICAgIHNjZW5lLmFtYmllbnRDb2xvci5tdWx0aXBseVRvUmVmKHRoaXMuYW1iaWVudENvbG9yLCB0aGlzLl9nbG9iYWxBbWJpZW50Q29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUNvbG9yMygndkFtYmllbnRDb2xvcicsIHRoaXMuX2dsb2JhbEFtYmllbnRDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlQ29sb3I0KCd2RGlmZnVzZUNvbG9yJywgdGhpcy5kaWZmdXNlQ29sb3IsIHRoaXMuYWxwaGEpO1xyXG4gICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUNvbG9yMygndkVtaXNzaXZlQ29sb3InLCB0aGlzLmVtaXNzaXZlQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUNvbG9yMygndlNoYWRlQ29sb3InLCB0aGlzLnNoYWRlQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdWJvLnVwZGF0ZUNvbG9yMygndlJpbUNvbG9yJywgdGhpcy5yaW1Db2xvcik7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlQ29sb3I0KCd2T3V0bGluZUNvbG9yJywgdGhpcy5vdXRsaW5lQ29sb3IsIDEuMCk7XHJcbiAgICAgICAgICAgICAgICB1Ym8udXBkYXRlVmVjdG9yMygndkV5ZVVwJywgc2NlbmUuYWN0aXZlQ2FtZXJhIS51cFZlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE9JVCB3aXRoIGRlcHRoIHBlZWxpbmdcclxuICAgICAgICAgICAgY29uc3QgYW55U2NlbmUgPSBzY2VuZSBhcyBhbnk7XHJcbiAgICAgICAgICAgIGlmIChhbnlTY2VuZS51c2VPcmRlckluZGVwZW5kZW50VHJhbnNwYXJlbmN5ICYmIHRoaXMubmVlZEFscGhhQmxlbmRpbmdGb3JNZXNoKG1lc2gpICYmIGFueVNjZW5lLmRlcHRoUGVlbGluZ1JlbmRlcmVyKSB7XHJcbiAgICAgICAgICAgICAgICBhbnlTY2VuZS5kZXB0aFBlZWxpbmdSZW5kZXJlci5iaW5kKGVmZmVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50SW5mby5zdWJNZXNoID0gc3ViTWVzaDtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tQbHVnaW5FdmVudEJpbmRGb3JTdWJNZXNoKHRoaXMuX2V2ZW50SW5mbyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGlwIHBsYW5lXHJcbiAgICAgICAgICAgIE1hdGVyaWFsSGVscGVyLkJpbmRDbGlwUGxhbmUoZWZmZWN0LCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDb2xvcnNcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXllUG9zaXRpb24oZWZmZWN0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNjZW5lLmdldEVuZ2luZSgpLl9mZWF0dXJlcy5uZWVkVG9BbHdheXNCaW5kVW5pZm9ybUJ1ZmZlcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmVlZFRvQmluZFNjZW5lVWJvID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtdXN0UmViaW5kIHx8ICF0aGlzLmlzRnJvemVuKSB7XHJcbiAgICAgICAgICAgIC8vIExpZ2h0c1xyXG4gICAgICAgICAgICBpZiAoc2NlbmUubGlnaHRzRW5hYmxlZCAmJiAhdGhpcy5fZGlzYWJsZUxpZ2h0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBNYXRlcmlhbEhlbHBlci5CaW5kTGlnaHRzKHNjZW5lLCBtZXNoLCBlZmZlY3QsIGRlZmluZXMsIHRoaXMuX21heFNpbXVsdGFuZW91c0xpZ2h0cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFZpZXdcclxuICAgICAgICAgICAgaWYgKChzY2VuZS5mb2dFbmFibGVkICYmIG1lc2guYXBwbHlGb2cgJiYgc2NlbmUuZm9nTW9kZSAhPT0gU2NlbmUuRk9HTU9ERV9OT05FKSB8fCBtZXNoLnJlY2VpdmVTaGFkb3dzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRWaWV3KGVmZmVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZvZ1xyXG4gICAgICAgICAgICBNYXRlcmlhbEhlbHBlci5CaW5kRm9nUGFyYW1ldGVycyhzY2VuZSwgbWVzaCwgZWZmZWN0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1vcnBoIHRhcmdldHNcclxuICAgICAgICAgICAgaWYgKGRlZmluZXMuTlVNX01PUlBIX0lORkxVRU5DRVJTKSB7XHJcbiAgICAgICAgICAgICAgICBNYXRlcmlhbEhlbHBlci5CaW5kTW9ycGhUYXJnZXRQYXJhbWV0ZXJzKG1lc2gsIGVmZmVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLkJBS0VEX1ZFUlRFWF9BTklNQVRJT05fVEVYVFVSRSkge1xyXG4gICAgICAgICAgICAgICAgbWVzaC5iYWtlZFZlcnRleEFuaW1hdGlvbk1hbmFnZXI/LmJpbmQoZWZmZWN0LCBkZWZpbmVzLklOU1RBTkNFUyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvZy4gZGVwdGhcclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlTG9nYXJpdGhtaWNEZXB0aCkge1xyXG4gICAgICAgICAgICAgICAgTWF0ZXJpYWxIZWxwZXIuQmluZExvZ0RlcHRoKGRlZmluZXMsIGVmZmVjdCwgc2NlbmUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpbWFnZSBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uICYmICF0aGlzLl9pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmFwcGx5QnlQb3N0UHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5iaW5kKHRoaXMuX2FjdGl2ZUVmZmVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE1Ub29uIGJpbmRpbmdzXHJcbiAgICAgICAgICAgIHViby51cGRhdGVGbG9hdCgnYXNwZWN0Jywgc2NlbmUuZ2V0RW5naW5lKCkuZ2V0QXNwZWN0UmF0aW8oc2NlbmUuYWN0aXZlQ2FtZXJhISkpO1xyXG4gICAgICAgICAgICB1Ym8udXBkYXRlRmxvYXQoJ2lzT3V0bGluZScsIHRoaXMuaXNPdXRsaW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMgdmFyaWFibGUgaXMgY29tcGF0aWJsZSB3aXRoIFtVbml0eSdzIF9UaW1lXShodHRwczovL2RvY3MudW5pdHkzZC5jb20vTWFudWFsL1NMLVVuaXR5U2hhZGVyVmFyaWFibGVzLmh0bWwpXHJcbiAgICAgICAgICAgIGNvbnN0IHQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwO1xyXG4gICAgICAgICAgICB1Ym8udXBkYXRlVmVjdG9yNCgndGltZScsIG5ldyBWZWN0b3I0KHQgLyAyMCwgdCwgdCAqIDIsIHQgKiAzKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hZnRlckJpbmQobWVzaCwgdGhpcy5fYWN0aXZlRWZmZWN0KTtcclxuICAgICAgICB1Ym8udXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB7QGluaGVyaXRkb2N9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbmltYXRhYmxlcygpOiBJQW5pbWF0YWJsZVtdIHtcclxuICAgICAgICBjb25zdCByZXN1bHRzOiBJQW5pbWF0YWJsZVtdID0gc3VwZXIuZ2V0QW5pbWF0YWJsZXMoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHRleHR1cmUgb2YgdGhpcy5hcHBlbmRlZEFjdGl2ZVRleHR1cmVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlLmFuaW1hdGlvbnMgJiYgdGV4dHVyZS5hbmltYXRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB7QGluaGVyaXRkb2N9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBY3RpdmVUZXh0dXJlcygpOiBCYXNlVGV4dHVyZVtdIHtcclxuICAgICAgICBjb25zdCBhY3RpdmVUZXh0dXJlcyA9IHN1cGVyLmdldEFjdGl2ZVRleHR1cmVzKCkuY29uY2F0KHRoaXMuYXBwZW5kZWRBY3RpdmVUZXh0dXJlcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBhY3RpdmVUZXh0dXJlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHtAaW5oZXJpdGRvY31cclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhc1RleHR1cmUodGV4dHVyZTogQmFzZVRleHR1cmUpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoc3VwZXIuaGFzVGV4dHVyZSh0ZXh0dXJlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCB0ZXggb2YgdGhpcy5hcHBlbmRlZEFjdGl2ZVRleHR1cmVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXggPT09IHRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHtAaW5oZXJpdGRvY31cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoZm9yY2VEaXNwb3NlRWZmZWN0PzogYm9vbGVhbiwgZm9yY2VEaXNwb3NlVGV4dHVyZXM/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMub3V0bGluZVJlbmRlcmVyO1xyXG4gICAgICAgIGlmIChmb3JjZURpc3Bvc2VUZXh0dXJlcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHR1cmUgb2YgdGhpcy5hcHBlbmRlZEFjdGl2ZVRleHR1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2ltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24gJiYgdGhpcy5faW1hZ2VQcm9jZXNzaW5nT2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5vblVwZGF0ZVBhcmFtZXRlcnMucmVtb3ZlKHRoaXMuX2ltYWdlUHJvY2Vzc2luZ09ic2VydmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoZm9yY2VEaXNwb3NlRWZmZWN0LCBmb3JjZURpc3Bvc2VUZXh0dXJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB7QGluaGVyaXRkb2N9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZShuYW1lOiBzdHJpbmcpOiBNVG9vbk1hdGVyaWFsIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBTZXJpYWxpemF0aW9uSGVscGVyLkNsb25lKCgpID0+IG5ldyBNVG9vbk1hdGVyaWFsKG5hbWUsIHRoaXMuZ2V0U2NlbmUoKSksIHRoaXMpO1xyXG5cclxuICAgICAgICByZXN1bHQubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgcmVzdWx0LmlkID0gbmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGVuY2lsLmNvcHlUbyhyZXN1bHQuc3RlbmNpbCk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB7QGluaGVyaXRkb2N9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgUGFyc2Uoc291cmNlOiBhbnksIHNjZW5lOiBTY2VuZSwgcm9vdFVybDogc3RyaW5nKTogTVRvb25NYXRlcmlhbCB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKCgpID0+IG5ldyBNVG9vbk1hdGVyaWFsKHNvdXJjZS5uYW1lLCBzY2VuZSksIHNvdXJjZSwgc2NlbmUsIHJvb3RVcmwpO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlLnN0ZW5jaWwpIHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuc3RlbmNpbC5wYXJzZShzb3VyY2Uuc3RlbmNpbCwgc2NlbmUsIHJvb3RVcmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54us6Ieq44Oh44K944OD44OJOiDjg4bjgq/jgrnjg4Hjg6Pmg4XloLHjgpLjg5DjgqTjg7Pjg4njgZnjgotcclxuICAgICAqIEBwYXJhbSB0ZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0gZWZmZWN0XHJcbiAgICAgKiBAcGFyYW0gbmFtZVxyXG4gICAgICogQHBhcmFtIGluZm9OYW1lXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuICAgIHByaXZhdGUgYmluZFRleHR1cmUodGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+LCB1Ym86IFVuaWZvcm1CdWZmZXIsIGVmZmVjdDogRWZmZWN0LCBuYW1lOiBzdHJpbmcsIGluZm9OYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRleHR1cmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91bmlmb3JtQnVmZmVyLnVwZGF0ZUZsb2F0MihpbmZvTmFtZSwgdGV4dHVyZS5jb29yZGluYXRlc0luZGV4LCB0ZXh0dXJlLmxldmVsKTtcclxuICAgICAgICBNYXRlcmlhbEhlbHBlci5CaW5kVGV4dHVyZU1hdHJpeCh0ZXh0dXJlLCB1Ym8sIG5hbWUpO1xyXG4gICAgICAgIGVmZmVjdC5zZXRUZXh0dXJlKGAke25hbWV9U2FtcGxlcmAsIHRleHR1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54us6Ieq44Oh44K944OD44OJOiDjg4bjgq/jgrnjg4Hjg6Pjga7nlKjmhI/jgYzntYLjgo/jgaPjgabjgYTjgovjgYvnorroqo3jgZnjgotcclxuICAgICAqIEBwYXJhbSB0ZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0gZGVmaW5lc1xyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICBwcml2YXRlIGlzUmVhZHlGb3JUZXh0dXJlKHRleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiwgZGVmaW5lczogYW55LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGV4dHVyZSkge1xyXG4gICAgICAgICAgICBkZWZpbmVzW2tleV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGV4dHVyZS5pc1JlYWR5T3JOb3RCbG9ja2luZygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTWF0ZXJpYWxIZWxwZXIuUHJlcGFyZURlZmluZXNGb3JNZXJnZWRVVih0ZXh0dXJlLCBkZWZpbmVzLCBrZXkpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54us6Ieq44Oh44K944OD44OJOiDlrprmlbDjgpLoqK3lrprjgZnjgotcclxuICAgICAqL1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG4gICAgcHJpdmF0ZSBhcHBseURlZmluZXMoZGVmaW5lczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9kZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBEZWJ1Z01vZGUuTm9ybWFsOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmluZXMuTVRPT05fREVCVUdfTk9STUFMICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5NVE9PTl9ERUJVR19OT1JNQUwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZXMuTVRPT05fREVCVUdfTElUU0hBREVSQVRFID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5tYXJrQXNVbnByb2Nlc3NlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRGVidWdNb2RlLkxpdFNoYWRlUmF0ZTpcclxuICAgICAgICAgICAgICAgIGlmIChkZWZpbmVzLk1UT09OX0RFQlVHX0xJVFNIQURFUkFURSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZXMuTVRPT05fREVCVUdfTk9STUFMID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5NVE9PTl9ERUJVR19MSVRTSEFERVJBVEUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZXMubWFya0FzVW5wcm9jZXNzZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIERlYnVnTW9kZS5Ob25lOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmluZXMuTVRPT05fREVCVUdfTk9STUFMID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5NVE9PTl9ERUJVR19OT1JNQUwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1VucHJvY2Vzc2VkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmaW5lcy5NVE9PTl9ERUJVR19MSVRTSEFERVJBVEUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLk1UT09OX0RFQlVHX0xJVFNIQURFUkFURSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZXMubWFya0FzVW5wcm9jZXNzZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKHRoaXMub3V0bGluZVdpZHRoTW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIE91dGxpbmVXaWR0aE1vZGUuV29ybGRDb3JyZGluYXRlczpcclxuICAgICAgICAgICAgICAgIGlmIChkZWZpbmVzLk1UT09OX09VVExJTkVfV0lEVEhfV09STEQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLk1UT09OX09VVExJTkVfV0lEVEhfV09STEQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZXMuTVRPT05fT1VUTElORV9XSURUSF9TQ1JFRU4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1VucHJvY2Vzc2VkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBPdXRsaW5lV2lkdGhNb2RlLlNjcmVlbkNvb3JkaW5hdGVzOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmluZXMuTVRPT05fT1VUTElORV9XSURUSF9TQ1JFRU4gIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLk1UT09OX09VVExJTkVfV0lEVEhfV09STEQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLk1UT09OX09VVExJTkVfV0lEVEhfU0NSRUVOID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1VucHJvY2Vzc2VkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBPdXRsaW5lV2lkdGhNb2RlLk5vbmU6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmaW5lcy5NVE9PTl9PVVRMSU5FX1dJRFRIX1NDUkVFTiAhPT0gZmFsc2UgfHwgZGVmaW5lcy5NVE9PTl9PVVRMSU5FX1dJRFRIX1dPUkxEICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZXMuTVRPT05fT1VUTElORV9XSURUSF9TQ1JFRU4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLk1UT09OX09VVExJTkVfV0lEVEhfV09STEQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1VucHJvY2Vzc2VkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm91dGxpbmVDb2xvck1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBPdXRsaW5lQ29sb3JNb2RlLkZpeGVkQ29sb3I6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmaW5lcy5NVE9PTl9PVVRMSU5FX0NPTE9SX0ZJWEVEICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5NVE9PTl9PVVRMSU5FX0NPTE9SX0ZJWEVEID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLk1UT09OX09VVExJTkVfQ09MT1JfTUlYRUQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1VucHJvY2Vzc2VkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBPdXRsaW5lQ29sb3JNb2RlLk1peGVkTGlnaHRpbmc6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmaW5lcy5NVE9PTl9PVVRMSU5FX0NPTE9SX01JWEVEICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5NVE9PTl9PVVRMSU5FX0NPTE9SX0ZJWEVEID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5NVE9PTl9PVVRMSU5FX0NPTE9SX01JWEVEID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1VucHJvY2Vzc2VkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBFbmdpbmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvRW5naW5lcy9lbmdpbmUnO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2gsIF9JbnN0YW5jZXNCYXRjaCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvbWVzaCc7XHJcbmltcG9ydCB0eXBlIHsgU3ViTWVzaCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NZXNoZXMvc3ViTWVzaCc7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tICdAYmFieWxvbmpzL2NvcmUvc2NlbmUnO1xyXG5pbXBvcnQgdHlwZSB7IElTY2VuZUNvbXBvbmVudCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9zY2VuZUNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNjZW5lQ29tcG9uZW50Q29uc3RhbnRzIH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL3NjZW5lQ29tcG9uZW50JztcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS90eXBlcyc7XHJcbmltcG9ydCB0eXBlIHsgTWF0cml4IH0gZnJvbSAnQGJhYnlsb25qcy9jb3JlL01hdGhzL21hdGgnO1xyXG5pbXBvcnQgdHlwZSB7IE1Ub29uTWF0ZXJpYWwgfSBmcm9tICcuL210b29uLW1hdGVyaWFsJztcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gJ0BiYWJ5bG9uanMvY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWwnO1xyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5jb25zdCBCQVNFX05BTUUgPSAnTVRvb25PdXRsaW5lJztcclxuXHJcbi8qKlxyXG4gKiBNVG9vbiBvdXRsaW5lIHJlbmRlcmVyXHJcbiAqIEBzZWUgT3V0bGluZVJlbmRlcmVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTVRvb25PdXRsaW5lUmVuZGVyZXIgaW1wbGVtZW50cyBJU2NlbmVDb21wb25lbnQge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG4gICAgcHVibGljIHN0YXRpYyByZW5kZXJlcklkID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW5naW5lOiBFbmdpbmU7XHJcbiAgICBwcml2YXRlIF9wYXNzSWRGb3JEcmF3V3JhcHBlcjogbnVtYmVyW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogTVRvb25NYXRlcmlhbCDjgZTjgajjgavjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBzY2VuZTogU2NlbmUsIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbDogTVRvb25NYXRlcmlhbCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IGAke0JBU0VfTkFNRX1fJHttYXRlcmlhbC5uYW1lfV8ke01Ub29uT3V0bGluZVJlbmRlcmVyLnJlbmRlcmVySWQrK31gO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuX2FkZENvbXBvbmVudCh0aGlzKTtcclxuICAgICAgICB0aGlzLl9lbmdpbmUgPSB0aGlzLnNjZW5lLmdldEVuZ2luZSgpO1xyXG4gICAgICAgIHRoaXMuX3Bhc3NJZEZvckRyYXdXcmFwcGVyID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxOyArK2kpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFzc0lkRm9yRHJhd1dyYXBwZXJbaV0gPSB0aGlzLl9lbmdpbmUuY3JlYXRlUmVuZGVyUGFzc0lkKGBPdXRsaW5lIFJlbmRlcmVyICgke2l9KWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiDjgrfjg7zjg7Pmj4/nlLvliY3lvozjgavjg6zjg7Pjg4Djg6rjg7PjgrDlh6bnkIbjgpLnmbvpjLLjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZ2lzdGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NlbmUuX2FmdGVyUmVuZGVyaW5nTWVzaFN0YWdlLnJlZ2lzdGVyU3RlcChTY2VuZUNvbXBvbmVudENvbnN0YW50cy5TVEVQX0FGVEVSUkVOREVSSU5HTUVTSF9PVVRMSU5FLCB0aGlzLCB0aGlzLl9hZnRlclJlbmRlcmluZ01lc2gpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYnVpbGQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gTm90aGluZyB0byBkbyBoZXJlLlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wYXNzSWRGb3JEcmF3V3JhcHBlci5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmdpbmUucmVsZWFzZVJlbmRlclBhc3NJZCh0aGlzLl9wYXNzSWRGb3JEcmF3V3JhcHBlcltpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgb3V0bGluZSBpbiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIHN1Yk1lc2ggRGVmaW5lcyB0aGUgc3VtZXNoIHRvIHJlbmRlclxyXG4gICAgICogQHBhcmFtIGJhdGNoIERlZmluZXMgdGhlIGJhdGNoIG9mIG1lc2hlcyBpbiBjYXNlIG9mIGluc3RhbmNlc1xyXG4gICAgICogQHBhcmFtIHJlbmRlclBhc3NJZCBSZW5kZXIgcGFzcyBpZCB0byB1c2UgdG8gcmVuZGVyIHRoZSBtZXNoXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgcHJpdmF0ZSByZW5kZXIoc3ViTWVzaDogU3ViTWVzaCwgYmF0Y2g6IF9JbnN0YW5jZXNCYXRjaCwgcmVuZGVyUGFzc0lkPzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgcmVuZGVyUGFzc0lkID0gcmVuZGVyUGFzc0lkID8/IHRoaXMuX3Bhc3NJZEZvckRyYXdXcmFwcGVyWzBdO1xyXG4gICAgICAgIGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcclxuICAgICAgICBjb25zdCBlZmZlY3QgPSBzdWJNZXNoLmVmZmVjdDtcclxuICAgICAgICBpZiAoIWVmZmVjdCB8fCAhZWZmZWN0LmlzUmVhZHkoKSB8fCAhdGhpcy5zY2VuZS5hY3RpdmVDYW1lcmEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZHJhd1dyYXBwZXIgPSBzdWJNZXNoLl9nZXREcmF3V3JhcHBlcihyZW5kZXJQYXNzSWQsIHRydWUpO1xyXG4gICAgICAgIGlmICghZHJhd1dyYXBwZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkcmF3V3JhcHBlci5zZXRFZmZlY3QoZWZmZWN0KTtcclxuICAgICAgICBpZiAoIWRyYXdXcmFwcGVyLmVmZmVjdCB8fCAhZHJhd1dyYXBwZXIuZWZmZWN0LmlzUmVhZHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvd25lck1lc2ggPSBzdWJNZXNoLmdldE1lc2goKTtcclxuICAgICAgICBjb25zdCByZXBsYWNlbWVudE1lc2ggPSBvd25lck1lc2guX2ludGVybmFsQWJzdHJhY3RNZXNoRGF0YUluZm8uX2FjdEFzUmVndWxhck1lc2ggPyBvd25lck1lc2ggOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IHJlbmRlcmluZ01lc2ggPSBzdWJNZXNoLmdldFJlbmRlcmluZ01lc2goKTtcclxuICAgICAgICBjb25zdCBlZmZlY3RpdmVNZXNoID0gcmVwbGFjZW1lbnRNZXNoID8gcmVwbGFjZW1lbnRNZXNoIDogcmVuZGVyaW5nTWVzaDtcclxuXHJcbiAgICAgICAgaWYgKCFzY2VuZS5hY3RpdmVDYW1lcmEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5hcHBseU91dGxpbmVDdWxsTW9kZSgpO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuZW5hYmxlT3V0bGluZVJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMuX2VuZ2luZS5lbmFibGVFZmZlY3QoZHJhd1dyYXBwZXIpO1xyXG4gICAgICAgIGlmICghdGhpcy5pc0hhcmR3YXJlSW5zdGFuY2VkUmVuZGVyaW5nKHN1Yk1lc2gsIGJhdGNoKSkge1xyXG4gICAgICAgICAgICByZW5kZXJpbmdNZXNoLl9iaW5kKHN1Yk1lc2gsIGVmZmVjdCwgdGhpcy5tYXRlcmlhbC5maWxsTW9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hdGVyaWFsLl9wcmVCaW5kKGVmZmVjdCk7XHJcblxyXG4gICAgICAgIHJlbmRlcmluZ01lc2guX3Byb2Nlc3NSZW5kZXJpbmcoXHJcbiAgICAgICAgICAgIGVmZmVjdGl2ZU1lc2gsXHJcbiAgICAgICAgICAgIHN1Yk1lc2gsXHJcbiAgICAgICAgICAgIGVmZmVjdCxcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbC5maWxsTW9kZSxcclxuICAgICAgICAgICAgYmF0Y2gsXHJcbiAgICAgICAgICAgIHRoaXMuaXNIYXJkd2FyZUluc3RhbmNlZFJlbmRlcmluZyhzdWJNZXNoLCBiYXRjaCksXHJcbiAgICAgICAgICAgIChpc0luc3RhbmNlOiBib29sZWFuLCB3b3JsZDogTWF0cml4LCBlZmZlY3RpdmVNYXRlcmlhbD86IE1hdGVyaWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWZmZWN0aXZlTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVNYXRlcmlhbC5iaW5kRm9yU3ViTWVzaCh3b3JsZCwgZWZmZWN0aXZlTWVzaCBhcyBNZXNoLCBzdWJNZXNoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwucmVzdG9yZU91dGxpbmVDdWxsTW9kZSgpO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuZGlzYWFibGVPdXRsaW5lUmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjgZPjga7jg6Hjg4Pjgrfjg6XjgpLmj4/nlLvjgZfjgZ/lvozjgavlrp/ooYzjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYWZ0ZXJSZW5kZXJpbmdNZXNoKG1lc2g6IE1lc2gsIHN1Yk1lc2g6IFN1Yk1lc2gsIGJhdGNoOiBfSW5zdGFuY2VzQmF0Y2gpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMud2lsbFJlbmRlcihzdWJNZXNoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjdWxsQmFja0ZhY2VzID0gdGhpcy5fZW5naW5lLmN1bGxCYWNrRmFjZXM7XHJcbiAgICAgICAgdGhpcy5fZW5naW5lLmN1bGxCYWNrRmFjZXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlbmRlcihzdWJNZXNoLCBiYXRjaCwgdGhpcy5fcGFzc0lkRm9yRHJhd1dyYXBwZXJbMF0pO1xyXG4gICAgICAgIHRoaXMuX2VuZ2luZS5jdWxsQmFja0ZhY2VzID0gY3VsbEJhY2tGYWNlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOOCpOODs+OCueOCv+ODs+OCt+ODs+OCsOOCkuihjOOBhuOBi+OBqeOBhuOBi1xyXG4gICAgICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICBwcml2YXRlIGlzSGFyZHdhcmVJbnN0YW5jZWRSZW5kZXJpbmcoc3ViTWVzaDogU3ViTWVzaCwgYmF0Y2g6IF9JbnN0YW5jZXNCYXRjaCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5fZW5naW5lLmdldENhcHMoKS5pbnN0YW5jZWRBcnJheXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmF0Y2gudmlzaWJsZUluc3RhbmNlc1tzdWJNZXNoLl9pZF0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGJhdGNoLnZpc2libGVJbnN0YW5jZXNbc3ViTWVzaC5faWRdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3ViTWVzaC5nZXRSZW5kZXJpbmdNZXNoKCkuaGFzVGhpbkluc3RhbmNlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOOBk+OBruODoeODg+OCt+ODpeOBp+OCouOCpuODiOODqeOCpOODs+OCkuaPj+eUu+OBmeOCi+OBi+OBqeOBhuOBi1xyXG4gICAgICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICBwcml2YXRlIHdpbGxSZW5kZXIoc3ViTWVzaDogU3ViTWVzaCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gc3ViTWVzaC5nZXRNYXRlcmlhbCgpIGFzIE51bGxhYmxlPE1Ub29uTWF0ZXJpYWw+O1xyXG5cclxuICAgICAgICBpZiAoIW1hdGVyaWFsIHx8IG1hdGVyaWFsLmdldENsYXNzTmFtZSgpICE9PSAnTVRvb25NYXRlcmlhbCcgfHwgbWF0ZXJpYWwuZ2V0T3V0bGluZVJlbmRlcmVyTmFtZSgpICE9PSB0aGlzLm5hbWUpIHtcclxuICAgICAgICAgICAgLy8g44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44GuIE1hdGVyaWFsIOOBp+OBr+OBquOBhFxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKiBDb3B5cmlnaHQgKGMpIDIwMjEgVGhlIHYzZCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBmaWxlLFxuICogWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5pbXBvcnQge0lTaGFkb3dMaWdodCwgTGlnaHQsXG4gICAgQW5pbWF0aW9ufSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlXCI7XG5pbXBvcnQge0NvbG9yMywgQ29sb3I0LCBRdWF0ZXJuaW9uLCBTaXplLCBWZWN0b3IyLCBWZWN0b3IzIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0lTaGFkb3dMaWdodChsaWdodDogTGlnaHQpIDogbGlnaHQgaXMgSVNoYWRvd0xpZ2h0IHtcbiAgICByZXR1cm4gKGxpZ2h0IGFzIElTaGFkb3dMaWdodCkuc2V0U2hhZG93UHJvamVjdGlvbk1hdHJpeCAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5pbWF0aW9uRGF0YVR5cGUodmFsdWU6IGFueSkge1xuICAgIGxldCBkYXRhVHlwZSA9IHVuZGVmaW5lZDtcblxuICAgIGlmICghaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICYmIGlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FUO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBRdWF0ZXJuaW9uKSB7XG4gICAgICAgIGRhdGFUeXBlID0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfUVVBVEVSTklPTjtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgVmVjdG9yMykge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1ZFQ1RPUjM7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFZlY3RvcjIpIHtcbiAgICAgICAgZGF0YVR5cGUgPSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9WRUNUT1IyO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBDb2xvcjMpIHtcbiAgICAgICAgZGF0YVR5cGUgPSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9DT0xPUjM7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIENvbG9yNCkge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0NPTE9SNDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2l6ZSkge1xuICAgICAgICBkYXRhVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1NJWkU7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFUeXBlID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGF0YVR5cGU7XG4gICAgfVxufVxuIiwiLyoqIENvcHlyaWdodCAoYykgMjAyMSBUaGUgdjNkIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIGZpbGUsXG4gKiBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICovXG5cbmltcG9ydCB7IEFyY1JvdGF0ZUNhbWVyYSB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvQ2FtZXJhcy9hcmNSb3RhdGVDYW1lcmFcIjtcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9zY2VuZVwiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9FbmdpbmVzL2VuZ2luZVwiO1xuaW1wb3J0IHsgU2NlbmVMb2FkZXIgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXJcIjtcbmltcG9ydCB7IENvbG9yMywgQ29sb3I0LCBWZWN0b3IzIH0gZnJvbSBcIkBiYWJ5bG9uanMvY29yZS9NYXRocy9tYXRoXCI7XG5cbmltcG9ydCB7IEdMVEZMb2FkZXJFeHRlbnNpb25PYnNlcnZlciB9IGZyb20gXCIuL2ltcG9ydGVyL2xvYWRlci1vYnNlcnZlclwiO1xuaW1wb3J0IHtcbiAgVlJNRmlsZUxvYWRlcixcbiAgVlJNTG9hZGVyRXh0ZW5zaW9uLFxuICBWUk1NYW5hZ2VyLFxufSBmcm9tIFwiLi9pbXBvcnRlci9iYWJ5bG9uLXZybS1sb2FkZXIvc3JjXCI7XG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSBcIkBiYWJ5bG9uanMvbG9hZGVycy9nbFRGLzIuMFwiO1xuaW1wb3J0IHsgSGVtaXNwaGVyaWNMaWdodCB9IGZyb20gXCJAYmFieWxvbmpzL2NvcmUvTGlnaHRzL2hlbWlzcGhlcmljTGlnaHRcIjtcbmltcG9ydCB7XG4gIEFuaW1hdGlvbixcbiAgQW5pbWF0YWJsZSxcbiAgQ2FtZXJhLFxuICBEZWZhdWx0UmVuZGVyaW5nUGlwZWxpbmUsXG4gIEV2ZW50U3RhdGUsXG4gIElTaGFkb3dMaWdodCxcbiAgU2hhZG93R2VuZXJhdG9yLFxuICBEZXB0aE9mRmllbGRFZmZlY3RCbHVyTGV2ZWwsXG4gIElBbmltYXRpb25LZXksXG4gIEVhc2luZ0Z1bmN0aW9uLFxuICBOdWxsYWJsZSxcbiAgU2NlbmVPcHRpbWl6ZXJPcHRpb25zLFxufSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlXCI7XG5pbXBvcnQgeyBnZXRBbmltYXRpb25EYXRhVHlwZSwgaXNJU2hhZG93TGlnaHQgfSBmcm9tIFwiLi91dGlsaXRpZXMvdHlwZXNcIjtcbmltcG9ydCB7IFYzRFNjZW5lT3B0aW1pemVyIH0gZnJvbSBcIi4vc2NlbmUvb3B0aW1pemVyXCI7XG5pbXBvcnQgeyB2M0RTa3lCb3ggfSBmcm9tIFwiLi9zY2VuZS9za3lib3hcIjtcbmltcG9ydCB7IERpcmVjdGlvbmFsTGlnaHQgfSBmcm9tIFwiQGJhYnlsb25qcy9jb3JlL0xpZ2h0cy9kaXJlY3Rpb25hbExpZ2h0XCI7XG5cbmV4cG9ydCBjbGFzcyBWM0RDb3JlIGltcGxlbWVudHMgR0xURkxvYWRlckV4dGVuc2lvbk9ic2VydmVyIHtcbiAgcHVibGljIHN0YXRpYyBGUkFNRVJBVEUgPSA2MDtcblxuICAvKipcbiAgICogR0xURkZpbGVMb2FkZXIgcGx1Z2luIGZhY3RvcnlcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3ZybUZpbGVMb2FkZXIgPSBuZXcgVlJNRmlsZUxvYWRlcigpO1xuXG4gIC8vIFdoZXRoZXIgc3RhcnRzIHNwcmluZyBib25lcyBhbmltYXRpb24gYXV0b21hdGljYWxseVxuICBwcml2YXRlIF9zcHJpbmdCb25lc0F1dG9VcGRhdGUgPSB0cnVlO1xuICBnZXQgc3ByaW5nQm9uZXNBdXRvVXBkYXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zcHJpbmdCb25lc0F1dG9VcGRhdGU7XG4gIH1cbiAgc2V0IHNwcmluZ0JvbmVzQXV0b1VwZGF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3NwcmluZ0JvbmVzQXV0b1VwZGF0ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoYWRvdyBnZW5lcmF0b3JzXG4gICAqL1xuICBwcml2YXRlIF9zaGFkb3dHZW5lcmF0b3JzOiBNYXA8SVNoYWRvd0xpZ2h0LCBTaGFkb3dHZW5lcmF0b3I+ID0gbmV3IE1hcDxcbiAgICBJU2hhZG93TGlnaHQsXG4gICAgU2hhZG93R2VuZXJhdG9yXG4gID4oKTtcblxuICAvKipcbiAgICogU2NlbmUgb3B0aW1pemVyXG4gICAqL1xuICBwcml2YXRlIF9zY2VuZU9wdGltaXplcjogVjNEU2NlbmVPcHRpbWl6ZXI7XG5cbiAgLyoqXG4gICAqIFJlbmRlcmluZyBwaXBlbGluZVxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfcmVuZGVyaW5nUGlwZWxpbmU6IERlZmF1bHRSZW5kZXJpbmdQaXBlbGluZTtcbiAgZ2V0IHJlbmRlcmluZ1BpcGVsaW5lKCk6IERlZmF1bHRSZW5kZXJpbmdQaXBlbGluZSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrcyB3aGVuIGxvYWRpbmcgaXMgZG9uZVxuICAgKi9cbiAgcHJpdmF0ZSBfb25Mb2FkQ29tcGxldGVDYWxsYmFja3M6IEZ1bmN0aW9uW10gPSBbXTtcbiAgcHVibGljIGFkZE9uTG9hZENvbXBsZXRlQ2FsbGJhY2tzKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZU9uTG9hZENvbXBsZXRlQ2FsbGJhY2soY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5fb25Mb2FkQ29tcGxldGVDYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZXNldE9uTG9hZENvbXBsZXRlQ2FsbGJhY2tzKCkge1xuICAgIHRoaXMuX29uTG9hZENvbXBsZXRlQ2FsbGJhY2tzID0gW107XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVSZW5kZXJGdW5jOiAoXG4gICAgZXZlbnREYXRhOiBTY2VuZSxcbiAgICBldmVudFN0YXRlOiBFdmVudFN0YXRlXG4gICkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBwcml2YXRlIF9hZnRlclJlbmRlckZ1bmM6IChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB2b2lkID1cbiAgICAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IG1hbmFnZXIgb2YgdGhpcy5sb2FkZWRWUk1NYW5hZ2Vycykge1xuICAgICAgICBpZiAodGhpcy5fc3ByaW5nQm9uZXNBdXRvVXBkYXRlKVxuICAgICAgICAgIG1hbmFnZXIudXBkYXRlKHRoaXMuZW5naW5lLmdldERlbHRhVGltZSgpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIHB1YmxpYyB1cGRhdGVCZWZvcmVSZW5kZXJGdW5jdGlvbihcbiAgICBmdW5jOiAoZXZlbnREYXRhOiBTY2VuZSwgZXZlbnRTdGF0ZTogRXZlbnRTdGF0ZSkgPT4gdm9pZFxuICApIHtcbiAgICB0aGlzLl9iZWZvcmVSZW5kZXJGdW5jID0gZnVuYztcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVBZnRlclJlbmRlckZ1bmN0aW9uKFxuICAgIGZ1bmM6IChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB2b2lkXG4gICkge1xuICAgIHRoaXMuX2FmdGVyUmVuZGVyRnVuYyA9IGZ1bmM7XG4gIH1cblxuICBwcml2YXRlIF9jYW1lcmFPbkJlZm9yZVJlbmRlckZ1bmM6IEZ1bmN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfbWFpbkNhbWVyYTogQ2FtZXJhO1xuICBnZXQgbWFpbkNhbWVyYSgpOiBDYW1lcmEge1xuICAgIHJldHVybiB0aGlzLl9tYWluQ2FtZXJhO1xuICB9XG4gIHNldCBtYWluQ2FtZXJhKHZhbHVlOiBDYW1lcmEpIHtcbiAgICB0aGlzLl9tYWluQ2FtZXJhID0gdmFsdWU7XG4gIH1cblxuICAvLyogVE9ETzogUGF0Y2hlZC5cbiAgLy8gcHVibGljIHNreUJveDogdjNEU2t5Qm94ID0gbnVsbDtcbiAgcHVibGljIHNreUJveDogdjNEU2t5Qm94O1xuXG4gIC8qKlxuICAgKiBMb2FkZWQgVlJNIE1hbmFnZXJzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwdWJsaWMgbG9hZGVkVlJNTWFuYWdlcnM6IFZSTU1hbmFnZXJbXSA9IFtdO1xuICBwdWJsaWMgYWRkVlJNTWFuYWdlcihtYW5hZ2VyOiBWUk1NYW5hZ2VyKSB7XG4gICAgaWYgKG1hbmFnZXIpIHRoaXMubG9hZGVkVlJNTWFuYWdlcnMucHVzaChtYW5hZ2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgVlJNIE1hbmFnZXIgYnkgaW5kZXhcbiAgICogQHBhcmFtIGlkeFxuICAgKi9cbiAgcHVibGljIGdldFZSTU1hbmFnZXJCeUluZGV4KGlkeDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGlkeCA+PSAwICYmIGlkeCA8IHRoaXMubG9hZGVkVlJNTWFuYWdlcnMubGVuZ3RoXG4gICAgICA/IHRoaXMubG9hZGVkVlJNTWFuYWdlcnNbaWR4XVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBWUk0gTWFuYWdlciBieSBVUklcbiAgICogVlJNIGRvZXNuJ3QgaGF2ZSBhbnkgVUlEIGluIG1ldGFkYXRhLiBUaXRsZSBjYW4gYmUgdW5maWxsZWQgdG9vLlxuICAgKiBGaWxlbmFtZSBpcyB0aGUgb25seSByZWFzb25hYmxlIElELlxuICAgKiBAcGFyYW0gdXJpXG4gICAqL1xuICAvLyBWUk0gZG9lc24ndCBoYXZlIGFueSBVSUQgaW4gbWV0YWRhdGEuIFRpdGxlIGNhbiBiZSB1bmZpbGxlZCB0b28uXG4gIC8vIEZpbGVuYW1lIGlzIHRoZSBvbmx5IHJlYXNvbmFibGUgSUQuXG4gIHB1YmxpYyBnZXRWUk1NYW5hZ2VyQnlVUkkodXJpOiBTdHJpbmcpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNhbGwgZ2V0VlJNTWFuYWdlckJ5VVJJKClcIik7XG4gICAgLy8gY29uc29sZS5sb2coXCJ1cmk6IFwiLCB1cmkpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcy5sb2FkZWRWUk1NYW5hZ2VyczogXCIsIHRoaXMubG9hZGVkVlJNTWFuYWdlcnMpO1xuXG4gICAgZm9yIChjb25zdCBtYW5hZ2VyIG9mIHRoaXMubG9hZGVkVlJNTWFuYWdlcnMpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibWFuYWdlcjogXCIsIG1hbmFnZXIpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJtYW5hZ2VyLnVyaTogXCIsIG1hbmFnZXIudXJpKTtcblxuICAgICAgaWYgKG1hbmFnZXIudXJpID09PSB1cmkpIHJldHVybiBtYW5hZ2VyO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICByZWFkb25seSBlbmdpbmU6IEVuZ2luZSxcbiAgICAvLyogVE9ETzogUGF0Y2hlZC5cbiAgICAvLyBwdWJsaWMgc2NlbmU/OiBTY2VuZSxcbiAgICBwdWJsaWMgc2NlbmU6IFNjZW5lLFxuICAgIGNhbWVyYT86IENhbWVyYVxuICApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNhbGwgY29uc3RydWN0b3IoKVwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImVuZ2luZTogXCIsIGVuZ2luZSk7XG4gICAgLy8gY29uc29sZS5sb2coXCJzY2VuZTogXCIsIHNjZW5lKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNhbWVyYTogXCIsIGNhbWVyYSk7XG5cbiAgICAvLyBSZWdpc3RlclxuICAgIHRoaXMucmVnaXN0ZXJWcm1QbHVnaW4oKTtcbiAgICB0aGlzLnJlZ2lzdGVyVnJtRXh0ZW5zaW9uKCk7XG5cbiAgICBpZiAoIXRoaXMuc2NlbmUpIHRoaXMuc2NlbmUgPSBuZXcgU2NlbmUodGhpcy5lbmdpbmUpO1xuICAgIGVsc2UgdGhpcy5lbmdpbmUgPSB0aGlzLnNjZW5lLmdldEVuZ2luZSgpO1xuXG4gICAgdGhpcy5zZXR1cE9ic2VydmFibGUoKTtcbiAgICB0aGlzLmVuYWJsZVJlc2l6ZSgpO1xuXG4gICAgaWYgKGNhbWVyYSkge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJjYW1lcmE6IFwiLCBjYW1lcmEpO1xuICAgICAgdGhpcy5fbWFpbkNhbWVyYSA9IGNhbWVyYTtcbiAgICAgIHRoaXMuc2NlbmUuc3dpdGNoQWN0aXZlQ2FtZXJhKGNhbWVyYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ2FtZXJhKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVuZGVyaW5nUGlwZWxpbmUgPSBuZXcgRGVmYXVsdFJlbmRlcmluZ1BpcGVsaW5lKFxuICAgICAgXCJkZWZhdWx0UGlwZWxpbmVcIiwgLy8gVGhlIG5hbWUgb2YgdGhlIHBpcGVsaW5lXG4gICAgICB0cnVlLCAvLyBEbyB5b3Ugd2FudCB0aGUgcGlwZWxpbmUgdG8gdXNlIEhEUiB0ZXh0dXJlP1xuICAgICAgdGhpcy5zY2VuZSwgLy8gVGhlIHNjZW5lIGluc3RhbmNlXG4gICAgICBbdGhpcy5fbWFpbkNhbWVyYV0gLy8gVGhlIGxpc3Qgb2YgY2FtZXJhcyB0byBiZSBhdHRhY2hlZCB0b1xuICAgICk7XG4gICAgdGhpcy5zZXR1cFJlbmRlcmluZ1BpcGVsaW5lKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBiYWNrZ3JvdW5kIHRyYW5zcGFyZW50LlxuICAgKi9cbiAgcHVibGljIHRyYW5zcGFyZW50QmFja2dyb3VuZCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNhbGwgdHJhbnNwYXJlbnRCYWNrZ3JvdW5kKClcIik7XG5cbiAgICB0aGlzLnNjZW5lLmNsZWFyQ29sb3IuYSA9IDA7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBiYWNrZ3JvdW5kIHNvbGlkLlxuICAgKi9cbiAgcHVibGljIHNvbGlkQmFja2dyb3VuZCgpIHtcbiAgICB0aGlzLnNjZW5lLmNsZWFyQ29sb3IuYSA9IDE7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIGJhY2tncm91bmQgY29sb3IuXG4gICAqIEBwYXJhbSBjb2xvclxuICAgKi9cbiAgcHVibGljIHNldEJhY2tncm91bmRDb2xvcihjb2xvcjogQ29sb3IzKSB7XG4gICAgdGhpcy5zY2VuZS5jbGVhckNvbG9yID0gQ29sb3I0LkZyb21Db2xvcjMoXG4gICAgICBjb2xvcixcbiAgICAgIHRoaXMuc2NlbmUuY2xlYXJDb2xvci5hXG4gICAgKS50b0xpbmVhclNwYWNlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGJhY2tncm91bmQgY29sb3IgZnJvbSBoZXggc3RyaW5nLlxuICAgKiBAcGFyYW0gaGV4IEhleCBjb2xvciBzdHJpbmdcbiAgICovXG4gIHB1YmxpYyBzZXRCYWNrZ3JvdW5kQ29sb3JIZXgoaGV4OiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldEJhY2tncm91bmRDb2xvcihDb2xvcjMuRnJvbUhleFN0cmluZyhoZXgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gYW1iaWVudCBsaWdodC5cbiAgICogQHBhcmFtIGNvbG9yIGNvbG9yIG9mIHRoZSBsaWdodFxuICAgKi9cbiAgcHVibGljIGFkZEFtYmllbnRMaWdodChjb2xvcj86IENvbG9yMykge1xuICAgIGNvbnN0IGxpZ2h0ID0gbmV3IEhlbWlzcGhlcmljTGlnaHQoXG4gICAgICBcIlYzREhlbWlMaWdodFwiLFxuICAgICAgbmV3IFZlY3RvcjMoMCwgMSwgMSksXG4gICAgICB0aGlzLnNjZW5lXG4gICAgKTtcbiAgICBpZiAoY29sb3IpIGxpZ2h0LmRpZmZ1c2UgPSBjb2xvcjtcbiAgICBsaWdodC5zZXRFbmFibGVkKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGJhc2ljIGFyYyByb3RhdGUgY2FtZXJhIHRvIHNjZW5lLlxuICAgKiBUT0RPOiB0aGVyZSBzZWVtcyB0byBiZSBhIGJ1ZyB3aGVuIG1lc2hlcyBhcmUgbmVhciB0aGUgZWRnZSBvZiBjYW1lcmEgY29uZVxuICAgKiBQcm9iYWJseSBoYXMgc29tZXRoaW5nIHRvIGRvIHdpdGggY3VsbGluZ1xuICAgKiBAcGFyYW0gcmFkaXVzIHJvdGF0aW9uIHJhZGl1c1xuICAgKi9cbiAgcHJpdmF0ZSBhZGRDYW1lcmEocmFkaXVzOiBudW1iZXIgPSAzKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJjYWxsIGFkZENhbWVyYSgpXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwicmFkaXVzOiBcIiwgcmFkaXVzKTtcblxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBBcmNSb3RhdGVDYW1lcmEoXG4gICAgICBcIlYzRE1haW5DYW1lcmFcIixcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgcmFkaXVzLFxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXG4gICAgICB0aGlzLnNjZW5lLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgY2FtZXJhLmxvd2VyUmFkaXVzTGltaXQgPSAwLjE7XG4gICAgY2FtZXJhLnVwcGVyUmFkaXVzTGltaXQgPSAyMDtcbiAgICBjYW1lcmEud2hlZWxEZWx0YVBlcmNlbnRhZ2UgPSAwLjA1O1xuICAgIGNhbWVyYS5taW5aID0gMDtcbiAgICBjYW1lcmEuc2V0UG9zaXRpb24obmV3IFZlY3RvcjMoMCwgMS41LCAtNSkpO1xuICAgIGNhbWVyYS5hdHRhY2hDb250cm9sKHRoaXMuZW5naW5lLmdldFJlbmRlcmluZ0NhbnZhcygpKTtcblxuICAgIHRoaXMuX21haW5DYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy5zY2VuZS5zd2l0Y2hBY3RpdmVDYW1lcmEodGhpcy5fbWFpbkNhbWVyYSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgYXJjIHJvdGF0ZSBmb2xsb3dpbmcgY2FtZXJhIHRvIFZSTSBtb2RlbC5cbiAgICogUHJvYmFibHkgaGFzIHNvbWV0aGluZyB0byBkbyB3aXRoIGN1bGxpbmdcbiAgICogQHBhcmFtIG1hbmFnZXIgVlJNIE1hbmFnZXIgdG8gYXR0YWNoIHRoZSBjYW1lcmEgdG9cbiAgICogQHBhcmFtIHJhZGl1cyByb3RhdGlvbiByYWRpdXNcbiAgICovXG4gIHB1YmxpYyBhdHRhY2hDYW1lcmFUbyhtYW5hZ2VyOiBWUk1NYW5hZ2VyLCByYWRpdXM6IG51bWJlciA9IDMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNhbGwgYXR0YWNoQ2FtZXJhVG8oKVwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1hbmFnZXI6IFwiLCBtYW5hZ2VyKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInJhZGl1czogXCIsIHJhZGl1cyk7XG5cbiAgICBjb25zdCBjYW1lcmEgPSBuZXcgQXJjUm90YXRlQ2FtZXJhKFxuICAgICAgXCJWM0RBcmNDYW1lcmFcIiArIG1hbmFnZXIuY2FtZXJhcy5sZW5ndGgsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHJhZGl1cyxcbiAgICAgIG1hbmFnZXIucm9vdE1lc2gucG9zaXRpb24sXG4gICAgICB0aGlzLnNjZW5lLFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjYW1lcmEubG93ZXJSYWRpdXNMaW1pdCA9IDAuMTtcbiAgICBjYW1lcmEudXBwZXJSYWRpdXNMaW1pdCA9IDIwO1xuICAgIGNhbWVyYS53aGVlbERlbHRhUGVyY2VudGFnZSA9IDAuMDU7XG4gICAgY2FtZXJhLm1pblogPSAwO1xuICAgIGNhbWVyYS5zZXRQb3NpdGlvbihuZXcgVmVjdG9yMygwLCAxLjUsIC01KSk7XG4gICAgY2FtZXJhLnNldFRhcmdldChtYW5hZ2VyLnJvb3RNZXNoLmdldEFic29sdXRlUG9zaXRpb24oKSk7XG4gICAgY2FtZXJhLmF0dGFjaENvbnRyb2wodGhpcy5lbmdpbmUuZ2V0UmVuZGVyaW5nQ2FudmFzKCkpO1xuXG4gICAgbWFuYWdlci5hcHBlbmRDYW1lcmEoY2FtZXJhKTtcblxuICAgIHRoaXMuX2NhbWVyYU9uQmVmb3JlUmVuZGVyRnVuYy5wdXNoKCgpID0+IHtcbiAgICAgIGNhbWVyYS5zZXRUYXJnZXQobWFuYWdlci5yb290TWVzaC5nZXRBYnNvbHV0ZVBvc2l0aW9uKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIENyZWF0ZSBhIHNreWJveCBmb3IgdGhlIHNjZW5lLlxuICAgKiBAcGFyYW0gc2l6ZSBzaXplIG9mIHRoZSBza3lib3hcbiAgICogQHBhcmFtIHRleHR1cmVOYW1lIHBhdGggdG8gc2t5Ym94IHRleHR1cmVcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVTa3lCb3goc2l6ZTogbnVtYmVyLCB0ZXh0dXJlTmFtZT86IHN0cmluZykge1xuICAgIGlmICghdGhpcy5za3lCb3gpIHtcbiAgICAgIHRoaXMuc2t5Qm94ID0gbmV3IHYzRFNreUJveChcbiAgICAgICAgdGhpcy5zY2VuZSxcbiAgICAgICAgdGV4dHVyZU5hbWUgPyB0ZXh0dXJlTmFtZSA6IFwidGV4dHVyZS9za3lib3hcIixcbiAgICAgICAgc2l6ZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW5hYmxlIHNoYWRvdyBjYXN0ZXIgZm9yIGxpZ2h0LlxuICAgKiBAcGFyYW0gbGlnaHQgTGlnaHQgdG8gZW5hYmxlIHNoYWRvd3MuXG4gICAqL1xuICBwdWJsaWMgZW5hYmxlU2hhYm93cyhsaWdodD86IElTaGFkb3dMaWdodCkge1xuICAgIGlmIChsaWdodCkge1xuICAgICAgaWYgKCF0aGlzLl9zaGFkb3dHZW5lcmF0b3JzLmhhcyhsaWdodCkpIHtcbiAgICAgICAgY29uc3Qgc2hhZG93R2VuZXJhdG9yID0gbmV3IFNoYWRvd0dlbmVyYXRvcigxMDI0LCBsaWdodCk7XG4gICAgICAgIHRoaXMuc2V0dXBTaGFkb3dHZW5lcmF0b3Ioc2hhZG93R2VuZXJhdG9yKTtcbiAgICAgICAgdGhpcy5fc2hhZG93R2VuZXJhdG9ycy5zZXQobGlnaHQsIHNoYWRvd0dlbmVyYXRvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJMaWdodCBcIiArIGxpZ2h0Lm5hbWUgKyBcIiBhbHJlYWR5IGhhcyBhIHNoYWRvdyBnZW5lcmF0b3IhXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChjb25zdCBsIG9mIHRoaXMuc2NlbmUubGlnaHRzKSB7XG4gICAgICAgIGlmIChpc0lTaGFkb3dMaWdodChsKSkge1xuICAgICAgICAgIGNvbnN0IHNoYWRvd0dlbmVyYXRvciA9IG5ldyBTaGFkb3dHZW5lcmF0b3IoMTAyNCwgbCk7XG4gICAgICAgICAgdGhpcy5zZXR1cFNoYWRvd0dlbmVyYXRvcihzaGFkb3dHZW5lcmF0b3IpO1xuICAgICAgICAgIHRoaXMuX3NoYWRvd0dlbmVyYXRvcnMuc2V0KGwsIHNoYWRvd0dlbmVyYXRvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvcnJlc3BvbmRpbmcgc2hhZG93IGdlbmVyYXRvciBmb3IgbGlnaHQuXG4gICAqIEBwYXJhbSBsaWdodCBMaWdodCB0byBnZXQgc2hhZG93IGdlbmVyYXRvclxuICAgKi9cbiAgLy8qIFRPRE86IFBhdGNoZWQuXG4gIC8vIHB1YmxpYyBnZXRTaGFkb3duR2VuZXJhdG9yKGxpZ2h0OiBJU2hhZG93TGlnaHQpOiBOdWxsYWJsZTxTaGFkb3dHZW5lcmF0b3I+IHtcbiAgcHVibGljIGdldFNoYWRvd25HZW5lcmF0b3IobGlnaHQ6IElTaGFkb3dMaWdodCk6IFNoYWRvd0dlbmVyYXRvciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3NoYWRvd0dlbmVyYXRvcnMuZ2V0KGxpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBmdW5jdGlvbiBmb3Igc3RhcnRpbmcgYW5pbWF0aW9uXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIHByb3BlcnR5XG4gICAqIEBwYXJhbSBkdXJhdGlvblxuICAgKiBAcGFyYW0gZnJvbVxuICAgKiBAcGFyYW0gdG9cbiAgICogQHBhcmFtIGxvb3BNb2RlXG4gICAqIEBwYXJhbSBlYXNpbmdGdW5jdGlvblxuICAgKiBAcGFyYW0gZWFzaW5nTW9kZVxuICAgKi9cbiAgcHVibGljIHN0YXJ0UXVpY2tBbmltYXRpb24oXG4gICAgdGFyZ2V0OiBhbnksXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHByb3BlcnR5OiBzdHJpbmcsXG4gICAgZHVyYXRpb246IG51bWJlcixcbiAgICBmcm9tOiBhbnksXG4gICAgdG86IGFueSxcbiAgICBsb29wTW9kZT86IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBlYXNpbmdGdW5jdGlvbj86IEVhc2luZ0Z1bmN0aW9uLFxuICAgIGVhc2luZ01vZGU/OiBudW1iZXJcbiAgKTogQW5pbWF0YWJsZSB7XG4gICAgY29uc3QgYW5pbSA9IHRoaXMuY3JlYXRlQW5pbWF0aW9uKFxuICAgICAgdGFyZ2V0LFxuICAgICAgbmFtZSxcbiAgICAgIHByb3BlcnR5LFxuICAgICAgW1xuICAgICAgICB7IGZyYW1lOiAwLCB2YWx1ZTogZnJvbSB9LFxuICAgICAgICB7IGZyYW1lOiBkdXJhdGlvbiwgdmFsdWU6IHRvIH0sXG4gICAgICBdLFxuICAgICAgbG9vcE1vZGUsXG4gICAgICBlYXNpbmdGdW5jdGlvbixcbiAgICAgIGVhc2luZ01vZGVcbiAgICApO1xuICAgIHJldHVybiB0aGlzLnNjZW5lLmJlZ2luRGlyZWN0QW5pbWF0aW9uKFxuICAgICAgYW5pbVswXSxcbiAgICAgIFthbmltWzFdXSxcbiAgICAgIDAsXG4gICAgICBkdXJhdGlvbixcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYW5pbWF0aW9uXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIHByb3BlcnR5XG4gICAqIEBwYXJhbSBrZXlGcmFtZXNcbiAgICogQHBhcmFtIGxvb3BNb2RlXG4gICAqIEBwYXJhbSBlYXNpbmdGdW5jdGlvblxuICAgKiBAcGFyYW0gZWFzaW5nTW9kZVxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUFuaW1hdGlvbihcbiAgICB0YXJnZXQ6IGFueSxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcHJvcGVydHk6IHN0cmluZyxcbiAgICBrZXlGcmFtZXM6IEFycmF5PElBbmltYXRpb25LZXk+LFxuICAgIGxvb3BNb2RlPzogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGVhc2luZ0Z1bmN0aW9uPzogRWFzaW5nRnVuY3Rpb24sXG4gICAgZWFzaW5nTW9kZT86IG51bWJlclxuICApOiBbYW55LCBBbmltYXRpb25dIHtcbiAgICAvLyBNYWtlIHN1cmUga2V5RnJhbWVzIGlzIG5vdCBlbXB0eVxuICAgIGlmIChrZXlGcmFtZXMubGVuZ3RoIDwgMSkgdGhyb3cgRXJyb3IoXCJLZXkgRnJhbWVzIGVtcHR5XCIpO1xuXG4gICAgLy8gR2V0IGRhdGEgdHlwZVxuICAgIGNvbnN0IGRhdGFUeXBlID0gZ2V0QW5pbWF0aW9uRGF0YVR5cGUoa2V5RnJhbWVzWzBdLnZhbHVlKTtcbiAgICBpZiAoZGF0YVR5cGUgPT09IG51bGwpXG4gICAgICB0aHJvdyBFcnJvcihcIkNhbm5vdCBkZXRlcm1pbmUgZGF0YSB0eXBlIGZyb20ga2V5ZnJhbWVzIVwiKTtcblxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24oXG4gICAgICBuYW1lLFxuICAgICAgcHJvcGVydHksXG4gICAgICBWM0RDb3JlLkZSQU1FUkFURSxcbiAgICAgIGRhdGFUeXBlLFxuICAgICAgbG9vcE1vZGVcbiAgICApO1xuICAgIGFuaW1hdGlvbi5zZXRLZXlzKGtleUZyYW1lcyk7XG5cbiAgICBpZiAoZWFzaW5nRnVuY3Rpb24pIHtcbiAgICAgIGlmIChlYXNpbmdNb2RlKSBlYXNpbmdGdW5jdGlvbi5zZXRFYXNpbmdNb2RlKGVhc2luZ01vZGUpO1xuICAgICAgYW5pbWF0aW9uLnNldEVhc2luZ0Z1bmN0aW9uKGVhc2luZ0Z1bmN0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3RhcmdldCwgYW5pbWF0aW9uXTtcbiAgfVxuXG4gIHB1YmxpYyBlbmFibGVPcHRpbWl6ZXIob3B0aW9ucz86IFNjZW5lT3B0aW1pemVyT3B0aW9ucykge1xuICAgIHRoaXMuX3NjZW5lT3B0aW1pemVyID0gbmV3IFYzRFNjZW5lT3B0aW1pemVyKHRoaXMuc2NlbmUsIG9wdGlvbnMpO1xuICB9XG5cbiAgLy8gRG9uJ3QgbWFrZSB3cmFwcGVycyBzdGF0aWMsIHNvIHBsdWdpbnMgd2lsbCBhbHdheXMgYmUgcmVnaXN0ZXJlZFxuICAvKipcbiAgICogV3JhcHBlciBmb3IgU2NlbmVMb2FkZXIuQXBwZW5kQXN5bmMuXG4gICAqIEBwYXJhbSByb290VXJsIGEgc3RyaW5nIHRoYXQgZGVmaW5lcyB0aGUgcm9vdCB1cmwgZm9yIHRoZSBzY2VuZSBhbmQgcmVzb3VyY2VzIG9yIHRoZSBjb25jYXRlbmF0aW9uIG9mIHJvb3RVUkwgYW5kIGZpbGVuYW1lXG4gICAqIEBwYXJhbSBzY2VuZUZpbGVuYW1lIGEgc3RyaW5nIHRoYXQgZGVmaW5lcyB0aGUgbmFtZSBvZiB0aGUgc2NlbmUgZmlsZSBvciBzdGFydHMgd2l0aCBcImRhdGE6XCIgZm9sbG93aW5nIGJ5IHRoZSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSBzY2VuZSBvciBhIEZpbGUgb2JqZWN0IChkZWZhdWx0OiBlbXB0eSBzdHJpbmcpXG4gICAqL1xuICBwdWJsaWMgQXBwZW5kQXN5bmMoXG4gICAgcm9vdFVybDogc3RyaW5nLFxuICAgIHNjZW5lRmlsZW5hbWU/OiBzdHJpbmcgfCBGaWxlXG4gICk6IFByb21pc2U8U2NlbmU+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNhbGwgQXBwZW5kQXN5bmNcIik7XG5cbiAgICByZXR1cm4gU2NlbmVMb2FkZXIuQXBwZW5kQXN5bmMocm9vdFVybCwgc2NlbmVGaWxlbmFtZSwgdGhpcy5zY2VuZSk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBmb3IgU2NlbmVMb2FkZXIuTG9hZEFzeW5jXG4gICAqIEBwYXJhbSByb290VXJsIGEgc3RyaW5nIHRoYXQgZGVmaW5lcyB0aGUgcm9vdCB1cmwgZm9yIHRoZSBzY2VuZSBhbmQgcmVzb3VyY2VzIG9yIHRoZSBjb25jYXRlbmF0aW9uIG9mIHJvb3RVUkwgYW5kIGZpbGVuYW1lXG4gICAqIEBwYXJhbSBzY2VuZUZpbGVuYW1lIGEgc3RyaW5nIHRoYXQgZGVmaW5lcyB0aGUgbmFtZSBvZiB0aGUgc2NlbmUgZmlsZSBvciBzdGFydHMgd2l0aCBcImRhdGE6XCIgZm9sbG93aW5nIGJ5IHRoZSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSBzY2VuZSBvciBhIEZpbGUgb2JqZWN0IChkZWZhdWx0OiBlbXB0eSBzdHJpbmcpXG4gICAqL1xuICBwdWJsaWMgTG9hZEFzeW5jKFxuICAgIHJvb3RVcmw6IHN0cmluZyxcbiAgICBzY2VuZUZpbGVuYW1lPzogc3RyaW5nIHwgRmlsZVxuICApOiBQcm9taXNlPFNjZW5lPiB7XG4gICAgcmV0dXJuIFNjZW5lTG9hZGVyLkxvYWRBc3luYyhyb290VXJsLCBzY2VuZUZpbGVuYW1lLCB0aGlzLmVuZ2luZSk7XG4gIH1cblxuICAvLyBHTFRGTG9hZGVyRXh0ZW5zaW9uT2JzZXJ2ZXJcbiAgcHVibGljIG9uTG9hZFJlYWR5KCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiY2FsbCBvbkxvYWRSZWFkeSgpXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKFxuICAgIC8vICAgXCJ0aGlzLl9vbkxvYWRDb21wbGV0ZUNhbGxiYWNrczogXCIsXG4gICAgLy8gICB0aGlzLl9vbkxvYWRDb21wbGV0ZUNhbGxiYWNrc1xuICAgIC8vICk7XG5cbiAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5fb25Mb2FkQ29tcGxldGVDYWxsYmFja3MpIHtcbiAgICAgIGYoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVwIGZvciB0aW1lIHVwZGF0ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgc2V0dXBPYnNlcnZhYmxlKCkge1xuICAgIHRoaXMuc2NlbmUub25CZWZvcmVSZW5kZXJPYnNlcnZhYmxlLmFkZChcbiAgICAgIChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB7XG4gICAgICAgIHRoaXMuX2JlZm9yZVJlbmRlckZ1bmMoZXZlbnREYXRhLCBldmVudFN0YXRlKTtcbiAgICAgIH1cbiAgICApO1xuICAgIC8vIENhbWVyYVxuICAgIHRoaXMuc2NlbmUub25CZWZvcmVSZW5kZXJPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5fY2FtZXJhT25CZWZvcmVSZW5kZXJGdW5jKSBmKCk7XG4gICAgfSk7XG4gICAgLy8gVXBkYXRlIHNlY29uZGFyeSBhbmltYXRpb25cbiAgICB0aGlzLnNjZW5lLm9uQWZ0ZXJSZW5kZXJPYnNlcnZhYmxlLmFkZChcbiAgICAgIChldmVudERhdGE6IFNjZW5lLCBldmVudFN0YXRlOiBFdmVudFN0YXRlKSA9PiB7XG4gICAgICAgIHRoaXMuX2FmdGVyUmVuZGVyRnVuYyhldmVudERhdGEsIGV2ZW50U3RhdGUpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZVJlc2l6ZSgpIHtcbiAgXHQvLyogVE9ETzogUGF0Y2hlZC5cbiAgICAvLyB0aGlzLmVuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXMoKS5vbnJlc2l6ZSA9ICgpID0+IHtcbiAgICB0aGlzLmVuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXMoKSEub25yZXNpemUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmVuZ2luZS5yZXNpemUoKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFNoYWRvd0dlbmVyYXRvcihzaGFkb3dHZW5lcmF0b3I6IGFueSkge1xuICAgIHNoYWRvd0dlbmVyYXRvci51c2VQZXJjZW50YWdlQ2xvc2VyRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICBzaGFkb3dHZW5lcmF0b3IuZmlsdGVyaW5nUXVhbGl0eSA9IFNoYWRvd0dlbmVyYXRvci5RVUFMSVRZX0hJR0g7XG4gIH1cblxuICAvLyBUT0RPIFVucmVnaXN0ZXJcbiAgcHJpdmF0ZSByZWdpc3RlclZybUV4dGVuc2lvbigpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNhbGwgcmVnaXN0ZXJWcm1FeHRlbnNpb24oKVwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlZSTUxvYWRlckV4dGVuc2lvbi5OQU1FOiBcIiwgVlJNTG9hZGVyRXh0ZW5zaW9uLk5BTUUpO1xuXG4gICAgLy8g44Ot44O844OA44O844Gr55m76Yyy44GZ44KLXG4gICAgR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihWUk1Mb2FkZXJFeHRlbnNpb24uTkFNRSwgKGxvYWRlcikgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJsb2FkZXI6IFwiLCBsb2FkZXIpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzOiBcIiwgdGhpcyk7XG5cbiAgICAgIHJldHVybiBuZXcgVlJNTG9hZGVyRXh0ZW5zaW9uKGxvYWRlciwgdGhpcyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyVnJtUGx1Z2luKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiY2FsbCByZWdpc3RlclZybVBsdWdpbigpXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2NlbmVMb2FkZXI6IFwiLCBTY2VuZUxvYWRlcik7XG4gICAgLy8gY29uc29sZS5sb2coXG4gICAgLy8gICBcIlNjZW5lTG9hZGVyLkdldFBsdWdpbkZvckV4dGVuc2lvbigudnJtKS5uYW1lOiBcIixcbiAgICAvLyAgIFNjZW5lTG9hZGVyLkdldFBsdWdpbkZvckV4dGVuc2lvbihcIi52cm1cIikubmFtZVxuICAgIC8vICk7XG5cbiAgICAvLyBpZiAoXG4gICAgLy8gICBTY2VuZUxvYWRlciAmJlxuICAgIC8vICAgU2NlbmVMb2FkZXIuR2V0UGx1Z2luRm9yRXh0ZW5zaW9uKFwiLnZybVwiKS5uYW1lID09PSBcInZybVwiXG4gICAgLy8gKSB7XG4gICAgaWYgKFNjZW5lTG9hZGVyKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInRyeSB0byBjYWxsIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKClcIik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMuX3ZybUZpbGVMb2FkZXI6IFwiLCB0aGlzLl92cm1GaWxlTG9hZGVyKTtcblxuICAgICAgU2NlbmVMb2FkZXIuUmVnaXN0ZXJQbHVnaW4odGhpcy5fdnJtRmlsZUxvYWRlcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFJlbmRlcmluZ1BpcGVsaW5lKCkge1xuICAgIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lLnNhbXBsZXMgPSA0O1xuICAgIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lLmRlcHRoT2ZGaWVsZEVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lLmRlcHRoT2ZGaWVsZEJsdXJMZXZlbCA9XG4gICAgICBEZXB0aE9mRmllbGRFZmZlY3RCbHVyTGV2ZWwuTWVkaXVtO1xuICAgIHRoaXMuX3JlbmRlcmluZ1BpcGVsaW5lLmRlcHRoT2ZGaWVsZC5mb2N1c0Rpc3RhbmNlID0gMjAwMDsgLy8gZGlzdGFuY2Ugb2YgdGhlIGN1cnJlbnQgZm9jdXMgcG9pbnQgZnJvbSB0aGUgY2FtZXJhIGluIG1pbGxpbWV0ZXJzIGNvbnNpZGVyaW5nIDEgc2NlbmUgdW5pdCBpcyAxIG1ldGVyXG4gICAgdGhpcy5fcmVuZGVyaW5nUGlwZWxpbmUuZGVwdGhPZkZpZWxkLmZvY2FsTGVuZ3RoID0gMTA7IC8vIGZvY2FsIGxlbmd0aCBvZiB0aGUgY2FtZXJhIGluIG1pbGxpbWV0ZXJzXG4gICAgdGhpcy5fcmVuZGVyaW5nUGlwZWxpbmUuZGVwdGhPZkZpZWxkLmZTdG9wID0gMS40OyAvLyBha2EgRiBudW1iZXIgb2YgdGhlIGNhbWVyYSBkZWZpbmVkIGluIHN0b3BzIGFzIGl0IHdvdWxkIGJlIG9uIGEgcGh5c2ljYWwgZGV2aWNlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVjNEQ29yZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt2M2RfY29yZVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt2M2RfY29yZVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc35tYWluXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LXRlc3QudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==