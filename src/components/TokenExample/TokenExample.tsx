import React from 'react';
import { ldTokens, getColor, typographyToCSS, shadowToCSS } from '../../styles/tokens';

/**
 * Example component demonstrating how to use design tokens from JSON files
 */
export const TokenExample: React.FC = () => {
	// Example 1: Using convenience accessors
	const primaryColor = ldTokens.colors?.blue?.[500] || '#3B82F6';
	const headingStyle = ldTokens.textStyles?.heading?.large?.default;
	const elevation = ldTokens.elevation?.[100];

	// Example 2: Using helper functions
	const chartColor = getColor('ld.semantic.color.chart.categorical.1');

	const containerStyle: React.CSSProperties = {
		padding: '24px',
		borderRadius: '8px',
		backgroundColor: '#ffffff',
		boxShadow: elevation ? shadowToCSS(elevation) : '0 1px 2px rgba(0,0,0,0.1)',
	};

	const headingStyleObj = headingStyle ? typographyToCSS(headingStyle) : {};

	return (
		<div style={containerStyle}>
			<h2 style={headingStyleObj}>Design Tokens Example</h2>
			<p style={{ color: primaryColor, marginTop: '16px' }}>
				This component demonstrates how to use JSON design tokens in Storybook components.
			</p>
			{chartColor && (
				<div
					style={{
						width: '100px',
						height: '100px',
						backgroundColor: chartColor,
						marginTop: '16px',
						borderRadius: '4px',
					}}
				/>
			)}
		</div>
	);
};

