package by.pilleo.trackertest.repository;

import by.pilleo.trackertest.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
    @Query("select auth from Authority auth where auth.name=:name")

    Authority findOneByName(@Param("name") String name);


    @Query("select auth from Authority auth where auth.id=:id")
    Authority findOne(@Param("id") Long id);
}
