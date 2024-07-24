import { TTFFont } from "cc";
export class LanguageData {
    /** JSON资源目录 */
    static path_json: string = "language/json";
    /** 纹理资源目录 */
    static path_texture: string = "language/texture";
    /** SPINE资源目录 */
    static path_spine: string = "language/spine";

    /** 当前语言 */
    static current: string = "";
    /** 语言JSON配置数据 */
    static json: any = {}
    /** 语言EXCEL中的配置数据 */
    static excel: any = null!;
    /** TTF字体 */
    static font: TTFFont = null!;


    public static getLangByID(labId: string): string {
        var text = this.json[labId];
        if (text) {
            return text;
        }

        if (this.excel) {
            var record = this.excel[labId];
            if (record) {
                return record[this.current];
            }
        }

        return labId;
    }
}