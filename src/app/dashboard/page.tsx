'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SidebarLayout from './SidebarLayout';

interface ISubprogram {
  id: string;
  name: string;
}

interface IActivity {
  weekNumber: number;
  projectedActivities: number;
  executedActivities: number;
  projectedAttendees: number;
  actualAttendees: number;
  responsible: string;
}

interface IActivityContent {
  id: string;
  title: string;
  activities: IActivity[];
}

interface IRow {
  title: string;
  s1Actividad: string;
  s1Asistencia: string;
  s2Actividad: string;
  s2Asistencia: string;
  s3Actividad: string;
  s3Asistencia: string;
  s4Actividad: string;
  s4Asistencia: string;
}

// Ajusta según tu entorno
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvODU5ZHIxN0s0N2VFblJRc2diNyIsImVtYWlsIjoianVhbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQWRtaW4iLCJpYXQiOjE3NDIxNDM2MjF9.YsitldhlkNOvqt_NZxGph1uKEn23xvKE5yrLBm1gsCk';

// Endpoint base o direcciones
const BASE_URL = 'http://192.168.56.1:3000/letsHelp/Colombia/activities';

// Simulación de un "userId" (teléfono, etc.) para getPrograms
const USER_ID = '3514235900';

export default function DashboardPage() {
  // Paginación (ejemplo)
  const [page, setPage] = useState(1);
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Estado para el nombre del programa
  const [programName, setProgramName] = useState('Cargando...');

  // Almacena el "programId" proveniente del primer servicio para usarlo en el segundo
  const [programId, setProgramId] = useState<string>('');

  // Estado para la lista de subprogramas
  const [subprogramList, setSubprogramList] = useState<ISubprogram[]>([]);
  // Subprograma seleccionado
  const [selectedSubprogram, setSelectedSubprogram] = useState<string>('');

  // Filas transformadas para la tabla (segundo servicio)
  const [activitiesRows, setActivitiesRows] = useState<IRow[]>([]);

  // 1. Al montar, llamamos a getPrograms para obtener el programa y subprogramas
  useEffect(() => {
    fetch(`${BASE_URL}/getPrograms/${USER_ID}`, {
      method: 'POST',
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // data = { code:1, content:[{ id, name, subprograms: [{id, name}, ...], ...}]}
        if (data.code === 1 && data.content?.length > 0) {
          const program = data.content[0];
          setProgramName(program.name || 'Programa sin nombre');
          setProgramId(program.id);

          if (program.subprograms && program.subprograms.length > 0) {
            setSubprogramList(program.subprograms);
            // Seleccionamos el primer subprograma por defecto, por ejemplo
            setSelectedSubprogram(program.subprograms[0].id);
          } else {
            setSubprogramList([]);
            setSelectedSubprogram('');
          }
        } else {
          setProgramName('Programa no disponible');
        }
      })
      .catch((err) => {
        console.error('Error al obtener programa:', err);
        setProgramName('Error al cargar programa');
      });
  }, []);

  // 2. Cuando "selectedSubprogram" cambie (después de cargar la lista),
  // llamamos al segundo servicio activities-by-subprogram
  useEffect(() => {
    if (!programId || !selectedSubprogram) {
      // No llamar hasta tener ambos
      return;
    }

    const url = `${BASE_URL}/activities-by-subprogram?programId=${programId}&subprogramId=${selectedSubprogram}`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: TOKEN,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // data = {
        //   code:1,
        //   content:[
        //     { id, title, activities:[ {weekNumber, projectedActivities,executedActivities,projectedAttendees,actualAttendees}, ...] },
        //     ...
        //   ]
        // }
        if (data.code === 1 && Array.isArray(data.content)) {
          const transformed: IRow[] = data.content.map((item: IActivityContent) => {
            const row: any = {};
            row.title = item.title;

            // Forzamos 4 semanas => s1..s4
            for (let w = 1; w <= 4; w++) {
              const wd = item.activities.find((a) => a.weekNumber === w);
              if (wd) {
                row[`s${w}Actividad`] = `${wd.projectedActivities}/${wd.executedActivities}`;
                row[`s${w}Asistencia`] = `${wd.projectedAttendees}/${wd.actualAttendees}`;
              } else {
                row[`s${w}Actividad`] = '-/-';
                row[`s${w}Asistencia`] = '-/-';
              }
            }
            return row;
          });

          setActivitiesRows(transformed);
        } else {
          setActivitiesRows([]);
        }
      })
      .catch((err) => {
        console.error('Error al obtener actividades del subprograma:', err);
        setActivitiesRows([]);
      });
  }, [programId, selectedSubprogram]);

  return (
    <SidebarLayout>
      {/* Título dinámico con el nombre del programa */}
      <Typography variant="h4" fontWeight="bold" mb={1} sx={{ textAlign: 'center' }}>
        {programName}
      </Typography>

      {/* Select para subprograma (cargado desde el servicio getPrograms) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Subprograma:
        </Typography>
        <Select
          variant="outlined"
          value={selectedSubprogram}
          onChange={(event) => setSelectedSubprogram(event.target.value as string)}
          size="small"
          sx={{ minWidth: 220 }}
        >
          {subprogramList.map((sp) => (
            <MenuItem key={sp.id} value={sp.id}>
              {sp.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Typography variant="h6" mb={2}>
        * Las actividades y asistencias se muestran de la forma: programadas / ejecutadas
      </Typography>

      {/* Tabla con la estructura, llena con activitiesRows */}
      <Paper sx={{ p: 2, overflow: 'auto' }}>
        <TableContainer>
          <Table>
            {/* Encabezado principal */}
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={13}
                  align="center"
                  sx={{
                    backgroundColor: '#29ABE2',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                >
                  Actividades - Asistentes
                </TableCell>
              </TableRow>

              {/* Agrupación de columnas */}
              <TableRow>
                {/* Título/tema de la actividad */}
                <TableCell
                  rowSpan={2}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#f0f0f0',
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

              {/* Subcolumnas de cada semana */}
              <TableRow>
                {/* Semana 1 */}
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Activ.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Asist.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Editar</TableCell>
                {/* Semana 2 */}
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Activ.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Asist.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Editar</TableCell>
                {/* Semana 3 */}
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Activ.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Asist.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Editar</TableCell>
                {/* Semana 4 */}
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Activ.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Asist.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Editar</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activitiesRows.map((row, idx) => (
                <TableRow key={idx}>
                  {/* Título/tema */}
                  <TableCell>{row.title}</TableCell>

                  {/* Semana 1 */}
                  <TableCell align="center">{row.s1Actividad}</TableCell>
                  <TableCell align="center">{row.s1Asistencia}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  {/* Semana 2 */}
                  <TableCell align="center">{row.s2Actividad}</TableCell>
                  <TableCell align="center">{row.s2Asistencia}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  {/* Semana 3 */}
                  <TableCell align="center">{row.s3Actividad}</TableCell>
                  <TableCell align="center">{row.s3Asistencia}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  {/* Semana 4 */}
                  <TableCell align="center">{row.s4Actividad}</TableCell>
                  <TableCell align="center">{row.s4Asistencia}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {/* Si no hay filas */}
              {activitiesRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    No hay actividades para el subprograma seleccionado
                  </TableCell>
                </TableRow>
              )}
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
