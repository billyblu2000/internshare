import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { Typography, Button, Input } from 'antd'
import AnimatedIcon from '../../../utils/icons/AnimatedIcon'
import inactiveData from '../../../utils/icons/animation/48-favorite-heart-outline-edited.json'
import activeData from '../../../utils/icons/animation/48-favorite-heart-solid-edited.json'

export default function Comment({ data, replyActive, setReplyActive }) {

    const [liked, setLiked] = React.useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    }

    const changeReplyActive = () => {
        if (replyActive !== data.id){
            setReplyActive(data.id);
        }
        else{
            setReplyActive(-1);
        }
    }

    return (
        <div style={{ width: '100%', padding: data.isFather ? '15px 0px 15px 30px' : '15px 0px 15px 15px', marginBottom: '10px', marginTop: '10px' }} className='comment'>
            <div style={{ backgroundColor: '#602929' }} className='comment-avatar'>
                LY
            </div>
            <div style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: '15px', maxWidth: '87%' }}>
                <Typography.Title level={5}>
                    <Link to='/'>User</Link>
                    {data.isFather ? null : <><span style={{ marginLeft: '5px', marginRight: '5px', color: 'gray', fontSize: '15px', }}>replying to </span><Link to='/'>@User</Link></>}
                    <span style={{ color: 'gray', float: 'right', fontSize: '10px' }}>2 days before</span>
                </Typography.Title>
                <Typography.Text>coment1 coment1 comecoment1 coment1 coment1 coment1nt1 coment1 coment1 coment1 coment1 coment1 coment1 coment1</Typography.Text>
                <div style={{ marginTop: '5px' }}>
                    <span style={{ position: 'relative', top: '5px' }}>
                        <AnimatedIcon
                            width='20px'
                            height='20px'
                            initActive={false}
                            inactiveData={inactiveData}
                            activeData={activeData}
                            toggleable={true}
                            inline={true}
                            onClick={() => handleLikeClick()}>
                        </AnimatedIcon></span>
                    <span className='comment-like-number'>20</span><Button type='text' className='comment-reply-button' onClick={changeReplyActive}>{replyActive===data.id?'Collapse':'Reply'}</Button>
                </div>
                <div style={{marginBottom:replyActive === data.id?'10px':'0px', marginTop:replyActive === data.id?'10px':'0px'}} className='comment-reply-box'>
                {replyActive===data.id ?
                    <Input.Group compact>
                        <Input.TextArea rows={2} placeholder="Reply to @User" />
                        <Button style={{ marginTop: '5px', float: 'right' }}>Reply</Button>
                    </Input.Group> : null
                }
                </div>
                <div style={{ backgroundColor: '#DDDDDD55' }}>
                    {data.isFather ? data.children.map((item) => {
                        return <Comment data={item} replyActive={replyActive} setReplyActive={setReplyActive}/>
                    }) : null}
                </div>
            </div>
        </div>
    )
}
