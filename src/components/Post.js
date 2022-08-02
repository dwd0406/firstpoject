import { Item, Image, Card } from "semantic-ui-react";
import { Link } from 'react-router-dom';

function Post({ post }) {
    return <><Card fluid>
        <Image
            as={Link}
            to={`/posts/${post.id}`}
            src={post.imageUrl || 'https://www.ringodaigaku.com/ringo_blog/wp-content/uploads/2020/11/IMG_4048_blog.jpg'}
            wrapped ui={false}
        />
        <Card.Content >
            <Card.Header
                as={Link}
                to={`/posts/${post.id}`}>{post.title}
            </Card.Header>
            <Card.Description>
                {post.content}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Item.Extra>讚 {post.likedBy?.length || 0}。收藏{post.collectedBy?.length || 0}
                <Card.Meta
                    textAlign='right'>
                    {post.topic}。發文日期{post.createdAt?.toDate().toLocaleDateString()}。{post.author.email}
                </Card.Meta>
            </Item.Extra>
        </Card.Content>
    </Card>
    </>
}
export default Post;

