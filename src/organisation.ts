import { Initialized } from "../generated/Organisation/Organisation";
import { EventBadgeMetadataTemplate } from "../generated/templates";
import { handleEventBadgeMetadata } from "./metadata";

export function handleInitialized(event: Initialized): void {
    EventBadgeMetadataTemplate.create(
        "bafkreigjf2c6jyyrbhslmdvp2nm5waccp2umy7kntohqfbtcvht2bxxwfq"
    );
    EventBadgeMetadataTemplate.create(
        "bafkreibdxezz5idjl2obmk5sjuplmcsxjplad54ey7o5imqjknxzxisti4"
    );
    EventBadgeMetadataTemplate.create(
        "bafkreidcvytlsvtxyyx22odbedtudjlscdy2nol3gkgefp35ecci5e2wam"
    );
    EventBadgeMetadataTemplate.create(
        "bafkreidvgmj6klmzpgaluqxdbrxrfmew562tugic6b2x7ohozwu3tsgar4"
    );
    EventBadgeMetadataTemplate.create(
        "bafkreihk3euww6zgtg3k5cxp7aansbgdazlqdpswuj4slochfmfsw4ngea"
    );
    EventBadgeMetadataTemplate.create(
        "bafkreiaozr3wg7owr27zowwij3yh67wayi7mwnmxqr2osi2baevvdi5ft4"
    );
}
