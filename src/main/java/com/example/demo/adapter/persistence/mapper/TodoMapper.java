package com.example.demo.adapter.persistence.mapper;

import com.example.demo.adapter.persistence.model.TodoDataModel;
import java.util.Collection;
import java.util.Optional;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/** TodoMapper. */
@Mapper
public interface TodoMapper {

  @Select("SELECT * FROM todos")
  Collection<TodoDataModel> findAll();

  @Select("SELECT * FROM todos WHERE id = #{id}")
  Optional<TodoDataModel> findById(@Param("id") String id);

  @Select("SELECT * FROM todos WHERE title = #{title}")
  Optional<TodoDataModel> findByTitle(@Param("title") String title);

  @Insert(
      """
      INSERT INTO todos (
        id,
        title,
        completed
      ) VALUES (
        #{todo.id},
        #{todo.title},
        #{todo.completed}
      )
      """)
  void insert(@Param("todo") TodoDataModel todo);

  @Update(
      """
      UPDATE todos
      SET title = #{todo.title}
         ,completed = #{todo.completed}
      WHERE id = #{todo.id}
      """)
  void update(@Param("todo") TodoDataModel todo);

  @Delete("DELETE FROM todos WHERE id = #{todo.id}")
  void delete(@Param("todo") TodoDataModel todo);
}
