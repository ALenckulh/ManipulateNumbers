from flask import Flask, jsonify
from flask_cors import CORS
import random
import time
import sqlite3

app = Flask(__name__)
CORS(app)

vector = [i for i in range(1, 50001)]

def fisher_yates_shuffle(vector):
    n = len(vector)
    for i in range(n-1, 0, -1):
        j = random.randint(0, i)
        vector[i], vector[j] = vector[j], vector[i]

def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1

@app.route("/api/tempoOrdenado", methods=['GET'])
def ordenar_dados():
    tempos = []
    conn = sqlite3.connect('database/database.db')
    
    cursor = conn.cursor()
    cursor.execute("SELECT vetorAleatorio FROM vetores")
    rows = cursor.fetchall()
    vetor = [int(row[0]) for row in rows]

    print("Vetor antes da ordenação:", vetor[:10])

    for i in range(3):
        start_time = time.time()
        merge_sort(vetor)
        end_time = time.time()
        cronometro = end_time - start_time
        tempos.append(cronometro)
        if i < 2:
            fisher_yates_shuffle(vetor)

    print("Vetor após a ordenação:", vetor[:10])

    conn.execute("DELETE FROM vetores")

    for numero in vetor:
        cursor.execute("INSERT INTO vetores (vetorAleatorio) VALUES (?)", (numero,))
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'Tempos': tempos

    })

@app.route("/api/tempoAleatório", methods=['GET'])
def return_aleatorio():
    tempos = []
    conn = sqlite3.connect('database/database.db')

    conn.execute("DELETE FROM vetores")

    for i in range(3):
        start_time = time.time()
        fisher_yates_shuffle(vector)
        end_time = time.time()
        cronometro = end_time - start_time
        tempos.append(cronometro)
        
    for numero in vector:
        conn.execute("INSERT INTO vetores (vetorAleatorio) VALUES (?)", (numero,))
        
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'Tempos': tempos
    })
    

@app.route("/api/dados_do_banco", methods=['GET'])
def dados_do_banco():
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM vetores")
    rows = cursor.fetchall()

    conn.close()

    # Converter os dados do banco de dados para um formato adequado, como uma lista de dicionários
    data = [{'id': row[0], 'vetorAleatorio': row[1]} for row in rows]

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
