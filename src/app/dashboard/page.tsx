'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SidebarLayout from './SidebarLayout';

// Ejemplo de datos. Acomoda tus campos según tus necesidades.
const rowsData = [
  {
    tema: 'Taller hábitos y estilos de vida saludable-prevención enfermedades cardiovasculares mediante una alimentación balanceada',
    s1Actividad: '2/1',
    s1Asistencia: '3/1',
    s2Actividad: '4/1',
    s2Asistencia: '5/1',
    s3Actividad: '6/1',
    s3Asistencia: '7/1',
    s4Actividad: '8/1',
    s4Asistencia: '9/1'
  },
  {
    tema: 'Gestión citas médicas...',
    s1Actividad: '3/1',
    s1Asistencia: '4/1',
    s2Actividad: '5/1',
    s2Asistencia: '6/1',
    s3Actividad: '7/1',
    s3Asistencia: '8/1',
    s4Actividad: '9/1',
    s4Asistencia: '10/1'
  },
  {
    tema: 'Actividades de prevención...',
    s1Actividad: '4/1',
    s1Asistencia: '5/1',
    s2Actividad: '6/1',
    s2Asistencia: '7/1',
    s3Actividad: '8/1',
    s3Asistencia: '9/1',
    s4Actividad: '10/1',
    s4Asistencia: '11/1'
  },
  // ...etc
];

export default function DashboardPage() {
  // Paginación (ejemplo)
  const [page, setPage] = useState(1);
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Cargar datos de la página "value" si es necesario
  };

  return (
    <SidebarLayout>
      {/* Fila de botones de acciones */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        {/* <Button variant="contained" color="primary" sx={{ minWidth: 200, height: 60 }}>
          Crear Programa
        </Button>
        <Button variant="contained" color="primary" sx={{ minWidth: 200, height: 60 }}>
          Crear Subprograma
        </Button>
        <Button variant="contained" color="primary" sx={{ minWidth: 200, height: 60 }}>
          Crear Actividad
        </Button>
        <Button variant="contained" color="primary" sx={{ minWidth: 200, height: 60 }}>
          Reportes
        </Button> */}
      </Box>

      {/* Títulos */}
      <Typography variant="h4" fontWeight="bold" mb={1} sx={{ textAlign: 'center' }}>
        Programa Familias Saludables
      </Typography>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Subprograma Salud Financiera
      </Typography>
      <Typography variant="h6" mb={2}>
        * Las actividades y asistencias se muestran de la forma: programadas / ejecutadas
      </Typography>

      {/* Tabla con la estructura de la imagen */}
      <Paper sx={{ p: 2, overflow: 'auto' }}>
        <TableContainer>
          <Table>
            {/* Fila superior: Título "Actividades - Asistentes Septiembre" ocupando todas las columnas */}
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={13} /* 1 col Tema + 4 semanas * 3 subcol = 13 */
                  align="center"
                  sx={{
                    backgroundColor: '#29ABE2',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                >
                  Actividades - Asistentes Septiembre
                </TableCell>
              </TableRow>

              {/* Fila agrupa "Tema" y las semanas */}
              <TableRow>
                {/* "Tema" abarca 2 filas (esta y la siguiente) */}
                <TableCell
                  rowSpan={2}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#f0f0f0', // Gris claro opcional
                    width: 280,
                  }}
                >
                  Descripción de la actividad
                </TableCell>

                {/* 4 grupos de semana, cada uno colSpan=3 */}
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ backgroundColor: '#29ABE2', color: '#fff', fontWeight: 'bold' }}
                >
                  Semana 1
                </TableCell>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ backgroundColor: '#29ABE2', color: '#fff', fontWeight: 'bold' }}
                >
                  Semana 2
                </TableCell>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ backgroundColor: '#29ABE2', color: '#fff', fontWeight: 'bold' }}
                >
                  Semana 3
                </TableCell>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ backgroundColor: '#29ABE2', color: '#fff', fontWeight: 'bold' }}
                >
                  Semana 4
                </TableCell>
              </TableRow>

              {/* Subcolumnas de cada semana: Actividad, Asistencia, Editar */}
              <TableRow>
                {/* Semana 1 */}
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Actividad<br />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Asistencia<br />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Editar
                </TableCell>

                {/* Semana 2 */}
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Actividad<br />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Asistencia<br />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Editar
                </TableCell>

                {/* Semana 3 */}
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Actividad<br />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Asistencia<br />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Editar
                </TableCell>

                {/* Semana 4 */}
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Actividad<br />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Asistencia<br />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Editar
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rowsData.map((row, idx) => (
                <TableRow key={idx}>
                  {/* Columna "Tema" */}
                  <TableCell>{row.tema}</TableCell>

                  {/* Semana 1 */}
                  <TableCell align="center">{row.s1Actividad}</TableCell>
                  <TableCell align="center">{row.s1Asistencia}</TableCell>
                  <TableCell align="center">
                    <IconButton><EditIcon /></IconButton>
                  </TableCell>

                  {/* Semana 2 */}
                  <TableCell align="center">{row.s2Actividad}</TableCell>
                  <TableCell align="center">{row.s2Asistencia}</TableCell>
                  <TableCell align="center">
                    <IconButton><EditIcon /></IconButton>
                  </TableCell>

                  {/* Semana 3 */}
                  <TableCell align="center">{row.s3Actividad}</TableCell>
                  <TableCell align="center">{row.s3Asistencia}</TableCell>
                  <TableCell align="center">
                    <IconButton><EditIcon /></IconButton>
                  </TableCell>

                  {/* Semana 4 */}
                  <TableCell align="center">{row.s4Actividad}</TableCell>
                  <TableCell align="center">{row.s4Asistencia}</TableCell>
                  <TableCell align="center">
                    <IconButton><EditIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Paginación (opcional) */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination count={20} page={page} onChange={handlePageChange} />
      </Box>
    </SidebarLayout>
  );
}
