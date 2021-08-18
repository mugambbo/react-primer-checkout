import React, { useEffect, useState } from "react";
import I18nHelper from "../helpers/I18nHelper";
import strings from "./strings.json";

const I18nContext = React.createContext(strings.en);

interface I18nProviderProps {
    children: React.ReactNode;
    initialString?: object;
    lang?: string; 
}

const I18nProvider = (props: I18nProviderProps) => {
    const [contentString, setContentString] = useState(strings.en);
    const stringContent: {[id: string]: any} = strings;
    const lang = I18nHelper.getLanguage();

    useEffect(() => {
        if (props.lang && stringContent[props.lang]) {
            setContentString(stringContent[props.lang]);
        } else if(stringContent[lang]) {
            setContentString(stringContent[lang]);
        }
        console.log("Auto Detected Browser Language: "+I18nHelper.getLanguage());
        return () => {
        }
    }, [lang, stringContent, props.lang]);

    return (
        <I18nContext.Provider value={contentString} >
            {props.children}
        </I18nContext.Provider>
    )
}

export const useI18nContext = () => React.useContext(I18nContext);

export default I18nProvider;