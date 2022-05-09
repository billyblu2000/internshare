import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { Typography, Button, Input } from 'antd'
import AnimatedIcon from '../../../utils/icons/AnimatedIcon'
import inactiveData from '../../../utils/icons/animation/48-favorite-heart-outline-edited.json'
import activeData from '../../../utils/icons/animation/48-favorite-heart-solid-edited.json'
import Api from '../../../utils/Api'

export default function Comment({ data, replyActive, setReplyActive, replyFunc, rootId }) {

    const [liked, setLiked] = React.useState(false);
    const [showAllReplies, setShowAllReplies] = React.useState(false);
    const [replyContent, setReplyContent]  = React.useState('')

    const [displayedReplies, setDisplayedReplies] = React.useState([]);

    React.useEffect(() => {
        if (!data.isFather){
            setDisplayedReplies([]);
        }
        else{
            if (showAllReplies){
                setDisplayedReplies(data.children)
            }
            else{
                if (data.children.length > 2){
                    setDisplayedReplies(data.children.slice(0,2))
                }
                else{
                    setDisplayedReplies(data.children)
                }
            }
        }
    }, [showAllReplies])

    const handleLikeClick = () => {
        if (!liked){
            setLiked(!liked);
            new Api('likeComment', [data.id], handleLikeClickCallback)
        }
    }

    const handleLikeClickCallback = () => {

    }

    const changeReplyActive = () => {
        if (replyActive !== data.id) {
            setReplyActive(data.id);
        }
        else {
            setReplyActive(-1);
        }
    }

    return (
        <div style={{ width: '100%', padding: data.isFather ? '15px 0px 15px 30px' : '15px 0px 15px 15px', marginBottom: '10px', marginTop: '10px' }} className='comment'>
            <div style={{ backgroundColor: data.avatarBackgroundColor }} className='comment-avatar'>
                {data.avatarText}
            </div>
            <div style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: '15px', maxWidth: '87%' }}>
                <Typography.Title level={5}>
                    <Link to={`/main/user/${data.email}`}>{data.username}</Link>
                    {/* {data.isFather ? null : <><span style={{ marginLeft: '5px', marginRight: '5px', color: 'gray', fontSize: '15px', }}>replying to </span><Link to='/'>@User</Link></>} */}
                    <span style={{ color: 'gray', float: 'right', fontSize: '10px' }}>{data.publishedDate}</span>
                </Typography.Title>
                <Typography.Text>{data.content}</Typography.Text>
                <div style={{ marginTop: '5px' }}>
                    <span style={{ position: 'relative', top: '5px',cursor:'pointer' }}>
                        <AnimatedIcon
                            width='20px'
                            height='20px'
                            initActive={false}
                            inactiveData={inactiveData}
                            activeData={activeData}
                            changeActiveTo={liked}
                            inline={true}
                            onClick={() => handleLikeClick()}>
                        </AnimatedIcon></span>
                    <span className='comment-like-number'>{liked? data.like+1:data.like}</span><Button type='text' className='comment-reply-button' onClick={changeReplyActive}>{replyActive === data.id ? 'Collapse' : 'Reply'}</Button>
                </div>
                <div style={{ marginBottom: replyActive === data.id ? '10px' : '0px', marginTop: replyActive === data.id ? '10px' : '0px' }} className='comment-reply-box'>
                    {replyActive === data.id ?
                        <Input.Group compact>
                            <Input.TextArea rows={2} placeholder={`Reply to @${data.username}`} onChange={(e) => setReplyContent(e.target.value)}/>
                            <Button style={{ marginTop: '5px', float: 'right' }} onClick={() => replyFunc(replyContent, data.isFather?data.id:rootId, data.id)}>Reply</Button>
                        </Input.Group> : null
                    }
                </div>
                <div style={{ backgroundColor: '#DDDDDD55' }}>
                    {data.isFather ? <>{
                        displayedReplies.map((item) => {
                            return <Comment data={item} replyActive={replyActive} setReplyActive={setReplyActive} replyFunc={replyFunc} rootId={data.id}/>
                        })
                    }
                    </> : null}
                    {data.isFather && data.children.length>2?<Button type="link" style={{marginLeft:'5px', marginBottom:'10px', marginTop:showAllReplies?'5px':'0px'}} onClick={() => setShowAllReplies(!showAllReplies)}>{showAllReplies?'< Collapse':'Show all replies >'}</Button>:<></>}
                </div>
            </div>
        </div>
    )
}
