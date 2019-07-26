import 'dotenv/config';
import React, { Component } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container/index';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { repositories, newRepo } = this.state;
    try {
      if (newRepo === '') {
        throw new Error('Repository can`t be empty!');
      }
      const isAlready = repositories.find(
        r => r.name.toUpperCase() === newRepo.toUpperCase()
      );
      if (isAlready) {
        throw new Error('Repository already registered!');
      }
      const response = await api.get(`/repos/${newRepo}`, {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
      });
      const data = { name: response.data.full_name };
      this.setState({
        loading: false,
        repositories: [...repositories, data],
        newRepo: '',
      });
      this.setState({ error: false });
    } catch (err) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  removeRepo = repoName => {
    const { repositories } = this.state;
    this.setState({
      repositories: repositories.filter(
        r => r.name.toUpperCase() !== repoName.toUpperCase()
      ),
    });
  };

  render() {
    const { newRepo, loading, repositories, error } = this.state;
    return (
      <Container>
        <h1>
          <FaGithub />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? <FaSpinner /> : <FaPlus />}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>
                {repository.name}{' '}
                <button
                  type="button"
                  onClick={() => {
                    this.removeRepo(repository.name);
                  }}
                >
                  {' '}
                  &#10006;
                </button>{' '}
              </span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
