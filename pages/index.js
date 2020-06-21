import Head from "next/head";
import fetch from "node-fetch";
import AdBanner from "../components/ads"

function Home({ BrData, CovidData, DolarData, NewData }) {
  return (
    <>
      <Head>
        <title>Brasil Covid-19</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
      <div className="container">
        <header>
          <h1 className="title">Brasil Covid-19</h1>
          <img
            src="/Flag-Brazil.png"
            alt="Bandeira do Brazil Covid-19 Coronavirus"
          />
        </header>
        <div className="infoBrazil">
          <h1>Casos Confimados: {(BrData.confirmed).toLocaleString("pt-BR")}</h1>
          <h1>Mortes: {(BrData.deaths).toLocaleString("pt-BR")}</h1>
          <h1>Recuperados: {(BrData.recovered).toLocaleString("pt-BR")}</h1>
        </div>
        <div className="infoGeneral">
          <div className="listInfoStades">
            <div className="tableScroll">
              <table>
                <thead>
                  <tr>
                    {" "}
                    <th>Estado</th>
                    <th>UF</th> <th>Casos</th> <th>Mortes</th>
                    <th>Suspeitos</th>
                  </tr>
                </thead>
                <tbody>
                  {CovidData.map((dataState) => (
                    <tr key={dataState.uid}>
                      <td>{dataState.state}</td>
                      <td>{dataState.uf}</td>
                      <td>{(dataState.cases).toLocaleString("pt-BR")}</td>
                      <td>{(dataState.deaths).toLocaleString("pt-BR")}</td>
                      <td>{(dataState.suspects).toLocaleString("pt-BR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mostInfos">
            <div className="taxaDeaths">
              <text>Taxa de letalitade</text>
              <p>Mundo: 5.23%</p>
              <p>Brasil: {(BrData.deaths / (BrData.confirmed / 100)).toFixed(2)}%</p>
            </div>
            <div className="Dolar">
              <p>USD-BRL</p>
              <p>R$ {parseFloat(DolarData.bid).toFixed(2)}</p>
            </div>
            <div className="Update">
              <p>Atualizado</p>
              <p>{NewData}</p>
            </div>
          </div>
        </div>
        <AdBanner/>
        <p id="description">Veja agora quantos casos de covid-19 (Coronavirus) tem no Brasil tem tempo real, atualizado todos dias, veja também o valor do dolar-real em tempo real, taxa de mortalidade do coronavirus no mundo e Brasil.</p>
      </div>
      <footer>
        <address><a href="mailto:pedro.henrique1210@outlook.com">Desenvolvido por Pedro Bonifacio</a></address>
      </footer>
    </>
  );
}
export async function getStaticProps() {
  const apiCovid = "https://covid19-brazil-api.now.sh/api/report/v1";
  const apiDolar = "https://economia.awesomeapi.com.br/all/USD-BRL";

  const BrRes = await fetch(`${apiCovid}/brazil`)
    .then((res) => res.json())
    .then((json) => json);

  const CovidRes = await fetch(apiCovid)
    .then((res) => res.json())
    .then((json) => json);

  const DolarRes = await fetch(apiDolar)
    .then((res) => res.json())
    .then((json) => json);

  //format Date
  let data = BrRes.data.updated_at
  let year = data.slice(0,4);
  let mouth = data.slice(5,7);
  let day = data.slice(8,10)
  let hour = (data.slice(11,13) - 3)
  let minutes = data.slice(14,16)
  let NewData = `${day}/${mouth}/${year}  ${hour}:${minutes}`
  return {
    props: {
      BrData: BrRes.data,
      CovidData: CovidRes.data,
      DolarData: DolarRes.USD,
      NewData,
    },
  };
}

export default Home;
