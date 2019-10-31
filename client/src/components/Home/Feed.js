import React from "react";
import "../../scss/components/Feed.scss";
import axios from "axios";
import styled from "styled-components";
import { Youtube } from "styled-icons/fa-brands/Youtube";
import { Twitter } from "styled-icons/fa-brands/Twitter";
import { Instagram } from "styled-icons/fa-brands/Instagram";
import { ExternalLinkAlt } from "styled-icons/fa-solid/ExternalLinkAlt";
import TestAvatar from "../../assets/test-avatar.png";

const PostYoutube = styled(Youtube)`
  color: #fa0202;
  background: #fa02021f;
  padding: 4px;
  border-radius: 50px;
  height: 30px;
  width: 30px;
`;

const PostTwitter = styled(Twitter)`
  color: #1da1f3;
  background: #1da1f31f;
  padding: 4px;
  border-radius: 50px;
  height: 30px;
  width: 30px;
`;

const PostInstagram = styled(Instagram)`
  color: #000;
  background: rgb(221, 221, 221);
  padding: 4px;
  border-radius: 50px;
  height: 30px;
  width: 30px;
`;

const PostLink = styled(ExternalLinkAlt)`
  color: rgb(139, 139, 139);
  height: 15px;
  width: 15px;
`;

class Feed extends React.Component {
  state = {
    gettingFeed: null,
    gettingFeedSuccess: null,
    gettingFeedFailure: null,
    error: null,
    feed: null
  };

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed = async () => {
    console.log("FETCHING FEED");
    try {
      this.setState({ gettingFeed: true });
      const URI = "http://localhost:8100/api/feeds/public";
      const res = await axios.get(URI);
      this.setState({
        gettingFeed: null,
        gettingFeedSuccess: true,
        feed: res.data.items
      });
      console.log(res);
    } catch (error) {
      console.error(error);
      this.setState({ gettingFeed: null, gettingFeedFailure: true });
    }
  };

  render() {
    return (
      <div className="feed-container">
        <div className="feed">
          <h1>Top Posts</h1>
          {this.state.gettingFeed && <p>getting feed ...</p>}
          {!this.state.gettingFeed &&
            this.state.gettingFeedSuccess &&
            this.state.feed && (
              <div className="general">
                {this.state.feed.map((post, i) => {
                  if (post.kind === "youtube#video") {
                    return (
                      // change key
                      <a href="#" className="post" key={i}>
                        <span className="source">
                          <span className="media">
                            <img src={TestAvatar} alt="testavatar" />
                          </span>
                          <span>
                            <PostYoutube />
                          </span>
                        </span>
                        <div className="preview">
                          <img
                            src={post.snippet.thumbnails.medium.url}
                            alt=""
                          />
                          <p>{post.snippet.title}</p>
                        </div>
                        <div className="options">
                          <PostLink />
                        </div>
                      </a>
                    );
                  } else {
                    return <p>incorrect type</p>;
                  }
                })}
              </div>
            )
          // <div className="general">
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          }
        </div>
      </div>
    );
  }
}

export default Feed;
