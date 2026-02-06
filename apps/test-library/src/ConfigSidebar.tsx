// ConfigSidebar.tsx
import React, { useEffect, useState } from 'react';
import './ConfigSidebar.css';
import { ComponentPropertiesResult, useComponentProperties } from './utils/useComponentProperties';
import { ThemeTokens, useCssConversion } from './utils/useCssConversion';

type ConfigSidebarProps = {
    themeJson: ThemeTokens;
    setThemeJson: React.Dispatch<React.SetStateAction<ThemeTokens>>;
    selectedComponent: string;
    selectedVersion?: string;
    setSelectedVersion: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedVariant?: string;
    setSelectedVariant: React.Dispatch<React.SetStateAction<string | undefined>>;
    componentData: ComponentPropertiesResult;
};

const ConfigSidebar: React.FC<ConfigSidebarProps> = ({
    themeJson,
    setThemeJson,
    selectedComponent,
    setSelectedVersion,
    selectedVersion,
    selectedVariant,
    setSelectedVariant,
    componentData,
}) => {
    const { convertAndInject } = useCssConversion()

    const handlePropertyChange = (
        propertyName: string,
        value: string
    ) => {
        setThemeJson(prev => {
            // Deep clone to keep React state immutable
            const next: ThemeTokens = structuredClone(prev);

            const component = next[selectedComponent];
            if (!component) return prev;

            if ("versions" in component && selectedVersion) {
                const version = component.versions[selectedVersion];
                if (!version) return prev;

                // Version + Variant
                if (version.variants && selectedVariant) {
                    const variant = version.variants[selectedVariant];
                    if (!variant?.tokens[propertyName]) return prev;

                    variant.tokens[propertyName].value = value;
                    return next;
                }

                // Version only (no variant)
                if (version.tokens?.[propertyName]) {
                    version.tokens[propertyName].value = value;
                    return next;
                }

                return prev;
            }

            // Plain component tokens
            if ("tokens" in component && component.tokens?.[propertyName]) {
                component.tokens[propertyName].value = value;
                return next;
            }

            // Variant-only components (input, etc.)
            const variants = ("variants" in component) ? component.variants : ("varients" in component) ? component.varients : "";
            if (variants && selectedVariant) {
                const variant = variants[selectedVariant];
                if (variant?.tokens[propertyName]) {
                    variant.tokens[propertyName].value = value;
                    return next;
                }
            }

            return prev;
        });
    };


    const renderInput = (property: any) => {
        switch (property.type) {
            case 'color':
                return (
                    <div className="input-group">
                        <input
                            type="color"
                            className="form-control form-control-color"
                            value={property.value}
                            onChange={(e) => handlePropertyChange(property.name, e.target.value)}
                            title={property.name}
                        />
                        <input
                            type="text"
                            className="form-control"
                            value={property.value}
                            onChange={(e) => handlePropertyChange(property.name, e.target.value)}
                            placeholder="#000000"
                        />
                    </div>
                );

            case 'select':
                return (
                    <select
                        className="form-select"
                        value={property.value}
                        onChange={(e) => handlePropertyChange(property.name, e.target.value)}
                    >
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="bolder">Bolder</option>
                        <option value="lighter">Lighter</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                    </select>
                );

            case 'input':
            default:
                return (
                    <input
                        type="text"
                        className="form-control"
                        value={property.value}
                        onChange={(e) => handlePropertyChange(property.name, e.target.value)}
                        placeholder="Enter value"
                    />
                );
        }
    };

    return (
        <div className="config-sidebar">
            {/* Header */}
            <div className="sidebar-header">
                <h5 className="mb-0">
                    <i className="bi bi-gear-fill me-2"></i>
                    Component Configuration
                </h5>
            </div>

            {/* Component Name Badge */}
            <div className="p-3 border-bottom bg-light d-flex justify-content-between">
                <button className="btn btn-primary">
                    {selectedComponent}
                </button>
                <button className="btn btn-primary" onClick={() => {
                    const css = convertAndInject(themeJson)
                    console.log(css)
                }}>
                    Generate CSS
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="sidebar-content">
                {/* Version Selection */}
                {componentData.hasVersions && (
                    <div className="config-section">
                        <label className="form-label fw-bold">
                            <i className="bi bi-layers me-2"></i>
                            Version
                        </label>
                        <select
                            className="form-select"
                            value={selectedVersion}
                            onChange={(e) => setSelectedVersion(e.target.value)}
                        >
                            {componentData.versions.map(version => (
                                <option key={version} value={version}>
                                    {version}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Variant Selection */}
                {componentData.hasVariants && (
                    <div className="config-section">
                        <label className="form-label fw-bold">
                            <i className="bi bi-palette me-2"></i>
                            Variant
                        </label>
                        <select
                            className="form-select"
                            value={selectedVariant}
                            onChange={(e) => setSelectedVariant(e.target.value)}
                        >
                            {componentData.variants.map(variant => (
                                <option key={variant} value={variant}>
                                    {variant}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Properties Section */}
                <div className="config-section">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="mb-0 fw-bold">
                            <i className="bi bi-sliders me-2"></i>
                            Properties
                        </h6>
                        <span className="badge bg-secondary">
                            {componentData.properties.length}
                        </span>
                    </div>

                    {/* Properties List */}
                    {componentData.properties.length === 0 ? (
                        <div className="alert alert-info" role="alert">
                            <i className="bi bi-info-circle me-2"></i>
                            No properties available
                        </div>
                    ) : (
                        <div className="properties-list">
                            {componentData.properties.map((property) => (
                                <div key={property.name} className="property-item">
                                    <label className="form-label mb-1">
                                        <span className="property-name">
                                            {property.name.replace(/-/g, ' ')}
                                        </span>
                                        <span className="badge bg-light text-dark ms-2">
                                            {property.type}
                                        </span>
                                    </label>
                                    {renderInput(property)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="config-section border-top pt-3">
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary">
                            <i className="bi bi-save me-2"></i>
                            Save Changes
                        </button>
                        <button className="btn btn-outline-secondary">
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Reset to Default
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigSidebar;