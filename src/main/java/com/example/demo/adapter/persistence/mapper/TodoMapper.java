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

  /** Find all. */
  @Select("SELECT * FROM todos")
  Collection<TodoDataModel> findAll();

  /** Find by id. */
  @Select("SELECT * FROM todos WHERE id = #{id}")
  Optional<TodoDataModel> findById(@Param("id") String id);

  /** Find by title. */
  @Select("SELECT * FROM todos WHERE title = #{title}")
  Optional<TodoDataModel> findByTitle(@Param("title") String title);

  /** Insert. */
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

  /** Update. */
  @Update(
      """
      UPDATE todos
      SET title = #{todo.title}
         ,completed = #{todo.completed}
      WHERE id = #{todo.id}
      """)
  void update(@Param("todo") TodoDataModel todo);

  /** Delete. */
  @Delete("DELETE FROM todos WHERE id = #{todo.id}")
  void delete(@Param("todo") TodoDataModel todo);
}
