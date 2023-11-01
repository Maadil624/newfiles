import FileUploadmodel from "../models/FileUploadmodel.js"
import path from "path";
import xlsx from 'xlsx'
import fs from 'fs'
import pdf  from 'pdf-parse';
import usersRequest from "../models/usersrequest.js";
import {DocxCounter} from 'page-count'
// using pagecount we can count any-document pages

// file upload controller
export const fileUpload = async (req, res) => {
    try{
    let ext_filesnames = []
    let new_files = []
    let files = req.files
    // console.log(files)
    let { value } = req.body
    let value1=Boolean(value)
    // console.log(typeof(value1),value1)
    let counter = 0;
    if(files.length<=0){
        return res.status(200).send({
            success: false,
            message: "No files selected to upload",
            ext_filesnames,
            ext_value: true,
            new_files
        })
    }
    for (const file of files) {
        let file_name = file.originalname;
        if(path.extname(file.originalname)=='.pdf'){
            const ext_file = await FileUploadmodel.findOne({ name: file_name })
            if(!ext_file){
                let count=0
                console.log('pdf filename',file.originalname)
                // Replace 'your-pdf-file.pdf' with the path to your PDF file
                const pdfFilePath = path.join(process.cwd(), 'uploads', `${file.originalname}`) || path.join(process.cwd(), 'new_file_loc', `${file.originalname}`)
                // Read the PDF file
                const dataBuffer = fs.readFileSync(pdfFilePath);
                // Parse the PDF and count the pages
                pdf(dataBuffer).then((data) => {
                    const pageCount = data.numpages;
                    console.log(`Number of pages in the PDF: ${pageCount}`);
                }).catch((error) => {
                    console.error('Error reading the PDF:', error);
                });

                // pdfParser.on('pdfParser_dataReady', function(data) {
                //     console.log(data.Pages.length)
                //     var doc = data.PDFJS && data.PDFJS.pdfDocument && data.PDFJS.pdfDocument.numPages;
                //     console.log('Number of pages:', doc);
                //     return data.Pages.length
                //     // data=null
                //     // console.log(data)
                // });
                // // pdfParser.on('pdfParser_dataError', _.bind(_onPFBinDataError, self));
                
                // pdfParser.loadPDF(path.join(process.cwd(), 'uploads', `${file.originalname}`));
                // new PdfReader().parseFileItems(path.join(process.cwd(), 'uploads', `${file.originalname}`), (err, item) => {
                // if (err) console.error("error:", err);
                // else if (!item) {
                //     console.warn("end of file");
                // }
                // else if (item.text) 
                // {
                //     // console.log('hii',++coount)
                //     // console.log(item);
                // }
                // // console.log(item.length)
                // });
                // const pdfFile = path.join(process.cwd(), 'uploads', `${file.originalname}`);

                // const pageCount = new PDF(pdfFile).count();

                // console.log(pageCount)
            }
        }
        else if(path.extname(file.originalname)=='.docx'){
            const ext_file = await FileUploadmodel.findOne({ name: file_name })
            if(!ext_file){
                let count=0
                console.log('doc filename',file.originalname)
                const FilePath = path.join(process.cwd(), 'uploads', `${file.originalname}`)  || path.join(process.cwd(), 'new_file_loc', `${file.originalname}`)
                const doc=fs.readFileSync(FilePath)
                const pagesDocx = await DocxCounter.count(doc);
                console.log('doc total pages=',pagesDocx)
                // const doc = new docx(FilePath);
                // const pageCount = doc.getPageCount();
                // console.log(pageCount);
            }
        }
        else{
            if(path.extname(file.originalname)=='.xlsx' || path.extname(file.originalname)=='.csv'){
                counter++;
                // console.log('counter=', counter)
                console.log('xl filename', file_name)
                const filepath=path.join(process.cwd(), 'uploads', `${file.originalname}`) || path.join(process.cwd(), 'new_file_loc', `${file.originalname}`)
                const wb = xlsx.readFile(filepath, {
                    type: 'binary',
                    cellDates: true,
                    cellNF: true,
                    cellText: true
                }, 'utf-8');
            console.log('Number no pages in excel = ',wb.SheetNames.length)
            const ext_file = await FileUploadmodel.findOne({ name: file_name })
                if (ext_file) {
            if (ext_filesnames.length <= 0 || !ext_filesnames.includes(file_name)) {
                let obj={
                    id:file.fieldname,
                    name:ext_file.name
                }
                ext_filesnames.push(obj)
                // console.log('at 21', ext_file.name)
            }
                }
                if (!ext_file||value) {
                const wb = xlsx.readFile(path.join(process.cwd(), 'uploads', `${file.originalname}`), {
                type: 'binary',
                cellDates: true,
                cellNF: true,
                cellText: true
            }, 'utf-8');
            // console.log('Number no pages in excel = ',wb.SheetNames.length)
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = xlsx.utils.sheet_to_json(ws);
            let new_file = {
                name: file_name,
                data: data
            }

            if (new_files.length <= 0 || !new_files.includes(file_name)) {
                let obj={
                    id:file.fieldname,
                    name:file_name
                }
                new_files.push(obj)
                console.log('filename=', file_name)
            }
            if(value){
                const filedata = await FileUploadmodel.findOneAndUpdate({name:file_name},{$set: {data: data }})
                let fileid=filedata._id
                console.log('at 52',filedata.name)
                ext_filesnames=[]
                // const updatefile = await FileUploadmodel.create(new_file);
            }else{
                const createfile = await FileUploadmodel.create(new_file);
            }
            // const createfile = await FileUploadmodel.create(new_file);
            }
            }
        }
        const sourceFilePath =path.join(process.cwd(), 'uploads', `${file.originalname}`);
        const destinationDirectory = path.join(process.cwd(), 'new_file_loc');
        const destinationFilePath = `${destinationDirectory}\\${file.originalname}`;
        fs.rename(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
        console.error('Error moving the file:', err);
        } else {
        console.log('File moved successfully.');
        }
        });
}
    // console.log('at 55', files.length)
    // console.log('at 56', new_files.length)
    // console.log('at 57', ext_filesnames.length)
    
    if (new_files.length == files.length) {
        // console.log('at 57')
        return res.status(200).send({
            success: true,
            message: "files uploaded successfully",
            ext_filesnames,
            ext_value: true,
            new_files
        })
    }
    if (ext_filesnames.length > 0 && new_files.length > 0) {
        return res.status(200).send({
            success: true,
            message: "partially uploaded files",
            ext_filesnames,
            ext_value: true,
            new_files
        })
    }
    if (ext_filesnames.length == files.length) {
        return res.status(200).send({
            success: true,
            message: "files Already Exists",
            ext_filesnames,
            ext_value: true,
            new_files
        })
    }
}
catch(err){
    console.log('error at fileupload',err)
}
}
// fetch all files and file data controller
export const filefetch = async (req, res) => {
    const fileusers = await FileUploadmodel.find();
    res.status(200).send({
        sucess: true,
        message: "All File Users",
        fileusers
    })
}
export const adminrequest = async (req, res) => {
    console.log(req.params)
    // console.log(performance.now())
    // const t0 = performance.now();
    // console.log(t0/1000)
    // doSomething();
    const requests = await usersRequest.find();
    // const t1 = performance.now();
    // console.log(t1/1000)
    // console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
    res.status(200).send({
        sucess: true,
        message: "All Users request",
        requests
    })
}
export const admindelreq=async(req,res)=>{
    const {id}=req.params;
    console.log(id,'admin del')
    let delreq=await usersRequest.findOne({_id:id});
    // console.log(delreq)
    if(delreq){
        let delete_file=await usersRequest.deleteOne({_id:id})
        console.log('deleted')
        res.status(200).send({
            sucess:true,
            message:'deleted..',
            delreq
        })
    }else{
        res.status(200).send({
            sucess:false,
            message:'data Not found',
            id
        })
    }
}
export const userrequest=async(req,res)=>{
    try{
    const{action,id,index,name,data,olddata,email}=req.body
    console.log(action,'\n',id,'\n',name,index,'\n','olddata=',olddata)
    let new_data={
        action,
        fileid:id,
        filename:name,
        index,
        olddata,
        data,
        email
    }    
    if(action=='deletefile'){
        let deletefile=await usersRequest.find({$and:[
            {fileid:id},
            {filename:name},
            {action}]})
            // console.log('delete file',deletefile)
        let deletedata=await usersRequest.find({$and:[
            {fileid:id},
            {filename:name},
            {action:'deleteuser'},
        ]})
        let updatedata=await usersRequest.find({$and:[
            {fileid:id},
            {filename:name},
            {action:'onsavedata'},
        ]})
        if(deletedata){
            let deleteall=await usersRequest.deleteMany({$and:[
                {fileid:id},
                {filename:name},
                {action:'deleteuser'},
            ]})
        }
        if(updatedata){
            let deleteall=await usersRequest.deleteMany({$and:[
                {fileid:id},
                {filename:name},
                {action:'onsavedata'},
            ]})
        }
        console.log('data',data)
        if(deletefile.length==0){
            let ad=await usersRequest.create(new_data)
            console.log('request accepted to delete file')
            return res.status(200).send({
                sucess:true,
                message:'request accepted to delete file',
                ad
            })
        }
        else{
            console.log('data exists')
            return res.status(200).send({
                sucess:false,
                message:' request already there...\nwait for the admin to make changes',
                deletefile
            })
        }
    }
    if(action=='deleteuser'){

        let deletedata=await usersRequest.find({$and:[
            {fileid:id},
            {filename:name},
            {action},
            {olddata:olddata}
        ]})
        let deletefile=await usersRequest.find({$and:[
            {fileid:id},
            {filename:name},
            {action:'deletefile'}]})
        let changeuser=await usersRequest.find({$and:[
            {fileid:id},
            {filename:name},
            {action:'onsavedata'},
            {olddata:olddata},
            {data:data}]})
            console.log('delete user',deletedata)
            console.log('delete f',deletefile)
            console.log('ch user',changeuser)
        if(deletedata.length==0&&deletefile.length==0&&changeuser.length==0){
            let ad=await usersRequest.create(new_data)
            console.log('request accepted to delete data file')
            return res.status(200).send({
                sucess:true,
                message:'request accepted to delete data file',
                ad
            })
        }
        else if(deletefile.length!=0||changeuser.length!=0){
            return res.status(200).send({
                sucess:false,
                message:' request already there for delete/change file\ncannot accept request',
            })
        }
        else{
            console.log('data exists')
            return res.status(200).send({
                sucess:false,
                message:' request already there...\nwait for the admin to make changes',
                deletedata
            })
        }
    }
    if(action=='onsavedata'){
        let changeuser=await usersRequest.find({$and:[
            {fileid:id},
            {filename:name},
            {action:'onsavedata'},
            {index:index}
        ]})
        let deletedata=await usersRequest.find({$and:[
            {fileid:id},
            {filename:name},
            {action:'deleteuser'},
            {olddata:olddata},
        ]})
        let deletefile=await usersRequest.find({$and:[
            {fileid:id},
            {filename:name},
            {action:'deletefile'}]})
        console.log('changeusr',changeuser)
        console.log('dlt file',deletefile)
        console.log('dlt data',deletedata)
        if(changeuser.length==0&&deletefile.length==0&&changeuser.length==0){
            let ad=await usersRequest.create(new_data)
            console.log('request accepted to change data file')
            return res.status(200).send({
                sucess:true,
                message:'request accepted to change data file',
                ad
            })
        }
        else if(deletefile.length!=0||deletedata.length!=0){
            return res.status(200).send({
                sucess:false,
                message:' request already there for delete/change file\ncannot accept request',
            })
        }
        else{
            console.log('delete data=',deletedata)
            console.log('file data=',deletefile)
            console.log('change data=',changeuser)
            return res.status(200).send({
                sucess:false,
                message:' request already there...\n wait for the admin to make changes',
                changeuser
            })
        }
    }
}catch(err){
    console.log(err)
}
}
/*gets the data that is needed to delete the 
specific user data in array data
*/
export const deletedata = async (req, res, next) => {
    try {
        const { name, olddata } = req.body
        // console.log('at getdeletedata',name,olddata) 
        console.log('at getdeletedata') 
        await settingdata(name,olddata);
        next()
    } catch (err) {
        console.log("Error at detetedata function", err)
    }
}
let filename;
let data;
// setting the needed data to delete
async function settingdata(name,olddata) {
    filename = await name
    data = await olddata
    // console.log(filename)
    // console.log(olddata)
}
// delete controller to delete specific array data
export const deleteuser = async (req, res) => {
    try {
        let { id } = req.params;
        // let {...body}=req.body
        // console.log(Object.entries(req.body))
        console.log(id)
        let fileid = id
        // console.log('old=',data)
        // console.log(filename)
        let ext_file=await FileUploadmodel.find({_id:id})
        // console.log('ext=',ext[0].data)
        if (ext_file) {
            let delindex
            ext_file[0].data.forEach(async (array, id) => {
                if (JSON.stringify(array) == JSON.stringify(data)) {
                    // console.log(id)
                    // console.log(array,data)
                    console.log('data to deleted = ',ext_file[0].data[id])
                    delindex = await FileUploadmodel.updateOne({ _id: fileid }, { $pull: { data: ext_file[0].data[id] } })
                }
            })
            res.status(200).send({
                sucess: true,
                message: "deleted the user...",
                delindex
            })
        } if (!ext_file) {
            res.status(400).send({
                sucess: false,
                message: "No File Available with this id or Name",
                id
            })
        }
        // console.log(ext_file.data[0])
    } catch (err) {
        console.log(err)
    }
}

