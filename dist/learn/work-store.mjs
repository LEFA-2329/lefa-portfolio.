const PREFIX='logiclab-work-v1:';
export function createWorkStore(provider=()=>globalThis.localStorage){
 const listeners=new Set();let status={available:true,issue:'',saved:false};
 const notify=patch=>{status={...status,...patch};for(const listener of listeners)listener({...status});};
 const key=name=>{if(!/^[a-z0-9-]+(?::[a-z0-9-]+)*$/.test(name))throw Error('Invalid work key');return PREFIX+name;};
 const copy=value=>JSON.parse(JSON.stringify(value));
 function decode(text){if(text.length>300000)throw Error('Record too large');const value=JSON.parse(text);if(!value||value.version!==1||!Number.isFinite(value.updatedAt)||!Object.hasOwn(value,'payload'))throw Error('Invalid saved record');return value;}
 return {
  read(name,fallback,clean=value=>value){try{const text=provider().getItem(key(name));if(text===null)return copy(fallback);const value=decode(text);return clean(value.payload);}catch(error){notify({issue:'Some saved work could not be restored. You can continue, but keep a copy of important work.',available:!['SecurityError','TypeError'].includes(error.name)});return copy(fallback);}},
  write(name,payload){try{const text=JSON.stringify({version:1,updatedAt:Date.now(),payload});if(text.length>300000)throw Error('Record too large');provider().setItem(key(name),text);notify({available:true,issue:'',saved:true});return true;}catch{notify({available:false,issue:'Saving is unavailable or storage is full. Current work is still open here. Copy it before refreshing or closing.',saved:false});return false;}},
  list(){try{const storage=provider(),items=[];for(let i=0;i<storage.length;i++){const full=storage.key(i);if(!full?.startsWith(PREFIX))continue;try{const value=decode(storage.getItem(full));items.push({key:full.slice(PREFIX.length),updatedAt:value.updatedAt});}catch{items.push({key:full.slice(PREFIX.length),updatedAt:0,unreadable:true});}}return items.sort((a,b)=>b.updatedAt-a.updatedAt);}catch{notify({available:false,issue:'Saved work cannot be read in this browser. Your open work remains available.'});return [];}},
  clearAll(){try{const storage=provider(),keys=[];for(let i=0;i<storage.length;i++){const name=storage.key(i);if(name?.startsWith(PREFIX))keys.push(name);}for(const name of keys)storage.removeItem(name);notify({available:true,issue:'',saved:false});return true;}catch{notify({available:false,issue:'Some saved work could not be removed. Check browser storage settings and try again.'});return false;}},
  subscribe(listener){listeners.add(listener);listener({...status});return ()=>listeners.delete(listener);},
  getStatus(){return {...status};}
 };
}
export const workStore=createWorkStore();
