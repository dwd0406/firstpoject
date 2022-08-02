import React, { useEffect } from "react";
import Topics from "../components/Topics";
import { doc, arrayUnion, arrayRemove, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Grid, Image,  Segment, Container, Icon, Card } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { auth } from '../utils/firebase';

function Post() {
    const { postId } = useParams();
    const [post, setPost] = React.useState({
        author: {},
    });
    useEffect(() => {
        const docRef = doc(db, "posts", postId)
        onSnapshot(docRef, (snapshot) => {
            setPost({ ...snapshot.data(), id: snapshot.id })
        });
    })
    function toggle(isActive, field) {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, "posts", postId);
        updateDoc(docRef, {
            [field]: isActive
                ? arrayRemove(uid)
                : arrayUnion(uid)
        })
    }
    const isCollected = post.collectedBy?.includes(auth.currentUser.uid)
    const isLiked = post.likedBy?.includes(auth.currentUser.uid)

    return <Grid>
        <Grid.Row>
            <Grid.Column width={3}>
                <Topics />
            </Grid.Column>
            <Container>
                <Grid.Column width={10}>
                    <Card fluid>
                        <Card.Content >
                            <Image src={post.imageUrl} />
                            <Card.Description>{post.topic}。{post.author.email}---發文時間．{post.createdAt?.toDate().toLocaleDateString()}</Card.Description>
                            <Card.Header>
                                {post.title}
                            </Card.Header>
                            <Segment>
                                {post.content}
                            </Segment>
                            <Segment>讚 {post.likedBy?.length || 0} 。
                                <Icon
                                    name={`thumbs up${isLiked ? '' : ' outline'}`}
                                    color={isLiked ? 'blue' : 'grey'}
                                    link
                                    onClick={() => toggle(isLiked, 'likedBy')} />
                                收藏 {post.collectedBy?.length || 0}。
                                <Icon
                                    name={`bookmark${isCollected ? '' : ' outline'}`}
                                    color={isCollected ? 'blue' : 'grey'}
                                    link
                                    onClick={() => toggle(isCollected, 'collectedBy')} />
                            </Segment>
                        </Card.Content>
                    </Card>
                </Grid.Column>

            </Container>
            <Grid.Column width={3}>
            </Grid.Column>
        </Grid.Row>
    </Grid>
}
export default Post;