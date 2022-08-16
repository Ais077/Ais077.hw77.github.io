import fs from 'fs';

const fileName = './dbs.json';

let data = [];

export default {
    init() {
        try{
            const fileContents = fs.readFileSync(fileName);
            data = JSON.parse(fileContents)
        } catch (e){
            data= [];
        }
    },
    getItems(){
        return data;
    },
    addItem(item){
        data.push(item);
        this.save();
    },
    save(){
        fs.writeFileSync(fileName,JSON.stringify(data))
    }
}