export const deletefile = async (req, res) => {
    try {
        const { id } = req.params
        console.log('deleting file id=',id)
        let ext_file = await FileUploadmodel.findOne({ _id: id })
        // console.log(ext_file.name)
        if (!ext_file) {
            res.status(400).send({
                sucess: false,
                message: "file NOT FOUND",
                id
            })
        }
        if (ext_file) {
            let del_file = await FileUploadmodel.deleteOne({ _id: id })
            // if(del_file){
            res.status(200).send({
                sucess: true,
                message: "file deleted..",
                filename: ext_file.name,
                del_file
            })
            // }
        }
    } catch (err) {
        console.log('at file delete', err)
    }

}

export const updatefiledata = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const { olddata, data } = req.body
        console.log('olddata=', olddata,'\n new data=',typeof data,data)
        if (!data) {
            console.log("NO data to update...")
        }
        const file = await FileUploadmodel.findOne({ _id: id })
        if (!file) {
            console.log("NO File Found")
        }
        let updatefiledata 
        file.data.forEach(async(f_data,f_id)=>{
            // console.log(data)
            if(JSON.stringify(f_data)==JSON.stringify(olddata)){
                // console.log('501',f_data,f_id)
                // console.log(JSON.stringify(f_data)==JSON.stringify(olddata))
                updatefiledata = await FileUploadmodel.updateOne({ _id: id }, { $set: { [`data.${f_id}`]: data } },{ arrayFilters: [ {"olddata":olddata} ] }, { multi: true })
                console.log('update data',updatefiledata)
                if(updatefiledata.modifiedCount>=1){
                return res.status(200).json({
                        sucess: true,
                        message: "Added new Values",
                        data
                    })
                }
                else{
                    return res.status(200).json({
                            sucess: false,
                            message: "failed to Add new Values",
                            data
                        })
                }
            }
        })
        // updatefiledata = await FileUploadmodel.updateOne({ _id: id }, { $set: { "data.$[olddata]": data } },{ arrayFilters: [ { "olddata":olddata } ] }, { multi: true })
        // console.log('update data',updatefiledata)

    }
    catch (err) {
        console.log(err)
    }
}

