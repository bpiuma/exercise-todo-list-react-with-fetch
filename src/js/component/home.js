import React, { useState, useRef, useEffect } from "react";

//Previamente se crea el usuario bpiuma en la API, mediante Postman

export function Home() {
	const [tarea, setTarea] = useState("");
	var [lista, setLista] = useState([]);
	const [pendientes, setPendientes] = useState(0);
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	function agregar(e) {
		e.preventDefault();
		if (tarea != "") {
			let aux = [...lista];
			aux.push({ label: tarea, done: false });
			setLista(aux);
			updateData(aux);
			setTarea("");
			setPendientes(aux.length);
		}
	}

	function eliminar(indice) {
		let aux = [...lista];
		aux.splice(indice, 1);
		setLista(aux);
		updateData(aux);
		setPendientes(aux.length);
	}

	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/bpiuma")
			.then(resp => resp.json())
			.then(data => setLista(data))
			.catch(error => setShowError(true));
	};

	const updateData = updatedList => {
		let updatedListToSend = JSON.stringify(updatedList);
		let options = {
			method: "PUT",
			body: updatedListToSend,
			headers: {
				"Content-Type": "application/json"
			}
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/bpiuma",
			options
		)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
	};

	return (
		<div className="container d-flex flex-column justify-content-center align-items-center text-center mt-5">
			<h1 className="mb-5">Todo List</h1>
			<form className="row col-8" onSubmit={agregar}>
				<div className="row col-12">
					<input
						type="text"
						className="form-control mb-2"
						id="inlineFormInput"
						placeholder="What needs to be done?"
						onChange={e => setTarea(e.target.value)}
						value={tarea}
					/>
				</div>
				<div className="row col-12">
					<ul className="col-12 list-group m-0 p-0">
						{lista.map((elem, i) => {
							return (
								<li
									key={i}
									className="tarea list-group-item d-flex justify-content-between align-items-center">
									{elem.label}
									<span
										className="boton badge badge-primary badge-pill"
										onClick={() => eliminar(i)}>
										X
									</span>
								</li>
							);
						})}
					</ul>
					{showError ? <h1>Ups! Algo salio mal!</h1> : null}
				</div>
			</form>
			<div className="row col-8 m-2">
				<p>
					{pendientes == 0
						? "No tasks, add a task"
						: pendientes + " item left"}
				</p>
			</div>
		</div>
	);
}
