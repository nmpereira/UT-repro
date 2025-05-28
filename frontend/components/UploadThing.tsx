import { Colors } from "@/constants/Colors";
import { generateReactNativeHelpers } from "@uploadthing/expo";
import { openSettings } from "expo-linking";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";


const backendUrl = process.env.EXPO_PUBLIC_SERVER_URL || "https://scootmx-server.cheappass.club";

export const { useImageUploader, useDocumentUploader } =
    generateReactNativeHelpers({
        /**
         * Your server url.
         * @default process.env.EXPO_PUBLIC_SERVER_URL
         * @remarks In dev we will also try to use Expo.debuggerHost
         */
        url: `${backendUrl}/api/uploadthing`,

        fetch: (input, init) => {
            console.log("fetch", { input, init });
            // if (input.toString().startsWith(backendUrl)) {
            //     return fetch(input, {
            //         ...init,
            //         credentials: "include",
            //     });
            // }
            // return fetch(input, init);

            return fetch(input, {
                ...init,
                // credentials: "include",
            });
        },
    });

export function UploadButtonComponent() {
    const { openImagePicker, isUploading } = useImageUploader("imageUploader", {
        /**
         * Any props here are forwarded to the underlying `useUploadThing` hook.
         * Refer to the React API reference for more info.
         */
        onClientUploadComplete: () => Alert.alert("Upload Completed"),
        onUploadError: (error) => Alert.alert("Upload Error", error.message),
    });

    return (
        <View>
            <Pressable
                onPress={() => {
                    openImagePicker({
                        // input, // Matches the input schema from the FileRouter endpoint
                        source: "library", // or "camera"
                        onInsufficientPermissions: () => {
                            Alert.alert(
                                "No Permissions",
                                "You need to grant permission to your Photos to use this",
                                [
                                    { text: "Dismiss" },
                                    { text: "Open Settings", onPress: openSettings },
                                ]
                            );
                        },
                    });
                }}
                style={{
                    backgroundColor: Colors.light.tint,
                    padding: 10,
                    borderRadius: 10,
                    width: 200,
                }}
            >
                <Text>Select Image and upload</Text>
            </Pressable>
        </View>
    );
}
