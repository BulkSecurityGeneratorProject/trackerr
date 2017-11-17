package by.pilleo.trackertest.repository;

import by.pilleo.trackertest.domain.Status;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Status entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
    @Query("select status from Status status left join fetch status.tasks tasks")
    List<Status> findAllEagerTasks();

    @Query("select status from Status status left join fetch status.tasks where status.id=:id")
    Status findOneEagerTask(@Param("id") Long id);
}
