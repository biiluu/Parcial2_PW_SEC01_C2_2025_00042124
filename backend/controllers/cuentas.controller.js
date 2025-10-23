import { cuentas } from '../data/cuentas.js';

const parseBalance = (balanceStr) => {
  return parseFloat(balanceStr.replace(/\$|,/g, ''));
};

export const getCuentas = (req, res) => {
  const query = req.query;
  
  if (Object.keys(query).length === 0) {
    return res.status(200).json({
      count: cuentas.length,
      data: cuentas
    });
  }

  const { _id, client, gender } = query;
  let resultados = [];

  if (_id) {
    const cuenta = cuentas.find(c => c._id === _id);
    if (cuenta) {
      return res.status(200).json({
        finded: true,
        account: cuenta
      });
    }
  }

  if (client) {
    resultados = cuentas.filter(c => 
      c.client.toLowerCase().includes(client.toLowerCase())
    );
  }

  if (gender) {
    resultados = cuentas.filter(c => c.gender.toLowerCase() === gender.toLowerCase());
  }

  return res.status(200).json({
    finded: resultados.length > 0,
    data: resultados
  });
};

export const getCuentaById = (req, res) => {
  const { id } = req.params;
  const cuenta = cuentas.find(c => c._id === id);

  if (!cuenta) {
    return res.status(404).json({
      finded: false,
      account: null
    });
  }

  return res.status(200).json({
    finded: true,
    account: cuenta
  });
};

export const getCuentasBalance = (req, res) => {
  const cuentasActivas = cuentas.filter(c => c.isActive === true);

  if (cuentasActivas.length === 0) {
    return res.status(200).json({
      status: false,
      accountBalance: 0
    });
  }

  const totalBalance = cuentasActivas.reduce((sum, cuenta) => {
    return sum + parseBalance(cuenta.balance);
  }, 0);

  res.status(200).json({
    status: true,
    accountBalance: totalBalance
  });
};