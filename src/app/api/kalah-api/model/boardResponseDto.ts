/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface BoardResponseDto { 
    id?: number;
    pit?: number;
    tokenCount?: number;
    playerSide?: BoardResponseDto.PlayerSideEnum;
    isKalah?: boolean;
}
export namespace BoardResponseDto {
    export type PlayerSideEnum = 'BLUE' | 'RED';
    export const PlayerSideEnum = {
        Blue: 'BLUE' as PlayerSideEnum,
        Red: 'RED' as PlayerSideEnum
    };
}


