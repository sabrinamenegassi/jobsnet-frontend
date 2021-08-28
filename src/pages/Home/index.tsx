import React, { useCallback, useState } from 'react'

import Base from '../../components/Base'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'

import { ThirdColumnsWrapper, TwoColumnsWrapper } from '../../components/Grid'

import api from '../../services/api'

import {
  HomeWrapper,
  GroupFooter,
  GroupLocale,
  TitleError,
  TitleSuccess
} from './styles'

const Home: React.FC = () => {
  const [nome, setNome] = useState('')
  const [profissao, setProfissao] = useState('')
  const [identidade, setIdentidade] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [dataDeNascimento, setDataDeNascimento] = useState('')
  const [corDaPele, setCorDaPele] = useState('')
  const [sexo, setSexo] = useState('')
  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')

  const [formSucesso, setFormSucesso] = useState('')
  const [formErro, setFormErro] = useState('')
  const [cepErro, setCepErro] = useState(false)

  const getLocation = useCallback(async () => {
    try {
      const { data } = await api.get('location', {
        params: { cep }
      })

      if (data) {
        setCidade(data.localidade)
        setBairro(data.bairro)
        setLogradouro(data.logradouro)
      }
    } catch (error) {
      setCepErro(true)
    }
  }, [cep])

  const handleClear = useCallback(() => {
    setNome('')
    setProfissao('')
    setIdentidade('')
    setCpf('')
    setEmail('')
    setTelefone('')
    setDataDeNascimento('')
    setCorDaPele('')
    setSexo('')
    setCep('')
    setLogradouro('')
    setNumero('')
    setBairro('')
    setCidade('')
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      const { data } = await api.post('user', {
        nome,
        profissao,
        identidade,
        cpf,
        email,
        telefone,
        dataDeNascimento,
        corDaPele,
        sexo,
        cep,
        logradouro,
        numero,
        bairro,
        cidade
      })

      if (data) {
        setFormErro('')
        setFormSucesso(data.message)
        setCepErro(false)

        handleClear()
      }
    } catch (error) {
      setFormSucesso('')
      setFormErro(error.response.data.message)
    }
  }, [
    bairro,
    cep,
    cidade,
    corDaPele,
    cpf,
    dataDeNascimento,
    email,
    handleClear,
    identidade,
    logradouro,
    nome,
    numero,
    profissao,
    sexo,
    telefone
  ])

  return (
    <Base>
      <HomeWrapper
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <form>
          <h2>Dados</h2>

          {formSucesso && <TitleSuccess>{formSucesso}</TitleSuccess>}

          {!!formErro && <TitleError>{formErro}</TitleError>}

          <TwoColumnsWrapper>
            <Input
              label="Nome Completo"
              name="nome"
              required
              value={nome}
              onInputChange={setNome}
            />
            <Input
              label="Profissão"
              name="profissao"
              required
              value={profissao}
              onInputChange={setProfissao}
            />
          </TwoColumnsWrapper>

          <TwoColumnsWrapper>
            <Input
              label="Identidade"
              name="identidade"
              value={identidade}
              onInputChange={setIdentidade}
            />
            <Input
              label="CPF"
              name="cpf"
              required
              value={cpf}
              onInputChange={setCpf}
            />
          </TwoColumnsWrapper>

          <TwoColumnsWrapper>
            <Input
              label="Email"
              name="email"
              required
              type="email"
              value={email}
              onInputChange={setEmail}
            />
            <Input
              label="Telefone"
              name="telefone"
              required
              value={telefone}
              onInputChange={setTelefone}
            />
          </TwoColumnsWrapper>

          <ThirdColumnsWrapper>
            <Input
              label="Data de Nascimento"
              name="dataDeNascimento"
              type="date"
              required
              value={dataDeNascimento}
              onInputChange={setDataDeNascimento}
            />
            <Select
              label="Cor da Pele"
              name="corDaPele"
              options={[
                'Asiático',
                'Branco',
                'Indígena',
                'Marrom',
                'Preto',
                'Prefiro Não Divulgar'
              ]}
              value={corDaPele}
              onInputChange={setCorDaPele}
            />
            <Select
              label="Sexo"
              name="sexo"
              options={[
                'Agênero',
                'Homem Cisgênero',
                'Homem Transgênero',
                'Mulher Cisgênero',
                'Mulher Transgênero',
                'Não Binário',
                'Prefiro Não Divulgar'
              ]}
              value={sexo}
              onInputChange={setSexo}
            />
          </ThirdColumnsWrapper>

          <GroupLocale>
            <div>
              <Input
                label="CEP"
                name="cep"
                required
                value={cep}
                initialValue={cep}
                onInputChange={setCep}
              />
              <Button variant="link" onClick={getLocation}>
                Buscar Endereço
              </Button>
            </div>
            {cepErro && (
              <small>CEP não encontrado, preencha o campo por favor.</small>
            )}
          </GroupLocale>

          <TwoColumnsWrapper>
            <Input
              label="Cidade"
              name="cidade"
              required
              value={cidade}
              initialValue={cidade}
              onInputChange={setCidade}
            />
            <Input
              label="Bairro"
              name="bairro"
              required
              value={bairro}
              initialValue={bairro}
              onInputChange={setBairro}
            />
          </TwoColumnsWrapper>

          <TwoColumnsWrapper>
            <Input
              label="Logradouro"
              name="logradouro"
              required
              value={logradouro}
              initialValue={logradouro}
              onInputChange={setLogradouro}
            />
            <Input
              label="Número"
              name="numero"
              required
              value={numero}
              initialValue={numero}
              onInputChange={setNumero}
            />
          </TwoColumnsWrapper>

          <GroupFooter>
            <Button type="submit">Enviar</Button>
            <Button onClick={handleClear} variant="link">
              Limpar Formulário
            </Button>
          </GroupFooter>
        </form>
      </HomeWrapper>
    </Base>
  )
}

export default Home