// export const fileUpload = async (req, res) => {
//     let ext_filesnames = []
//     let new_files = []
//     let files = req.files
//     let { value } = req.body
//     console.log(value)
//     // let response=true;
//     let counter = 0;
//     await files.forEach(async (file, id) => {
//         let file_name = file.originalname;
//         counter++;
//         console.log('counter=',counter)
//         console.log('filename',file_name)
//         const ext_file = await FileUploadmodel.findOne({ name: file_name })       
//         if (ext_file) {
//             if(ext_filesnames.length<=0||!ext_filesnames.includes(file_name)){
//                 ext_filesnames.push(ext_file.name)
//                 console.log('at 21',ext_file.name)
//             }
//         }
//         if (!ext_file) {
//                 const wb = xlsx.readFile(path.join(process.cwd(), 'uploads', `${file.originalname}`)
//                     , {
//                         type: 'binary',
//                         cellDates: true,
//                         cellNF: true,
//                         cellText: true
//                     }, 'utf-8');
//                 const wsname = wb.SheetNames[0];
//                 // console.log('at', wsname)
//                 const ws = wb.Sheets[wsname];
//                 // console.log(ws )
//                 const data = xlsx.utils.sheet_to_json(ws);
//                 // console.log(data);
//                 let new_file = {
//                     name: file_name,
//                     data: data
//                 }
//                 if(new_file.length<=0||!new_files.includes(file_name)){
//                     new_files.push(file_name)
//                     console.log('43..',new_files)
//                 }
//                 const createfile = await FileUploadmodel.create(new_file);
//                 // if (createfile &&files.length==counter) {
//                 //     return res.status(200).send({
//                 //         sucess: true,
//                 //         message: "file Uploaded Sucessfully..",
//                 //         new_file
//                 //     })
//                 // }
//             }
//         })
    
//     // if (!res.headersSent) {
//         console.log('at 55',files.length)
//         console.log('at 56',new_files.length)
//         console.log('at 57',ext_filesnames.length)
//         if(new_files.length==files.length){
//             return res.status(200).send({
//                 sucess: false,
//                 message: "files uploaded sucessfully",
//                 ext_filesnames,
//                 ext_value: true,
//                 uploaded_files: new_files
//         })}
//         if(ext_filesnames.length>0&&new_files.length>0){
//             return res.status(200).send({
//                 sucess: false,
//                 message: "partially uploaded files",
//                 ext_filesnames,
//                 ext_value: true,
//                 new_files  
//         })}
//         if(ext_filesnames.length==files.length){
//             return res.status(200).send({
//                 sucess: false,
//                 message: "files Already Exists",
//                 ext_filesnames,
//                 ext_value: true,
//                 uploaded_files: new_files
//         })}
// }