import { render,fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard'
import {
    BrowserRouter as Router,
  } from "react-router-dom";

describe("Dashboard render Page", () => {
    const userData=[
        {
          "login": "vanpelt",
          "id": 17,
          "node_id": "MDQ6VXNlcjE3",
          "avatar_url": "https://avatars.githubusercontent.com/u/17?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/vanpelt",
          "html_url": "https://github.com/vanpelt",
          "followers_url": "https://api.github.com/users/vanpelt/followers",
          "following_url": "https://api.github.com/users/vanpelt/following{/other_user}",
          "gists_url": "https://api.github.com/users/vanpelt/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/vanpelt/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/vanpelt/subscriptions",
          "organizations_url": "https://api.github.com/users/vanpelt/orgs",
          "repos_url": "https://api.github.com/users/vanpelt/repos",
          "events_url": "https://api.github.com/users/vanpelt/events{/privacy}",
          "received_events_url": "https://api.github.com/users/vanpelt/received_events",
          "type": "User",
          "site_admin": false
        }];
    it('renders the Dashboard page', () => {
    const {getByText} = render(<Router><Dashboard/></Router>);
    expect(getByText(/logout/i)).toBeInTheDocument();
  });
  
});