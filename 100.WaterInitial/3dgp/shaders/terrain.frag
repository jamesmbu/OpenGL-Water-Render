#version 330

// Input Variables (received from Vertex Shader)
in vec4 color;
in vec4 position;
in vec3 normal;
in vec2 texCoord0;

// Input: Water Related
in float waterDepth;		// water depth (positive for underwater, negative for the shore)
// Input: FogRelated
in float fogFactor;
// Uniform: The Texture
uniform sampler2D texture0;

// Water-related
uniform vec3 waterColor;
uniform sampler2D textureBed;
uniform sampler2D textureShore;

// Fog 
uniform vec3 fogColour;


// Output Variable (sent down through the Pipeline)
out vec4 outColor;


void main(void) 
{
	outColor = color;

	// shoreline multitexturing
	float isAboveWater = clamp(-waterDepth, 0, 1); 
	
	outColor *= mix(texture(textureBed, texCoord0), texture(textureShore, texCoord0), isAboveWater);
	
	// calculate the observer's altitude above the observed vertex
	//float eyeAlt = dot(-position.xyz, mat3(matrixModelView) * vec3(0, 1, 0));

	outColor = mix(vec4(fogColour, 1), outColor, fogFactor);

	
}
