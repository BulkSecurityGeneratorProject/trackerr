package by.pilleo.trackertest.web.rest;

import com.codahale.metrics.annotation.Timed;
import by.pilleo.trackertest.domain.Authority;

import by.pilleo.trackertest.repository.AuthorityRepository;
import by.pilleo.trackertest.web.rest.errors.BadRequestAlertException;
import by.pilleo.trackertest.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Authority.
 */
@RestController
@RequestMapping("/api")
public class AuthorityResource {

    private final Logger log = LoggerFactory.getLogger(AuthorityResource.class);

    private static final String ENTITY_NAME = "authority";

    private final AuthorityRepository authorityRepository;

    public AuthorityResource(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    /**
     * POST  /authorities : Create a new authority.
     *
     * @param authority the authority to create
     * @return the ResponseEntity with status 201 (Created) and with body the new authority, or with status 400 (Bad Request) if the authority has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/authorities")
    @Timed
    public ResponseEntity<Authority> createAuthority(@RequestBody Authority authority) throws URISyntaxException {
        log.debug("REST request to save Authority : {}", authority);
        if (authority.getName() != null) {
            throw new BadRequestAlertException("A new authority cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Authority result = authorityRepository.save(authority);
        return ResponseEntity.created(new URI("/api/authorities/" + result.getName()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getName().toString()))
            .body(result);
    }

    /**
     * PUT  /authorities : Updates an existing authority.
     *
     * @param authority the authority to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated authority,
     * or with status 400 (Bad Request) if the authority is not valid,
     * or with status 500 (Internal Server Error) if the authority couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/authorities")
    @Timed
    public ResponseEntity<Authority> updateAuthority(@RequestBody Authority authority) throws URISyntaxException {
        log.debug("REST request to update Authority : {}", authority);
        if (authority.getName() == null) {
            return createAuthority(authority);
        }
        Authority result = authorityRepository.save(authority);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, authority.getName().toString()))
            .body(result);
    }

    /**
     * GET  /authorities : get all the authorities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of authorities in body
     */
    @GetMapping("/authorities")
    @Timed
    public List<Authority> getAllAuthorities() {
        log.debug("REST request to get all Authorities");
        return authorityRepository.findAll();
        }

    /**
     * GET  /authorities/:id : get the "id" authority.
     *
     * @param id the id of the authority to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the authority, or with status 404 (Not Found)
     */
    @GetMapping("/authorities/{id}")
    @Timed
    public ResponseEntity<Authority> getAuthority(@PathVariable Long id) {
        log.debug("REST request to get Authority : {}", id);
        Authority authority = authorityRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(authority));
    }

    /**
     * DELETE  /authorities/:id : delete the "id" authority.
     *
     * @param name the id of the authority to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/authorities/{id}")
    @Timed
    public ResponseEntity<Void> deleteAuthority(@PathVariable String name) {
        log.debug("REST request to delete Authority : {}", name);
        authorityRepository.delete(name);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, name.toString())).build();
    }
}
