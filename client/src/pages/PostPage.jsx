import axios from '../utils/axios'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [pathh, setPathh] = useState(null)
    const params = useParams()
    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/post/${params.id}`)
        setPost(data)
        setPathh(data.imgUrl)

    }, [params.id])
    useEffect(() => {
        console.log();
        fetchPost()
        
        // setPathh(post.imgUrl)
    }, [])
    
    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        )
    }
  return (
    <div>
        <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
            <Link className='flex' to={'/'}>
                Назад
            </Link>
        </button>
        {post.imgUrl&&(
            <img src={require(`../uploads/${pathh}`)} alt={post.title} className='object-cover w-full'/>
        )}
        <h1>{post.text}</h1>
    </div>
  )}
