import * as flatbuffers from 'flatbuffers';
import { Template } from './../schema/_Templates/shape-template/template';
import { Vec2 } from './../schema/_Templates/shape-template/vec2';

function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}
  
function getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}

export class TemplateManager {

    UserInputKey:string = "UserInput";

    SaveTemplate = (TemplateName : string) => {
        const Input = localStorage.getItem(this.UserInputKey);

        if(typeof Input === 'string'){
            const Builder = new flatbuffers.Builder(256);
            Template.startTemplate(Builder);

            const JsonInput = JSON.parse(Input);

            let i: number;
            let MyOffsetList: flatbuffers.Offset[] = [];


            Template.startPointsVector(Builder, JsonInput['Input'].length);

            for(i = JsonInput['Input'].length - 1; i >= 0 ; i--)
            {
                let X = JsonInput['Input'][i]['x'];
                let Y = JsonInput['Input'][i]['y'];

                Vec2.createVec2(Builder, X, Y);
            }

            const PointsOffset = Builder.endVector();

            Template.addPoints(Builder,PointsOffset);
            
            const TempString = Builder.createString(TemplateName);
            Template.addName(Builder, TempString);

            const TemplateOffset = Template.endTemplate(Builder);

            const Built = Builder.finish(TemplateOffset);
        }
    }
}

