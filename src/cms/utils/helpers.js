import base64 from "base-64";

export const encodeWidgetDataObject = (data) => {
    return base64.encode(JSON.stringify(data));
}

export const decodeWidgetDataObject = (data) => {
    return JSON.parse(base64.decode(data));
}

export const cPatternWithId = (id) => {
	return `{"widget":"${id}","config":"([0-9a-zA-Z+/=]+?)"}`;
}
