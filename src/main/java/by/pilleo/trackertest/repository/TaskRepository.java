package by.pilleo.trackertest.repository;

import by.pilleo.trackertest.domain.Task;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("select task from Task task left join fetch task.comments comments left join fetch task.users users where task.id=:id")
    Task findOneEager(@Param("id") Long id);
}
