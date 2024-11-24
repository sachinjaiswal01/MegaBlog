import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Conatainer , PostForm} from '../components'
import appwriteService from "../appwrite/config"

function EditPost() {
    const [post,setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])
    return post ? (
        <div className='py-8'>
            <Conatainer>
                <PostForm post={post} />
            </Conatainer>
        </div>
    ):null
  }
export default EditPost