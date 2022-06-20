import * as Firebase from "firebase";
import { firebaseConfig } from "../config/config";
export const uploadImage=async(url,name)=>{
    if(!Firebase.apps.length)
    {
        Firebase.initializeApp(firebaseConfig); 
    }
    const blob= await new Promise((resolve,reject)=>{
        const xhr=new XMLHttpRequest();
        xhr.onload=()=>{
            resolve(xhr.response);
        };
        xhr.onerror=()=>{
            reject(new TypeError('Network Request Failed!'));
        }
        xhr.responseType='blob';
        xhr.open('GET',url,true);
        xhr.send(null);
    });

    const ref= Firebase.storage().ref().child(name+new Date().toISOString())
    const snapshot= ref.put(blob);
    snapshot.on(Firebase.storage.TaskEvent.STATE_CHANGED,()=>{
        console.log('Uploading');
    },(error)=>{
        console.log(error);
        blob.close();
        return;
    },()=>{
        snapshot.snapshot.ref.getDownloadURL().then((downloadUrl)=>{
            blob.close();
            return downloadUrl;
        })
    });
}