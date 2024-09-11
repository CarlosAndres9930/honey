import React from 'react';
import { Table, Button, ButtonGroup, Container, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Datos iniciales de medicinas
const data = [
  { id: 1, NombreMedicina: "Medicina A", Cantidad: "10", Dosis: "2ml", HorarioAdministracion: "08:00 AM", Estado: 'Administrado' },
  { id: 2, NombreMedicina: "Medicina B", Cantidad: "20", Dosis: "5ml", HorarioAdministracion: "12:00 PM", Estado: 'No Administrado' },
  { id: 3, NombreMedicina: "Medicina C", Cantidad: "15", Dosis: "1ml", HorarioAdministracion: "06:00 PM", Estado: 'Administrado' }
];

class Medicinas extends React.Component {
  state = {
    data: data,
    filteredData: data,
    form: {
      id: '',
      NombreMedicina: '',
      Cantidad: '',
      Dosis: '',
      HorarioAdministracion: '',
      Estado: 'No Administrado'
    },
    modalAñadir: false,
    modalEditar: false,
    searchText: '',
    nombreMedicinaError: '',
    cantidadError: '',
    dosisError: '',
    horarioError: ''
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  handleSearch = e => {
    const searchText = e.target.value.toLowerCase();
    this.setState({
      searchText,
      filteredData: this.state.data.filter(item =>
        item.NombreMedicina.toLowerCase().includes(searchText) ||
        item.Cantidad.toLowerCase().includes(searchText) ||
        item.Dosis.toLowerCase().includes(searchText) ||
        item.HorarioAdministracion.toLowerCase().includes(searchText)
      )
    });
  }

  mostrarmodalAñadir = () => {
    this.setState({
      modalAñadir: true,
      nombreMedicinaError: '',
      cantidadError: '',
      dosisError: '',
      horarioError: '',
      form: {
        id: '',
        NombreMedicina: '',
        Cantidad: '',
        Dosis: '',
        HorarioAdministracion: '',
        Estado: 'No Administrado'
      }
    });
  }

  ocultarmodalAñadir = () => {
    this.setState({ modalAñadir: false });
  }

  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro, nombreMedicinaError: '', cantidadError: '', dosisError: '', horarioError: '' });
  }

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  }

  validateNombreMedicina = nombreMedicina => {
    return nombreMedicina.trim().length > 0;
  }

  validateCantidad = cantidad => {
    return cantidad.trim().length > 0;
  }

  validateDosis = dosis => {
    return dosis.trim().length > 0;
  }

  validateHorarioAdministracion = horario => {
    return horario.trim().length > 0;
  }

  itemExists = nombreMedicina => {
    return this.state.data.some(item => item.NombreMedicina === nombreMedicina);
  }

  Añadir = () => {
    const { NombreMedicina, Cantidad, Dosis, HorarioAdministracion } = this.state.form;

    // Validar campos obligatorios
    if (!NombreMedicina || !Cantidad || !Dosis || !HorarioAdministracion) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    // Validar nombre de la medicina
    if (!this.validateNombreMedicina(NombreMedicina)) {
      this.setState({ nombreMedicinaError: 'El nombre de la medicina no puede estar vacío.' });
      return;
    }

    // Validar cantidad
    if (!this.validateCantidad(Cantidad)) {
      this.setState({ cantidadError: 'La cantidad no puede estar vacía.' });
      return;
    }

    // Validar dosis
    if (!this.validateDosis(Dosis)) {
      this.setState({ dosisError: 'La dosis no puede estar vacía.' });
      return;
    }

    // Validar horario de administración
    if (!this.validateHorarioAdministracion(HorarioAdministracion)) {
      this.setState({ horarioError: 'El horario de administración no puede estar vacío.' });
      return;
    }

    // Verificar si el ítem ya existe
    if (this.itemExists(NombreMedicina)) {
      Swal.fire('Error', 'El ítem ya existe.', 'error');
      return;
    }

    const valorNuevo = { ...this.state.form, id: this.state.data.length + 1 };
    const lista = [...this.state.data, valorNuevo];
    this.setState({ data: lista, filteredData: lista, modalAñadir: false });
    Swal.fire('Éxito', 'Ítem registrado exitosamente.', 'success');
  }

  editar = (dato) => {
    // Validar campos obligatorios
    if (!dato.NombreMedicina || !dato.Cantidad || !dato.Dosis || !dato.HorarioAdministracion) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    // Validar nombre de la medicina
    if (!this.validateNombreMedicina(dato.NombreMedicina)) {
      this.setState({ nombreMedicinaError: 'El nombre de la medicina no puede estar vacío.' });
      return;
    }

    // Validar cantidad
    if (!this.validateCantidad(dato.Cantidad)) {
      this.setState({ cantidadError: 'La cantidad no puede estar vacía.' });
      return;
    }

    // Validar dosis
    if (!this.validateDosis(dato.Dosis)) {
      this.setState({ dosisError: 'La dosis no puede estar vacía.' });
      return;
    }

    // Validar horario de administración
    if (!this.validateHorarioAdministracion(dato.HorarioAdministracion)) {
      this.setState({ horarioError: 'El horario de administración no puede estar vacío.' });
      return;
    }

    // Verificar si el ítem ya existe
    const existingItem = this.state.data.find(item => item.NombreMedicina === dato.NombreMedicina && item.id !== dato.id);
    if (existingItem) {
      Swal.fire('Error', 'El ítem ya existe.', 'error');
      return;
    }

    const lista = this.state.data.map(registro =>
      registro.id === dato.id ? { ...dato } : registro
    );
    this.setState({ data: lista, filteredData: lista, modalEditar: false });
    Swal.fire('Éxito', 'Ítem actualizado exitosamente.', 'success');
  }

  eliminar = (dato) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Realmente deseas eliminar el ítem ${dato.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        const lista = this.state.data.filter(registro => registro.id !== dato.id);
        this.setState({ data: lista, filteredData: lista });
        Swal.fire('Eliminado', 'Ítem eliminado exitosamente.', 'success');
      }
    });
  }

  toggleEstado = (id) => {
    const lista = this.state.data.map(registro =>
      registro.id === id ? { ...registro, Estado: registro.Estado === 'Administrado' ? 'No Administrado' : 'Administrado' } : registro
    );
    this.setState({ data: lista, filteredData: lista });
  }

  render() {
    const { form, modalAñadir, modalEditar, nombreMedicinaError, cantidadError, dosisError, horarioError } = this.state;

    return (
      <Container>
        <div className="d-flex justify-content-between mb-3">
          <Input
            type="text"
            placeholder="Buscar"
            value={this.state.searchText}
            onChange={this.handleSearch}
            style={{ width: '300px' }}
          />
          <Button color="success" onClick={this.mostrarmodalAñadir}>Añadir medicina</Button>
        </div>

        <Table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre Medicina</th>
              <th>Cantidad</th>
              <th>Dosis</th>
              <th>Horario Administración</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredData.map(elemento => (
              <tr key={elemento.id}>
                <td>{elemento.NombreMedicina}</td>
                <td>{elemento.Cantidad}</td>
                <td>{elemento.Dosis}</td>
                <td>{elemento.HorarioAdministracion}</td>
                <td>{elemento.Estado}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      color={elemento.Estado === 'Administrado' ? 'secondary' : 'success'}
                      onClick={() => this.toggleEstado(elemento.id)}
                      size="sm"
                      className="mr-1"
                    >
                      {elemento.Estado === 'Administrado' ? 'Off' : 'On'}
                    </Button>
                    <Button
                      color="dark"
                      onClick={() => this.mostrarModalEditar(elemento)}
                      size="sm"
                      className="mr-1"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => this.eliminar(elemento)}
                      size="sm"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal Añadir */}
        <Modal isOpen={modalAñadir}>
          <ModalHeader>
            <div>
              <h3>Añadir ítem</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Nombre Medicina:</label>
              <Input
                className="form-control"
                name="NombreMedicina"
                type="text"
                value={form.NombreMedicina}
                onChange={this.handleChange}
              />
              <small className="text-danger">{nombreMedicinaError}</small>
            </FormGroup>

            <FormGroup>
              <label>Cantidad:</label>
              <Input
                className="form-control"
                name="Cantidad"
                type="text"
                value={form.Cantidad}
                onChange={this.handleChange}
              />
              <small className="text-danger">{cantidadError}</small>
            </FormGroup>

            <FormGroup>
              <label>Dosis:</label>
              <Input
                className="form-control"
                name="Dosis"
                type="text"
                value={form.Dosis}
                onChange={this.handleChange}
              />
              <small className="text-danger">{dosisError}</small>
            </FormGroup>

            <FormGroup>
              <label>Horario Administración:</label>
              <Input
                className="form-control"
                name="HorarioAdministracion"
                type="text"
                value={form.HorarioAdministracion}
                onChange={this.handleChange}
              />
              <small className="text-danger">{horarioError}</small>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.Añadir}>Añadir</Button>
            <Button color="secondary" onClick={this.ocultarmodalAñadir}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        {/* Modal Editar */}
        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar ítem</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Nombre Medicina:</label>
              <Input
                className="form-control"
                name="NombreMedicina"
                type="text"
                value={form.NombreMedicina}
                onChange={this.handleChange}
              />
              <small className="text-danger">{nombreMedicinaError}</small>
            </FormGroup>

            <FormGroup>
              <label>Cantidad:</label>
              <Input
                className="form-control"
                name="Cantidad"
                type="text"
                value={form.Cantidad}
                onChange={this.handleChange}
              />
              <small className="text-danger">{cantidadError}</small>
            </FormGroup>

            <FormGroup>
              <label>Dosis:</label>
              <Input
                className="form-control"
                name="Dosis"
                type="text"
                value={form.Dosis}
                onChange={this.handleChange}
              />
              <small className="text-danger">{dosisError}</small>
            </FormGroup>

            <FormGroup>
              <label>Horario Administración:</label>
              <Input
                className="form-control"
                name="HorarioAdministracion"
                type="text"
                value={form.HorarioAdministracion}
                onChange={this.handleChange}
              />
              <small className="text-danger">{horarioError}</small>
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <Input
                type="select"
                name="Estado"
                value={form.Estado}
                onChange={this.handleChange}
                className="form-control"
              >
                <option value="Administrado">Administrado</option>
                <option value="No Administrado">No Administrado</option>
              </Input>
              <small className="text-danger">{this.state.estadoError}</small>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(form)}>Actualizar</Button>
            <Button color="secondary" onClick={this.ocultarModalEditar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default Medicinas;
