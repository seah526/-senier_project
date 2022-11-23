const getLoginId =()=>{
    let id = null;
    if (typeof window !== 'undefined') {
      id = localStorage.getItem('id');
    }
    return id;
}
export default getLoginId;