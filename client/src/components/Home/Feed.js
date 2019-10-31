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
  height: 25px;
  width: 25px;
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
    error: null
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
        gettingFeedSuccess: true
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
          <div className="general">
            <div className="post">
              <div className="source">
                <div className="media">
                  <img src={TestAvatar} alt="testavatar" />
                  <span>
                    <PostInstagram />
                  </span>
                </div>
                <p>3m</p>
              </div>
              <div className="preview">preview</div>
              <div className="options">
                <PostLink />
              </div>
            </div>
            <div className="post">
              <PostTwitter /> post here <PostLink />
            </div>
            <div className="post">
              <PostYoutube /> post here <PostLink />
            </div>
            <div className="post">
              <PostInstagram /> post here <PostLink />
            </div>
            <div className="post">
              <PostTwitter /> post here <PostLink />
            </div>
            <div className="post">
              <PostYoutube /> post here <PostLink />
            </div>
            <div className="post">
              <PostInstagram /> post here <PostLink />
            </div>
            <div className="post">
              <PostTwitter /> post here <PostLink />
            </div>
            <div className="post">
              <PostYoutube /> post here <PostLink />
            </div>
            <div className="post">
              <PostInstagram /> post here <PostLink />
            </div>
            <div className="post">
              <PostTwitter /> post here <PostLink />
            </div>
            <div className="post">
              <PostYoutube /> post here <PostLink />
            </div>
            <div className="post">
              <PostInstagram /> post here <PostLink />
            </div>
            <div className="post">
              <PostTwitter /> post here <PostLink />
            </div>
            <div className="post">
              <PostYoutube /> post here <PostLink />
            </div>
            <div className="post">
              <PostInstagram /> post here <PostLink />
            </div>
            <div className="post">
              <PostTwitter /> post here <PostLink />
            </div>
            <div className="post">
              <PostYoutube /> post here <PostLink />
            </div>
            <div className="post">
              <PostInstagram /> post here <PostLink />
            </div>
            <div className="post">
              <PostTwitter /> post here <PostLink />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
