import axiosClient from "../../axiosClient";
import {useState,useEffect} from "react";
import {useNavigate,useParams} from "react-router-dom";


const UserForm =()=>{
    const {id} =useParams();
    const navigate=useNavigate();
    const [users,setUsers]=useState({
        id:null,
        name:'',
        email:'',
        password:''
    });

    const[loading,setLoading]=useState(false);
    const[errors,setErrors]=useState(null);

    if(id){
        useEffect(()=>{
            setLoading(true)
            axiosClient.get(`/user/${id}`)
            .then (({data})=>{
                setLoading(false)
                setUsers(data)
            })
            .catch(()=>{
                setLoading(false)
            })
        },[])
    }
    const onSubmit = ev => {
        ev.preventDefault()
        if (users.id) {
          axiosClient.put(`/user/${users.id}`, users)
            .then(() => {
              navigate('/user')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } else {
          axiosClient.post('/user', users)
            .then(() => {
              navigate('/user')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        }
      }

    return( 
<>
      {users.id && <h1>Update User: {users.name}</h1>}
      {!users.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={users.name} onChange={ev => setUsers({...users, name: ev.target.value})} placeholder="Name"/>
            <input value={users.email} onChange={ev => setUsers({...users, email: ev.target.value})} placeholder="Email"/>
            <input type="password" onChange={ev => setUsers({...users, password: ev.target.value})} placeholder="Password"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
    )

}

export default UserForm;