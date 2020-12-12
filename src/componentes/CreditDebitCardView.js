import React from 'react';

class CreditDebitCardView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    const year = (new Date()).getFullYear();
    this.years = Array.from(new Array(20), (val, index) => index + year)
    this.months = Array.from(new Array(12), (val, index) => index)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleSubmit(event) { }
  handleCancel(event) { }
  handleChange(event) { }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Número de tarjeta:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Nombre en la tarjeta:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Fecha de Vencimiento:
          <select>
            {
              this.months.map(
                (index) => { return <option key={index}>{index + 1}</option> }
              )
            }
          </select>
          <select>
            {
              this.years.map(
                (year, index) => { return <option key={`year${index}`} value={year}>{year}</option> }
              )
            }
          </select>

        </label>
        <input type="submit" value="submit" />
        <button onClick={this.handleCancel}>Cancel</button>
      </form>
    )
  }
}

export default CreditDebitCardView;
