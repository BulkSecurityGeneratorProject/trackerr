package by.pilleo.trackertest.repository;

import by.pilleo.trackertest.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {



    @Query("select distinct book from Project book left join fetch book.tasks tasks left  join fetch book.users users")

    List<Project> getAllProjects();
    @Query("select distinct book from Project book left join fetch book.tasks tasks left join fetch book.users users where book.id=:id")
    Project findOneEagerLoad(@Param("id") Long id);
}
