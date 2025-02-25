import React, { FC, useState } from 'react'
import './App.css'
import { Button, Checkbox, List, ListItemText, TextField, ListItem, Tabs, Tab  } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { IToDo } from './types/types'
import { nanoid } from 'nanoid'

export const App: FC = () => {
  const [toDo, setToDo] = useState('')
  const [toDos, setToDos] = useState<IToDo[]>([])
  const [selectedTab, setSelectedTab] = useState('All');

  const handleTabClick = (_e: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };


  const addToDo = () => {
    if (toDo) {
      setToDos([...toDos, {
        id: nanoid(7),
        text: toDo,
        completed: false
      }])
      setToDo('')
    }
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addToDo()
    }
  }

  const toggleToDo = (id: string): void => {
    setToDos(
      toDos.map(toDo => {
        if(toDo.id !== id) return toDo

        return {
          ...toDo,
          completed: !toDo.completed
        }
      })
    )
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | undefined> = (e) => {
    setToDo(e.target.value)
  }

  const countComleteToDo = (arr: IToDo[]): number => {
    return arr.filter(function (toDo) {
      return toDo.completed
    }).length
  }

  const handleDeleteCompletedToDo = (_e: React.SyntheticEvent): void => {
    setToDos(toDos.filter(toDo => !toDo.completed ))
  }

  return (
    <div className='container_app'>

      <h1 className='title_h1'>todos</h1>
      <div className='container_toDo'>
        <TextField value={toDo} onChange={handleChange} onKeyDown={handleKeyDown} fullWidth label="What needs to be done?" variant="outlined" />
        <Button variant="text" onClick={addToDo}>Add ToDo</Button>
        {selectedTab =='All' && (
          <List className='list_toDo'>
            {
              toDos.map(
                toDo => 
                  <ListItem key={toDo.id}>
                    <Checkbox
                      size='large'
                      onChange={() => {toggleToDo(toDo.id)}}
                      checked={toDo.completed}
                      icon={<BookmarkBorderIcon />}
                      checkedIcon={<BookmarkIcon />}
                    />
                    <ListItemText primary={toDo.text} />
                  </ListItem>
              )
            }
            
          </List>
        )}

        {selectedTab =='Active' && (
          <List className='list_toDo'>
            {
              toDos.map(
                function (toDo) {
                  if (!toDo.completed)
                    return (
                      <ListItem key={toDo.id}>
                        <Checkbox
                          size='large'
                          onChange={() => {toggleToDo(toDo.id)}}
                          checked={toDo.completed}
                          icon={<NotificationsActiveOutlinedIcon />}
                        />
                        <ListItemText primary={toDo.text} />
                      </ListItem>
                    )
                }
              )
            }
          </List>
        )}

        {selectedTab =='Completed' && (
          <List className='list_toDo'>
            {
              toDos.map(
                function (toDo) {
                  if (toDo.completed)
                    return (
                      <ListItem key={toDo.id}>
                        <Checkbox
                          size='large'
                          onChange={() => {toggleToDo(toDo.id)}}
                          checked={toDo.completed}
                          checkedIcon={<DoneOutlinedIcon />}
                        />
                        <ListItemText primary={toDo.text} />
                      </ListItem>
                    )
                }
              )
            }
          </List>
        )}
      </div>
      
      <div className='nav_menu'>
        <p className='nav_menu_count'>{countComleteToDo(toDos)} ITEMS LEFT</p>
        <Tabs
          value={selectedTab}
          onChange={handleTabClick}
          textColor="primary"
          indicatorColor="primary"
          
        >
          
          <Tab value="All" label="All" />
          <Tab value="Active" label="Active" />
          <Tab value="Completed" label="Completed" />
        </Tabs>
        <Button onClick={handleDeleteCompletedToDo} startIcon={<DeleteIcon />}>Clear Completed</Button>
      </div>
    </div>
  )

}
