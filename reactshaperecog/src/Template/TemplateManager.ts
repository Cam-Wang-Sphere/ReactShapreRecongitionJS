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

            const JsonInput = JSON.parse(Input);

            // Build array
            Template.startPointsVector(Builder, JsonInput['Input'].length);

            let i: number;
            for(i = JsonInput['Input'].length - 1; i >= 0 ; i--)
            {
                let X = JsonInput['Input'][i]['x'];
                let Y = JsonInput['Input'][i]['y'];

                Vec2.createVec2(Builder, X, Y);
            }

            const PointsOffset = Builder.endVector();

            // Create the string
            const TempString = Builder.createString(TemplateName);

            // Start the template object building
            Template.startTemplate(Builder);

            // Add points and name
            Template.addPoints(Builder,PointsOffset);
            Template.addName(Builder, TempString);

            // Get the offset for the finish template
            const TemplateOffset = Template.endTemplate(Builder);

            Builder.finish(TemplateOffset);
            const Built = Builder.asUint8Array();

            this.LoadTemplate(Built);
        }
    }

    LoadTemplate = (Data: Uint8Array) => {

        // Log the result
        console.log(Data);

        const buf = new flatbuffers.ByteBuffer(Data);

        const template = Template.getRootAsTemplate(buf);

        const newName = template.name();
        console.log(newName);
    }
}

