'use client'

import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Home() {
  const [numeros, setNumeros] = useState([]);
  const [temposAleatorio, setTemposAleatorio] = useState([]);
  const [temposOrdenado, setTemposOrdenado] = useState([]);
  const navigate = "http://localhost:3000/graficos";

  useEffect(() => {
    fetch("http://localhost:8080/api/dados_do_banco")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos da API:", data);
        setNumeros(data.map((item) => item.vetorAleatorio));
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }, []);

  const Aleatorio = async () => {
    try {
      const temposResponse = await fetch("http://localhost:8080/api/tempoAleatório");
      const temposData = await temposResponse.json();
      console.log("Tempos recebidos da API:", temposData);
      setTemposAleatorio(temposData.Tempos);

      const dadosResponse = await fetch("http://localhost:8080/api/dados_do_banco");
      const dadosData = await dadosResponse.json();
      console.log("Dados atualizados do banco:", dadosData);
      setNumeros(dadosData.map((item) => item.vetorAleatorio));
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  const Ordenado = async () => {
    try {
      const temposResponse = await fetch("http://localhost:8080/api/tempoOrdenado");
      const temposData = await temposResponse.json();
      console.log("Tempos recebidos da API:", temposData);
      setTemposOrdenado(temposData.Tempos);

      const dadosResponse = await fetch("http://localhost:8080/api/dados_do_banco");
      const dadosData = await dadosResponse.json();
      console.log("Dados atualizados do banco:", dadosData);
      setNumeros(dadosData.map((item) => item.vetorAleatorio));
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  return (
    <div className="flex flex-row p-8 gap-16">
      <div>
        {numeros.length === 0 ? (
          <div className="flex flex-row gap-4">
            <LoadingOutlined />
            Carregando...
          </div>
        ) : (
          <div>
            {numeros.map((numero, index) => (
              <div key={index}>{numero}</div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <Button onClick={Aleatorio}>Aleatório</Button>
        <div>
          <h2>Tempos Aleatórios:</h2>
          {temposAleatorio.map((tempo, index) => (
            <div key={index}>{tempo}</div>
          ))}
        </div>
        <Button onClick={Ordenado}>Ordenar</Button>
        <div>
          <h2>Tempos Ordenados:</h2>
          {temposOrdenado.map((tempo, index) => (
            <div key={index}>{tempo}</div>
          ))}
        </div>
        <Button href={navigate}>Gráficos</Button>
      </div>
    </div>
  );
}

