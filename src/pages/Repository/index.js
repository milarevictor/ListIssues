import 'dotenv/config';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  Loading,
  Owner,
  IssueList,
  IssueFilter,
  FilterButton,
  Footer,
} from './styles';
import Container from '../../components/Container/index';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: {
      state: 'open',
      page: 1,
    },
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ repository: PropTypes.string }),
    }).isRequired,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`, {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
      }),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.state,
          per_page: 5,
          page: filters.page,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
      }),
    ]);
    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
    });
  }

  async execApiCall() {
    const { repository, filters } = this.state;
    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: filters.state,
        per_page: 5,
        page: filters.page,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
    });
    this.setState({ issues: issues.data });
  }

  async handlePage(page) {
    const { filters } = this.state;
    const operator = page === 'next' ? 1 : -1;
    this.setState({
      filters: { state: filters.state, page: filters.page + operator },
    });
    this.execApiCall();
  }

  async handleFilter(state) {
    const { filters } = this.state;
    this.setState({
      filters: { state, page: 1 },
    });
    this.execApiCall();
  }

  render() {
    const { repository, issues, loading, filters } = this.state;
    if (loading) {
      return (
        <Loading loading={loading}>
          {' '}
          <FaSpinner />{' '}
        </Loading>
      );
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <IssueFilter>
            <p> State:</p>
            <FilterButton
              onClick={() => {
                this.handleFilter('open');
              }}
              disabled={filters.state === 'open'}
            >
              Open
            </FilterButton>
            <FilterButton
              onClick={() => {
                this.handleFilter('closed');
              }}
              disabled={filters.state === 'closed'}
            >
              Closed
            </FilterButton>
            <FilterButton
              onClick={() => {
                this.handleFilter('all');
              }}
              disabled={filters.state === 'all'}
            >
              All
            </FilterButton>
          </IssueFilter>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Footer>
          <FilterButton
            disabled={filters.page === 1}
            onClick={() => {
              this.handlePage('prev');
            }}
          >
            Previous
          </FilterButton>
          <strong>{filters.page}</strong>
          <FilterButton
            onClick={() => {
              this.handlePage('next');
            }}
          >
            Next
          </FilterButton>
        </Footer>
      </Container>
    );
  }
}
